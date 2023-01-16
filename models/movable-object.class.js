class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    elementEnergy = 0;
    coinEnergy = 0; 
    gameFinish = false;
    endbossEnergy = 100 ;
    SHOOTING_SOUND = new Audio('audio/shoot.wav');
    WALKING_SOUND = new Audio('audio/walking01.mp3');
    locationShow = false;

    OFF_SET ={
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    applyGravity(){

        setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        },1000 / 25);
    }

    isAboveGround(){
        if(this instanceof Throwable){
            return true;
        } else {
        return this.y < 180;
        }
    }

    isCharacterAboveGround(){
        if(this instanceof Character){
            return true;
        } else {
        return this.y < 280;
        }
    }

    isColliding (mo) {
        return this.x + this.width - this.OFF_SET.right > mo.x + mo.OFF_SET.left &&
               this.y + this.height - this.OFF_SET.bottom > mo.y + mo.OFF_SET.top &&
               this.x + this.OFF_SET.left< mo.x + mo.width - mo.OFF_SET.right &&
               this.y + this.OFF_SET.top < mo.y + mo.height - mo.OFF_SET.bottom; 
        // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    isCollidingTop(mo){
        return this.y + this.height > mo.y && 
            this.y + this.height - this.OFF_SET.bottom < mo.y + mo.height - mo.OFF_SET.bottom &&
            this.x + this.width > mo.x &&
            this.x + this.width < (mo.x + mo.width + 70);          
    }

    hit(){
        this.energy -=5;
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead(){
        return this.energy == 0;
    }

    newCoinEnergy() {
        this.coinEnergy += 20;
        if(this.coinEnergy <0){
            this.coinEnergy=0;
        } 
    }

    newBottleEnergy(){
        this.elementEnergy += 20;
    }
    
    newBottleThrowing(){
        this.elementEnergy -=20 ;
    }

    bottleTowardsEnboss(){
        this.endbossEnergy -=8 ;
        if(this.endbossEnergy<0){
            this.endbossEnergy=0; 
            this.lastHit = new Date().getTime();
        }  
    }

    hitChicken() {
        this.energy -= 100;
        if(this.energy<0){
            this.energy=0;
        } 
    }

    hitEndboss() {
        this.energy -= 11;
        if(this.energy<0){
            this.energy=0; 
            this.lastHit = new Date().getTime();
        } 
    }

    moveRight() {
        this.x += this.speed;    
    }

    moveLeft() {   
        this.x -= this.speed;  
    }

    stopTheMove(){
        return this.speed=0;
    }

    playAnimations(images){
        let i = this.currentImage % images.length; // % --->heisst modudu function und nutzen wir:       //i=0 % 6; => 0, rest 0      //i=1 % 6; => 0, rest 1....
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump(){

        this.speedY = 30;
    }

    jumpAnimation(){
        this.speedY = 20;
    }

    gameIsWon(){
        if (this.isDead()) {
         this.gameFinish = true;       
        }
    }   


    distanceMaker(){
        if (locationShow = true) {
           return this.world.level.endBoss.x 
        }
    }

    getSound(){
        return this.SHOOTING_SOUND.play();
    }
   
}
    
