class Bottle extends MovableObject{
     height = 100;
     width = 80;

     OFF_SET ={
        top: 6,//10
        left: 10,//20
        right: 18,//40
        bottom: 7//20
    }

    constructor(){
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 150 + Math.random() * 1500;
        this.y = 330;  
    }
}