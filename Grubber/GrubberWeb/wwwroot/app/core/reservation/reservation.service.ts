import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {BatchTripReservation} from './batch-trip-reservation';
import {TripSchedule} from '../trips/trip-schedule';

@Injectable()
export class ReservationService {
    batchTripReservation: BatchTripReservation;
    apiUrl: string = "/api/reservation";

    constructor(private _http: Http) { }

    addBatchTripReservation(batchTripReservation: BatchTripReservation) {
        var body = JSON.stringify(batchTripReservation);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this.apiUrl, body,
            {
                headers: headers
            })
            .map((response) => {
                return response.json();
            })
            .map((batchTripReservation: BatchTripReservation) => {
                let result: BatchTripReservation;;
                result = batchTripReservation;
                return result;
            });
    }

    approveRequest(reservationId: number) {
        var body = "";
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.put(this.apiUrl + "/" + reservationId.toString() + "/1", body,
            {
                headers: headers
            })
            .map((response) => {
                return response.json();
            })
            .map((status: boolean) => {
                let result: boolean;
                result = status;
                return result;
            });
    }

    rejectRequest(reservationId: number) {
        var body = "";
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.put(this.apiUrl + "/" + reservationId.toString() + "/2", body,
            {
                headers: headers
            })
            .map((response) => {
                return response.json();
            })
            .map((status: boolean) => {
                let result: boolean;
                result = status;
                return result;
            });
    }

    getCarPoolForDrivers(userId: string) {
        return this._http.get(this.apiUrl)
            .map((response) => {
                return response.json();
            })
            .map((tripSchedules: Array<any>) => {
                let result: Array<TripSchedule> = [];

                if (tripSchedules) {
                    tripSchedules.forEach((tripSchedule) => {
                        result.push(tripSchedule)
                    });
                }
                return result;
            });
    }

    private _fetchFailed(error: any) {
        console.error(error);
        return Promise.reject(error);
    }
}