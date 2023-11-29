const playIcon = document.querySelector('.play');
const playNextIcon = document.querySelector('.play-next');
const playPrevIcon = document.querySelector('.play-prev');
const playListWrap = document.querySelector('.play-list')

const title = document.querySelector('.play-title')
const duration = document.querySelector('.play-duration')

// создание плейлиста средствами js
playList.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[index].title;
    playListWrap.append(li);
})

const playItems = document.querySelectorAll('.play-item');

const addActive = (number) => {
    playItems.forEach(item => {
        item.classList.remove('item-active')
    })
    playItems[number].classList.add('item-active')
}

// создание аудио
const audio = new Audio();

let soundNumber = 0;
addActive(soundNumber);
audio.src = playList[soundNumber].src;
title.textContent = playList[soundNumber].title;
duration.textContent = playList[soundNumber].duration;

let isPlay = false;

// функции воспроизведения, паузы, переключения треков
const playPauseAudio = () => {
    if (!isPlay) {
        audio.play();
        isPlay = true;
        playIcon.classList.add('pause');
        addActive(soundNumber);
    }
    else {
        audio.pause();
        isPlay = false;
        playIcon.classList.remove('pause');
    }
}

const playNext = () => {
    if (soundNumber === playList.length - 1) soundNumber = 0;
    else soundNumber += 1;
    audio.src = playList[soundNumber].src;
    title.textContent = playList[soundNumber].title;
    duration.textContent = playList[soundNumber].duration;
    addActive(soundNumber)
    if (isPlay) audio.play()
}

const playPrev = () => {
    if (soundNumber === 0) soundNumber = playList.length - 1;
    else soundNumber -= 1;
    audio.src = playList[soundNumber].src;
    title.textContent = playList[soundNumber].title;
    duration.textContent = playList[soundNumber].duration;
    addActive(soundNumber)
    if (isPlay) audio.play()
}

playIcon.addEventListener('click', playPauseAudio);
playNextIcon.addEventListener('click', playNext);
playPrevIcon.addEventListener('click', playPrev);

// переключение на следующий трек когда закончилась песня
audio.addEventListener('ended', playNext);

// отображение время воспроизведения и прогрессбара
const playTime = document.querySelector('.play-time')

const showPlayTime = () => {
    const minutes = `${Math.floor(Math.round(audio.currentTime) / 60)}`.padStart(2, '0');
    const seconds = `${Math.round(audio.currentTime) % 60}`.padStart(2, '0');
    
    playTime.textContent = `${minutes}:${seconds}`;
}

const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');

const showProgressBar = () => {
    let widthProgres = 0;

    const widthProgressMax = audio.duration;
    const widthProgressValue = audio.currentTime;

    widthProgres = widthProgressValue / widthProgressMax;
    progress.style.width = `${widthProgres * 100}%`
}

setInterval(showPlayTime, 100);
setInterval(showProgressBar, 100);

// изменение позиции воспроизведения кликом по прогрессбару
progressBar.addEventListener('click', (event) => {
    audio.currentTime = audio.duration * event.offsetX / progressBar.offsetWidth;
})

// изменение громкости и отключение звука
const volumeIcon = document.querySelector('.volume-icon');
const volumeBar = document.querySelector('.volume-bar');
const volume = document.querySelector('.volume');

const getMuted = () => {
    if (audio.muted === false) {
        audio.muted = true;
        volumeIcon.classList.add('mute');
    } else if (audio.muted === true) {
        audio.muted = false;
        volumeIcon.classList.remove('mute');
    }
}

volumeIcon.addEventListener('click', getMuted)

volumeBar.addEventListener('click', (event) => {
    audio.volume = event.offsetX / volumeBar.offsetWidth;
    volume.style.width = `${event.offsetX / volumeBar.offsetWidth * 100}%`;
})

// клик по треку либо воспроизводит другую песню, либо ставит на паузу текущую
playItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (soundNumber === index) playPauseAudio();
        else {
            soundNumber = index;
            addActive(soundNumber);
            audio.src = playList[soundNumber].src;
            title.textContent = playList[soundNumber].title;
            duration.textContent = playList[soundNumber].duration;
            
            isPlay = false;
            playPauseAudio();
        }
    })
})