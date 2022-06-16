'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player1 = document.querySelector('#current--0');
const player2 = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
const MAX_SCORE = 100;

init();

// rolling dice func...--
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `sources/img/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      current(currentScore);
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= MAX_SCORE) {
      playing = false;
      diceEl.classList.add('hidden');

      scores[activePlayer] >= MAX_SCORE &&
        (document.querySelector(
          `#score--${activePlayer}`
        ).textContent = `Winner`);

      document.querySelector(`#score--${activePlayer}`).textContent = `Winner`;
      document.querySelector(`#score--${activePlayer}`).style.color = `#fff`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      current(scores[activePlayer]);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

function current(score) {
  document.querySelector(`#current--${activePlayer}`).textContent = score;
  return score;
}

function switchPlayer() {
  //show that player has been switched visually
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  player1.textContent = 0;
  player2.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}