class Space {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.id = `space-${x}-${y}`
        this.obstacle = null
        this.target = null
        this.player = false
    }
}