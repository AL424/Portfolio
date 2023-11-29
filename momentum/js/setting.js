// open close settings
const settingIcon = document.querySelector('.setting-icon');
const setting = document.querySelector('.setting');

const openCloseSetting = () => {
    settingIcon.classList.toggle('setting-icon_active');
    setting.classList.toggle('setting_active');
}

settingIcon.addEventListener('click', openCloseSetting);

document.addEventListener('click', (event) => {
    if (!(event.target === settingIcon) && setting.classList.contains('setting_active') && !(setting.contains(event.target)) && !(event.target.classList.contains('img-tag'))) {
        setting.classList.remove('setting_active');
    }
})

// set languages settings
const settingTitle = document.querySelectorAll('.setting__title')
const blockNames = document.querySelectorAll('.block-name')

const setLangSettings = () => {
    if (localStorage.lang === 'en') {
        settingTitle[0].textContent = 'Languages';
        settingTitle[1].textContent = 'Photo source';
        settingTitle[2].textContent = 'Photo tags';
        settingTitle[3].textContent = 'Blocks';
        
        document.querySelector('.tag-input').setAttribute('placeholder', 'Enter tag...');

        blockNames[0].textContent = 'Clock';
        blockNames[1].textContent = 'Date';
        blockNames[2].textContent = 'Greeting';
        blockNames[3].textContent = 'Quotes';
        blockNames[4].textContent = 'Weather';
        blockNames[5].textContent = 'Audio player';
        blockNames[6].textContent = 'To-do';
    } else if (localStorage.lang === 'ru') {
        settingTitle[0].textContent = 'Язык';
        settingTitle[1].textContent = 'Источник фото';
        settingTitle[2].textContent = 'Фото тэги';
        settingTitle[3].textContent = 'Блоки';
        
        document.querySelector('.tag-input').setAttribute('placeholder', 'Введите тэг...');

        blockNames[0].textContent = 'Часы';
        blockNames[1].textContent = 'Дата';
        blockNames[2].textContent = 'Приветствие';
        blockNames[3].textContent = 'Цитаты';
        blockNames[4].textContent = 'Погода';
        blockNames[5].textContent = 'Аудио-плеер';
        blockNames[6].textContent = 'Дела';
    }
}

setLangSettings()

// change languages
const langButtons = document.querySelectorAll('.lang');

langButtons.forEach(item => {
    if (item.value === localStorage.lang) item.setAttribute('checked', 'checked');
})

const translateIntoRu = () => {
    localStorage.lang = 'ru';

    getWeather();
    dateInReal();
    addGreting();
    getQuotes();
    setLangSettings();
    translateToDo();
}

const translateIntoEn = () => {
    localStorage.lang = 'en'

    getWeather();
    dateInReal();
    addGreting();
    getQuotes();
    setLangSettings();
    translateToDo();
}

langButtons.forEach(item => {
    item.addEventListener('change', (event) => {
        if (event.target.value === 'ru') translateIntoRu();
        else if (event.target.value === 'en') translateIntoEn();

    })
})

// photo sources 

// Изменение bg-img при выборе другого источника
photoSourceButtons.forEach(item => {
    item.addEventListener('change', (event) => {
        if (event.target.value === 'github') setPhotoSourceGithub();
        else if (event.target.value === 'unsplash') setPhotoSourceUnsplash();
        else if (event.target.value === 'flickr') setPhotoSourceFlickr();
    })
})

const setPhotoSourceGithub = () => {
    localStorage.photoSource = 'github';
    setBg(imgNumber);
}

const setPhotoSourceUnsplash = () => {
    localStorage.photoSource = 'unsplash';
    getBgImageUnsplash();
}

const setPhotoSourceFlickr = () => {
    localStorage.photoSource = 'flickr';
    getBgImageFlickr();
}

// отоброжение блоков 
const blockInputs = document.querySelectorAll('.block-input');
// переменные блоков
const playerBlock = document.querySelector('.player');
const weatherBlock = document.querySelector('.weather');
const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting-container');
const quotesBlock = document.querySelector('.quotes');
const toDoBlock = document.querySelector('.to-do');

const allBlocks = [playerBlock, weatherBlock, timeBlock, dateBlock, greetingBlock, quotesBlock, toDoBlock];

blockInputs.forEach(input => {
    input.addEventListener('change', () => {
        allBlocks.forEach(block => {
            if (input.value === block.attributes.value.value && input.checked) block.classList.add('visible');
            else if (input.value === block.attributes.value.value && !input.checked) block.classList.remove('visible');
        })
    })
})

window.addEventListener('unload', () => {
    // сохранение видимых блоков
    const visibleBlocks = [];
    blockInputs.forEach(input => {
        if (input.checked) visibleBlocks.push(input.value);
    })
    localStorage.visibleBlocks = visibleBlocks.join(',');

    // сохранение списка дел
    const toDoList = document.querySelectorAll('.to-do__title');

    const toDo = [];
    
    toDoList.forEach(item => {
        const obj = {};
        obj.title = item.textContent;
        obj.completed = item.classList.contains('to-do__title_completed') ? 'completed' : 'not-completed';
        toDo.push(obj)
    });

    localStorage.toDo = JSON.stringify(toDo)
})

if (localStorage.visibleBlocks) {
    const visibleBlocks = localStorage.visibleBlocks.split(',');
    allBlocks.forEach(block => {
        if (visibleBlocks.includes(block.attributes.value.value)) block.classList.add('visible');
    })
    blockInputs.forEach(input => {
        if (visibleBlocks.includes(input.value)) input.setAttribute('checked', 'checked');
    })
} else {
    allBlocks.forEach(block => block.classList.add('visible'));
    blockInputs.forEach(input => input.setAttribute('checked', 'checked'));
}
