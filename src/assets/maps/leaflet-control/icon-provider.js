
function getIcon(categorie1, categorie2, categorie3) {
    if (categorie3 === "Coiffeurs") {
        return "map-icons/saloon.png";
    } else if (categorie3 === "Caf\u00e9s-Bars-Brasseries") {
        return  "map-icons/bars.png";
    } else if (categorie3 === "Habillement") {
        return  "map-icons/clothings.png";
    } else if (categorie3 === "Bijouteries") {
        return  "map-icons/jewelry.png";
    } else if (categorie3 === "Ameublement-D\u00e9coration") {
        return  "map-icons/furniture-stores.png";
    } else if (categorie3 === "Librairies-Papeteries-Presse") {
        return  "map-icons/libraries.png";
    } else if (categorie3 === "Cadeaux ou jouets") {
        return  "map-icons/gifts-flowers.png";
    } else if (categorie3 === "Agences de voyages") {
        return  "map-icons/travel.png";
    } else if (categorie3 === "Epiceries, sup\u00e9rettes et grande distribution") {
        return  "map-icons/shopping.png";
    } else if (categorie3 === "Aide \u00e0 l'emploi et d\u00e9veloppement \u00e9conomique") {
        return  "map-icons/employment.png";
    } else if (categorie3 === "Musique") {
        return  "map-icons/musical-instruments.png";
    } else if (categorie3 === "Arbres remarquables") {
        return  "map-icons/marker-new1_12.png";
    } else if (categorie3 === "Bureaux de vote") {
        return  "map-icons/government.png";
    } else if (categorie3 === "Sculptures de m\u00e9tal") {
        return  "map-icons/museums.png";
    } else if (categorie3 === "Equipements sportifs, accès réservé") {
        return  "map-icons/sporting-goods.png";
    } else if (categorie3 === "Parcs") {
        return  "map-icons/parks.png";
    } else if (categorie3 === "Restauration-Bars-Tabacs") {
        return  "map-icons/restaurants.png";
    } else if (categorie3 === "Agences immobilières") {
        return  "map-icons/real-estate.png";
    } else if (categorie3 === "Animalerie-Toilettage") {
        return  "map-icons/pets.png";
    } else if (categorie3 === "Stations services-Lavage") {
        return  "map-icons/automotive.png";
    } else if (categorie3 === "Marchés") {
        return  "map-icons/miscellaneous-for-sale.png";
    } else if (categorie3 === "Centres, cliniques et hôpitaux") {
        return  "map-icons/health-medical.png";
    } else if (categorie3 === "Pharmacies") {
        return  "map-icons/medical.png";
    } else if (categorie3 === "Parkings voitures sous-sol") {
        return  "map-icons/automotive.png";
    }

    if (categorie2 === "Entreprises TIC + de 50 salari\u00e9s") {
        return  "map-icons/professional.png";
    } else if (categorie2 === "Education") {
        return  "map-icons/schools.png";
    } else if (categorie2 === "Transports") {
        return  "map-icons/transport.png";
    } else if (categorie2 === "Hôtels et chambres d'hôtes") {
        return  "map-icons/hotels.png";
    } else if (categorie2 === "Petite Enfance") {
        return  "map-icons/play-schools.png";
    } else if (categorie3 === "Cyber cité") {
        return  "map-icons/internet.png";
    }

    return "map-icons/default.png";
}
