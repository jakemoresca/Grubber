import {Component} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';
import {Car} from '../core/cars/car';
import {CarMake} from '../core/cars/car-make';
import {TripSchedule, DayOfWeek, TripType} from '../core/trips/trip-schedule';
import {TripLandMark} from '../core/trips/trip-landmark';
import {EnumHelper} from '../core/common';
import {GoogleMap} from '../core/mapping/google-map';

declare var $: any;

@Component({
    selector: 'my-car',
    moduleId: module.id,
    templateUrl: 'my-car.html',
    directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, GoogleMap],
    styles: ['.google-map-container { height: 330px; }']
})
export class MyCar {
    carMakes: Array<CarMake>;
    dayOfWeeks: Array<any> = EnumHelper.getNamesAndValues(DayOfWeek);

    car: Car;
    tripSchedules: Array<TripSchedule>;
    driverNote: string;

    currentLandMark: TripLandMark;
    landMarkModal: any;

    constructor(private _router: Router) {

        this.initializeModels();
        this.mockCarAndTripSchedules();
        this.initializeModal();
	}

    //public sundayTrip: Array<TripSchedule>;
    //public mondayTrip: Array<TripSchedule>;
    //public tuesdayTrip: Array<TripSchedule>;
    //public wednesdayTrip: Array<TripSchedule>;
    //public thursdayTrip: Array<TripSchedule>;
    //public fridayTrip: Array<TripSchedule>;
    //public saturdayTrip: Array<TripSchedule>;

    //public combineTrips() {
    //    this.tripSchedules = this.sundayTrip.concat(this.mondayTrip, this.tuesdayTrip, this.wednesdayTrip, this.thursdayTrip, this.fridayTrip, this.saturdayTrip);
    //}

    //public extractTrips() {
    //    this.sundayTrip = this.extractTrip(DayOfWeek.Sunday);
    //    this.mondayTrip = this.extractTrip(DayOfWeek.Monday);
    //    this.tuesdayTrip = this.extractTrip(DayOfWeek.Tuesday);
    //    this.wednesdayTrip = this.extractTrip(DayOfWeek.Wednesday);
    //    this.thursdayTrip = this.extractTrip(DayOfWeek.Thursday);
    //    this.fridayTrip = this.extractTrip(DayOfWeek.Friday);
    //    this.saturdayTrip = this.extractTrip(DayOfWeek.Saturday);
    //}

    //private extractTrip(day: DayOfWeek) {
    //    return this.tripSchedules.filter((value) => {
    //        var match = value.scheduleDay == day;
    //        if (match) {
    //            return match[1];
    //        }
    //    });
    //}

    initializeModels() {
        this.currentLandMark = new TripLandMark();
        this.currentLandMark.landMarkName = "Net Park";
        this.currentLandMark.latitude = 14.550157;
        this.currentLandMark.longitude = 121.046736;
    }

    initializeModal() {
        this.landMarkModal = $('#viewLandMarkModal');
    }

    mockCarAndTripSchedules() {
        var hyundai: CarMake = new CarMake();
        hyundai.id = 2;
        hyundai.name = "Hyundai";
        var honda: CarMake = new CarMake();
        honda.id = 1;
        honda.name = "Honda";
        this.carMakes = new Array<CarMake>(honda, hyundai);

        this.car = new Car();
        this.car.makeId = 2;
        this.car.color = "Black";
        this.car.noOfSeats = 4;
        this.car.plateNo = "AAO3203";
        this.car.model = "Accent";

        var landMarkSMMarikina = new TripLandMark();
        landMarkSMMarikina.landMarkName = "SM Marikina";
        landMarkSMMarikina.latitude = 14.6275;
        landMarkSMMarikina.longitude = 121.0844;
        landMarkSMMarikina.id = 1;

        var landMarkMDC100 = new TripLandMark();
        landMarkMDC100.landMarkName = "MDC 100";
        landMarkMDC100.latitude = 14.607641;
        landMarkMDC100.longitude = 121.078578
        landMarkMDC100.id = 2;

        var mondayTimeIn = new TripSchedule();
        mondayTimeIn.scheduleTime = "6:30 AM";
        mondayTimeIn.scheduleDay = DayOfWeek.Monday;
        mondayTimeIn.type = TripType.In;
        mondayTimeIn.landMarks = new Array<TripLandMark>(landMarkSMMarikina, landMarkMDC100);

        var mondayTimeOut = new TripSchedule();
        mondayTimeOut.scheduleTime = "5:00 PM";
        mondayTimeOut.scheduleDay = DayOfWeek.Monday;
        mondayTimeOut.type = TripType.Out;
        mondayTimeOut.landMarks = new Array<TripLandMark>(landMarkSMMarikina, landMarkMDC100);

        var wednesDayTimeIn = new TripSchedule();
        wednesDayTimeIn.scheduleTime = "8:30 AM";
        wednesDayTimeIn.scheduleDay = DayOfWeek.Wednesday;
        wednesDayTimeIn.type = TripType.In;
        wednesDayTimeIn.landMarks = new Array<TripLandMark>(landMarkSMMarikina, landMarkMDC100);

        this.driverNote = "No sleeping. zzzZZZZzzz";

        this.tripSchedules = new Array<TripSchedule>(mondayTimeIn, mondayTimeOut, wednesDayTimeIn);
    }

    onMakeChange(newValue) {
        this.car.makeId = newValue;
    }

    searchLandMarkName(newValue) {
        var geocoder = new google.maps.Geocoder();
        var address = newValue;
        var self = this;

        geocoder.geocode({
            'address': this.currentLandMark.landMarkName,
            componentRestrictions: {
                country: 'PH'
            }
       }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                self.currentLandMark.latitude = results[0].geometry.location.lat();
                self.currentLandMark.longitude = results[0].geometry.location.lng();
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    reverseGeocodeAddress(latitude, longitude) {
        alert(latitude);
        alert(longitude);
    }

    showModal(tripLandMark: TripLandMark) {
        $('#viewLandMarkModal').modal('show');
        $('#viewLandMarkModal').on("shown.bs.modal", function () {
            google.maps.event.trigger(document.getElementById("mapLandMark"), "resize");
        });
        this.currentLandMark = tripLandMark;
    }

}