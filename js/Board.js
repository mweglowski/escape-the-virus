class Board {
    // amount of rows and columns that is passed to the board constructor in Game.js will have result in board spaces
    constructor(columns, rows) {
        this.columns = columns
        this.rows = rows
        this.spaces = this.createSpaces()
        this.positionsOfObstacles = []
        this.targetPosition = null
        this.playerStartPosition = null

        this.virusStartPosition = null
    }

    // creates array of spaces
    createSpaces() {
        let spacesArray = []
        for (let y = 0; y < this.rows; y++) {
            let row = []
            for (let x = 0; x < this.columns; x++) {
                let newSpace = new Space(x, y)
                row.push(newSpace)
            }
            spacesArray.push(row)
        }

        return spacesArray
    }


    //  x-y     x-y ... x-y
    //  0-0     1-0    49-0
    //  0-1     1-1    49-1 
    //  0-2     1-2    49-2
    //  ...     ...     ...
    //  0-49    1-49   49-49

    // draws board in browser HTML
    drawBoard() {
        const gameBoardDiv = document.getElementById('game-board-div')

        for (let y = 0; y < this.spaces.length; y++) {
            let row = document.createElement('div')
            row.style.display = 'flex'
            for (let x = 0; x < this.spaces[y].length; x++) {
                let square = document.createElement('div')
                square.classList.add('square')
                square.setAttribute('id', `square-${x}-${y}`)
                row.appendChild(square)
            }
            gameBoardDiv.appendChild(row)
        }
    }

    // Draws n positions of obstacles 
    // Draws position of target
    // Draws start position of player
    // Draws position of virus spread start
    drawPositions(n) {
        for (let i = 0; i < n + 3; i++) {

            let emptyPosition = false

            while (emptyPosition === false) {
                const newPosition = {x: Math.round(Math.random() * (this.columns - 1)), y: Math.round(Math.random() * (this.rows - 1))}
    
                emptyPosition = true
    
                for (let position of this.positionsOfObstacles) {
                    if (newPosition.x === position.x && newPosition.y === position.y) {
                        emptyPosition = false
                        break
                    }
                }
    
                if (emptyPosition === true) {
                    if (i == n) {
                        this.targetPosition = newPosition
                    } else if (i == n + 1) {
                        this.playerStartPosition = newPosition
                    } else if (i == n + 2) {
                        this.virusStartPosition = newPosition
                    } else {
                        this.positionsOfObstacles.push(newPosition)
                    }
                }
            }
        }
    }

    // fill some spaces with Rocks
    createObstacles() {
        const numOfObstacles = 50

        // draw (numOfObstacles) positions of obstacles
        this.drawPositions(numOfObstacles)

        // fill specific Space with Obstacle (this.obstacle in Space Object)
        for (let i = 0; i < numOfObstacles; i++) {

            const [x, y] = [this.positionsOfObstacles[i].x, this.positionsOfObstacles[i].y]

            // setting this.obstacle in Space
            this.spaces[y][x].obstacle = new Obstacle(x, y)

            // coloring each square where is obstacle
            const obstacleSquare = document.getElementById(`square-${x}-${y}`)
            obstacleSquare.style.backgroundColor = "gray"
        }
    }

    // create target square
    createTarget() {
        const [x, y] = [this.targetPosition.x, this.targetPosition.y]

        // setting this.target in Space
        this.spaces[y][x].target = new Target(x, y)

        // coloring target square
        const targetSquare = document.getElementById(`square-${x}-${y}`)
        targetSquare.style.backgroundColor = "yellow"
    }

}