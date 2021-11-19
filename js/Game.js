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

    // Spread the virus
    spreadVirus() {
        // first infected coordinates
        const [x, y] = [this.board.virusStartPosition.x, this.board.virusStartPosition.y]

        // infecting first space and start spreading
        this.board.spaces[y][x].virus = new Virus(x, y)
    }

    // Check if player reached the target
    checkForWin() {
        const [x, y] = [this.player.columnLocation, this.player.rowLocation]

        if (this.board.spaces[y][x].target != null) {

            // unable player to move since game has ended
            this.ready = false

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

            // remove infected squares
            const infectedSquares = document.querySelectorAll('.virus')
            infectedSquares.forEach(square => {
                square.remove()
            })

            // remove game board from body
            setTimeout(() => {
                document.getElementById('game-board-div').remove()
            }, 1000)
        }
    }

    // create player
    createPlayer() {

        const [x, y] = [this.board.playerStartPosition.x, this.board.playerStartPosition.y]

        const newPlayer = new Player(this.playerUsername, x, y)

        // drawing HTML player
        newPlayer.drawPlayerSquare()

        this.player = newPlayer

        // setting this.player in Space
        this.board.spaces[y][x].player = true
    }

    handleKeydown(e) {
        // unable player to move if game is not ready
        if (!this.ready) return

        // moving principles
        if (e.key == "ArrowUp") {
            this.player.moveUp()
            this.checkForWin()
        } 
        if (e.key == "ArrowRight") {
            this.player.moveRight()
            this.checkForWin()
        }
        if (e.key == "ArrowDown") {
            this.player.moveDown()
            this.checkForWin()
        } 
        if (e.key == "ArrowLeft") {
            this.player.moveLeft()
            this.checkForWin()
        }
    }
}