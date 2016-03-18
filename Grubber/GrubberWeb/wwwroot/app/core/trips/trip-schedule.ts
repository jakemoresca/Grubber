import {TripLandMark} from './trip-landmark';
import {TripReservation} from '../reservation/trip-reservation';
import {EnumHelper, ObjHelper} from '../common';

export class TripSchedule {
    public id: number;
    public userId: string;
    public scheduleTime: string;
    public scheduleDate: string;
    public landMarks: Array<TripLandMark>;

    public isNew: boolean;
    public tripReservations: Array<TripReservation>;
}

export enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export enum TripType {
    In = 0,
    Out = 1
}