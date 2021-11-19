class Game {
    constructor() {
        this.board = new Board(30, 15)
        this.playerUsername = 'martin'
        this.player = null
        this.ready = false
    }

    startGame() {
        // player is able to move (handleKeydown is on)
        this.ready = true

        // create board div to whom spaces (squares) will be appended
        const gameBoardDiv = document.createElement('div')
        gameBoardDiv.setAttribute('id', `game-board-div`)
        document.body.appendChild(gameBoardDiv)

        // create board and draw it
        this.board.drawBoard()

        // fill board with obstacles
        this.board.createObstacles()

        // place target in random square
        this.board.createTarget()

        // create player and place it in random square
        this.createPlayer()

        // start the spread of virus
        this.spreadVirus()
    }

    // Create new game
    playAgain() {
        const questionDiv = document.querySelector('.next-game-div')

        setTimeout(() => {
            questionDiv.style.top = "100px"
        }, 2000)

        const yesControl = document.querySelector('.control-btn-yes')
        yesControl.addEventListener('click', () => {
            
            this.clearBody()

            game = new Game()

            game.startGame()

            questionDiv.style.top = "-200px"
        })

        const noControl = document.querySelector('.control-btn-no')
        noControl.addEventListener('click', () => {
            this.clearBody()

            questionDiv.style.top = "-200px"
        })
    }

    // Spread the virus
    spreadVirus() {
        // first infected coordinates
        const [x, y] = [this.board.virusStartPosition.x, this.board.virusStartPosition.y]

        // infecting first space and start spreading
        this.board.spaces[y][x].virus = new Virus(x, y)
    }

    // Remove board and every element that belong to it
    clearBody() {
        // remove infected squares
        const infectedSquares = document.querySelectorAll('.virus')
        infectedSquares.forEach(square => {
            square.remove()
        })

        const gameBoardDiv = document.getElementById('game-board-div')

        // remove game board from body
        gameBoardDiv.remove()
    }

    // Show win notification
    showWin() {
        // hide player
        const HTMLplayer = document.getElementById(`player-${this.playerUsername}`)
        HTMLplayer.style.display = "none"

        // notificate player about the win
        const winDiv = document.getElementsByClassName('win-div')[0]
        winDiv.style.top = "0px"

        // hide win-div notification
        setTimeout(() => {
            winDiv.style.top = "-100px"
        }, 2000)
    }

    // Show defeat notification
    showDefeat() {
        const defeatDiv = document.querySelector('.defeat-div')
        defeatDiv.style.top = "0px"

        // hide defeat notification
        setTimeout(() => {
            defeatDiv.style.top = "-100px"
        }, 2000)
    }

    // Check if player reached the target
    checkForWinOrDefeat() {
        const [x, y] = [this.player.columnLocation, this.player.rowLocation]

        const playerLocationSpace = this.board.spaces[y][x]
        
        // Check if player reached the target, if yes show win notification
        if (playerLocationSpace.target != null && this.ready) {
            // unable player to move since game has ended
            this.ready = false
            
            // check if target space is infected
            if (playerLocationSpace.virus != null) {
                this.showDefeat()
                this.playAgain()
                return
            } else {
                this.showWin()
                this.playAgain()
                return
            }
        }

        // Check if player has been infected, if yes show defeat notification
        if (playerLocationSpace.virus != null && this.ready) {
            // unable player to move
            this.ready = false
            
            // check if in infected place currently is either player and target
            if (playerLocationSpace.target != null && playerLocationSpace.player == true) {
                this.showWin()
                this.playAgain()
                return
            } else {
                this.showDefeat()
                this.playAgain()
                return
            }
        }
    }

    // create player
    createPlayer() {

        const [x, y] = [this.board.playerStartPosition.x, this.board.playerStartPosition.y]

        const newPlayer = new Player(this.playerUsername, x, y)

        // drawing HTML player
        newPlayer.drawPlayerSquare()

        this.player = newPlayer

        // placing player in specific Space
        this.board.spaces[y][x].player = true
    }

    // Listen to key downs
    handleKeydown(e) {
        // unable player to move if game is not ready
        if (!this.ready) return

        // moving principles
        if (e.key == "ArrowUp") {
            this.player.moveUp()
            this.checkForWinOrDefeat()
        } 
        if (e.key == "ArrowRight") {
            this.player.moveRight()
            this.checkForWinOrDefeat()
        }
        if (e.key == "ArrowDown") {
            this.player.moveDown()
            this.checkForWinOrDefeat()
        } 
        if (e.key == "ArrowLeft") {
            this.player.moveLeft()
            this.checkForWinOrDefeat()
        }
    }
}