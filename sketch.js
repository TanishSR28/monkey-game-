var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  //creating monkey sprite
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  obstaclesGroup = new Group();
  
  FoodGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,500,500);
  monkey.debug = true;
  
}


function draw() {
  
  
  if(gameState === PLAY){
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    background("white")
    stroke("white");
    textSize(20);
    fill("white");
    text("score:   "+score,350,50);
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.round(frameCount/frameRate());
    text("SurvivalTime:   " + survivalTime,100,50);
    
     spawnObstacles();

     spawnBananas();
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
     
    ground.velocityX = 0;
    monkey.velocityY = 0
     
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);

     obstaclesGroup.destroyEach();
     FoodGroup.destroyEach();

     ground.destroy();
     monkey.destroy();
    
      stroke("black");
      textSize(20);
      fill("black");
      text("Game   Over",120,200);
    
   }

  monkey.collide(ground);
  
  drawSprites();
  
}
function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(400,325,40,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = obstacle.x/obstacle.velocityX;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
   obstacle.setCollider("rectangle",-20,0,400,400);
   obstacle.debug = true;
   
 }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    banana = createSprite(400,100,40,10);
    banana.y = Math.round(random(10,60));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 210;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    banana.y = Math.round(random(120,200));
    
    //adding cloud to the group
    FoodGroup.add(banana);
    }
}
