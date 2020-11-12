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

export class LocalisationComponent implements AfterViewInit, OnInit  {
  carte;
  /* https://www.zupimages.net/*/
  smallIcon = new L.Icon({
    iconUrl: 'https://www.zupimages.net/up/20/43/a73q.png',
    iconSize:    [25, 25],
  });

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
    // les mettre dans une arraylist je vais faire apres
    const nanterre = { lat: 48.892423, lng: 2.215331 };
    const poissy = { lat: 48.9333, lng: 2.05};
    const elysee = { lat: 48.8763, lng: 2.3183};
    const casino = { lat: 48.898908, lng: 2.093761};
    const fleuriste = { lat: 48.9, lng: 2.23};

    this.carte = L.map('map', {
      center: [nanterre.lat, nanterre.lng],
      zoom: 5,
    });
// 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}' autre tiles
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 11,
      maxZoom: 15,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.carte);
// ici il faut faire moin de ligne
    const description = `Mr Delbot house aka le chef du corona `;
    const descrip = {coords: nanterre, text: description,  open: true };
    const description1 = `Le palais de l'Élysée, dit l'Élysée, est un ancien hôtel particulier parisien, situé au nᵒ 55 de la rue du Faubourg-Saint-Honoré, dans le 8ᵉ arrondissement de Paris. Il est le siège de la présidence de la République française et la résidence officielle du président de la République depuis la IIᵉ République.`;
    const descrip1 = {coords: elysee, text: description1,  open: true };
    const description2 = `Poissy est une commune française du département des Yvelines en région Île-de-France. La ville possède une longue histoire.ville de ST louis le  Louis IX`;
    const descrip2 = {coords: poissy, text: description2,  open: true };
    const description3 = `mon fleuristeUn fleuriste est un artisan spécialisé dans la vente de fleurs et la confection de bouquets de fleurs et d'assemblages appelés « compositions » de courbevoie `;
    const descrip3 = {coords: fleuriste, text: description3,  open: true };
    const description4 = `mon magasin à st germain  `;
    const descrip4 = {coords: casino, text: description4,  open: true };
    this.pins(descrip);
    this.pins(descrip1);
    this.pins(descrip2);
    this.pins(descrip3);
    this.pins(descrip4);
    scale().addTo(this.carte);
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
