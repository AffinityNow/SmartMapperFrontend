import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-recherch-mot-cle',
  templateUrl: './recherch-mot-cle.component.html',
  styleUrls: ['./recherch-mot-cle.component.css']
})
export class RecherchMotCleComponent implements OnInit {

  ngOnInit(): void {
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

}
