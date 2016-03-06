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
var common_1 = require('../core/common');
var MyCar = (function () {
    function MyCar(_router) {
        this._router = _router;
        this.dayOfWeeks = common_1.EnumHelper.getNamesAndValues(trip_schedule_1.DayOfWeek);
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
        var mondayTimeIn = new trip_schedule_1.TripSchedule();
        mondayTimeIn.scheduleTime = "6:30 AM";
        mondayTimeIn.scheduleDay = trip_schedule_1.DayOfWeek.Monday;
        mondayTimeIn.type = trip_schedule_1.TripType.In;
        var mondayTimeOut = new trip_schedule_1.TripSchedule();
        mondayTimeOut.scheduleTime = "5:00 PM";
        mondayTimeOut.scheduleDay = trip_schedule_1.DayOfWeek.Monday;
        mondayTimeOut.type = trip_schedule_1.TripType.Out;
        var wednesDayTimeIn = new trip_schedule_1.TripSchedule();
        wednesDayTimeIn.scheduleTime = "8:30 AM";
        wednesDayTimeIn.scheduleDay = trip_schedule_1.DayOfWeek.Wednesday;
        wednesDayTimeIn.type = trip_schedule_1.TripType.In;
        this.driverNote = "No sleeping. zzzZZZZzzz";
        this.tripSchedules = new Array(mondayTimeIn, mondayTimeOut, wednesDayTimeIn);
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
    MyCar.prototype.onMakeChange = function (newValue) {
        this.car.makeId = newValue;
    };
    MyCar = __decorate([
        core_1.Component({
            selector: 'my-car',
            moduleId: module.id,
            templateUrl: 'my-car.html',
            directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], MyCar);
    return MyCar;
})();
exports.MyCar = MyCar;
//# sourceMappingURL=My-Car.js.map