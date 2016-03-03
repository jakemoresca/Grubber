/// <reference path="../../../../scripts/typings/google.maps.d.ts" />
var MappingMarker = (function () {
    function MappingMarker() {
    }
    Object.defineProperty(MappingMarker.prototype, "ToNativeFormat", {
        get: function () {
            var position = new plugin.google.maps.LatLng(this.lat, this.lng);
            return {
                position: position,
                //icon: this.icon,
                'title': this.title,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingMarker.prototype, "ToJSApiFormat", {
        get: function () {
            return {
                position: new google.maps.LatLng(this.lat, this.lng),
                title: this.title,
            };
        },
        enumerable: true,
        configurable: true
    });
    return MappingMarker;
})();
exports.MappingMarker = MappingMarker;
//# sourceMappingURL=mapping-marker.js.map