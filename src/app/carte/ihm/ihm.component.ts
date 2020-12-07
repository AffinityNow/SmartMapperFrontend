// Ahlem
import {Categories, PointInteret} from '../../shared/model/pointInteret';
import {PointInteretService} from '../../shared/service/point-interet.service';
import {Component, AfterViewInit, OnInit} from '@angular/core';
import * as L from 'leaflet';

// Erwyn
// @ts-ignore
import Leaflet from 'leaflet';
import {FormControl} from '@angular/forms';
import 'leaflet-routing-machine';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
import * as ELG from 'esri-leaflet-geocoder';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import {Browser, circle, Control, control, Icon, icon, latLng, map, marker, polyline, tileLayer,} from 'leaflet';
import scale = control.scale;
import 'leaflet-easybutton';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-routing-machine';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import layers = control.layers;
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'style-loader!esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.js';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
// import any = jasmine.any;


// Ahlem
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Erwyn
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
  // Erwyn
  searchField: FormControl;
  searches: string[] = [];
  carte;
  /* https://www.zupimages.net/*/
  smallIcon = new L.Icon({iconUrl: 'https://www.zupimages.net/up/20/43/a73q.png', iconSize: [25, 25], });
  ImageIcon = new L.Icon({iconUrl: 'https://www.zupimages.net/up/20/45/ox4s.png', iconSize: [25, 25], });
  GeollocIcon = new L.Icon({iconUrl: 'https://www.zupimages.net/up/20/47/gk6n.png', iconSize: [25, 25], });

// *******************Ahlem*****************************************
  pointInteretList: string[];
  pointInteretSelectionnes: string[];
  caterogies: any[];
  displayAddressList = false;
  pointInteretCurrent: PointInteret[] = [];
  marker;
  rayon = 1000;
  limite = 20000;

  constructor(private pointInteretService: PointInteretService) {
  }

  getCurrentPointInteret(categorie: string): void {
    this.displayAddressList = true;
    this.pointInteretService.loadPointInteretByCategorie(categorie).subscribe(res => this.pointInteretCurrent = res);
  }

  // tslint:disable-next-line:typedef
  drawMarker(event) {
    const pointInteretSelectionnes = event.value;
    console.log('pointInteretSelectionnes : ' + pointInteretSelectionnes);
    const pids = pointInteretSelectionnes;
    console.log('positions : ' + pids);
    // tslint:disable-next-line:max-line-length
    pids.forEach(pid => L.marker([pid.coordonnes.latitude, pid.coordonnes.longitude], {icon: greenIcon}).addTo(this.carte).bindPopup(pid.description).openPopup());
  }

  ngAfterViewInit(): void {
    this.createMap()
  }


  ngOnInit(): void {
    this.caterogies = [Categories.COMMERCE, Categories.EDUCATION, Categories.SPORTS, Categories.TRANSPORTS,
      Categories.HOTELS, Categories.SANTE, Categories.RESTAURATION, Categories.CULTES];
    // *****************************************************************

// Erwyn
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
      this.carte = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
      // @ts-ignore
      L.control.locate().addTo(this.carte);
      const searchControl = ELG.geosearch().addTo(this.carte);
      const results = L.layerGroup().addTo(this.carte);
      let markers = [];

      // @ts-ignore
      const markeree = new L.marker(this.carte.getCenter(), {
        draggable: true,
        autoPan: true
      }).addTo(this.carte);
      searchControl.on('results', (data) => {
        markers = [];
        console.log('data', data);
        results.clearLayers();
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
            // router: new L.Routing.graphHopper('62403b36-c15e-4815-b284-8d68590b2bc1');
          }).addTo(this.carte);
          // tslint:disable-next-line:typedef only-arrow-functions
          itineraire1.on('routesfound', function(e) {
            const routes = e.routes;
            const summary = routes[0].summary;
            if (summary.totalDistance > 20000){
              circle.setStyle({color: 'red'});
            }
          });
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

      const itineraire2 = L.Routing.control({
        waypoints: [
          L.latLng([coords.latitude, coords.longitude])
        ],
        useZoomParameter: false,
        autoRoute: true,
        routeWhileDragging: true,
        fitSelectedRoutes: true,
        router: L.Routing.osrmv1({serviceUrl: 'http://router.project-osrm.org/route/v1'}),
        // @ts-ignore
        geocoder: L.Control.Geocoder.nominatim({})
      }).addTo(this.carte);
      // tslint:disable-next-line:only-arrow-functions typedef
      itineraire2.on('routesfound', function(e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        if (summary.totalDistance > 20000){ // changeRadius(test1)
          circle.setStyle({color: 'red'});
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
      const testgeo = L.marker([coords.latitude, coords.longitude]);
      const test1 = (testgeo.getLatLng());
      const group = L.layerGroup().addTo(this.carte);

      document.getElementById('radius').addEventListener('input', changeRadius);

      // tslint:disable-next-line:typedef
      function changeRadius(event) {
        const newRadius = event.target.value;
        // tslint:disable-next-line:only-arrow-functions typedef
        group.eachLayer(function(layer) {
          if (layer instanceof L.Circle) {
            layer.setRadius(newRadius); // obtenir le rayon
          }
        });
      }

      // tslint:disable-next-line:no-shadowed-variable
      const circle = L.circle(test1, {
        radius: this.rayon,
      }).addTo(group);

      // tslint:disable-next-line:no-shadowed-variable
      const marker = L.marker(test1).addTo(group);
      // https://www.liedman.net/leaflet-routing-machine/api/
      // calcule la distance entre 2 marker
      const baseMaps = {carte1, carte2, carte3};
      const Geomarker = L.marker([coords.latitude, coords.longitude], {icon: this.GeollocIcon}).addTo(this.carte);
      Geomarker.bindPopup('<b>Vous êtes ici</b>').openPopup();
      // faire pour les images
      const controller = L.control.layers(baseMaps).addTo(this.carte).setPosition('bottomleft');
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



}
