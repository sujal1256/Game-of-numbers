'use strict';
let gameActive = true;

// Selecting the scores
let score1 = document.getElementById('score--0');
let score2 = document.getElementById('score--1');

// Selecting the currrent scores
let currentScore1 = document.getElementById('current--0');
let currentScore2 = document.getElementById('current--1');

score1.textContent = 0;
score2.textContent = 0;

// Selecting the dice (image)
let dice = document.querySelector('.dice');
dice.classList.add('hidden');
let activePlayer = 0;
let currentScore = 0;

// getting the three buttons.
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');
let btnRoll = document.querySelector('.btn--roll');

// Function for shifting the player
function shiftplayer() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
}
btnRoll.addEventListener('click', () => {
  if (gameActive) {
    dice.classList.remove('hidden');
    let num = Math.floor(Math.random() * 6 + 1);
    console.log(num);
    dice.src = `dice-${num}.png`;
    if (num !== 1) {
      // add dice score to the current score of the active element
      // we need to get the active element
      currentScore += num;

      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // currentScore is zero and current score of active element is zero
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      // remove css class from the active player and shift the player

      shiftplayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  // add current score to the actual score
  let score = document.getElementById(`score--${activePlayer}`).textContent;
  score = Number(score) + currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = score;

  // need to make current score =0 and display for the current active element too
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // remove css class from the active player and shift the player
  shiftplayer();

  if (score >= 100) {
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    gameActive = 0;
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', () => {
  document.getElementById('score--0').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document
    .getElementsByClassName('player--0')[0]
    .classList.remove('player--winner');
  document
    .getElementsByClassName('player--1')[0]
    .classList.remove('player--winner');

  document
    .getElementsByClassName('player--0')[0]
    .classList.add('player--active');
  document
    .getElementsByClassName('player--1')[0]
    .classList.remove('player--active');
  gameActive = 1;

  activePlayer = 0;
});
