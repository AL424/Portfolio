const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes () {
    let url;

    if (localStorage.lang === 'en') url = 'js/quotes-en.json';
    else if (localStorage.lang === 'ru') url = 'js/quotes-ru.json';

    const result = await fetch(url);
    const data = await result.json();
        
    const num = createRandomNumber(0, data.length - 1);

    quote.textContent = data[num].text;
    author.textContent = data[num].author;
}

getQuotes();

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes);