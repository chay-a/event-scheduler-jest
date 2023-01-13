import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
jest.mock("../src/repository");


describe("Event Service",()=> {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => fakeEvents.slice()
            }
        });
    });

    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-17T13:24:00'),"Hello World","Campus Numerique","This is an hello world.."),
        new Event(new Date('2018-12-17T03:24:00'),new Date('1995-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test againt","Campus Numerique","This is an hello world..")
    ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 4 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(3);
    })

    test('getFirstEvent shall return the first Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).toBe(fakeEvents[1]);
    })

    test('getLastEvent shall return the last Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent()).toBe(fakeEvents[2]);
    })

    test('getLongestEvent shall return the longest Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLongestEvent()).toBe(fakeEvents[0]);
    })

    test('getShortestEvent shall return the shortest Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getShortestEvent()).toBe(fakeEvents[2]);
    })

    test('hasEventOn shall return an array of one event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.hasEventOn(new Date('2020-04-01T09:00:00'))).toEqual([fakeEvents[2]]);
    })

    test('hasEventOn shall return an empty array when no event at that time', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.hasEventOn(new Date('2023-04-01T09:00:00'))).toEqual([]);
    })

    test('getEventByTitle shall return the Event corresponding to the title', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEventByTitle("Hello World")).toBe(fakeEvents[0]);
    })

    test('getEventByTitle shall return null when no corresponding to the title', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEventByTitle("Helloee World")).toBe(null);
    })

    test('isLocationAvailable shall return false if  event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.isLocationAvailable(new Date('2020-04-01T09:00:00'))).toBe(false);
    })

    test('isLocationAvailable shall return true if no event on date', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.isLocationAvailable(new Date('2023-04-01T09:00:00'))).toBe(true);
    })

    test('getCurrentEvents shall return empty array of events on today', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getCurrentEvents()).toEqual([]);
    })
});

describe("Event Service no events",()=> {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => []
            }
        });
    });

    test('getFirstEvent shall return null if no event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).toBe(null);
    })

    test('getLastEvent shall return null if no event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent()).toBe(null);
    })

    test('getLongestEvent shall return null when no event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLongestEvent()).toBe(null);
    })

    test('getLShortestEvent shall return null when no event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getShortestEvent()).toBe(null);
    })

    test('hasEventOn shall return an empty array when no events', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.hasEventOn(new Date('2020-04-01T09:00:00'))).toEqual([]);
    })

    test('getEventByTitle shall return null when no events', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEventByTitle("Hello World")).toBe(null);
    })

    test('isLocationAvailable shall return true if no event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.isLocationAvailable(new Date('2023-04-01T09:00:00'))).toBe(true);
    })
});