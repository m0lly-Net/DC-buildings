// ==UserScript==
// @name         DreadCast Buildings
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remplace les batiments sur la carte du jeu par des batiments personnalisée.
// @author       M0lly
// @match        https://www.dreadcast.net/Main
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // URL du nouveau fichier .gif avec les bâtiments personnalisés
    const newBuildingGif = 'https://dc-buldings.netlify.app/buildings/carte_batiments.gif';

    // Fonction pour changer l'image de fond des cases de la carte
    const updateMapTiles = () => {
        const mapCases = document.querySelectorAll('.case_map');
        mapCases.forEach(caseElement => {
            caseElement.style.backgroundImage = `url(${newBuildingGif})`;
        });
    };

    // Fix pour éviter que le fichier "carte_batiment.gif" original ne reprenne le dessus sur le script (lors des entrées/sorties de bâtiment par exemple.)

    // Observer pour détecter les modifications du DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length || mutation.attributeName === 'style') {
                updateMapTiles();
            }
        });
    });

    // Options de configuration de l'observer
    const config = { attributes: true, childList: true, subtree: true };

    // Démarrage de l'observation
    observer.observe(document.body, config);

    // Première application des modifications
    updateMapTiles();
})();