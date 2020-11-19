import { Component, OnInit } from '@angular/core';

import * as getIcon from '../../../assets/maps/leaflet-control/icon-provider.js';
import * as geojson from '../../../assets/maps/leaflet-control/geojson-data.js';
import * as L from 'leaflet';


@Component({
  selector: 'app-recherch-mot-cle',
  templateUrl: './recherch-mot-cle.component.html',
  styleUrls: ['./recherch-mot-cle.component.css']
})
export class RecherchMotCleComponent implements OnInit {

  ngOnInit(): void {
    this.createInterestPoints();
    this.createMap();
  }

  private createMap(): void {
    const coordsParis = {lat: 48.825, lng: 2.27};
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
  }

  private createInterestPoints(): geojson {
    return new geojson([], {
      // tslint:disable-next-line:typedef
      pointToLayer(feature, latlng) {
        const smallIcon = L.icon({
          iconUrl: 'working/interest-point/' +
              /*icon-provider.js*/new getIcon(feature.properties.categorie1, feature.properties.categorie2, feature.properties.categorie3),
          // shadowUrl: 'icon-shadow.png',
          iconSize:     [33, 44], // taille de l'icone
          // shadowSize:   [50, 64], // taille de l'ombre
          iconAnchor:   [16, 44], // point de l'icone qui correspondra à la position du marker
          // shadowAnchor: [32, 64],  // idem pour l'ombre
          popupAnchor:  [-3, -76] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
        });
        return L.marker(latlng, {icon: smallIcon});
      },
      // tslint:disable-next-line:typedef
      onEachFeature(feature, layer) {
        let html = '';
        if (feature.properties.titre) {
          html += '<b>' + feature.properties.titre + '</b></br>';
        }
        if (feature.properties.description) {
          html += 'Description :' + feature.properties.description + '</br>';
        }
        if (feature.properties.url) {
          html += '<a href="' + feature.properties.url + '" target="_blank">Site Internet</a></br>';
        }
        if (feature.properties.categorie1) {
          html += 'Catégorie 1 : ' + feature.properties.categorie1 + '</br>';
        }
        if (feature.properties.categorie2) {
          html += 'Catégorie 2 : ' + feature.properties.categorie2 + '</br>';
        }
        if (feature.properties.categorie3) {
          html += 'Catégorie 3 : ' + feature.properties.categorie3 + '</br>';
        }
        layer.bindPopup(html);
      }
    });
  }




}
