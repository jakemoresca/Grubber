import {Http} from 'angular2/http';
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

    getTripSchedule(carId: number) {
        return this._http.get(this.apiUrl + 'tripschedule/' + carId.toString())
            .map((response) => {
                return response.json();
            })
            .map((tripSchedule: TripSchedule) => {
                let result: any = null;

                if (tripSchedule) {
                    //var tripLandMarks = new Array<TripLandMark>();
                    //tripSchedule.landMarks.forEach((tripLandMark) => {
                    //    tripLandMarks.push(tripLandMark);
                    //});

                    //tripSchedule.landMarks = tripLandMarks;
                    result = tripSchedule;
                };
                return result;
            });
    }


    private _fetchFailed(error: any) {
        console.error(error);
        return Promise.reject(error);
    }
}