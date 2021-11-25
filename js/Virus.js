class Virus {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.spaces = game.board.spaces
        this.id = `virus-${x}-${y}`
        this.startInfection = this.keepSpreading()
    }

    get gameBoardDiv() {
        return document.getElementById('game-board-div')
    }

    keepSpreading() {
        // draw HTML virus
        if (!game.ready) return

        const virus = document.createElement('div')
        virus.classList.add('square')
        virus.classList.add('virus')

        virus.style.left = `${8 + this.x * 15}px`
        virus.style.top = `${8 + this.y * 15}px`

        this.gameBoardDiv.appendChild(virus)
        console.log(this.x, this.y)

        setTimeout(() => {

            // spread to the next squares
            // top
            let topSpace = this.spaces[this.y - 1][this.x]

            if (topSpace.virus === null && topSpace.obstacle === null) {
                topSpace.virus = new Virus(this.x, this.y - 1)
                if (topSpace.player == true) {
                    game.checkForWinOrDefeat()
                }
            }

            // right
            let rightSpace = this.spaces[this.y][this.x + 1]

            if (rightSpace.virus === null && rightSpace.obstacle === null) {
                rightSpace.virus = new Virus(this.x + 1, this.y)
                if (rightSpace.player == true) {
                    game.checkForWinOrDefeat()
                }
            }

            // bottom
            let bottomSpace = this.spaces[this.y + 1][this.x]

            if (bottomSpace.virus === null && bottomSpace.obstacle === null) {
                bottomSpace.virus = new Virus(this.x, this.y + 1)
                if (bottomSpace.player == true) {
                    game.checkForWinOrDefeat()
                }
            }

            // left
            let leftSpace = this.spaces[this.y][this.x - 1]

            if (leftSpace.virus === null && leftSpace.obstacle === null) {
                leftSpace.virus = new Virus(this.x - 1, this.y)
                if (leftSpace.player == true) {
                    game.checkForWinOrDefeat()
                }
            }


        }, 2000)
        return null
    }
}