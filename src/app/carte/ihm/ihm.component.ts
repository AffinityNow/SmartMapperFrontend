import {Categories, PointInteret} from '../../shared/model/pointInteret';
import {PointInteretService} from '../../shared/service/point-interet.service';

// Erwyn

import {Component, AfterViewInit, OnInit} from '@angular/core';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import {Browser, circle, Control, control, Icon, icon, latLng, map, marker, polyline, tileLayer} from 'leaflet';
import scale = control.scale;
import 'leaflet-easybutton';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-routing-machine';

import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
// @ts-ignore
import Leaflet from 'leaflet';
import {FormControl} from "@angular/forms";
import 'leaflet-routing-machine';
import layers = control.layers;
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
import * as ELG from 'esri-leaflet-geocoder';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";


delete Leaflet.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
});

@Component({
  selector: 'app-ihm',
  templateUrl: './ihm.component.html',
  styleUrls: ['./ihm.component.css']
})
export class IHMComponent implements OnInit, AfterViewInit {

  pointInteretList: string[];
  pointInteretSelectionnes: string[];
  map;
  marker;
  caterogies: any[];
  displayAddressList = false;
  pointInteretCurrent: PointInteret[] = [];


  //Erwyn
  searchField: FormControl;
  searches: string[] = [];
  carte;
  marker_bis;
  /* https://www.zupimages.net/*/
  smallIcon = new L.Icon({iconUrl: 'https://www.zupimages.net/up/20/43/a73q.png', iconSize: [25, 25], });
  ImageIcon = new L.Icon({iconUrl: 'https://www.zupimages.net/up/20/45/ox4s.png', iconSize: [25, 25], });
  GeollocIcon = new L.Icon({iconUrl: 'https://www.zupimages.net/up/20/47/gk6n.png', iconSize: [25, 25], });

  constructor(private pointInteretService: PointInteretService) {
  }

  ngAfterViewInit(): void {
    this.createMap()
    }

    //Erwyn

  // tslint:disable-next-line:typedef
  createMap() {
    // ajout de pointer marker
    // mettre dans la back
    const nanterre = L.marker([48.892423, 2.215331], {icon: this.smallIcon}).bindPopup('Mr Delbot house aka le chef du corona ');
    const poissy = L.marker([48.9333, 2.05], {icon: this.smallIcon}).bindPopup('Poissy est une commune française du département des Yvelines en région Île-de-France. La ville possède une longue histoire.ville de ST louis le  Louis IX');
    const elysee = L.marker([48.8763, 2.3183], {icon: this.smallIcon}).bindPopup('Le palais de l\'Élysée, dit l\'Élysée, est un ancien hôtel particulier parisien, situé au nᵒ 55 de la rue du Faubourg-Saint-Honoré, dans le 8ᵉ arrondissement de Paris. Il est le siège de la présidence de la République française et la résidence officielle du président de la République depuis la IIᵉ République.');
    const casino = L.marker([48.898908, 2.093761], {icon: this.smallIcon}).bindPopup('mon magasin à st germain ');
    const fleuriste = L.marker([48.9, 2.23], {icon: this.smallIcon}).bindPopup('mon fleuristeUn fleuriste est un artisan spécialisé dans la vente de fleurs et la confection de bouquets de fleurs et d\'assemblages appelés « compositions » de courbevoie ');
    const eglise = L.marker([48.852968, 2.349902], {icon: this.ImageIcon}).bindPopup('<p>La cathédrale Notre-Dame de Paris, communément appelée Notre-Dame, est l\'un des monuments les plus emblématiques de Paris et de la France. Elle est située sur l\'île de la Cité et est un lieu de culte catholique, siège de l\'archidiocèse de Paris, dédiée à la Vierge Marie</p> <img src=\'https://www.zupimages.net/up/20/45/1c0u.jpg\'>');
    const louvre = L.marker([48.8592, 2.3417], {icon: this.smallIcon}).bindPopup('Le louvre Leonardo da vinci');
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
      /* L.easyButton( 'fa-gbp', function circle()
       L.circle([position.coords.latitude, position.coords.longitude], {radius: 1000}).addTo(this.carte);
         alert('1km');
       }).addTo(this.carte);*/
      const searchControl = ELG.geosearch().addTo(this.carte);
      const results = L.layerGroup().addTo(this.carte);
      let markers = [];
      /*
            this.carte.on('click', onMapClick);
            function onMapClick(e){
              alert('Vous venez de cliquer aux coordonnées ' + e.latlng);
              const coco = L.marker([e.latitude, e.longitude], { icon: this.smallIcon } ).addTo(this.carte);
            }
      */
      // @ts-ignore
      const markeree = new L.marker(this.carte.getCenter(), {
        draggable: true,
        autoPan: true
      }).addTo(this.carte);

      searchControl.on('results', (data) => {
        markers = [];
        console.log('data', data);
        results.clearLayers();
        // several results as several towns with same name (like)
        for (let i = data.results.length - 1; i >= 0; i--) {
          const result = data.results[i];
          const markerR = L.marker(result.latlng);
          const itineraire1 = L.Routing.control({
            waypoints: [
              L.latLng(result.latlng),
              L.latLng([coords.latitude, coords.longitude])
            ],
            useZoomParameter: false,
            autoRoute: true,
            routeWhileDragging: true,
            fitSelectedRoutes: true,
            router: L.Routing.osrmv1({serviceUrl: 'http://router.project-osrm.org/route/v1'}),
            // geocoder: L.Control.Geocoder.nominatim({})
            // router: new L.Routing.graphHopper('62403b36-c15e-4815-b284-8d68590b2bc1');
          }).addTo(this.carte);
          // const gph = L.geographPhotos({api_key: '47c9baf779', autoZoomOnAdd: true, query: 'canal'}).addTo(this.carte);
          // itineraire1.hide().addTo(this.carte);
          // this.carte.removeControl(itineraire1);
          //  this.carte.itineraire1.hide();
          //    L.Routing.itinerary().addTo(this.carte);
          markers = [...markers];
          results.addLayer(markerR);
          console.log(new ELG.ReverseGeocode());
          markerR.on('click', <LeafletMouseEvent>(e) => {
            new ELG.ReverseGeocode().latlng(e.latlng).run((error, res) => {
              if (error) {
                return;
              }
              if (this.marker && this.carte.hasLayer(this.marker)) {
                this.carte.removeLayer(this.marker);
              }
              this.marker = L.marker([result.latitude, result.longitude])
                .addTo(this.carte)
                .bindPopup(res.address.Match_addr)
                .openPopup();
            });
          });
          console.log('markers', markers);
        }
      });
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
      const test = (poissy.getLatLng());
      const testgeo = L.marker([coords.latitude, coords.longitude]);
      const test1 = (testgeo.getLatLng());
      const group = L.layerGroup().addTo(this.carte);

      document.getElementById('radius').addEventListener('input', changeRadius);
      function changeRadius(event) {
        const newRadius = event.target.value;
        // tslint:disable-next-line:only-arrow-functions
        group.eachLayer(function(layer) {
          if (layer instanceof L.Circle) {
            layer.setRadius(newRadius); // obtenir le rayon
          }
        });
      }
      const circle = L.circle(test1, {
        radius: 1000,
      }).addTo(group);

      // tslint:disable-next-line:no-shadowed-variable
      const marker = L.marker(test1).addTo(group);
      // https://www.liedman.net/leaflet-routing-machine/api/
      // calcule la distance entre 2 marker
      const baseMaps = {carte1, carte2, carte3};
      const overlayMaps = {cities, monument};
      const Geomarker = L.marker([coords.latitude, coords.longitude], {icon: this.GeollocIcon}).addTo(this.carte);
      Geomarker.bindPopup('<b>Vous êtes ici</b>').openPopup();
      // faire pour les images
      const controller = L.control.layers(baseMaps, overlayMaps).addTo(this.carte).setPosition('bottomleft');
      scale().addTo(this.carte);
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

  ngOnInit(): void {
    this.caterogies = [Categories.COMMERCE, Categories.EDUCATION, Categories.SPORTS, Categories.TRANSPORTS,
      Categories.HOTELS, Categories.SANTE, Categories.RESTAURATION, Categories.CULTES];

    //Erwyn
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

  getCurrentPointInteret(categorie: string): void {
    this.displayAddressList = true;
    this.pointInteretService.loadPointInteretByCategorie(categorie).subscribe(res => this.pointInteretCurrent = res);
  }

}
