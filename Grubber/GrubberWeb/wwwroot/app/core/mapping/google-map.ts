/// <reference path="../../../../scripts/typings/google.maps.d.ts" />

import {Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter} from 'angular2/core';

declare var plugin: any;

@Directive({
    selector: '[googleMap]'
})
export class GoogleMap implements AfterViewInit
{
    private _useNative: Boolean = false;
    private _latitude: number = 14.550157;
    private _longitude: number = 121.046736;
    private _mapDiv: Element;
    private _map: any;
    private _currentLocationMarker: google.maps.Marker;
    private _markers: Array<any>;
    private _draggableMarker: boolean = false;

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

    constructor(el: ElementRef)
    {
        this._mapDiv = el.nativeElement;
    }

    ngAfterViewInit()
    {
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
        }
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
                self.locationChanged.emit({ latitude: e.latLng.lat(), longitude: e.latLng.lng()});
            });

            return;
        }
        
        this._currentLocationMarker.setPosition(pos);
    }
}