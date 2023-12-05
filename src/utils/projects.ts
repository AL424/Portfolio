import { Project } from '../types/Project';

export const projects: Project[] = [
  {
    name: 'Plants',
    task: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/plants/plants.md',
    deploy: 'https://al424.github.io/Portfolio/plants/',
    code: 'https://github.com/AL424/Portfolio/tree/plants/plants',
    description:
      'Lending page предоставляющий услуги по выращиванию растений, с реализацией на странице табов, аккордеона, кастомного селекта.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    screen: '/screen/plants.jpg',
  },
  {
    name: 'Shelter',
    task: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/shelter/shelter.md',
    deploy: 'https://al424.github.io/Portfolio/shelter',
    code: 'https://github.com/AL424/Portfolio/tree/shelter/shelter',
    description:
      'Двухстраничный сайт приюта для животных, с реализацией всплывающих карточек животных на обеих страницах, бесконечной карусели карточек на главной странице, пагинации на странице our-pets.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    screen: '/screen/shelter.jpg',
  },
  {
    name: 'Minesweeper',
    task: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/minesweeper/README.md',
    deploy: 'https://al424.github.io/Portfolio/minesweeper',
    code: 'https://github.com/AL424/Portfolio/tree/minesweeper/minesweeper',
    description:
      'Классическая игра "Cапер" на чистом JavaScript. Реализован функционал классической игры (отображение количества мин, возможность устанавливать флажки и т.п.), выбор уровня сложности (размер поля, количество мин), сохранение результатов игры, выбор темы.',
    skills: ['HTML', 'SASS', 'JavaScript', 'webpack'],
    screen: '/screen/minesweeper.png',
    bgColor: '#f2eef9',
  },
];
