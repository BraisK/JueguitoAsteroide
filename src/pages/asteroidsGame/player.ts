export class Player {
    velocity: { x: number, y: number }
    size: number
    color: string = 'white'
    angle: number

    constructor(public x: number,public y: number) {
        this.velocity = { x: 0, y: 0 }
        this.size = 20
        this.angle = 0
    }

    draw(ctx:CanvasRenderingContext2D){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.beginPath()
        ctx.moveTo(this.size, 0)
        ctx.lineTo(-this.size/2,this.size/2)
        ctx.lineTo(-this.size/2,-this.size/2)
        ctx.closePath()
        ctx.fillStyle=this.color
        ctx.fill()
        ctx.restore()
    }
    update(){
        this.x +=this.velocity.x
        this.y +=this.velocity.y
    }
}