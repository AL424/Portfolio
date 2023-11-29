// дефолтные значения настроек
if (localStorage.lang === undefined) localStorage.lang = 'en';

if (localStorage.photoSource === undefined) localStorage.photoSource = 'github'

// общие функции
const createRandomNumber = (min, max) => { // min, max includes 
    const randomNumber = min + Math.round( Math.random() * (max - min) );
    return randomNumber;
}
