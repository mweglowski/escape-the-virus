class Player {
    constructor(playerUsername, columnLocation, rowLocation, spaces) {
        this.playerUsername = playerUsername
        this.id = `player-${playerUsername}`
        this.columnLocation = columnLocation
        this.rowLocation = rowLocation
        this.spaces = spaces
        this.squareLength = 15
    }

    get playerHTMLElement() {
        return document.getElementById(this.id)
    }

    get elementStyleLeftNumber() {
        return Number(this.playerHTMLElement.style.left.slice(0, -2))
    }

    get elementStyleTopNumber() {
        return Number(this.playerHTMLElement.style.top.slice(0, -2))
    }

    // get offsetLeft() {
    //     return this.playerHTMLElement.offsetLeft
    // }

    // get offsetTop() {
    //     return this.playerHTMLElement.offsetTop
    // }

    // get styleTop() {
    //     return this.playerHTMLElement.style.top
    // }

    drawPlayerSquare() {
        const playerSquare = document.createElement('div')
        playerSquare.setAttribute('id', `player-${this.playerUsername}`)
        playerSquare.classList.add('square')
        playerSquare.classList.add('player')
        playerSquare.style.position = "absolute"
        playerSquare.style.top = `${8 + this.rowLocation * 15}px`
        playerSquare.style.left = `${8 + this.columnLocation * 15}px`
        
        document.getElementById('game-board-div').appendChild(playerSquare)
        console.log(this.x, this.y)
    }

    checkIfThereIsObstacle(x, y) {
        return this.spaces[y][x].obstacle ? true : false
    }

    moveUp() {

        // Check if after the move it is border / obstacle
        if (this.rowLocation !== 0 && !this.checkIfThereIsObstacle(this.columnLocation, this.rowLocation - 1)) {
            
            // move element changing its css top property
            this.playerHTMLElement.style.top = `${this.elementStyleTopNumber - this.squareLength}px`

            // change property this.player in Space when playerSquare move from its position and update this.player in next Space
            this.spaces[this.rowLocation][this.columnLocation].player = false
            this.spaces[this.rowLocation - 1][this.columnLocation].player = true

            // change local rowLocation of Player
            this.rowLocation -= 1

        } else {
            console.log('You can not go through obstacle/border!')
        }

        console.log(this.columnLocation, this.rowLocation)
    }

    moveRight() {
        const rightBorder = this.spaces[0].length - 1

        // Check if after the move it is border / obstacle
        if (this.columnLocation !== rightBorder && !this.checkIfThereIsObstacle(this.columnLocation + 1, this.rowLocation)) {
            
            // move element changing its css left property
            this.playerHTMLElement.style.left = `${this.elementStyleLeftNumber + this.squareLength}px`

            // change property this.player in Space when playerSquare move from its position and update this.player in next Space
            this.spaces[this.rowLocation][this.columnLocation].player = false
            this.spaces[this.rowLocation][this.columnLocation + 1].player = true

            // change local columnLocation of Player
            this.columnLocation += 1

        } else {
            console.log('You can not go through obstacle/border!')
        }

        console.log(this.columnLocation, this.rowLocation)
    }

    moveDown() {
        const bottomBorder = this.spaces.length - 1

        // Check if after the move it is border / obstacle
        if (this.rowLocation !== bottomBorder && !this.checkIfThereIsObstacle(this.columnLocation, this.rowLocation + 1)) {
            
            // move element changing its css top property
            this.playerHTMLElement.style.top = `${this.elementStyleTopNumber + this.squareLength}px`

            // change property this.player in Space when playerSquare move from its position and update this.player in next Space
            this.spaces[this.rowLocation][this.columnLocation].player = false
            this.spaces[this.rowLocation + 1][this.columnLocation].player = true

            // change local rowLocation of Player
            this.rowLocation += 1

        } else {
            console.log('You can not go through obstacle/border!')
        }

        console.log(this.columnLocation, this.rowLocation)
    }

    moveLeft() {

        // Check if after the move it is border / obstacle
        if (this.columnLocation !== 0 && !this.checkIfThereIsObstacle(this.columnLocation - 1, this.rowLocation)) {
            
            // move element changing its css left property
            this.playerHTMLElement.style.left = `${this.elementStyleLeftNumber - this.squareLength}px`

            // change property this.player in Space when playerSquare move from its position and update this.player in next Space
            this.spaces[this.rowLocation][this.columnLocation].player = false
            this.spaces[this.rowLocation][this.columnLocation - 1].player = true

            // change local rowLocation of Player
            this.columnLocation -= 1

        } else {
            console.log('You can not go through obstacle/border!')
        }

        console.log(this.columnLocation, this.rowLocation)
    }

}