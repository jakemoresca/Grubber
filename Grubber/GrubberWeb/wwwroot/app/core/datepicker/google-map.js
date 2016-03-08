/// <reference path="../../../../scripts/typings/google.maps.d.ts" />
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
var GoogleMap = (function () {
    function GoogleMap(el) {
        this._useNative = false;
        this._latitude = 14.550157;
        this._longitude = 121.046736;
        this._draggableMarker = false;
        this.locationChanged = new core_1.EventEmitter();
        this._mapDiv = el.nativeElement;
    }
    Object.defineProperty(GoogleMap.prototype, "draggableMarker", {
        set: function (isDraggable) {
            this._draggableMarker = isDraggable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMap.prototype, "useNative", {
        set: function (isNative) {
            this._useNative = isNative;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMap.prototype, "markers", {
        set: function (markers) {
            var _this = this;
            this.deleteMarkers();
            if (this._useNative == false) {
                this._markers = markers.map(function (value) {
                    var marker = new google.maps.Marker(value);
                    return marker;
                });
                this.setMapOnAll(this._map);
            }
            else {
                this._markers = markers.map(function (value) {
                    _this._map.addMarker(value, function (marker) {
                        return marker;
                    });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMap.prototype, "latitude", {
        set: function (lat) {
            if (lat != this._latitude) {
                this._latitude = lat;
                if (google != undefined && this._map != null && this._useNative == false) {
                    var position = new google.maps.LatLng(this._latitude, this._longitude);
                    this._map.setCenter(position);
                    this.updateCurrentLocationMarker(position);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMap.prototype, "longitude", {
        set: function (lng) {
            if (lng != this._longitude) {
                this._longitude = lng;
                if (google != undefined && this._map != null && this._useNative == false) {
                    var position = new google.maps.LatLng(this._latitude, this._longitude);
                    this._map.setCenter(position);
                    this.updateCurrentLocationMarker(position);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    GoogleMap.prototype.ngAfterViewInit = function () {
        if (this._useNative) {
            //Cordova Google Map
            var position = new plugin.google.maps.LatLng(this._latitude, this._longitude);
            this._map = plugin.google.maps.Map.getMap(this._mapDiv, {
                'mapType': plugin.google.maps.MapTypeId.ROADMAP,
                'controls': {
                    'compass': true,
                    'myLocationButton': true,
                    'indoorPicker': true,
                    'zoom': true
                },
                'gestures': {
                    'scroll': true,
                    'tilt': true,
                    'rotate': true,
                    'zoom': true
                },
                'camera': {
                    'latLng': position,
                    'tilt': 30,
                    'zoom': 15,
                    'bearing': 50
                }
            });
        }
        else {
            //Google Map Javascript API
            var opts = {
                center: new google.maps.LatLng(this._latitude, this._longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 15
            };
            this._map = new google.maps.Map(this._mapDiv, opts);
        }
    };
    // Sets the map on all markers in the array.
    GoogleMap.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this._markers.length; i++) {
            this._markers[i].setMap(map);
        }
    };
    // Removes the markers from the map, but keeps them in the array.
    GoogleMap.prototype.clearMarkers = function () {
        if (this._useNative == false) {
            this.setMapOnAll(null);
        }
        else {
            var markerCount = this._markers.length;
            for (var m = 0; markerCount; m++) {
                this._markers[m].remove();
            }
        }
    };
    // Shows any markers currently in the array.
    GoogleMap.prototype.showMarkers = function () {
        this.setMapOnAll(this._map);
    };
    // Deletes all markers in the array by removing references to them.
    GoogleMap.prototype.deleteMarkers = function () {
        this.clearMarkers();
        this._markers = [];
    };
    GoogleMap.prototype.updateCurrentLocationMarker = function (pos) {
        if (this._currentLocationMarker == undefined) {
            this._currentLocationMarker = new google.maps.Marker({
                position: pos,
                map: this._map,
                title: 'Current Location',
                draggable: this._draggableMarker
            });
            var self = this;
            this._currentLocationMarker.addListener('dragend', function (e) {
                self.locationChanged.emit({ latitude: e.latLng.lat(), longitude: e.latLng.lng() });
            });
            return;
        }
        this._currentLocationMarker.setPosition(pos);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GoogleMap.prototype, "locationChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], GoogleMap.prototype, "draggableMarker", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], GoogleMap.prototype, "useNative", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], GoogleMap.prototype, "markers", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], GoogleMap.prototype, "latitude", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], GoogleMap.prototype, "longitude", null);
    GoogleMap = __decorate([
        core_1.Directive({
            selector: '[googleMap]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], GoogleMap);
    return GoogleMap;
})();
exports.GoogleMap = GoogleMap;
//# sourceMappingURL=google-map.js.map