import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {latLng, map} from 'leaflet';
import {control} from 'leaflet';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-geolocalsiation',
  templateUrl: './geolocalsiation.component.html',
  styleUrls: ['./geolocalsiation.component.css']
})
export class GeolocationComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      // @ts-ignore
      // tslint:disable-next-line:no-shadowed-variable
      const map = L.map('map').setView(latLong, 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      ).addTo(map);
      // @ts-ignore
      const marker = L.marker(latLong).addTo(map);

      marker.bindPopup('<b>You are here</b>').openPopup();
    });
    this.watchPosition();
  }
  // tslint:disable-next-line:typedef
  watchPosition() {
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
  }



