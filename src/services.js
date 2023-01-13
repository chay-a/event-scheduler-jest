
import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {
        const events = this._eventRepository.getAll();
        events.sort((event1, event2) => {
            return event1.getStartTime() - event2.getStartTime();
        });
        return events[0]?? null;
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
        const events = this._eventRepository.getAll();
        events.sort((event1, event2) => {
            return event2.getStartTime() - event1.getStartTime();
        });
        return events[0]?? null;
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        const events = this._eventRepository.getAll();
        let timeDiff = 0;
        let longestEvent = null;
        events.forEach(event => {
            if (event.getEndTime() - event.getStartTime() >= timeDiff) {
                timeDiff = event.getEndTime() - event.getStartTime();
                longestEvent = event;
            }
        });
        return longestEvent;
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        const events = this._eventRepository.getAll();
        let timeDiff = events.length > 0 && this.getTimeDiff(events[0]) >= 0 ? this.getTimeDiff(events[0]): null;
        let shortestEvent = null;
        events.forEach(event => {
            if (this.getTimeDiff(event) >= 0 && this.getTimeDiff(event) <= timeDiff) {
                timeDiff = this.getTimeDiff(event);
                shortestEvent = event;
            }
        });
        return shortestEvent;
    }

    getTimeDiff(event) {
        return event.getEndTime() - event.getStartTime()
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return this._eventRepository.getAll().filter(event => {
            return event.getTitle() == title;
        })[0] ?? null;
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Boolean}
     */
    isLocationAvailable(time) {
        return !this.hasEventOn(time).length > 0;
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }

}