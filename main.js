
const slider = document.getElementById('slider')
const target = document.getElementById('target')
const scoreDisplay = document.getElementById('score')
const track = document.getElementById('game-track')

let score = 0
let sliderTop = 0
let targetTop = 200

const trackHeight = track.clientHeight
const sliderHeight = slider.clientHeight

window.addEventListener('wheel', (e) => {
    // website page should not move
    e.preventDefault();

    sliderTop += e.deltaY

    const maxTop = trackHeight - sliderHeight

    if (sliderTop < 0) {
        sliderTop = 0
    }

    if (sliderTop > maxTop) {
        sliderTop = maxTop
    }

    slider.style.top = sliderTop + 'px'

}, {passive: false})