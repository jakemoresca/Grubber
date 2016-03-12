var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var router = require('angular2/router');
var http_1 = require('angular2/http');
var app_1 = require('./app');
require('rxjs/Rx');
var people_service_1 = require('./people/people.service');
var car_service_1 = require('./my-car/car.service');
var account_service_1 = require('./login/account.service');
//import { TripService } from './my-car/trip.service';
var trip_service_1 = require('./my-schedule/trip.service');
//import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
browser_1.bootstrap(app_1.App, [
    router.ROUTER_PROVIDERS,
    core_1.provide(router.APP_BASE_HREF, { useValue: '/' }),
    //provide(router.Location, { useClass: router.HashLocationStrategy }),
    http_1.HTTP_BINDINGS,
    common_1.FormBuilder,
    people_service_1.PeopleService,
    car_service_1.CarService,
    trip_service_1.TripService,
    account_service_1.AccountService
]);
//# sourceMappingURL=bootstrap.js.map