# Floofy memory :dog:

<img src="https://media.giphy.com/media/7K3p2z8Hh9QOI/giphy.gif" width="100%">

My first school assignment in front-end. 

## Languages used:
* HTML
* CSS
* JavaScript 

## How to

Click on [this link](https://floofy-memory.netlify.com/) to enter the game board. The rules are simple: click on a card to view its image. Then click on a second card and to find a matching image. Once all pairs are found the game is finished :star2:

## Testers

:video_game: Oskar Joss

:video_game: Betsy Alva Soplin

## Code review

* Line 36, 40: The duplicateCards variable could be named duplicatedCards, now it sounds like a function to duplicate cards.
* Line 103 and other places: Using function before it is created.
* Line 135: The firstCard and lastCard variables where initialised as undefined, and here they are reset to null.
* Line 159: In reinstateCards function you add an event listener without removing the old one, I can’t find a bug here but it could lead to problems if you keep adding multiple event listeners.
* Good job, nice consistent syntax and fun game!

## Authors

Camilla Kylmänen Sjörén
