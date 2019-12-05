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

// Helper function to prevent XSS injections
// Creates an HTML element from string
const stringToHTML = str => {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
  };

// create memory card template
// back-of-card is the side that is shown when the game starts
// front-of-card is the side which the user is going to match
const createMemoryCard = (image, id) => {
    return `<div class="memory-board-card" data-icon="${id}">
        <img class="front-of-card" src="${image}">
        <img class="back-of-card" src="images/palmtree.png">    
        </div>`;
};

// duplicating cards
const duplicateCards = [...memoryCards, ...memoryCards];

// Render the image element to the DOM
const generateMemoryCard = () => {
    duplicateCards.forEach(card => {
        const element = createMemoryCard(card.image, card.id);
        memoryBoard.appendChild(stringToHTML(element));
    })
};

// printing cards to memory board
generateMemoryCard();

// variable selecting all cards
const cards = document.querySelectorAll('.memory-board-card');

// function to match cards
let hasFlippedCard = false;
let lockCards = false; // avoid two sets of cards being turned at the same time
let firstCard;
let secondCard;

function flipCard() {
    if(lockCards) {
        return; // return from function if lockCards is true so the rest of the function won't get executed
    } 

    this.classList.add('flip');

    if(!hasFlippedCard) {
        // first click/flip
        hasFlippedCard = true;
        firstCard = this; // if the user has flipped one card, the flipped card becomes firstCard
        console.log(hasFlippedCard, firstCard); // true, class="memory-board-card flip"
        return; 
    } else {
        //second click/flip
        secondCard = this;
        hasFlippedCard = false;
        console.log(hasFlippedCard, secondCard); // false, class="memory-board-card flip"
    }
    // when two cards are clicked/flipped, check if they are matching
    checkForMatchingCard();
}

// checking if the two clicked cards are matching by comparing their dataset name
function checkForMatchingCard() {
    if(firstCard.dataset.icon === secondCard.dataset.icon) {
        console.log(firstCard.dataset.icon, secondCard.dataset.icon);
        disableCards(); //cards are matching, remove eventListener ('click', flipCard) so the user can't click the card again
        return;
    } else {
        unflipCards(); //cards are not matching, removing flip class so the back of the card is showing again
    }
}

// removing eventListener so the user can't click the card again  
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

// removing flip class so the back of the card is showing again
function unflipCards() {
    lockCards = true;

    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockCards = false;
    }, 800);
}

cards.forEach(card => card.addEventListener('click', flipCard));

// function to shuffle cards
// Immediately Invoked Function Expression:
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    })
})();