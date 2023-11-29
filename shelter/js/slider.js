let pastArr = [];
let currArr = [];
let nextArr = [];

let numCards;

const getNumCards = () => {
  if (document.documentElement.clientWidth > 1050) numCards = 3;
  else if (document.documentElement.clientWidth > 767) numCards = 2;
  else numCards = 1;
}

getNumCards();

const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
let slidesPrev = document.querySelector('.slides-prev')
let slidesCurr = document.querySelector('.slides-curr')
let slidesNext = document.querySelector('.slides-next')

let click = '';

const addCardsCurr = () => {
  let htmlCodeCurr = '';
  currArr.forEach(item => {
    htmlCodeCurr += `<div class="slide"><img src="img/pets/${pets[item].img}" alt="pet" class="slide__img"><h4 class="slide__title">${pets[item].name}</h4><button class="btn btn_light slide__btn">Learn more</button></div>`
  })

  //удаление дочерних элементов 
  while(slidesCurr.firstChild) {
    slidesCurr.removeChild(slidesCurr.firstChild);
  }

  slidesCurr.insertAdjacentHTML('afterbegin', htmlCodeCurr);
}

const addCardsPrev = () => {
  let htmlCodePrev = '';
  pastArr.forEach(item => {
    htmlCodePrev += `<div class="slide"><img src="img/pets/${pets[item].img}" alt="pet" class="slide__img"><h4 class="slide__title">${pets[item].name}</h4><button class="btn btn_light slide__btn">Learn more</button></div>`
  })

  //удаление дочерних элементов 
  while(slidesPrev.firstChild) {
    slidesPrev.removeChild(slidesPrev.firstChild);
  }

  slidesPrev.insertAdjacentHTML('afterbegin', htmlCodePrev);
}

const addCardsNext = () => {
  let htmlCodeNext = '';
  nextArr.forEach(item => {
    htmlCodeNext += `<div class="slide"><img src="img/pets/${pets[item].img}" alt="pet" class="slide__img"><h4 class="slide__title">${pets[item].name}</h4><button class="btn btn_light slide__btn">Learn more</button></div>`
  })

  //удаление дочерних элементов 
  while(slidesNext.firstChild) {
    slidesNext.removeChild(slidesNext.firstChild);
  }

  slidesNext.insertAdjacentHTML('afterbegin', htmlCodeNext);
}

prevBtn.addEventListener('click', () => {
  backward();

  slidesPrev.remove();

  slidesNext.className = 'slides flex-wrap slides-curr';
  slidesCurr.className = 'slides flex-wrap slides-prev';
  createNewElem('slides-next');
  
  slidesPrev = document.querySelector('.slides-prev')
  slidesCurr = document.querySelector('.slides-curr')
  slidesNext = document.querySelector('.slides-next')

  addCardsNext();

  console.log(slidesPrev, slidesCurr, slidesNext)
})

nextBtn.addEventListener('click', () => {
  forward()

  slidesNext.remove()

  slidesCurr.className = 'slides flex-wrap slides-next';
  slidesPrev.className = 'slides flex-wrap slides-curr';
  createNewElem('slides-prev');
  
  slidesPrev = document.querySelector('.slides-prev')
  slidesCurr = document.querySelector('.slides-curr')
  slidesNext = document.querySelector('.slides-next')

  addCardsPrev();

  console.log(slidesPrev, slidesCurr, slidesNext)

})

// создание элемента 
const createNewElem = (className) => {
  const div = document.createElement('div');
  div.className = `slides flex-wrap ${className}`;
  document.querySelector('.slider').append(div);
}

const createNext = () => {
  nextArr = [];
  while (nextArr.length < numCards) {
    let num = createRandomNumber(0, pets.length - 1);
    if (!nextArr.includes(num) && !currArr.includes(num)) nextArr.push(num);
  }
}

const createPast = () => {
  pastArr = [];
  while (pastArr.length < numCards) {
    let num = createRandomNumber(0, pets.length - 1);
    if (!pastArr.includes(num) && !currArr.includes(num)) pastArr.push(num);
  }
}

const fromNextInCurr = () => {
  currArr = [...nextArr];
  nextArr = [];
}

const fromCurrInPast = () => {
  pastArr = [...currArr];
  currArr = []
}

const fromPastInCurr = () => {
  currArr = [...pastArr];
  pastArr = [];
}

const fromCurrInNext = () => {
  nextArr = [...currArr];
  currArr = [];
}

const init = () => {
  createNext();
  fromNextInCurr();
  createNext();
  fromCurrInPast();
  fromNextInCurr();
  createNext()

  console.log('init', pastArr, currArr, nextArr)
}

init();
addCardsPrev();
addCardsCurr();
addCardsNext();

const forward = () => {
  fromCurrInNext();
  fromPastInCurr();
  createPast()

  console.log('past', pastArr, currArr, nextArr)
}

const backward = () => {
  fromCurrInPast();
  fromNextInCurr();
  createNext()

  console.log('past', pastArr, currArr, nextArr)
}

// изменение карточек при изменении размера окна
window.addEventListener('resize', () => {
  let wasNumCards = numCards;

  getNumCards();

  if (wasNumCards !== numCards) {
    init();
    addCardsPrev();
    addCardsNext();
    addCardsCurr();
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

const slider = document.querySelector('.slider');

slider.addEventListener('click', (event) => {
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
  const htmlCode = `<img src="img/pets-modal/${pets[petClickIndex].img}" alt="pet" class="pop-up__img"><div class="pop-up__info"><h3 class="pop-up__title">${pets[petClickIndex].name}</h3><p class="pop-up__subtitle">${pets[petClickIndex].type} - ${pets[petClickIndex].breed}</p><p class="pop-up__description">${pets[petClickIndex].description}</p><ul class="pop-up__list"><li class="pop-up__item"><span>Age:</span>${pets[petClickIndex].age}</li><li class="pop-up__item"><span>Inoculations:</span>${pets[petClickIndex].inoculations.join(', ')}</li><li class="pop-up__item"><span>Diseases:</span>${pets[petClickIndex].diseases.join(', ')}</li><li class="pop-up__item"><span>Parasites:</span>${pets[petClickIndex].parasites.join(', ')}</li></ul></div><button class="btn-slider pop-up__btn"></button>`

  while(popUp.firstChild) {
    popUp.removeChild(popUp.firstChild);
  }

  popUp.insertAdjacentHTML('afterbegin', htmlCode);
}
