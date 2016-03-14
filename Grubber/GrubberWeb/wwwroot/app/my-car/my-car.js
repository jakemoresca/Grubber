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
var car_service_1 = require('./car.service');
var account_service_1 = require('../login/account.service');
var MyCar = (function () {
    function MyCar(_router, _carService, _accountService) {
        var _this = this;
        this._router = _router;
        this._carService = _carService;
        this._accountService = _accountService;
        this.initializeModels();
        _carService.getCarMakes()
            .subscribe(function (res) { return _this.carMakes = res; });
        _accountService.getCurrentUser()
            .subscribe(function (resUser) {
            _this.user = resUser;
            _carService.getCar(_this.user.id)
                .subscribe(function (resCar) { return _this.car = resCar; });
        });
    }
    MyCar.prototype.initializeModels = function () {
        this.car = new car_1.Car();
        this.carMakes = new Array();
    };
    MyCar.prototype.onMakeChange = function (newValue) {
        this.car.makeId = newValue;
    };
    MyCar.prototype.saveCar = function () {
        var _this = this;
        this._carService.saveCar(this.car)
            .subscribe(function (res) { return _this.car = res; });
    };
    MyCar = __decorate([
        core_1.Component({
            selector: 'my-car',
            moduleId: module.id,
            templateUrl: 'my-car.html',
            directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, car_service_1.CarService, account_service_1.AccountService])
    ], MyCar);
    return MyCar;
})();
exports.MyCar = MyCar;
//# sourceMappingURL=My-Car.js.map