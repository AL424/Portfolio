// получение основного тэга 
const getBgImgTags = () => {
    const date = new Date();

    let tag;

    if (date.getHours() >= 0 && date.getHours() < 6) tag = 'night';
    else if (date.getHours() >= 6 && date.getHours() < 12) tag = 'morning';
    else if (date.getHours() >= 12 && date.getHours() < 18) tag = 'afternoon';
    else if (date.getHours() >= 18) tag = 'evening';

    return tag
}

// работа с тегами пользователя
const inputTag = document.querySelector('.tag-input');
const tagsWrapper = document.querySelector('.img-tags');

// получение тегов записанных в локалсторе и создание массива тэгов
let tagsArr = [];

if (localStorage.tags) {
    tagsArr = localStorage.tags.split(',');

    tagsArr.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'img-tag';
        span.textContent = `${tag}`;

        tagsWrapper.append(span)
    })
}

//добавление тегов
inputTag.addEventListener('change', () => {
    const newTag = inputTag.value;

    if (tagsArr.includes(`${newTag}`)) {
        if (localStorage.lang === 'en') alert('This tag is already enabled');
        else if (localStorage.lang === 'ru') alert('Такой тэг уже есть');

        inputTag.value = '';
    } else {
        if (localStorage.tags === undefined) localStorage.tags = newTag;
        else localStorage.tags = `${localStorage.tags},${newTag}`

        tagsArr.push(`${newTag}`);
        
        const span = document.createElement('span');
        span.className = 'img-tag';
        span.textContent = `${newTag}`;

        tagsWrapper.append(span)
        
        inputTag.value = '';
    }   
})

//удаление тэгов 
tagsWrapper.addEventListener('click', (event) => {
    if (event.target.closest('.img-tag')) {
        tagsArr = tagsArr.filter(item => item != event.target.closest('.img-tag').innerHTML)
        event.target.closest('.img-tag').remove()

        if (tagsArr.length === 0) localStorage.removeItem('tags');
        else localStorage.tags = tagsArr.join(',')
    }
})

// получение изображения с github
let imgNumber = createRandomNumber(1, 20).toString().padStart(2, '0');

const setBg = (number) => {
    const img = new Image()
    img.src = `https://raw.githubusercontent.com/AL424/img-momentum/main/images/${getBgImgTags()}/${number}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/AL424/img-momentum/main/images/${getBgImgTags()}/${number}.jpg')`; 
    }  
}

// получение изображений по api
// Unsplash
async function getBgImageUnsplash() {
    const urlUnsplash = `https://api.unsplash.com/photos/random?orientation=landscape&query=${localStorage.tags ? localStorage.tags : getBgImgTags()}&client_id=m6q5A04BnnkLaRxI90z97owxfqSvjpv9Z0iEzA88QDc`;

    const result = await fetch(urlUnsplash);
    try {
        const data = await result.json();
    
        const img = new Image();
        img.src = data.urls.regular;

        img.onload = () => {
            document.body.style.backgroundImage = `url('${data.urls.regular}')`;
        }
    } catch {
        setPhotoSourceGithub();
        alert('Unsplash not available, try later');
    }
}

//Flickr
async function getBgImageFlickr() {
    const urlFlickr = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=05423eea61ed7616db01ae6f834e0344&tags=${localStorage.tags ? localStorage.tags : getBgImgTags()}&content_type=1&media=photos&extras=url_l&format=json&nojsoncallback=1`
    // const urlFlickr = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=05423eea61ed7616db01ae6f834e0344&extras=url_l&format=json&nojsoncallback=1` --- url random img

    const result = await fetch(urlFlickr);
    try {
        const data = await result.json();

        if (data.photos.photo.length < 10) {
            setPhotoSourceGithub();
            alert('Flickr not available, try later');
            return;
        }

        let flickrNumber = createRandomNumber(0, data.photos.photo.length);

        while (data.photos.photo[flickrNumber].width_l < 1024 || data.photos.photo[flickrNumber].width_l < data.photos.photo[flickrNumber].height_l) flickrNumber = createRandomNumber(0, data.photos.photo.length);

        const img = new Image();
        img.src = data.photos.photo[flickrNumber].url_l;

        img.onload = () => {
            document.body.style.backgroundImage = `url('${data.photos.photo[flickrNumber].url_l}')`;
        }
    } catch {
        setPhotoSourceGithub();
        alert('Flickr not available, try later');
    }
    
}

// установка bg-img при запуске и добавление стиля соответствующему input
const photoSourceButtons = document.querySelectorAll('.photo-source')
 
photoSourceButtons.forEach(item => {
    if (item.value === localStorage.photoSource) item.setAttribute('checked', 'checked');
})

if (localStorage.photoSource === 'github') setBg(imgNumber);
else if (localStorage.photoSource  === 'unsplash') getBgImageUnsplash();
else if (localStorage.photoSource  === 'flickr') getBgImageFlickr();

// переключение изображения при клике по стелкам
const nextSlide = document.querySelector('.slide-next');
const prevSlide = document.querySelector('.slide-prev');

const getSlideNext = () => {
    if (localStorage.photoSource === 'github') {
        if (Number(imgNumber) === 20) imgNumber = '01';
        else imgNumber = (Number(imgNumber) + 1).toString().padStart(2, '0');
        setBg(imgNumber);
    } else if (localStorage.photoSource === 'unsplash') getBgImageUnsplash();
    else if (localStorage.photoSource  === 'flickr') getBgImageFlickr();
}

const getSlidePrev = () => {
    if (localStorage.photoSource === 'github') {
        if (Number(imgNumber) === 1) imgNumber = '20';
        else imgNumber = (Number(imgNumber) - 1).toString().padStart(2, '0');
        setBg(imgNumber);
    } else if (localStorage.photoSource === 'unsplash') getBgImageUnsplash();
    else if (localStorage.photoSource  === 'flickr') getBgImageFlickr();
}

nextSlide.addEventListener('click', getSlideNext);
prevSlide.addEventListener('click', getSlidePrev);