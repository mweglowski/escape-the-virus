class Virus {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.spaces = game.board.spaces
        this.id = `virus-${x}-${y}`
    }
}