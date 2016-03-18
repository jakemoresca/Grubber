import * as ng from 'angular2/core';
import * as router from 'angular2/router';
import { Routes, APP_ROUTES } from './routes.config';
import { AccountService } from './login/account.service';
import { User } from './core/user';

@ng.Component({
    selector: 'app',
    moduleId: module.id,
    templateUrl: 'app.html',
    styleUrls: ['app.css'],
    directives: [router.ROUTER_DIRECTIVES]
})

@router.RouteConfig(APP_ROUTES)

export class App {
    public routes = Routes;
    user: User;
    isLoggedIn: boolean = false;

    constructor(private _router: router.Router, private _accountService: AccountService) {
        this.user = new User();

        var self = this;

        _accountService.getCurrentUser()
            .subscribe(res => {
                self.user = res;

                if (self.user.userName == null) {
                    self.user = new User();
                    self.user.style = "flatly";
                    self.isLoggedIn = false;
                }
                else {
                    self.isLoggedIn = true;
                }
                var element = document.createElement("link");
                //Assign different attributes to the element.
                element.setAttribute("rel", "stylesheet");
                element.setAttribute("type", "text/css");
                element.setAttribute("href", "../../css/" + this.user.style + ".css");
                document.body.appendChild(element);
            });
        _router.navigateByUrl("/");
    }

    logout() {
        this._accountService.logout()
            .subscribe(res => this._router.navigateByUrl("/login"));
    }

    onStyleChange(newValue) {

        this.user.style = newValue;
        this._accountService.saveStyle(this.user.id, newValue)
            .subscribe(res => {
                location.reload(true);
            });
    }
}

