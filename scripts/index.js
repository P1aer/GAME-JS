const canvas = document.querySelector("canvas")
const context = canvas.getContext('2d')
const playerHealth = document.getElementById('playerHealth')
const enemyHealth = document.getElementById('enemyHealth')
const Timer = document.getElementById('timer')
const message = document.getElementById('message')

let time = 6
let timeFunc

const GRAVITY = 0.7
const X_VELOCITY = 5
const Y_VELOCITY = 20
const HERO_HEIGHT = 150
const HERO_WIDTH = 50
const ATTACK_WIDTH = 100
const ATTACK_HEIGHT = 50
const ATTACK_HITBOX_TIME  = 100
const HERO_HEALTH = 100
const HERO_DAMAGE = 20
const ENEMY_DAMAGE = 20
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
    constructor({position, velocity,color,offset}) {
        this.position = position
        this.velocity = velocity
        this.height = HERO_HEIGHT
        this.width = HERO_WIDTH
        this.lastKey
        this.isAttacking
        this.attackHitBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: ATTACK_WIDTH,
            height: ATTACK_HEIGHT,
            offset,
        }
        this.color = color
        this.health = HERO_HEALTH
    }
    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x,this.position.y,this.width,this.height)

        if (this.isAttacking) {
            context.fillStyle = 'red'
            context.fillRect(
                this.attackHitBox.position.x,
                this.attackHitBox.position.y,
                this.attackHitBox.width,
                this.attackHitBox.height
            )
        }

    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        this.attackHitBox.position.x = this.position.x + this.attackHitBox.offset.x
        this.attackHitBox.position.y = this.position.y + this.attackHitBox.offset.y
        if (this.position.y +this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        }
        else  {
            this.velocity.y += GRAVITY
        }

    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, ATTACK_HITBOX_TIME)
    }
}


const player = new Sprite({
    position: HERO_POSITION,
    velocity : {
        x: 0,
        y:0
    },
    offset: {
        x: 0,
        y: 0
    },
    color: "blue"
})


const enemy = new Sprite({
    position:ENEMY_POSITION,
    velocity : {
        x: 0,
        y:0
    },
    offset: {
        x: -1 * HERO_WIDTH,
        y:0
    },
    color: "white"
})

const getWinner = ({player,enemy,timeFunc}) => {
    clearTimeout(timeFunc)
    message.style.display = 'flex'
    if (player.health === enemy.health){
        message.innerText = 'Tie'
    }
    else if (player.health > enemy.health) {
        message.innerText = 'Player 1 Wins'
    }
    else if (player.health < enemy.health) {
        message.innerText = 'Player 2 Wins'
    }
}
const decrTime = () => {
    if (time > 0) {
        timeFunc = setTimeout(decrTime,1000)
        time--
        Timer.innerText = time + ''
    }
    if (time === 0) {

        getWinner({player,enemy,timeFunc})
    }

}
decrTime()

const collision = (rect1,rect2) => {
   return (
       rect1.attackHitBox.position.x + rect1.attackHitBox.width >= rect2.position.x
       && rect1.attackHitBox.position.x  <= rect2.position.x + rect2.width
       && rect1.attackHitBox.position.y + rect1.attackHitBox.height >= rect2.position.y
       && rect1.attackHitBox.position.y <= rect2.position.y + rect2.height
   )
}

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

    if (player.isAttacking &&  collision(player,enemy)) {
        player.isAttacking = false
        enemy.health -= HERO_DAMAGE
        enemyHealth.style.width = enemy.health + '%'
    }

    if (enemy.isAttacking &&  collision(enemy,player)) {
        enemy.isAttacking = false
        player.health -= ENEMY_DAMAGE
        playerHealth.style.width = player.health + '%'
    }
    if (player.health <= 0 || enemy.health <= 0) {
        getWinner({player,enemy,timeFunc})
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
        case " ":
            player.attack()
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
        case "ArrowDown":
            enemy.attack()
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
