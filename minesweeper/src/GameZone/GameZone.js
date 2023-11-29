import createMatrix from "./createMatrix";
import createBombsArr from "./createBombsArr";
import addBombsInMatrix from "./addBombsInMatrix";

export default class GameZone {
  constructor(size, numBombs, obj, arrSave) {
    this.matrix = createMatrix(size);
    this.size = size;
    this.numBombs = numBombs;

    this.isMuted = Boolean(Number(document.querySelector('input[name="mute"]:checked').value));

    this.bomb = numBombs;
    this.flag = 0;
    this.firstClick = true;
    this.click = 0;
    this.seconds = 0;

    this.colors = [
      '#31D4D2',
      '#4296EB',
      '#3231D4',
      '#9D38F5',
      '#D228DE',
      '#FF3582',
      '#F7252F',
      '#CA1D0C',
    ]

    if (obj) {
      const { bomb, flag, click, seconds } = obj;
      this.bomb = bomb;
      this.flag = flag;
      this.click = click;
      this.seconds = seconds;
      this.firstClick = false;
      this.startStopwatch();
    }

    this.addGameZoneOnHtml(arrSave);

    this.setIsMuted();
  }

  setIsMuted() {
    const inputMute = document.querySelectorAll('input[name="mute"]')
    inputMute.forEach(item => {
      item.addEventListener('change', () => {
        this.isMuted = Boolean(Number(item.value));
      });
    })
  }

  addGameZoneOnHtml(arrSave) {
    this.counterWrap = document.createElement('div');
    this.counterWrap.className = 'counter-wrap';

    this.stepsIcon = document.createElement('span');
    this.stepsIcon.textContent = '👆';
    this.steps = document.createElement('span');
    this.steps.textContent = `${this.click.toString().padStart(2, '0')}`;
    this.stopwatchIcon = document.createElement('span');
    this.stopwatchIcon.textContent = '⏱: ';
    this.stopwatch = document.createElement('span');
    
    const min = (Math.floor(this.seconds / 60)).toString().padStart(2, '0');
    const sec = (this.seconds % 60).toString().padStart(2, '0');

    this.stopwatch.textContent = `${min}:${sec}`;

    this.counterBombsIcon = document.createElement('span');
    this.counterBombsIcon.textContent = `💣: `;
    this.counterBombs = document.createElement('span');
    this.counterBombs.textContent = `${this.bomb}`;
    this.counterFlagsIcon = document.createElement('span');
    this.counterFlagsIcon.textContent = `🚩: `;
    this.counterFlags = document.createElement('span');
    this.counterFlags.textContent = `${this.flag}`;

    this.counterWrap.append(this.stepsIcon, this.steps, this.stopwatchIcon, 
      this.stopwatch, this.counterBombsIcon, this.counterBombs, this.counterFlagsIcon, this.counterFlags);

    // добавление поля
    this.cells = document.createElement('div');
    this.cells.classList.add('cells');
    if (Number(this.size) === 10) this.cells.classList.add('cells_small');
    else if (Number(this.size) === 15) this.cells.classList.add('cells_medium');
    else this.cells.classList.add('cells_hard');

    for (let i = 0; i < this.matrix.length; i += 1) {
      for (let j = 0; j < this.matrix[i].length; j += 1) {
        const div = document.createElement('div');
        div.className = 'cell';
        div.id = `${i}/${j}`;
        div.dataset.i = i;
        div.dataset.j = j;

        const numberCell = i * Number(this.size) + j;

        if (arrSave) {
          const obj = arrSave[numberCell];
          div.dataset.value = obj.datasetValue;
          div.textContent = obj.textContent;
          if (obj.datasetOpen) {
            div.dataset.open = obj.datasetOpen;
            div.classList.add('cell_open');
          }
          if (obj.style) {
            div.setAttribute('style', obj.style);
          }
        }

        div.addEventListener('mouseup', (event) => {
          this.eventMouseOnCell(event);
        });
        div.addEventListener('contextmenu', e => e.preventDefault());

        this.cells.append(div);
      }
    }

    document.getElementById('game-wrap').append(this.counterWrap, this.cells);
  }

  addBombOnCells(numNotBomb) {
    this.bombArr = createBombsArr(Number(this.numBombs), Number(this.size*this.size), numNotBomb);
    addBombsInMatrix(this.matrix, this.bombArr);

    for (let i = 0; i < this.matrix.length; i += 1) {
      for (let j = 0; j < this.matrix[i].length; j += 1) {
        const id = `${i}/${j}`;

        const cell = document.getElementById(id);

        cell.dataset.value = this.matrix[i][j];
      }
    }
  }

  // метод объединяющий все клики
  eventMouseOnCell(event) {
    
    const cell = event.target;

    if (event.button === 0) {
      if (cell.textContent === '🚩') return;

      if (this.firstClick) {
        const numNotBomb = Number(cell.dataset.i) * Number(this.size) + Number(cell.dataset.j);
        this.addBombOnCells(numNotBomb);
        this.startStopwatch();
        this.firstClick = false;
      }

      this.openCell(event);
    }
    
    if (event.button === 2 && !this.firstClick) {
      this.addFlag(event);
    }

  }
  
  openCell(event) {
    const element = event.target;

    this.click += 1;
    this.steps.textContent = `${this.click.toString().padStart(2, '0')}`;
    element.classList.add('cell_open');

    const arrBombCells = document.querySelectorAll('[data-value="bomb"]');

    if (element.dataset.value === 'bomb') {
      element.textContent = '💥';
      element.classList.add('cell_bomb');
      arrBombCells.forEach(item => {
        item.textContent = '💥';
        item.classList.add('cell_open');
      })
      this.gameOver('lose');
      return;
    } else if (element.dataset.value === '0') {
      this.playAudio('open');
      element.dataset.open = 'open';
      this.openEmptyCells(element);
    } else {
      this.playAudio('open');
      element.textContent = element.dataset.value;
      element.style.color = this.colors[Number(element.dataset.value) - 1];
      element.dataset.open = 'open';
    }

    const arrNotOpenCell = Array.from(document.querySelectorAll('.cell')).filter(item => {
      if (item.dataset.open === 'open') return false;
      return true;
    });

    const isAllCellsMine = arrNotOpenCell.every(item => {
      if (item.dataset.value === 'bomb') return true;
      return false;
    })

    if (isAllCellsMine) {
      arrNotOpenCell.forEach(item => {
        item.textContent = '💥';
        item.classList.add('cell_open');
      });
      this.gameOver('win');
    }
  }

  openEmptyCells(element) {
    if (!element) return;
    
    if (element.textContent === '🚩') {
      this.flag -= 1;
      this.bomb += 1;
      this.counterBombs.textContent = `${this.bomb}`;
      this.counterFlags.textContent = `${this.flag}`;
    }

    element.textContent = '';
    
    const i = Number(element.dataset.i);
    const j = Number(element.dataset.j);
  
    const arrNighbordCellId = [
      `${i - 1}/${j - 1}`,
      `${i - 1}/${  j  }`,
      `${i - 1}/${j + 1}`,
      `${  i  }/${j - 1}`,
      `${  i  }/${j + 1}`,
      `${i + 1}/${j - 1}`,
      `${i + 1}/${  j  }`,
      `${i + 1}/${j + 1}`,
    ]
  
    const arrNighbordCell = [];
  
    arrNighbordCellId.forEach(id => {
      const cell = document.getElementById(id);
      if(cell && !cell.classList.contains('cell_open')) arrNighbordCell.push(cell);
    })
  
    if (arrNighbordCell.length === 0) return;
  
    arrNighbordCell.forEach(cell => {
      if (cell.dataset.value === '0') {
        cell.dataset.open = 'open';
        cell.classList.add('cell_open');
        this.openEmptyCells(cell);
      } else {
        if (cell.textContent === '🚩') {
          this.flag -= 1;
          this.bomb += 1;
          this.counterBombs.textContent = `${this.bomb}`;
          this.counterFlags.textContent = `${this.flag}`;
        }
        cell.classList.add('cell_open');
        cell.textContent = cell.dataset.value;
        cell.style.color = this.colors[Number(cell.dataset.value) - 1];
        cell.dataset.open = 'open';
      }
    })
  }

  addFlag(event) {
    this.playAudio('flag');
    const element = event.target;

    if (element.classList.contains('cell_open')) return;

    if (element.textContent === '🚩') {
      element.textContent = '';
      this.flag -= 1;
      this.bomb += 1;
    } else {
      element.textContent = '🚩';
      this.flag += 1;
      this.bomb -= 1;
    }

    this.counterBombs.textContent = `${this.bomb}`;
    this.counterFlags.textContent = `${this.flag}`;
  }

  gameOver(status) {
    clearInterval(this.wath);

    const gameWrap = document.getElementById('game-wrap')
    gameWrap.classList.add('not-click')
  
    const modal = document.querySelector('.modal');
    const title = modal.querySelector('.modal__title');
    const text = modal.querySelector('.modal__text');

    this.playAudio(status);

    if (status === 'lose') {
      title.textContent = 'Game over.';
      text.textContent = ` Try again`
    } else if (status === 'win') {
      title.textContent = 'Hooray!';
      text.textContent = `You found all mines in ${this.stopwatch.textContent} and ${this.steps.textContent} moves!`
      this.addScores();
    }

    modal.classList.add('modal_visible');
  }

  addScores() {
    const scoresList = document.querySelector('.scores__list');
    
    while (scoresList.childElementCount > 9) {
      scoresList.removeChild(scoresList.firstChild);
    }

    const li = document.createElement('li');
    li.className = 'scores__item';
    li.textContent = `${this.size}X${this.size} 💣${this.numBombs} 👆${this.steps.textContent} ⏱${this.stopwatch.textContent}`;
    scoresList.append(li);
  }

  startStopwatch() {
    this.wath = setInterval(() => {
      this.seconds += 1;

      const min = (Math.floor(this.seconds / 60)).toString().padStart(2, '0');
      const sec = (this.seconds % 60).toString().padStart(2, '0');

      this.stopwatch.textContent = `${min}:${sec}`;
    }, 1000);
  }
  
  playAudio(status) {
    const audio = new Audio();
    audio.src = `./assets/${status}.mp3`;
    audio.muted = this.isMuted;
    audio.play();
  }

}