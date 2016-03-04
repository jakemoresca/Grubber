var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var ng = require('angular2/common');
var router_1 = require('angular2/router');
var google_map_1 = require('../core/mapping/google-map');
var Home = (function () {
    function Home(_router) {
        this._router = _router;
        this.lat = 14.124;
        this.lng = 121.41512;
        this.useNative = false;
        this.getCurrentPosition();
        this.watchCurrentPosition();
    }
    Home.prototype.watchCurrentPosition = function () {
        var self = this;
        function success(pos) {
            var crd = pos.coords;
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
    };
    Home.prototype.getCurrentPosition = function () {
        var self = this;
        var onSuccess = function (position) {
            //alert('Latitude: ' + position.coords.latitude + '\n' +
            //    'Longitude: ' + position.coords.longitude + '\n' +
            //    'Altitude: ' + position.coords.altitude + '\n' +
            //    'Accuracy: ' + position.coords.accuracy + '\n' +
            //    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            //    'Heading: ' + position.coords.heading + '\n' +
            //    'Speed: ' + position.coords.speed + '\n' +
            //    'Timestamp: ' + position.timestamp + '\n');
            self.lat = position.coords.latitude;
            self.lng = position.coords.longitude;
        };
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            moduleId: module.id,
            templateUrl: 'home.html',
            directives: [ng.CORE_DIRECTIVES, ng.FORM_DIRECTIVES, google_map_1.GoogleMap],
            styles: ['.google-map-container { height: 330px; }']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Home);
    return Home;
})();
exports.Home = Home;
//# sourceMappingURL=Home.js.map