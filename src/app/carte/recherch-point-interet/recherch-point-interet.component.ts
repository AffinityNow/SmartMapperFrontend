import {AfterViewInit, Component} from '@angular/core';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
import * as ELG from 'esri-leaflet-geocoder';
// @ts-ignore
import Leaflet from 'leaflet';

delete Leaflet.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
});

@Component({
    selector: 'app-recherch-point-interet',
    templateUrl: './recherch-point-interet.component.html',
    styleUrls: ['./recherch-point-interet.component.css']
})
export class RecherchPointInteretComponent implements AfterViewInit {
    marker;

    ngAfterViewInit(): void {
        this.createMap();
    }

    private createMap(): void {
        const coordsParis = {lat: 48.8534, lng: 2.3488};
        const coordsFromBrowser = {lat: coordsParis.lat, lng: coordsParis.lng};
        const map = L.map('map').setView(
            [coordsFromBrowser.lat, coordsFromBrowser.lng],
            10
        );
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; ' +
                '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
                '<a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoic21hcnRtYXBwZXIiLCJhIjoiY2toZzl5cGxiMGdmNzJzcXFnbnVycjZnaSJ9.7wSZ8VjvXKBdMBwmfEYMeA'
        }).addTo(map);

        const searchControl = ELG.geosearch().addTo(map);
        const results = L.layerGroup().addTo(map);
        let markers = [];

        searchControl.on('results', (data) => {
            markers = [];
            console.log('data', data);
            results.clearLayers();
            // several results as several towns with same name (like)
            for (let i = data.results.length - 1; i >= 0; i--) {
                const result = data.results[i];
                const marker = L.marker(result.latlng);
                markers = [...markers];
                results.addLayer(marker);
                marker.on('mouseover', addRadius);
                console.log(new ELG.ReverseGeocode());
                marker.on('click', <LeafletMouseEvent>(e) => {
                    new ELG.ReverseGeocode().latlng(e.latlng).run((error, res) => {
                        if (error) {
                            return;
                        }
                        if (this.marker && map.hasLayer(this.marker)) {
                            map.removeLayer(this.marker);
                        }

                        this.marker = L.marker(result.latlng)
                            .addTo(map)
                            .bindPopup(res.address.Match_addr)
                            .openPopup();
                    });
                });
                console.log('markers', markers);
            }
        });

        function addRadius(marker, radius = 1000): any {
            console.log('marker clicked', marker);
            const circle = L.circle([marker.latlng.lat, marker.latlng.lng], {
                radius,
            });
            console.log('circle', circle);
            circle.addTo(map);
            setTimeout(() => {
                map.setZoom(14);
            }, 1000);
        }
    }
}

/*
    navigator.geolocation.getCurrentPosition((location) => {
      const latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
      const mymap = L.map('map').setView(latlng, 13);
      L.tileLayer('', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
          ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',

      }).addTo(mymap);

      const marker = L.marker(latlng).addTo(mymap);
    });
 */
