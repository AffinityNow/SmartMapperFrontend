import {Component, AfterViewInit, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {control} from 'leaflet';
import scale = control.scale;


@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})

export class LocalisationComponent implements AfterViewInit, OnInit {
  searchField: FormControl;
  searches: string[] = [];
  carte;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.createMap();
  }

  // tslint:disable-next-line:typedef
  createMap() {
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
      this.carte = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

      // @ts-ignore
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
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

      // @ts-ignore
      // @ts-ignore
    });
    this.watchPosition();
  }
  // tslint:disable-next-line:typedef
    watchPosition(){
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
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.searches.push(term);
      });

  }
}

