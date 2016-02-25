import * as ng from 'angular2/core';
import * as router from 'angular2/router';
import { Routes, APP_ROUTES } from './routes.config';
import {MDL} from './core/MDL';

@ng.Component({
    selector: 'app',
    moduleId: module.id,
    templateUrl: 'app.html',
    styleUrls: ['app.css'],
    directives: [router.ROUTER_DIRECTIVES, MDL]
})

@router.RouteConfig(APP_ROUTES)

export class App {
    public routes = Routes;

    constructor(router: router.Router) {
        router.navigateByUrl("/");
    }
}

