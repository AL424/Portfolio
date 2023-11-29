import { levelsArr } from '../../levels';
import { Level, LevelsStatus, addSymbol } from '../../types';

export class Controler {
  public curentLevel = localStorage.getItem('active-level') ? Number(localStorage.getItem('active-level')) : 0;
  public levelsStatus: LevelsStatus[] = [];

  constructor() {
    this.getLevelStatus();
    window.addEventListener('beforeunload', () => this.saveData());
  }

  public getCurentLevel(): void {
    if (!this.isGameOver()) {
      const levels = document.querySelectorAll('.level');
      while (levels[this.curentLevel].classList.contains('level_completed')) {
        if (this.curentLevel === this.levelsStatus.length - 1) {
          this.curentLevel = 0;
        } else this.curentLevel += 1;
      }
    }
  }

  public getHelp(): void {
    const helpBtn = document.getElementById('help-btn');
    const input = document.getElementById('input');
    if (input instanceof HTMLInputElement && helpBtn) {
      input.value = '';
      input.setAttribute('disabled', 'disabled');
      helpBtn.setAttribute('disabled', 'disabled');

      const result = this.getLevel().target;

      const addInputValue: addSymbol = (i) => {
        if (i < result.length) {
          input.value += result[i];
          setTimeout(addInputValue, 200, i + 1);
        } else {
          input.removeAttribute('disabled');
          helpBtn.removeAttribute('disabled');
          input.focus();
        }
      };

      addInputValue(0);
    }

    const level = document.querySelector('.level_active');
    level?.classList.add('help_active');

    this.levelsStatus[this.curentLevel].help = true;
  }

  private getLevelStatus(): void {
    const str = localStorage.getItem('levels-status');
    if (str) this.levelsStatus = JSON.parse(str);
    if (this.levelsStatus.length !== levelsArr.length) {
      this.levelsStatus = levelsArr.map(() => {
        const level: LevelsStatus = {
          completed: false,
          help: false,
        };
        return level;
      });
    }
  }

  public getLevel(): Level {
    return levelsArr[this.curentLevel];
  }

  public isLevelCompleted(selector: string): boolean {
    try {
      const table = document.getElementById('table');
      if (table) {
        const userElemets = Array.from(table.querySelectorAll(selector));
        const targets = table.querySelectorAll('.target');
        const isAllTargets = userElemets.every((item) => item.classList.contains('target'));
        if (isAllTargets && targets.length === userElemets.length && targets.length !== 0) return true;
        return false;
      }
      return false;
    } catch {
      return false;
    }
  }

  public isGameOver(): boolean {
    const levels = Array.from(document.querySelectorAll('.level'));
    const isGameOver = levels.every((item) => item.classList.contains('level_completed'));
    return isGameOver;
  }

  private saveData(): void {
    localStorage.setItem('active-level', `${this.curentLevel}`);
    localStorage.setItem('levels-status', JSON.stringify(this.levelsStatus));
  }

  public resetProgress(): void {
    this.curentLevel = 0;
    localStorage.removeItem('levels-status');
    this.levelsStatus = [];
    this.getLevelStatus();
  }
}
