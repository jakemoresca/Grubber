import {Component, View} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';
import {Http, Headers} from 'angular2/http';
import {AccountService} from './account.service';

@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: 'login.html'
})
export class Login {
    userName: string;
    password: string;    

    constructor(private _router: Router, private _accountService: AccountService)
    {
    }

    login() {
        this._accountService.login(this.userName, this.password)
            .subscribe(res =>
            {
                if (res) this._router.parent.navigateByUrl('/home');
                alert("Invalid Username/Password combination");
            });
    }
}