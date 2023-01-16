class Throwable extends MovableObject {
    bottle_animation = false;
    y = 180;
    
    deleteThrowInterval;
    newBottleInterval;
    OFF_SET ={
        top : 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    BOTTLE_MAIN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    
    
    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_MAIN);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.animate();  

        if (world.character.otherDirection == true) {
            this.throwLeft(20, -100); 
        } else {
            this.throw(100, 150);
        }
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() =>{
            this.x += 10;
        },25);        
    }

    throwLeft() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x -= 10;
        }, 25);
       
    }

    animate(){
        setInterval(() => {
            this.playAnimations(this.BOTTLE_MAIN);  
        }, 50);
          
        stopableInterval(() => {
        if (this.bottle_animation == true) {
            this.playAnimations(this.BOTTLE_SPLASH);    
        }  
       }, 100)  
    }
}