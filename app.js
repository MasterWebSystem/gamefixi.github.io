const btnStart = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#timeList')
const gameTime = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0

const colors = ['red', 'orange', 'green']

btnStart.addEventListener('click', (event) => {
    event.preventDefault()

    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
       time = parseInt(event.target.getAttribute('data-time'))
       screens[1].classList.add('up')
       startGame()
       gameTime.innerHTML = `00:${time}`
       
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        circleRender()
    }
})




function startGame() {
    setInterval(Timer, 1000)
    circleRender()
    setTime(time)

}

function stopGame() {
    gameTime.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>
    <a href="index.html" style="display: block">Начать заново</a>`
    board.style.display = 'block'
}

function Timer() { 
    if (time === 0) {
        stopGame()
    } else {
        let current = --time

        if (time < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    gameTime.innerHTML = `00:${value}`

    if (value < 10) {
        gameTime.style.color = `red`
    }
}

function circleRender() {
    const circle = document.createElement('div')
    const size = getSize(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getSize(0, (width - size))
    const y = getSize(0, (height - size))
    const randomNumber = Math.round(Math.random() * (colors.length - 1))
    console.log(colors[randomNumber])
    
    
    circle.classList.add('circle')
    circle.style.background = `${colors[randomNumber]}`
    circle.style.boxShadow = `0 0 2px ${colors[randomNumber]}, 0 0 10px ${colors[randomNumber]}`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)

}

function getSize(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}



