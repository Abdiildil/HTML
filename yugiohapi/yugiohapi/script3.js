const cardContainer = document.getElementById('card-container');
const refreshButton = document.getElementById('refresh-button');
const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'; //lien de l'api
const imageUrl = 'https://images.ygoprodeck.com/images/cards_small/'; // URL pour les petites images

function getRandomCards(cards, count) {
    // algo de Fisher-Yates pour le refresh
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards.slice(0, count);
}




function displayCards(cards) {
    cardContainer.innerHTML = ''; 
    cards.forEach(card => {
        const smallImageUrl = `${imageUrl}${card.id}.jpg`; // utilise l'id de la carte pour les petites images
        const fullImageUrl = card.card_images[0].image_url; // image en full size

        // montrer les données d'une carte en html
        const cardHTML = `
            <div class="card"> 
                <img src="${smallImageUrl}" alt="${card.name}" data-fullsize="${fullImageUrl}" data-smallsize="${smallImageUrl}" class="card-image">
                <h2>${card.name}</h2>
                ${card.type ? `<p>Type: ${card.type}</p>` : ''}
                ${card.atk ? `<p>ATK: ${card.atk}</p>` : ''}
                ${card.def ? `<p>DEF: ${card.def}</p>` : ''}
                ${card.level ? `<p>Level: ${card.level}</p>` : ''}
                ${card.attribute ? `<p>Attribute: ${card.attribute}</p>` : ''}
                ${card.race ? `<p>Race: ${card.race}</p>` : ''}
                ${card.archetype ? `<p>Archetype: ${card.archetype}</p>` : ''}
                <button class="view-details" data-id="${card.id}">Voir Détails</button>
            </div>
        `; // 
        cardContainer.innerHTML += cardHTML;
    });

    // event pour voir les détails d'une carte
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function () {
            const cardId = this.getAttribute('data-id');
            window.location.href = `single-card.html?id=${cardId}`;  // prend l'ID de la carte et envoie vers un autre URL
        });
    });
        // event pour toutes les cartes
        document.querySelectorAll('.card-image').forEach(image => {
            image.addEventListener('click', function () {  // quand on click sur l'image d'une carte
                const currentSrc = this.src;
                const fullSizeUrl = this.getAttribute('data-fullsize');
                const smallSizeUrl = this.getAttribute('data-smallsize');
    
                // event image
                if (currentSrc === smallSizeUrl) {
                    this.src = fullSizeUrl; // full
                } else {
                    this.src = smallSizeUrl; // petit
                }
            });
        });
}


async function fetchCards() {
    const url = apiUrl; 
    fetch(url) //fetch l'api
        .then(response => response.json())
        .then(data => {
            const cards = data.data;
            const randomCards = getRandomCards(cards, 50); // montrer 50 carte aléatoire
            displayCards(randomCards);
        })
        .catch(error => {
            console.error('sa marche pas chef', error);
        });
}

// event pour refresh au click
refreshButton.addEventListener('click', fetchCards);



fetchCards();

const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

// activer le dark mode
toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleActiveTab(toggleDarkModeButton);
});

// bouton refresh
refreshButton.addEventListener('click', () => {
    fetchCards();
    toggleActiveTab(refreshButton);
});


