var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var router = require('angular2/router');
var http_1 = require('angular2/http');
var app_1 = require('./app');
require('rxjs/Rx');
var people_service_1 = require('./people/people.service');
var core_2 = require('angular2-google-maps/core');
browser_1.bootstrap(app_1.App, [
    router.ROUTER_PROVIDERS,
    core_1.provide(router.APP_BASE_HREF, { useValue: '/' }),
    http_1.HTTP_BINDINGS,
    common_1.FormBuilder,
    people_service_1.PeopleService,
    core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS
]);
//# sourceMappingURL=bootstrap.js.map