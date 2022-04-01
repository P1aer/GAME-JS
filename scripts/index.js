const canvas = document.querySelector("canvas")
const context = canvas.getContext('2d')
let lastKey

const GRAVITY = 0.7
const X_VELOCITY = 5
const Y_VELOCITY = 20
const HERO_HEIGHT = 150
const ENEMY_POSITION = {
    x:400,
    y:100
}
const HERO_POSITION = {
    x:0,
    y:0
}
const KEYS = {
    a: {
        pressed:false
    },
    d: {
        pressed: false
    },
    ArrowLeft : {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = HERO_HEIGHT
        this.lastKey
    }
    draw() {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x,this.position.y,50,150)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y +this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        }
        else  {
            this.velocity.y += GRAVITY
        }

    }
}


const player = new Sprite({
    position: HERO_POSITION,
    velocity : {
        x: 0,
        y:0
    }
})


const enemy = new Sprite({
    position:ENEMY_POSITION,
    velocity : {
        x: 0,
        y:0
    }
})

const animate = () => {
   window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0,0,canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    if (KEYS.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -1 * X_VELOCITY
    }
    else if (KEYS.d.pressed && player.lastKey === 'd') {
        player.velocity.x =  X_VELOCITY
    }
    enemy.velocity.x = 0
    if (KEYS.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -1 * X_VELOCITY
    }
    else if (KEYS.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x =  X_VELOCITY
    }
}
animate()

window.addEventListener('keydown',(event) => {
    switch (event.key) {
        case "d" :
            KEYS.d.pressed = true
            player.lastKey = "d"
            break;
        case "a" :
            KEYS.a.pressed = true
            player.lastKey = "a"
            break;
        case "w" :
            player.velocity.y = -1 *  Y_VELOCITY
            break;
        case "ArrowRight" :
            KEYS.ArrowRight.pressed = true
            enemy.lastKey = "ArrowRight"
            break;
        case "ArrowLeft" :
            KEYS.ArrowLeft.pressed = true
            enemy.lastKey = "ArrowLeft"
            break;
        case "ArrowUp" :
            enemy.velocity.y = -1 *  Y_VELOCITY
            break;
        default:
            break;
    }
})
window.addEventListener('keyup',(event) => {
    switch (event.key) {
        case "d" :
            KEYS.d.pressed = false
            break;
        case "a" :
            KEYS.a.pressed = false
            break;
        case "ArrowRight" :
            KEYS.ArrowRight.pressed = false
            break;
        case "ArrowLeft" :
            KEYS.ArrowLeft.pressed = false
            break;
        default:
            break;
    }
})
