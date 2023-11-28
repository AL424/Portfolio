import { Level } from '../../types';

export class LevelView {
  public draw(data: Level): void {
    const description = document.getElementById('description');
    if (description) {
      description.textContent = data.description;
      description.classList.remove('game-over');
    }

    const table = document.getElementById('table');
    if (table) {
      table.innerHTML = '';

      table.insertAdjacentHTML('afterbegin', data.code);

      const target = table.querySelectorAll(data.target);
      target.forEach((item) => item.classList.add('target'));
    }

    const tableEdge = <HTMLElement>document.querySelector('.table-edge');
    if (table && tableEdge) tableEdge.style.width = `${table.offsetWidth}px`;

    const input = <HTMLInputElement>document.getElementById('input');
    input.value = '';

    const code = document.getElementById('code');
    if (code) {
      code.innerHTML = '';

      data.stringsCode.forEach((str, index) => {
        const pre = document.createElement('pre');
        pre.innerHTML = str;
        pre.setAttribute('data-str-num', `${index + 1}`);
        pre.setAttribute('data-el-num', data.elNum[index]);
        code.append(pre);
      });
    }
  }
}
