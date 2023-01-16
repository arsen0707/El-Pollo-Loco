class Endboss extends MovableObject{

    height = 340;
    width= 160;
    y = 99;
    firstContact = false;
    endBossStops = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
    ]

    IMAGES_ALERT = [    
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'    
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    
    DISAPEAR_CHICKEN = [
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    BOSS_ATTACKING = [  
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    BOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    WINNING_SOUND = new Audio('audio/winning music.mp3');
    
    constructor(){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.DISAPEAR_CHICKEN);
        this.loadImages(this.BOSS_HURT);
        this.loadImages(this.BOSS_ATTACKING);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 3500 ;
        this.speed = 1.5;
        this.animate();      
    }

    animate(){ 
        stopableInterval(() =>{
        this.playAnimations(this.IMAGES_ALERT);
        this.completeAnimate();
        this.endBossMoves();
       
        },100);   
    }
    bossHurted (){
        stopableInterval(() => { 
        if (this.endBossStops){   
            this.moveLeft();  
            this.playAnimations(this. BOSS_HURT);   
            
    } }, 50);  
}
    completeAnimate(){ 
        if(this.isDead()){
            this.WINNING_SOUND.play();
            setInterval(() => this.deadAnimation() , 50);     
            setTimeout(() => this.polloPromotion(), 1800);
            setTimeout(() => this.polloPromotion2(), 2800);
        }   
    }
    deadAnimation(){
            this.playAnimations(this.IMAGES_DEAD);
            stopTheGame();
    }
    polloPromotion(){
        document.getElementById('fotoGameOver').classList.remove('d-none');
        document.getElementById('fotoGameOver').src = 'img/directions/new log4.png';
    }
    polloPromotion2(){
        this.y = 500;
        document.getElementById('fotoGameOver').classList.remove('d-none');
        document.getElementById('fotoGameOver').src = 'img/directions/winnnner.webp';
        document.getElementById('fotoDirection').classList.add('d-none');
    }

    endBossMoves(){
        if (this.canMoveRight()) {
            this.moveRight();
        } else if (this.canMoveLeft() ) {
            this.moveToLeft();
            }   
    }

    canMoveRight(){
        return world.character.x > this.x;
    }
    canMoveLeft(){
        return this.firstContact == true && world.character.x <this.x
    }

    moveRight(){
        super.moveRight();
        this.speed = -2;
        this.otherDirection = true;
    }

    moveToLeft(){
        this.speed = 1;
        this.otherDirection = false;
    }
}    

