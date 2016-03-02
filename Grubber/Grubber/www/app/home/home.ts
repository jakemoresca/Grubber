import {Component} from 'angular2/core';
import * as ng from 'angular2/common';
import {Router} from 'angular2/router';
import {Routes} from '../routes.config';
//import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {CordovaGoogleMap} from '../core/cordova-google-map';

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: 'home.html',
    directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, CordovaGoogleMap],
    styles: ['.sebm-google-map-container { height: 300px; }']
})
export class Home{

    lat: number = 51.678418;
    lng: number = 7.809007;
    locationWatchId: number;

    constructor(private _router: Router) {
        alert("get current");
        this.getCurrentPosition();
        //alert("watch location");
        //this.watchCurrentPosition();
    }

    watchCurrentPosition() {
        var self = this;

        function success(pos) {
            var crd = pos.coords;
            alert("Success get location");
            self.lat = crd.latitude;
            self.lng = crd.longitude;
        }

        function error(err) {
            alert('ERROR(' + err.code + '): ' + err.message);
        }

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        this.locationWatchId = navigator.geolocation.watchPosition(success, error, options);
    }

    getCurrentPosition() {

        var self = this;

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

        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

}