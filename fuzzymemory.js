'use strict';

const memoryCards = [
    {image: "./images/cool.png", id: "cool"},
    {image: "./images/crazy-face.png", id: "crazy"},
    {image: "./images/exploding-head.png", id: "explode"},
    {image: "./images/face-vomiting.png", id: "vomit"},
    {image: "./images/partying-face.png", id: "party"},
    {image: "./images/pig-nose.png", id: "pig"},
    {image: "./images/poop.png", id: "poop"},
    {image: "./images/rolling-eyes.png", id: "rolling"}
];

// selecting the section element with class "memory-board"
const memoryBoard = document.querySelector('.memory-board');

// function helping to prevent XSS injections
// creates an HTML element from string
const stringToHTML = str => {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
  };

// function creating memory card template
// back-of-card is the side that is shown when the game starts
// front-of-card is the side which the user is going to match
const createMemoryCard = (image, id) => {
    return `<div class="memory-board-card" data-icon="${id}">
        <img class="front-of-card" src="${image}">
        <img class="back-of-card" src="images/palmtree.png">    
        </div>`;
};

// duplicating array with cards
const duplicateCards = [...memoryCards, ...memoryCards];

// function rendering the image elements to the DOM and append them to the memory board
const generateMemoryCard = () => {
    duplicateCards.forEach(card => {
        const image = createMemoryCard(card.image, card.id);
        memoryBoard.appendChild(stringToHTML(image));
    })
};

// printing cards to memory board when user loads the page
generateMemoryCard();

// variable selecting all cards
const cards = document.querySelectorAll('.memory-board-card');

// function shuffling cards by randomizing their position
const shuffle = () => {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    })
};

// calls the shuffle function every time the page is reloaded
shuffle();

let hasFlippedCard = false;
let firstCard;
let secondCard;
// avoid two sets of cards being turned at the same time
let lockCards = false; 

// function flipping card
// using a regular function here because I want .this to represent the card
function flipCard() {
    // return from function if lockCards is true so the rest of the function won't get executed
    if(lockCards) {
        return; 
    } 

    // avoid double click on a single card to be considered a match
    if(this === firstCard) {
        return; 
    }

    this.classList.add('flip');

    if(!hasFlippedCard) {
        // first click/flip
        hasFlippedCard = true;
        firstCard = this; // if the user has flipped one card, the flipped card becomes firstCard
        return; 
    } else {
        //second click/flip
        secondCard = this;
        hasFlippedCard = false;
    }

    // when two cards are clicked/flipped, check if they are matching
    checkIfCardsMatch();
}

// function checking if the two clicked cards are matching by comparing their dataset name
const checkIfCardsMatch = () => {
    if(firstCard.dataset.icon === secondCard.dataset.icon) {
        //cards are matching, remove eventListener ('click', flipCard) so the user can't click the card again
        disableCards(); 
        return;
    } else {
        //cards are not matching, removing flip class so the back of the card is showing again
        unflipCards(); 
    }
};

// function removing eventListener to prevent the cards from being flipped again
const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
};

// function removing flip class so the back of the card is showing again
const unflipCards = () => {
    lockCards = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 800);
};

// for the lockCard function to work, first and second card needs to be set to null
const resetBoard = () => {
    hasFlippedCard = false;
    lockCards = false;
    firstCard = null;
    secondCard = null;
};

// looping through each card and applying the flipCard function
cards.forEach(card => {
    card.addEventListener('click', flipCard);
    }
);

// reset game button
const resetGameButton = document.querySelector('.reset-game');

// function reseting the game after the user has finished it
const resetGame = () => {
    cards.forEach(card => {
        card.classList.remove('flip');
    })

    reinstateCards();
};

// function bringing cards back to original position, otherwise cards stays locked from the previous game
const reinstateCards = () => {
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    })
}

resetGameButton.addEventListener('click', resetGame);