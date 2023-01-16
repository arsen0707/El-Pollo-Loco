class Coins extends MovableObject{

    height = 200;
     width = 150;

     OFF_SET = {
        top: 30,
        left: 70,
        right: 70,
        bottom: 30
    }

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 150 + Math.random() * 1500;
        this.y = 0;
    }



}