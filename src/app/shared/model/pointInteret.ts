export class PointInteret{
   id:number;
   name : string;
   coordonnes:Coordonnees;
   description:string;
   itineraire:Itineraire;
   adresse:Adresse;
   categories:Categorie[];
}

export class Coordonnees{
   id:number;
   longitude:number;
   latitude:number;
   point:PointInteret;
}
export class Itineraire{
   id:number;
   name:string;

}
export class Adresse{
    name:string;
    lines:string;
    codePostal:string;
    ville:string;
    pays:string;
}
export class Categorie{
    id:number;
    point :PointInteret;
    name:string;
}


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
