/// <reference path="../../../scripts/typings/moment.d.ts" />
/// <reference path="../../../scripts/typings/google.maps.d.ts" />

import {Component} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router, Location} from 'angular2/router';
import {Routes} from '../routes.config';
import {User} from '../core/user';
import {ReservationService} from '../core/reservation/reservation.service';
import {AccountService} from '../login/account.service';
import {PlaceSearchBox} from '../core/mapping/place-search-box';
import {TripSchedule, DayOfWeek, TripType} from '../core/trips/trip-schedule';
import {TripDistance} from '../core/trips/trip-distance';
import {TripLandMark} from '../core/trips/trip-landmark';
import {TripService} from '../my-schedule/trip.service';
import {BootstrapDatePicker} from '../core/datepicker/bootstrap-datepicker';
import {GoogleMap} from '../core/mapping/google-map';
import {TripReservation, ReservationStatus} from '../core/reservation/trip-reservation';
import {BatchTripReservation} from '../core/reservation/batch-trip-reservation';

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: 'home.html',
    directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, PlaceSearchBox, BootstrapDatePicker, GoogleMap],
    styles: ['.google-map-container { height: 330px; }']
})
export class Home{
    user: User;
    users: Array<User>;
    startLat: number = 14.550157;
    startLng: number = 121.046736;
    startPlace: string;
    toLat: number;
    toLng: number;
    toPlace: string;
    scheduleDate: string = moment().format('MM/DD/YYYY');
    locationWatchId: number;
    tripSchedules: Array<TripSchedule>;

    topTripDistances: Array<TripDistance>;
    tripSchedulesForDrivers: Array<TripSchedule>;

    constructor(private _router: Router, private _location: Location, private _accountService: AccountService, private _tripService: TripService, private _reservationService: ReservationService) {
        _accountService.getAllUsers()
            .subscribe(res => this.users = res);

        _accountService.getCurrentUser()
            .subscribe(res => {
                if (res.userName == null) {
                    _router.navigateByUrl("/login");
                }
                else {
                    this.user = res;

                    _reservationService.getCarPoolForDrivers(this.user.id)
                        .subscribe(schedRes => {
                            this.tripSchedulesForDrivers = schedRes;
                        });
                }
            });

        this.tripSchedulesForDrivers = new Array<TripSchedule>();
        this.topTripDistances = new Array<TripDistance>();
    }

    startTripChanged(newValue) {
        this.startLat = newValue.latitude;
        this.startLng = newValue.longitude;
        this.startPlace = newValue.name;
    }

    toTripChanged(newValue) {
        this.toLat = newValue.latitude;
        this.toLng = newValue.longitude;
        this.toPlace = newValue.name;
    }

    searchDriver() {
        this._tripService.getTripSchedules()
            .subscribe(res => {
                this.tripSchedules = res;
                this.getNearestTripDistance();
            });
    }

    approveRequest(reservationId: number) {
        this._reservationService.approveRequest(reservationId)
            .subscribe(res => {
                alert("Processing Successful");

                this._reservationService.getCarPoolForDrivers(this.user.id)
                    .subscribe(schedRes => {
                        this.tripSchedulesForDrivers = schedRes;
                    });
            });
    }

    rejectRequest(reservationId: number) {
        this._reservationService.rejectRequest(reservationId)
            .subscribe(res => {
                alert("Processing Successful");

                this._reservationService.getCarPoolForDrivers(this.user.id)
                    .subscribe(schedRes => {
                        this.tripSchedulesForDrivers = schedRes;
                    });
            });
    }

    reserveTripSchedule() {
        var selectedTripDistances = this.topTripDistances.filter(tripDistance => tripDistance.isSelected == true);
        var batchTripReservation = this.createBatchTripReservation(selectedTripDistances);

        this._reservationService.addBatchTripReservation(batchTripReservation)
            .subscribe(result => {
                alert("Reservation Successful")
                this.topTripDistances = [];
            });
    }

    createBatchTripReservation(tripDistances: Array<TripDistance>) {
        var batchTripReservation = new BatchTripReservation();
        batchTripReservation.userId = this.user.id;
        batchTripReservation.reservations = new Array<TripReservation>();

        var self = this;
        tripDistances.forEach(tripDistance => {
            var tripReservation = self.createTripReservation(tripDistance);
            batchTripReservation.reservations.push(tripReservation);
        });

        return batchTripReservation;
    }

    createTripReservation(tripDistance: TripDistance): TripReservation {
        var tripReservation = new TripReservation();
        tripReservation.status = ReservationStatus.Requested;
        tripReservation.tripStart = this.startPlace;
        tripReservation.tripStartLat = this.startLat;
        tripReservation.tripStartLng = this.startLng;
        tripReservation.tripTo = this.toPlace;
        tripReservation.tripToLat = this.toLat;
        tripReservation.tripToLng = this.toLng;
        tripReservation.tripScheduleId = tripDistance.id;
        tripReservation.userId = this.user.id;
        
        return tripReservation;
    }

    getNearestTripDistance() {
        var spherical = google.maps.geometry.spherical;
        var tempTopTripDistances = new Array<TripDistance>();

        this.tripSchedules.forEach(tripSchedule => {
            var tripDistance = <TripDistance>tripSchedule;
            var nearestFrom = new TripLandMark();
            var nearestFromDistance: number;
            var nearestTo = new TripLandMark();
            var nearestToDistance: number;
            var nearestIndex: number;

            var scheduledDate = moment(tripSchedule.scheduleDate, "MM/DD/yyyy");
            var isValidSchedule: boolean = false;
            if (tripSchedule.landMarks.length >= 2) isValidSchedule = true;

            if (scheduledDate.dayOfYear() >= moment().dayOfYear() && isValidSchedule) {

                for (var fromTL = 0; fromTL < tripSchedule.landMarks.length - 1; fromTL++) {
                    var tripLandMark = tripSchedule.landMarks[fromTL];
                    var startDistance = spherical.computeDistanceBetween(new google.maps.LatLng(tripLandMark.latitude, tripLandMark.longitude),
                        new google.maps.LatLng(this.startLat, this.startLng));

                    if (nearestFrom.id == null) {
                        nearestFromDistance = startDistance;
                        nearestFrom = tripLandMark;
                        nearestIndex = fromTL;
                    }

                    if (nearestFromDistance > startDistance) {
                        nearestFromDistance = startDistance;
                        nearestFrom = tripLandMark;
                        nearestIndex = fromTL;
                    }
                }

                for (var toTL = nearestIndex; toTL < tripSchedule.landMarks.length; toTL++) {
                    var tripLandMark = tripSchedule.landMarks[toTL];
                    var toDistance = spherical.computeDistanceBetween(new google.maps.LatLng(tripLandMark.latitude, tripLandMark.longitude),
                        new google.maps.LatLng(this.toLat, this.toLng));

                    if (nearestTo.id == null) {
                        nearestToDistance = toDistance;
                        nearestTo = tripLandMark;
                    }

                    if (nearestToDistance > toDistance) {
                        nearestToDistance = toDistance;
                        nearestTo = tripLandMark;
                    }
                }

                tripDistance.fromDistance = nearestFromDistance;
                tripDistance.fromLandMark = nearestFrom;
                tripDistance.toDistance = nearestToDistance;
                tripDistance.toLandMark = nearestTo;

                if (tempTopTripDistances.length > 0) {
                    for (var t = 0; t < tempTopTripDistances.length; t++) {
                        var currentTopTripDistance = tempTopTripDistances[t];
                        if (currentTopTripDistance.fromDistance + currentTopTripDistance.toDistance > tripDistance.fromDistance + tripDistance.toDistance) {
                            tempTopTripDistances.splice(t, 0, tripDistance);
                            t = tempTopTripDistances.length;
                        }
                        else {
                            if (t == tempTopTripDistances.length - 1) {
                                tempTopTripDistances.push(tripDistance);
                                t = tempTopTripDistances.length;
                            }
                        }
                    }
                    if (tempTopTripDistances.length > 10) tempTopTripDistances.pop();
                }
                else tempTopTripDistances.push(tripDistance);
            }
        });

        this.topTripDistances = tempTopTripDistances;
        if (tempTopTripDistances.length == 0) alert("No Driver Found.");
    }
}