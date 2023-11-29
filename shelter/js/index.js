const createRandomNumber = (min, max) => { // min, max includes 
  const randomNumber = min + Math.round( Math.random() * (max - min) );
  return randomNumber;
}

// burger
const menu = document.querySelector('.menu');
const menuIcon = document.querySelector('.menu-icon');
const overlay = document.querySelector('.overlay');
const link = document.querySelectorAll('.menu__link');

menuIcon.addEventListener('click', () => {
  menu.classList.toggle('menu_open');
  menuIcon.classList.toggle('menu-icon_open');
  overlay.classList.toggle('overlay_block');
  document.body.classList.toggle('no-scroll');
});

const closeMenu = () => {
  menu.classList.remove('menu_open');
  menuIcon.classList.remove('menu-icon_open');
  overlay.classList.remove('overlay_block');
  document.body.classList.remove('no-scroll');
}

link.forEach(item => {
  item.addEventListener('click', closeMenu);
})

overlay.addEventListener('click', closeMenu);
