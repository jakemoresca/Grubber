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
var trip_schedule_1 = require('../core/trips/trip-schedule');
var trip_landmark_1 = require('../core/trips/trip-landmark');
var common_1 = require('../core/common');
var google_map_1 = require('../core/mapping/google-map');
var bootstrap_datepicker_1 = require('../core/datepicker/bootstrap-datepicker');
var car_service_1 = require('./car.service');
var trip_service_1 = require('./trip.service');
var MyCar = (function () {
    function MyCar(_router, _carService, _tripService) {
        var _this = this;
        this._router = _router;
        this._carService = _carService;
        this._tripService = _tripService;
        this.dayOfWeeks = common_1.EnumHelper.getNamesAndValues(trip_schedule_1.DayOfWeek);
        _carService.getCarMakes()
            .subscribe(function (res) { return _this.carMakes = res; });
        _carService.getCar(1)
            .subscribe(function (res) { return _this.car = res; });
        _tripService.getTripSchedule(1)
            .subscribe(function (res) { return _this.tripSchedules = res; });
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
        this.currentLandMarkClone = common_1.ObjHelper.copyObject(this.currentLandMark);
        this.car = new car_1.Car();
        this.carMakes = new Array();
        this.tripSchedules = new Array();
    };
    MyCar.prototype.initializeModal = function () {
        this.landMarkModalId = "#viewLandMarkModal";
    };
    MyCar.prototype.mockCarAndTripSchedules = function () {
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
    };
    MyCar.prototype.onMakeChange = function (newValue) {
        this.car.makeId = newValue;
    };
    MyCar.prototype.searchLandMarkName = function (newValue) {
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
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    MyCar.prototype.reverseGeocodeAddress = function (newValue) {
        var latlng = new google.maps.LatLng(newValue.latitude, newValue.longitude);
        var geocoder = new google.maps.Geocoder();
        var self = this;
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    self.currentLandMarkClone.landMarkName = results[1].formatted_address;
                }
                else {
                    window.alert('No results found');
                }
            }
            else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    };
    MyCar.prototype.showModal = function (tripLandMark, tripSchedule) {
        $(this.landMarkModalId).modal('show');
        $(this.landMarkModalId).on("shown.bs.modal", function () {
            google.maps.event.trigger(document.getElementById("mapLandMark"), "resize");
        });
        this.currentLandMark = tripLandMark;
        this.currentTripSchedule = tripSchedule;
        this.currentLandMarkClone = common_1.ObjHelper.copyObject(this.currentLandMark);
    };
    MyCar.prototype.saveLandMark = function () {
        this.currentLandMark.landMarkName = this.currentLandMarkClone.landMarkName;
        this.currentLandMark.latitude = this.currentLandMarkClone.latitude;
        this.currentLandMark.longitude = this.currentLandMarkClone.longitude;
        if (this.currentLandMarkClone.isNew == true) {
            this.currentTripSchedule.landMarks.push(this.currentLandMark);
        }
        $(this.landMarkModalId).modal('hide');
    };
    MyCar.prototype.deleteLandMark = function (tripLandMark, tripSchedule) {
        var index = tripSchedule.landMarks.indexOf(tripLandMark);
        if (index > -1) {
            tripSchedule.landMarks.splice(index, 1);
        }
    };
    MyCar.prototype.newLandMark = function (tripSchedule) {
        var newLandMark = new trip_landmark_1.TripLandMark();
        newLandMark.landMarkName = "Net Park";
        newLandMark.latitude = 14.550157;
        newLandMark.longitude = 121.046736;
        newLandMark.isNew = true;
        this.showModal(newLandMark, tripSchedule);
    };
    MyCar.prototype.newTripSchedule = function () {
        var newTripSchedule = new trip_schedule_1.TripSchedule();
        newTripSchedule.carId = this.car.id;
        newTripSchedule.landMarks = new Array();
        this.tripSchedules.push(newTripSchedule);
    };
    MyCar.prototype.removeSchedule = function (tripSchedule) {
        var index = this.tripSchedules.indexOf(tripSchedule);
        if (index > -1) {
            this.tripSchedules.splice(index, 1);
        }
    };
    MyCar = __decorate([
        core_1.Component({
            selector: 'my-car',
            moduleId: module.id,
            templateUrl: 'my-car.html',
            directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, google_map_1.GoogleMap, bootstrap_datepicker_1.BootstrapDatePicker],
            styles: ['.google-map-container { height: 330px; }']
        }), 
        __metadata('design:paramtypes', [router_1.Router, car_service_1.CarService, trip_service_1.TripService])
    ], MyCar);
    return MyCar;
})();
exports.MyCar = MyCar;
//# sourceMappingURL=My-Car.js.map