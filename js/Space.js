class Space {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.id = `space-${x}-${y}`
        this.obstacle = null
        this.virus = null
        this.target = null
        this.player = false
    }
}