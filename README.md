# Two S Cars — site vitrine

Site responsive en HTML, CSS et JavaScript natif, sans framework ni backend.

## Lancer en local
- Ouvrez `index.html`, ou
- lancez `python -m http.server 8000` dans ce dossier puis ouvrez `http://localhost:8000`.

## Effets inspirés de la référence vidéo
- Hero avec vidéo de fond en lecture automatique, muette et en boucle, avec image poster de secours.
- Bandeau jaune défilant de droite à gauche avec les marques des véhicules listés.
- Animations d'apparition au défilement sur les sections et cartes de véhicules.
- Bouton WhatsApp flottant rond avec l'icône WhatsApp, sans libellé rectangulaire.
- Thème sombre par défaut et bascule vers le thème crème.
- Police Anton/Oswald pour le style automobile d'affichage et Montserrat pour le texte.

## Personnalisation
- Couleurs, typographie, responsive design et animations dans `styles.css`.
- Catalogue, images, tarifs et numéro WhatsApp dans `script.js`.
- Logo : `assets/two-s-cars-logo.png`; favicon : `assets/favicon.ico`.
- Numéro configuré : +212 762 39 87 37 (format `wa.me`: `212762398737`).

## Catalogue
- Kia Picanto BVA (pas de deuxième Kia Picanto standard)
- Opel Corsa
- Renault Clio 5
- Peugeot 208
- Dacia Lodgy — 7 places — 300 DH/jour
- Škoda Kodiaq — configuré comme 7 places — 400 DH/jour
- Hyundai Tucson

Les tarifs des autres voitures restent à confirmer avec l'agence.

## Vidéo et photos
La vidéo du hero est chargée depuis un lien externe Pexels configuré dans `index.html`. L'image poster est un recours si la vidéo ne se charge pas. La lecture nécessite une connexion Internet; pour une mise en production durable, remplacez la source par un fichier MP4 local que vous avez le droit d'utiliser.
Les photos des véhicules proviennent de liens externes et représentent les modèles, pas nécessairement les exemplaires exacts de Two S Cars. Remplacez-les par des photos de l'agence avec son autorisation.

## Avis et exactitude
Le site renvoie vers les avis originaux sur Google Maps au lieu d'inventer des avis clients. Vérifiez les coordonnées, prix, disponibilités et caractéristiques auprès de l'agence avant publication. La demande WhatsApp n'est pas une réservation confirmée.

## Hébergement gratuit
Importez le projet dans un dépôt GitHub, puis créez un projet Cloudflare Pages sans framework/build command. Le domaine personnalisé, s'il y en a un, doit être acheté par le client.
