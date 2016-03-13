import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Car} from '../core/cars/car';
import {CarMake} from '../core/cars/car-make';
import {User} from '../core/user';

/**
 * car service
 */
@Injectable()
export class AccountService {
    isAuthenticated: boolean = false;
    apiUrl: string = "/api/account/";

    constructor(private _http: Http) { }

    login(user: User) {
        var body = JSON.stringify(user);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this.apiUrl + 'login', body, {
                headers: headers
            }).map((response) => {
                if (response.status == 200) {
                    this.isAuthenticated = true;
                    return true;
                }
                this.isAuthenticated = false;
                return false;
            });
    }

    logout() {
        return this._http.post(this.apiUrl + 'logout', "")
            .map((response) => {
                if (response.status == 200) {
                    this.isAuthenticated = false;
                    return true;
            }
            return false;
        });
    }

    getCurrentUser() {
        return this._http.get(this.apiUrl + 'getcurrentuser/')
            .map((response) => {
                return response.json();
            })
            .map((car: Car) => {
                let result: any = null;

                if (car) {
                    result = car;
                };
                return result;
            });
    }

    private _fetchFailed(error: any) {
        console.error(error);
        return Promise.reject(error);
    }
}