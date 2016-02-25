import {Component} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';

@Component({
    selector: 'car-pools',
    moduleId: module.id,
    templateUrl: 'car-pools.html',
    directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES]
})
export class CarPools{

	constructor(private _router: Router) {
	}

    goToPeople(){
        this._router.navigate([`/${Routes.people.name}`, {}]);
    }

}