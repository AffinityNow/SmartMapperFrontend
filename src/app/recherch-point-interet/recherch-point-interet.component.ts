import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import * as esri_geo from 'esri-leaflet-geocoder';



@Component({
  selector: 'app-recherch-point-interet',
  templateUrl: './recherch-point-interet.component.html',
  styleUrls: ['./recherch-point-interet.component.css']
})
export class RecherchPointInteretComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
    this.createMap();
  }

  private createMap(): void{
    const coordsParis = { lat: 48.8534, lng: 2.3488 };
    const coordsFromBrowser = { lat: coordsParis.lat, lng: coordsParis.lng };


    const map = L.map('map').setView(
      [coordsFromBrowser.lat, coordsFromBrowser.lng],
      12
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const searchControl = esri_geo.geosearch().addTo(map);

    const results =  L.layerGroup().addTo(map);

    let markers = [];



    searchControl.on('results', (data) => {
      markers = [];
      console.log('data', data);
      results.clearLayers();
      // several results as several towns with same name (like)
      for (let i = data.results.length - 1; i >= 0; i--) {
        const result = data.results[i];
        const marker = L.marker(result.latlng);
        // @ts-ignore
        markers = [...markers, L.marker(marker)];
        results.addLayer(marker);
        marker.on('click', addRadius);
        console.log('markers', markers);
      }
    });


    function addRadius(marker, radius = 1000): any  {
      console.log('marker clicked', marker);
      const circle = L.circle([marker.latlng.lat, marker.latlng.lng], {
        radius,
      });
      console.log('circle', circle);
      circle.addTo(map);
      setTimeout(() => {
        map.setZoom(15);
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
