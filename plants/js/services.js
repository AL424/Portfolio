const buttons = document.querySelectorAll('.services__btn'); //gardens, lawn, planting
const cardsGardens = document.querySelectorAll('.service_gardens');
const cardsLawn = document.querySelectorAll('.service_lawn');
const cardsPlanting = document.querySelectorAll('.service_planting');

const addBlurEffect = (arr) => arr.forEach(item => item.classList.add('blur'));

const removeBlurEffect = (arr) => arr.forEach(item => item.classList.remove('blur'));

// do cards and button active 
const addActiveCards = (index) => {
  buttons[index].classList.add('services__btn_active');
  if (index === 0) removeBlurEffect(cardsGardens);
  if (index === 1) removeBlurEffect(cardsLawn);
  if (index === 2) removeBlurEffect(cardsPlanting);
}

// do cards and button no active
const removeActiveCards = (index) => {
  buttons[index].classList.remove('services__btn_active');
  if (index === 0) addBlurEffect(cardsGardens);
  if (index === 1) addBlurEffect(cardsLawn);
  if (index === 2) addBlurEffect(cardsPlanting);
}

// counts amount active buttons
const countsActiveButtons = () => {
  let amountActiveButtons = 0;
  buttons.forEach(button => {
    if (button.classList.contains('services__btn_active')) amountActiveButtons += 1;
  })
  return amountActiveButtons;
}

const addBlurEffectAllCards = () => {
  addBlurEffect(cardsGardens);
  addBlurEffect(cardsPlanting);
  addBlurEffect(cardsLawn);
}

const removeBlurEffectAllCards = () => {
  removeBlurEffect(cardsGardens);
  removeBlurEffect(cardsLawn);
  removeBlurEffect(cardsPlanting);
}

const removeAllButtonsClassActive = () => {
  buttons.forEach(button => button.classList.remove('services__btn_active'))
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (countsActiveButtons() === 0) {
      addBlurEffectAllCards();
      addActiveCards(index);
    } else if ((countsActiveButtons() === 1) && !button.classList.contains('services__btn_active')) {
      addActiveCards(index);
    } else if ((countsActiveButtons() === 1) && button.classList.contains('services__btn_active')) {
      removeBlurEffectAllCards();
      button.classList.remove('services__btn_active');
    } else if ((countsActiveButtons() === 2) && button.classList.contains('services__btn_active')) {
      removeActiveCards(index);
    } else if ((countsActiveButtons() === 2) && !button.classList.contains('services__btn_active')) {
      removeAllButtonsClassActive();
      removeBlurEffectAllCards();
    };
  })
})
