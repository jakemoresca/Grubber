/// <reference path="../../../scripts/typings/moment.d.ts" />
/// <reference path="../../../scripts/typings/google.maps.d.ts" />
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
var account_service_1 = require('../login/account.service');
var place_search_box_1 = require('../core/mapping/place-search-box');
var trip_landmark_1 = require('../core/trips/trip-landmark');
var trip_service_1 = require('../my-schedule/trip.service');
var bootstrap_datepicker_1 = require('../core/datepicker/bootstrap-datepicker');
var Home = (function () {
    function Home(_router, _location, _accountService, _tripService) {
        var _this = this;
        this._router = _router;
        this._location = _location;
        this._accountService = _accountService;
        this._tripService = _tripService;
        this.scheduleDate = moment().format('MM/DD/YYYY');
        _accountService.getCurrentUser()
            .subscribe(function (res) {
            if (res.userName == null) {
                _router.navigateByUrl("/login");
            }
            else {
                _this.user = res;
            }
        });
        this.topTripDistances = new Array();
    }
    Home.prototype.startTripChanged = function (newValue) {
        this.startLat = newValue.latitude;
        this.startLng = newValue.longitude;
        this.startPlace = newValue.name;
    };
    Home.prototype.toTripChanged = function (newValue) {
        this.toLat = newValue.latitude;
        this.toLng = newValue.longitude;
        this.toPlace = newValue.name;
    };
    Home.prototype.searchDriver = function () {
        var _this = this;
        this._tripService.getTripSchedules()
            .subscribe(function (res) {
            _this.tripSchedules = res;
            _this.getNearestTripDistance();
        });
    };
    Home.prototype.getNearestTripDistance = function () {
        var _this = this;
        var spherical = google.maps.geometry.spherical;
        var tempTopTripDistances = new Array();
        this.tripSchedules.forEach(function (tripSchedule) {
            var tripDistance = tripSchedule;
            var nearestFrom = new trip_landmark_1.TripLandMark();
            var nearestFromDistance;
            var nearestTo = new trip_landmark_1.TripLandMark();
            var nearestToDistance;
            var scheduledDate = moment(tripSchedule.scheduleDate, "MM/DD/yyyy");
            var isValidSchedule = false;
            if (tripSchedule.landMarks.length >= 2)
                isValidSchedule = true;
            if (scheduledDate.dayOfYear() >= moment().dayOfYear() && isValidSchedule) {
                for (var fromTL = 0; fromTL < tripSchedule.landMarks.length - 1; fromTL++) {
                    var tripLandMark = tripSchedule.landMarks[fromTL];
                    var startDistance = spherical.computeDistanceBetween(new google.maps.LatLng(tripLandMark.latitude, tripLandMark.longitude), new google.maps.LatLng(_this.startLat, _this.startLng));
                    if (nearestFrom.id == null) {
                        nearestFromDistance = startDistance;
                        nearestFrom = tripLandMark;
                    }
                    if (nearestFromDistance > startDistance) {
                        nearestFromDistance = startDistance;
                        nearestFrom = tripLandMark;
                    }
                }
                for (var toTL = 1; toTL < tripSchedule.landMarks.length; toTL++) {
                    var tripLandMark = tripSchedule.landMarks[toTL];
                    var toDistance = spherical.computeDistanceBetween(new google.maps.LatLng(tripLandMark.latitude, tripLandMark.longitude), new google.maps.LatLng(_this.toLat, _this.toLng));
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
                    if (tempTopTripDistances.length > 10)
                        tempTopTripDistances.pop();
                }
                else
                    tempTopTripDistances.push(tripDistance);
            }
        });
        this.topTripDistances = tempTopTripDistances;
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            moduleId: module.id,
            templateUrl: 'home.html',
            directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, place_search_box_1.PlaceSearchBox, bootstrap_datepicker_1.BootstrapDatePicker]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.Location, account_service_1.AccountService, trip_service_1.TripService])
    ], Home);
    return Home;
})();
exports.Home = Home;
//# sourceMappingURL=Home.js.map