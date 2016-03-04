System.registerDynamic("angular2-google-maps/services/maps-api-loader/noop-maps-api-loader", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var NoOpMapsAPILoader = (function() {
    function NoOpMapsAPILoader() {}
    NoOpMapsAPILoader.prototype.load = function() {
      if (!window.google || !window.google.maps) {
        throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
      }
      return Promise.resolve();
    };
    ;
    return NoOpMapsAPILoader;
  }());
  exports.NoOpMapsAPILoader = NoOpMapsAPILoader;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services", ["angular2-google-maps/services/maps-api-loader/maps-api-loader", "angular2-google-maps/services/maps-api-loader/noop-maps-api-loader", "angular2-google-maps/services/maps-api-loader/lazy-maps-api-loader"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var maps_api_loader_1 = $__require('angular2-google-maps/services/maps-api-loader/maps-api-loader');
  exports.MapsAPILoader = maps_api_loader_1.MapsAPILoader;
  var noop_maps_api_loader_1 = $__require('angular2-google-maps/services/maps-api-loader/noop-maps-api-loader');
  exports.NoOpMapsAPILoader = noop_maps_api_loader_1.NoOpMapsAPILoader;
  var lazy_maps_api_loader_1 = $__require('angular2-google-maps/services/maps-api-loader/lazy-maps-api-loader');
  exports.LazyMapsAPILoader = lazy_maps_api_loader_1.LazyMapsAPILoader;
  exports.LazyMapsAPILoaderConfig = lazy_maps_api_loader_1.LazyMapsAPILoaderConfig;
  exports.GoogleMapsScriptProtocol = lazy_maps_api_loader_1.GoogleMapsScriptProtocol;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/directives-const", ["angular2-google-maps/directives/google-map", "angular2-google-maps/directives/google-map-marker"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var google_map_1 = $__require('angular2-google-maps/directives/google-map');
  var google_map_marker_1 = $__require('angular2-google-maps/directives/google-map-marker');
  exports.ANGULAR2_GOOGLE_MAPS_DIRECTIVES = [google_map_1.SebmGoogleMap, google_map_marker_1.SebmGoogleMapMarker];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/directives/google-map-marker", ["angular2/core", "angular2-google-maps/services/marker-manager"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var marker_manager_1 = $__require('angular2-google-maps/services/marker-manager');
  var markerId = 0;
  var SebmGoogleMapMarker = (function() {
    function SebmGoogleMapMarker(_markerManager) {
      this._markerManager = _markerManager;
      this.draggable = false;
      this.markerClick = new core_1.EventEmitter();
      this.dragEnd = new core_1.EventEmitter();
      this._markerAddedToManger = false;
      this._id = (markerId++).toString();
    }
    SebmGoogleMapMarker.prototype.ngOnChanges = function(changes) {
      if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
        return;
      }
      if (!this._markerAddedToManger) {
        this._markerManager.addMarker(this);
        this._markerAddedToManger = true;
        this._addEventListeners();
        return;
      }
      if (changes['latitude'] || changes['longitude']) {
        this._markerManager.updateMarkerPosition(this);
      }
      if (changes['title']) {
        this._markerManager.updateTitle(this);
      }
      if (changes['label']) {
        this._markerManager.updateLabel(this);
      }
      if (changes['draggable']) {
        this._markerManager.updateDraggable(this);
      }
    };
    SebmGoogleMapMarker.prototype._addEventListeners = function() {
      var _this = this;
      this._markerManager.createEventObservable('click', this).subscribe(function() {
        _this.markerClick.next(null);
      });
      this._markerManager.createEventObservable('dragend', this).subscribe(function(e) {
        _this.dragEnd.next({coords: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          }});
      });
    };
    SebmGoogleMapMarker.prototype.id = function() {
      return this._id;
    };
    SebmGoogleMapMarker.prototype.toString = function() {
      return 'SebmGoogleMapMarker-' + this._id.toString();
    };
    SebmGoogleMapMarker.prototype.ngOnDestroy = function() {
      this._markerManager.deleteMarker(this);
    };
    SebmGoogleMapMarker = __decorate([core_1.Directive({
      selector: 'sebm-google-map-marker',
      inputs: ['latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable'],
      outputs: ['markerClick', 'dragEnd']
    }), __metadata('design:paramtypes', [marker_manager_1.MarkerManager])], SebmGoogleMapMarker);
    return SebmGoogleMapMarker;
  }());
  exports.SebmGoogleMapMarker = SebmGoogleMapMarker;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/marker-manager", ["angular2/core", "rxjs/Observable", "angular2-google-maps/services/google-maps-api-wrapper"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var Observable_1 = $__require('rxjs/Observable');
  var google_maps_api_wrapper_1 = $__require('angular2-google-maps/services/google-maps-api-wrapper');
  var MarkerManager = (function() {
    function MarkerManager(_mapsWrapper, _zone) {
      this._mapsWrapper = _mapsWrapper;
      this._zone = _zone;
      this._markers = new Map();
    }
    MarkerManager.prototype.deleteMarker = function(marker) {
      var _this = this;
      var m = this._markers.get(marker);
      if (m == null) {
        return Promise.resolve();
      }
      return m.then(function(m) {
        return _this._zone.run(function() {
          m.setMap(null);
          _this._markers.delete(marker);
        });
      });
    };
    MarkerManager.prototype.updateMarkerPosition = function(marker) {
      return this._markers.get(marker).then(function(m) {
        return m.setPosition({
          lat: marker.latitude,
          lng: marker.longitude
        });
      });
    };
    MarkerManager.prototype.updateTitle = function(marker) {
      return this._markers.get(marker).then(function(m) {
        return m.setTitle(marker.title);
      });
    };
    MarkerManager.prototype.updateLabel = function(marker) {
      return this._markers.get(marker).then(function(m) {
        m.setLabel(marker.label);
      });
    };
    MarkerManager.prototype.updateDraggable = function(marker) {
      return this._markers.get(marker).then(function(m) {
        return m.setDraggable(marker.draggable);
      });
    };
    MarkerManager.prototype.addMarker = function(marker) {
      var markerPromise = this._mapsWrapper.createMarker({
        position: {
          lat: marker.latitude,
          lng: marker.longitude
        },
        label: marker.label,
        draggable: marker.draggable
      });
      this._markers.set(marker, markerPromise);
    };
    MarkerManager.prototype.createEventObservable = function(eventName, marker) {
      var _this = this;
      return Observable_1.Observable.create(function(observer) {
        _this._markers.get(marker).then(function(m) {
          m.addListener(eventName, function(e) {
            return _this._zone.run(function() {
              return observer.next(e);
            });
          });
        });
      });
    };
    MarkerManager = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [google_maps_api_wrapper_1.GoogleMapsAPIWrapper, core_1.NgZone])], MarkerManager);
    return MarkerManager;
  }());
  exports.MarkerManager = MarkerManager;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/google-maps-api-wrapper", ["angular2/core", "rxjs/Observable", "angular2-google-maps/services/maps-api-loader/maps-api-loader"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var Observable_1 = $__require('rxjs/Observable');
  var maps_api_loader_1 = $__require('angular2-google-maps/services/maps-api-loader/maps-api-loader');
  var GoogleMapsAPIWrapper = (function() {
    function GoogleMapsAPIWrapper(_loader, _zone) {
      var _this = this;
      this._loader = _loader;
      this._zone = _zone;
      this._map = new Promise(function(resolve) {
        _this._mapResolver = resolve;
      });
    }
    GoogleMapsAPIWrapper.prototype.createMap = function(el, mapOptions) {
      var _this = this;
      return this._loader.load().then(function() {
        var map = new google.maps.Map(el, mapOptions);
        _this._mapResolver(map);
        return;
      });
    };
    GoogleMapsAPIWrapper.prototype.setMapOptions = function(options) {
      this._map.then(function(m) {
        m.setOptions(options);
      });
    };
    GoogleMapsAPIWrapper.prototype.createMarker = function(options) {
      if (options === void 0) {
        options = {};
      }
      return this._map.then(function(map) {
        options.map = map;
        return new google.maps.Marker(options);
      });
    };
    GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function(eventName) {
      var _this = this;
      return Observable_1.Observable.create(function(observer) {
        _this._map.then(function(m) {
          m.addListener(eventName, function(arg) {
            _this._zone.run(function() {
              return observer.next(arg);
            });
          });
        });
      });
    };
    GoogleMapsAPIWrapper.prototype.setCenter = function(latLng) {
      return this._map.then(function(map) {
        return map.setCenter(latLng);
      });
    };
    GoogleMapsAPIWrapper.prototype.getZoom = function() {
      return this._map.then(function(map) {
        return map.getZoom();
      });
    };
    GoogleMapsAPIWrapper.prototype.setZoom = function(zoom) {
      return this._map.then(function(map) {
        return map.setZoom(zoom);
      });
    };
    GoogleMapsAPIWrapper.prototype.getCenter = function() {
      return this._map.then(function(map) {
        return map.getCenter();
      });
    };
    GoogleMapsAPIWrapper = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [maps_api_loader_1.MapsAPILoader, core_1.NgZone])], GoogleMapsAPIWrapper);
    return GoogleMapsAPIWrapper;
  }());
  exports.GoogleMapsAPIWrapper = GoogleMapsAPIWrapper;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/directives/google-map", ["angular2/core", "angular2-google-maps/services/google-maps-api-wrapper", "angular2-google-maps/services/marker-manager"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var google_maps_api_wrapper_1 = $__require('angular2-google-maps/services/google-maps-api-wrapper');
  var marker_manager_1 = $__require('angular2-google-maps/services/marker-manager');
  var SebmGoogleMap = (function() {
    function SebmGoogleMap(_elem, _mapsWrapper) {
      this._elem = _elem;
      this._mapsWrapper = _mapsWrapper;
      this._longitude = 0;
      this._latitude = 0;
      this._zoom = 8;
      this.disableDoubleClickZoom = false;
      this.disableDefaultUI = false;
      this.mapClick = new core_1.EventEmitter();
      this.mapRightClick = new core_1.EventEmitter();
      this.mapDblClick = new core_1.EventEmitter();
    }
    SebmGoogleMap.prototype.ngOnInit = function() {
      var container = this._elem.nativeElement.querySelector('.sebm-google-map-container-inner');
      this._initMapInstance(container);
    };
    SebmGoogleMap.prototype._initMapInstance = function(el) {
      this._mapsWrapper.createMap(el, {
        center: {
          lat: this._latitude,
          lng: this._longitude
        },
        zoom: this._zoom,
        disableDefaultUI: this.disableDefaultUI
      });
      this._handleMapCenterChange();
      this._handleMapZoomChange();
      this._handleMapMouseEvents();
    };
    SebmGoogleMap._containsMapOptionsChange = function(changesKeys) {
      return changesKeys.every(function(key) {
        return SebmGoogleMap._mapOptionsAttributes.indexOf(key) !== 1;
      });
    };
    SebmGoogleMap.prototype.ngOnChanges = function(changes) {
      if (SebmGoogleMap._containsMapOptionsChange(Object.keys(changes))) {
        this._mapsWrapper.setMapOptions({disableDoubleClickZoom: this.disableDoubleClickZoom});
      }
    };
    Object.defineProperty(SebmGoogleMap.prototype, "zoom", {
      set: function(value) {
        this._zoom = this._convertToDecimal(value, 8);
        if (typeof this._zoom === 'number') {
          this._mapsWrapper.setZoom(this._zoom);
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(SebmGoogleMap.prototype, "longitude", {
      set: function(value) {
        this._longitude = this._convertToDecimal(value);
        this._updateCenter();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(SebmGoogleMap.prototype, "latitude", {
      set: function(value) {
        this._latitude = this._convertToDecimal(value);
        this._updateCenter();
      },
      enumerable: true,
      configurable: true
    });
    SebmGoogleMap.prototype._convertToDecimal = function(value, defaultValue) {
      if (defaultValue === void 0) {
        defaultValue = null;
      }
      if (typeof value === 'string') {
        return parseFloat(value);
      } else if (typeof value === 'number') {
        return value;
      }
      return defaultValue;
    };
    SebmGoogleMap.prototype._updateCenter = function() {
      if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
        return;
      }
      this._mapsWrapper.setCenter({
        lat: this._latitude,
        lng: this._longitude
      });
    };
    SebmGoogleMap.prototype._handleMapCenterChange = function() {
      var _this = this;
      this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function() {
        _this._mapsWrapper.getCenter().then(function(center) {
          _this._latitude = center.lat();
          _this._longitude = center.lng();
        });
      });
    };
    SebmGoogleMap.prototype._handleMapZoomChange = function() {
      var _this = this;
      this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function() {
        _this._mapsWrapper.getZoom().then(function(z) {
          return _this._zoom = z;
        });
      });
    };
    SebmGoogleMap.prototype._handleMapMouseEvents = function() {
      var _this = this;
      var events = [{
        name: 'click',
        emitter: this.mapClick
      }, {
        name: 'rightclick',
        emitter: this.mapRightClick
      }, {
        name: 'dblclick',
        emitter: this.mapDblClick
      }];
      events.forEach(function(e) {
        _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function(event) {
          var value = {coords: {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            }};
          e.emitter.emit(value);
        });
      });
    };
    SebmGoogleMap._mapOptionsAttributes = ['disableDoubleClickZoom'];
    SebmGoogleMap = __decorate([core_1.Component({
      selector: 'sebm-google-map',
      providers: [google_maps_api_wrapper_1.GoogleMapsAPIWrapper, marker_manager_1.MarkerManager],
      inputs: ['longitude', 'latitude', 'zoom', 'disableDoubleClickZoom', 'disableDefaultUI'],
      outputs: ['mapClick', 'mapRightClick', 'mapDblClick'],
      host: {'[class.sebm-google-map-container]': 'true'},
      styles: ["\n    .sebm-google-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n  "],
      template: "\n    <div class=\"sebm-google-map-container-inner\"></div>\n    <ng-content></ng-content>\n  "
    }), __metadata('design:paramtypes', [core_1.ElementRef, google_maps_api_wrapper_1.GoogleMapsAPIWrapper])], SebmGoogleMap);
    return SebmGoogleMap;
  }());
  exports.SebmGoogleMap = SebmGoogleMap;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/directives", ["angular2-google-maps/directives/google-map", "angular2-google-maps/directives/google-map-marker", "angular2-google-maps/directives-const"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var google_map_1 = $__require('angular2-google-maps/directives/google-map');
  exports.SebmGoogleMap = google_map_1.SebmGoogleMap;
  var google_map_marker_1 = $__require('angular2-google-maps/directives/google-map-marker');
  exports.SebmGoogleMapMarker = google_map_marker_1.SebmGoogleMapMarker;
  var directives_const_1 = $__require('angular2-google-maps/directives-const');
  exports.ANGULAR2_GOOGLE_MAPS_DIRECTIVES = directives_const_1.ANGULAR2_GOOGLE_MAPS_DIRECTIVES;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/maps-api-loader/lazy-maps-api-loader", ["angular2/core", "angular2-google-maps/services/maps-api-loader/maps-api-loader"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('angular2/core');
  var maps_api_loader_1 = $__require('angular2-google-maps/services/maps-api-loader/maps-api-loader');
  (function(GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 0] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 1] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 2] = "AUTO";
  })(exports.GoogleMapsScriptProtocol || (exports.GoogleMapsScriptProtocol = {}));
  var GoogleMapsScriptProtocol = exports.GoogleMapsScriptProtocol;
  var LazyMapsAPILoaderConfig = (function() {
    function LazyMapsAPILoaderConfig() {
      this.apiKey = null;
      this.apiVersion = '3';
      this.hostAndPath = 'maps.googleapis.com/maps/api/js';
      this.protocol = GoogleMapsScriptProtocol.HTTPS;
      this.libraries = [];
      this.region = null;
      this.language = null;
    }
    return LazyMapsAPILoaderConfig;
  }());
  exports.LazyMapsAPILoaderConfig = LazyMapsAPILoaderConfig;
  var DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();
  var LazyMapsAPILoader = (function(_super) {
    __extends(LazyMapsAPILoader, _super);
    function LazyMapsAPILoader(_config) {
      _super.call(this);
      this._config = _config;
      if (this._config === null || this._config === undefined) {
        this._config = DEFAULT_CONFIGURATION;
      }
    }
    LazyMapsAPILoader.prototype.load = function() {
      if (this._scriptLoadingPromise) {
        return this._scriptLoadingPromise;
      }
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      var callbackName = "angular2googlemaps" + new Date().getMilliseconds();
      script.src = this._getScriptSrc(callbackName);
      this._scriptLoadingPromise = new Promise(function(resolve, reject) {
        window[callbackName] = function() {
          resolve();
        };
        script.onerror = function(error) {
          reject(error);
        };
      });
      document.body.appendChild(script);
      return this._scriptLoadingPromise;
    };
    LazyMapsAPILoader.prototype._getScriptSrc = function(callbackName) {
      var protocolType = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
      var protocol;
      switch (protocolType) {
        case GoogleMapsScriptProtocol.AUTO:
          protocol = '';
          break;
        case GoogleMapsScriptProtocol.HTTP:
          protocol = 'http:';
          break;
        case GoogleMapsScriptProtocol.HTTPS:
          protocol = 'https:';
          break;
      }
      var hostAndPath = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
      var apiKey = this._config.apiKey || DEFAULT_CONFIGURATION.apiKey;
      var libraries = this._config.libraries || DEFAULT_CONFIGURATION.libraries;
      var region = this._config.region || DEFAULT_CONFIGURATION.region;
      var language = this._config.language || DEFAULT_CONFIGURATION.language;
      var queryParams = {
        v: this._config.apiVersion || DEFAULT_CONFIGURATION.apiKey,
        callback: callbackName
      };
      if (apiKey) {
        queryParams['key'] = apiKey;
      }
      if (libraries != null && libraries.length > 0) {
        queryParams['libraries'] = libraries.join(',');
      }
      if (region != null && region.length > 0) {
        queryParams['region'] = region;
      }
      if (language != null && language.length > 0) {
        queryParams['language'] = language;
      }
      var params = Object.keys(queryParams).map(function(k, i) {
        var param = (i === 0) ? '?' : '&';
        return param += k + "=" + queryParams[k];
      }).join('');
      return protocol + "//" + hostAndPath + params;
    };
    LazyMapsAPILoader = __decorate([core_1.Injectable(), __param(0, core_1.Optional()), __metadata('design:paramtypes', [LazyMapsAPILoaderConfig])], LazyMapsAPILoader);
    return LazyMapsAPILoader;
  }(maps_api_loader_1.MapsAPILoader));
  exports.LazyMapsAPILoader = LazyMapsAPILoader;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/maps-api-loader/maps-api-loader", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var MapsAPILoader = (function() {
    function MapsAPILoader() {}
    MapsAPILoader = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], MapsAPILoader);
    return MapsAPILoader;
  }());
  exports.MapsAPILoader = MapsAPILoader;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/core", ["angular2/core", "angular2-google-maps/services/maps-api-loader/maps-api-loader", "angular2-google-maps/services/maps-api-loader/lazy-maps-api-loader", "angular2-google-maps/directives", "angular2-google-maps/services"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var core_1 = $__require('angular2/core');
  var maps_api_loader_1 = $__require('angular2-google-maps/services/maps-api-loader/maps-api-loader');
  var lazy_maps_api_loader_1 = $__require('angular2-google-maps/services/maps-api-loader/lazy-maps-api-loader');
  __export($__require('angular2-google-maps/directives'));
  __export($__require('angular2-google-maps/services'));
  exports.ANGULAR2_GOOGLE_MAPS_PROVIDERS = [new core_1.Provider(maps_api_loader_1.MapsAPILoader, {useClass: lazy_maps_api_loader_1.LazyMapsAPILoader})];
  global.define = __define;
  return module.exports;
});

//# sourceMappingURL=angular2-google-maps.js.map