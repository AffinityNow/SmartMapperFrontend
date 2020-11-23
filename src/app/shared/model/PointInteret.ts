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

export enum CateroriesPointInteret{
COMMERCES_CONSOMMATION = "Commerces, consommation",
HOTELS="Hôtels et chambres d'hôtes",
ADMINISTRATIONS="Administrations",
VIE="vie citoyenne et vie pratique",
SENIORS="Seniors",
LOISIRS="Culture et loisirs",
CYBER_CITE = "Cyber cité",
ENVIRONNEMENT = "Environnement",
CADRE_DE_VIE = "cadre de vie",
ENTREPRISES_PLUS_50 = "Entreprises TIC + de 50 salariés",
SANTE = "Santé",
TRANSPORTS = "Transports",
SPORTS="Sports",
EDUCATION="Education",
PETITE_ENFANCE="Petite Enfance",
CULTES="Cultes",
VIE_PRATIQUE="Vie pratique",
ASSOCIATIONS="Associations"
}
