import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {TripSchedule} from '../core/trips/trip-schedule';
import {TripLandMark} from '../core/trips/trip-landmark';

/**
 * car service
 */
@Injectable()
export class TripService {
    tripSchedules: TripSchedule[] = [];
    tripLandMarks: TripLandMark[] = [];
    apiUrl: string = "/api/";

    constructor(private _http: Http) { }

    getTripSchedules() {
        //return an observable
        return this._http.get(this.apiUrl + 'tripschedule')
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

    getCarTripSchedules(carId: number) {
        return this._http.get(this.apiUrl + 'tripschedule/' + carId.toString())
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

    saveTripSchedules(tripSchedules: Array<TripSchedule>) {
        var body = JSON.stringify(tripSchedules);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this.apiUrl + 'tripschedule', body,
            {
                headers: headers
            })
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

    deleteTripSchedule(id: number) {
        return this._http.delete(this.apiUrl + 'tripschedule/' + id.toString())
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

    deleteTripLandMark(id: number) {
        return this._http.delete(this.apiUrl + 'triplandmark/' + id.toString())
            .map((response) => {
                return response.json();
            })
            .map((tripLandMarks: Array<any>) => {
                let result: Array<TripLandMark> = [];

                if (tripLandMarks) {
                    tripLandMarks.forEach((tripLandMark) => {
                        result.push(tripLandMark)
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