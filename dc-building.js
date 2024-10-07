// ==UserScript==
// @name         DC City Redux
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Amélioration graphique de la ville de Dreadcast
// @author       M0lly
// @match        https://www.dreadcast.net/Main
// @grant        none
// @license      A definir
// ==/UserScript==

(function() {
    'use strict';

    // URL des fichiers .gif avec les bâtiments personnalisés
    const newBuildingGif = 'https://dc-buldings.netlify.app/carte_batiments.gif';
    const newRoadGif = 'https://dc-buldings.netlify.app/carte_rues_s1.png';

    //Fonction updateImages() pour remplacer à la fois les lignes avec la classe .case_map (pour les batiments) et la div avec l'url de la map des rues du S1
    const updateImages = () => {
        document.querySelectorAll('.case_map').forEach(el => {
            el.style.backgroundImage = `url(${newBuildingGif})`;
        });
        document.querySelectorAll('div[style*="images/carte/carte_rues_s1.png"]').forEach(div => {
            div.style.backgroundImage = `url(${newRoadGif})`;
        });
    };

    // Initialisaton de l'update des images au lancement du script
    updateImages();

    // Creation d'un MutationObserver pour catch les changements du DOM.
    const observer = new MutationObserver(mutations => {
        let shouldUpdate = false;
        for (let mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                shouldUpdate = true;
                break;
            }
        }
        if (shouldUpdate) updateImages();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 
    // const updateLoop = () => {
    //     updateImages();
    //     requestAnimationFrame(updateLoop);
    // };
    // requestAnimationFrame(updateLoop);
})();