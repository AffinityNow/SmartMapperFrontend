import {Component, AfterViewInit, OnInit} from '@angular/core';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import {FormControl, NgModel} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {control, Icon, icon, latLng, map, marker, polyline, tileLayer} from 'leaflet';
import scale = control.scale;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from '../app.component';
import {BrowserModule} from '@angular/platform-browser';
import zoom = control.zoom;
import 'leaflet-routing-machine';
import layers = control.layers;
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
import * as ELG from 'esri-leaflet-geocoder';
// @ts-ignore
// import Leaflet from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
});

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})

export class LocalisationComponent implements AfterViewInit, OnInit   {
  searchField: FormControl;
  searches: string[] = [];
  carte;
  // markerR;
  /* https://www.zupimages.net/*/
  smallIcon = new L.Icon({ iconUrl: 'https://www.zupimages.net/up/20/43/a73q.png', iconSize: [25, 25],  });
  ImageIcon = new L.Icon({ iconUrl: 'https://www.zupimages.net/up/20/45/ox4s.png', iconSize: [25, 25],  });
  GeollocIcon = new L.Icon({ iconUrl: 'https://www.zupimages.net/up/20/47/gk6n.png', iconSize: [25, 25],  });
  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }

  // tslint:disable-next-line:typedef
  createMap() {
    // ajout de pointer marker
   /* const coordsParis = {lat: 48.8534, lng: 2.3488};
    const coordsFromBrowser = {lat: coordsParis.lat, lng: coordsParis.lng};
    const searchControl = ELG.geosearch().addTo(this.carte);
    const results = L.layerGroup().addTo(this.carte);
    let markers = [];

    searchControl.on('results', (data) => {
      markers = [];
      console.log('data', data);
      results.clearLayers();
      // several results as several towns with same name (like)
      for (let i = data.results.length - 1; i >= 0; i--) {
        const result = data.results[i];
        const markerR = L.marker(result.latlng);
        markers = [...markers];
        results.addLayer(markerR);
        markerR.on('mouseover', addRadius);
        console.log(new ELG.ReverseGeocode());
        markerR.on('click', <LeafletMouseEvent>(e) => {
          new ELG.ReverseGeocode().latlng(e.latlng).run((error, res) => {
            if (error) {
              return;
            }
            if (this.markerR && this.carte.hasLayer(this.markerR)) {
              this.carte.removeLayer(this.markerR);
            }

            this.markerR = L.marker(result.latlng)
              .addTo(this.carte)
              .bindPopup(res.address.Match_addr)
              .openPopup();
          });
        });
        console.log('markers', markers);
      }
    });

    function addRadius(markerR, radius = 1000): any {
      console.log('marker clicked', markerR);
      const circle = L.circle([markerR.latlng.lat, markerR.latlng.lng], {
        radius,
      });
      console.log('circle', circle);
      circle.addTo(this.carte);
      setTimeout(() => {
        this.carte.setZoom(15);
      }, 1000);
    }*/
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
// c'est les maps caret 1-3
      const carte1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 19,
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.carte);
      const carte2 = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        minZoom: 3,
        maxZoom: 19,
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors +\'Routes from <a href="http://project-osrm.org/">OSRM</a>, \''
      });
      const carte3 = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 19,
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
// on ajoute des lignes pour chaques pts d'interet
// https://www.liedman.net/leaflet-routing-machine/api/
      const itineraire1 = L.Routing.control({
        waypoints: [
          L.latLng([48.892423, 2.215331]),
          // L.latLng(poi),
          L.latLng([coords.latitude, coords.longitude])
        ],
        useZoomParameter: false,
        autoRoute: true,
        routeWhileDragging: true,
        // geocoder: L.Control.Geocoder.nominatim()
      }).addTo(this.carte);
      // calcule la distance entre 2 marker
      // const distance = poissy.getLatLng().distanceTo([coords.latitude, coords.longitude].getLatLng());
      // alert(distance);

      /* Si on a des donnees dans la base
          L.routing.control.({
            waypoints: [null
            ]
          })

         ou si on a plusieurs pts

          L.routing.control.setWaypoints([
            L.latLng(lat1, lon1),
            L.latLng(lat2, lon2)
          ]);
          */
      const baseMaps = {carte1, carte2, carte3};
      const overlayMaps = {cities, monument};
      const Geomarker = L.marker([coords.latitude, coords.longitude], {icon: this.GeollocIcon}).addTo(this.carte);
      Geomarker.bindPopup('<b>Ici</b>').openPopup();
      // faire pour les images
      L.control.layers(baseMaps, overlayMaps).addTo(this.carte).setPosition('bottomleft');
      scale().addTo(this.carte);
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
