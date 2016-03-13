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
var PlaceSearchBox = (function () {
    function PlaceSearchBox(el) {
        this.locationChanged = new core_1.EventEmitter();
        this._textBox = el.nativeElement;
    }
    PlaceSearchBox.prototype.ngAfterViewInit = function () {
        this.initAutocomplete();
    };
    PlaceSearchBox.prototype.initAutocomplete = function () {
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
            self.locationChanged.emit({ name: self._placeName, latitude: self._latitude, longitude: self._longitude });
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlaceSearchBox.prototype, "locationChanged", void 0);
    PlaceSearchBox = __decorate([
        core_1.Directive({
            selector: '[placeSearchBox]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PlaceSearchBox);
    return PlaceSearchBox;
})();
exports.PlaceSearchBox = PlaceSearchBox;
//# sourceMappingURL=place-search-box.js.map