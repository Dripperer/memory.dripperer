// Inizializza le variabili del gioco
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let totalPairs = 8; // Totale delle coppie di carte

const gameBoard = document.querySelector('.game-board');
const startButton = document.getElementById('start-game');
const audioElement = document.getElementById('background-music');

// Funzione per mescolare le carte
function shuffleCards() {
    const cardData = ['logo', 'logo', 'album1', 'album1', 'album2', 'album2', 'album3', 'album3', 'album4', 'album4'];
    cards = cardData.sort(() => Math.random() - 0.5);  // Mescola l'array
}

// Funzione per creare la griglia di gioco
function createGameBoard() {
    gameBoard.innerHTML = ''; // Pulisce la griglia
    shuffleCards();

    cards.forEach(cardType => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-card', cardType);
        card.addEventListener('click', flipCard);  // Aggiungi l'evento di clic
        gameBoard.appendChild(card);
    });
}

// Funzione per girare le carte
function flipCard(event) {
    const clickedCard = event.target;

    // Se la carta è già stata girata o è già stata abbinata, non fare nulla
    if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) return;

    // Mostra la carta (aggiungi la classe 'flipped')
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    // Se sono state girate due carte
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Funzione per verificare se le carte sono abbinate
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-card') === secondCard.getAttribute('data-card')) {
        matchedCards++;
        flippedCards = [];
        // Se tutte le coppie sono abbinate, termina il gioco
        if (matchedCards === totalPairs / 2) {
            setTimeout(() => alert('Hai vinto! Congratulazioni! 🎉'), 500);
        }
    } else {
        // Se non sono abbinate, girale di nuovo
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Funzione per avviare o riavviare il gioco
function startGame() {
    matchedCards = 0;
    createGameBoard();
}

// Inizializza il gioco all'avvio
startButton.addEventListener('click', startGame);
startGame(); // Avvia il gioco automaticamente al caricamento
