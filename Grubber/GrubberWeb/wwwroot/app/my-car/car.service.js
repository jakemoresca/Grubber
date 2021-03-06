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
var CarService = (function () {
    function CarService(_http) {
        this._http = _http;
        this.cars = [];
        this.carMakes = [];
        this.apiUrl = "/api/";
    }
    CarService.prototype.getCars = function () {
        //return an observable
        return this._http.get(this.apiUrl + 'car')
            .map(function (response) {
            return response.json();
        })
            .map(function (cars) {
            var result = [];
            if (cars) {
                cars.forEach(function (car) {
                    result.push(car);
                });
            }
            return result;
        });
    };
    CarService.prototype.getCar = function (userId) {
        return this._http.get(this.apiUrl + 'car/' + userId)
            .map(function (response) {
            return response.json();
        })
            .map(function (car) {
            var result = null;
            if (car) {
                result = car;
            }
            ;
            return result;
        });
    };
    CarService.prototype.saveCar = function (car) {
        var body = JSON.stringify(car);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'car', body, {
            headers: headers
        })
            .map(function (response) {
            return response.json();
        })
            .map(function (car) {
            var result = null;
            if (car) {
                result = car;
            }
            ;
            return result;
        });
    };
    CarService.prototype.getCarMakes = function () {
        //return an observable
        return this._http.get(this.apiUrl + 'carmake')
            .map(function (response) {
            return response.json();
        })
            .map(function (carMakes) {
            var result = [];
            if (carMakes) {
                carMakes.forEach(function (carMake) {
                    result.push(carMake);
                });
            }
            return result;
        });
    };
    CarService.prototype.getCarMake = function (id) {
        return this._http.get(this.apiUrl + 'carmake/' + id.toString())
            .map(function (response) {
            return response.json();
        })
            .map(function (carMake) {
            var result = null;
            if (carMake) {
                result = carMake;
            }
            ;
            return result;
        });
    };
    CarService.prototype._fetchFailed = function (error) {
        console.error(error);
        return Promise.reject(error);
    };
    CarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CarService);
    return CarService;
})();
exports.CarService = CarService;
//# sourceMappingURL=car.service.js.map