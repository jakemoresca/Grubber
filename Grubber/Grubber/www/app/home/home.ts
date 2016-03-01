import {Component} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: 'home.html',
    directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    styles: ['.sebm-google-map-container { height: 300px; }']
})
export class Home{

    lat: number = 51.678418;
    lng: number = 7.809007;

	constructor(private _router: Router) {
	}

    getCurrentPosition() {

        var self = this;
        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var onSuccess = function (position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n');
            
            self.lat = position.coords.latitude;
            self.lng = position.coords.longitude;
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

}