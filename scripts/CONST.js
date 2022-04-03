const GRAVITY = 0.7
const X_VELOCITY = 5
const Y_VELOCITY = 20
const ATTACK_WIDTH = 160
const ATTACK_HEIGHT = 50
const ENEMY_ATTACK_WIDTH = 170
const ATTACK_OFFSET = {
    x: 100,
    y:50
}
const ENEMY_ATTACK_OFFSET = {
    x: -170,
    y:50
}
const HERO_HEALTH = 100
const HERO_HEIGHT = 150
const HERO_WIDTH = 50
const HERO_FRAME = 8
const HERO_SCALE = 2.5
const HERO_FRAME_HOLD = 5
const HERO_FRAME_JUMP = 2
const HERO_FRAME_TAKE_HIT = 4
const HERO_FRAME_DEATH = 6
const HERO_GROUND = 330
const HERO_FRAME_ATTACK = 6
const HERO_OFFSET = {
    x: 215,
    y:156
}
const HERO_ATTACK_DAMAGE_FRAME = 4
const ENEMY_ATTACK_DAMAGE_FRAME = 2
const HERO_DAMAGE = 20

const ENEMY_OFFSET = {
    x: 215,
    y:170
}
const ENEMY_DAMAGE = 10
const ENEMY_FRAME_IDLE = 4
const ENEMY_FRAME_DEATH = 7
const ENEMY_FRAME_TAKE_HIT = 3
const ENEMY_FRAME_ATTACK = 4


const BACKGROUND_OFFSET = -96;

const SHOP_SCALE = 2.75
const SHOP_POSITION =  {
    x: 600,
    y: 128
}
const SHOP_FRAMES = 6
const SHOP_FRAME_HOLD = 6
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

const getWinner = ({player,enemy,timeFunc}) => {
    clearTimeout(timeFunc)
    message.style.display = 'flex'
    if (player.health === enemy.health) {
        message.innerText = 'Tie'
    } else if (player.health > enemy.health) {
        message.innerText = 'Player 1 Wins'
    } else if (player.health < enemy.health) {
        message.innerText = 'Player 2 Wins'
    }
}

const collision = (rect1,rect2) => {
    return (
        rect1.attackHitBox.position.x + rect1.attackHitBox.width >= rect2.position.x
        && rect1.attackHitBox.position.x  <= rect2.position.x + rect2.width
        && rect1.attackHitBox.position.y + rect1.attackHitBox.height >= rect2.position.y
        && rect1.attackHitBox.position.y <= rect2.position.y + rect2.height
    )
}
