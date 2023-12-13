import "./index-7Q9cBpiB.js";
document.querySelector(".slider");
const slide = document.querySelector(".slides__wrap");
const [prevBtn, nextBtn] = document.querySelectorAll(".slider__btn");
const progressBars = document.querySelectorAll(".slide__timer");
let currentSlide = Number(slide.dataset.activeSlide);
let animationId;
const animation = () => {
  const progressBar = progressBars[currentSlide - 1];
  const indicator = progressBar.querySelector(".slide__indicator");
  const fullWidth = progressBar.clientWidth;
  const step = fullWidth / 5e3 * 20;
  let currentWidth = indicator.clientWidth;
  animationId = setInterval(() => {
    if (currentWidth >= fullWidth) {
      nextSlide();
      animation();
    } else {
      currentWidth += step;
      indicator.style.width = `${currentWidth}px`;
    }
  }, 20);
};
slide.addEventListener("mouseenter", () => clearInterval(animationId));
slide.addEventListener("mouseleave", () => animation());
window.addEventListener("load", () => animation());
const clearProgressBar = () => {
  const progressBar = progressBars[currentSlide - 1];
  const indicator = progressBar.querySelector(".slide__indicator");
  indicator.style.width = 0;
  clearInterval(animationId);
};
const nextSlide = () => {
  clearProgressBar();
  if (currentSlide >= 3)
    currentSlide = 1;
  else
    currentSlide += 1;
  slide.dataset.activeSlide = currentSlide;
};
const prevSlide = () => {
  clearProgressBar();
  if (currentSlide <= 1)
    currentSlide = 3;
  else
    currentSlide -= 1;
  slide.dataset.activeSlide = currentSlide;
};
prevBtn.addEventListener("click", () => {
  prevSlide();
  animation();
});
nextBtn.addEventListener("click", () => {
  nextSlide();
  animation();
});
let xDown;
let yDown;
slide.addEventListener("touchstart", (event) => {
  event.preventDefault();
  clearInterval(animationId);
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
});
slide.addEventListener("touchend", (event) => {
  event.preventDefault();
  if (!xDown || !yDown) {
    animation();
    return;
  }
  const xUp = event.changedTouches[0].clientX;
  const yUp = event.changedTouches[0].clientY;
  const deltaX = xDown - xUp;
  const deltaY = yDown - yUp;
  if (Math.abs(deltaX) < Math.abs(deltaY) || Math.abs(deltaX) < 20) {
    xDown = 0;
    yDown = 0;
    animation();
    return;
  }
  if (deltaX > 0)
    nextSlide();
  if (deltaX < 0)
    prevSlide();
  xDown = 0;
  yDown = 0;
  animation();
});
//# sourceMappingURL=main-44Smu0Bs.js.map
