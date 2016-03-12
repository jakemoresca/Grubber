var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
/**
 * car service
 */
var TripService = (function () {
    function TripService(_http) {
        this._http = _http;
        this.tripSchedules = [];
        this.tripLandMarks = [];
        this.apiUrl = "/api/";
    }
    TripService.prototype.getTripSchedules = function () {
        //return an observable
        return this._http.get(this.apiUrl + 'tripschedule')
            .map(function (response) {
            return response.json();
        })
            .map(function (tripSchedules) {
            var result = [];
            if (tripSchedules) {
                tripSchedules.forEach(function (tripSchedule) {
                    result.push(tripSchedule);
                });
            }
            return result;
        });
    };
    TripService.prototype.getCarTripSchedules = function (carId) {
        return this._http.get(this.apiUrl + 'tripschedule/' + carId.toString())
            .map(function (response) {
            return response.json();
        })
            .map(function (tripSchedules) {
            var result = [];
            if (tripSchedules) {
                tripSchedules.forEach(function (tripSchedule) {
                    result.push(tripSchedule);
                });
            }
            return result;
        });
    };
    TripService.prototype.saveTripSchedules = function (tripSchedules) {
        var body = JSON.stringify(tripSchedules);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'tripschedule', body, {
            headers: headers
        })
            .map(function (response) {
            return response.json();
        })
            .map(function (tripSchedules) {
            var result = [];
            if (tripSchedules) {
                tripSchedules.forEach(function (tripSchedule) {
                    result.push(tripSchedule);
                });
            }
            return result;
        });
    };
    TripService.prototype.deleteTripSchedule = function (id) {
        return this._http.delete(this.apiUrl + 'tripschedule/' + id.toString())
            .map(function (response) {
            return response.json();
        })
            .map(function (tripSchedules) {
            var result = [];
            if (tripSchedules) {
                tripSchedules.forEach(function (tripSchedule) {
                    result.push(tripSchedule);
                });
            }
            return result;
        });
    };
    TripService.prototype.deleteTripLandMark = function (id, scheduleId) {
        return this._http.delete(this.apiUrl + 'triplandmark/' + id.toString() + "/" + scheduleId.toString())
            .map(function (response) {
            return response.json();
        })
            .map(function (tripLandMarks) {
            var result = [];
            if (tripLandMarks) {
                tripLandMarks.forEach(function (tripLandMark) {
                    result.push(tripLandMark);
                });
            }
            return result;
        });
    };
    TripService.prototype._fetchFailed = function (error) {
        console.error(error);
        return Promise.reject(error);
    };
    TripService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TripService);
    return TripService;
})();
exports.TripService = TripService;
//# sourceMappingURL=trip.service.js.map