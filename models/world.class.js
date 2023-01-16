class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottle = new StatusBarBottle();
    statusBarEnboss = new StatusBarEndboss();
    icon_Endboss = new IconEndBoss();
    collisionSound = new Audio ('audio/splash.wav');
    CHICKENSMASH = new Audio ('audio/smash.mp3');
    throwable = [];
    newFireEnboss = [];
    numOfBottles = 0;
    distance = false;
    distanceCollision = false ;
 

    constructor(canvas, keyboard) {

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.rund();
        this.collisionsBottleChicken();
        
    }

    setWorld() {
        this.character.world = this;
    }

    rund() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrow();
            this.checkCollisionsCoin();
            this.checkCollisionsBottle();
            this.collisionsBottleChicken();
            this.characterCollisionChickenFromTop();
            this.checkBottleWithEndbossCollision();
            this.checkCollisionsEndBossCharachter();
            
        },200);
    }

    checkThrow() {
        if(this.numOfBottles > 0){
        if (this.keyboard.D){
            let bottle = new Throwable(this.character.x + 30, this.character.y + 100);  
            this.throwable.push(bottle);
            this.numOfBottles--;
            this.character.newBottleThrowing(); 
            this.statusBarBottle.setPercentage(this.character.elementEnergy);  
            this.bottle_animation = true;
    } }else if(this.numOfBottles = 0) {
        this.keyboard.D = false;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    enemy.hitChicken();
                    this.CHICKENSMASH.play();
                    this.character.jumpAnimation();
                } else{
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy); 
                }
            }
        });
    }

    checkCollisionsBottle(mo){
        
         this.level.bottles.forEach( (bottle) => {
             if(  this.character.isColliding(bottle) ){
                  this.collectBottels(bottle, 1);
                  this.character.newBottleEnergy(); 
                  this.statusBarBottle.setPercentage(this.character.elementEnergy);           
             }
         });        
    } 

    checkCollisionsCoin(mo){
    
        this.level.coins.forEach( (coin) => {
            if(  this.character.isColliding(coin) ){
                this.collectCoins(coin, 1);
                this.character.newCoinEnergy();    
                this.statusBarCoins.setPercentage(this.character.coinEnergy);
            }
          });
    }

    collisionsBottleChicken() {
           this.throwable.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if(bottle.isColliding(enemy)){
                enemy.hitChicken(enemy.energy);
                this.killChicken(enemy);
                bottle.bottle_animation = true ;
                this.collisionSound.play();  
                }  
            });   
           });
    }

    checkBottleWithEndbossCollision(){
          this.throwable.forEach(bottle => {
            this.level.endBoss.forEach(endBoss=> {
                if(bottle.isColliding(endBoss)){
                    endBoss.hitEndboss(endBoss.energy);
                    bottle.bottle_animation = true ;
                    this.collisionSound.play();
                       endBoss.bossHurted();
                       endBoss.endBossStops= true;
                     this.distance=true;
                    this.character.bottleTowardsEnboss();
                    this.statusBarEnboss.setPercentage(this.character.endbossEnergy);    
                } 
            });
          });
    }

    characterCollisionChickenFromTop(){
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.y ==220){
                    enemy.hitChicken(enemy.energy);
                    this.killChicken(enemy, 1);
                }console.log('this.collison',this.character.y);
            if(this.character.isColliding(enemy) && !this.character.isCharacterAboveGround()){
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);    
                }
            });
    }
    
    checkCollisionsEndBossCharachter(){
        this.level.endBoss.forEach(endBoss => {
            if (this.character.isColliding(endBoss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
               endBoss.firstContact=true;
               this.distance=true
               this.distanceCollision = true ;
               
            }
        });
    }

    collectBottels(bottle){
            let i = this.level.bottles.indexOf(bottle);
            this.level.bottles.splice(i,1);
            this.numOfBottles++;
            
    }

    collectCoins(coin){
            let i = this.level.coins.indexOf(coin);
            this.level.coins.splice(i,1);
    }

    killChicken(enemy){
       
            let removeEnemy = this.level.enemies.indexOf(enemy);
            setTimeout(() => {
                this.level.enemies.splice(removeEnemy,1); 
                
        }, 400);
        
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObject);
        this.addObjectToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
        
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.drawStatusBarEndboss();
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.endBoss);
        this.addObjectToMap(this.throwable);
        this.addObjectToMap(this.level.bottles);
        
       
        this.ctx.translate(-this.camera_x, 0);
        // Draw wird immer wieder aufgerufen

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawStatusBarEndboss(){
        
        if (this.character.x >3000 || this.distanceCollision == true  && this.character.x <3400 || this.distance==true && this.character.x <3000  ) {
            this.addToMap(this.statusBarEnboss);
            this.addToMap(this.icon_Endboss); 
        } 
    }

    
   

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.fliImage(mo);
        }

        mo.draw(this.ctx);
       //mo.drawFrameCharacter(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    fliImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    restartButton(){
        window.location.reload();
    }
}