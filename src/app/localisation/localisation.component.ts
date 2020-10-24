import {Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';
@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})

export class LocalisationComponent implements AfterViewInit {
  carte;
  /* https://www.zupimages.net/*/
  smallIcon = new L.Icon({
    iconUrl: 'https://www.zupimages.net/up/20/43/a73q.png',
    iconSize:    [25, 25],
  });

  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }

  createMap() {
    const nanterre = {
      lat: 48.892423,
      lng: 2.215331,
    };

    this.carte = L.map('map', {
      center: [nanterre.lat, nanterre.lng],
      zoom: 5,
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 11,
      maxZoom: 15,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.carte);
    const description = `Mr Delbot house aka le chef du corona `;
    const descrip = {
      coords: nanterre,
      text: description,
      open: true
    };
    this.pins(descrip);
  }

  pins({coords, text, open}) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon });
    if (open) {
      marker.addTo(this.carte).bindPopup(text).openPopup();
    } else {
      marker.addTo(this.carte).bindPopup(text);
    }
  }
}
