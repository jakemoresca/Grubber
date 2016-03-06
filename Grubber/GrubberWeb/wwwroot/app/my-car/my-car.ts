import {Component} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';
import {Car} from '../core/cars/car';
import {CarMake} from '../core/cars/car-make';
import {TripSchedule, DayOfWeek, TripType} from '../core/trips/trip-schedule';
import {EnumHelper} from '../core/common';

@Component({
    selector: 'my-car',
    moduleId: module.id,
    templateUrl: 'my-car.html',
    directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES]
})
export class MyCar {
    carMakes: Array<CarMake>;
    dayOfWeeks: Array<any> = EnumHelper.getNamesAndValues(DayOfWeek);

    car: Car;
    tripSchedules: Array<TripSchedule>;
    driverNote: string;

    constructor(private _router: Router) {
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

        var mondayTimeIn = new TripSchedule();
        mondayTimeIn.scheduleTime = "6:30 AM";
        mondayTimeIn.scheduleDay = DayOfWeek.Monday;
        mondayTimeIn.type = TripType.In;

        var mondayTimeOut = new TripSchedule();
        mondayTimeOut.scheduleTime = "5:00 PM";
        mondayTimeOut.scheduleDay = DayOfWeek.Monday;
        mondayTimeOut.type = TripType.Out;

        var wednesDayTimeIn = new TripSchedule();
        wednesDayTimeIn.scheduleTime = "8:30 AM";
        wednesDayTimeIn.scheduleDay = DayOfWeek.Wednesday;
        wednesDayTimeIn.type = TripType.In;

        this.driverNote = "No sleeping. zzzZZZZzzz";

        this.tripSchedules = new Array<TripSchedule>(mondayTimeIn, mondayTimeOut, wednesDayTimeIn);
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

    onMakeChange(newValue) {
        this.car.makeId = newValue;
    }

}