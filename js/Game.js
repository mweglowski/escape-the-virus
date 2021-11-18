class Game {
    constructor() {
        this.board = new Board(30, 15)
        this.playerUsername = 'martin'
        this.player = null
        this.ready = false
    }

    startGame() {
        this.ready = true
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
    async spreadVirus() {
        // first virus coordinates
        let x = 29
        let y = 0

        // update spaces, changing this.virus in each Space that has been infected
        // if player 
    }

    // Check if player reached the target
    checkForWin() {
        const [x, y] = [this.player.columnLocation, this.player.rowLocation]

        if (this.board.spaces[y][x].target != null) {
            this.ready = false
        }
    }

    // create player
    createPlayer() {

        const [x, y] = [this.board.playerStartPosition.x, this.board.playerStartPosition.y]

        const newPlayer = new Player(this.playerUsername, x, y)

        newPlayer.drawPlayerSquare()

        this.player = newPlayer

        // setting this.player in Space
        this.board.spaces[y][x].player = true

        // coloring player square
        // const playerSquare = document.getElementById(`square-${x}-${y}`)
        // playerSquare.style.backgroundColor = "skyblue"
    }

    handleKeydown(e) {
        if (!this.ready) return
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