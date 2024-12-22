let flippedCards = [];
let cardValues = ['logo', 'album1', 'album2', 'album3', 'album4', 'album1', 'album2', 'album3', 'album4', 'logo'];  // I valori delle carte
let gameBoard = document.querySelector('.game-board');

// Mischia le carte
function shuffleCards() {
    cardValues = cardValues.sort(() => Math.random() - 0.5);
}

// Crea le carte dinamicamente
function createCards() {
    shuffleCards();
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.card = value;  // Aggiungi il valore come data attributo
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Funzione per girare la carta
function flipCard(event) {
    const clickedCard = event.target;

    // Evita di girare una carta che è già girata o se ci sono già due carte girate
    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped')) return;

    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    // Se sono state girate due carte
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Controlla se le due carte girate sono uguali
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        flippedCards = [];  // Ripristina il vettore vuoto
    } else {
        // Se non corrispondono, girale di nuovo dopo un breve ritardo
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Inizializza il gioco
function startGame() {
    gameBoard.innerHTML = '';  // Resetta la griglia
    createCards();
}