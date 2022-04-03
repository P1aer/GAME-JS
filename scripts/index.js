const canvas = document.querySelector("canvas")
const context = canvas.getContext('2d')
const playerHealth = document.getElementById('playerHealth')
const enemyHealth = document.getElementById('enemyHealth')
const Timer = document.getElementById('timer')
const message = document.getElementById('message')

let time = 91
let timeFunc

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: "./assets/background.png"
})

const shop = new Sprite({
    position:SHOP_POSITION,
    image: "./assets/shop.png",
    scale: SHOP_SCALE,
    frame: SHOP_FRAMES
})

const player = new Fighter({
    position: HERO_POSITION,
    velocity : {
        x: 0,
        y:0
    },
    offset: HERO_OFFSET,
    image: "./assets/samuraiMack/Idle.png",
    frame: HERO_FRAME,
    scale: HERO_SCALE,
    sprites : {
        idle : {
            image: "./assets/samuraiMack/Idle.png",
            frames: HERO_FRAME
        },
        run : {
            image : "./assets/samuraiMack/Run.png",
            frames: HERO_FRAME
        },
        jump : {
            image : "./assets/samuraiMack/Jump.png",
            frames: HERO_FRAME_JUMP
        },
        fall : {
            image : "./assets/samuraiMack/Fall.png",
            frames: HERO_FRAME_JUMP
        },
        attack1: {
            image : "./assets/samuraiMack/Attack1.png",
            frames: HERO_FRAME_ATTACK
        },
        takeHit : {
            image : "./assets/samuraiMack/Take hit.png",
            frames: HERO_FRAME_TAKE_HIT
        },
        death: {
            image : "./assets/samuraiMack/Death.png",
            frames: HERO_FRAME_DEATH
        },
    },
    attackBox: {
        offset: ATTACK_OFFSET,
        width: ATTACK_WIDTH,
        height: ATTACK_HEIGHT
    }
})

const enemy = new Fighter({
    position:ENEMY_POSITION,
    velocity : {
        x: 0,
        y:0
    },
    offset: ENEMY_OFFSET,
    image: "./assets/kenji/Idle.png",
    frame: ENEMY_FRAME_IDLE,
    scale: HERO_SCALE,
    sprites : {
        idle : {
            image: "./assets/kenji/Idle.png",
            frames: ENEMY_FRAME_IDLE
        },
        run : {
            image : "./assets/kenji/Run.png",
            frames: HERO_FRAME
        },
        jump : {
            image : "./assets/kenji/Jump.png",
            frames: HERO_FRAME_JUMP
        },
        fall : {
            image : "./assets/kenji/Fall.png",
            frames: HERO_FRAME_JUMP
        },
        attack1: {
            image : "./assets/kenji/Attack1.png",
            frames: ENEMY_FRAME_ATTACK
        },
        takeHit : {
            image : "./assets/kenji/Take hit.png",
            frames: ENEMY_FRAME_TAKE_HIT
        },
        death: {
            image : "./assets/kenji/Death.png",
            frames: ENEMY_FRAME_DEATH
        },
    },
    attackBox: {
        offset: ENEMY_ATTACK_OFFSET,
        width: ENEMY_ATTACK_WIDTH,
        height: ATTACK_HEIGHT
    }
})


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


const animate = () => {
   window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0,0,canvas.width, canvas.height)
    background.update()
    shop.update()
    context.fillStyle = 'rgba(255,255,255,0.15)'
    context.fillRect(0,0,canvas.width, canvas.height)
    player.update()
    enemy.update()


    player.velocity.x = 0

    if (KEYS.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -1 * X_VELOCITY
        player.switchSprite('run')
    }
    else if (KEYS.d.pressed && player.lastKey === 'd') {
        player.velocity.x =  X_VELOCITY
        player.switchSprite('run')
    }
    else {
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0 ) {
        player.switchSprite('jump')
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    enemy.velocity.x = 0

    if (KEYS.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -1 * X_VELOCITY
        enemy.switchSprite('run')
    }
    else if (KEYS.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x =  X_VELOCITY
        enemy.switchSprite('run')
    }
    else {
        enemy.switchSprite('idle')
    }

    if (enemy.velocity.y < 0 ) {
        enemy.switchSprite('jump')
    }
    else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    if (
        player.isAttacking
        &&  collision(player,enemy)
        && player.currentFrame === HERO_ATTACK_DAMAGE_FRAME
    ) {
        enemy.takeHit(HERO_DAMAGE)
        player.isAttacking = false
        gsap.to(enemyHealth,{
            width: enemy.health + '%'
        })
    }

    if (  player.isAttacking  && player.currentFrame === HERO_ATTACK_DAMAGE_FRAME) {
        player.isAttacking = false
    }

    if (
        enemy.isAttacking
        &&  collision(enemy,player)
        && enemy.currentFrame === ENEMY_ATTACK_DAMAGE_FRAME
    ) {
       player.takeHit(ENEMY_DAMAGE)
        enemy.isAttacking = false
        gsap.to(playerHealth,{
            width: player.health + '%'
        })
    }

    if (  enemy.isAttacking  && enemy.currentFrame === ENEMY_ATTACK_DAMAGE_FRAME) {
        enemy.isAttacking = false
    }


    if ((player.health <= 0 || enemy.health <= 0) && message.style.display !== 'flex' ) {
        getWinner({player,enemy,timeFunc})
    }
}

animate()

window.addEventListener('keydown',(event) => {
    if (!player.dead) {
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
                player.velocity.y = -1 * Y_VELOCITY
                break;
            case " ":
                player.attack()
                break;
            default:
                break;

        }
    }
        if (!enemy.dead) {
            switch (event.key) {
                case "ArrowRight" :
                    KEYS.ArrowRight.pressed = true
                    enemy.lastKey = "ArrowRight"
                    break;
                case "ArrowLeft" :
                    KEYS.ArrowLeft.pressed = true
                    enemy.lastKey = "ArrowLeft"
                    break;
                case "ArrowUp" :
                    enemy.velocity.y = -1 * Y_VELOCITY
                    break;
                case "ArrowDown":
                    enemy.attack()
                    break;
                default:
                    break;
            }
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
