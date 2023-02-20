var PLAY = 1;
var END = 0;
var gameState = PLAY;

var background1;
var player, playerImage, playerDestruido;
var borda1, borda2, borda3, borda4;
var bala, balaImage;
var inimigo, inimigoImage, inimigoGroup;
var inimigoDestruido;
var resetButton, resetButtonImage;

var score = 0;

var balaGroup;

function preload(){
    background1 = loadImage("background.webp");
    playerImage = loadAnimation("Player.png");
    balaImage = loadImage("bala.png");
    inimigoImage = loadAnimation("inimigo.png");
    playerDestruido = loadAnimation("playerDestruido.png");
    resetButtonImage = loadImage("reset.png");
    inimigoDestruido = loadAnimation("inimigoDestruido.png");
}

function setup() {
 createCanvas(400,800);
 player = createSprite(150,750);
 player.addAnimation('playerImage', playerImage);
 player.addAnimation("playerDestruido", playerDestruido);
 player.changeAnimation("playerImage", playerImage);
 player.scale = 0.3;
 

 borda1 = createSprite(0,800,1200,0);
 borda1.visible = false;
 borda2 = createSprite(0,0,10,2000);
 borda2.visible = false;
 borda3 = createSprite(400,0,10,2000);
 borda3.visible = false;
 borda4 = createSprite(0,0,1200,10);
 borda4.visible = false;


 inimigoGroup = createGroup();
 balaGroup = createGroup();

 resetButton = createSprite(190,400);
 resetButton.addImage(resetButtonImage);
 resetButton.scale = 0.2;
}

function draw() {
    background(background1);
    fill("white")
    text("Score "+score, 30, 10)
    drawSprites();

    if(gameState === PLAY){
        
        if(keyDown(UP_ARROW)){
            player.y -= 10;
    
        }
        if(keyDown(DOWN_ARROW)){
            player.y += 10;
    
        }
        if(keyDown(RIGHT_ARROW)){
            player.x += 10;
    
        }
        if(keyDown(LEFT_ARROW)){    
            player.x -= 10;
    
        }
        resetButton.visible = false;
        spawnInimigo()
        
        if(inimigoGroup.isTouching(player)){
            
           
            gameState = END;
            
          
        }
    }
    if(gameState === END){
        player.changeAnimation("playerDestruido", playerDestruido);
        fill("red");
        textSize(40);
        text("Game Over", 90,200);

       resetButton.visible = true;

        inimigoGroup.setVelocityYEach(0);
        inimigoGroup.setLifetimeEach(-1);
        if(mousePressedOver(resetButton)){
            reset()

        }
    }

    
    

    player.collide(borda1);    
    player.collide(borda2);
    player.collide(borda3);
    player.collide(borda4);

    
}
function keyPressed(){
    if(keyCode == 32){
        bala = createSprite(player.x, player.y);
        bala.addImage(balaImage);
        bala.scale = 0.2
        bala.velocityY = -15 
        balaGroup.add (bala);
        
    }
    if(inimigoGroup.collide(balaGroup)){
            

          score += 1;
        inimigo.changeAnimation("inimigoDestruido");
        inimigoGroup.destroyEach();
        balaGroup.destroyEach();
            
        }

}
function spawnInimigo(){
    if (frameCount % 60 === 0){
        inimigo = createSprite(200,0);
        inimigo.addAnimation("inimigoImage", inimigoImage);
        inimigo.addAnimation("inimigoDestruido", inimigoDestruido);
        inimigo.changeAnimation("inimigoImage");
        inimigo.scale = 0.2;
        inimigo.velocityY = 10;
      
        inimigo.x = Math.round(random(50,350));         
       
       inimigo.lifetime = 300;
      
       inimigoGroup.add(inimigo);
    }
   }
function reset(){
    resetButton.visible = false;
    gameState = PLAY;
    player.changeAnimation("playerImage");
    inimigoGroup.destroyEach();
    
    player.x = 150;
    player.y = 750;

    score = 0;
    
}
