import {TripLandMark} from './trip-landmark';
import {EnumHelper, ObjHelper} from '../common';

export class TripSchedule {
    public id: number;
    public carId: number;
    public scheduleTime: string;
    public scheduleDate: Date;
    public landMarks: Array<TripLandMark>;

    public isNew: boolean;
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