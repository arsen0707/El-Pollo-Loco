class Character extends MovableObject {
    y = 120 ;
    speed = 10;

    OFF_SET ={
        top: 70,
        bottom: 10,
        left: 10,
        right: 10,
    }
 
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'

    ];

    IMAGES_JUMPING = [

        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_SLEEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'    
    ]
    
    world;
    JUMP_SOUND = new Audio('audio/Game-jump-boing.mp3');
    GAME_OVER = new Audio ('audio/game-over-sound-effect.mp3');
    HURT_SOUND = new Audio ('audio/hurt.mp3');
    GAME_OVER_SECOND = new Audio ('audio/video-game-fail-sound.mp3'); 
    
   constructor(){
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SLEEEPING);
    this.applyGravity();
    this.animate();
    this.height= 240;
    this.width = 110;
    
   }

   animate(){
    stopableInterval(() =>this.mainMoves(), 1000 / 60);
    stopableInterval(() =>this.maninAnimations(),50);
    this.sleepAnimation();
    }

    mainMoves(){
        this.WALKING_SOUND.pause();
        if (this.canMoveRight()){this.moveRight();}
        if (this.canMoveLeft()){this.moveLeft();}
        if(this.canJump()){this.jump();} 
        this.world.camera_x = -this.x +100;
    }
    canMoveRight(){
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end
    }
    canMoveLeft(){
        return this.world.keyboard.LEFT && this.x > 0 
    }
    canJump(){
        return this.world.keyboard.SPACE && !this.isAboveGround()
    }
    moveRight(){
        super.moveRight();
        this.otherDirection = false;
        this.WALKING_SOUND.play();
    }
    moveLeft(){
        super.moveLeft();
        this.WALKING_SOUND.play();
        this.otherDirection = true;
    }
    jump(){
        super.jump();
        this.JUMP_SOUND.play();
    }

    maninAnimations(){
        if (this.isDead()){
            this.deadAnimation();
         } else if (this.isHurt()){
            this.hurtAnimation();
         } else if (this.isAboveGround()){
             this.playAnimations(this.IMAGES_JUMPING);
         } else if (this.leftAndRightAnimation()){
             this.playAnimations(this.IMAGES_WALKING);
             } 
    }
    deadAnimation(){
        this.fixAnimation();
        setTimeout(() => this.fixSetTimeout(), 1500); 
    }
    hurtAnimation(){
        this.playAnimations(this.IMAGES_HURT);
        this.HURT_SOUND.play();
    }
    leftAndRightAnimation(){
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }

    sleepAnimation(){
        setTimeout(() => {
        stopableInterval(()=>{
            if (!this.world.keyboard.SPACE && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.D ) {
                this.playAnimations(this.IMAGES_SLEEEPING);
            }
        },1500);
    }, 5000);
    }

    fixAnimation(){
        this.playAnimations(this.IMAGES_DEAD); 
        this.GAME_OVER_SECOND.play();
        this.SHOOTING_SOUND.pause();
        stopTheGame();
        this.y = 550;
        this.WALKING_SOUND.pause();
        document.getElementById('fotoGameOver').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('fotoGameOver').src = 'img/directions/new log4.png';
        document.getElementById('maintitle').classList.add('d-none');
    }

    fixSetTimeout(){
        document.getElementById('fotoGameOver').src = 'img/9_intro_outro_screens/game_over/game over.png';  
        document.getElementById('maintitle').classList.remove('d-none');
        document.getElementById('maintitle').classList.add('newTitleStyle');  
    }    
}

