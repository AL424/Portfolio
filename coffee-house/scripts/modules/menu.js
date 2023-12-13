import menuJSON from '../../products.json';
import { openModal } from './modal';

const menu = {
  coffee: [],
  tea: [],
  dessert: [],
}

menuJSON.forEach((item) => {
  menu[item.category].push(item);
});

const menuCards = document.querySelector('.menu__cards');
let currentCategory = 'coffee';

const getTemplate = (id) => {
  const template = document.getElementById(id);
  const clone = template.content.cloneNode(true);
  return clone.children[0];
}

const addCard = (card) => {
  const cardElement = getTemplate('card');
  const [img, title, text, price] = 
    ['img', 'title', 'text', 'price'].map((item) => cardElement.querySelector(`.card__${item}`));
  img.src = card.img;
  img.alt = card.title;
  title.textContent = card.name;
  text.textContent = card.description;
  price.textContent = `$${card.price}`;
  cardElement.onclick = () => openModal(card);
  menuCards.appendChild(cardElement);
}

const addCards = (category, addLastElements) => {
  const arr = menu[category];
  if (addLastElements) {
    arr.slice(4).forEach((item) => addCard(item));
    return;
  }
  menuCards.innerHTML = '';
  if (window.innerWidth <= 768 && arr.length > 4) {
    arr.slice(0, 4).forEach((item) => addCard(item));
    const btn = getTemplate('refresh');
    btn.onclick = () => {
      addCards(category, true);
      btn.remove();
    };
    menuCards.after(btn);
    return;
  }
  menu[category].forEach((item) => addCard(item));
}
addCards(currentCategory);

const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener('change', (event) => {
    currentCategory = event.target.getAttribute('value');
    const btn = document.querySelector('.refresh');
    if (btn) btn.remove();
    addCards(currentCategory);
  });
});
let currentWidth = window.innerWidth;
window.addEventListener('resize', (event) => {
  if (currentWidth > 768 && event.target.innerWidth > 768) return;
  if (currentWidth <= 768 && event.target.innerWidth <= 768) return;
  currentWidth = event.target.innerWidth;
  const btn = document.querySelector('.refresh');
  if (btn) btn.remove();
  addCards(currentCategory);
});
