const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error')

const cityHTML = document.querySelector('.city');

async function getWeather () {
    let city;

    if (localStorage.city === undefined && localStorage.lang === 'en') city = 'Minsk';
    else if (localStorage.city === undefined && localStorage.lang === 'ru') city = 'Минск';
    else city = localStorage.city;

    cityHTML.value = city;

    if (localStorage.lang === 'en') cityHTML.setAttribute('placeholder', 'enter the city');
    else if (localStorage.lang === 'ru') cityHTML.setAttribute('placeholder', 'введите город');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${localStorage.lang}&appid=c2a5e9db9a22d84ea7c41f9795b7a34c&units=metric`;
    
    try {
        const result = await fetch(url);
        const data = await result.json();

        weatherError.textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        if (localStorage.lang === 'en') {
            humidity.textContent = `humidity: ${Math.round(data.main.humidity)}%`;
            wind.textContent = `wind speed: ${Math.round(data.wind.speed)} m/s`;
        } else if (localStorage.lang === 'ru') {
            humidity.textContent = `влажность воздуха: ${Math.round(data.main.humidity)}%`;
            wind.textContent = `скорость ветра: ${Math.round(data.wind.speed)} м/с`;
        }
    } catch {
        if (localStorage.lang === 'en') weatherError.textContent = 'no weather forecast for this city';
        else if (localStorage.lang === 'ru') weatherError.textContent = 'прогноз погоды для данного города отсутствует';
        
        weatherIcon.className = 'weather-icon owf';

        localStorage.removeItem('city'); // при вводе неверного города он не сохранится в памяти и при перезагрузке вернет Минск

        temperature.textContent = '';
        weatherDescription.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
    }
}

getWeather(); // отображение погоды при запуске
setInterval(getWeather, 300000) // погода обновляется каждые 5 минут

cityHTML.addEventListener('change', () => {
    localStorage.city = cityHTML.value;
    getWeather();
})