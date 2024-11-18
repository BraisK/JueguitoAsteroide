import { Player } from "./player"
export const WIDTH = 800
export const HEIGHT = 600

export default function initGame() {
    const canvas = document.getElementById('miCanvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    
    canvas.width = WIDTH
    canvas.height = HEIGHT
    canvas.style.border = '1px solid white'

    const player1 = new Player(WIDTH/2, HEIGHT/2) 

    function gameLoop() {
        ctx?.clearRect(0, 0, canvas.width, canvas.height)

        player1.draw(ctx)
        player1.update()        

        requestAnimationFrame(gameLoop)


    }

    gameLoop()

    document.addEventListener('keydown', (e) => {

    })

    document.addEventListener('keyup', (e) => {

    })
}