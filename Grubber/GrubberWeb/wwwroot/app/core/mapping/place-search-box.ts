/// <reference path="../../../../scripts/typings/google.maps.d.ts" />

import {Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter} from 'angular2/core';

@Directive({
    selector: '[placeSearchBox]'
})
export class PlaceSearchBox implements AfterViewInit {
    private _textBox: any;
    private _placeName: string;
    private _latitude: number;
    private _longitude: number;

    @Output() locationChanged = new EventEmitter();

    constructor(el: ElementRef) {
        this._textBox = el.nativeElement;
    }

    ngAfterViewInit() {
        this.initAutocomplete();
    }

    initAutocomplete() {
        var input = this._textBox;
        var searchBox = new google.maps.places.SearchBox(input);
        var self = this;

        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();
            
            if (places.length == 0) {
                return;
            }

            var place = places[0];
            self._latitude = place.geometry.location.lat();
            self._longitude = place.geometry.location.lng();
            self._placeName = place.formatted_address;
            
            self.locationChanged.emit({name: self._placeName, latitude: self._latitude, longitude: self._longitude});
        });
    }
    
}