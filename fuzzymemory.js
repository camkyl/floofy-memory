'use strict';

const memoryCards = [
    {image: "images/cool.png", name: "cool"},
    {image: "images/crazy-face.png", name: "crazy"},
    {image: "images/exploding-head.png", name: "explode"},
    {image: "images/face-vomiting.png", name: "vomit"},
    {image: "images/partying-face.png", name: "party"},
    {image: "images/pig-nose.png", name: "pig"},
    {image: "images/poop.png", name: "poop"},
    {image: "images/rolling-eyes.png", name: "rolling"}
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
const createMemoryCard = (name, image) => {
    return `<div class="memory-board-card" data-title="${name}">
        <img class="front-of-card" src="${image}" alt="${name}">
        <img class="back-of-card" src="images/palmtree.png">    
        </div>`;
};

// duplicating cards
const duplicateCards = [...memoryCards, ...memoryCards];

// Render the image element to the DOM
const generateMemoryCard = () => {
    duplicateCards.forEach(card => {
        const element = createMemoryCard(card.image, card.name);
        memoryBoard.appendChild(stringToHTML(element));
    })
}

//Print memory cards to window
generateMemoryCard();

// function and event to flip cards
const cards = document.querySelectorAll('.memory-board-card');

function flipCard() {
    this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));