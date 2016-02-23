import {bootstrap} from 'angular2/platform/browser';
import {FormBuilder} from 'angular2/common';
import * as router from 'angular2/router';
import { Http, HTTP_BINDINGS } from 'angular2/http';
import { App } from './app';
import 'rxjs/Rx';
import { PeopleService } from './people/people.service';


bootstrap(App, [
    router.ROUTER_PROVIDERS,
    HTTP_BINDINGS,
    FormBuilder,
    PeopleService
]);
