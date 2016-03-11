/// <reference path="../../../../scripts/typings/google.maps.d.ts" />

import {Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter} from 'angular2/core';

declare var plugin: any;

@Directive({
    selector: '[googleMap]'
})
export class GoogleMap implements AfterViewInit {
    private _useNative: Boolean = false;
    private _latitude: number = 14.550157;
    private _longitude: number = 121.046736;
    private _mapDiv: Element;
    private _map: any;
    private _currentLocationMarker: google.maps.Marker;
    private _markers: Array<any>;
    private _draggableMarker: boolean = false;
    private _placeSearchInputBox: string;

    @Output() locationChanged = new EventEmitter();

    @Input() set draggableMarker(isDraggable: boolean) {
        this._draggableMarker = isDraggable;
    }

    @Input() set useNative(isNative: Boolean) {
        this._useNative = isNative;
    }

    @Input() set markers(markers: Array<any>) {
        this.deleteMarkers();

        if (this._useNative == false) {
            this._markers = markers.map((value) => {
                var marker = new google.maps.Marker(value);
                return marker;
            });

            this.setMapOnAll(this._map);
        }
        else {
            this._markers = markers.map((value) => {
                this._map.addMarker(value, function (marker) {
                    return marker;
                });
            });
        }
    }

    @Input() set latitude(lat: number) {
        if (lat != this._latitude) {
            this._latitude = lat;
            if (google != undefined && this._map != null && this._useNative == false) {
                var position = new google.maps.LatLng(this._latitude, this._longitude);
                this._map.setCenter(position);
                this.updateCurrentLocationMarker(position);
            }
        }
    }

    @Input() set longitude(lng: number) {
        if (lng != this._longitude) {
            this._longitude = lng;
            if (google != undefined && this._map != null && this._useNative == false) {
                var position = new google.maps.LatLng(this._latitude, this._longitude);
                this._map.setCenter(position);
                this.updateCurrentLocationMarker(position);
            }
        }
    }

    constructor(el: ElementRef) {
        this._mapDiv = el.nativeElement;
    }

    ngAfterViewInit() {
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
        } else {
            //Google Map Javascript API
            var opts: google.maps.MapOptions = {
                center: new google.maps.LatLng(this._latitude, this._longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 15
            };

            this._map = new google.maps.Map(this._mapDiv, opts);

            //this.initAutocomplete();
        }
    }

    initAutocomplete() {
        var map = this._map;

        // Create the search box and link it to the UI element.
        var input = document.getElementById("google-map-input") as HTMLInputElement;
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        var self = this;
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            if (places[1]) {
                var place = places[1];
                
                self._latitude = place.geometry.location.lat();
                self._longitude = place.geometry.location.lng();
                var position = new google.maps.LatLng(this._latitude, this._longitude);
                self._map.setCenter(position);
                self.updateCurrentLocationMarker(position);

                self.locationChanged.emit({ latitude: self._latitude, longitude: self._longitude, landMarkName: place.formatted_address });
                //self.currentLandMarkClone.landMarkName = results[1].formatted_address;
            } else {
                window.alert('No results found');
            }

            // For each place, get the icon, name and location.
            //var bounds = new google.maps.LatLngBounds();
            //places.forEach(function (place) {
            //    var icon = {
            //        url: place.icon,
            //        size: new google.maps.Size(71, 71),
            //        origin: new google.maps.Point(0, 0),
            //        anchor: new google.maps.Point(17, 34),
            //        scaledSize: new google.maps.Size(25, 25)
            //    };

            //    // Create a marker for each place.
            //    markers.push(new google.maps.Marker({
            //        map: map,
            //        icon: icon,
            //        title: place.name,
            //        position: place.geometry.location
            //    }));

            //    if (place.geometry.viewport) {
            //        // Only geocodes have viewport.
            //        bounds.union(place.geometry.viewport);
            //    } else {
            //        bounds.extend(place.geometry.location);
            //    }
            //});
            //map.fitBounds(bounds);
        });
    }

    // Sets the map on all markers in the array.
    setMapOnAll(map) {
        for (var i = 0; i < this._markers.length; i++) {
            this._markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    clearMarkers() {
        if (this._useNative == false) {
            this.setMapOnAll(null);
        }
        else {
            var markerCount: number = this._markers.length;
            for (var m = 0; markerCount; m++) {
                this._markers[m].remove();
            }
        }
    }

    // Shows any markers currently in the array.
    showMarkers() {
        this.setMapOnAll(this._map);
    }

    // Deletes all markers in the array by removing references to them.
    deleteMarkers() {
        this.clearMarkers();
        this._markers = [];
    }

    updateCurrentLocationMarker(pos: google.maps.LatLng) {
        if (this._currentLocationMarker == undefined) {
            this._currentLocationMarker = new google.maps.Marker({
                position: pos,
                map: this._map,
                title: 'Current Location',
                draggable: this._draggableMarker
            });

            var self = this;

            this._currentLocationMarker.addListener('dragend', function (e: google.maps.MouseEvent) {
                //self.reverseGeocodeAddress({ latitude: e.latLng.lat(), longitude: e.latLng.lng() });
                self.locationChanged.emit({ latitude: e.latLng.lat(), longitude: e.latLng.lng() });
            });

            return;
        }

        this._currentLocationMarker.setPosition(pos);
    }

    //reverseGeocodeAddress(newValue) {
    //    var latlng = new google.maps.LatLng(newValue.latitude, newValue.longitude);
    //    var geocoder = new google.maps.Geocoder();
    //    var self = this;

    //    geocoder.geocode({ 'location': latlng }, function (results, status) {
    //        if (status === google.maps.GeocoderStatus.OK) {
    //            if (results[1]) {
    //                self._latitude = results[1].geometry.location.lat();
    //                self._longitude = results[1].geometry.location.lng();
    //                var position = new google.maps.LatLng(this._latitude, this._longitude);
    //                self._map.setCenter(position);
    //                self.updateCurrentLocationMarker(position);
    //            } else {
    //                window.alert('No results found');
    //            }
    //        } else {
    //            window.alert('Geocoder failed due to: ' + status);
    //        }
    //    });
    //}
}