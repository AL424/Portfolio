import { Controler } from '../controler/controler';
import { View } from '../view/view';

export class App {
  view: View;
  controler: Controler;

  constructor() {
    this.view = new View();
    this.controler = new Controler();
  }

  public start(): void {
    this.view.levelList.draw(this.controler.levelsStatus);
    this.addLevelsListener();
    this.openLevel();

    const input = <HTMLInputElement>document.getElementById('input');
    const btn = document.getElementById('btn');

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.levelCompleted(this.controler.isLevelCompleted(input.value));
        btn?.classList.add('btn-animation');
      }
    });

    btn?.addEventListener('click', () => {
      btn.classList.add('btn-animation');
      this.levelCompleted(this.controler.isLevelCompleted(input.value));
    });
    btn?.addEventListener('animationend', () => {
      btn.classList.remove('btn-animation');
    });

    const reset = document.querySelector('.reset-btn');
    reset?.addEventListener('click', () => {
      this.resetProgress();
    });

    const helpBtn = document.getElementById('help-btn');
    helpBtn?.addEventListener('click', () => {
      this.controler.getHelp();
    });

    const levelIcon = document.querySelector('.level-icon');
    levelIcon?.addEventListener('click', () => {
      const levelWrap = document.querySelector('.levels-wrap');
      levelWrap?.classList.toggle('open');
      levelIcon?.classList.toggle('open');
    });
  }

  private resetProgress(): void {
    this.controler.resetProgress();
    this.view.levelList.draw(this.controler.levelsStatus);
    this.addLevelsListener();
    this.openLevel();
  }

  private addLevelsListener(): void {
    const levels = document.querySelectorAll('.level');
    levels.forEach((item) => {
      item.addEventListener('click', (event) => {
        const level = <HTMLElement>event.target;
        this.controler.curentLevel = Number(level.getAttribute('data-level-number'));
        this.openLevel();
      });
    });
  }

  private openLevel(): void {
    this.view.level.draw(this.controler.getLevel());
    const levelList = document.querySelectorAll('.level');
    levelList.forEach((item, index) => {
      item.classList.remove('level_active');
      if (this.controler.curentLevel === index) item.classList.add('level_active');
    });
    const levelWrap = document.querySelector('.levels-wrap');
    levelWrap?.classList.remove('open');
    const levelIcon = document.querySelector('.level-icon');
    levelIcon?.classList.remove('open');
  }

  private levelCompleted(isLevelCompleted: boolean): void {
    if (isLevelCompleted) {
      this.controler.levelsStatus[this.controler.curentLevel].completed = true;
      this.view.correctSelector();
      if (this.controler.isGameOver()) {
        setTimeout(() => {
          this.view.gameOver();
        }, 1000);
      } else {
        this.controler.getCurentLevel();
        setTimeout(() => {
          this.openLevel();
        }, 1000);
      }
    } else {
      this.view.shakeEditor();
    }
  }
}
