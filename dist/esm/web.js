import { WebPlugin } from '@capacitor/core';
import mapboxgl from 'mapbox-gl';
export class MapboxsdkWeb extends WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
    async create(_options) {
        mapboxgl.accessToken = _options.accessToken;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [
                _options.longitude ? _options.longitude : 0,
                _options.latitude ? _options.latitude : 0,
            ],
            zoom: _options.zoom ? _options.zoom : 9,
        });
        map.addControl(new mapboxgl.GeolocateControl({
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
//# sourceMappingURL=web.js.map