var forestBG, forestImg;
var fly, flyImg;
var bird, birdImg, birdsGroup;
var gameState = "play"
var score = 0;


function preload(){

    forestImg = loadImage ("13865148.jpg");
    flyImg = loadImage("pngfind.com-cartoon-png-484139.png")
    birdImg = loadImage("PinClipart.com_bird-clip-art_5233227.png")
}

function setup() {
    createCanvas(300, 250);

    forestBG = createSprite(250, 125);
    forestBG.addImage(forestImg);
    forestBG.scale = 0.5;
    forestBG.velocityX = -4;

    fly = createSprite(30, 125);
    fly.addImage(flyImg);
    fly.scale = 0.02;
    fly.setCollider("circle", 0, 0, 60);

    birdsGroup = createGroup();

}

function draw() {
    background(0);

    if (gameState === "play"){
        
        if (forestBG.x < 50){
        forestBG.x = 250;
        }

        if(keyDown("up_arrow")){
        fly.velocityY = -5;
        }

        fly.velocityY += 0.5;

        if (frameCount % 100 === 0){
        spawnBird();
        }

        

        
        

        if (birdsGroup.isTouching(fly) || fly.y > 250){
        fly.destroy();
        forestBG.destroy();
        bird.destroy();
        
        gameState = "end";
    }

    drawSprites();

    score = frameCount;
        textSize(15);
        fill("red");
        text("SCORE: "+ score, 20, 20);
    }
    
    if (gameState === "end"){
        textSize(20);
        fill("yellow");
        text("GAME OVER", 90, 125);
        
    }

    
}



function spawnBird(){
    bird = createSprite(300, 100);
    bird.addImage(birdImg);
    bird.scale = 0.035;
    bird.velocityX = forestBG.velocityX;
    bird.lifetime = 300;

    bird.y = Math.round(random(20, 240));

    
    birdsGroup.add(bird);

    fly.depth = bird.depth;
    fly.depth += 1;
}