var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, ground, obstaclesGroup, fruitsGroup, count, monkeyAnimation, fruitImage, obstacleImage

function preload(){
  monkeyAnimation = loadAnimation(
  "images/images/Monkey_01.png",
  "images/images/Monkey_02.png",
  "images/images/Monkey_03.png",
  "images/images/Monkey_04.png",
  "images/images/Monkey_05.png",
  "images/images/Monkey_06.png",
  "images/images/Monkey_07.png",
  "images/images/Monkey_08.png",
  "images/images/Monkey_09.png",
  "images/images/Monkey_10.png",)

  fruitImage = loadImage("images/images/banana.png")
  obstacleImage = loadImage("images/images/stone.png")
}

function setup() {

createCanvas(400, 400)

monkey = createSprite(200,380,20,50);
monkey.addAnimation("monkey", monkeyAnimation);


monkey.scale = 0.15;
monkey.x = 50;

ground = createSprite(200,380,1000,20);
ground.x = ground.width /2;

ObstaclesGroup = new Group();
FruitsGroup = new Group();

textSize(18);
textFont("Courier New");
//textStyle(BOLD);

count = 0;;
}

function draw() {
  background("black");
  text("Score: "+ count, 250, 100);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 4*count/100);
    //scoring
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space") && monkey.y >= 323){
      monkey.velocityY = -15 ;
    }
  
    monkey.velocityY = monkey.velocityY + 0.5;
    
    spawnFruits();
    
    if(FruitsGroup.isTouching(monkey)){
      count = count + 2,
      FruitsGroup.destroyEach();
    }

    switch (count){
      case 2: monkey.scale = 0.17
      break
      case 4: monkey.scale = 0.19
      break
      case 6: monkey.scale = 0.21
      break
      case 8: monkey.scale = 0.23
      break

    }
  
    spawnObstacles();
    
    if(ObstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  
  else if(gameState === END) {
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    FruitsGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    FruitsGroup.setLifetimeEach(-1);
    
    
  }
  
  monkey.collide(ground);

  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    obstacle.addImage("Stone", obstacleImage);
            
    obstacle.scale = 0.2;
    obstacle.lifetime = 70;
    ObstaclesGroup.add(obstacle);
  }
}

function spawnFruits() {
  if (frameCount % 60 === 0) {
    var fruit = createSprite(400,random(200, 300),40,10);
    fruit.y = random(280,320);
    fruit.addImage("Banana", fruitImage);
    fruit.scale = 0.1;
    fruit.velocityX = -3;
    fruit.lifetime = 134;
    
    //fruits.depth = trex.depth;
    //monkey.depth = trex.depth + 1;
    
    FruitsGroup.add(fruit);
  }
  
}






  
