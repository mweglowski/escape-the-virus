const startButton = document.getElementById('start-game-btn')

const game = new Game()

startButton.addEventListener('click', (event) => {
    game.startGame()
    event.target.style.display = 'none'
})

window.addEventListener('keydown', (e) => {
    game.handleKeydown(e)
    console.log(e.key)
})
