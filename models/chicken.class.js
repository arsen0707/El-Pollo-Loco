class Chicken extends MovableObject {
   
    height = 85;
    y = 335 ;
   
    OFF_SET ={
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD =[
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 300 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.6 ;
        this.animate();
    }

    animate(){
        setInterval(() => this.moveLeft(),1000/60);
        setInterval(() => this.playAnimations(this.IMAGES_WALKING), 200); 
        this.playDead();
    }

    playDead(){
        setInterval(() => {
            if(this.isDead()){
                this.stopTheMove();
                this.playAnimations(this.IMAGES_DEAD); 
                setTimeout(() =>this.y = 500, 500);}
        }, 25);
    }
}







