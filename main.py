class ActionKind(Enum):
    RunningLeft = 0
    RunningRight = 1
    Idle = 2
    IdleLeft = 3
    IdleRight = 4
    JumpingLeft = 5
    JumpingRight = 6
    CrouchLeft = 7
    CrouchRight = 8
    Flying = 9
    Walking = 10
    Jumping = 11
@namespace
class SpriteKind:
    Bumper = SpriteKind.create()
    Goal = SpriteKind.create()
    Coin = SpriteKind.create()
    Flier = SpriteKind.create()
    Box = SpriteKind.create()
    DestroyableBox = SpriteKind.create()
    Title = SpriteKind.create()
    PassThru = SpriteKind.create()
    Barrier = SpriteKind.create()
    Lava = SpriteKind.create()
    Life = SpriteKind.create()
    SceneSprite = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    sprite.y += -1
sprites.on_overlap(SpriteKind.Flier, SpriteKind.PassThru, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    global enemycount, enemyKill
    if enemycount > 0:
        sprite.destroy()
        otherSprite.destroy(effects.cool_radial, 500)
        info.change_score_by(5)
        enemycount += -1
    elif enemycount == 0:
        sprite.destroy()
        otherSprite.destroy(effects.cool_radial, 500)
        info.change_score_by(5)
        enemycount += 0
    if currentLevel == 7:
        enemyKill += 1
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Bumper, on_on_overlap2)

def on_overlap_tile(sprite, location):
    global currentLevel
    info.change_life_by(1)
    currentLevel += 1
    if currentLevel < 19:
        game.splash("Next level unlocked!")
        music.stop_all_sounds()
        setLevelTileMap(currentLevel)
        beforegameDialogue()
    else:
        game.over(True, effects.confetti)
scene.on_overlap_tile(SpriteKind.player, myTiles.tile63, on_overlap_tile)

def on_on_overlap3(sprite, otherSprite):
    if sprite.vy > 0 and not (sprite.is_hitting_tile(CollisionDirection.BOTTOM)) or sprite.y < otherSprite.top:
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.change_score_by(1)
        music.jump_down.play()
    else:
        info.change_life_by(-1)
        sprite.say("oof", invincibilityPeriod)
        pause(invincibilityPeriod)
sprites.on_overlap(SpriteKind.player, SpriteKind.Bumper, on_on_overlap3)

def initializeAnimations():
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
def giveIntroduction():
    global name
    game.set_dialog_frame(img("""
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
    """))
    game.set_dialog_cursor(img("""
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
    """))
    showInstruction("Scientist: Ah. You're Awake. You are...?")
    name = game.ask_for_string("What is your name?")
    showInstruction("Ah I remember now. You're that " + name + " guy that our Lieutenant has been talking about.")
    showInstruction("Scientist: Your goal is to exterminate all slimes.")
    showInstruction("Scientist: You can move with the arrow keys.")
    showInstruction("Scientist: You can jump with the A key.")
    showInstruction("Scientist: Crouch by using the down key.")
    showInstruction("Scientist: Make sure to avoid the lava blocks. They hurt you..")
    showInstruction("Scientist: Good luck, you'll need it.")
def initializeCoinAnimation():
    global coinAnimation
    coinAnimation = animation.create_animation(ActionKind.Idle, 200)
    coinAnimation.add_animation_frame(img("""
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
    """))
    coinAnimation.add_animation_frame(img("""
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
    """))
    coinAnimation.add_animation_frame(img("""
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
    """))
    coinAnimation.add_animation_frame(img("""
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
    """))
    coinAnimation.add_animation_frame(img("""
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
    """))
    coinAnimation.add_animation_frame(img("""
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
    """))
    coinAnimation.add_animation_frame(img("""
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
    """))
    coinAnimation.add_animation_frame(img("""
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
    """))
    coinAnimation.add_animation_frame(img("""
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
    """))
    coinAnimation.add_animation_frame(img("""
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
    """))

def on_on_overlap4(sprite, otherSprite):
    if enemycount < 1:
        sprite.destroy()
        otherSprite.destroy(effects.disintegrate, 500)
        music.power_down.play()
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Barrier, on_on_overlap4)

def spawnBoxes():
    global Crate, PassThruBox, Barrier2, lavaBlock
    # enemy that moves back and forth
    for value11 in tiles.get_tiles_by_type(myTiles.tile15):
        Crate = sprites.create(img("""
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
            """),
            SpriteKind.DestroyableBox)
        tiles.place_on_tile(Crate, value11)
        tiles.set_tile_at(value11, myTiles.tile0)
    # enemy that moves back and forth
    for value12 in tiles.get_tiles_by_type(myTiles.tile17):
        PassThruBox = sprites.create(img("""
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
            """),
            SpriteKind.PassThru)
        tiles.place_on_tile(PassThruBox, value12)
        tiles.set_tile_at(value12, myTiles.tile0)
    # enemy that moves back and forth
    for value13 in tiles.get_tiles_by_type(myTiles.tile18):
        Barrier2 = sprites.create(img("""
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
            """),
            SpriteKind.Barrier)
        tiles.place_on_tile(Barrier2, value13)
        tiles.set_tile_at(value13, myTiles.tile0)
    # enemy that moves back and forth
    for value14 in tiles.get_tiles_by_type(myTiles.tile19):
        lavaBlock = sprites.create(img("""
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
            """),
            SpriteKind.Lava)
        tiles.place_on_tile(lavaBlock, value14)
        tiles.set_tile_at(value14, myTiles.tile0)

def on_on_overlap5(sprite, otherSprite):
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.change_score_by(3)
    music.ba_ding.play()
sprites.on_overlap(SpriteKind.player, SpriteKind.Coin, on_on_overlap5)

def attemptJump():
    global doubleJumpSpeed, canDoubleJump
    # else if: either fell off a ledge, or double jumping
    if hero.is_hitting_tile(CollisionDirection.BOTTOM):
        hero.vy = -6 * pixelsToMeters
    elif canDoubleJump:
        doubleJumpSpeed = -6 * pixelsToMeters
        # Good double jump
        if hero.vy >= -40:
            doubleJumpSpeed = -5 * pixelsToMeters
            hero.start_effect(effects.trail, 500)
            scene.camera_shake(4, 250)
        hero.vy = doubleJumpSpeed
        canDoubleJump = False

def on_b_pressed():
    global gunshot
    if currentLevel >= 5:
        if controller.down.is_pressed():
            if heroFacingLeft:
                gunshot = sprites.create_projectile_from_sprite(img("""
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
                    """),
                    hero,
                    -100,
                    0)
            elif not (heroFacingLeft):
                gunshot = sprites.create_projectile_from_sprite(img("""
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
                    """),
                    hero,
                    100,
                    0)
        elif controller.up.is_pressed():
            gunshot = sprites.create_projectile_from_sprite(img("""
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
                """),
                hero,
                0,
                -100)
        else:
            if heroFacingLeft:
                gunshot = sprites.create_projectile_from_sprite(img("""
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
                    """),
                    hero,
                    -100,
                    0)
            elif not (heroFacingLeft):
                gunshot = sprites.create_projectile_from_sprite(img("""
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
                    """),
                    hero,
                    100,
                    0)
        music.pew_pew.play()
    else:
        showInstruction("Scientist: No. You cannot use this yet!")
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_on_overlap6(sprite, otherSprite):
    sprite.y += 5
sprites.on_overlap(SpriteKind.player, SpriteKind.PassThru, on_on_overlap6)

def animateIdle():
    global mainIdleLeft, mainIdleRight
    mainIdleLeft = animation.create_animation(ActionKind.IdleLeft, 100)
    animation.attach_animation(hero, mainIdleLeft)
    mainIdleLeft.add_animation_frame(img("""
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
    """))
    mainIdleRight = animation.create_animation(ActionKind.IdleRight, 100)
    animation.attach_animation(hero, mainIdleRight)
    mainIdleRight.add_animation_frame(img("""
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
    """))
def level1Music():
    music.stop_all_sounds()
    music.set_tempo(149)
    for index in range(2):
        music.play_tone(247, music.beat(BeatFraction.HALF))
        music.play_tone(277, music.beat(BeatFraction.HALF))
        music.play_tone(294, music.beat(BeatFraction.HALF))
        music.play_tone(440, music.beat(BeatFraction.BREVE))
        music.play_tone(370, music.beat(BeatFraction.HALF))
        music.play_tone(330, music.beat(BeatFraction.WHOLE))
        music.play_tone(247, music.beat(BeatFraction.HALF))
        music.play_tone(277, music.beat(BeatFraction.HALF))
        music.play_tone(294, music.beat(BeatFraction.HALF))
        music.play_tone(370, music.beat(BeatFraction.BREVE))
        music.play_tone(294, music.beat(BeatFraction.HALF))
        music.play_tone(277, music.beat(BeatFraction.WHOLE))
    for index2 in range(1):
        music.play_tone(185, music.beat(BeatFraction.DOUBLE))
        music.play_tone(185, music.beat(BeatFraction.WHOLE))
        music.play_tone(220, music.beat(BeatFraction.HALF))
        music.play_tone(147, music.beat(BeatFraction.HALF))
        music.play_tone(139, music.beat(BeatFraction.WHOLE))
        music.play_tone(139, music.beat(BeatFraction.BREVE))
        music.play_tone(277, music.beat(BeatFraction.QUARTER))
        music.play_tone(294, music.beat(BeatFraction.QUARTER))
        music.play_tone(277, music.beat(BeatFraction.HALF))
        music.play_tone(220, music.beat(BeatFraction.HALF))
        music.play_tone(165, music.beat(BeatFraction.DOUBLE))
        music.play_tone(185, music.beat(BeatFraction.HALF))
        music.play_tone(220, music.beat(BeatFraction.HALF))
        music.play_tone(147, music.beat(BeatFraction.HALF))
        music.play_tone(139, music.beat(BeatFraction.BREVE))
    for index3 in range(1):
        music.play_tone(185, music.beat(BeatFraction.DOUBLE))
        music.play_tone(185, music.beat(BeatFraction.WHOLE))
        music.play_tone(220, music.beat(BeatFraction.HALF))
        music.play_tone(147, music.beat(BeatFraction.HALF))
        music.play_tone(139, music.beat(BeatFraction.WHOLE))
        music.play_tone(139, music.beat(BeatFraction.BREVE))
        music.play_tone(277, music.beat(BeatFraction.QUARTER))
        music.play_tone(294, music.beat(BeatFraction.QUARTER))
        music.play_tone(277, music.beat(BeatFraction.HALF))
        music.play_tone(220, music.beat(BeatFraction.HALF))
        music.play_tone(165, music.beat(BeatFraction.DOUBLE))
        music.play_tone(185, music.beat(BeatFraction.HALF))
        music.play_tone(220, music.beat(BeatFraction.HALF))
        music.play_tone(330, music.beat(BeatFraction.HALF))
        music.play_tone(370, music.beat(BeatFraction.BREVE))
    for index4 in range(1):
        music.play_tone(370, music.beat(BeatFraction.DOUBLE))
        music.play_tone(370, music.beat(BeatFraction.WHOLE))
        music.play_tone(440, music.beat(BeatFraction.WHOLE))
        music.play_tone(294, music.beat(BeatFraction.WHOLE))
        music.play_tone(277, music.beat(BeatFraction.DOUBLE))
        music.play_tone(277, music.beat(BeatFraction.WHOLE))
        music.play_tone(247, music.beat(BeatFraction.WHOLE))
        music.play_tone(185, music.beat(BeatFraction.WHOLE))
        music.play_tone(294, music.beat(BeatFraction.DOUBLE))
        music.play_tone(294, music.beat(BeatFraction.WHOLE))
        music.play_tone(294, music.beat(BeatFraction.WHOLE))
        music.play_tone(330, music.beat(BeatFraction.WHOLE))
        music.play_tone(277, music.beat(BeatFraction.DOUBLE))
        music.play_tone(277, music.beat(BeatFraction.WHOLE))
        music.play_tone(247, music.beat(BeatFraction.WHOLE))
        music.play_tone(185, music.beat(BeatFraction.WHOLE))
        music.play_tone(440, music.beat(BeatFraction.DOUBLE))
        music.play_tone(440, music.beat(BeatFraction.WHOLE))
        music.play_tone(440, music.beat(BeatFraction.WHOLE))
        music.play_tone(494, music.beat(BeatFraction.WHOLE))
        music.play_tone(370, music.beat(BeatFraction.DOUBLE))
        music.play_tone(370, music.beat(BeatFraction.WHOLE))
        music.play_tone(330, music.beat(BeatFraction.WHOLE))
        music.play_tone(247, music.beat(BeatFraction.WHOLE))
        music.play_tone(740, music.beat(BeatFraction.WHOLE))
        music.play_tone(466, music.beat(BeatFraction.WHOLE))
        music.play_tone(370, music.beat(BeatFraction.WHOLE))
        music.play_tone(277, music.beat(BeatFraction.WHOLE))
        music.play_tone(196, music.beat(BeatFraction.WHOLE))
        music.play_tone(185, music.beat(BeatFraction.BREVE))
def setLevelTileMap(level: number):
    clearGame()
    if level == 0:
        tiles.set_tilemap(tilemap("""
            level
        """))
    elif level == 1:
        tiles.set_tilemap(tilemap("""
            level_0
        """))
    elif level == 2:
        tiles.set_tilemap(tilemap("""
            level_7
        """))
    elif level == 3:
        tiles.set_tilemap(tilemap("""
            level_8
        """))
    elif level == 4:
        tiles.set_tilemap(tilemap("""
            level_1
        """))
    elif level == 5:
        tiles.set_tilemap(tilemap("""
            level_2
        """))
    elif level == 6:
        tiles.set_tilemap(tilemap("""
            level_3
        """))
    elif level == 7:
        tiles.set_tilemap(tilemap("""
            level_9
        """))
        scene.set_background_image(img("""
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
        """))
    elif level == 8:
        tiles.set_tilemap(tilemap("""
            level_10
        """))
        scene.set_background_image(img("""
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
        """))
    elif level == 9:
        tiles.set_tilemap(tilemap("""
            level_11
        """))
        scene.set_background_image(img("""
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
        """))
    else:
        pass
    initializeLevel(level)
def initializeFlierAnimations():
    global flierFlying, flierIdle
    flierFlying = animation.create_animation(ActionKind.Flying, 100)
    flierFlying.add_animation_frame(img("""
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
    """))
    flierFlying.add_animation_frame(img("""
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
    """))
    flierIdle = animation.create_animation(ActionKind.Idle, 100)
    flierIdle.add_animation_frame(img("""
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
    """))

def on_a_pressed():
    if titlebar == 0:
        attemptJump()
    else:
        pass
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def animateRun():
    global mainRunLeft, mainRunRight
    mainRunLeft = animation.create_animation(ActionKind.RunningLeft, 100)
    animation.attach_animation(hero, mainRunLeft)
    mainRunLeft.add_animation_frame(img("""
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
    """))
    mainRunLeft.add_animation_frame(img("""
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
    """))
    mainRunLeft.add_animation_frame(img("""
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
    """))
    mainRunLeft.add_animation_frame(img("""
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
    """))
    mainRunRight = animation.create_animation(ActionKind.RunningRight, 100)
    animation.attach_animation(hero, mainRunRight)
    mainRunRight.add_animation_frame(img("""
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
    """))
    mainRunRight.add_animation_frame(img("""
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
    """))
    mainRunRight.add_animation_frame(img("""
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
    """))
    mainRunRight.add_animation_frame(img("""
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
    """))
def level3scene():
    global scene2, scene22, scene3, scene4
    scene2 = sprites.create(img("""
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
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccff6666ffccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccf6666666fffcccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffff66fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccf6666ffffffccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbfffffffffffffffffffbbccccccccccccccccccccccffffff1111fcccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbf111111111111111111fbbfffffcccccccccccccccfff1111111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbf111111111111111111fbf4444dfcccccccccccccccfff1ff111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbf1111111111111111111f44444f4fccccccccccccccf11111111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbf1111111111111111111fe44f444fccccccccccccccf1f1f1111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbf1111111111111111111fe444444fbbccccccccccccf1f1f1111111fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbf11111111111111111111fee44444fbbbbccccccccccf11111111111fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbf1111111cbbbb111111111fe44444fbbbbbbccccccccf11111111111fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbf1111ccbbcccbbb1111111fee444fbbbbbbbfffccccccf1ff111111fcccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccfffffffffffffffbbbbbbbbbbbbbbbf111ccccccccccbb1111111fffffbbbbfffffffcccccccf1111111fccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccfff111111111111111fffbbbbbbbbbbbbf11ccccccccccccbbb11111fbbbbbbbbfffffffbbccccccfffffffcccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccff111111111111111111111ffbbbbbbbbbf11ccccccccccccfccbb1111fbbbbbbbbbbbffffffffffffff1ffcccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccf1111111111111111111111111fbbbbbbbbf1cccccccccccccccccb1111fbbbbbbbbbbbf11111111111111fffccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccff111111111111111111111111111ffbbbbbbf1ccccccccccccccccccbb111fbbbbbbbbbbf11fffffffffffff1fccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccf1111111111111111111111111111111fbbbbbf1cccccccccccccccccccc111fbbbbbbbbbbffff111ff11ff1111fccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccf111111111111111111111111111111111fbbbbf1cccccfcccccccccccccc111fbbbbbbbbbbbbbff111111ff11111fcccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccf11111111111111111111111111111111111fbbf1cccccccccccccccccccccc111fbbbbbbbbbbbbbbffffffbf11111fcccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccf1111111111111111111111111111111111111fbf1cccccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbbbbbf1111fcccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccf111111111111111111111111111111111111111ff1cccccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbbbbbff111fbccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccf11111111111111111111111111111111111111111f1cccccccccccccccccccccc1111fbbbbbbbbbbbbbbbbbbbbbbf111fbbbccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccf11111111111111111111111111111111111111ffffffccffffcccccccccccccccff11fbbbbbbbbbbbbbbbbbbbbbbbf11fbbbbbccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccf11111111111111111111111111111111111111ffffffffffffffcccccccccccccf9ff1fbbbbbbbbbbbbbbbbbbbbbbbf11fbbbbbbcccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccf1111111111111111111fffffff111111111111ffffffffff2ff2fccccccccccccf9911f1fbbbbbbbbbbbbbbbbbbbbff11ffbbbbbbbbcccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccf111111111111111111ffffffffff1111111111ffffffffffffffffccccccccccf9999ff1fbbbbbbbbbbbbbbbbbbff1111ffbbbbbbbbbbcccccccccccccccccccccccccc
                    cccccccccccccccccccccccf111111111111111111fffffffffffff1111111ffff1f11fffffffffccccccccccf999999ffbbbbbbbbbbbbbbbbbf1111ff1fbbbbbbbbbbbbcccccccccccccccccccccccc
                    cccccccccccccccccccccccf11111111111111111fffff111f11ffff111111ffff1f11ffffffffccccccccccf8f99999f1fbbbbbbbbbbbbbbbf11fffff1ffbbbbffbbbbbbccccccccccccccccccccccc
                    fffffffffffffffffffffff111111111111111111ffff1111f11fffff11111fff11ffffffffffffffffffffff8999999fffffffffffffffffff11fffff1fffffffffffffffffffffffffffffffffffff
                    ddddddddddddddddddddddf11111111111111111ffff11111fff1ffff11111fff11ffffffdddddddddddddddf8999999fddddddddddddddddf111fdddf11ffddf11ffddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf1111111111111111fffff11111fff11ffffffffffff1ffffffdddddddddddddddf8889999fddddddddddddddff1111fdddf1111fff111fddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf1111111111111111ffff111111fff11ffffffffffff1ffffffdddddddddddddddfff888fffddddddddddddff11111fdddddf1111111111ffddddddddddddddddddddddddd
                    ddddddddddddddddddddddf111111111111ffffffff111111fff11ffffffffffff1ffffffddddddddddddddddddfffdddddddddddddddffffffffdddddfffffffffffffddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffffffffff111111fff111fff11111ffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffffffffff111111fff111fff11111ffff111fffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffff111fff111111fff111fff111111ffff11fffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf11111111111111111ffff1111111111ffff111111ffff1ffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111fffff111111111ffff1111111ffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111fffffff11111fffff11111111ffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb111111111111111111fffffffffffffff111111111fffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111111fffffffffffff1111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111fffffffff111111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111111111111111111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111111111111111111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbb11111111111111111111111111111111111ffff111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbb111111111111111111111111111111111ff111f111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbbb111111111111111111111111111111ff11111f111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddfbbb111111111111111111111111111ff1111111f11111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddfbbbb111111111111111111111111ff111111111f11111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddfbbbb1111111111111111111111f111111111111f111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddfbbb1111111111111111111111f1ffff1111111f11fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddfbbbb11111111111111111111fff11111111111f11fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddfbbbb1111111111111111111f11111111111fff1fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddfbbb111111111111111111f1111ffffffff111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddfbbb11111111111111111f1fff1111111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddfbbb1111111111111111ff111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddfbbb111111111111111f111111111111fdddddddddddddddddddddddddddddfffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddffbbb111111111111111111111111ffddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddfbbb1111111111111111111111fddddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddfffffbb1111111111111111111ffdddddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddf11bbfbb111111111111111fffb1ffdddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf1111bbfffffffffffffffffbbbb111fddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf11111bbbbbbbbbbbfbbbbbbbbbb1111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf11111bbbbbbbbbbfbbbbbbbbb111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf111111bbbbbbbbbfbbbbbbbb1111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf1111111bbbbbbbbfbbbbbbb11111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111bbbbbbfbbbbbb111111111fdddddddddddddddddddddddddddddfddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f111111111111111fddddddddddddddddddddddddddddfdddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f1111111111f1111fddddddddddddddddddddddddddddfddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f1111111111f11111fddddddddddddddddddddddddddfdddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111ffff11f11111fddddddddddddddddddddddddddf1dddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111f11f11f11111fdddddddddddddddddddddddddfd1dddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111f11f11f11111fdddddddddddddddddddddddddf1dddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111fff111f111111fdddddddddddddddddddddddfd1999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddf111111111f11111111f11111ff111f111111fdddddddddddddddddddddddf19999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddf1111111bff11111111f111111111fbb11111fddddddddddddddddddddddf1999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddf11111111bff11111111f111111111fbb11111fddddddddddddddddddddddf1999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddf11111111bbff11111111f111111111fbb111111fddddddddddddddddddddf199999999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddf11111111bbbff11111111f111111111fbbb11111fddddddddddddddddddddf199999999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddf1111111bbbbff11111111f1111111111fbb11111fdddddddddddddddddddf19999999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
        """),
        SpriteKind.SceneSprite)
    scene2.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    showInstruction("Lieutenant: I'm on defense, go continue the work!")
    scene22 = sprites.create(img("""
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
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccff6666ffccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccf6666666fffcccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffff66fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccf6666ffffffccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbfffffffffffffffffffbbccccccccccccccccccccccffffff1111fcccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbf111111111111111111fbbfffffcccccccccccccccfff1111111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbf111111111111111111fbf4444dfcccccccccccccccfff1ff111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbf1111111111111111111f44444f4fccccccccccccccf11111111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbf1111111111111111111fe44f444fccccccccccccccf1f1f1111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbf1111111111111111111fe444444fbbccccccccccccf1f1f1111111fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbf11111111111111111111fee44444fbbbeccccccccccf11111111111fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbf1111111cbbbb111111111fe44444fbbbbbbccccccccf11111111111fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbf1111ccbbcccbbb1111111fee444fb5bbbbbfffccccccf1ff111111fcccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccfffffffffffffffbbbbbbbbbbbbbbbf111ccccccccccbb1111111fffffbbb5fffffffcccccccf1111111fccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccfff111111111111111fffbbbbbbbbbbbbf11ccccccccccccbbb11111fbbbbbbb5fffffffbbccccccfffffffcccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccff111111111111111111111ffbbbbbbbbbf11ccccccccccccfccbb1111fbbbbbb5bbbbffffffffffffff1ffcccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccf1111111111111111111111111fbbbbbbbbf1cccccccccccccccccb1111fbbbbbbbbbbbf11111111111111fffccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccff111111111111111111111111111ffbbbbbbf1ccccccccccccccccccbb111fbbbbbbbbbbf11fffffffffffff1fccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccf1111111111111111111111111111111fbbbbbf1cccccccccccccccccccc111fbbbbbbbbbbffff111ff11ff1111fccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccf111111111111111111111111111111111fbbbbf1cccccfcccccccccccccc111fbbbbbbbbbbbbbff111111ff11111fcccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccf11111111111111111111111111111111111fbbf1cccccccccccccccccccccc111fbbbbbbbbbbbbbbffffffbf11111fcccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccf1111111111111111111111111111111111111fbf1cccccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbbbbbf1111fcccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccf111111111111111111111111111111111111111ff1cccccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbbbbbff111fbccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccf11111111111111111111111111111111111111111f1cccccccccccccccccccccc1111fbbbbbbbbbbbbbbbbbbbbbbf111fbbbccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccf11111111111111111111111111111111111111ffffffccffffcccccccccccccccff11fbbbbbbbbbbbbbbbbbbbbbbbf11fbbbbbccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccf11111111111111111111111111111111111111ffffffffffffffcccccccccccccf9ff1fbbbbbbbbbbbbbbbbbbbbbbbf11fbbbbbbcccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccf1111111111111111111fffffff111111111111ffffffffff2ff2fccccccccccccf9911f1fbbbbbbbbbbbbbbbbbbbbff11ffbbbbbbbbcccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccf111111111111111111ffffffffff1111111111ffffffffffffffffccccccccccf9999ff1fbbbbbbbbbbbbbbbbbbff1111ffbbbbbbbbbbcccccccccccccccccccccccccc
                    cccccccccccccccccccccccf111111111111111111fffffffffffff1111111ffff1f11fffffffffccccccccccf999999ffbbbbbbbbbbbbbbbbbf1111ff1fbbbbbbbbbbbbcccccccccccccccccccccccc
                    cccccccccccccccccccccccf11111111111111111fffff111f11ffff111111ffff1f11ffffffffccccccccccf8f99999f1fbbbbbbbbbbbbbbbf11fffff1ffbbbbffbbbbbbccccccccccccccccccccccc
                    fffffffffffffffffffffff111111111111111111ffff1111f11fffff11111fff11ffffffffffffffffffffff8999999fffffffffffffffffff11fffff1fffffffffffffffffffffffffffffffffffff
                    ddddddddddddddddddddddf11111111111111111ffff11111fff1ffff11111fff11ffffffdddddddddddddddf8999999fddddddddddddddddf111fdddf11ffddf11ffddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf1111111111111111fffff11111fff11ffffffffffff1ffffffdddddddddddddddf8889999fddddddddddddddff1111fdddf1111fff111fddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf1111111111111111ffff111111fff11ffffffffffff1ffffffdddddddddddddddfff888fffddddddddddddff11111fdddddf1111111111ffddddddddddddddddddddddddd
                    ddddddddddddddddddddddf111111111111ffffffff111111fff11ffffffffffff1ffffffddddddddddddddddddfffdddddddddddddddffffffffdddddfffffffffffffddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffffffffff111111fff111fff11111ffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffffffffff111111fff111fff11111ffff111fffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffff111fff111111fff111fff111111ffff11fffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf11111111111111111ffff1111111111ffff111111ffff1ffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111fffff111111111ffff1111111ffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111fffffff11111fffff11111111ffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb111111111111111111fffffffffffffff111111111fffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111111fffffffffffff1111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111fffffffff111111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111111111111111111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111111111111111111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbb11111111111111111111111111111111111ffff111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbb111111111111111111111111111111111ff111f111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbbb111111111111111111111111111111ff11111f111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddfbbb111111111111111111111111111ff1111111f11111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddfbbbb111111111111111111111111ff111111111f11111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddfbbbb1111111111111111111111f111111111111f111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddfbbb1111111111111111111111f1ffff1111111f11fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddfbbbb11111111111111111111fff11111111111f11fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddfbbbb1111111111111111111f11111111111fff1fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddfbbb111111111111111111f1111ffffffff111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddfbbb11111111111111111f1fff1111111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddfbbb1111111111111111ff111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddfbbb111111111111111f111111111111fdddddddddddddddddddddddddddddfffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddffbbb111111111111111111111111ffddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddfbbb1111111111111111111111fddddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddfffffbb1111111111111111111ffdddddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddf11bbfbb111111111111111fffb1ffdddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf1111bbfffffffffffffffffbbbb111fddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf11111bbbbbbbbbbbfbbbbbbbbbb1111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf11111bbbbbbbbbbfbbbbbbbbb111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf111111bbbbbbbbbfbbbbbbbb1111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf1111111bbbbbbbbfbbbbbbb11111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111bbbbbbfbbbbbb111111111fdddddddddddddddddddddddddddddfddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f111111111111111fddddddddddddddddddddddddddddfdddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f1111111111f1111fddddddddddddddddddddddddddddfddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f1111111111f11111fddddddddddddddddddddddddddfdddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111ffff11f11111fddddddddddddddddddddddddddf1dddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111f11f11f11111fdddddddddddddddddddddddddfd1dddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111f11f11f11111fdddddddddddddddddddddddddf1dddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111fff111f111111fdddddddddddddddddddddddfd1999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddf111111111f11111111f11111ff111f111111fdddddddddddddddddddddddf19999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddf1111111bff11111111f111111111fbb11111fddddddddddddddddddddddf1999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddf11111111bff11111111f111111111fbb11111fddddddddddddddddddddddf1999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddf11111111bbff11111111f111111111fbb111111fddddddddddddddddddddf199999999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddf11111111bbbff11111111f111111111fbbb11111fddddddddddddddddddddf199999999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddf1111111bbbbff11111111f1111111111fbb11111fdddddddddddddddddddf19999999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
        """),
        SpriteKind.SceneSprite)
    scene22.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    scene2.destroy()
    music.pew_pew.play()
    pause(1000)
    scene3 = sprites.create(img("""
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
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccff6666ffccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccf6666666fffcccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffff66fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccf6666ffffffccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbfffffffffffffffffffbbccccccccccccccccccccccffffff1111fcccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbf111111111111111111fbbfffffcccccccccccccccfff1111111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbf111111111111111111fbf4444dfcccccccccccccccfff1ff111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbf1111111111111111111f44444f4fccccccccccccccf11111111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbf1111111111111111111fe44f444fccccccccccccccf1f1f1111111fccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbf1111111111111111111fe444444fbbccccccccccccf1f1f1111111fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbf11111111111111111111fee44444fbbbbccccccccccf11111111111fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbf1111111cbbbb111111111fe44444fbbbbbbccccccccf11111111111fccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbf1111ccbbcccbbb1111111fee444fbbbbbbbfffccccccf1ff111111fcccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccfffffffffffffffbbbbbbbbbbbbbbbf111ccccccccccbb1111111fffffbbbbfffffffcccccccf1111111fccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccfff111111111111111fffbbbbbbbbbbbbf11ccccccccccccbbb11111fbbbbbbbbfffffffbbccccccfffffffcccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccff111111111111111111111ffbbbbbbbbbf11ccccccccccccfccbb1111fbbbbbbbbbbbffffffffffffff1ffcccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccf1111111111111111111111111fbbbbbbbbf1cccccccccccccccccb1111fbbbbbbbbbbbf11111111111111fffccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccff111111111111111111111111111ffbbbbbbf1ccccccccccccccccccbb111fbbbbbbbbbbf11fffffffffffff1fccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccf1111111111111111111111111111111fbbbbbf1cccccccccccccccccccc111fbbbbbbbbbbffff111ff11ff1111fccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccf111111111111111111111111111111111fbbbbf1cccccfcccccccccccccc111fbbbbbbbbbbbbbff111111ff11111fcccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccf11111111111111111111111111111111111fbbf1cccccccccccccccccccccc111fbbbbbbbbbbbbbbffffffbf11111fcccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccf1111111111111111111111111111111111111fbf1cccccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbbbbbf1111fcccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccf111111111111111111111111111111111111111ff1cccccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbbbbbff111fbccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccf11111111111111111111111111111111111111111f1cccccccccccccccccccccc1111fbbbbbbbbbbbbbbbbbbbbbbf111fbbbccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccf11111111111111111111111111111111111111ffffffccffffcccccccccccccccff11fbbbbbbbbbbbbbbbbbbbbbbbf11fbbbbbccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccf11111111111111111111111111111111111111ffffffffffffffcccccccccccccf9ff1fbbbbbbbbbbbbbbbbbbbbbbbf11fbbbbbbcccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccf1111111111111111111fffffff111111111111ffffffffff2ff2fccccccccccccf9911f1fbbbbbbbbbbbbbbbbbbbbff11ffbbbbbbbbcccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccf111111111111111111ffffffffff1111111111ffffffffffffffffccccccccccf9999ff1fbbbbbbbbbbbbbbbbbbff1111ffbbbbbbbbbbcccccccccccccccccccccccccc
                    cccccccccccccccccccccccf111111111111111111fffffffffffff1111111ffff1f11fffffffffccccccccccf999999ffbbbbbbbbbbbbbbbbbf1111ff1fbbbbbbbbbbbbcccccccccccccccccccccccc
                    cccccccccccccccccccccccf11111111111111111fffff111f11ffff111111ffff1f11ffffffffccccccccccf8f99999f1fbbbbbbbbbbbbbbbf11fffff1ffbbbbffbbbbbbccccccccccccccccccccccc
                    fffffffffffffffffffffff111111111111111111ffff1111f11fffff11111fff11ffffffffffffffffffffff8999999fffffffffffffffffff11fffff1fffffffffffffffffffffffffffffffffffff
                    ddddddddddddddddddddddf11111111111111111ffff11111fff1ffff11111fff11ffffffdddddddddddddddf8999999fddedddddddddddddf111fdddf11ffddf11ffddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf1111111111111111fffff11111fff11ffffffffffff1ffffffdddddddddddddddf8889999fddddddddddddddff1111fdddf1111fff111fddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf1111111111111111ffff111111fff11ffffffffffff1ffffffdddddddddddddddfff888fffddddddddddddff11111fdddddf1111111111ffddddddddddddddddddddddddd
                    ddddddddddddddddddddddf111111111111ffffffff111111fff11ffffffffffff1ffffffddddddddddddddddddfffdddddddddddddddffffffffdddddfffffffffffffddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffffffffff111111fff111fff11111ffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffffffffff111111fff111fff11111ffff111fffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffff111fff111111fff111fff111111ffff11fffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf11111111111111111ffff1111111111ffff111111ffff1ffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111fffff111111111ffff1111111ffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111fffffff11111fffff11111111ffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb111111111111111111fffffffffffffff111111111fffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111111fffffffffffff1111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111fffffffff111111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111111111111111111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111111111111111111111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbb11111111111111111111111111111111111ffff111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbb111111111111111111111111111111111ff111f111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbbb111111111111111111111111111111ff11111f111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddfbbb111111111111111111111111111ff1111111f11111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddfbbbb111111111111111111111111ff111111111f11111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddfbbbb1111111111111111111111f111111111111f111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddfbbb1111111111111111111111f1ffff1111111f11fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddfbbbb11111111111111111111fff11111111111f11fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddfbbbb1111111111111111111f11111111111fff1fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddfbbb111111111111111111f1111ffffffff111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddfbbb11111111111111111f1fff1111111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddfbbb1111111111111111ff111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddfbbb111111111111111f111111111111fdddddddddddddddddddddddddddddfffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddffbbb111111111111111111111111ffddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddfbbb1111111111111111111111fddddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddfffffbb1111111111111111111ffdddddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddf11bbfbb111111111111111fffb1ffdddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf1111bbfffffffffffffffffbbbb111fddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf11111bbbbbbbbbbbfbbbbbbbbbb1111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf11111bbbbbbbbbbfbbbbbbbbb111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf111111bbbbbbbbbfbbbbbbbb1111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf1111111bbbbbbbbfbbbbbbb11111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111bbbbbbfbbbbbb111111111fdddddddddddddddddddddddddddddfddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f111111111111111fddddddddddddddddddddddddddddfdddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f1111111111f1111fddddddddddddddddddddddddddddfddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f1111111111f11111fddddddddddddddddddddddddddfdddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111ffff11f11111fddddddddddddddddddddddddddf1dddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111f11f11f11111fdddddddddddddddddddddddddfd1dddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111f11f11f11111fdddddddddddddddddddddddddf1dddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111fff111f111111fdddddddddddddddddddddddfd1999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddf111111111f11111111f11111ff111f111111fdddddddddddddddddddddddf19999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddf1111111bff11111111f111111111fbb11111fddddddddddddddddddddddf1999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddf11111111bff11111111f111111111fbb11111fddddddddddddddddddddddf1999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddf11111111bbff11111111f111111111fbb111111fddddddddddddddddddddf199999999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddf11111111bbbff11111111f111111111fbbb11111fddddddddddddddddddddf199999999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddf1111111bbbbff11111111f1111111111fbb11111fdddddddddddddddddddf19999999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
        """),
        SpriteKind.SceneSprite)
    scene3.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    scene22.destroy()
    pause(5000)
    scene4 = sprites.create(img("""
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
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbfffffffffffffffffffbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbf111111111111111111fbbfffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbf111111111111111111fbf4444dfccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbf1111111111111111111f44444f4fcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbf1111111111111111111fe44f444fcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbf1111111111111111111fe444444fbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbf11111111111111111111fee44444fbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbf1111111cbbbb111111111fe44444fbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbf1111ccbbcccbbb1111111fee444fbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccfffffffffffffffbbbbbbbbbbbbbbbf111ccccccccccbb1111111fffffbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccccfff111111111111111fffbbbbbbbbbbbbf11ccccccccccccbbb11111fbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccccccff111111111111111111111ffbbbbbbbbbf11ccccccccccccfccbb1111fbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccf1111111111111111111111111fbbbbbbbbf1cccccccccccccccccb1111fbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccff111111111111111111111111111ffbbbbbbf1ccccccccccccccccccbb111fbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccccf1111111111111111111111111111111fbbbbbf1cccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccf111111111111111111111111111111111fbbbbf1cccccfcccccccccccccc111fbbbbbbbbbbbbbbbbbbbbbfffffccccccccccccccccccccccccccccccccccccccc
                    cccccccccccccccccccccccccccccf11111111111111111111111111111111111fbbf1cccccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbbf4444dfcccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccf1111111111111111111111111111111111111fbf1cccccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbf44444f4fcccccccccccfffffffccccccccccccccccccc
                    cccccccccccccccccccccccccccf111111111111111111111111111111111111111ff1cccccccccccccccccccccc111fbbbbbbbbbbbbbbbbbbfe44f444fbbccccccccf1111111fcccccccccccccccccc
                    ccccccccccccccccccccccccccf11111111111111111111111111111111111111111f1cccccccccccccccccccccc1111fbbbbbbbbbbbbbbbbbfe444444fbbbbcccccf111111111fccccccccccccccccc
                    ccccccccccccccccccccccccccf11111111111111111111111111111111111111ffffffccffffcccccccccccccccff11fbbbbbbbbbbbbbbbbbfee44444fbbbbbbccf11111111111fcccccccccccccccc
                    cccccccccccccccccccccccccf11111111111111111111111111111111111111ffffffffffffffcccccccccccccf9ff1fbbbbbbbbbbbbfffff1fe44444fbbfffffff11111111f11fcccccccccccccccc
                    ccccccccccccccccccccccccf1111111111111111111fffffff111111111111ffffffffff2ff2fccccccccccccf9911f1fbbbbbbbbbbbf11111fee444f2fff11111f1111f1f1f11fcccccccccccccccc
                    ccccccccccccccccccccccccf111111111111111111ffffffffff1111111111ffffffffffffffffccccccccccf9999ff1fbbbbbbbbbbf1111111fffff22111f1111f11111f11111fcccccccccccccccc
                    cccccccccccccccccccccccf111111111111111111fffffffffffff1111111ffff1f11fffffffffccccccccccf999999ffbbbbbbbbbf11111ff111111111ff11111f1f11f1f1111fcccccccccccccccc
                    cccccccccccccccccccccccf11111111111111111fffff111f11ffff111111ffff1f11ffffffffccccccccccf8f99999f1fbbbbbbbbfffffff1111ffffff1111f11f1f111111111fcccccccccccccccc
                    fffffffffffffffffffffff111111111111111111ffff1111f11fffff11111fff11ffffffffffffffffffffff8999999fffffffffffffff111ffffff1111111fffff11111f11f11fffffffffffffffff
                    ddddddddddddddddddddddf11111111111111111ffff11111fff1ffff11111fff11ffffffdddddddddddddddf8999999fddedddddf11111fffffff1111111fffddddf111f1f1f1fdddff6666ffdddddd
                    ddddddddddddddddddddddf1111111111111111fffff11111fff11ffffffffffff1ffffffdddddddddddddddf8889999fddddddddf11fffdddfddf11ffffffdddddddf1111111fddddf6666666fffddd
                    ddddddddddddddddddddddf1111111111111111ffff111111fff11ffffffffffff1ffffffdddddddffffddddfff888fffddddddddf1fdffffffddffffdddddddddddddfffffffddddddffffffff66fdd
                    ddddddddddddddddddddddf111111111111ffffffff111111fff11ffffffffffff1ffffffdddddddfffffddddddfffdddddddddddffddffffffddddddddddddddddddddddddddddddddf6666ffffffdd
                    ddddddddddddddddddddddfffffffffffffffffffff111111fff111fff11111ffffffffffddddddffff2ffdddddddddddddddddddddddddddffdddddddddddddddddddddddddddddddffffffdddddddd
                    ddddddddddddddddddddddfffffffffffffffffffff111111fff111fff11111ffff111fffddddddff2ffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfffffffffffffff111fff111111fff111fff111111ffff11fffddddddfffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddf11111111111111111ffff1111111111ffff111111ffff1ffffffdddddffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111fffff111111111ffff1111111ffffffff1fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111fffffff11111fffff11111111ffffffff11fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb111111111111111111fffffffffffffff111111111fffffff91fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfb1111111111111111111fffffffffffff1111111111111111f9f9fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111fffffffff111111111111111111f999fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111111111111111111111111111111f999fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddfbb11111111111111111111111111111111111111111111111f999fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbb11111111111111111111111111111111111ffff111111f9999fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbb111111111111111111111111111111111ff111f111111f9999fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddfbbb111111111111111111111111111111ff11111f111111f88ffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddfbbb111111111111111111111111111ff1111111f11111fffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddfbbbb111111111111111111111111ff111111111f11111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddfbbbb1111111111111111111111f111111111111f111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddfbbb1111111111111111111111f1ffff1111111f11fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddfbbbb11111111111111111111fff11111111111f11fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddfbbbb1111111111111111111f11111111111fff1fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddfbbb111111111111111111f1111ffffffff111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddfbbb11111111111111111f1fff1111111111fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddfbbb1111111111111111ff111111111111fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddfbbb111111111111111f111111111111fdddddddddddddddddddddddddddddfffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddffbbb111111111111111111111111ffddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddfbbb1111111111111111111111fddddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddfffffbb1111111111111111111ffdddddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddf11bbfbb111111111111111fffb1ffdddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf1111bbfffffffffffffffffbbbb111fddddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf11111bbbbbbbbbbbfbbbbbbbbbb1111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf11111bbbbbbbbbbfbbbbbbbbb111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf111111bbbbbbbbbfbbbbbbbb1111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddddf1111111bbbbbbbbfbbbbbbb11111111fdddddddddddddddddddddddddddddf1ddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111bbbbbbfbbbbbb111111111fdddddddddddddddddddddddddddddfddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f111111111111111fddddddddddddddddddddddddddddfdddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f1111111111f1111fddddddddddddddddddddddddddddfddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddf1111111111111111f1111111111f11111fddddddddddddddddddddddddddfdddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111ffff11f11111fddddddddddddddddddddddddddf1dddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111f11f11f11111fdddddddddddddddddddddddddfd1dddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111f11f11f11111fdddddddddddddddddddddddddf1dddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddddf11111111f11111111f1111fff111f111111fdddddddddddddddddddddddfd1999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddf111111111f11111111f11111ff111f111111fdddddddddddddddddddddddf19999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddf1111111bff11111111f111111111fbb11111fddddddddddddddddddddddf1999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddddf11111111bff11111111f111111111fbb11111fddddddddddddddddddddddf1999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddf11111111bbff11111111f111111111fbb111111fddddddddddddddddddddf199999999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddf11111111bbbff11111111f111111111fbbb11111fddddddddddddddddddddf199999999999999999fddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    dddddddddddddddddddddddddf1111111bbbbff11111111f1111111111fbb11111fdddddddddddddddddddf19999999999999999999fdddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
                    ddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddd
        """),
        SpriteKind.SceneSprite)
    scene4.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    scene3.destroy()
    pause(5000)
    scene4.destroy()
    showInstruction("Scientist: " + name + ", you are our only hope left. Be safe...")
    music.siren.play_until_done()
    showInstruction("" + name + ": Damn, I have to kill the source somehow. Not sure what will happen next.")

def on_on_overlap7(sprite, otherSprite):
    info.change_life_by(-1)
    sprite.vy = -2 * pixelsToMeters
    if heroFacingLeft:
        sprite.x += 1 * 16
    else:
        sprite.x += -1 * 16
    music.pew_pew.play()
    sprite.say("oof", invincibilityPeriod)
    pause(invincibilityPeriod)
sprites.on_overlap(SpriteKind.player, SpriteKind.Lava, on_on_overlap7)

def animateJumps():
    global mainJumpLeft, mainJumpRight
    # Because there isn't currently an easy way to say "play this animation a single time
    # and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    # the same behavior
    mainJumpLeft = animation.create_animation(ActionKind.JumpingLeft, 100)
    animation.attach_animation(hero, mainJumpLeft)
    mainJumpLeft.add_animation_frame(img("""
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
    """))
    for index5 in range(30):
        mainJumpLeft.add_animation_frame(img("""
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
        """))
    mainJumpRight = animation.create_animation(ActionKind.JumpingRight, 100)
    animation.attach_animation(hero, mainJumpRight)
    mainJumpRight.add_animation_frame(img("""
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
    """))
    for index6 in range(30):
        mainJumpRight.add_animation_frame(img("""
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
        """))
def beforegameDialogue():
    global enemycount
    if currentLevel == 1:
        showInstruction("Scientist: Good! You can double jump by pressing A twice. Give it a try!")
    if currentLevel == 2:
        showInstruction("Scientist: There are enemies as well. Some walk on the ground, and some fly in the air. Be careful, they might be faster than you think!")
    if currentLevel == 3:
        showInstruction("Scientist: When hurt, you can find these orbs that give you life. Take as much as you need.")
    if currentLevel == 4:
        showInstruction("Scientist: Great job! This next stage has a hidden entrance, so be careful when finding the right door!")
    if currentLevel == 5:
        showInstruction("Scientist: Superb! Now, try using your B button in order to shoot bullets out of your fingers!")
    if currentLevel == 6:
        showInstruction("Scientist: Shoot the enemies above in order to proceed to the next level! If all the enemies are defeated, you can destroy the barriers by shooting at it!")
        enemycount = 4
    if currentLevel == 7:
        showInstruction("Scientist: You're finally out and ready to start your adventure. Good luck. We're counting on you.")
    if currentLevel == 8:
        showInstruction("Scientist: What a nice sunset. Too bad that more enemies spawn during the night. Be safe!")
    if currentLevel == 9:
        showInstruction("Scientist: You've gain access to the castle! The top floor might be where the big slime be!")
        showInstruction("Scientist: Hold up, something's wrong!")
        level3scene()
def animateCrouch():
    global mainCrouchLeft, mainCrouchRight
    mainCrouchLeft = animation.create_animation(ActionKind.CrouchLeft, 100)
    animation.attach_animation(hero, mainCrouchLeft)
    mainCrouchLeft.add_animation_frame(img("""
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
    """))
    mainCrouchRight = animation.create_animation(ActionKind.CrouchRight, 100)
    animation.attach_animation(hero, mainCrouchRight)
    mainCrouchRight.add_animation_frame(img("""
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
    """))
def clearGame():
    for value in sprites.all_of_kind(SpriteKind.Bumper):
        value.destroy()
    for value2 in sprites.all_of_kind(SpriteKind.Coin):
        value2.destroy()
    for value3 in sprites.all_of_kind(SpriteKind.Goal):
        value3.destroy()
    for value4 in sprites.all_of_kind(SpriteKind.Flier):
        value4.destroy()
    for value112 in sprites.all_of_kind(SpriteKind.DestroyableBox):
        value112.destroy()
    for value122 in sprites.all_of_kind(SpriteKind.PassThru):
        value122.destroy()
    for value132 in sprites.all_of_kind(SpriteKind.Barrier):
        value132.destroy()
    for value142 in sprites.all_of_kind(SpriteKind.Lava):
        value142.destroy()
    for value15 in sprites.all_of_kind(SpriteKind.Life):
        value15.destroy()

def on_on_overlap8(sprite, otherSprite):
    if heroFacingLeft:
        sprite.x += 5
    else:
        sprite.x += -5
sprites.on_overlap(SpriteKind.player, SpriteKind.DestroyableBox, on_on_overlap8)

def on_overlap_tile2(sprite, location):
    global currentLevel
    info.change_life_by(1)
    currentLevel += 1
    if currentLevel < 19:
        game.splash("Next level unlocked!")
        music.stop_all_sounds()
        setLevelTileMap(currentLevel)
        beforegameDialogue()
    else:
        game.over(True, effects.confetti)
scene.on_overlap_tile(SpriteKind.player, myTiles.tile11, on_overlap_tile2)

def on_on_overlap9(sprite, otherSprite):
    if heroFacingLeft:
        sprite.x += 5
    else:
        sprite.x += -5
    music.pew_pew.play()
sprites.on_overlap(SpriteKind.player, SpriteKind.Barrier, on_on_overlap9)

def on_on_overlap10(sprite, otherSprite):
    info.change_life_by(-1)
    sprite.say("Ow!", invincibilityPeriod * 1.5)
    music.power_down.play()
    pause(invincibilityPeriod * 1.5)
sprites.on_overlap(SpriteKind.player, SpriteKind.Flier, on_on_overlap10)

def createEnemies():
    global bumper, flier
    # enemy that moves back and forth
    for value5 in tiles.get_tiles_by_type(myTiles.tile12):
        bumper = sprites.create(img("""
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
            """),
            SpriteKind.Bumper)
        tiles.place_on_tile(bumper, value5)
        tiles.set_tile_at(value5, myTiles.tile0)
        bumper.ay = gravity
        if Math.percent_chance(50):
            bumper.vx = Math.random_range(30, 60)
        else:
            bumper.vx = Math.random_range(-60, -30)
    # enemy that flies at player
    for value6 in tiles.get_tiles_by_type(myTiles.tile13):
        flier = sprites.create(img("""
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
            """),
            SpriteKind.Flier)
        tiles.place_on_tile(flier, value6)
        tiles.set_tile_at(value6, myTiles.tile0)
        animation.attach_animation(flier, flierFlying)
        animation.attach_animation(flier, flierIdle)

def on_on_overlap11(sprite, otherSprite):
    sprite.vx = -1 * sprite.vx
sprites.on_overlap(SpriteKind.Bumper,
    SpriteKind.DestroyableBox,
    on_on_overlap11)

def on_on_overlap12(sprite, otherSprite):
    sprite.vx = -1 * sprite.vx
sprites.on_overlap(SpriteKind.Flier, SpriteKind.DestroyableBox, on_on_overlap12)

def on_on_overlap13(sprite, otherSprite):
    otherSprite.destroy(effects.hearts, 500)
    music.magic_wand.play()
    info.change_life_by(1)
sprites.on_overlap(SpriteKind.player, SpriteKind.Life, on_on_overlap13)

def on_down_pressed():
    if not (hero.is_hitting_tile(CollisionDirection.BOTTOM)):
        hero.vy += 80
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def showInstruction(text: str):
    game.show_long_text(text, DialogLayout.BOTTOM)
def initializeHeroAnimations():
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
def createPlayer(player2: Sprite):
    player2.ay = gravity
    scene.camera_follow_sprite(player2)
    controller.move_sprite(player2, 125, 0)
    player2.z = 5
    info.set_life(10)
    info.set_score(0)
def level2Music():
    music.stop_all_sounds()
    music.set_tempo(135)
    for index7 in range(1):
        music.play_tone(523, music.beat(BeatFraction.HALF))
        music.play_tone(440, music.beat(BeatFraction.WHOLE))
        music.play_tone(523, music.beat(BeatFraction.HALF))
        music.play_tone(494, music.beat(BeatFraction.WHOLE))
        music.play_tone(523, music.beat(BeatFraction.HALF))
        music.play_tone(494, music.beat(BeatFraction.WHOLE))
        music.play_tone(392, music.beat(BeatFraction.DOUBLE))
    for index8 in range(1):
        music.play_tone(392, music.beat(BeatFraction.HALF))
        music.play_tone(659, music.beat(BeatFraction.HALF))
        music.play_tone(587, music.beat(BeatFraction.WHOLE))
        music.play_tone(523, music.beat(BeatFraction.HALF))
        music.play_tone(494, music.beat(BeatFraction.WHOLE))
        music.play_tone(523, music.beat(BeatFraction.HALF))
        music.play_tone(494, music.beat(BeatFraction.WHOLE))
        music.play_tone(392, music.beat(BeatFraction.DOUBLE))
    for index9 in range(1):
        music.play_tone(523, music.beat(BeatFraction.HALF))
        music.play_tone(440, music.beat(BeatFraction.WHOLE))
        music.play_tone(523, music.beat(BeatFraction.HALF))
        music.play_tone(494, music.beat(BeatFraction.WHOLE))
        music.play_tone(523, music.beat(BeatFraction.HALF))
        music.play_tone(494, music.beat(BeatFraction.WHOLE))
        music.play_tone(392, music.beat(BeatFraction.DOUBLE))
    for index10 in range(1):
        music.play_tone(440, music.beat(BeatFraction.HALF))
        music.play_tone(440, music.beat(BeatFraction.HALF))
        music.play_tone(349, music.beat(BeatFraction.WHOLE))
        music.play_tone(440, music.beat(BeatFraction.HALF))
        music.play_tone(392, music.beat(BeatFraction.WHOLE))
        music.play_tone(440, music.beat(BeatFraction.HALF))
        music.play_tone(392, music.beat(BeatFraction.WHOLE))
        music.play_tone(262, music.beat(BeatFraction.DOUBLE))
def initializeLevel(level: number):
    global playerStartLocation
    playerStartLocation = tiles.get_tiles_by_type(myTiles.tile9)[0]
    tiles.place_on_tile(hero, playerStartLocation)
    tiles.set_tile_at(playerStartLocation, myTiles.tile0)
    createEnemies()
    spawnGoals()
    spawnBoxes()

def on_on_overlap14(sprite, otherSprite):
    global enemycount, enemyKill
    if enemycount > 0:
        sprite.destroy()
        otherSprite.destroy(effects.warm_radial, 500)
        info.change_score_by(5)
        enemycount += -1
    elif enemycount == 0:
        sprite.destroy()
        otherSprite.destroy(effects.warm_radial, 500)
        info.change_score_by(5)
        enemycount += 0
    if currentLevel == 7:
        enemyKill += 1
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Flier, on_on_overlap14)

def on_on_overlap15(sprite, otherSprite):
    sprite.y += 16
sprites.on_overlap(SpriteKind.DestroyableBox,
    SpriteKind.DestroyableBox,
    on_on_overlap15)

def testlevelMusic():
    music.set_tempo(72)
    for index11 in range(2):
        music.play_tone(220, music.beat(BeatFraction.HALF))
        music.play_tone(330, music.beat(BeatFraction.HALF))
        music.play_tone(440, music.beat(BeatFraction.HALF))
        music.play_tone(494, music.beat(BeatFraction.HALF))
        music.play_tone(554, music.beat(BeatFraction.HALF))
        music.play_tone(494, music.beat(BeatFraction.HALF))
        music.play_tone(440, music.beat(BeatFraction.HALF))
        music.play_tone(330, music.beat(BeatFraction.HALF))
        music.play_tone(294, music.beat(BeatFraction.HALF))
        music.play_tone(370, music.beat(BeatFraction.HALF))
        music.play_tone(554, music.beat(BeatFraction.HALF))
        music.play_tone(659, music.beat(BeatFraction.HALF))
        music.play_tone(554, music.beat(BeatFraction.HALF))
        music.play_tone(440, music.beat(BeatFraction.WHOLE))
        music.play_tone(440, music.beat(BeatFraction.HALF))
def hasNextLevel():
    pass

def on_on_overlap16(sprite, otherSprite):
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate, 500)
    music.pew_pew.play()
sprites.on_overlap(SpriteKind.projectile,
    SpriteKind.DestroyableBox,
    on_on_overlap16)

def spawnGoals():
    global coin, LifeOrb
    for value7 in tiles.get_tiles_by_type(myTiles.tile10):
        coin = sprites.create(img("""
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
            """),
            SpriteKind.Coin)
        tiles.place_on_tile(coin, value7)
        animation.attach_animation(coin, coinAnimation)
        animation.set_action(coin, ActionKind.Idle)
        tiles.set_tile_at(value7, myTiles.tile0)
    for value152 in tiles.get_tiles_by_type(myTiles.tile20):
        LifeOrb = sprites.create(img("""
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
            """),
            SpriteKind.Life)
        tiles.place_on_tile(LifeOrb, value152)
        tiles.set_tile_at(value152, myTiles.tile0)
LifeOrb: Sprite = None
coin: Sprite = None
playerStartLocation: tiles.Location = None
flier: Sprite = None
bumper: Sprite = None
mainCrouchRight: animation.Animation = None
mainCrouchLeft: animation.Animation = None
mainJumpRight: animation.Animation = None
mainJumpLeft: animation.Animation = None
scene4: Sprite = None
scene3: Sprite = None
scene22: Sprite = None
scene2: Sprite = None
mainRunRight: animation.Animation = None
mainRunLeft: animation.Animation = None
flierIdle: animation.Animation = None
flierFlying: animation.Animation = None
mainIdleRight: animation.Animation = None
mainIdleLeft: animation.Animation = None
gunshot: Sprite = None
heroFacingLeft = False
doubleJumpSpeed = 0
canDoubleJump = False
lavaBlock: Sprite = None
Barrier2: Sprite = None
PassThruBox: Sprite = None
Crate: Sprite = None
coinAnimation: animation.Animation = None
name = ""
enemycount = 0
currentLevel = 0
gravity = 0
pixelsToMeters = 0
invincibilityPeriod = 0
hero: Sprite = None
titlebar = 0
music.set_volume(20)
titlebar = 1
Title2 = sprites.create(img("""
        bbb11111111111bb1111111111bb111111b111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11b11111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111b11b11111111111111111111111111111111111111111111111111111111111111111111111111111111b1b111111111bb11111111111bb111111111bbbbb
            bbbb1111111111bb1111111111bb11111111b1b11111111111111111111111111111111111111111111111111111111111111111111111111111111bb1111111111bb11111111111bb11111111b11bbb
            bbb1b111111111bb1111111111bb111111111bb11111111111111111111111111111111111111111111111111111111111111111111111111111111bb1111111111bb11111111111bb111111bb111bbb
            bbb11b11111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111b11111bbb
            bbb111bb111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb1111b111111bbb
            bbb11111b11111bb1111111111bb1111111111b111fffffffff1111111fffffffff1111111fffffffff11111fff111111111fff1111ffffffffffffb11111111111bb11111111111bb11bb1111111bbb
            bbb111111bb111bb1111111111bb1111111111b111fffffffff1111111fffffffff1111111fffffffff11111fff111111111fff1111ffffffffffffb11111111111bb11111111111bb1b111111111bbb
            bbb11111111b11bb1111111111bb1111111111b111fffffffff1111111fffffffff1111111fffffffff11111fff111111111fff1111ffffffffffffb11111111111bb11111111111bbb1111111111bbb
            bbb111111111bbbb1111111111bb1111111111bfff111111111fff1fff111111111fff1fff111111111fff11ffffff111ffffff1fff111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111bfff111111111fff1fff111111111fff1fff111111111fff11ffffff111ffffff1fff111111111111b11111111111bb111111111bbbb11111111111bbb
            bbb11111111111bb1111111111bb1111111111bfff111111111fff1fff111111111fff1fff111111111fff11ffffff111ffffff1fff111111111111b11111111111bb11111111b11bb11111111111bbb
            bbb11111111111bbbb11111111bb1111111111bfff111111111fff1fff111111111fff1fff111111111fff11fff111fff111fff1fff111111111111b11111111111bb111111bb111bb11111111111bbb
            bbb11111111111bb11b1111111bb1111111111bfff111111111fff1fff111111111fff1fff111111111fff11fff111fff111fff1fff111111111111b11111111111bb11111b11111bb11111111111bbb
            bbb11111111111bb111bb11111bb1111111111bfff111111111fff1fff111111111fff1fff111111111fff11fff111fff111fff1fff111111111111b11111111111bb1111b111111bb11111111111bbb
            bbb11111111111bb11111b1111bb1111111111bffffffffffff1111fff111111111fff1fff111111111fff11fff111111111fff1111fffffffff111b11111111111bb11bb1111111bb11111111111bbb
            bbb11111111111bb111111b111bb1111111111bffffffffffff1111fff111111111fff1fff111111111fff11fff111111111fff1111fffffffff111b11111111111bb1b111111111bb11111111111bbb
            bbb11111111111bb1111111bb1bb1111111111bffffffffffff1111fff111111111fff1fff111111111fff11fff111111111fff1111fffffffff111b11111111111bbb1111111111bb11111111111bbb
            bbb11111111111bb111111111bbb1111111111bfff111fff1111111fff111111111fff1fff111111111fff11fff111111111fff1111111111111fffb11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111bfff111fff1111111fff111111111fff1fff111111111fff11fff111111111fff1111111111111fffb111111111bbbb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bbb111111111bfff111fff1111111fff111111111fff1fff111111111fff11fff111111111fff1111111111111fffb11111111b11bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1bb1111111bfff111111fff1111fff111111111fff1fff111111111fff11fff111111111fff1111111111111fffb111111bb111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb111b111111bfff111111fff1111fff111111111fff1fff111111111fff11fff111111111fff1111111111111fffb11111b11111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111b11111bfff111111fff1111fff111111111fff1fff111111111fff11fff111111111fff1111111111111fffb1111b111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb11111bb111bfff111111111fff1111fffffffff1111111fffffffff11111fff111111111fff1ffffffffffff111b11bb1111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111b11bfff111111111fff1111fffffffff1111111fffffffff11111fff111111111fff1ffffffffffff111b1b111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb11111111bbbfff111111111fff1111fffffffff1111111fffffffff11111fff111111111fff1ffffffffffff111bb1111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb1111111111bbbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb1111111bbb1bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb1111bbb1111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb1bbb1111111bbb
            bbbbb111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bbb1111111111bbb
            bbb11bbbb11111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111bbbbb11111111111bbb
            bbb111111bbb11bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111bbb111bb11111111111bbb
            bbb111111111bbbb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11bbb111111bb11111111111bbb
            bbb11111111111bbbbb1111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bbbb111111111bb11111111111bbb
            bbb11111111111bb111bbb1111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b111111111bbbb11111111111bb11111111111bbb
            bbb11111111111bb111111bbb1bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b111111bbb11bb11111111111bb11111111111bbb
            bbb11111111111bb111111111bbbb111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b111bbb11111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1bbb111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111bbbb11111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111bbb111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111bbbb11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b111111111111111111111111111111111111fff11111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b1111111111111111111111111111111111ff111ff111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b1111111111111111111111111111111111f11111f111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b111111111111111111111111111111111f11111f1f11111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb111111111111111111111111111111111f11111f1f11111111111111111111111111111111111111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbb1ffffffff11bb1111111111bb1111111111b111111111111111111111111111111111f1111111f11111111111111111111111111111111111111b11111111111bb11111111111bb1fffffffff1bbb
            bbbfff111111f1bb1111111111bb1111111111b1111111111111111111111111111111111f11111f111111111111111111111111111111111111111b11111111111bb11111111111bbf111111ffffbbb
            bbfff11111111fbb1111111111bb1111111111b1111111111111111111111111111111111ff111ff111111111111111111111111111111111111111b11111111111bb11111111111bff11111111fffbb
            bfff111111111ffb1111111111bb1111111111b111111111111111111111111111111111111fff11111111111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b11111111111111111111111111111111111f11f11111111111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b11111111111111111111111111111111111f111f1111111111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b11111111111111111111111111111111111f111f1111111111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b11111111111111111111111111111111ff1f111f1111111111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b1111111111111111111111111111111f11ff11f1111ff11111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b1111111111111111111111111111111f11ff1f1111f11f1111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b11111111111111111111111111111111ff1f1f1111f11f1111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b11111111111111111111111111111111111f11f1111ff11111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b11111111111111111111111111111111111ff1f11111111111111111111111111111111111111111b11111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111111b1111111111111111111111111111111111ff1f1f1111111111111111111111111111111111111111bbb111111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111111bbbb1111111111111111111111111111111111f1ff1f1111111111111111111111111111111111111111b11bbb111111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1111bbb111b1111111111111111111111111111111ffff1ff1f1111111111111111111111111111111111111111b11111bbb111bb11111111111bff111111111fffb
            bfff111111111ffb1111111111bb1bbb111111b1111111111111111111111111111111f111f11f1f111111111111111111111111111111111111111b11111111bbbbb11111111111bff111111111fffb
            bfff111111111ffb1111111111bbb111111111b1111111111111111111111111111111f1ff111f1f111111111111111111111111111111111111111b11111111111bbb1111111111bff111111111fffb
            bfff111111111ffb11111111bbbb1111111111b1111111111111111111111111111111f1f1111f1f111111111111111111111111111111111111111b11111111111bb1bb11111111bff111111111fffb
            bfff111111111ffbccccccccccccccccccccccccccccccccccccccccccccccccccccccfffccccf1ffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbff111111111fffb
            bfff111111111ffcccccccccccccccccccccccccccccccccccccccccccccccccccccccffcccccf11ffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbf111111111fffb
            bfff111111111fb1111111111111111111111111111111111111111111111111111111fff1111f1111f11111111111111111111111111111111111111111111111111111111111bbbb1111111111fffb
            bfff111111111b111111111111111111111111111111111111111111111111111111111111111fffffff11111111111111111111111111111111111111111111111111111111111111bb11111111fffb
            bfff111111bbb111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111bbb11111fffb
            bfff111bbb111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111bbb11fffb
            bfff1bb111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111bbfffb
            bfffb1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111fffb
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            bbb11111111111bb1111111111bb111111bb11b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11b11111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb11111b1111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b111b1111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb111bb11111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b1111bb11111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb11b1111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b111111b1111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1b11111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b1111111bb11bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bbb111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b111111111b1bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b1111111111bbb11111111111bb11111111111bbb
            bbb11111111111bb111111111bbb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111bb1bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bbb1111111111bb11111111111bbb
            bbb11111111111bb111111b111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb1bb11111111bb11111111111bbb
            bbb11111111111bb1111bb1111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb111b1111111bb11111111111bbb
            bbb11111111111bb111b111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb1111bb11111bb11111111111bbb
            bbb11111111111bb11b1111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb111111b1111bb11111111111bbb
            bbb11111111111bbbb11111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb1111111bb11bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb111111111b1bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb1111111111bbb11111111111bbb
            bbb111111111bbbb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
            bbb11111111b11bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bbb1111111111bbb
            bbb111111bb111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb1bb11111111bbb
            bbb11111b11111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb111b1111111bbb
            bbb1111b111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb1111bb11111bbb
            bbb11bb1111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb111111b1111bbb
            bbb1b111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb1111111b111bbb
            bbbb1111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111bb1bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111bb1111111111bb11111111111bb1111111111bbbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b1b111111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb11111111bbb11111111111111111111111111111111111111111111111111111111111111111111111111111111b11bb1111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb111111bb11b11111111111111111111111111111111111111111111111111111111111111111111111111111111b1111b111111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111bb1111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111b11111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb11bb111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b111111bb111bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bbbb11111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111b11bb11111111111bb11111111111bbb
            bbb11111111111bb1111111111bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b111111111b1bb11111111111bb11111111111bbb
            bbb11111111111bb111111111bbb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b1111111111bbb11111111111bb11111111111bbb
            bbb11111111111bb11111111b1bb1111111111b11111111111111111111111111111111111111111111111111111111111111111111111111111111b11111111111bb11111111111bb11111111111bbb
    """),
    SpriteKind.Title)
statusbar = statusbars.create(82, 4, StatusBarKind.health)
statusbar.set_position(79, 90)
statusbar.max = 5000
statusbar.value = 5000
statusbar.set_color(11, 12)
statusbar.set_status_bar_flag(StatusBarFlag.INVERT_FILL_DIRECTION, True)
while statusbar.value != 0:
    pause(randint(25, 150))
    statusbar.value += -100
color.start_fade(color.original_palette, color.gray_scale, 1000)
color.pause_until_fade_done()
pause(500)
color.start_fade(color.gray_scale, color.white, 1000)
color.pause_until_fade_done()
Title2.destroy()
statusbar.destroy()
hero = sprites.create(img("""
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
    """),
    SpriteKind.player)
# how long to pause between each contact with a
# single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.set_background_image(img("""
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
"""))
initializeAnimations()
createPlayer(hero)
levelCount = 9
currentLevel = 0
enemyKill = 0
setLevelTileMap(currentLevel)
color.start_fade(color.white, color.matte, 1000)
color.pause_until_fade_done()
color.start_fade(color.matte, color.original_palette, 1000)
color.pause_until_fade_done()
titlebar = 0
giveIntroduction()
# set up hero animations

def on_on_update():
    global heroFacingLeft
    if hero.vx < 0:
        heroFacingLeft = True
    elif hero.vx > 0:
        heroFacingLeft = False
    if hero.is_hitting_tile(CollisionDirection.TOP):
        hero.vy = 0
    if controller.down.is_pressed():
        if heroFacingLeft:
            animation.set_action(hero, ActionKind.CrouchLeft)
        else:
            animation.set_action(hero, ActionKind.CrouchRight)
    elif hero.vy < 20 and not (hero.is_hitting_tile(CollisionDirection.BOTTOM)):
        if heroFacingLeft:
            animation.set_action(hero, ActionKind.JumpingLeft)
        else:
            animation.set_action(hero, ActionKind.JumpingRight)
    elif hero.vx < 0:
        animation.set_action(hero, ActionKind.RunningLeft)
    elif hero.vx > 0:
        animation.set_action(hero, ActionKind.RunningRight)
    else:
        if heroFacingLeft:
            animation.set_action(hero, ActionKind.IdleLeft)
        else:
            animation.set_action(hero, ActionKind.IdleRight)
game.on_update(on_on_update)

# Flier movement

def on_on_update2():
    for value8 in sprites.all_of_kind(SpriteKind.Flier):
        if abs(value8.x - hero.x) < 60:
            if value8.x - hero.x < -5:
                value8.vx = 25
            elif value8.x - hero.x > 5:
                value8.vx = -25
            if value8.y - hero.y < -5:
                value8.vy = 25
            elif value8.y - hero.y > 5:
                value8.vy = -25
            animation.set_action(value8, ActionKind.Flying)
        else:
            value8.vy = -20
            value8.vx = 0
            animation.set_action(value8, ActionKind.Idle)
game.on_update(on_on_update2)

# Reset double jump when standing on wall

def on_on_update3():
    global canDoubleJump
    if hero.is_hitting_tile(CollisionDirection.BOTTOM):
        canDoubleJump = True
game.on_update(on_on_update3)

# bumper movement

def on_on_update4():
    for value9 in sprites.all_of_kind(SpriteKind.Bumper):
        if value9.is_hitting_tile(CollisionDirection.LEFT):
            value9.vx = Math.random_range(30, 60)
        elif value9.is_hitting_tile(CollisionDirection.RIGHT):
            value9.vx = Math.random_range(-60, -30)
game.on_update(on_on_update4)

def on_forever():
    if currentLevel < 7:
        testlevelMusic()
    elif currentLevel == 7:
        level1Music()
    elif currentLevel == 8:
        level2Music()
    else:
        pass
forever(on_forever)
