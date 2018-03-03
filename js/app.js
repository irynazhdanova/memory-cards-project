// array to store types of cards icons
const cardImage = [
  'fa-diamond',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-anchor',
  'fa-bolt',
  'fa-bolt',
  'fa-cube',
  'fa-cube',
  'fa-leaf',
  'fa-leaf',
  'fa-bicycle',
  'fa-bicycle',
  'fa-bomb',
  'fa-bomb'
];

// making array from all selected cards
const cards = Array.from(document.querySelectorAll('.card'));

// array to store closed cards
let openCards = [];

// initial variable to store moves
let moves = 0;

let count = document.querySelector('.moves');
const starCount = Array.from(document.querySelectorAll('.fa-star'));

// counts number of cards matched to determine win condition
let matchList = 0;

// variables for timer
const timer = document.querySelector('.game-timer');
let second = 00;
let min = 0;
let zeroPlaceholder = 0;
let timeCounter;

// to avoid clicking the same card two times
let closed = true;

const pauseTimer = document.querySelector('.fa-pause');
const playTimer = document.querySelector('.fa-play');
const startGame = document.querySelector('.start');
const finishRating = document.querySelector('.rating');
const finishTime = document.querySelector('.end-time');
const finishMoves = document.querySelector('.total-moves');
const starRating = document.querySelector('.stars');
const modal = document.querySelector('.modal');
const replayButton = document.querySelector('.replay');
const replayGame = document.querySelector('.restart');

function displayCards() {
  shuffle(cardImage);
  for (let i = 0; i < cards.length; i++) {
    cards[i].innerHTML = `<i class="fa ${cardImage[i]}"></i>`;
    cards[i].classList.remove('open', 'match', 'unmatched', 'off');
  }
  moves = 0;
  matchList = 0;
  count.innerHTML = 0;
  for (let i = 0; i < starCount.length; i++) {
    starCount[i].style.display = 'block';
  }
  clearInterval(timeCounter);
  second = 00;
  min = 0;
  countUp();
  setTimeout(function() {
    pauseTimer.style.display = 'inline-block';
  }, 1000);
  startGame.style.display = 'none';
}

// function timing() {
//   if (second < 10) {
//     setInterval(function() {
//       second++;
//       return (timer.textContent = `Your time is: ${minute}:0${second}. Hurry up!`);
//     }, 1000);
//   } else if (second > 10 && second < 60) {
//     setInterval(function() {
//       second++;
//       return (timer.textContent = `Your time is: ${minute}:${second}. Hurry up!`);
//     }, 1000);
//   } else {
//     second = 0;
//   }
//   setInterval(function() {
//     minute++;
//     return minute;
//   }, 60000);
// }

function countUp() {
  timeCounter = setInterval(function() {
    second++;
    if (second == 59) {
      second = 00;
      min++;
    }
    if (second > 9) {
      zeroPlaceholder = '';
    } else if (second < 9) {
      zeroPlaceholder = 0;
    }
    timer.innerText = `Your time is: ${min}:${zeroPlaceholder}${second}`;
  }, 1000);
}

function openCard(e) {
  if (closed) {
    e.target.classList.toggle('open');
    e.target.classList.toggle('off');
    openCards.push(e.target.firstElementChild);
    let cardsInside = openCards.length;
    if (cardsInside === 2) {
      countMove();
      if (openCards[0].className === openCards[1].className) {
        matchList++;
        for (let i = 0; i < 2; i++) {
          openCards[i].parentElement.classList.add('match');
        }
        openCards = [];
        console.log(matchList);
      } else {
        failMatch();
      }
    }
  }
  winGame();
  console.log(openCards);
}

function winGame() {
  if (matchList === 8) {
    console.log('you won!');
  }
}

function failMatch() {
  closed = false;
  for (let i = 0; i < 2; i++) {
    openCards[i].parentElement.classList.add('unmatched');
  }
  setTimeout(function() {
    closed = true;
    for (let i = 0; i < openCards.length; i++) {
      openCards[i].parentElement.classList.remove('open', 'unmatched', 'off');
    }
    openCards = [];
  }, 1000);
}

function countMove() {
  moves++;
  count.innerHTML = moves;
  if (moves < 4 && moves > 2) {
    starCount[1].style.display = 'none';
  } else if (moves > 4) {
    starCount[2].style.display = 'none';
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardImage) {
  let currentIndex = cardImage.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cardImage[currentIndex];
    cardImage[currentIndex] = cardImage[randomIndex];
    cardImage[randomIndex] = temporaryValue;
  }

  return cardImage;
}

startGame.addEventListener('click', displayCards);
// replayGame.addEventListener('click', displayCards);
pauseTimer.addEventListener('click', function() {
  closed = false;
  cards.forEach(function(card) {
    card.classList.add('off');
  });
  pauseTimer.style.display = 'none';
  playTimer.style.display = 'inline-block';
  clearInterval(timeCounter);
});
playTimer.addEventListener('click', function() {
  closed = true;
  cards.forEach(function(card) {
    card.classList.remove('off');
  });
  countUp();
  pauseTimer.style.display = 'inline-block';
  playTimer.style.display = 'none';
});
cards.forEach(function(card) {
  card.addEventListener('click', openCard);
});
