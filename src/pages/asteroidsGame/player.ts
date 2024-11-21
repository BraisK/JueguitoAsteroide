import { Bullet } from "./bullet"
import { Mobile } from "./mobile"

export class Player extends Mobile {
    //velocity: { x: number, y: number }
    //size: number
    color: string = 'white'
    //angle: number
    //thrust: number // aceleracion
    // friction: number

    isRotatingLeft: boolean
    isRotatingRight: boolean
    isThrusting: boolean

    rotationSpeed: number

    bullets: Bullet[] = []

    constructor(public x: number, public y: number) {
        super(x, y, 0, 0.09, 20)
        //this.velocity = { x: 0, y: 0 }
        //this.size = 20
        //this.angle = 0
        //this.thrust = 0.09
        // this.friction = 0.99
        this.isRotatingLeft = false
        this.isRotatingRight = false
        this.isThrusting = false
        this.rotationSpeed = 0.05
    }


    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.beginPath()
        ctx.moveTo(this.size, 0)
        ctx.lineTo(-this.size / 2, this.size / 2)
        ctx.lineTo(-this.size / 2, -this.size / 2)
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }



    update(friction: number = 0.99) {

        if (this.isThrusting) {
            this.velocity.x += Math.cos(this.angle) * this.thrust
            this.velocity.y += Math.sin(this.angle) * this.thrust
        }

        if (this.isRotatingLeft) this.angle -= this.rotationSpeed
        if (this.isRotatingRight) this.angle += this.rotationSpeed

        super.update(friction)
        this.sphericWorld()

    }

    shot() {
        const newBullet = new Bullet(this.x, this.y, this.angle)

        this.bullets.push(newBullet)
    }

}