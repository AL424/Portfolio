// import css scss 
import './normalize.css';
import './index.scss';

// import components
import header from './header';
import settings from './settings';
import gamewrap from './game-wrap';
import scores from './scores';
import modal from './modal';


// import class GameZone
import GameZone from './GameZone/GameZone';

import newGame from './GameZone/newGame';

// add base layout on page
const flexWrap = document.createElement('main');
flexWrap.className = 'flex-wrap';
flexWrap.append(settings, gamewrap, scores)
document.body.append(header, flexWrap, modal);

// create gameZone and add it on page
let game;

const newGameBtn = document.querySelectorAll('.btn-new-game');
newGameBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    game = newGame(settingsObj);
  });
});

// settings
const settingsObj = {
  size: 10,
  bomb: 10,
}

const inputBombs = document.getElementById('input-bombs');
const outputBombs = document.getElementById('output-bombs');

inputBombs.addEventListener('input', () => {
  settingsObj.bomb = Number(inputBombs.value);
  outputBombs.textContent = inputBombs.value;
});

const inputSize = document.querySelectorAll('input[name="game-size"]')
inputSize.forEach(item => {
  item.addEventListener('change', () => settingsObj.size = Number(item.value));
})

// scores
if (localStorage.scoresPastGames) {
  const scoresList = document.querySelector('.scores__list');

  const arrScores = JSON.parse(localStorage.scoresPastGames);
  arrScores.forEach(text => {
    const li = document.createElement('li');
    li.className = 'scores__item'
    li.textContent = text;
    scoresList.append(li);
  });
}

if (localStorage.savedGameObj === 'No saved game' || !localStorage.savedGameObj || !localStorage.savedGameArr) {
  game = new GameZone(10, 10, 0, 0);
  console.log('No saved game');
} else {
  const savedGame = JSON.parse(localStorage.savedGameObj);
  const savedGameArr = JSON.parse(localStorage.savedGameArr)
  game = new GameZone(savedGame.size, savedGame.numBombs, savedGame, savedGameArr);
}

// сохранение scores and game перед закрытием
window.addEventListener('beforeunload', () => {
  const scoresItems = document.querySelectorAll('.scores__item');
  const arrScores = [];
  scoresItems.forEach(item => {
    arrScores.push(item.textContent);
  })
  const str = JSON.stringify(arrScores);
  localStorage.scoresPastGames = str;

  const gameWrap = document.getElementById('game-wrap');

  if (gameWrap.classList.contains('not-click') || game.firstClick) localStorage.savedGameObj = 'No saved game';
  else {
    // const savedGameArr = [];
    // savedGameArr.push(game);
    // const arrCells = Array.from(document.querySelectorAll('.cell'));
    // savedGameArr.push(arrCells);
    localStorage.savedGameObj = JSON.stringify(game);
    
    const arrInfoOnCells = [];
    document.querySelectorAll('.cell').forEach(cell => {
      const infoOnCell = {
        textContent: cell.textContent,
        datasetOpen: cell.dataset.open ? cell.dataset.open : null,
        datasetValue: cell.dataset.value,
        style: cell.getAttribute('style'),
      }
      arrInfoOnCells.push(infoOnCell);
    });

    localStorage.savedGameArr = JSON.stringify(arrInfoOnCells);  
  }

})

// theme 
const inputTheme = document.querySelectorAll('input[name="theme"]')
inputTheme.forEach(item => {
  item.addEventListener('change', () => {
    document.documentElement.dataset.theme = item.value;
  });
})
