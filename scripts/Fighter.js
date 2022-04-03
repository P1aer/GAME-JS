class Fighter extends Sprite {
    constructor(
        {
            position,
            velocity,
            image,
            scale = 1,
            frame = 1,
            offset = {
                x: 0,
                y: 0
            },
            sprites,
            attackBox = {
                offset: {},
                width: undefined,
                height: undefined,
            }
    }) {
        super({
            image,
            scale,
            frame,
            position,
            offset
        })
        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameHold = HERO_FRAME_HOLD
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
            width: attackBox.width,
            height: attackBox.height,
            offset: attackBox.offset,
        }
        this.sprites = sprites
        this.health = HERO_HEALTH
        this.dead = false

        for (let sprite in this.sprites) {
            this.sprites[sprite].img = new Image()
            this.sprites[sprite].img.src = sprites[sprite].image
        }
    }

    update() {
        this.draw()
        if (!this.dead) {
            super.update()
        }
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        this.attackHitBox.position.x = this.position.x + this.attackHitBox.offset.x
        this.attackHitBox.position.y = this.position.y + this.attackHitBox.offset.y
        if (this.position.y +this.height + this.velocity.y >= canvas.height + BACKGROUND_OFFSET) {
            this.velocity.y = 0
            this.position.y = HERO_GROUND
        }
        else  {
            this.velocity.y += GRAVITY
        }

    }
    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
    }
    switchSprite(sprite) {

        if (this.image === this.sprites.death.img)
        {
            if(this.currentFrame === this.sprites.death.frames - 1) {
                this.dead = true
        }
            return
        }
        if (
            this.image === this.sprites.attack1.img
            && this.currentFrame < this.sprites.attack1.frames - 1
        ) {
            return
        }

        if (
            this.image === this.sprites.takeHit.img
            && this.currentFrame < this.sprites.takeHit.frames - 1
        ) {
            return
        }



        switch (sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.img) {
                    this.image = this.sprites.idle.img
                    this.frame = this.sprites.idle.frames
                    this.currentFrame = 0
                }

                break
            case 'run':
                if(this.image !== this.sprites.run.img) {
                    this.image = this.sprites.run.img
                    this.frame = this.sprites.run.frames
                    this.currentFrame = 0
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.img) {
                    this.image = this.sprites.jump.img
                    this.frame = this.sprites.jump.frames
                    this.currentFrame = 0
                }
                break
            case 'fall':
                if(this.image !== this.sprites.fall.img) {
                    this.image = this.sprites.fall.img
                    this.frame = this.sprites.fall.frames
                    this.currentFrame = 0
                }
                break
            case 'attack1':
                if(this.image !== this.sprites.attack1.img) {
                    this.image = this.sprites.attack1.img
                    this.frame = this.sprites.attack1.frames
                    this.currentFrame = 0
                }
                break
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.img) {
                    this.image = this.sprites.takeHit.img
                    this.frame = this.sprites.takeHit.frames
                    this.currentFrame = 0
                }
                break
            case 'death':
                if(this.image !== this.sprites.death.img) {
                    this.image = this.sprites.death.img
                    this.frame = this.sprites.death.frames
                    this.currentFrame = 0
                }
                break
        }
    }
    takeHit(damage) {
        this.health -= damage
        if ( this.health <= 0) {
            this.switchSprite('death')
        }
        else  {
            this.switchSprite('takeHit')
        }
    }
}
