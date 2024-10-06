// ==UserScript==
// @name         DC City Redux
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Amélioration graphique de la ville de Dreadcast
// @author       M0lly
// @match        https://www.dreadcast.net/Main
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // URL du nouveau fichier .gif avec les bâtiments et routes personnalisés
    const newBuildingGif = 'https://dc-buldings.netlify.app/carte_batiments.gif';
    const newRoadGif = 'https://dc-buldings.netlify.app/carte_rues_s1.gif';

    // Fonction pour changer l'image des batiments
    const updateMapTiles = () => {
        const mapCases = document.querySelectorAll('.case_map');
        mapCases.forEach(caseElement => {
            caseElement.style.backgroundImage = `url(${newBuildingGif})`;
        });
    };

    // Fonction pour changer l'image des routes
    const updateRoadImage = () => {
        const roadDivs = document.querySelectorAll('div[style*="images/carte/carte_rues_s1.png"]');
        roadDivs.forEach(div => {
            div.style.backgroundImage = `url(${newRoadGif})`;
        });
    };

    // Application initiale des modifications
    updateMapTiles();
    updateRoadImage();


    // FIX POUR EVITER QUE LES IMAGES DE BASES NE VIENNENT ECRASER LES IMAGES CUSTOM (lors des entrée/sorties de batiment par exemple)
    // Partie à retravailler car potentillement couteuse en ressources (??)

    // Observer pour détecter les modifications du DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                updateMapTiles();
                updateRoadImage();
            }
        });
    });

    // Options de configuration de l'observer
    const config = { attributes: true, childList: true, subtree: true };

    // Démarrage de l'observation
    observer.observe(document.body, config);

    // Réappliquer les modifications à intervalles réguliers pour garantir la persistance
    setInterval(() => {
        updateMapTiles();
        updateRoadImage();
    }, 5000);  // Chaque 5000 millisecondes (5 secondes).
})();
