import { LevelListView } from './LevelListView';
import { LevelView } from './LevelView';

export class View {
  public level: LevelView;
  public levelList: LevelListView;

  constructor() {
    this.level = new LevelView();
    this.levelList = new LevelListView();
    this.hoverEffecct();
  }

  public shakeEditor(): void {
    const editor = document.querySelector('.editor-wrap');
    editor?.classList.add('shake');
    editor?.addEventListener('animationend', () => editor.classList.remove('shake'));
  }

  public correctSelector(): void {
    const targets = document.querySelectorAll('.target');
    targets.forEach((item) => {
      item.classList.remove('target');
      item.classList.add('selected');
    });
    const level = document.querySelector('.level_active');
    level?.classList.add('level_completed');
  }

  public gameOver(): void {
    const description = document.getElementById('description');
    if (description) {
      description.textContent = 'Congratulations! All levels completed!';
      description.classList.add('game-over');
    }

    const table = document.getElementById('table');
    if (table) table.innerHTML = '';

    const tableEdge = <HTMLElement>document.querySelector('.table-edge');
    tableEdge.removeAttribute('style');

    const input = <HTMLInputElement>document.getElementById('input');
    input.value = '';

    const code = document.getElementById('code');
    if (code) code.innerHTML = '';
  }

  private hoverEffecct(): void {
    const table = document.getElementById('table');
    const code = document.getElementById('code');

    if (code && table) {
      table.addEventListener('mouseover', (event) => {
        const target = <HTMLElement>event.target;
        if (target !== table) {
          const elNum = target.getAttribute('data-el-num');
          if (elNum) this.hoveredElement(elNum);
        }
      });

      table.addEventListener('mouseout', (event) => {
        const target = <HTMLElement>event.target;
        if (target !== table) target.classList.remove('hover');
        const hoveredStrings = code.querySelectorAll('.hover');
        hoveredStrings.forEach((item) => {
          item.classList.remove('hover');
        });
        const subjectTitle = <HTMLElement>document.querySelector('.subject-title');
        subjectTitle.removeAttribute('style');
      });

      code.addEventListener('mouseover', (event) => {
        const target = <HTMLElement>event.target;
        const elNum = target.getAttribute('data-el-num');
        if (elNum) this.hoveredElement(elNum);
      });

      code.addEventListener('mouseout', (event) => {
        const target = <HTMLElement>event.target;
        const elNum = target.getAttribute('data-el-num');
        if (elNum) {
          const element = table.querySelector(`[data-el-num="${elNum}"]`);
          element?.classList.remove('hover');
        }
        const hoveredStrings = code.querySelectorAll('.hover');
        hoveredStrings.forEach((item) => {
          item.classList.remove('hover');
        });
        const subjectTitle = <HTMLElement>document.querySelector('.subject-title');
        subjectTitle.removeAttribute('style');
      });
    }
  }

  private hoveredElement(num: string): void {
    const table = document.getElementById('table');
    const element = table?.querySelector(`[data-el-num="${num}"]`);
    if (element) {
      const position = element.getBoundingClientRect();
      element.classList.add('hover');
      const strCode = element.getAttribute('data-str-num');

      if (strCode) {
        this.hoveredStringsCodeAddTitle(strCode.split(','), position.right - 70);
      }
    }
  }

  private hoveredStringsCodeAddTitle(arr: string[], left: number): void {
    const code = document.getElementById('code');
    const subjectTitle = <HTMLElement>document.querySelector('.subject-title');
    subjectTitle.innerHTML = '';
    let title = '';

    if (code) {
      arr.forEach((strNum, index) => {
        const str = code.querySelector(`[data-str-num="${strNum}"]`);
        if (str) {
          str.classList.add('hover');
          if (index === 0 || index === arr.length - 1) title += str.textContent;
        }
      });
    }

    subjectTitle.textContent = title.trim();
    subjectTitle.style.display = 'block';
    subjectTitle.style.left = `${left}px`;
  }
}
