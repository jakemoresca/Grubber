/// <reference path="../../../scripts/typings/google.maps.d.ts" />
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
var CordovaGoogleMap = (function () {
    function CordovaGoogleMap(el) {
        alert("Cordova Google map directive");
        this._mapDiv = el.nativeElement;
    }
    Object.defineProperty(CordovaGoogleMap.prototype, "latitude", {
        set: function (lat) {
            if (lat != this._latitude) {
                this._latitude = lat;
                alert("update lat: " + lat);
                if (google != null && this._map != null) {
                    var position = new google.maps.LatLng(this._latitude, this._longitude);
                    this._map.setCenter(position);
                    this.updateMarker(position);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CordovaGoogleMap.prototype, "longitude", {
        set: function (lng) {
            if (lng != this._longitude) {
                this._longitude = lng;
                alert("update lng: " + lng);
                if (google != null && this._map != null) {
                    var position = new google.maps.LatLng(this._latitude, this._longitude);
                    this._map.setCenter(position);
                    this.updateMarker(position);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    CordovaGoogleMap.prototype.ngAfterViewInit = function () {
        alert("after init");
        var opts = {
            center: new google.maps.LatLng(this._latitude, this._longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 15
        };
        this._map = new google.maps.Map(this._mapDiv, opts);
    };
    CordovaGoogleMap.prototype.updateMarker = function (pos) {
        if (this._currentLocationMarker == undefined) {
            this._currentLocationMarker = new google.maps.Marker({
                position: pos,
                map: this._map,
                title: 'Current Location'
            });
            return;
        }
        this._currentLocationMarker.setPosition(pos);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], CordovaGoogleMap.prototype, "latitude", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], CordovaGoogleMap.prototype, "longitude", null);
    CordovaGoogleMap = __decorate([
        core_1.Directive({
            selector: '[cordovaGoogleMap]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CordovaGoogleMap);
    return CordovaGoogleMap;
})();
exports.CordovaGoogleMap = CordovaGoogleMap;
//# sourceMappingURL=cordova-google-map.js.map