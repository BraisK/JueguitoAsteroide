import { Asteroid } from "./asteroid"
import { EdgeAsteroidFactory } from "./asteroidFactory"
import { Player } from "./player"
export const WIDTH = 800
export const HEIGHT = 600

export default function initGame() {
    const canvas = document.getElementById('miCanvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')


    canvas.width = WIDTH
    canvas.height = HEIGHT
    canvas.style.border = '1px solid white'

    const player1 = new Player(WIDTH / 2, HEIGHT / 2)
    let asteroids: Asteroid[] = []
    const PLAYER_FRICTION = 0.99
    const ASTEROID_FRICTION = 1

    asteroids.push(new EdgeAsteroidFactory().create())
    asteroids.push(new EdgeAsteroidFactory().create())

    setInterval(() => {
        const newAsteroid = new EdgeAsteroidFactory().create()
        asteroids.push(newAsteroid)
    }, 1000)

    function gameLoop() {
        if (!ctx) return
        ctx?.clearRect(0, 0, canvas.width, canvas.height)

        player1.draw(ctx)
        player1.update(PLAYER_FRICTION)

        player1.bullets = player1.bullets.filter(bullet => !bullet.isOutOfBounds())

        player1.bullets.forEach(bullet => {
            bullet.draw(ctx)
            bullet.update(1)
        })

        asteroids = asteroids.filter(asteroid => !asteroid.isOutOfBounds())

        asteroids.forEach(asteroid => {
            asteroid.update(ASTEROID_FRICTION)
            asteroid.draw(ctx)
        })

        // Destruir asteroides fuera del mundo

        requestAnimationFrame(gameLoop)


    }

    gameLoop()



    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') player1.isRotatingLeft = true
        if (e.key === 'ArrowRight') player1.isRotatingRight = true
        if (e.key === 'ArrowUp') player1.isThrusting = true
        if (e.key.toLowerCase() === 'p') player1.shot()
    })

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') player1.isRotatingLeft = false
        if (e.key === 'ArrowRight') player1.isRotatingRight = false
        if (e.key === 'ArrowUp') player1.isThrusting = false
    })
}