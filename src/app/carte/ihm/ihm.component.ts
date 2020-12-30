// Ahlem
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Categories, PointInteret} from '../../shared/model/pointInteret';
import {GeolocationService} from "../../shared/service/GeolocationService";
import {PoiService} from "../../shared/service/poi.service";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

// Erwyn
// @ts-ignore
import * as L from 'leaflet';
// @ts-ignore
import Leaflet, {control} from 'leaflet';
import {FormControl} from '@angular/forms';
import 'leaflet-routing-machine';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
import * as ELG from 'esri-leaflet-geocoder';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import 'leaflet-easybutton';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'style-loader!esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import scale = control.scale;



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
export class IHMComponent  implements OnInit, OnDestroy, AfterViewInit {
  // Erwyn
  /* https://www.zupimages.net/*/
  smallIcon = new L.Icon({iconUrl: 'https://www.zupimages.net/up/20/43/a73q.png', iconSize: [25, 25],});
  ImageIcon = new L.Icon({iconUrl: 'https://www.zupimages.net/up/20/45/ox4s.png', iconSize: [25, 25],});
  GeollocIcon = new L.Icon({iconUrl: 'https://www.zupimages.net/up/20/47/gk6n.png', iconSize: [25, 25],});
  searchField: FormControl;
  searches: string[] = [];
  carte;

// *******************Ahlem*****************************************
  destroy$: Subject<boolean> = new Subject<boolean>();
  pointInteretSelectionnes: string[];
  pointInteretCurrent: PointInteret[] = [];
  caterogies: any[];
  displayAddressList = false;
  poiAvailable = false;
  marker;
  coords;

  constructor(private pointInteretService: PoiService, private geoLoc: GeolocationService) {
  }

  getCurrentPointInteret(categorie: string): void {
    this.displayAddressList = true;
    this.poiAvailable = true;
    this.pointInteretService.loadPointInteretByCategorieAndPosition(categorie, this.coords.latitude, this.coords.longitude)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.pointInteretCurrent = res;
        this.drawMarker(this.pointInteretCurrent[0]);
        this.drawMarker(this.pointInteretCurrent[1]);
        this.poiAvailable = false;
      });
    console.log( "ma position ",categorie, this.coords.latitude, this.coords.longitude);
  }
  drawMarker(poi:PointInteret):void{
    L.marker([poi.coordonnes.latitude, poi.coordonnes.longitude], {icon: greenIcon})
      .addTo(this.carte).bindPopup(poi.name+"<br>"+poi.description).openPopup();
  }

  drawMarkerEvent(event) {
    const pointInteretSelectionnes = event.value;
    console.log('pointInteretSelectionnes : ' + pointInteretSelectionnes);
    const pids = pointInteretSelectionnes;
    console.log('positions : ' + pids);
    pids.forEach(pid => this.drawMarker(pid));
  }

  ngAfterViewInit(): void {
    this.createMap();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
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


  createMap() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    this.geoLoc.getCurrentPosition().subscribe(position => {
      this.coords = position.coords;
      console.log( "ma position :",
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      this.carte = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

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
              L.latLng([this.coords.latitude, this.coords.longitude])
            ],
            useZoomParameter: false,
            autoRoute: true,
            routeWhileDragging: true,
            fitSelectedRoutes: true,
            router: L.Routing.osrmv1({serviceUrl: 'http://router.project-osrm.org/route/v1'}),
            // router: new L.Routing.graphHopper('62403b36-c15e-4815-b284-8d68590b2bc1');
          }).addTo(this.carte);
          // tslint:disable-next-line:typedef only-arrow-functions
          itineraire1.on('routesfound', function (e) {
            const routes = e.routes;
            const summary = routes[0].summary;
            if (summary.totalDistance > 20000) {
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
          L.latLng([this.coords.latitude, this.coords.longitude])
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
      itineraire2.on('routesfound', function (e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        if (summary.totalDistance > 20000) { // changeRadius(test1)
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
      const testgeo = L.marker([this.coords.latitude, this.coords.longitude]);
      const test1 = (testgeo.getLatLng());
      const group = L.layerGroup().addTo(this.carte);

      document.getElementById('radius').addEventListener('input', changeRadius);

      // tslint:disable-next-line:typedef
      function changeRadius(event) {
        const newRadius = event.target.value;
        // tslint:disable-next-line:only-arrow-functions typedef
        group.eachLayer(function (layer) {
          if (layer instanceof L.Circle) {
            layer.setRadius(newRadius); // obtenir le rayon
          }
        });
      }

      // tslint:disable-next-line:no-shadowed-variable
      const circle = L.circle(test1, {
        radius: 1000,

      }).addTo(group);

      // tslint:disable-next-line:no-shadowed-variable
      const marker = L.marker(test1).addTo(group);
      // https://www.liedman.net/leaflet-routing-machine/api/
      // calcule la distance entre 2 marker
      const baseMaps = {carte1, carte2, carte3};
      const Geomarker = L.marker([this.coords.latitude, this.coords.longitude], {icon: this.GeollocIcon}).addTo(this.carte);
      Geomarker.bindPopup('<b>Vous êtes ici</b>').openPopup();
      // faire pour les images
      const controller = L.control.layers(baseMaps).addTo(this.carte).setPosition('bottomleft');
      scale().addTo(this.carte);
    });
  }
}
