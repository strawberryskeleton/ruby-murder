
const slider = document.getElementById('slider')
const target = document.getElementById('target')
const scoreDisplay = document.getElementById('score')
const timerDisplay = document.getElementById('timer')
const track = document.getElementById('game-track')

let score = 0
let sliderTop = 0
let targetTop = 200

let timeLeft = 10
let gameActive = true
let gameInterval = null

const trackHeight = track.clientHeight
const trackWidth = track.clientWidth
const sliderHeight = slider.clientHeight
const targetHeight = target.clientHeight
const targetWidth = target.clientWidth

//  SCROLL SLIDER
window.addEventListener('wheel', (e) => {
    // website page should not move
    e.preventDefault()

    if (!gameActive) return

    const scrollDirection = e.deltaY > 0 ? 1 : -1
    sliderTop += scrollDirection * 25
    // sliderTop += e.deltaY

    const maxTop = trackHeight - sliderHeight

    if (sliderTop < 0) {
        sliderTop = 0
    }

    if (sliderTop > maxTop) {
        sliderTop = maxTop
    }

    slider.style.top = sliderTop + 'px'

    checkCollision()

}, {passive: false})

//  COLLISION DETECTION
function checkCollision () {
    const sliderBottom = sliderTop + sliderHeight
    const targetBottom = targetTop + targetHeight

    const isOverlapping = sliderTop < targetBottom && sliderBottom > targetTop

    // if (sliderTop < targetBottom && sliderBottom > targetTop) {

    // }

    if (isOverlapping) {
        score++
        scoreDisplay.innerText = score
        console.log(score)
        // setInterval(1000)

        moveTargetRandomly()
    }
}

//  MOVE TARGET TO NEW LOCATION
function moveTargetRandomly () {
    const maxTargetTop = trackHeight - targetHeight
    const maxTargetLeft = trackWidth - targetWidth

    targetTop = Math.floor(Math.random() * maxTargetTop)
    targetLeft = Math.floor(Math.random() * maxTargetLeft)

    target.style.top = targetTop + 'px'
    target.style.left = targetLeft + 'px'
}

//  SETTING GAME TIMER
function startTimer () {
    gameInterval = setInterval(() => {
        timeLeft--
        timerDisplay.innerText = timeLeft

        if (timeLeft <= 0) {
            endGame()
        }
    }, 1000)
}

function endGame () {
    gameActive = false
    clearInterval(gameInterval)

    alert(`Game Over! You scored ${score} in 60 seconds!`)
}

startTimer()