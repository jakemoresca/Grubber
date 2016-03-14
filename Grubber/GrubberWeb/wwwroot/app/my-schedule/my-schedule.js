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
var user_1 = require('../core/user');
var trip_schedule_1 = require('../core/trips/trip-schedule');
var trip_landmark_1 = require('../core/trips/trip-landmark');
var common_1 = require('../core/common');
var google_map_1 = require('../core/mapping/google-map');
var bootstrap_datepicker_1 = require('../core/datepicker/bootstrap-datepicker');
var account_service_1 = require('../login/account.service');
var trip_service_1 = require('./trip.service');
var MySchedule = (function () {
    function MySchedule(_router, _tripService, _accountService) {
        var _this = this;
        this._router = _router;
        this._tripService = _tripService;
        this._accountService = _accountService;
        this.dayOfWeeks = common_1.EnumHelper.getNamesAndValues(trip_schedule_1.DayOfWeek);
        this.showDetailView = false;
        this.initializeModels();
        this.mockCarAndTripSchedules();
        this.initializeModal();
        _accountService.getCurrentUser()
            .subscribe(function (resCar) {
            _this.user = resCar;
            _tripService.getCarTripSchedules(_this.user.id)
                .subscribe(function (resSched) { return _this.tripSchedules = resSched; });
        });
    }
    MySchedule.prototype.initializeModels = function () {
        this.currentLandMark = new trip_landmark_1.TripLandMark();
        this.currentLandMark.landMarkName = "Net Park";
        this.currentLandMark.latitude = 14.550157;
        this.currentLandMark.longitude = 121.046736;
        this.currentLandMarkClone = common_1.ObjHelper.copyObject(this.currentLandMark);
        this.currentTripSchedule = new trip_schedule_1.TripSchedule();
        this.currentTripScheduleClone = common_1.ObjHelper.copyObject(this.currentTripSchedule);
        this.user = new user_1.User();
        this.tripSchedules = new Array();
    };
    MySchedule.prototype.initializeModal = function () {
        this.landMarkModalId = "#viewLandMarkModal";
    };
    MySchedule.prototype.mockCarAndTripSchedules = function () {
        this.driverNote = "No sleeping. zzzZZZZzzz";
    };
    MySchedule.prototype.searchLandMarkName = function (newValue) {
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
    MySchedule.prototype.updateLocation = function (newValue) {
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
    };
    MySchedule.prototype.reverseGeocodeAddress = function (newValue) {
        var latlng = new google.maps.LatLng(newValue.latitude, newValue.longitude);
        var geocoder = new google.maps.Geocoder();
        var self = this;
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    self.currentLandMarkClone.latitude = newValue.latitude;
                    self.currentLandMarkClone.longitude = newValue.longitude;
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
    MySchedule.prototype.showModal = function (tripLandMark) {
        $(this.landMarkModalId).modal('show');
        $(this.landMarkModalId).on("shown.bs.modal", function () {
            google.maps.event.trigger(document.getElementById("mapLandMark"), "resize");
        });
        this.currentLandMark = tripLandMark;
        this.currentLandMarkClone = common_1.ObjHelper.copyObject(this.currentLandMark);
    };
    MySchedule.prototype.saveLandMark = function () {
        this.currentLandMark.landMarkName = this.currentLandMarkClone.landMarkName;
        this.currentLandMark.latitude = this.currentLandMarkClone.latitude;
        this.currentLandMark.longitude = this.currentLandMarkClone.longitude;
        if (this.currentLandMarkClone.isNew == true) {
            this.currentTripScheduleClone.landMarks.push(this.currentLandMark);
        }
        $(this.landMarkModalId).modal('hide');
    };
    MySchedule.prototype.deleteLandMark = function (tripLandMark, tripSchedule) {
        if (tripLandMark.isNew) {
            var index = tripSchedule.landMarks.indexOf(tripLandMark);
            if (index > -1) {
                tripSchedule.landMarks.splice(index, 1);
            }
        }
        else {
            this._tripService.deleteTripLandMark(tripLandMark.id, tripSchedule.id)
                .subscribe(function (res) { return tripSchedule.landMarks = res; });
        }
    };
    MySchedule.prototype.newLandMark = function (tripSchedule) {
        var newLandMark = new trip_landmark_1.TripLandMark();
        newLandMark.landMarkName = "Net Park";
        newLandMark.latitude = 14.550157;
        newLandMark.longitude = 121.046736;
        newLandMark.isNew = true;
        this.showModal(newLandMark);
    };
    MySchedule.prototype.newTripSchedule = function () {
        var newTripSchedule = new trip_schedule_1.TripSchedule();
        newTripSchedule.userId = this.user.id;
        newTripSchedule.isNew = true;
        newTripSchedule.landMarks = new Array();
        this.tripSchedules.push(newTripSchedule);
    };
    MySchedule.prototype.removeSchedule = function (tripSchedule) {
        var _this = this;
        if (tripSchedule.isNew) {
            var index = this.tripSchedules.indexOf(tripSchedule);
            if (index > -1) {
                this.tripSchedules.splice(index, 1);
            }
        }
        else {
            this._tripService.deleteTripSchedule(tripSchedule.id)
                .subscribe(function (res) { return _this.tripSchedules = res; });
        }
    };
    MySchedule.prototype.saveTripSchedule = function (tripSchedule) {
        var _this = this;
        this.currentTripSchedule = tripSchedule;
        this._tripService.saveTripSchedules([this.currentTripSchedule])
            .subscribe(function (res) { return _this.tripSchedules = res; });
        this.showDetailView = false;
    };
    MySchedule.prototype.viewTripSchedule = function (tripSchedule) {
        this.currentTripSchedule = tripSchedule;
        this.currentTripScheduleClone = common_1.ObjHelper.copyObject(this.currentTripSchedule);
        this.showDetailView = true;
    };
    MySchedule.prototype.closeViewTripSchedule = function () {
        this.showDetailView = false;
    };
    MySchedule = __decorate([
        core_1.Component({
            selector: 'my-schedule',
            moduleId: module.id,
            templateUrl: 'my-schedule.html',
            directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, google_map_1.GoogleMap, bootstrap_datepicker_1.BootstrapDatePicker],
            styles: ['.google-map-container { height: 330px; }']
        }), 
        __metadata('design:paramtypes', [router_1.Router, trip_service_1.TripService, account_service_1.AccountService])
    ], MySchedule);
    return MySchedule;
})();
exports.MySchedule = MySchedule;
//# sourceMappingURL=My-Schedule.js.map