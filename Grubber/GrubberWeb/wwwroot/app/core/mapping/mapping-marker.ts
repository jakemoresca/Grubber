/// <reference path="../../../../scripts/typings/google.maps.d.ts" />

declare var plugin: any;

export class MappingMarker {
    public lat: number;
    public lng: number;
    public title: string;
    public icon: string;

    public get ToNativeFormat(): any {
        var position = new plugin.google.maps.LatLng(this.lat, this.lng);
        return {
            position: position,
            //icon: this.icon,
            'title': this.title,
        };
    }

    public get ToJSApiFormat(): any {
        return {
            position: new google.maps.LatLng(this.lat, this.lng),
            title: this.title,
 //           icon: this.icon
        };
    }
}