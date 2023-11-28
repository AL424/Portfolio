const iconMenu = document.getElementById('menu__icon');
const menu = document.getElementById('menu');
const body = document.body

//console.log(iconMenu);
//console.log(menu);

//открытие-закрытие меню при нажатии на иконку
iconMenu.addEventListener('click', function(e) {
    menu.classList.toggle('menu_active');
    iconMenu.classList.toggle('menu__icon_active')
    body.classList.toggle('noscroll')
});

//закрытие меню при нажатии на ссылку
const linksMenu = document.querySelectorAll('.menu__link'); //массив ссылок меню

//console.log(linksMenu);

function closeOnClick() {
    menu.classList.remove('menu_active');
    iconMenu.classList.remove('menu__icon_active');
    body.classList.remove('noscroll');
};

linksMenu.forEach((linkMenu) => { //используя этот метод добавляю функцию к каждому элкменту массива
    linkMenu.addEventListener('click', closeOnClick);
});

//закрытие при нажатии не по меню
document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && !iconMenu.contains(event.target) && menu.classList.contains('menu_active')) {
        closeOnClick();
    };
});