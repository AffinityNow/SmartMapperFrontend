import {Component, AfterViewInit, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';


@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})

export class LocalisationComponent implements AfterViewInit, OnInit  {
  carte;
  /* https://www.zupimages.net/*/
  smallIcon = new L.Icon({
    iconUrl: 'https://www.zupimages.net/up/20/43/a73q.png',
    iconSize:    [25, 25],
  });
  searchField: FormControl;
  searches: string[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }

  // tslint:disable-next-line:typedef
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

  // tslint:disable-next-line:typedef
  pins({coords, text, open}) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon });
    if (open) {
      marker.addTo(this.carte).bindPopup(text).openPopup();
    } else {
      marker.addTo(this.carte).bindPopup(text);
    }
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
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
