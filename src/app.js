const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEL = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


const colors = ['#d95656', '#de9320', '#7ebb45', '#14d9cf', '#41aec7', '#1424d9', '#7845c5', '#c532da', '#4d0641', '#d21425']

function setColor(event) {
    const element = event.target
    const color = getColorRandom()
    element.style.backgroundColor =color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getColorRandom() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
function removeColor(event) {
    const element = event.target
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000`
}


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function finishGame() {
    timeEL.parentNode.classList.add('hide')
    board.innerHTML = `<h1> Cчет: <span class="primary">${score}</span></h1>`
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEL.innerHTML = `00:${value}`
}


function createRandomCircle() {
    const circle = document.createElement('div')

    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    circle.addEventListener('mouseover', setColor)
    circle.addEventListener('mouseleave', removeColor)
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


