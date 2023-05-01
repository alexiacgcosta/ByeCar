'use strict'; 

const card = document.querySelector('.card');
const previousBtn = document.querySelector('.prev-button');
const nextBtn = document.querySelector('.next-button');
const cardContent = document.querySelector('.card-content');
const slider = document.querySelectorAll('.slider');

const state = {
    startingPoint: 0,
    savedPosition: 0,
    currentPoint: 0,
    movement: 0,
    currentSlideIndex: 0
}

function translateSlide({position}) {
  cardContent.style.transform = `translateX(${position}px)`
  state.savedPosition = position
}

function setVisibleSlide({index}) {
  const slideItem = slider[index]
  const slideWidth = slideItem.clientWidth
  const position = index * slideWidth
  state.currentSlideIndex = index
  translateSlide({ position: - position})
}

function nextSlide() {
  setVisibleSlide({ index: state.currentSlideIndex + 1})
}

function previousSlide() {
  setVisibleSlide({ index: state.currentSlideIndex - 1})
}

function onMouseDown(event, index) {
  const slideItem = event.currentTarget
  state.startingPoint = event.clientX
  state.currentPoint = event.clientX - state.savedPosition
  state.currentSlideIndex = index
  slideItem.addEventListener('mousemove', onMouseMove)
  
  
}

function onMouseMove(event) {
  state.movement = event.clientX - state.startingPoint
  const position = event.clientX  - state.currentPoint
  translateSlide( { position: position})
}

function onMouseUp(event) {
  const slideItem = event.currentTarget 
  const slideWidth = slideItem.clientWidth
  if(state.movement < -100) {
    nextSlide()
  } else if (state.movement > 100) {
    previousSlide()
  } else {
    setVisibleSlide({ index: state.currentSlideIndex})
  }


  slideItem.removeEventListener('mousemove', onMouseMove)
}

slider.forEach(function(slideItem, index) {
  slideItem.addEventListener('dragstart', function(event) {
    event.preventDefault();
  })
  slideItem.addEventListener('mousedown', function(event) {
    onMouseDown(event, index);
  })
  slideItem.addEventListener('mouseup', onMouseUp) 
  })

  nextBtn.addEventListener('click', nextSlide)
  previousBtn.addEventListener('click', previousSlide)
