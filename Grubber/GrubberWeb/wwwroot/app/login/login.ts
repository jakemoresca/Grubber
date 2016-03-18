import {Component, View} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';
import {Http, Headers} from 'angular2/http';
import {AccountService} from './account.service';
import {User} from '../core/user';

@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: 'login.html'
})
export class Login {
    user: User;

    constructor(private _router: Router, private _accountService: AccountService)
    {
        this.user = new User();
    }

    login() {
        this._accountService.login(this.user)
            .subscribe(res =>
            {
                if (res) this._router.parent.navigateByUrl('/home');
                else {
                    alert("Invalid Username/Password combination");
                }
            });
    }
}