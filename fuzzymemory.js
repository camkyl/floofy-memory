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

generateMemoryCard();

// function and event to flip cards
const cards = document.querySelectorAll('.memory-board-card');

function flipCard() {
    this.classList.toggle('flip');
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

