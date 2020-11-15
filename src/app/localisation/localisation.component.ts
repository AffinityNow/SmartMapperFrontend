import {Component, AfterViewInit, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {FormControl, NgModel} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {control, icon, latLng, map, polyline, tileLayer} from 'leaflet';
import scale = control.scale;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from '../app.component';
import {BrowserModule} from '@angular/platform-browser';
import zoom = control.zoom;
@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})

export class LocalisationComponent implements AfterViewInit, OnInit   {
  carte;
  /* https://www.zupimages.net/*/
  smallIcon = new L.Icon({ iconUrl: 'https://www.zupimages.net/up/20/43/a73q.png', iconSize: [25, 25],  });
  ImageIcon = new L.Icon({ iconUrl: 'https://www.zupimages.net/up/20/45/ox4s.png', iconSize: [25, 25],  });
  private nanterre: { lng: number; lat: number };
  private poissy: { lng: number; lat: number };
  private elysee: { lng: number; lat: number };
  private casino: { lng: number; lat: number };
  private fleuriste: { lng: number; lat: number };

  searchField: FormControl;
  searches: string[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }

  // tslint:disable-next-line:typedef
  createMap() {
    // mettre dans la back
    const nanterre = L.marker([48.892423, 2.215331], { icon: this.smallIcon } ).bindPopup('Mr Delbot house aka le chef du corona ');
    const poissy    = L.marker([48.9333, 2.05], { icon: this.smallIcon }).bindPopup('Poissy est une commune française du département des Yvelines en région Île-de-France. La ville possède une longue histoire.ville de ST louis le  Louis IX');
    const elysee    = L.marker([48.8763, 2.3183], { icon: this.smallIcon }).bindPopup('Le palais de l\'Élysée, dit l\'Élysée, est un ancien hôtel particulier parisien, situé au nᵒ 55 de la rue du Faubourg-Saint-Honoré, dans le 8ᵉ arrondissement de Paris. Il est le siège de la présidence de la République française et la résidence officielle du président de la République depuis la IIᵉ République.');
    const casino    = L.marker([48.898908, 2.093761], { icon: this.smallIcon }).bindPopup('mon magasin à st germain ');
    const fleuriste = L.marker([48.9, 2.23], { icon: this.smallIcon }).bindPopup('mon fleuristeUn fleuriste est un artisan spécialisé dans la vente de fleurs et la confection de bouquets de fleurs et d\'assemblages appelés « compositions » de courbevoie ');
    const eglise = L.marker([48.852968, 2.349902], { icon: this.ImageIcon }).bindPopup('<p>La cathédrale Notre-Dame de Paris, communément appelée Notre-Dame, est l\'un des monuments les plus emblématiques de Paris et de la France. Elle est située sur l\'île de la Cité et est un lieu de culte catholique, siège de l\'archidiocèse de Paris, dédiée à la Vierge Marie</p> <img src=\'https://www.zupimages.net/up/20/45/1c0u.jpg\'>');
    const louvre = L.marker([48.8592, 2.3417], { icon: this.smallIcon }).bindPopup('Le louvre Leonardo da vinci');
// ajout dans les layers
    const cities = L.layerGroup([nanterre, poissy, elysee, casino, fleuriste, louvre]);
    const monument = L.layerGroup([eglise]);
// c'est les maps caret 1-3
    const carte1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 3,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    const carte2 = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      minZoom: 3,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    const carte3 = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      minZoom: 3,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    // tslint:disable-next-line:typedef
// center la carte sur le coord de paris
    this.carte = L.map('map', {
      center: [48.892423, 2.215331 ],
      zoom: 10,
      layers: [carte1, cities]
    });

// c'est les layers de controle
    const baseMaps = {carte1, carte2, carte3};
    const overlayMaps = {cities, monument};
    // test
    /*const route = polyline([[ 46.78465227596462, -121.74141269177198 ], [ 46.80047278292477, -121.73470708541572 ]]);
    const overlay = {
      poissy: this.poissy,
      elysee: this.elysee,
      itineraire: route
    };
    const options = {
      layers: [ carte1, route, this.poissy, this.elysee ],
      zoom: 7,
      center: latLng([ 48.892423, 2.215331 ])
    };*/

    // faire pour les images
    L.control.layers(baseMaps, overlayMaps).addTo(this.carte);
    scale().addTo(this.carte);
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
