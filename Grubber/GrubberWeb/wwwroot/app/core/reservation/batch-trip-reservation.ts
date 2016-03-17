import {TripReservation, ReservationStatus} from './trip-reservation';

export class BatchTripReservation {
    public id: number;
    public reservations: Array<TripReservation>;
    public acceptedTripReservationId: number;
}