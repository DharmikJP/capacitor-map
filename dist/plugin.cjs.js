'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');
var mapboxgl = require('mapbox-gl');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mapboxgl__default = /*#__PURE__*/_interopDefaultLegacy(mapboxgl);

/* eslint-disable @typescript-eslint/naming-convention */
const Mapboxsdk = core.registerPlugin('Mapboxsdk', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.MapboxsdkWeb()),
});

class MapboxsdkWeb extends core.WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
    async create(_options) {
        mapboxgl__default["default"].accessToken = _options.accessToken;
        const map = new mapboxgl__default["default"].Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [
                _options.longitude ? _options.longitude : 0,
                _options.latitude ? _options.latitude : 0,
            ],
            zoom: _options.zoom ? _options.zoom : 9,
        });
        map.addControl(new mapboxgl__default["default"].GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true,
        }));
        map.on('load', () => {
            this.notifyListeners('onMapReady', null);
        });
    }
    close() {
        throw new Error('Method not implemented.');
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MapboxsdkWeb: MapboxsdkWeb
});

exports.Mapboxsdk = Mapboxsdk;
//# sourceMappingURL=plugin.cjs.js.map
