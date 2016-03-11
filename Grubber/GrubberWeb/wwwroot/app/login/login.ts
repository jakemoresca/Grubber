import {Component, View} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';
import {Http, Headers} from 'angular2/http';

@Component({
    selector: 'login'
})
@View({
    // Template for this component. You can see it below
    templateUrl: 'login/login.html'
})
export class Login {
    // We inject the router via DI
    constructor(private _router: Router, private _http: Http)
    {
    }

    login(event, username, password) {
        // This will be called when the user clicks on the Login button
        event.preventDefault();

        this._http.
        // We call our API to log the user in. The username and password are entered by the user
        fetch('http://localhost:3001/sessions/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })
            .then(status)
            .then(json)
            .then((response) => {
                // Once we get the JWT in the response, we save it into localStorage
                localStorage.setItem('jwt', response.id_token);
                // and then we redirect the user to the home
                this._router.parent.navigateByUrl('/home');
            })
            .catch((error) => {
                alert(error.message);
                console.log(error.message);
            });
    }
}