// создание массива карточек
const randomArr = [];
let resultArr = [];

while(randomArr.length < 8) {
  let num = createRandomNumber(0, 7);
  if (!randomArr.includes(num)) randomArr.push(num);
}

const firstArr = randomArr.slice(0, 3);
const secondArr = randomArr.slice(3, 6);
const thirdArr = randomArr.slice(6);

for (let i = 0; i < 6; i++) {
  firstArr.sort(() => Math.random() - 0.5)
  secondArr.sort(() => Math.random() - 0.5);
  thirdArr.sort(() => Math.random() - 0.5);
  resultArr = [...resultArr, ...firstArr, ...secondArr, ...thirdArr]
}

// количество элементов на странице в зависимости от ширины и количество страниц
let numCards;
let numPages;

const getNumCards = () => {
  if (document.documentElement.clientWidth > 1279) numCards = 8;
  else if (document.documentElement.clientWidth > 660) numCards = 6;
  else numCards = 3;

  numPages = resultArr.length / numCards;
}

getNumCards();

// создаем объект страниц с номерами карточек
let pagesObj = {};

const createObjPages = () => {
  pagesObj = {};

  for (let i = 1; i <= numPages; i++) {
    let arr = resultArr.slice((i - 1) * numCards, (i - 1) * numCards + numCards);
    pagesObj[i] = arr;
  }

  console.log(pagesObj)
}

createObjPages();

// добавление карточек на страницу
let numOfPage = 1;

const cards = document.querySelector('.cards')

const addCards = () => {
  //создание кода HTML
  let htmlCode = '';
  pagesObj[numOfPage].forEach(item => {
    htmlCode += `<div class="slide"><img src="../img/pets/${pets[item].img}" alt="pet" class="slide__img"><h4 class="slide__title">${pets[item].name}</h4><button class="btn btn_light slide__btn">Learn more</button></div>`
  })

  //удаление дочерних элементов 
  while(cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
  //добавление элементов
  cards.insertAdjacentHTML('afterbegin', htmlCode);
}

addCards();

// добавление функционала кнопок
const numOfPageHTML = document.querySelector('.num-of-page');
const firstPage = document.querySelector('.first-page');
const lastPage = document.querySelector('.last-page');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

// устанавливает номер страници, делает кнопки активными/не активными
const setBtn = () => {
  [firstPage, lastPage, next, prev].forEach(item => item.classList.remove('btn-slider_not-active'));
  if (numOfPage === 1) [firstPage, prev].forEach(item => item.classList.add('btn-slider_not-active'));
  if (numOfPage === numPages) [lastPage, next].forEach(item => item.classList.add('btn-slider_not-active'));
  numOfPageHTML.textContent = numOfPage;
}

setBtn();

const openFirstPage = () => {
  numOfPage = 1;
  addCards();
  setBtn();
}

const openLastPage = () => {
  numOfPage = numPages;
  addCards();
  setBtn();
}

const openNextPage = () => {
  if (numOfPage < numPages) {
    numOfPage++
    addCards();
    setBtn();
  }
}

const openPrevPage = () => {
  if (numOfPage > 1) {
    numOfPage--
    addCards();
    setBtn();
  }
}

firstPage.addEventListener('click', openFirstPage);
lastPage.addEventListener('click', openLastPage);
next.addEventListener('click', openNextPage);
prev.addEventListener('click', openPrevPage);

// изменение карточек при изменении размера окна
window.addEventListener('resize', () => {
  let wasNumCards = numCards;
  getNumCards();

  if (wasNumCards !== numCards) {
    createObjPages();
    numOfPage = 1;
    addCards();
    setBtn();
  }
})

//pop-up
const popUp = document.querySelector('.pop-up')

const openPopUp = () => {
  popUp.classList.add('pop-up_open')
  overlay.classList.add('overlay_block')
  document.body.classList.add('no-scroll')
}

const closePopUp = () => {
  popUp.classList.remove('pop-up_open')
  overlay.classList.remove('overlay_block')
  document.body.classList.remove('no-scroll')
}

cards.addEventListener('click', (event) => {
  if(event.target.closest('div').classList.contains('slide')) {
    petClick = event.target.closest('div').querySelector('.slide__title').textContent;
    getPetIndex();
    addHtmlPopUp();
    openPopUp();
    console.log(petClick);
    console.log(petClickIndex);
  };
})

overlay.addEventListener('click', closePopUp)
popUp.addEventListener('click', (event) => {
  if (event.target.classList.contains('pop-up__btn')) closePopUp();
})

//формирование pop-up 
let petClick
let petClickIndex

const getPetIndex = () => {
  pets.forEach((item, index) => {
    if (item.name === petClick) petClickIndex = index;
  })
}

const addHtmlPopUp = () => {
  const htmlCode = `<img src="../img/pets-modal/${pets[petClickIndex].img}" alt="pet" class="pop-up__img"><div class="pop-up__info"><h3 class="pop-up__title">${pets[petClickIndex].name}</h3><p class="pop-up__subtitle">${pets[petClickIndex].type} - ${pets[petClickIndex].breed}</p><p class="pop-up__description">${pets[petClickIndex].description}</p><ul class="pop-up__list"><li class="pop-up__item"><span>Age:</span>${pets[petClickIndex].age}</li><li class="pop-up__item"><span>Inoculations:</span>${pets[petClickIndex].inoculations.join(', ')}</li><li class="pop-up__item"><span>Diseases:</span>${pets[petClickIndex].diseases.join(', ')}</li><li class="pop-up__item"><span>Parasites:</span>${pets[petClickIndex].parasites.join(', ')}</li></ul></div><button class="btn-slider pop-up__btn"></button>`

  while(popUp.firstChild) {
    popUp.removeChild(popUp.firstChild);
  }

  popUp.insertAdjacentHTML('afterbegin', htmlCode);
}
