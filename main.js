const carouselItems = document.querySelector('.card')
const prevButton = document.querySelector('.prev-button')
const nextButton = document.querySelector('.next-button')

const itemWidth = carouselItems.offsetWidth;
let currentIndex = 0;

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    console.log('oi')
    currentIndex--;
    carouselItems.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < carouselItems.childElementCount - 1) {
    currentIndex++;
    carouselItems.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }
});