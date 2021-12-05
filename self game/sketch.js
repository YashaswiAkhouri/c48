var space , spaceImg;
var pc , pcImg;
var obstacle1 ,obstacle2,obstacle2Img , obstacle1Img;
var fuel , fuelImg,fuelGroup, obstaclesGroup1,obstaclesGroup2;
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart , gameOver, restartImg,gameOverImg;
var distance=0;
var fuelSound,Oversound;



function preload(){
spaceImg = loadImage("space bg.jpg");
pcImg = loadImage("pc.png")
obstacle1Img = loadImage("obstacle.png")
obstacle2Img = loadImage("obstacle2.png")
fuelImg = loadImage("fuel.png")
//restartImg=loadImage("restart1.png");
gameOverImg=loadImage("game over1.png")
fuelSound=loadSound("pints earned.wav");
Oversound=loadSound("over sound.wav");




}


function setup(){
  space=createSprite(20,200,10000,1000);
  space.addImage("space",spaceImg);

  pc = createSprite(90,300,50,50);
  pc.addImage("pc",pcImg)
  pc.scale=0.2;
  
  
  
  
  gameOver=createSprite(800,250,70,70);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale=0.9;
  gameOver.visible=false;


  score=0;
  distance=0;

  obstaclesGroup1 = createGroup();
  fuelGroup = createGroup();
  obstaclesGroup2 = createGroup();



}

function draw(){
  createCanvas(2000,500)
  drawSprites();
  if(gameState===PLAY){
  obstacles();
  fueltank();
  distance=distance+Math.round(getFrameRate()/60)
  //space.velocityX=-(7+3*distance/100)

  pc.setCollider("rectangle",0,0,20,20);
  //pc.debug=2
  
  //background(spaceImg)

  space.velocityX=-4;
  if(space.x<600){
    space.x=space.width/2
  }
  if(keyDown("UP_ARROW")){
    pc.y=pc.y-4;
    
  }
  if(keyDown("DOWN_ARROW")){
    pc.y=pc.y+4;
  }
  
  
  if(pc.isTouching(fuelGroup)){
    fuelGroup.destroyEach();
    score=score+2
    fuelSound.play();
  }
  if (pc.isTouching(obstaclesGroup1)||pc.isTouching(obstaclesGroup2)){
    gameState=END;
    Oversound.play();
    
  }
  }

  else if(gameState===END){
    fill("orange")
    




  
    if(mousePressedOver(gameOver)){
     
      reset();
      gameState=PLAY;
     

      //console.log("hello")
    }
    
    if(keyDown("space")){
      reset();
      text("helloo",400,400)
      gameState=PLAY;
    }
    obstaclesGroup1.setVelocityXEach(0);
    obstaclesGroup2.setVelocityXEach(0)
    fuelGroup.setVelocityXEach(0);
    space.velocityX=0;
    //restart.visible=true;
    gameOver.visible=true;

fill("turquoise")
    textSize(30);
//    fill(0, 102, 153);
    text("Press space to restart the game",250,250)
     console.log("****************")
    //score=0;

    

  }
   
  //drawSprites();
  
  fill("turquoise")
  text("Score : "+ score, 400 , 50)
  text("Distance : " + distance,500,50)
  
  
  

}

function obstacles(){
  if(frameCount % 60 ===0){
   
  
    
  obstacle1 = createSprite(1500,200,50,50)
  obstacle1.addImage(obstacle1Img);
  obstacle1.scale = 0.2;
  obstacle1.velocityX=-4
  obstacle1.y=Math.round(random(50,450));
  //obstacle1.lifeTime=1000;

  obstacle2 =createSprite(1500,200,50,50)
  obstacle2.addImage(obstacle2Img);
  obstacle2.velocityX=-4
  obstacle2.y=Math.round(random(50,450));
  obstacle2.shapeColor="pink";
  //obstacle2.lifeTime=1000;
  obstacle2.scale=0.2;
  
  obstaclesGroup1.add(obstacle1);
  obstaclesGroup2.add(obstacle2);
  



}
  

}
function fueltank (){
  if(frameCount % 70 ===0){
    
  fuel = createSprite(1000,200,50,50)
  fuel.addImage(fuelImg);
  fuel.velocityX=-4;
  fuel.scale=0.1;
  fuel.y=Math.round(random(60,460))
  fuel.lifeTime=250;

   fuelGroup.add(fuel); 
  }

}

function reset(){
  gameState =PLAY;
  gameOver.visible=true;
  //reset.visible=false;
  obstaclesGroup1.destroyEach();
  obstaclesGroup2.destroyEach();
  fuelGroup.destroyEach();
  score=0;
  distance=0;
  
}
 
