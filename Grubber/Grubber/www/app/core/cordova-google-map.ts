/// <reference path="../../../scripts/typings/google.maps.d.ts" />

import {Directive, ElementRef, AfterViewInit, Input} from 'angular2/core';

declare var $: any;

@Directive({
    selector: '[cordovaGoogleMap]'
})
export class CordovaGoogleMap implements AfterViewInit
{
    private _latitude: number;
    private _longitude: number;
    private _mapDiv: Element;
    private _map: google.maps.Map;
    private _currentLocationMarker: google.maps.Marker;

    @Input() set latitude(lat: number) {
        if (lat != this._latitude) {
            this._latitude = lat;
            alert("update lat: " + lat);
            if (google != null && this._map != null) {
                var position = new google.maps.LatLng(this._latitude, this._longitude);
                this._map.setCenter(position);
                this.updateMarker(position);
            }
        }
    }

    @Input() set longitude(lng: number) {
        if (lng != this._longitude) {
            this._longitude = lng;
            alert("update lng: " + lng);
            if (google != null && this._map != null) {
                var position = new google.maps.LatLng(this._latitude, this._longitude);
                this._map.setCenter(position);
                this.updateMarker(position);
            }
        }
    }

    constructor(el: ElementRef)
    {
        alert("Cordova Google map directive");
        this._mapDiv = el.nativeElement;
        
    }

    ngAfterViewInit()
    {
        alert("after init");
        var opts: google.maps.MapOptions = {
            center: new google.maps.LatLng(this._latitude, this._longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 15
        };

        this._map = new google.maps.Map(this._mapDiv, opts);
    }

    updateMarker(pos: google.maps.LatLng) {
        if (this._currentLocationMarker == undefined) {
            this._currentLocationMarker = new google.maps.Marker({
                position: pos,
                map: this._map,
                title: 'Current Location'
            });
            return;
        }
        
        this._currentLocationMarker.setPosition(pos);
    }
}