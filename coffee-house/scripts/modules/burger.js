const burgerIcon = document.querySelector('.burger-icon');
const nav = document.querySelector('.nav-wrap');

burgerIcon.addEventListener('click', () => {
  [ burgerIcon, nav ].forEach((elem) => {
    elem.classList.toggle('open');
  });
  window.scrollTo(0, 0);
  document.body.classList.toggle('no-scroll');
});

const links = document.querySelectorAll('.logo, .nav__link');

const menuClose = () => {
  [ burgerIcon, nav ].forEach((elem) => {
    elem.classList.remove('open');
  });
  document.body.classList.remove('no-scroll');
}

links.forEach((link) => {
  link.addEventListener('click', () => menuClose());
});

window.addEventListener('resize', (event) => {
  if (event.target.innerWidth >= 769) menuClose();
});
