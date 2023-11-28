const cards = document.querySelectorAll('.accordion__item');
const arrows = document.querySelectorAll('.arrow-background');

// функция закрывает все карточки и открывает заданную
const openCard = (index) => {
  cards.forEach(card => card.classList.remove('accordion__item_open'));
  cards[index].classList.add('accordion__item_open');
}

//при клике на стрелку если карточка открыта, закрывает её, если нет выполняет функцию открытия
arrows.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    if (cards[index].classList.contains('accordion__item_open')) cards[index].classList.remove('accordion__item_open');
    else openCard(index);
  });
})
