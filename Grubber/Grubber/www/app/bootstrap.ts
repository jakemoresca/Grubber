import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import * as router from 'angular2/router';
import { Http, HTTP_BINDINGS } from 'angular2/http';
import { App } from './app';
import 'rxjs/Rx';
import { PeopleService } from './people/people.service';
//import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';


bootstrap(App, [
    router.ROUTER_PROVIDERS,
    provide(router.APP_BASE_HREF, { useValue: '/' }),
    HTTP_BINDINGS,
    FormBuilder,
    PeopleService
]);
