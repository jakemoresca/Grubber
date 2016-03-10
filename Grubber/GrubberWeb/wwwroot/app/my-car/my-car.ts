import {Component} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';
import {Car} from '../core/cars/car';
import {CarMake} from '../core/cars/car-make';
import {EnumHelper, ObjHelper} from '../core/common';
import {CarService} from './car.service';

declare var $: any;

@Component({
    selector: 'my-car',
    moduleId: module.id,
    templateUrl: 'my-car.html',
    directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES]
})
export class MyCar {
    carMakes: Array<CarMake>;
    car: Car;

    constructor(private _router: Router, private _carService: CarService) {
        _carService.getCarMakes()
            .subscribe(res => this.carMakes = res);

        _carService.getCar(1)
            .subscribe(res => this.car = res);

        this.initializeModels();
	}

    initializeModels() {
        this.car = new Car();
        this.carMakes = new Array<CarMake>();
    }

    onMakeChange(newValue) {
        this.car.makeId = newValue;
    }

    saveCar() {
        this._carService.saveCar(this.car)
            .subscribe(res => this.car = res);
    }

}