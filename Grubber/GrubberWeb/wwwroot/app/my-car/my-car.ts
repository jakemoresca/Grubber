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
import {CarService} from './car.service';
import {TripService} from './trip.service';

declare var $: any;

@Component({
    selector: 'my-car',
    moduleId: module.id,
    templateUrl: 'my-car.html',
    directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, GoogleMap, BootstrapDatePicker],
    styles: ['.google-map-container { height: 330px; }']
})
export class MyCar {
    carMakes: Array<CarMake>;
    dayOfWeeks: Array<any> = EnumHelper.getNamesAndValues(DayOfWeek);

    car: Car;
    tripSchedules: Array<TripSchedule>;
    driverNote: string;

    landMarkModalId: any;

    currentTripSchedule: TripSchedule;
    currentLandMark: TripLandMark;
    currentLandMarkClone: TripLandMark;

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

        this.car = new Car();
        this.carMakes = new Array<CarMake>();
        this.tripSchedules = new Array<TripSchedule>();
    }

    initializeModal() {
        this.landMarkModalId = "#viewLandMarkModal";
    }

    mockCarAndTripSchedules() {
        //var hyundai: CarMake = new CarMake();
        //hyundai.id = 2;
        //hyundai.name = "Hyundai";
        //var honda: CarMake = new CarMake();
        //honda.id = 1;
        //honda.name = "Honda";
        //this.carMakes = new Array<CarMake>(honda, hyundai);

        //this.car = new Car();
        //this.car.makeId = 2;
        //this.car.color = "Black";
        //this.car.noOfSeats = 4;
        //this.car.plateNo = "AAO3203";
        //this.car.model = "Accent";

        //var landMarkSMMarikina = new TripLandMark();
        //landMarkSMMarikina.landMarkName = "SM Marikina";
        //landMarkSMMarikina.latitude = 14.6275;
        //landMarkSMMarikina.longitude = 121.0844;
        //landMarkSMMarikina.isNew = false;
        //landMarkSMMarikina.id = 1;

        //var landMarkMDC100 = new TripLandMark();
        //landMarkMDC100.landMarkName = "MDC 100";
        //landMarkMDC100.latitude = 14.607641;
        //landMarkMDC100.longitude = 121.078578;
        //landMarkMDC100.isNew = false;
        //landMarkMDC100.id = 2;

        //var mondayTimeIn = new TripSchedule();
        //mondayTimeIn.scheduleTime = "6:30 AM";
        //mondayTimeIn.scheduleDate = new Date("3/7/2016");
        //mondayTimeIn.landMarks = new Array<TripLandMark>(landMarkSMMarikina, landMarkMDC100);

        //var mondayTimeOut = new TripSchedule();
        //mondayTimeOut.scheduleTime = "5:00 PM";
        //mondayTimeOut.scheduleDate = new Date("3/7/2016");
        //mondayTimeOut.landMarks = new Array<TripLandMark>(landMarkSMMarikina, landMarkMDC100);

        //var wednesDayTimeIn = new TripSchedule();
        //wednesDayTimeIn.scheduleTime = "8:30 AM";
        //wednesDayTimeIn.scheduleDate = new Date("3/9/2016");
        //wednesDayTimeIn.landMarks = new Array<TripLandMark>(landMarkSMMarikina, landMarkMDC100);

        this.driverNote = "No sleeping. zzzZZZZzzz";

        //this.tripSchedules = new Array<TripSchedule>(mondayTimeIn, mondayTimeOut, wednesDayTimeIn);
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

    reverseGeocodeAddress(newValue) {
        var latlng = new google.maps.LatLng(newValue.latitude, newValue.longitude);
        var geocoder = new google.maps.Geocoder();
        var self = this;

        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    self.currentLandMarkClone.landMarkName = results[1].formatted_address;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    showModal(tripLandMark: TripLandMark, tripSchedule: TripSchedule) {
        $(this.landMarkModalId).modal('show');
        $(this.landMarkModalId).on("shown.bs.modal", function () {
            google.maps.event.trigger(document.getElementById("mapLandMark"), "resize");
        });
        
        this.currentLandMark = tripLandMark;
        this.currentTripSchedule = tripSchedule;
        this.currentLandMarkClone = ObjHelper.copyObject<TripLandMark>(this.currentLandMark);
    }

    saveLandMark() {
        this.currentLandMark.landMarkName = this.currentLandMarkClone.landMarkName;
        this.currentLandMark.latitude = this.currentLandMarkClone.latitude;
        this.currentLandMark.longitude = this.currentLandMarkClone.longitude;

        if (this.currentLandMarkClone.isNew == true) {
            this.currentTripSchedule.landMarks.push(this.currentLandMark);
        }

        $(this.landMarkModalId).modal('hide');
    }

    deleteLandMark(tripLandMark: TripLandMark, tripSchedule: TripSchedule) {
        this._tripService.deleteTripLandMark(tripLandMark.id)
            .subscribe(res => tripSchedule.landMarks = res);

        //var index = tripSchedule.landMarks.indexOf(tripLandMark);
        //if (index > -1) {
        //    tripSchedule.landMarks.splice(index, 1);
        //}
    }

    newLandMark(tripSchedule: TripSchedule) {
        var newLandMark = new TripLandMark();
        newLandMark.landMarkName = "Net Park";
        newLandMark.latitude = 14.550157;
        newLandMark.longitude = 121.046736;
        newLandMark.isNew = true;

        this.showModal(newLandMark, tripSchedule);
    }

    newTripSchedule() {
        var newTripSchedule = new TripSchedule();
        newTripSchedule.carId = this.car.id;
        newTripSchedule.landMarks = new Array<TripLandMark>();

        this.tripSchedules.push(newTripSchedule);
    }

    removeSchedule(tripSchedule: TripSchedule) {
        this._tripService.deleteTripSchedule(tripSchedule.id)
            .subscribe(res => this.tripSchedules = res);

        //var index = this.tripSchedules.indexOf(tripSchedule);
        //if (index > -1) {
        //    this.tripSchedules.splice(index, 1);
        //}
    }

    //onWeekDayChange(newValue, tripSchedule: TripSchedule) {
    //    tripSchedule.scheduleDay = newValue;
    //}

    saveCar() {
        this._carService.saveCar(this.car)
            .subscribe(res => this.car = res);
    }

    saveTripSchedules() {
        this._tripService.saveTripSchedules(this.tripSchedules)
            .subscribe(res => this.tripSchedules = res);
    }
}