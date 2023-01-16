let level1;

function initStart(){

level1 = new Level (
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        
        
    ],
    [
        new Endboss()
    ],
    [
        new Cloud()
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png',-719, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719,30),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719,20),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719,0),

        new BackgroundObject('img/5_background/layers/air.png',0, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0,30),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0,20),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0,0),
        new BackgroundObject('img/5_background/layers/air.png',719, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719,30),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719,20),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719,0),


        new BackgroundObject('img/5_background/layers/air.png',719*2, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2,30),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2,20),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2,0),


        new BackgroundObject('img/5_background/layers/air.png',719*3, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3,30),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3,20),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3,0),


        new BackgroundObject('img/5_background/layers/air.png',719*4, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4,30),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4,20),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4,0),


        new BackgroundObject('img/5_background/layers/air.png',719*5, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5,30),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5,20),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5,0),
        
        
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins()

    ]
);

}