import {TripSchedule} from '../trips/trip-schedule';

export class TripReservation {
    public id: number;
    public tripStart: string
    public tripStartLat: number;
    public tripStartLng: number;
    public tripTo: string;
    public tripToLat: number;
    public tripToLng: number;
    public tripScheduleId: number;
    public tripSchedule: TripSchedule;
    public status: ReservationStatus;
}

export enum ReservationStatus {
    Requested = 0,
    Accepted = 1,
    Rejected = 2,
    OnTrip = 3,
    Done = 4,
    AcceptedByOther = 5
}