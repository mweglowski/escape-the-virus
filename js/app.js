const startButton = document.getElementById('start-game-btn')

let game = null

function start() {
    game = new Game()
    game.startGame()
}


startButton.addEventListener('click', (event) => {
    start()
    event.target.style.display = 'none'
})

window.addEventListener('keydown', (e) => {
    if (startButton.style.display != 'none') {
        if (e.key == "Enter") {
            start()
            startButton.style.display = 'none'
        }
    }
})

window.addEventListener('keydown', (e) => {
    game.handleKeydown(e)
})


