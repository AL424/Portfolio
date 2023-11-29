import { LevelsStatus } from '../../types';

export class LevelListView {
  public draw(data: LevelsStatus[]): void {
    const levels = document.getElementById('levels');
    if (levels) {
      levels.innerHTML = '';
      data.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'level';
        div.setAttribute('data-level-number', String(index));
        div.textContent = `Level ${index + 1}`;
        const span = document.createElement('span');
        span.className = 'help';
        span.textContent = '?';
        div.append(span);
        if (item.completed) div.classList.add('level_completed');
        if (item.help) div.classList.add('help_active');

        levels.append(div);
      });
    }
  }
}
