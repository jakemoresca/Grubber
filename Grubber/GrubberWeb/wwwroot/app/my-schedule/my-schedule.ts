import {Component} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';
import {Car} from '../core/cars/car';
import {CarMake} from '../core/cars/car-make';
import {TripSchedule, DayOfWeek, TripType} from '../core/trips/trip-schedule';
import {TripLandMark} from '../core/trips/trip-landmark';
import {EnumHelper, ObjHelper} from '../core/common';
import {GoogleMap} from '../core/mapping/google-map';
import {BootstrapDatePicker} from '../core/datepicker/bootstrap-datepicker';
import {CarService} from '../my-car/car.service';
import {TripService} from './trip.service';

declare var $: any;

@Component({
    selector: 'my-schedule',
    moduleId: module.id,
    templateUrl: 'my-schedule.html',
    directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, GoogleMap, BootstrapDatePicker],
    styles: ['.google-map-container { height: 330px; }']
})
export class MySchedule {
    carMakes: Array<CarMake>;
    dayOfWeeks: Array<any> = EnumHelper.getNamesAndValues(DayOfWeek);

    car: Car;
    tripSchedules: Array<TripSchedule>;
    driverNote: string;

    landMarkModalId: any;

    currentTripSchedule: TripSchedule;
    currentTripScheduleClone: TripSchedule;
    currentLandMark: TripLandMark;
    currentLandMarkClone: TripLandMark;
    showDetailView: boolean = false;

    constructor(private _router: Router, private _carService: CarService, private _tripService: TripService) {
        _carService.getCarMakes()
            .subscribe(res => this.carMakes = res);

        _carService.getCar(1)
            .subscribe(res => this.car = res);

        _tripService.getCarTripSchedules(1)
            .subscribe(res => this.tripSchedules = res);

        this.initializeModels();
        this.mockCarAndTripSchedules();
        this.initializeModal();
	}

    initializeModels() {
        this.currentLandMark = new TripLandMark();
        this.currentLandMark.landMarkName = "Net Park";
        this.currentLandMark.latitude = 14.550157;
        this.currentLandMark.longitude = 121.046736;
        this.currentLandMarkClone = ObjHelper.copyObject<TripLandMark>(this.currentLandMark);

        this.currentTripSchedule = new TripSchedule();
        this.currentTripScheduleClone = ObjHelper.copyObject<TripSchedule>(this.currentTripSchedule);

        this.car = new Car();
        this.carMakes = new Array<CarMake>();
        this.tripSchedules = new Array<TripSchedule>();
    }

    initializeModal() {
        this.landMarkModalId = "#viewLandMarkModal";
    }

    mockCarAndTripSchedules() {
        this.driverNote = "No sleeping. zzzZZZZzzz";
    }

    onMakeChange(newValue) {
        this.car.makeId = newValue;
    }

    searchLandMarkName(newValue) {
        var geocoder = new google.maps.Geocoder();
        var address = newValue;
        var self = this;

        geocoder.geocode({
            'address': this.currentLandMarkClone.landMarkName,
            componentRestrictions: {
                country: 'PH'
            }
       }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                self.currentLandMarkClone.latitude = results[0].geometry.location.lat();
                self.currentLandMarkClone.longitude = results[0].geometry.location.lng();
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    updateLocation(newValue) {
        this.currentLandMarkClone.latitude = newValue.latitude;
        this.currentLandMarkClone.longitude = newValue.longitude;
        this.currentLandMarkClone.landMarkName = newValue.landMarkName;
        //var latlng = new google.maps.LatLng(newValue.latitude, newValue.longitude);
        //var geocoder = new google.maps.Geocoder();
        //var self = this;

        //geocoder.geocode({ 'location': latlng }, function (results, status) {
        //    if (status === google.maps.GeocoderStatus.OK) {
        //        if (results[1]) {
        //            self.currentLandMarkClone.latitude = newValue.latitude;
        //            self.currentLandMarkClone.longitude = newValue.longitude;
        //            self.currentLandMarkClone.landMarkName = results[1].formatted_address;
        //        } else {
        //            window.alert('No results found');
        //        }
        //    } else {
        //        window.alert('Geocoder failed due to: ' + status);
        //    }
        //});
    }

    reverseGeocodeAddress(newValue) {
        var latlng = new google.maps.LatLng(newValue.latitude, newValue.longitude);
        var geocoder = new google.maps.Geocoder();
        var self = this;

        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    self.currentLandMarkClone.latitude = newValue.latitude;
                    self.currentLandMarkClone.longitude = newValue.longitude;
                    self.currentLandMarkClone.landMarkName = results[1].formatted_address;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    showModal(tripLandMark: TripLandMark) {
        $(this.landMarkModalId).modal('show');
        $(this.landMarkModalId).on("shown.bs.modal", function () {
            google.maps.event.trigger(document.getElementById("mapLandMark"), "resize");
        });
        
        this.currentLandMark = tripLandMark;
        this.currentLandMarkClone = ObjHelper.copyObject<TripLandMark>(this.currentLandMark);
    }

    saveLandMark() {
        this.currentLandMark.landMarkName = this.currentLandMarkClone.landMarkName;
        this.currentLandMark.latitude = this.currentLandMarkClone.latitude;
        this.currentLandMark.longitude = this.currentLandMarkClone.longitude;

        if (this.currentLandMarkClone.isNew == true) {
            this.currentTripScheduleClone.landMarks.push(this.currentLandMark);
        }

        $(this.landMarkModalId).modal('hide');
    }

    deleteLandMark(tripLandMark: TripLandMark, tripSchedule: TripSchedule) {
        if (tripLandMark.isNew) {
            var index = tripSchedule.landMarks.indexOf(tripLandMark);
            if (index > -1) {
                tripSchedule.landMarks.splice(index, 1);
            }
        }
        else {
            this._tripService.deleteTripLandMark(tripLandMark.id, tripSchedule.id)
                .subscribe(res => tripSchedule.landMarks = res);
        }
    }

    newLandMark(tripSchedule: TripSchedule) {
        var newLandMark = new TripLandMark();
        newLandMark.landMarkName = "Net Park";
        newLandMark.latitude = 14.550157;
        newLandMark.longitude = 121.046736;
        newLandMark.isNew = true;

        this.showModal(newLandMark);
    }

    newTripSchedule() {
        var newTripSchedule = new TripSchedule();
        newTripSchedule.carId = this.car.id;
        newTripSchedule.isNew = true;
        newTripSchedule.landMarks = new Array<TripLandMark>();

        this.tripSchedules.push(newTripSchedule);
    }

    removeSchedule(tripSchedule: TripSchedule) {
        if (tripSchedule.isNew) {
            var index = this.tripSchedules.indexOf(tripSchedule);
            if (index > -1) {
                this.tripSchedules.splice(index, 1);
            }
        }
        else {
            this._tripService.deleteTripSchedule(tripSchedule.id)
                .subscribe(res => this.tripSchedules = res);
        }
    }

    saveTripSchedule(tripSchedule: TripSchedule) {
        this.currentTripSchedule = tripSchedule;
        this._tripService.saveTripSchedules([this.currentTripSchedule])
            .subscribe(res => this.tripSchedules = res);

        this.showDetailView = false;
    }

    viewTripSchedule(tripSchedule: TripSchedule) {
        this.currentTripSchedule = tripSchedule;
        this.currentTripScheduleClone = ObjHelper.copyObject<TripSchedule>(this.currentTripSchedule);
        this.showDetailView = true;
    }

    closeViewTripSchedule() {
        this.showDetailView = false;
    }
}