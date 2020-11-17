import {Component, AfterViewInit, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {control} from 'leaflet';
import scale = control.scale;

@Component({
  selector: 'app-localisation',
  templateUrl: './geolocalisation.component.html',
  styleUrls: ['./geolocalisation.component.css']
})

export class GeolocalisationComponent implements AfterViewInit, OnInit {
  carte;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.createMap();
  }
  createMap(): void {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      this.carte = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXZpMjIwNiIsImEiOiJja2hnNXZrcW0wcG5lMnpvNGk1NzdpM2ZwIn0.BPLizxhfP4RP6hELi6SPJA',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiYXZpMjIwNiIsImEiOiJja2hnNXZrcW0wcG5lMnpvNGk1NzdpM2ZwIn0.BPLizxhfP4RP6hELi6SPJA',
        }
      ).addTo(this.carte);
      // @ts-ignore
      const marker = L.marker(latLong).addTo(this.carte);
      marker.bindPopup('<b>You are here</b>').openPopup();
    });
    this.watchPosition();
  }
    watchPosition(): void {
      const desLat = 0;
      const desLon = 0;
      const id = navigator.geolocation.watchPosition(
        (position) => {
          console.log(
            `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
          );
          if (position.coords.latitude === desLat) {
            navigator.geolocation.clearWatch(id);
          }
        },
        (err) => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  ngOnInit(): void {
    this.createMap();
  }
}


