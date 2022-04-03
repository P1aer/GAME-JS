class Sprite {
    constructor(
        {
            position,
            image,
            scale = 1,
            frame = 1,
            offset = {
                x: 0,
                y: 0
            }
        }
        ) {
        this.position = position
        this.image = new Image()
        this.image.src = image
        this.scale = scale
        this.frame = frame
        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameHold = SHOP_FRAME_HOLD
        this.offset = offset
    }
    draw() {
        context.drawImage(
            this.image,
            this.image.width / this.frame * this.currentFrame,
            0,
            this.image.width / this.frame,
                this.image.height,
                this.position.x - this.offset.x,
                this.position.y - this.offset.y,
            this.image.width / this.frame * this.scale,
            this.image.height * this.scale
        )
    }

    update() {
        this.draw()
        this.frameElapsed ++

        if (this.frameElapsed % this.frameHold === 0) {
            if (this.currentFrame < this.frame - 1) {
                this.currentFrame++
            }
            else {
                this.currentFrame = 0
            }
        }

    }
}
