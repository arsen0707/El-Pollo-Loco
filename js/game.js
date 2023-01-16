let canvas;
let world;
let keyboard = new Keyboard();
BG_SOUND = new Audio ('audio/bg sound.mp3');
let gameIsFinish = false;
intervalIds = [];


function stopableInterval(fn, time){
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopTheGame(){
    BG_SOUND.pause(); 
   intervalIds.forEach(clearInterval);  
}

function init() {   
    document.getElementById('startTheGame').classList.remove('d-none');
    touchTheButtons();
}

function startTheGame(){
    BG_SOUND.play();
    BG_SOUND.volume = 0.3; 
    initStart();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('firstContainer').classList.add('d-none');
    document.getElementById('fotoDirection').classList.remove('d-none');
    document.getElementById('directionWords').classList.remove('d-none');
    document.getElementById('mainContainer').classList.remove('d-none');
    
}

window.addEventListener("keydown", (e) => {
    
     if (e.keyCode == 37) {
        document.getElementById('left').style.filter='invert(1)';
        
            keyboard.LEFT = true;
          
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {

        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        document.getElementById('right').style.filter='invert(1)';
        keyboard.RIGHT = true;
        
    }
    if (e.keyCode == 40) {

        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        document.getElementById('jump').style.filter='invert(1)';
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        document.getElementById('hit').style.filter='invert(1)';
        keyboard.D = true;
        
    }
   // console.log('this is e',e.keyCode);

});


function restartButton(){
    window.location.reload();
 }

window.addEventListener("keyup", (e) => {
    if (e.keyCode==37){

        document.getElementById('left').style.filter='invert(0)';
       
        keyboard.LEFT=false;
    }
    if (e.keyCode==38){
        
        keyboard.UP=false;
    }
    if (e.keyCode==39){
        document.getElementById('right').style.filter='invert(0)';
        keyboard.RIGHT=false;
    }
    if (e.keyCode==40){

        keyboard.DOWN=false;
    }
    if (e.keyCode == 32) {
        document.getElementById('jump').style.filter='invert(0)';
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        document.getElementById('hit').style.filter='invert(0)';
        keyboard.D = false;
    }

}); 

function touchTheButtons () {
    document.getElementById('left').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if(gameIsFinish == false){
        keyboard.LEFT = true;
        }
        
    });
    document.getElementById('left').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('right').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if(gameIsFinish == false){
        keyboard.RIGHT = true;
        }
    });
    document.getElementById('right').addEventListener('touchend', (event) => {
        keyboard.RIGHT = false;
    });
    document.getElementById('jump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if(gameIsFinish == false){
        keyboard.SPACE = true;
        }
    });
    document.getElementById('jump').addEventListener('touchend', (event) => {
        keyboard.SPACE = false;
    });
    document.getElementById('hit').addEventListener('touchstart', (event) => {
        event.preventDefault();
        if(gameIsFinish == false){
        keyboard.D = true;
        }
    });
    document.getElementById('hit').addEventListener('touchend', (event) => {
        keyboard.D = false;
    });
    
}

function fullscreen(){
    let el = document.getElementById('canvas');
    if(el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    }
   else {
      el.mozRequestFullScreen();
   }            
}
















  




