var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var ng = require('angular2/common');
var router_1 = require('angular2/router');
var car_1 = require('../core/cars/car');
var car_make_1 = require('../core/cars/car-make');
var trip_schedule_1 = require('../core/trips/trip-schedule');
var trip_landmark_1 = require('../core/trips/trip-landmark');
var common_1 = require('../core/common');
var google_map_1 = require('../core/mapping/google-map');
var MyCar = (function () {
    function MyCar(_router) {
        this._router = _router;
        this.dayOfWeeks = common_1.EnumHelper.getNamesAndValues(trip_schedule_1.DayOfWeek);
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
    MyCar.prototype.initializeModels = function () {
        this.currentLandMark = new trip_landmark_1.TripLandMark();
        this.currentLandMark.landMarkName = "Net Park";
        this.currentLandMark.latitude = 14.550157;
        this.currentLandMark.longitude = 121.046736;
    };
    MyCar.prototype.initializeModal = function () {
        this.landMarkModal = $('#viewLandMarkModal');
    };
    MyCar.prototype.mockCarAndTripSchedules = function () {
        var hyundai = new car_make_1.CarMake();
        hyundai.id = 2;
        hyundai.name = "Hyundai";
        var honda = new car_make_1.CarMake();
        honda.id = 1;
        honda.name = "Honda";
        this.carMakes = new Array(honda, hyundai);
        this.car = new car_1.Car();
        this.car.makeId = 2;
        this.car.color = "Black";
        this.car.noOfSeats = 4;
        this.car.plateNo = "AAO3203";
        this.car.model = "Accent";
        var landMarkSMMarikina = new trip_landmark_1.TripLandMark();
        landMarkSMMarikina.landMarkName = "SM Marikina";
        landMarkSMMarikina.latitude = 14.6275;
        landMarkSMMarikina.longitude = 121.0844;
        landMarkSMMarikina.id = 1;
        var landMarkMDC100 = new trip_landmark_1.TripLandMark();
        landMarkMDC100.landMarkName = "MDC 100";
        landMarkMDC100.latitude = 14.607641;
        landMarkMDC100.longitude = 121.078578;
        landMarkMDC100.id = 2;
        var mondayTimeIn = new trip_schedule_1.TripSchedule();
        mondayTimeIn.scheduleTime = "6:30 AM";
        mondayTimeIn.scheduleDay = trip_schedule_1.DayOfWeek.Monday;
        mondayTimeIn.type = trip_schedule_1.TripType.In;
        mondayTimeIn.landMarks = new Array(landMarkSMMarikina, landMarkMDC100);
        var mondayTimeOut = new trip_schedule_1.TripSchedule();
        mondayTimeOut.scheduleTime = "5:00 PM";
        mondayTimeOut.scheduleDay = trip_schedule_1.DayOfWeek.Monday;
        mondayTimeOut.type = trip_schedule_1.TripType.Out;
        mondayTimeOut.landMarks = new Array(landMarkSMMarikina, landMarkMDC100);
        var wednesDayTimeIn = new trip_schedule_1.TripSchedule();
        wednesDayTimeIn.scheduleTime = "8:30 AM";
        wednesDayTimeIn.scheduleDay = trip_schedule_1.DayOfWeek.Wednesday;
        wednesDayTimeIn.type = trip_schedule_1.TripType.In;
        wednesDayTimeIn.landMarks = new Array(landMarkSMMarikina, landMarkMDC100);
        this.driverNote = "No sleeping. zzzZZZZzzz";
        this.tripSchedules = new Array(mondayTimeIn, mondayTimeOut, wednesDayTimeIn);
    };
    MyCar.prototype.onMakeChange = function (newValue) {
        this.car.makeId = newValue;
    };
    MyCar.prototype.searchLandMarkName = function (newValue) {
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
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    MyCar.prototype.reverseGeocodeAddress = function (latitude, longitude) {
        alert(latitude);
        alert(longitude);
    };
    MyCar.prototype.showModal = function (tripLandMark) {
        $('#viewLandMarkModal').modal('show');
        $('#viewLandMarkModal').on("shown.bs.modal", function () {
            google.maps.event.trigger(document.getElementById("mapLandMark"), "resize");
        });
        this.currentLandMark = tripLandMark;
    };
    MyCar = __decorate([
        core_1.Component({
            selector: 'my-car',
            moduleId: module.id,
            templateUrl: 'my-car.html',
            directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, google_map_1.GoogleMap],
            styles: ['.google-map-container { height: 330px; }']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], MyCar);
    return MyCar;
})();
exports.MyCar = MyCar;
//# sourceMappingURL=My-Car.js.map