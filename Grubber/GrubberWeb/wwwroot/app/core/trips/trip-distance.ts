import {TripLandMark} from './trip-landmark';
import {EnumHelper, ObjHelper} from '../common';
import {TripSchedule} from './trip-schedule';

export class TripDistance extends TripSchedule {
    public fromLandMark: TripLandMark;
    public toLandMark: TripLandMark;

    public fromDistance: number;
    public toDistance: number;
}