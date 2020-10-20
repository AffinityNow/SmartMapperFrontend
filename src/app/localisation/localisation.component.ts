import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})
export class LocalisationComponent implements AfterViewInit {
  carte;
  constructor() { }

  ngAfterViewInit(): void {
    this.createCarte();

  }
  createCarte(){
    const paris = {
      latitude: 48.892423,
      longitude: 2.215331,
    };
    const zoomLevel = 14;
    this.carte = L.map('map', {
      center: [paris.latitude, paris.longitude],
      zoom: zoomLevel

    });
    /*https://wiki.openstreetmap.org/wiki/Tiles il y a d'autres type*/
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(this.carte);
  }

}
