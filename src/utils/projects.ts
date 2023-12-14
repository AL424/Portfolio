import { Project } from '../types/Project';

export const projects: Project[] = [
  {
    name: 'Coffee House',
    task: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/coffee-house/coffee-house.md',
    deploy: 'https://al424.github.io/Portfolio/coffee-house/',
    code: 'https://github.com/AL424/Portfolio/tree/coffee-house/coffee-house',
    description:
      'Двухстраничный сайт кофейни, с реализацией карусели на главной странице, переключения категорий товаров с отложенной загрузкой на странице меню, модального окна выбраного товара на странице меню.',
    skills: ['HTML', 'SASS', 'JavaScript', 'Vite'],
    screen: '/screen/coffee-house.jpg',
  },
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
  },
  {
    name: 'Momentum',
    task: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/momentum/momentum-stage1.md',
    deploy: 'https://al424.github.io/Portfolio/momentum',
    code: 'https://github.com/AL424/Portfolio/tree/momentum/momentum',
    description:
      'Momentum - аналог одноимённого приложения интернет-магазина Chrome. В приложении реализованы часы, список дел, виджеты погоды и другие функции, настройки позволяющие менять язык, фоновое изображение, показывать или скрывать отдельные блоки приложения.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    screen: '/screen/momentum.png',
  },
  {
    name: 'RS CSS',
    task: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rs-css.md',
    deploy: 'https://al424.github.io/Portfolio/rs-css',
    code: 'https://github.com/AL424/Portfolio/tree/rs-css/rs-css',
    description:
      'Тренажёр по изучению CSS селекторов, состоящий из десяти игровых уровней. Задача пользователя - написать css-селектор, отвечающий всем выделенным элементам вёрстки. Прототип тренажера - приложение CSS Diner.',
    skills: ['HTML', 'SASS', 'TypeScript', 'webpack', 'ESLint'],
    screen: '/screen/rs-css.png',
  },
  {
    name: 'Virtual Keyboard',
    task: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/virtual-keyboard/virtual-keyboard-ru.md',
    deploy: 'https://al424.github.io/virtual-keyboard/',
    code: 'https://github.com/AL424/virtual-keyboard/tree/development',
    description:
      'Виртуальная клавиатура. Клик по кнопкам на виртуальной клавиатуре и нажатие на кнопки физической клавиатуры вводят символы в поле на странице приложения. Реализована возможность переключения языка, сохранение функциональности специальных клавиш (delete, enten и т.п.).',
    skills: ['HTML', 'CSS', 'JavaScript'],
    screen: '/screen/virtual-keyboard.png',
  },
  {
    name: 'CSS Bayan',
    task: 'https://github.com/DrDiman/CSS-Bayan-task',
    deploy: 'https://al424.github.io/cssBayan/cssBayan/index.html',
    code: 'https://github.com/AL424/cssBayan/tree/gh-pages/cssBayan',
    description:
      'Аккордеон изображений, с адаптивным дизайном, используя средства HTML и CSS, без использования JavaScript и библиотек.',
    skills: ['HTML', 'CSS'],
    screen: '/screen/css-bayan.png',
  },
];
