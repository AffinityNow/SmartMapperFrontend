import {LatLngTuple} from 'leaflet';

export class PointInteret{
    datasetid: string;
    recordid: string;
    fields: Champs;
    geometry: Geometrie;
    record_timestamp: string;
}

export class Champs{
    ville : string;
    wgs84 : LatLngTuple;
    description : string;
    adresse : string;
    telephone: string;
    longitude: number;
    codepostal: number;
    latitude: number;
    titre: string;
    categorie1: string;
    categorie3: string;
    categorie2: string;
}

export class Geometrie{
    type: string;
    coordinates: LatLngTuple;
}

/*export enum CateroriesPointInteret{
COMMERCES_CONSOMMATION = "Commerces, consommation",
HOTELS="Hôtels et chambres d'hôtes",
VIE_CITOYENNE="Administrations,vie citoyenne et vie pratique",
SENIORS="Seniors",
LOISIRS="Culture et loisirs",
CYBER_CITE = "Cyber cité",
ENVIRONNEMENT = "Environnement, cadre de vie",
ENTREPRISES_PLUS_50 = "Entreprises TIC + de 50 salariés",
SANTE = "Santé",
TRANSPORTS = "Transports",
SPORTS="Sports",
EDUCATION="Education",
PETITE_ENFANCE="Petite Enfance",
CULTES="Cultes",
VIE_PRATIQUE="Vie pratique",
ASSOCIATIONS="Associations"
}*/

/*export enum CateroriesPointInteret{
  RESTAURATION = "Restauration",
  HOTELS="Hôtels et chambres d'hôtes",
  SANTE = "Santé",
  TRANSPORTS = "Transports",
  SPORTS="Sports",
  EDUCATION="Education",
  CULTES="Cultes",
  COMMERCE="Commerce"
}*/


export const Categories = {
  RESTAURATION: { libelle: 'Restauration', icon: "../assets/icons/restaurant.png"},
  HOTELS: { libelle: 'Hôtels et chambres d\'hôtes', icon: "../assets/icons/hotel.png"},
  SANTE: { libelle: 'Santé', icon: "../assets/icons/health.png"},
  TRANSPORTS: { libelle: 'Transports', icon: "../assets/icons/transportation.png"},
  SPORTS: { libelle: 'Sports', icon: "../assets/icons/sports.png"},
  EDUCATION: { libelle: 'Education', icon: "../assets/icons/school.png"},
  CULTES: { libelle: 'Cultes', icon: "../assets/icons/foundation.png"},
  COMMERCE: { libelle: 'Commerce', icon: "../assets/icons/shopping.png"},
} as const

export type Categories = keyof typeof Categories
