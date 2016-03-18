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
var ReservationService = (function () {
    function ReservationService(_http) {
        this._http = _http;
        this.apiUrl = "/api/reservation";
    }
    ReservationService.prototype.addBatchTripReservation = function (batchTripReservation) {
        var body = JSON.stringify(batchTripReservation);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.apiUrl, body, {
            headers: headers
        })
            .map(function (response) {
            return response.json();
        })
            .map(function (batchTripReservation) {
            var result;
            ;
            result = batchTripReservation;
            return result;
        });
    };
    ReservationService.prototype.approveRequest = function (reservationId) {
        var body = "";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put(this.apiUrl + "/" + reservationId.toString() + "/1", body, {
            headers: headers
        })
            .map(function (response) {
            return response.json();
        })
            .map(function (status) {
            var result;
            result = status;
            return result;
        });
    };
    ReservationService.prototype.rejectRequest = function (reservationId) {
        var body = "";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put(this.apiUrl + "/" + reservationId.toString() + "/2", body, {
            headers: headers
        })
            .map(function (response) {
            return response.json();
        })
            .map(function (status) {
            var result;
            result = status;
            return result;
        });
    };
    ReservationService.prototype.getCarPoolForDrivers = function (userId) {
        return this._http.get(this.apiUrl)
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
    ReservationService.prototype._fetchFailed = function (error) {
        console.error(error);
        return Promise.reject(error);
    };
    ReservationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReservationService);
    return ReservationService;
})();
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map