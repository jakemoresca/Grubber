import {Component} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router, Location} from 'angular2/router';
import {Routes} from '../routes.config';
import {User} from '../core/user';
import { AccountService } from '../login/account.service';

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: 'home.html'
})
export class Home{
    user: User;
    lat: number = 14.124;
    lng: number = 121.41512;
    locationWatchId: number;
    useNative: boolean = false;

    constructor(private _router: Router, private _location: Location, private _accountService: AccountService) {
        _accountService.getCurrentUser()
            .subscribe(res => {
                if (res.userName == null) {
                    _router.navigateByUrl("/login");
                }
                else {
                    this.user = res;
                }
            });
    }
}