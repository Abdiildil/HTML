document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';  // Base API URL

    // fonction pour les parametres
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const cardId = getQueryParameter('id');  // ID de la carte dans l'url

    if (!cardId) {
        document.body.innerHTML = '<h1>Pas de carte trouvé dommage</h1>';
        return;
    }

    // Fetch carte de l'api
    fetch(`${apiUrl}?id=${cardId}`)
        .then(response => response.json())
        .then(data => {
            const card = data.data[0];  // 
            displayCardDetails(card);  //renvoye a la fonction Displaycard details
            setBackgroundColor(card);  // changer le background par rapport au type de carte
        })
        .catch(error => {
            console.error('Rip:', error);
            document.body.innerHTML = '<h1>CHEF SA MARCHE PAS.</h1>';
        });

    // fonction details de carte
    function displayCardDetails(card) {
        document.getElementById('card-name').textContent = card.name || 'Pas de nom déso';
        
        const cardImage = card.card_images && card.card_images.length > 0 ? card.card_images[0].image_url : '';
        if (cardImage) {
            document.getElementById('card-image').src = cardImage;
            document.getElementById('card-image').alt = card.name || 'Card Image';
        } else {
            document.getElementById('card-image').alt = 'aucune image RIP';
        }

        document.getElementById('card-type').textContent = `Type: ${card.type || 'N/A'}`;
        document.getElementById('card-atk').textContent = `ATK: ${card.atk !== undefined ? card.atk : 'N/A'}`;
        document.getElementById('card-def').textContent = `DEF: ${card.def !== undefined ? card.def : 'N/A'}`;
        document.getElementById('card-level').textContent = `Level: ${card.level !== undefined ? card.level : 'N/A'}`;
        document.getElementById('card-attribute').textContent = `Attribute: ${card.attribute || 'N/A'}`;
        document.getElementById('card-race').textContent = `Race: ${card.race || 'N/A'}`;
        document.getElementById('card-archetype').textContent = `Archetype: ${card.archetype || 'N/A'}`;
        document.getElementById('card-desc').textContent = `Description: ${card.desc || 'pas de description'}`;
    }

    // fonction couleur du background
    function setBackgroundColor(card) {
        const cardType = card.type ? card.type.toLowerCase() : '';
        const body = document.body;

        // couleur du background par type de carte
        const typeColors = {
            "monster": "#F9F871",   
            "trap": "#5f03a7",      
            "fusion": "#5f03a7",    
            "pendulum": "#FFB347",  
            "xyz": "#000000",       
            "link": "#0600d6",      
            "synchro": "#ffffff",   
            "spell" : "#065a98",
            "ritual" : "#1fdfda",
        };

        let backgroundColor = '#FFFFFF';  // le background par défaut

        // check le type de la carte en commencant par les cartes speciaux car toutes ses cartes sont considérer comme des monstres donc le type monster est a la fin
        const cardTypeColors = {
            synchro: typeColors.synchro,
            xyz: typeColors.xyz,
            ritual: typeColors.ritual,
            link: typeColors.link,
            fusion: typeColors.fusion,
            pendulum: typeColors.pendulum,
            trap: typeColors.trap,
            spell: typeColors.spell,
            monster: typeColors.monster
        };
        
        for (const type in cardTypeColors) {
            if (cardType.includes(type)) {
                backgroundColor = cardTypeColors[type];
                break;
            }
        }
        // couleur background
        body.style.backgroundColor = backgroundColor;
    }
});
