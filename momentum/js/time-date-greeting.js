const timeInReal = () => {
    const date = new Date();
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const time = `${hours}:${minutes}:${seconds}`
    
    document.querySelector('.time').innerHTML = time;
}

timeInReal(); //часы появляются при загрузки страницы
setInterval(timeInReal, 1000); //часы обновляются каждую секунду

const daysOfTheWeek = [
    'Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday',
];

const daysOfTheWeekRu = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
]

const months = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December',
];

const monthsRu = [
    'января', 
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
]

const dateInReal = () => {
    const date = new Date();

    let dayOfTheWeek;
    let dayOfTheMonth;
    let month;

    if (localStorage.lang === 'en') {
        dayOfTheWeek = daysOfTheWeek[date.getDay()];
        dayOfTheMonth = date.getDate();
        month = months[date.getMonth()];

        document.querySelector('.date').innerHTML = `${dayOfTheWeek}, ${month} ${dayOfTheMonth}`
    } else if (localStorage.lang === 'ru') {
        dayOfTheWeek = daysOfTheWeekRu[date.getDay()];
        dayOfTheMonth = date.getDate();
        month = monthsRu[date.getMonth()];

        document.querySelector('.date').innerHTML = `${dayOfTheWeek}, ${dayOfTheMonth} ${month}`
    }
}

dateInReal(); // дата отображается при запуске
setInterval(dateInReal, 1000); // обновляется каждую секунду

const name = document.querySelector('.name');

const addGreting = () => {
    const date = new Date();

    let greeting = 'Hello, ';
    if (localStorage.lang === 'en') {
        if (date.getHours() >= 0 && date.getHours() < 6) greeting = 'Good night, ';
        else if (date.getHours() >= 6 && date.getHours() < 12) greeting = 'Good morning, ';
        else if (date.getHours() >= 12 && date.getHours() < 18) greeting = 'Good afternoon, ';
        else if (date.getHours() >= 18) greeting = 'Good evening, ';

        name.setAttribute('placeholder', 'dear friend');
    } else if (localStorage.lang === 'ru') {
        if (date.getHours() >= 0 && date.getHours() < 6) greeting = 'Спокойной ночи, ';
        else if (date.getHours() >= 6 && date.getHours() < 12) greeting = 'Доброе утро, ';
        else if (date.getHours() >= 12 && date.getHours() < 18) greeting = 'Добрый день, ';
        else if (date.getHours() >= 18) greeting = 'Добрый вечер, ';

        name.setAttribute('placeholder', 'дорогой друг');
    }
    
    document.querySelector('.greeting').innerHTML = greeting;
}

addGreting(); // преветствие появляется при запуске
setInterval(addGreting, 1000); // обновляется каждую секунду

name.value = localStorage.getItem('name'); // написать имя если оно есть в локалсторе
name.addEventListener('input', () => {
    localStorage.setItem('name', name.value) // сохранить введенное имя в локалсторе
})