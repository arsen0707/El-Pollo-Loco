class Cloud extends MovableObject {
        x = Math.random() * 500;
        y = 20;
        width = 600;
        height = 150;
       
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x =Math.random() * 500; //zahl zwischen 200 und 700
        this.animate();
       }

       animate(){
        this.moveLeft();
        
       }


       
}