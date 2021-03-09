namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
    export const Box = SpriteKind.create()
    export const DestroyableBox = SpriteKind.create()
    export const Title = SpriteKind.create()
    export const PassThru = SpriteKind.create()
    export const Barrier = SpriteKind.create()
    export const Lava = SpriteKind.create()
    export const Life = SpriteKind.create()
    export const SceneSprite = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const bossProjectile = SpriteKind.create()
    export const badEnd = SpriteKind.create()
    export const goodEnd = SpriteKind.create()
    export const DoorToSomething = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Flier, SpriteKind.PassThru, function (sprite, otherSprite) {
    sprite.y += -1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (enemycount > 0) {
        sprite.destroy()
        otherSprite.destroy(effects.coolRadial, 500)
        info.changeScoreBy(5)
        enemycount += -1
    } else if (enemycount == 0) {
        sprite.destroy()
        otherSprite.destroy(effects.coolRadial, 500)
        info.changeScoreBy(5)
        enemycount += 0
    }
    if (currentLevel == 7) {
        enemyKill += 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(1)
        music.jumpDown.play()
    } else {
        info.changeLifeBy(-1)
        sprite.say("oof", invincibilityPeriod)
        pause(invincibilityPeriod)
    }
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
function giveIntroduction () {
    game.setDialogFrame(img`
        c c b b b b b b b b b b c c . . 
        c 1 1 1 1 1 1 1 1 1 1 1 1 c . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        b 1 1 1 1 1 1 1 1 1 1 1 1 b . . 
        c 1 1 1 1 1 1 1 1 1 1 1 1 c . . 
        c c b b b b b b b b b b c c . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . b b 1 1 1 1 b b . . . . 
        . . . . b 1 1 1 1 1 1 b . . . . 
        . . . b 1 1 1 b b 1 1 1 b . . . 
        . . . b 1 1 b 1 1 b 1 1 b . . . 
        . . . b 1 1 b b b b 1 1 b . . . 
        . . . b 1 1 b 1 1 b 1 1 b . . . 
        . . . . b 1 1 1 1 1 1 b . . . . 
        . . . . b b 1 1 1 1 b b . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    showInstruction("Scientist: Ah. You're Awake. You are...?")
    name = game.askForString("What is your name?")
    showInstruction("Ah I remember now. You're that " + name + " guy that our Lieutenant has been talking about.")
    showInstruction("Scientist: Your goal is to exterminate all slimes.")
    showInstruction("Scientist: You can move with the arrow keys.")
    showInstruction("Scientist: You can jump with the A key.")
    showInstruction("Scientist: Crouch by using the down key.")
    showInstruction("Scientist: Make sure to avoid the lava blocks. They hurt you..")
    showInstruction("Scientist: Good luck, you'll need it.")
}
function endMusic () {
    music.setTempo(131)
    for (let index = 0; index < 1; index++) {
        music.playTone(523, music.beat(BeatFraction.Whole))
        music.playTone(349, music.beat(BeatFraction.Whole))
        music.playTone(392, music.beat(BeatFraction.Whole))
        music.playTone(349, music.beat(BeatFraction.Whole))
        music.playTone(247, music.beat(BeatFraction.Whole))
        music.playTone(349, music.beat(BeatFraction.Whole))
        music.playTone(392, music.beat(BeatFraction.Whole))
        music.playTone(349, music.beat(BeatFraction.Whole))
        music.playTone(233, music.beat(BeatFraction.Whole))
        music.playTone(349, music.beat(BeatFraction.Whole))
        music.playTone(392, music.beat(BeatFraction.Whole))
        music.playTone(466, music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Whole))
        music.playTone(392, music.beat(BeatFraction.Whole))
        music.playTone(349, music.beat(BeatFraction.Whole))
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
}
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . f . . . . . . . . 
        . . . . . . f 1 f . . . . . . . 
        . . . . . f f 9 1 f . . . . . . 
        . . . . . f 6 f 1 f f . . . . . 
        . . . . . f 6 6 f 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 6 9 1 f . . . . . 
        . . . . . f 6 f f 1 f . . . . . 
        . . . . . . f 6 6 f f . . . . . 
        . . . . . . . f 6 f . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Barrier, function (sprite, otherSprite) {
    if (enemycount < 1) {
        sprite.destroy()
        otherSprite.destroy(effects.disintegrate, 500)
        music.powerDown.play()
    }
})
function spawnBoxes () {
    // enemy that moves back and forth
    for (let value11 of tiles.getTilesByType(assets.tile`tile15`)) {
        Crate = sprites.create(img`
            . f f f f f f f f f f f f f f . 
            f e e e e e e e e e e e e e e f 
            f e e e e e e e e e e e e e e f 
            f f f f f f f f f f f f f f f f 
            f e e f e e e e e e e e f e e f 
            f e e f e e e e e e e e f e e f 
            f e e f f f f f f f f f f e e f 
            f e e f e e e e e e e e f e e f 
            f e e f e e e e e e e e f e e f 
            f e e f f f f f f f f f f e e f 
            f e e f e e e e e e e e f e e f 
            f e e f e e e e e e e e f e e f 
            f f f f f f f f f f f f f f f f 
            f e e e e e e e e e e e e e e f 
            f e e e e e e e e e e e e e e f 
            . f f f f f f f f f f f f f f . 
            `, SpriteKind.DestroyableBox)
        tiles.placeOnTile(Crate, value11)
        tiles.setTileAt(value11, assets.tile`tile0`)
    }
    // enemy that moves back and forth
    for (let value12 of tiles.getTilesByType(assets.tile`tile17`)) {
        PassThruBox = sprites.create(img`
            c c c c c c c c c c c c c c c c 
            c b 1 1 1 1 1 1 1 1 1 1 1 1 1 c 
            c b 1 1 1 1 1 1 1 1 1 1 1 1 1 c 
            . c c c c c c c c c c c c c c . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.PassThru)
        tiles.placeOnTile(PassThruBox, value12)
        tiles.setTileAt(value12, assets.tile`tile0`)
    }
    // enemy that moves back and forth
    for (let value13 of tiles.getTilesByType(assets.tile`tile18`)) {
        Barrier2 = sprites.create(img`
            b c 9 9 9 9 9 9 9 9 9 9 9 9 c b 
            c . . . . . . . . . . . . . . c 
            . . . . . . . . . . . . . . . . 
            c . . . . . . . . . . . . . . c 
            b c 9 9 9 9 9 9 9 9 9 9 9 9 c b 
            c . . . . . . . . . . . . . . c 
            . . . . . . . . . . . . . . . . 
            c . . . . . . . . . . . . . . c 
            b c 9 9 9 9 9 9 9 9 9 9 9 9 c b 
            c . . . . . . . . . . . . . . c 
            . . . . . . . . . . . . . . . . 
            c . . . . . . . . . . . . . . c 
            b c 9 9 9 9 9 9 9 9 9 9 9 9 c b 
            c . . . . . . . . . . . . . . c 
            . . . . . . . . . . . . . . . . 
            c . . . . . . . . . . . . . . c 
            `, SpriteKind.Barrier)
        tiles.placeOnTile(Barrier2, value13)
        tiles.setTileAt(value13, assets.tile`tile0`)
    }
    // enemy that moves back and forth
    for (let value14 of tiles.getTilesByType(assets.tile`tile19`)) {
        lavaBlock = sprites.create(img`
            .4444444444444444.
            222222222222224454
            225222222222244554
            225224422225245114
            222225522222245514
            222224422222255514
            222222222222255544
            222422222224455544
            e22542222244555424
            e22222224445155424
            e22222444551155424
            e22244555515554224
            e44455555555442224
            e45511554444422224
            e55155442222522224
            e55554222224522424
            e55542222222224524
            .eeeeeeeeeeeeeeee.
            `, SpriteKind.Lava)
        tiles.placeOnTile(lavaBlock, value14)
        tiles.setTileAt(value14, assets.tile`tile0`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.baDing.play()
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -6 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -6 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(4, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentLevel >= 5) {
        if (controller.down.isPressed()) {
            if (heroFacingLeft) {
                gunshot = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . f f f f f f f . . . . . . 
                    . . f f f f . . . . . . . . . . 
                    . . . f f f f f . . . f . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, hero, -200, 0)
            } else if (!(heroFacingLeft)) {
                gunshot = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . f f f f f f f f . . 
                    . . . . . . . . . . . f f f f . 
                    . . . f . . . . . f f f f f . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, hero, 200, 0)
            }
        } else if (controller.up.isPressed()) {
            gunshot = sprites.createProjectileFromSprite(img`
                . . . . . . . f . . . . . . . 
                . . . . . . f f f . . . . . . 
                . . . . . . f f f . . . . . . 
                . . . . . . f f f . . . . . . 
                . . . . . . f . f . . . . . . 
                . . . . . . f . f . . . . . . 
                . . . . . . f . f . . . . . . 
                . . . . . . f . . . . . . . . 
                . . . . . . f . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . f . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                `, hero, 0, -200)
        } else if (heroFacingLeft) {
            gunshot = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . f f f f f f f . . . . . . 
                . . f f f f . . . . . . . . . . 
                . . . f f f f f . . . f . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, hero, -200, 0)
        } else if (!(heroFacingLeft)) {
            gunshot = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . f f f f f f f f . . 
                . . . . . . . . . . . f f f f . 
                . . . f . . . . . f f f f f . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, hero, 200, 0)
        }
        music.pewPew.play()
    } else {
        showInstruction("Scientist: No. You cannot use this yet!")
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PassThru, function (sprite, otherSprite) {
    sprite.y += 5
})
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        ................
        ................
        ......ffff......
        .....f1111f.....
        ....f111111f....
        ....f1f1f11f....
        ....f111111f....
        ....f111111f....
        .....f1111f.....
        ......ffff......
        ......f11f......
        .....f1111f.....
        .....f1111f.....
        .....f111f......
        ....ff111ff.....
        ...f1f1ff11f....
        ...f1f1ff11f....
        ....ff1f.ff.....
        .....f1f.f1f....
        .....f1f.f1f....
        .....f1f..f1f...
        ....ff1ff.f1f...
        ....f111ff11f...
        ..ff1111f1111f..
        ..ffffffffffff..
        `)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        ................
        ................
        .....ffff.......
        ....f1111f......
        ...f111111f.....
        ...f11f1f1f.....
        ...f111111f.....
        ...f111111f.....
        ....f1111f......
        .....ffff.......
        .....f11f.......
        ....f1111f......
        ....f1111f......
        .....f111f......
        ....ff111ff.....
        ...f11f11f1f....
        ...f11ff1f1f....
        ....ffff1ff.....
        ...f1f.f1f......
        ...f1f.f1f......
        ..f1f..f1f......
        ..f1f.ff1ff.....
        ..f11ff111f.....
        .f1111f1111ff...
        .ffffffffffff...
        `)
}
function endCutscene () {
    end2 = sprites.create(img`
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888881888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888188888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888fffffffff888888888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888ff1bcccccccff8888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f11bbcccccccccf888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccf88888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccf88888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bbccccccccccccf8888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bbccccccccccccf8888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccccf8888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccccf8888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccccf8888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccccf8888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccccf8888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccccf8888888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccccf8888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f11bbcccccccccccf88888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f111bcccccccccccf88888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f11bccccccccccffff888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888fff1bcccccccfffcccf88888888888888888888888888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888ff1bcfffffffffccfccccf8888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888f11bcccccccccccccfccccf8888888888888888888888888888888888
        4444444444444444444444444444444444444444888888888888888888888888888888888888888888888888888888888888888f11bccccccccccccccfcccf8888888888888888888888888888888888
        4444444444444444444444444444444444444444444444488888888888888888888888888888888888888888888888888888888f1bbccccccccccccccfccccf888888888888888888888888888888888
        4444444444444444444444444444444444444444444444444444888888888888888888888888888888888888888888888888888f1bbccccccccccccccfccccf888888888888888888888888888888888
        4444444444444444444444444444444444444444444444444444444488888888888888888888888888888888888888888888888f1bbcccccccccccccccfcccf888888888888888888888888888881888
        4444444444444444444444444444444444444444444444444444444444448888888888888888888888888888888888888888888f1bbcccccccccccccccfcccf888888888888888888888888888888888
        4444444444444444444444444444444444444444444444444444444444444444888888888888888888888888888888888888888f1bbccfccccccccccccfcccf888888888888888888888888888888888
        4444444444444444444444444444444444444444444444444444444444444444444488888888888888888888888888888888888f1bbccfccccccccccccfcccf888888888888888888888888888888888
        4444444444444444444444444444444444444444444444444444444444444444444444448888888888888888888888888888888f1bbccfccccccccccccfcccf888888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444888888888888888888888888888f11bbccfccccccccccccfcccf888888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444448888888888888888888888888f1bbbccfccccccccccccffccf888888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444444448888888888888888888888f1bbbccfccccccccccccffccf888888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444444444488888888888888888888f1bbbcfcccccccccccccffccf888888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444444444444888888888888888888f11bbcfcccccccccccccffccf888888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444444444444448888888888888888f11bbcfcccccccccccccffcccf88888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444444444444444488888888888888f11bccfcccccccccccccffcccf88888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444888888888888f11bccfcccccccccccccf8fccf88888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444448888888888f11bccffccccccccccccf8fccf88888888888888888888888888888888
        444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444488888888f1bbccffccccccccccccf8fccf88888888888888888888888888888888
        44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444488888f11bbcf8fccccccccccccf8fccf88888888888888888888888888888888
        44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444448888f11bbcf8fccccccccccccf8fccf88888888888888888888888888888888
        44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444488f11bbcf88fcccccccccccf8fccf88888888888888888888888888888888
        44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444448f11bccf88fcccccccccccf8fcccf8888888888888888888888888888888
        44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444f1bbccf88fcccccccccccfffcccf88888888888888888888888888ccccc
        44444444444444444444444444cccccc444444444444444444444444444444444444444444444444444444444444444444444f1bbccffffcccccccccccffccccf8888888888888888888cccccccccccc
        44444444444444444444444ccccccccccccc44444444444444444444444444444444444444444444444444444444444444444fbbbcfccccfccccccccccfcccccf8888888888888cccccccccccccccccc
        44444444444444444444cccccccccccccccccccc4444444444444444444444444444444444444444444444444444444444444fbbccfcccccccccccccccfcccccf888888ccccccccccccccccccccccbbb
        4444444444444444ccccccccccccbbcccccccccccccc444444444444444444444444444444444444444444444444444444444fbbccfcccccccccccccccfcccccfcccccccccccccccccccccbbbbbbbbbb
        44444444444bbccccccccccccbbbbbbbbbcccccccccccccc4444444444444444444444444444444444444444444444444444f1bbccfcccccccccccccccfcccfffcccccccccccccccbbbbbbbbbbbbbbbb
        444444444cccccccccccccbbbbbbbbbbbbbbbbccccccccccccc444444444444444444444444444444444444444444444444f11bbccfccccccccccccfffffffcccccccccccbbbbbbbbbbbbbbbbbbbbbbb
        444444444cccccccccbbbbbbbbbbbbbbbbbbbbbbbbccccccccc44444444ccccccc44444444444444444444444444444444f111bbccfffffffffffffcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        444444444ccccccccccccbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbccccccccccccccc44444444444444444444444444fbbbcfffffccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        444444444ccccccccccccccccccbbbbbbbbbbbbbcccccccccccbbccccccccccccccccccccccc44444444444444bbbbbcffffffcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        44444444bcccbccccccccccccccccccccbbbcccccccccccccccccccccccccbbbccccccccccccccccc4bbbbbbccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        44444444bcccbbbbbbbcccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        44444444bcccbbbbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        44444444bcccbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        44444444bcccbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        44444444bcccbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        444555555cccbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        444555555cccbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        455555555cccbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccbbccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        455555555cccbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbcccccccccccccccccbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        455555555cccbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbcccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        888888888cccbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbcccccccccccccccccbbbbbcccccccccccccccccccccccccbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        888888888cccbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbcccccccccccccccbcccccccccccccccccccccccbbbbbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        888888888cccbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        8888888888ccbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbb
        8888888888ccbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbbbbbbbbbbbbb
        8888888888ccbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccbbbbbbbbbbbbbbb
        8888888888ccbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccbbbbbbbbbbb
        8888888888ccccbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccbbbbbb
        8888888888ccccbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccbb
        8888888888ccccbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccc
        8888888888ccccbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc
        8888888888ccccccccbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccc
        8888888888ccccccccccccbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        888888888888cccccccccccccbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        8888888888888888cccccccccccccbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        888888888888888dddddcccccccccccccbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbb
        8888ddddddddddddddddcccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbb
        88ddddddddddddddddddcccbbbbccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbb
        8dddddddddddddddddd7cccbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbb
        ddddddddddddd7777777cccbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbb
        dddddddddd7777777777cccbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbb
        ddd77777777777777777cccbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbb
        ddd77777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccb
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccc
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccc
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccc
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777777777777cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777777777666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777777766666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777776666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777777766666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777777776666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        77777776666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccbbbbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccb
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccc
        66666666666666666666cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccc
        `, SpriteKind.goodEnd)
    end2.setFlag(SpriteFlag.RelativeToCamera, true)
    clearGame()
    color.startFade(color.Black, color.originalPalette, 500)
    color.pauseUntilFadeDone()
    showInstruction("Finally, after defeating the slimes of this world, peace is restored once more.")
    showInstruction("You," + name + ", will be remembered as a hero of your adventure...")
    showInstruction("Hey " + name + "! The game creator here. I just wanted to say thank you for finishing this game. This was a very tedious game, but everything went out smoothly. Stay safe!")
    game.over(true, effects.bubbles)
}
function level1Music () {
    music.stopAllSounds()
    music.setTempo(149)
    for (let index = 0; index < 2; index++) {
        music.playTone(247, music.beat(BeatFraction.Half))
        music.playTone(277, music.beat(BeatFraction.Half))
        music.playTone(294, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Breve))
        music.playTone(370, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Whole))
        music.playTone(247, music.beat(BeatFraction.Half))
        music.playTone(277, music.beat(BeatFraction.Half))
        music.playTone(294, music.beat(BeatFraction.Half))
        music.playTone(370, music.beat(BeatFraction.Breve))
        music.playTone(294, music.beat(BeatFraction.Half))
        music.playTone(277, music.beat(BeatFraction.Whole))
    }
    for (let index = 0; index < 1; index++) {
        music.playTone(185, music.beat(BeatFraction.Double))
        music.playTone(185, music.beat(BeatFraction.Whole))
        music.playTone(220, music.beat(BeatFraction.Half))
        music.playTone(147, music.beat(BeatFraction.Half))
        music.playTone(139, music.beat(BeatFraction.Whole))
        music.playTone(139, music.beat(BeatFraction.Breve))
        music.playTone(277, music.beat(BeatFraction.Quarter))
        music.playTone(294, music.beat(BeatFraction.Quarter))
        music.playTone(277, music.beat(BeatFraction.Half))
        music.playTone(220, music.beat(BeatFraction.Half))
        music.playTone(165, music.beat(BeatFraction.Double))
        music.playTone(185, music.beat(BeatFraction.Half))
        music.playTone(220, music.beat(BeatFraction.Half))
        music.playTone(147, music.beat(BeatFraction.Half))
        music.playTone(139, music.beat(BeatFraction.Breve))
    }
    for (let index = 0; index < 1; index++) {
        music.playTone(185, music.beat(BeatFraction.Double))
        music.playTone(185, music.beat(BeatFraction.Whole))
        music.playTone(220, music.beat(BeatFraction.Half))
        music.playTone(147, music.beat(BeatFraction.Half))
        music.playTone(139, music.beat(BeatFraction.Whole))
        music.playTone(139, music.beat(BeatFraction.Breve))
        music.playTone(277, music.beat(BeatFraction.Quarter))
        music.playTone(294, music.beat(BeatFraction.Quarter))
        music.playTone(277, music.beat(BeatFraction.Half))
        music.playTone(220, music.beat(BeatFraction.Half))
        music.playTone(165, music.beat(BeatFraction.Double))
        music.playTone(185, music.beat(BeatFraction.Half))
        music.playTone(220, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Half))
        music.playTone(370, music.beat(BeatFraction.Breve))
    }
    for (let index = 0; index < 1; index++) {
        music.playTone(370, music.beat(BeatFraction.Double))
        music.playTone(370, music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Whole))
        music.playTone(294, music.beat(BeatFraction.Whole))
        music.playTone(277, music.beat(BeatFraction.Double))
        music.playTone(277, music.beat(BeatFraction.Whole))
        music.playTone(247, music.beat(BeatFraction.Whole))
        music.playTone(185, music.beat(BeatFraction.Whole))
        music.playTone(294, music.beat(BeatFraction.Double))
        music.playTone(294, music.beat(BeatFraction.Whole))
        music.playTone(294, music.beat(BeatFraction.Whole))
        music.playTone(330, music.beat(BeatFraction.Whole))
        music.playTone(277, music.beat(BeatFraction.Double))
        music.playTone(277, music.beat(BeatFraction.Whole))
        music.playTone(247, music.beat(BeatFraction.Whole))
        music.playTone(185, music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Double))
        music.playTone(440, music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Whole))
        music.playTone(494, music.beat(BeatFraction.Whole))
        music.playTone(370, music.beat(BeatFraction.Double))
        music.playTone(370, music.beat(BeatFraction.Whole))
        music.playTone(330, music.beat(BeatFraction.Whole))
        music.playTone(247, music.beat(BeatFraction.Whole))
        music.playTone(740, music.beat(BeatFraction.Whole))
        music.playTone(466, music.beat(BeatFraction.Whole))
        music.playTone(370, music.beat(BeatFraction.Whole))
        music.playTone(277, music.beat(BeatFraction.Whole))
        music.playTone(196, music.beat(BeatFraction.Whole))
        music.playTone(185, music.beat(BeatFraction.Breve))
    }
}
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_7`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_8`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_9`)
        scene.setBackgroundImage(img`
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999966699999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999666699999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999966666666666999999999999999999999999999999999999999999999999999999999999999999999666999999999999999999999999999999999999999999
            9999999999999999999999999999999999666666666666666699999999999999999999999999999999999999999999999999999999999999966666999999999999999999999999999999999999999999
            9999999999999999999999999999999966666666666666666666699999999999999999999999999999999999999999999999999999999996666666666666699999999999999999999999999999999999
            9999999999999999999999999999966666666666666666666666699999999999999999999999999999999999999999999999999999999666666666666666666999999999999999999999999999999999
            9999999999999999999999999996666666666666666666666666669999999999999999999999999999999999999999999999999996666666666666666666666669999999999999999999999999999999
            9999999999999999999999966666666666666666666666666666666999999999999999999999999999999999999999999999996666666666666666666666666666699999999999999999999999999999
            9999999999999999999666666666666666666666666666666666666999999999999999999999999999999999999999999999666666666666666666666666666666666999999999999999999999999999
            9999999999999996666666666666666666666666666666666666666699999999999999999999999999999999999999999996666666666666666666666666666666666666999999999999999999999999
            9999999999996666666666666666666666666666666666666666666669999999995555555555999999999999999999999666666666666666666666666666666666666666666999999999999999999999
            9999999996666666666666666666666666666666666666666666666666999999955555555555599999999999999999966666666666666666666666666666666666666666666666999999999999999999
            9999996666666666666666666666666666666666666666666666666666699999555555555555559999999999999966666666666666666666666666666666666666666666666666666999999999999999
            9999966666666666666666666666666666666666666666666666666666666995555555555555555999999999666666666666666666666666666666666666666666666666666666666669999999999999
            9999666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666669999999999
            9999666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666669999999
            9999666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666669999
            9966666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666669
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666667777777766666666666666666666666666666666666666666666666666667777776666666666666666666666666666
            6666667777777776666666666666666666666666666666666666666666666777777777777776666666666666666666666666666666666666666666666667777777777776666666666666666666666666
            6677777777777776666666666666666666666666666666677777777777767777777777777777666666666666666666666666666666666666666777677777777777777777777777776666666666666666
            6777777777777777777777666666666666666666666667777777777777777777777777777777766666677777777666667777777777777777777777777777777777777777777777777777777777666666
            6777777777777777777777776666666666677777766777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777766666
            6777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777776666
            6777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777766
            6777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777666777766667777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777766667777777777777ddddddddddddddd7777777777777
            7767777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ddddddddddddddddddddddddddddddddddddddddd777dddd
            776666667777777777777777777777777777777777777777777777777777777777777777777777766677777777777777777777777ddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            777777767777777777777777777777777777777777777777777777777777777777777766776666677777777777777777777777dddddddddddddddddddddddddddddddd88888888888ddddddddddddddd
            ddd77776777777777777777777777777777777777777777777777777777777777777777766777777777ddddddddddddddddddddddddddddddd8888888888888888888888888888888888888ddddddddd
            ddddd7776667777777777777777777777777776667777777777777777777777777777777777dddddddddddddddddddddddddddddddd8888888888888888888888888888888888888999998888888dddd
            ddddddd7777666777777777777777776666666777777777777777777777777777777dddddddddddddddddddddddddddddddddddd88888888888888888888888888888888888888888888899888888888
            8dddddddddd7777777777777777777777777777777777777777777777777777dddddddddddddddddddddd888888888888888888888888888888999999999988888888888888888888888888999998888
            888dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd88888888888888888888888888888888888899888888888888888888888888888888888888888889888
            88888ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd888888888888888888888888888888888888888889988888888888888888888888888888888888888888888888
            888888888dddddddddddddddddddddddddddddddddddddddddddddddddddddddd88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888999998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888889999888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888889999998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            `)
    } else if (level == 8) {
        tiles.setTilemap(tilemap`level_10`)
        scene.setBackgroundImage(img`
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888444444444444444444444444444444444444444444444444444444888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888844444444444444444444444444444444444444444444444444444444444444444444448888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888444444444444444444444444444444444444444444444444444444444444444444444444444444444888888888888888888888888888
            8888888888888888888888888888888888888888888888444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444488888888888888888888888
            8888888888888888888888888888888844444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444488888888888888888888
            8888888888888888888888888884444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444448888888888888888
            8888888888888888888884444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444488888888888888
            8888888888888888444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444888888888888
            8888888888444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444448888888888
            8888888444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444488888888
            8888444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444888888
            8844444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444448888
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444488
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444555555444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444466644444444444444444444445555555555555555444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444666644444444444444444455555555555555555555555444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444466666666666444444444555555555555555555555555555554444444444444444444444444444444666444444444444444444444444444444444444444444
            4444444444444444444444444444444444666666666666666644455555555555555555555555555555555544444444444444444444444444466666444444444444444444444444444444444444444444
            4444444444444444444444444444444466666666666666666666655555555555555555555555555555555555544444444444444444444446666666666666644444444444444444444444444444444444
            4444444444444444444444444444466666666666666666666666655555555555555555555555555555555555555444444444444444444666666666666666666444444444444444444444444444444444
            4444444444444444444444444446666666666666666666666666665555555555555555555555555555555555555544444444444446666666666666666666666664444444444444444444444444444444
            4444444444444444444444466666666666666666666666666666666555555555555555555555555555555555555555444444446666666666666666666666666666644444444444444444444444444444
            4444444444444444444666666666666666666666666666666666666555555555555555555555555555555555555555554444666666666666666666666666666666666444444444444444444444444444
            4444444444444446666666666666666666666666666666666666666655555555555555555555555555555555555555555546666666666666666666666666666666666666444444444444444444444444
            4444444444446666666666666666666666666666666666666666666665555555555555555555555555555555555555555666666666666666666666666666666666666666666444444444444444444444
            4444444446666666666666666666666666666666666666666666666666555555555555555555555555555555555555566666666666666666666666666666666666666666666666444444444444444444
            4444446666666666666666666666666666666666666666666666666666655555555551111111115555555555555566666666666666666666666666666666666666666666666666666444444444444444
            4444466666666666666666666666666666666666666666666666666666666555511111111111111115555555666666666666666666666666666666666666666666666666666666666664444444444444
            4444666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666664444444444
            4444666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666664444444
            4444666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666664444
            4466666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666664
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            666666666666666666666666666666666ccc6ccc6ccc666666666ccc6ccc6ccc666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            666666666666666666666666666666666cbc6cbc6cbc666666666cbc6cbc6cbc666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            666666666666666666666666666666666cbcccbcccbc666666666cbcccbcccbc666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            666666666666666666666666666666666cbbbbbbbbbc666666666cbbbbbbbbbc666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            666666666666666666666666666666666ccbbbbbbbcc666666666cbbbbbbbbcc666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666cbbb6bbbc66666666666cbbb6bbbc6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666ccbb6bbcc66ccccccc66cbbb6bbcc6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcccccbbbbbbccccbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbbbbbbbbbbbcbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbbbbbbbbbbbcbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbbbbbbbbbbbcbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbbbbbbbbbbbcbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbbbbbbbbbbbcbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbbeeeeebbbbcbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbeeeeeeebbbcbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbeeeeeeebbbcbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbefeeefebbbcbb6bbc66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666cbb6bbcbbbeeefeeebbbcbbbbbc66667777777766666666666666666666666666666666666666666666666666667777776666666666666666666666666666
            66666677777777766666666666666666666cbbbbbcbbbeeeeee7777777777777777777777776666666666666666666666666666666666666666666666667777777777776666666666666666666666666
            66777777777777766666666666666666666cbb777777777ee777777777777777777777777777666666666666666666666666666666666666666777677777777777777777777777776666666666666666
            67777777777777777777776666666666666c7777777777777777777777777777777777777777766666677777777666667777777777777777777777777777777777777777777777777777777777666666
            6777777777777777777777776666666667777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777766666
            6777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777776666
            6777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777766
            6777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777666777766667777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777766667777777777777ddddddddddddddd7777777777777
            7767777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ddddddddddddddddddddddddddddddddddddddddd777dddd
            776666667777777777777777777777777777777777777777777777777777777777777777777777766677777777777777777777777ddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            777777767777777777777777777777777777777777777777777777777777777777777766776666677777777777777777777777dddddddddddddddddddddddddddddddd88888888888ddddddddddddddd
            ddd77776777777777777777777777777777777777777777777777777777777777777777766777777777ddddddddddddddddddddddddddddddd8888888888888888888888888888888888888ddddddddd
            ddddd7776667777777777777777777777777776667777777777777777777777777777777777dddddddddddddddddddddddddddddddd8888888888888888888888888888888888888999998888888dddd
            ddddddd7777666777777777777777776666666777777777777777777777777777777dddddddddddddddddddddddddddddddddddd88888888888888888888888888888888888888888888899888888888
            8dddddddddd7777777777777777777777777777777777777777777777777777dddddddddddddddddddddd888888888888888888888888888888999999999988888888888888888888888888999998888
            888dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd88888888888888888888888888888888888899888888888888888888888888888888888888888889888
            88888ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd888888888888888888888888888888888888888889988888888888888888888888888888888888888888888888
            888888888dddddddddddddddddddddddddddddddddddddddddddddddddddddddd88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888999998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888889999888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888889999998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            `)
    } else if (level == 9) {
        tiles.setTilemap(tilemap`level6`)
        scene.setBackgroundImage(img`
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            11111111111111bb111111111111111111111111111111111111bb111111111111111111111111111111111111111111bb11111111111111111111111111111111111111111111111111111111111111
            111111111111111b111111111111111111111111111111111111b1111111111111111111111111111111111111111111bbb1111111111111111111111111111111111111111111111111111111111111
            111111111111111bb1111111111111111111111111111111111bb111111111111111111111111111111111111111111bbbb11111111111111111111111111bb111111111111111111111111111111111
            111111111111111bb111111111111111111111111111111111bb1111111111111111111111111111111111111111111bbbbb11111111111111111111111111bb11111111111111111111111111111111
            11111111111111bb1111111111111111111111111111111111bb111111111111111111111111111111111111111111bbbbbbb1111111111111111111111111bb11111111111111111111111111111111
            11111111111111bbbb11111111111111111111111111111111bb111111111111111111111111111111111111111111bbbb99bbb11111111111111111111111bb11111111111111111111111111111111
            1111111111111bbbbb11111111111111111111111111111111bbb11111111111111111111111111111111111111111bbbb999bb11111111111111111111111bb111111111111111bb111111111111111
            111111111111bbbbbbbbbb1111111111111111111111111111bbbbbbbbbb1111bb111111111111111111111111111bbbbb99999bbbb1111111111111111111bb11111111111111bbbb11111111111111
            1111111111bbbbbbbbbbbb1111111111111111111111111111bbbbbbbbbbbbbbbb111111111111b11111111111111bbbbb999999bbbbbbbb11111111111111bb11111111111111bbbbb1111111111111
            11111111bbbbbbbbbbbbbb111111111111111111111111111bbbbbbbbbbbbbbbbb111bbb11111bbbb111111111111bbbb999999999bbbbbb111111111111bbbbb1111111111111bbbbbb111111111111
            bbbbbbbbbbbbbb99bbbbbb111111bb1111111111111111111bbbbbbbbbbbbbbbbbbbbbbbb1111bbbbb1111111111bbbbb99999999999bbbbb111111111bbbbbbbb11111111111bbbbbbb111111111111
            bbbbbbbbbbb99999bbbbbbbbbbbbbb111111111111111111bbbbbb9999bbbbbbbbbbbbbbbbbbbbbbbbb11111111bbbbb99999999999999bbbbbbbbbbbbbbbbbbbbbbbbbbb111bb9bbbbb111111111111
            bbbbbbb9999999999bbbbbbbbbbbbbb11111111111111111bbbbbb9999999bbbbbbbbbbbbbbbbb99bbbbbbbbbbbbbbbb9999999999999999bbbbbbbb99bbbbbbbbbbbbbbb111bb99bbbb111111111111
            999999999999999999bbbb999bbbbbbbbbbbbbb11111111bbbbbbb99999999999999999bbbbbbb99bbbbbbbbbbbbbbb99999999999999999999999999999bbbb99bbbbbbbbbbbb999bbbbbbbbbbbbbbb
            9999999999999999999999999bbbbbbbbbbbbbb1111111bbbbbbb9999999999999999999999999999bbbbb99bbbbbbb999999999999999999999999999999bbb9999bbbbbbbbbb99999bbbbbbbbbbbbb
            9999999999999999999999999bbbbbbbbbbbbbbb11111bbbbbbbb9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbbb
            999999999999999999999999999bbbbbbbbbbbbbbbbbbbbbbbbbb99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbb
            999999999999999999999999999999bbbbbbbbbbbbbbbbbbbbbb999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999bbbbbbbbbbbbbbbb99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999bbbbbbbbb999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            99999999999999999999999999999999999999999bbbbbb99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            999999999999999999999999999999999999999999bbb9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            `)
    } else if (level == 10) {
        scene.setBackgroundImage(img`
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            `)
        tiles.setTilemap(tilemap`level3`)
    } else if (level == 11) {
        tiles.setTilemap(tilemap`level1`)
        scene.setBackgroundImage(img`
            8888888888888888888888888888888888888881888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888818888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888881888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888188888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888881111111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888811111111188888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888111111111118888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888881111111111111888888888888888888188888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888881888881111111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888881888888111111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888188888888888888888888888888888888888888888888888888888811111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888811111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888811111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888811111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888111118888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888818881111188888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888881111111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888881888888888888888888888888888888888888888888888888888888888888888888888888888881888888888888888888888888888188888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            88888888888888888888888888888888888888ccc88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888cccc88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888cccccccccccc8888888888888888888888888888888888888888881888888888888888888888888886cc888888888888888888888888888888888888888888
            888888888888888888888888888888888ccccccccccccccccc8888888888888888888888888888888888888888888888888888888888888886cccc888888888888888888888888888888888888888888
            888888888888888888888888888888886cccccccccccccccccccc8888888888888888888888888888888888888888888888888888888888666ccccccccccc88888888888888888888888888888888888
            88888888888888888888888888888666ccccccccccccccccccccc888888888888888888888888888888888888888888888888888888886666cccccccccccccc888888888888888888888888888888888
            88888888888888888888888888866666cccccccccccccccccccccc8888888888888888888888888888888888888888888888888886666666ccccccccccccccccc8888888888888888888888888888888
            8888888888888888888888866666666cccccccccccccccccccccccc88888888888888888888888888888888888888888888888666666666cccccccccccccccccccc88888888888888888888888888888
            8888888888888888888666666666666cccccccccccccccccccccccc8888888888888888888888888888888888888888888886666666666ccccccccccccccccccccccc888888888888888888888888888
            888888888888888666666666666666cccccccccccccccccccccccccc888888888888888888888888888888888888888888866666666666cccccccccccccccccccccccccc888888888888888888888888
            88888888888866666666666666666cccccccccccccccccccccccccccc8888888888888888888888888888888888888888666666666666cccccccccccccccccccccccccccccc888888888888888888888
            88888888866666666666666666666ccccccccccccccccccccccccccccc888888888888888888888888888888888888866666666666666ccccccccccccccccccccccccccccccccc888888888888888888
            8888886666666666666666666666ccccccccccccccccccccccccccccccc88888888888888888888888888888888866666666666666666cccccccccccccccccccccccccccccccccccc888888888888888
            888886666666666666666666666cccccccccccccccccccccccccccccccccc88888888888888888888888888866666666666666666666ccccccccccccccccccccccccccccccccccccccc8888888888888
            888866666666666666666666666ccccccccccccccccccccccccccccccccccc6666666666666666666666666666666666666666666666cccccccccccccccccccccccccccccccccccccccccc8888888888
            888866666666666666666666666cccccccccccccccccccccccccccccccccccc66666666666666666666666666666666666666666666cccccccccccccccccccccccccccccccccccccccccccccc8888888
            88886666666666666666666666cccccccccccccccccccccccccccccccccccccc666666666666666666666666666666666666666666cccccccccccccccccccccccccccccccccccccccccccccccccc8888
            8866666666666666666666666cccccccccccccccccccccccccccccccccccccccc66666666666666666666666666666666666666666ccccccccccccccccccccccccccccccccccccccccccccccccccccc8
            66666666666666666666666ccccccccccccccccccccccccccccccccccccccccccc66666666666666666666666666666666666666cccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            66666666666666666666cccccccccccccccccccccccccccccccccccccccccccccc6666666666666666666666666666666666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            6666666666666666ccccccccccccccccccccccccccccccccccccccccccccccccccc66666666666666666666666666666666666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            6666666666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666666666666666666666666666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            66666666666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666666666666666666666666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            66666666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666666666666666666666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            6666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666666666666666666666666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666666666666666666666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            6666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666666666666666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            66cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666666666666666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666666666666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc77777777cccccccccccccccccccccccccccccccccccccccccccccccccccc777777cccccccccccccccccccccccccccc
            cccccc777777777cccccccccccccccccccccccccccccccccccccccccccccc77777777777777cccccccccccccccccccccccccccccccccccccccccccccccc777777777777ccccccccccccccccccccccccc
            cc7777777777777cccccccccccccccccccccccccccccccc777777777777c7777777777777777ccccccccccccccccccccccccccccccccccccccc777c7777777777777777777777777cccccccccccccccc
            c777777777777777777777ccccccccccccccccccccccc77777777777777777777777777777777cccccc77777777ccccc7777777777777777777777777777777777777777777777777777777777cccccc
            c77777777777777777777777ccccccccccc777777cc7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ccccc
            c77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cccc
            c7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cc
            c777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777666777766667777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777766667777777777777ddddddddddddddd7777777777777
            7767777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ddddddddddddddddddddddddddddddddddddddddd777dddd
            776666667777777777777777777777777777777777777777777777777777777777777777777777766677777777777777777777777ddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            777777767777777777777777777777777777777777777777777777777777777777777766776666677777777777777777777777dddddddddddddddddddddddddddddddd88888888888ddddddddddddddd
            ddd77776777777777777777777777777777777777777777777777777777777777777777766777777777ddddddddddddddddddddddddddddddd8888888888888888888888888888888888888ddddddddd
            ddddd7776667777777777777777777777777776667777777777777777777777777777777777dddddddddddddddddddddddddddddddd8888888888888888888888888888888888888999998888888dddd
            ddddddd7777666777777777777777776666666777777777777777777777777777777dddddddddddddddddddddddddddddddddddd88888888888888888888888888888888888888888888899888888888
            8dddddddddd7777777777777777777777777777777777777777777777777777dddddddddddddddddddddd888888888888888888888888888888999999999988888888888888888888888888999998888
            888dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd88888888888888888888888888888888888899888888888888888888888888888888888888888889888
            88888ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd888888888888888888888888888888888888888889988888888888888888888888888888888888888888888888
            888888888dddddddddddddddddddddddddddddddddddddddddddddddddddddddd88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888999998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888889999888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888889999998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888998888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888811111188888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888188811111111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888811111111888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888811111111188888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888811118888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888811111111111188888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888811111111118888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888111111811188888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888881111188888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            `)
    } else if (level == 12) {
        tiles.setTilemap(tilemap`level2`)
        scene.setBackgroundImage(img`
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            `)
    } else if (level == 13) {
        tiles.setTilemap(tilemap`level4`)
        scene.setBackgroundImage(img`
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            `)
    } else {
    	
    }
    initializeLevel(level)
}
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Flying, 100)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 4 4 4 . . . . 
        . . . . . 4 4 4 4 4 4 4 4 . . . 
        . . . 4 4 4 d d d d 4 4 4 4 . . 
        . . . 4 4 4 4 4 4 4 4 d 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 d d 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 f 4 4 . . 
        . . 4 4 f 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . e 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . e e 4 4 4 4 4 4 4 4 4 . . . 
        . . e e e e e 4 4 4 4 e e . . . 
        . . . e e e e e e e e . . . . . 
        . . . . e e e e e . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 4 4 4 4 4 4 4 4 . . . . . 
        . . 4 4 4 4 d d d d 4 4 4 . . . 
        . 4 4 4 4 4 4 4 4 4 4 d 4 . . . 
        . 4 4 4 4 4 4 4 4 4 4 d d 4 . . 
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . 4 4 4 4 4 4 4 4 4 4 f 4 4 4 . 
        . 4 4 4 f 4 4 4 4 4 4 4 4 4 4 . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
        . . e 4 4 4 4 4 4 4 4 4 4 4 4 . 
        . . . e 4 4 4 4 4 4 4 4 4 4 4 . 
        . . . e e e e 4 4 4 4 e e 4 . . 
        . . . . . e e e e e e e e . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . 4 4 4 d d d d 4 4 4 . . . 
        . . . 4 4 4 4 4 4 4 4 d 4 . . . 
        . . 4 4 4 4 4 4 4 4 4 d d 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 f 4 4 . . 
        . . 4 4 f 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . e 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . . e 4 4 4 4 4 4 4 4 4 . . . 
        . . . e e e e 4 4 4 4 e e . . . 
        . . . . . e e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (titlebar == 0) {
        attemptJump()
    } else {
    	
    }
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        ................
        ................
        ................
        .....ffff.......
        ....f1111f......
        ...f111111f.....
        ...f1f1f11f.....
        ...f111111f.....
        ...f111111f.....
        ....f1111f......
        .....ffff.......
        .....f11f.......
        ....f1111f..ff..
        ....f1111f.f11f.
        .ff..f111f.f11f.
        f11f.f111f..ff..
        f11f..f11f......
        .ff...f1ffff....
        .....f11fff1f...
        ....f11ff1111f..
        ....f1f.fff111f.
        ...ff1f...ffffff
        ..f111f.........
        .f1111f.........
        fffffff.........
        `)
    mainRunLeft.addAnimationFrame(img`
        ................
        ................
        ......ffff......
        .....f1111f.....
        ....f111111f....
        ....f1f1f11f....
        ....f111111f....
        ....f111111f....
        .....f1111f.....
        ......ffff......
        ......f11f......
        .....f1111f.....
        .....f1111f.....
        ....f1f11ff.....
        ....f1f1f11f....
        .....ffff11f....
        .......f1ff.....
        ......f1f1f.....
        .....f11f1f.....
        .....f11f1ff....
        ......f1f1ff....
        .......ff1ff....
        ......f111ff....
        .....f1111ff....
        ....fffffff.....
        `)
    mainRunLeft.addAnimationFrame(img`
        ................
        ................
        ................
        .....ffff.......
        ....f1111f......
        ...f111111f.....
        ...f1f1f11f.....
        ...f111111f.....
        ...f111111f.....
        ....f1111f......
        .....ffff.......
        .....f11f.......
        ....f1111f..ff..
        ....f1111f.f11f.
        .ff..f111f.f11f.
        f11f.f111f..ff..
        f11f..f11f.f....
        .ff...f11ff1f...
        .....f1f11111f..
        ....f11ff1111f..
        ....f1f.fff111f.
        ...ff1f...ffffff
        ..f111f.........
        .f1111f.........
        fffffff.........
        `)
    mainRunLeft.addAnimationFrame(img`
        ................
        ................
        ......ffff......
        .....f1111f.....
        ....f111111f....
        ....f1f1f11f....
        ....f111111f....
        ....f111111f....
        .....f1111f.....
        ......ffff......
        ......f11f......
        .....f1111f.....
        .....f1111f.....
        ....f1f11ff.....
        ....f1f1f11f....
        .....ffff11f....
        .......f1ff.....
        ......f1f1f.....
        .....f1ffff.....
        .....f1111ff....
        ......f1111f....
        .......ff11f....
        ......f11f1f....
        .....f1111ff....
        ....fffffff.....
        `)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        ................
        ................
        ................
        .......ffff.....
        ......f1111f....
        .....f111111f...
        .....f11f1f1f...
        .....f111111f...
        .....f111111f...
        ......f1111f....
        .......ffff.....
        .......f11f.....
        ..ff..f1111f....
        .f11f.f1111f....
        .f11f.f111f..ff.
        ..ff..f111f.f11f
        ......f11f..f11f
        ....ffff1f...ff.
        ...f1fff11f.....
        ..f1111ff11f....
        .f111fff.f1f....
        ffffff...f1ff...
        .........f111f..
        .........f1111f.
        .........fffffff
        `)
    mainRunRight.addAnimationFrame(img`
        ................
        ................
        ......ffff......
        .....f1111f.....
        ....f111111f....
        ....f11f1f1f....
        ....f111111f....
        ....f111111f....
        .....f1111f.....
        ......ffff......
        ......f11f......
        .....f1111f.....
        .....f1111f.....
        .....ff11f1f....
        ....f11f1f1f....
        ....f11ffff.....
        .....ff1f.......
        .....f1f1f......
        .....f1f11f.....
        ....ff1f11f.....
        ....ff1f1f......
        ....ff1ff.......
        ....ff111f......
        ....ff1111f.....
        .....fffffff....
        `)
    mainRunRight.addAnimationFrame(img`
        ................
        ................
        ................
        .......ffff.....
        ......f1111f....
        .....f111111f...
        .....f11f1f1f...
        .....f111111f...
        .....f111111f...
        ......f1111f....
        .......ffff.....
        .......f11f.....
        ..ff..f1111f....
        .f11f.f1111f....
        .f11f.f111f..ff.
        ..ff..f111f.f11f
        ....f.f11f..f11f
        ...f1ff11f...ff.
        ..f11111f1f.....
        ..f1111ff11f....
        .f111fff.f1f....
        ffffff...f1ff...
        .........f111f..
        .........f1111f.
        .........fffffff
        `)
    mainRunRight.addAnimationFrame(img`
        ................
        ................
        ......ffff......
        .....f1111f.....
        ....f111111f....
        ....f11f1f1f....
        ....f111111f....
        ....f111111f....
        .....f1111f.....
        ......ffff......
        ......f11f......
        .....f1111f.....
        .....f1111f.....
        .....ff11f1f....
        ....f11f1f1f....
        ....f11ffff.....
        .....ff1f.......
        .....f1f1f......
        .....ffff1f.....
        ....ff1111f.....
        ....f1111f......
        ....f11ff.......
        ....f1f11f......
        ....ff1111f.....
        .....fffffff....
        `)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    if (bossMode == true) {
        sprite.destroy()
        statusbar2.value += -10
        if (statusbar2.value == 0) {
            slimeboss.destroy(effects.warmRadial, 5000)
            showInstruction("Slime King: I'll be back, " + name + ", for I shall return soon!")
            scene.cameraShake(8, 5000)
            showInstruction("" + name + ": Good luck with that one.")
            color.startFade(color.originalPalette, color.White, 500)
            color.pauseUntilFadeDone()
            color.startFade(color.White, color.Black, 500)
            color.pauseUntilFadeDone()
            music.stopAllSounds()
            currentLevel += 1
            statusbar2.destroy()
            setLevelTileMap(currentLevel)
            beforegameDialogue()
            endCutscene()
        }
    }
})
function bossFunctions () {
    statusbar2 = statusbars.create(80, 4, StatusBarKind.EnemyHealth)
    statusbar2.setPosition(80, 104)
    statusbar2.max = 500
    statusbar2.value = 500
    statusbar2.setColor(7, 2)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Lava, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.vy = -2 * pixelsToMeters
    if (heroFacingLeft) {
        sprite.x += 1 * 16
    } else {
        sprite.x += -1 * 16
    }
    music.pewPew.play()
    sprite.say("oof", invincibilityPeriod)
    pause(invincibilityPeriod)
})
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        ................
        ......ffff......
        .....f1111f.....
        ....f111111f....
        ....f1f1f11f....
        ....f111111f....
        ....f111111f....
        .....f1111f..ff.
        ......ffff..f11f
        ..ff..f11f..f11f
        .f11ff1111f..ff.
        .f11ff1111f.....
        ..ff..f111f.....
        ......f111f.....
        ......f111f.....
        ....ff111f......
        ...ff1fff.......
        ...ff1ff........
        ....ff1f........
        .....ff1f.......
        .....ff11f......
        ....ff11f.......
        ...ff111f.......
        ...ffffff.......
        ................
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            ................
            ......ffff......
            .....f1111f.....
            ....f1f1f11f....
            ....f111111f....
            ....f111111f....
            .ff.f111111f....
            f11f.f1111f.....
            f11f..ffff......
            .ff...f11f......
            .....f1111f.....
            .....f1111f.....
            .....f111f......
            .....f111f...ff.
            ....fff1f...f11f
            ...ff1f1f...f11f
            ...f11f1f....ff.
            ...ff1f1f.......
            .....ff1f.......
            ......f1f.......
            ......f1f.......
            .....f11f.......
            .....f11f.......
            ....ff11f.......
            ...ffffff.......
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        ................
        .......ffff.....
        ......f1111f....
        .....f111111f...
        .....f11f1f1f...
        .....f111111f...
        .....f111111f...
        .ff...f1111f....
        f11f...ffff.....
        f11f...f11f..ff.
        .ff...f1111ff11f
        ......f1111ff11f
        ......f111f..ff.
        ......f111f.....
        ......f111f.....
        .......f111ff...
        ........fff1ff..
        .........ff1ff..
        .........f1ff...
        ........f1ff....
        .......f11ff....
        ........f11ff...
        ........f111ff..
        ........ffffff..
        ................
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            ................
            ......ffff......
            .....f1111f.....
            ....f11f1f1f....
            ....f111111f....
            ....f111111f....
            ....f111111f.ff.
            .....f1111f.f11f
            ......ffff..f11f
            ......f11f...ff.
            .....f1111f.....
            .....f1111f.....
            ......f111f.....
            .ff...f111f.....
            f11f...f1fff....
            f11f...f1f1ff...
            .ff....f1f11f...
            .......f1f1ff...
            .......f1ff.....
            .......f1f......
            .......f1f......
            .......f11f.....
            .......f11f.....
            .......f11ff....
            .......ffffff...
            `)
    }
}
function beforegameDialogue () {
    if (currentLevel == 1) {
        showInstruction("Scientist: Good! You can double jump by pressing A twice. Give it a try!")
    }
    if (currentLevel == 2) {
        showInstruction("Scientist: There are enemies as well. Some walk on the ground, and some fly in the air. Be careful, they might be faster than you think!")
    }
    if (currentLevel == 3) {
        showInstruction("Scientist: When hurt, you can find these orbs that give you life. Take as much as you need.")
    }
    if (currentLevel == 4) {
        showInstruction("Scientist: Great job! This next stage has a hidden entrance, so be careful when finding the right door!")
    }
    if (currentLevel == 5) {
        showInstruction("Scientist: Superb! Now, try using your B button in order to shoot bullets out of your fingers!")
    }
    if (currentLevel == 6) {
        showInstruction("Scientist: Shoot the enemies above in order to proceed to the next level! If all the enemies are defeated, you can destroy the barriers by shooting at it!")
        enemycount = 4
    }
    if (currentLevel == 7) {
        showInstruction("Scientist: You're finally out and ready to start your adventure. Good luck. We're counting on you.")
    }
    if (currentLevel == 8) {
        showInstruction("Scientist: What a nice sunset. Too bad that more enemies spawn during the night. Be safe!")
    }
    if (currentLevel == 9) {
        showInstruction("" + name + ": Wait, this is a wrong world! I must've traveled to another popular game. Oh well, as long as I keep moving forward.")
    }
    if (currentLevel == 10) {
        showInstruction("Scientist: You've gain access to the castle! The top floor might be where the big slime be!")
        showInstruction("Scientist: Hold up, something's wrong!")
        showInstruction("~static noises~")
        showInstruction("Lieutenant: I'm on defense, go continue the work!")
        showInstruction("~static noises~")
        showInstruction("Scientist: Oh no, everyone's dying!")
        showInstruction("Scientist: " + name + ", you are our only hope left. Be safe...")
        showInstruction("" + name + ": Dang, I have to kill the source somehow. Not sure what will happen next.")
    }
    if (currentLevel == 11) {
        showInstruction("" + name + ": It's nighttime. I must find the source fast!")
    }
    if (currentLevel == 12) {
        showInstruction("King Slime: Alas! We have meet. Now, prepare to die!")
        showInstruction("" + name + ": Bold of you to say that!")
    }
    if (currentLevel == 13) {
        endCutscene()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.DoorToSomething, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    currentLevel += 1
    if (currentLevel < 14) {
        game.splash("Next level unlocked!")
        music.stopAllSounds()
        setLevelTileMap(currentLevel)
        beforegameDialogue()
    } else {
        game.over(true, effects.confetti)
    }
})
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        ................
        ................
        ................
        ................
        ................
        ................
        ................
        ................
        ................
        ....ffff........
        ...f1111f.......
        ..f111111f......
        ..f1f1f11f......
        ..f111111f......
        ..f111111ff.....
        ...f1111f1f.....
        ....ffff11f.ff..
        .......f11ff11f.
        .ff..ff1f11f11f.
        f11ff11f111fff..
        f11f.ff1ff11f...
        .ff.ff1ff.f1f...
        ....f111ff11f...
        ..ff1111f1111f..
        ..ffffffffffff..
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        ................
        ................
        ................
        ................
        ................
        ................
        ................
        ................
        ................
        .........ffff...
        ........f1111f..
        .......f111111f.
        .......f11f1f1f.
        ......ff111111f.
        .....f1f111111f.
        .....f11f1111f..
        ..ff.f111ffff...
        .f11ff11f.......
        .f11f11f1ff..ff.
        ..fff111f11ff11f
        ...f11ff1ff.f11f
        ...f1f.ff1ff.ff.
        ...f11ff111f....
        ..f1111f1111ff..
        ..ffffffffffff..
        `)
}
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
    for (let value112 of sprites.allOfKind(SpriteKind.DestroyableBox)) {
        value112.destroy()
    }
    for (let value122 of sprites.allOfKind(SpriteKind.PassThru)) {
        value122.destroy()
    }
    for (let value132 of sprites.allOfKind(SpriteKind.Barrier)) {
        value132.destroy()
    }
    for (let value142 of sprites.allOfKind(SpriteKind.Lava)) {
        value142.destroy()
    }
    for (let value15 of sprites.allOfKind(SpriteKind.Life)) {
        value15.destroy()
    }
    for (let value16 of sprites.allOfKind(SpriteKind.Boss)) {
        value16.destroy()
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile11`, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel += 1
    if (currentLevel < 14) {
        game.splash("Next level unlocked!")
        music.stopAllSounds()
        setLevelTileMap(currentLevel)
        beforegameDialogue()
    } else {
        game.over(true, effects.confetti)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.DestroyableBox, function (sprite, otherSprite) {
    if (heroFacingLeft) {
        sprite.x += 5
    } else {
        sprite.x += -5
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Barrier, function (sprite, otherSprite) {
    if (heroFacingLeft) {
        sprite.x += 5
    } else {
        sprite.x += -5
    }
    music.pewPew.play()
})
function levelboss () {
    music.setTempo(120)
    for (let index = 0; index < 1; index++) {
        music.playTone(131, music.beat(BeatFraction.Whole))
        music.playTone(262, music.beat(BeatFraction.Whole))
        music.playTone(147, music.beat(BeatFraction.Whole))
        music.playTone(294, music.beat(BeatFraction.Whole))
    }
    if (statusbar2.value >= 250) {
        music.setTempo(120)
    } else if (statusbar2.value >= 140 && statusbar2.value < 250) {
        music.setTempo(180)
    } else {
        music.setTempo(200)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Ow!", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function createEnemies () {
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(assets.tile`tile12`)) {
        if (currentLevel < 9) {
            bumper = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . 9 9 9 9 9 . . . . . 
                . . . . 9 9 9 1 1 1 9 9 . . . . 
                . . . 9 9 9 9 9 9 9 9 1 9 . . . 
                . . . 9 9 9 9 9 9 9 9 9 9 . . . 
                . . . 9 f 9 9 9 9 9 9 f 9 . . . 
                . . . 9 9 9 9 9 9 9 9 9 9 . . . 
                . . . 8 9 9 9 9 9 9 9 9 8 . . . 
                . . . . f 8 8 8 8 8 8 8 . . . . 
                . . . . . f f f f f f . . . . . 
                `, SpriteKind.Bumper)
        } else if (currentLevel == 9) {
            bumper = sprites.create(img`
                . . . . . . e e e e . . . . . . 
                . . . . e e e e e e e e . . . . 
                . . . e e e e e e e e e e . . . 
                . . e e e e e e e e e e e e . . 
                . e e f f e e e e e e f f e e . 
                . e e e d f e e e e f d e e e . 
                e e e e d f e e e e f d e e e e 
                e e e e d f d e e d f d e e e e 
                e e e e d d d e e d d d e e e e 
                . e e e e e e e e e e e e e e . 
                . . e e e e d d d d e e e e . . 
                . . . . d d d d d d d d . . . . 
                . . . . d d d d d d d d . . . . 
                . . f f f f d d d d f f f f . . 
                . f f f f f d d d d f f f f f . 
                . . f f f f f . . f f f f f . . 
                `, SpriteKind.Bumper)
        } else {
            bumper = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . 9 9 9 9 9 . . . . . 
                . . . . 9 9 9 1 1 1 9 9 . . . . 
                . . . 9 9 9 9 9 9 9 9 1 9 . . . 
                . . . 9 9 9 9 9 9 9 9 9 9 . . . 
                . . . 9 f 9 9 9 9 9 9 f 9 . . . 
                . . . 9 9 9 9 9 9 9 9 9 9 . . . 
                . . . 8 9 9 9 9 9 9 9 9 8 . . . 
                . . . . f 8 8 8 8 8 8 8 . . . . 
                . . . . . f f f f f f . . . . . 
                `, SpriteKind.Bumper)
        }
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(assets.tile`tile13`)) {
        flier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . 4 4 4 d d d d 4 4 4 . . . 
            . . . 4 4 4 4 4 4 4 4 d 4 . . . 
            . . 4 4 4 4 4 4 4 4 4 d d 4 . . 
            . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . 4 4 4 4 4 4 4 4 4 f 4 4 . . 
            . . 4 4 f 4 4 4 4 4 4 4 4 4 . . 
            . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . e 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . . e 4 4 4 4 4 4 4 4 4 . . . 
            . . . e e e e 4 4 4 4 e e . . . 
            . . . . . e e e e e e . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
    // enemy that moves back and forth
    for (let value16 of tiles.getTilesByType(assets.tile`tile65`)) {
        slimeboss = sprites.create(img`
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ................................................................................
            ....................................ffffffffff..................................
            ...............................fffffffffffffffffff..............................
            ..........................fffffffffffffffffffffffffff...........................
            .....................fffffffffffffffffccccccffffffffffff........................
            ...................ffffffffffffffccccccbbbbbbbbcfffffffffff.....................
            ................ffffffffffffcccccccccccbbbbbbbbbbbcffffffffff...................
            .............ffffffffffccccccccccccccccbbbbbbbbbbbbbbbffffffffff................
            ............fffffffffccccccccccccccccccccccccbbbbbbbbbccfffffffff...............
            ...........ffffffffcccccccccccccccccccccccccccccbbbbbbcccccffffffff.............
            ..........ffffffcccccccccccccccccccccccccccccccccccccccccccccfffffff............
            .........ffffffccccccccccccccccccccccccccccccccccccccccccccccccfffffff..........
            .........ffffcccccccccccccccccccccccccccccccccccccccccccccccccccfffffff.........
            ........fffffcccccccccccccccccccccccccccccccccccccccccccccccccccccffffff........
            .......fffffccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbffff........
            .......ffffcccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbffff.......
            .......fffccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbffff......
            ......ffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbfff......
            ......ffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbffff.....
            ......fffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbfff.....
            .....ffffccccccccccccccccccccccccccccccccccccccccccccccfffccccccccccbbbbfff.....
            .....ffffcccccccccfffccccccccccccccccccccccccccccccccfffffcccccccccccbbbbfff....
            .....fffccccccccccfffffccccccccccccccccccccccccccccfffffffcccccccccccbbbbfff....
            ....ffffccccccccccfffffffccccccccccccccccccccccccffffffffcccccccccccccbbbbfff...
            ....ffffcccccccccccffffffffcccccccccccccccccccccfffffffcccccccccccccccbbbbfff...
            ...ffffccccccccccccccffffffffcccccccccccccccccfffffffccccccccccccccccccbbbfff...
            ...ffffccccccccccccccccffffffffcccccccccccccfffffffccccccccccccccccccccbbbbff...
            ...fffcccccccccccccccc222fffffffcccccccccccfffffff2222cccccccccccccccccbbbbfff..
            ..ffffccccccccccccccc222222fffffcccccccccccfffff2222222cccccccccccccccccbbbbff..
            ..ffffcccccccccccccc222222222fffcccccccccccfff2222222222ccccccccccccccccbbbbff..
            ..ffffcccccccccccccc22222222222cccccccccccccc22222222222ccccccccccccccccbbbbff..
            .fffffcccccccccccccc22222222222cccccccccccccc22222222222cccccccccccccccccbbbff..
            .ffffffccccccccccccc22222222222cccccccccccccc22222222222cccccccccccccccccbbbfff.
            .ffffffccccccccccccc22222222222cccccccccccccc22222222222cccccccccccccccccbbbfff.
            .ffffffccccccccccccc22222222222cccccccccccccc22222222222cccccccccccccccccbbbfff.
            .ffffffccccccccccccc22222222222cccccccccccccc22222222222ccccccccccccccccccccfff.
            fffffffcccccccccccccc222222222cccccccccccccccc222222222cccccccccccccccccccccfff.
            ffffffffcccccccccccccc2222222cccccccccccccccccc2222222ccccccccccccccccccccccffff
            ffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffff
            ffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffff
            ffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            fffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            fffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            fffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            fffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            fffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            ffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            ffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            ffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            ffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            fffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            fffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff
            .ffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffff
            .fffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff.
            .fffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff.
            .ffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffff.
            ..fffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffff.
            ..ffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffff.
            ..ffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffff..
            ...ffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffff..
            ....ffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfff...
            ....fffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccffff...
            .....fffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccffff...
            ......ffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccfff....
            .......ffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccffff....
            ........ffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccfffff....
            .........fffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccfffff.....
            ..........ffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccffffff.....
            ...........fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......
            .............ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......
            ..............fffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........
            `, SpriteKind.Boss)
        tiles.placeOnTile(slimeboss, value16)
        tiles.setTileAt(value16, assets.tile`tile0`)
        slimeboss.setFlag(SpriteFlag.BounceOnWall, true)
        if (Math.percentChance(50)) {
            slimeboss.vx = Math.randomRange(30, 60)
        } else {
            slimeboss.vx = Math.randomRange(-60, -30)
        }
        if (currentLevel == 12) {
            bossMode = true
            bossFunctions()
        }
    }
}
sprites.onOverlap(SpriteKind.Bumper, SpriteKind.DestroyableBox, function (sprite, otherSprite) {
    sprite.vx = -1 * sprite.vx
})
sprites.onOverlap(SpriteKind.Flier, SpriteKind.DestroyableBox, function (sprite, otherSprite) {
    sprite.vx = -1 * sprite.vx
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Life, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 500)
    music.magicWand.play()
    info.changeLifeBy(1)
})
function level3music () {
    music.stopAllSounds()
    music.setTempo(200)
    for (let index = 0; index < 2; index++) {
        music.playTone(262, music.beat(BeatFraction.Half))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(220, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(233, music.beat(BeatFraction.Half))
        music.playTone(466, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Double))
        music.rest(music.beat(BeatFraction.Whole))
    }
    for (let index = 0; index < 2; index++) {
        music.playTone(175, music.beat(BeatFraction.Half))
        music.playTone(349, music.beat(BeatFraction.Half))
        music.playTone(147, music.beat(BeatFraction.Half))
        music.playTone(294, music.beat(BeatFraction.Half))
        music.playTone(156, music.beat(BeatFraction.Half))
        music.playTone(311, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Double))
        music.rest(music.beat(BeatFraction.Whole))
    }
    for (let index = 0; index < 1; index++) {
        music.playTone(622, music.beat(BeatFraction.Quarter))
        music.playTone(587, music.beat(BeatFraction.Quarter))
        music.playTone(554, music.beat(BeatFraction.Quarter))
        music.playTone(523, music.beat(BeatFraction.Whole))
        music.playTone(622, music.beat(BeatFraction.Whole))
        music.playTone(587, music.beat(BeatFraction.Whole))
        music.playTone(415, music.beat(BeatFraction.Whole))
        music.playTone(392, music.beat(BeatFraction.Whole))
        music.playTone(554, music.beat(BeatFraction.Whole))
        music.playTone(523, music.beat(BeatFraction.Whole))
        music.playTone(740, music.beat(BeatFraction.Quarter))
        music.playTone(698, music.beat(BeatFraction.Quarter))
        music.playTone(659, music.beat(BeatFraction.Quarter))
        music.playTone(932, music.beat(BeatFraction.Quarter))
        music.playTone(880, music.beat(BeatFraction.Quarter))
        music.playTone(831, music.beat(BeatFraction.Quarter))
        music.playTone(659, music.beat(BeatFraction.Whole))
        music.playTone(523, music.beat(BeatFraction.Whole))
        music.playTone(466, music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Whole))
        music.playTone(415, music.beat(BeatFraction.Breve))
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
        hero.vy += 80
    }
})
info.onLifeZero(function () {
    end1 = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccbbbbbbbbcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccbbbbbbbbbbbcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccbbbbbbbbbccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccbbbbbbcccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccfffccccccccccbbbbfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffcccccccccfffccccccccccccccccccccccccccccccccfffffcccccccccccbbbbffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffccccccccccfffffccccccccccccccccccccccccccccfffffffcccccccccccbbbbffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffccccccccccfffffffccccccccccccccccccccccccffffffffcccccccccccccbbbbfffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffcccccccccccffffffffcccccccccccccccccccccfffffffcccccccccccccccbbbbfffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccffffffffcccccccccccccccccfffffffccccccccccccccccccbbbfffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccffffffffcccccccccccccfffffffccccccccccccccccccccbbbbffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccc222fffffffcccccccccccfffffff2222cccccccccccccccccbbbbffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffccccccccccccccc222222fffffcccccccccccfffff2222222cccccccccccccccccbbbbfffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffcccccccccccccc222222222fffcccccccccccfff2222222222ccccccccccccccccbbbbfffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffcccccccccccccc22222222222cccccccccccccc22222222222ccccccccccccccccbbbbfffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffcccccccccccccc22222222222cccccccccccccc22222222222cccccccccccccccccbbbfffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffccccccccccccc22222222222cccccccccccccc22222222222cccccccccccccccccbbbfffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffccccccccccccc22222222222cccccccccccccc22222222222cccccccccccccccccbbbfffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffccccccccccccc22222222222cccccccccccccc22222222222cccccccccccccccccbbbfffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffccccccccccccc222cccccc22cccccccccccccc222cccccc22ccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccc2cccccccccccccccccccccccc2cccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.badEnd)
    end1.setFlag(SpriteFlag.StayInScreen, true)
    clearGame()
    tiles.setTilemap(tilemap`level4`)
    showInstruction("King Slime: Fool...")
    showInstruction("King Slime: Can't you see? Running away doesn't solve anything.")
    showInstruction("King Slime: You've let your enemies multiply and live.")
    showInstruction("King Slime: You let them reign over your world.")
    showInstruction("King Slime: Remember me," + name + ", for I shall be your doom!")
    scene.cameraShake(5, 5000)
    game.over(false, effects.splatter)
})
function levelSPMusic () {
	
}
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 125, 0)
    player2.z = 5
    info.setLife(10)
    info.setScore(0)
}
function level2Music () {
    music.stopAllSounds()
    music.setTempo(135)
    for (let index = 0; index < 1; index++) {
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Whole))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Whole))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Whole))
        music.playTone(392, music.beat(BeatFraction.Double))
    }
    for (let index = 0; index < 1; index++) {
        music.playTone(392, music.beat(BeatFraction.Half))
        music.playTone(659, music.beat(BeatFraction.Half))
        music.playTone(587, music.beat(BeatFraction.Whole))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Whole))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Whole))
        music.playTone(392, music.beat(BeatFraction.Double))
    }
    for (let index = 0; index < 1; index++) {
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Whole))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Whole))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Whole))
        music.playTone(392, music.beat(BeatFraction.Double))
    }
    for (let index = 0; index < 1; index++) {
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(349, music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(392, music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(392, music.beat(BeatFraction.Whole))
        music.playTone(262, music.beat(BeatFraction.Double))
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.bossProjectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Ow!", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function initializeLevel (level: number) {
    playerStartLocation = tiles.getTilesByType(assets.tile`tile9`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
    spawnBoxes()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Flier, function (sprite, otherSprite) {
    if (enemycount > 0) {
        sprite.destroy()
        otherSprite.destroy(effects.warmRadial, 500)
        info.changeScoreBy(5)
        enemycount += -1
    } else if (enemycount == 0) {
        sprite.destroy()
        otherSprite.destroy(effects.warmRadial, 500)
        info.changeScoreBy(5)
        enemycount += 0
    }
    if (currentLevel == 7) {
        enemyKill += 1
    }
})
sprites.onOverlap(SpriteKind.DestroyableBox, SpriteKind.DestroyableBox, function (sprite, otherSprite) {
    sprite.y += 16
})
function testlevelMusic () {
    music.setTempo(72)
    for (let index = 0; index < 2; index++) {
        music.playTone(220, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Half))
        music.playTone(554, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Half))
        music.playTone(294, music.beat(BeatFraction.Half))
        music.playTone(370, music.beat(BeatFraction.Half))
        music.playTone(554, music.beat(BeatFraction.Half))
        music.playTone(659, music.beat(BeatFraction.Half))
        music.playTone(554, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Half))
    }
}
function hasNextLevel () {
	
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.DestroyableBox, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate, 500)
    music.pewPew.play()
})
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(assets.tile`tile10`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 1 f . . . . . . . 
            . . . . . f f 9 1 f . . . . . . 
            . . . . . f 6 f 1 f f . . . . . 
            . . . . . f 6 6 f 1 f . . . . . 
            . . . . . f 6 6 9 1 f . . . . . 
            . . . . . f 6 6 9 1 f . . . . . 
            . . . . . f 6 6 9 1 f . . . . . 
            . . . . . f 6 6 9 1 f . . . . . 
            . . . . . f 6 f f 1 f . . . . . 
            . . . . . . f 6 6 f f . . . . . 
            . . . . . . . f 6 f . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
    for (let value152 of tiles.getTilesByType(assets.tile`tile20`)) {
        LifeOrb = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 7 7 7 7 7 7 . . . . . 
            . . . 6 7 7 7 7 7 7 7 7 7 . . . 
            . . 6 7 6 7 7 7 7 7 7 1 7 7 . . 
            . . 7 6 7 7 7 7 7 7 1 1 1 7 . . 
            . 6 6 7 7 7 7 7 7 7 7 1 7 7 7 . 
            . 6 7 6 7 7 7 7 7 7 7 7 7 7 7 . 
            . 6 6 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 6 6 6 7 7 7 7 7 7 7 7 7 7 7 . 
            . 6 6 7 6 7 7 7 7 7 7 7 7 7 7 . 
            . 6 6 6 7 6 7 7 7 7 7 7 7 7 7 . 
            . . 6 6 6 7 6 7 7 7 7 7 6 7 . . 
            . . 6 6 6 6 7 6 7 6 7 6 7 6 . . 
            . . . 6 6 6 6 6 6 7 6 7 6 . . . 
            . . . . . 6 6 6 6 6 6 . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Life)
        tiles.placeOnTile(LifeOrb, value152)
        tiles.setTileAt(value152, assets.tile`tile0`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Ow!", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
let badProjectileDiagR: Sprite = null
let badProjectileDiagL: Sprite = null
let badProjectile: Sprite = null
let LifeOrb: Sprite = null
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let end1: Sprite = null
let flier: Sprite = null
let bumper: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let slimeboss: Sprite = null
let statusbar2: StatusBarSprite = null
let bossMode = false
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let end2: Sprite = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let gunshot: Sprite = null
let heroFacingLeft = false
let doubleJumpSpeed = 0
let canDoubleJump = false
let lavaBlock: Sprite = null
let Barrier2: Sprite = null
let PassThruBox: Sprite = null
let Crate: Sprite = null
let coinAnimation: animation.Animation = null
let name = ""
let enemycount = 0
let currentLevel = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero: Sprite = null
let titlebar = 0
class ActionKind {
    static RunningLeft = 0
    static RunningRight = 1
    static Idle = 2
    static IdleLeft = 3
    static IdleRight = 4
    static JumpingLeft = 5
    static JumpingRight = 6
    static CrouchLeft = 7
    static CrouchRight = 8
    static Flying = 9
    static Walking = 10
    static Jumping = 11
}
music.setVolume(20)
titlebar = 1
let Title2 = sprites.create(assets.image`TitleScreen`, SpriteKind.Title)
animation.runImageAnimation(
Title2,
[img`
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111ffffff1111ffffffff1111ff111111ff11ffffffff11ff111111ff11ffffffffff11ff111111ff11ffffffff1111ffffffff1111111111111111111111111111
    11111111111111111111111111111111ffffff1111ffffffff1111ff111111ff11ffffffff11ff111111ff11ffffffffff11ff111111ff11ffffffff1111ffffffff1111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ffff1111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ffff1111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ff11ff11ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ffffffffff11ff111111ff11ff111111ff11fffff11111ff11ff11ff111111ff111111ff111111ff11ff111111ff11fffff1111111111111111111111111111111
    111111111111111111111111111111ffffffffff11ff111111ff1111ff11ff1111fffff11111ff1111ffff111111ff111111ff111111ff11ffffffff1111fffff1111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff1111ffff111111ff111111ff111111ff11ffffffff1111ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff111111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff111111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ffffffff11111111ff111111ffffffff11ff111111ff111111ff11111111ffffff1111ff111111ff11ffffffff1111111111111111111111111111
    111111111111111111111111111111ff111111ff11ffffffff11111111ff111111ffffffff11ff111111ff111111ff11111111ffffff1111ff111111ff11ffffffff1111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111ffff1111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1f1f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111ffff1111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111ff11f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111f11f1f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111f11f1f111f11ff111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111ff11f111f1f11f11111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f11f11f11f11111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111ffff1f111ff111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111f1fff11f1111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111f1111ff11f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111f111fff1f1f111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111ffffff111f1ff11111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111f111f1111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111fffffff11111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    `,img`
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111ffffff1111ffffffff1111ff111111ff11ffffffff11ff111111ff11ffffffffff11ff111111ff11ffffffff1111ffffffff1111111111111111111111111111
    11111111111111111111111111111111ffffff1111ffffffff1111ff111111ff11ffffffff11ff111111ff11ffffffffff11ff111111ff11ffffffff1111ffffffff1111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ffff1111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ffff1111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ff11ff11ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ffffffffff11ff111111ff11ff111111ff11fffff11111ff11ff11ff111111ff111111ff111111ff11ff111111ff11fffff1111111111111111111111111111111
    111111111111111111111111111111ffffffffff11ff111111ff1111ff11ff1111fffff11111ff1111ffff111111ff111111ff111111ff11ffffffff1111fffff1111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff1111ffff111111ff111111ff111111ff11ffffffff1111ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff111111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff111111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ffffffff11111111ff111111ffffffff11ff111111ff111111ff11111111ffffff1111ff111111ff11ffffffff1111111111111111111111111111
    111111111111111111111111111111ff111111ff11ffffffff11111111ff111111ffffffff11ff111111ff111111ff11111111ffffff1111ff111111ff11ffffffff1111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111ffff1111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1f1f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111ffff1111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111ff11f1f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1f1f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f11ffff111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111ff1f11111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1f1f1111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1f11f111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111ff1f11f111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111ff1f1f1111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111ff1ff11111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111ff111f1111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111ff1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111fffffff11111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    `,img`
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111ffffff1111ffffffff1111ff111111ff11ffffffff11ff111111ff11ffffffffff11ff111111ff11ffffffff1111ffffffff1111111111111111111111111111
    11111111111111111111111111111111ffffff1111ffffffff1111ff111111ff11ffffffff11ff111111ff11ffffffffff11ff111111ff11ffffffff1111ffffffff1111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ffff1111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ffff1111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ff11ff11ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ffffffffff11ff111111ff11ff111111ff11fffff11111ff11ff11ff111111ff111111ff111111ff11ff111111ff11fffff1111111111111111111111111111111
    111111111111111111111111111111ffffffffff11ff111111ff1111ff11ff1111fffff11111ff1111ffff111111ff111111ff111111ff11ffffffff1111fffff1111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff1111ffff111111ff111111ff111111ff11ffffffff1111ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff111111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff111111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ffffffff11111111ff111111ffffffff11ff111111ff111111ff11111111ffffff1111ff111111ff11ffffffff1111111111111111111111111111
    111111111111111111111111111111ff111111ff11ffffffff11111111ff111111ffffffff11ff111111ff111111ff11111111ffffff1111ff111111ff11ffffffff1111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111ffff1111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1f1f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111ffff1111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111ff11f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111f11f1f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111f11f1f111f11ff111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111ff11f111f1f11f11111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111f1f11f11f11f11111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111f1ff11f111ff111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111f11111f1f1111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111f1111ff11f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111f111fff1f1f111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111ffffff111f1ff11111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111f111f1111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111fffffff11111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    `,img`
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff1111111111fffffffffffffff1111111111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    111111111111111111111111111fffff11111fffff1111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffffffffffffffffffff111111111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff111111111111111fffff111111111111111fffff11111fffff111111111111111fffff11111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    11111111111111111111111111111111fffff11111111111111111111fffffffffffffff111111111111111fffffffffffffff1111111111fffff1111111111111111fffff1111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111ffffff111ffffff111111fff111111ffffff111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111fff111fff111111fff111111fff111fff111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111ffffff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111111fff111111fff111111111fff111111fff1111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111fff111111111fff111fffffffff111fff111111111fff111fffffffff1111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111ffffff1111ffffffff1111ff111111ff11ffffffff11ff111111ff11ffffffffff11ff111111ff11ffffffff1111ffffffff1111111111111111111111111111
    11111111111111111111111111111111ffffff1111ffffffff1111ff111111ff11ffffffff11ff111111ff11ffffffffff11ff111111ff11ffffffff1111ffffffff1111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ffff1111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ffff1111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff11ff111111ff11ff11111111ff11ff11ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ffffffffff11ff111111ff11ff111111ff11fffff11111ff11ff11ff111111ff111111ff111111ff11ff111111ff11fffff1111111111111111111111111111111
    111111111111111111111111111111ffffffffff11ff111111ff1111ff11ff1111fffff11111ff1111ffff111111ff111111ff111111ff11ffffffff1111fffff1111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff1111ffff111111ff111111ff111111ff11ffffffff1111ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff111111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ff111111ff1111ff11ff1111ff11111111ff111111ff111111ff111111ff111111ff11ff111111ff11ff1111111111111111111111111111111111
    111111111111111111111111111111ff111111ff11ffffffff11111111ff111111ffffffff11ff111111ff111111ff11111111ffffff1111ff111111ff11ffffffff1111111111111111111111111111
    111111111111111111111111111111ff111111ff11ffffffff11111111ff111111ffffffff11ff111111ff111111ff11111111ffffff1111ff111111ff11ffffffff1111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111ffff1111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1f1f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f111111f11111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111ffff1111111111111111111111111111111111111111111111111111111111111111111111111111
    11111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111ff11f1f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f11f1f1f11111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f11ffff111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111ff1f11111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111f1f1f1111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111ffff1f111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111ff1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f1111f1111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f11ff11111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111f1f11f1111111111111111111111111111111111111111111111111111111111111111111111111111
    111111111111111111111111111111111111111111111111111111111111111111111111111111ff1111f111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111fffffff11111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    `],
500,
true
)
let statusbar = statusbars.create(82, 4, StatusBarKind.Health)
statusbar.setPosition(81, 100)
statusbar.max = 5000
statusbar.value = 5000
statusbar.setColor(1, 15)
statusbar.setStatusBarFlag(StatusBarFlag.InvertFillDirection, true)
while (statusbar.value != 0) {
    pause(randint(25, 150))
    statusbar.value += -100
}
color.startFade(color.originalPalette, color.GrayScale, 1000)
color.pauseUntilFadeDone()
pause(500)
color.startFade(color.GrayScale, color.White, 1000)
color.pauseUntilFadeDone()
Title2.destroy()
statusbar.destroy()
hero = sprites.create(img`
    ................
    ................
    .....ffff.......
    ....f1111f......
    ...f111111f.....
    ...f11f1f1f.....
    ...f111111f.....
    ...f111111f.....
    ....f1111f......
    .....ffff.......
    .....f11f.......
    ....f1111f......
    ....f1111f......
    .....f111f......
    ....ff111ff.....
    ...f11f11f1f....
    ...f11ff1f1f....
    ....ffff1ff.....
    ...f1f.f1f......
    ...f1f.f1f......
    ..f1f..f1f......
    ..f1f.ff1ff.....
    ..f11ff111f.....
    .f1111f1111ff...
    .ffffffffffff...
    `, SpriteKind.Player)
// how long to pause between each contact with a
// single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundImage(img`
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    `)
initializeAnimations()
createPlayer(hero)
let levelCount = 13
currentLevel = 0
setLevelTileMap(currentLevel)
color.startFade(color.White, color.Matte, 1000)
color.pauseUntilFadeDone()
color.startFade(color.Matte, color.originalPalette, 1000)
color.pauseUntilFadeDone()
titlebar = 0
let enemyKill = 0
giveIntroduction()
game.onUpdate(function () {
	
})
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.CrouchLeft)
        } else {
            animation.setAction(hero, ActionKind.CrouchRight)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.JumpingLeft)
        } else {
            animation.setAction(hero, ActionKind.JumpingRight)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.RunningLeft)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.RunningRight)
    } else if (heroFacingLeft) {
        animation.setAction(hero, ActionKind.IdleLeft)
    } else {
        animation.setAction(hero, ActionKind.IdleRight)
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - hero.x) < 60) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Flying)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Idle)
        }
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})
game.onUpdateInterval(5000, function () {
	
})
forever(function () {
    if (currentLevel < 7) {
        testlevelMusic()
    } else if (currentLevel == 7) {
        level1Music()
    } else if (currentLevel == 8) {
        level2Music()
    } else if (currentLevel == 9) {
        levelSPMusic()
    } else if (currentLevel == 10) {
        level3music()
    } else if (currentLevel == 11) {
    	
    } else if (currentLevel == 12) {
        levelboss()
    } else {
        endMusic()
    }
})
game.onUpdateInterval(200, function () {
    if (bossMode == true) {
        if (statusbar2.value >= 250) {
            for (let index = 0; index < randint(0, 10); index++) {
                badProjectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . 2 . . . . . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . 2 . . . 2 2 2 2 . 2 . . . 
                    . . . 2 . . . 2 2 2 5 2 2 . . . 
                    . . . 2 2 . . 2 2 2 5 5 2 . . . 
                    . . . 2 2 2 . 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 2 . . 
                    . . 2 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 2 4 2 2 2 2 2 2 2 2 2 . . 
                    . . . . 4 4 2 2 2 2 2 2 2 . . . 
                    . . . . . 4 4 4 4 4 2 2 . . . . 
                    `, slimeboss, 0, 150)
                badProjectileDiagL = sprites.createProjectileFromSprite(img`
                    . . . . . . . . 2 . . . . . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . 2 . . . 2 2 2 2 . 2 . . . 
                    . . . 2 . . . 2 2 2 5 2 2 . . . 
                    . . . 2 2 . . 2 2 2 5 5 2 . . . 
                    . . . 2 2 2 . 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 2 . . 
                    . . 2 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 2 4 2 2 2 2 2 2 2 2 2 . . 
                    . . . . 4 4 2 2 2 2 2 2 2 . . . 
                    . . . . . 4 4 4 4 4 2 2 . . . . 
                    `, slimeboss, -100, 150)
                badProjectileDiagR = sprites.createProjectileFromSprite(img`
                    . . . . . . . . 2 . . . . . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . 2 . . . 2 2 2 2 . 2 . . . 
                    . . . 2 . . . 2 2 2 5 2 2 . . . 
                    . . . 2 2 . . 2 2 2 5 5 2 . . . 
                    . . . 2 2 2 . 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 2 . . 
                    . . 2 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 2 4 2 2 2 2 2 2 2 2 2 . . 
                    . . . . 4 4 2 2 2 2 2 2 2 . . . 
                    . . . . . 4 4 4 4 4 2 2 . . . . 
                    `, slimeboss, 100, 150)
                badProjectile.setKind(SpriteKind.bossProjectile)
                badProjectileDiagL.setKind(SpriteKind.bossProjectile)
                badProjectileDiagR.setKind(SpriteKind.bossProjectile)
            }
        } else {
            for (let index = 0; index < randint(10, 20); index++) {
                badProjectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . 2 . . . . . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . 2 . . . 2 2 2 2 . 2 . . . 
                    . . . 2 . . . 2 2 2 5 2 2 . . . 
                    . . . 2 2 . . 2 2 2 5 5 2 . . . 
                    . . . 2 2 2 . 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 2 . . 
                    . . 2 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 2 4 2 2 2 2 2 2 2 2 2 . . 
                    . . . . 4 4 2 2 2 2 2 2 2 . . . 
                    . . . . . 4 4 4 4 4 2 2 . . . . 
                    `, slimeboss, 0, 200)
                badProjectileDiagL = sprites.createProjectileFromSprite(img`
                    . . . . . . . . 2 . . . . . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . 2 . . . 2 2 2 2 . 2 . . . 
                    . . . 2 . . . 2 2 2 5 2 2 . . . 
                    . . . 2 2 . . 2 2 2 5 5 2 . . . 
                    . . . 2 2 2 . 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 2 . . 
                    . . 2 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 2 4 2 2 2 2 2 2 2 2 2 . . 
                    . . . . 4 4 2 2 2 2 2 2 2 . . . 
                    . . . . . 4 4 4 4 4 2 2 . . . . 
                    `, slimeboss, -200, 200)
                badProjectileDiagR = sprites.createProjectileFromSprite(img`
                    . . . . . . . . 2 . . . . . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . . . . . . 2 . . . 2 . . . 
                    . . . 2 . . . 2 2 2 2 . 2 . . . 
                    . . . 2 . . . 2 2 2 5 2 2 . . . 
                    . . . 2 2 . . 2 2 2 5 5 2 . . . 
                    . . . 2 2 2 . 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 5 . . . 
                    . . . 2 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 . . . 
                    . . 2 4 2 2 2 2 2 2 2 5 2 2 . . 
                    . . 2 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 4 2 2 2 2 2 2 2 2 2 2 . . 
                    . . . 2 4 2 2 2 2 2 2 2 2 2 . . 
                    . . . . 4 4 2 2 2 2 2 2 2 . . . 
                    . . . . . 4 4 4 4 4 2 2 . . . . 
                    `, slimeboss, 200, 200)
                badProjectile.setKind(SpriteKind.bossProjectile)
                badProjectileDiagL.setKind(SpriteKind.bossProjectile)
                badProjectileDiagR.setKind(SpriteKind.bossProjectile)
            }
        }
    }
})
