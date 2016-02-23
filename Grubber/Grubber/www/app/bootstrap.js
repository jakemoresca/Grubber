var browser_1 = require('angular2/platform/browser');
var common_1 = require('angular2/common');
var router = require('angular2/router');
var http_1 = require('angular2/http');
var app_1 = require('./app');
require('rxjs/Rx');
var people_service_1 = require('./people/people.service');
browser_1.bootstrap(app_1.App, [
    router.ROUTER_PROVIDERS,
    http_1.HTTP_BINDINGS,
    common_1.FormBuilder,
    people_service_1.PeopleService
]);
//# sourceMappingURL=bootstrap.js.map