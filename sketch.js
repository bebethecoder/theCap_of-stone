const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground,ground2,ground3,ground4,ground5,ground6;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var eating_sound;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  
  blink.playing = true;
  eat.playing = true;
  eat.looping = false; 
  blink.looping = true;
}

function setup() 
{
  var isMobile = /iPhone|iPod|iPad|Android/i.test(navigator.userAgent)
  if (isMobile){
    canvasWidth = displayWidth;
    canvasHeight = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(3,{x:40,y:30});

  ground = new Ground(200,canvasHeight,600,20);
  ground2 = createSprite(300,600,100,20);
  ground3 = createSprite(400,500,100,20);
  ground4 = createSprite(225,425,100,20);
  ground5 = createSprite(375,325,150,20);
  ground6 = createSprite(175,200,200,20);
  invisibleGround = createSprite(200,canvasHeight,600,20);
  invisibleGround.visible = false;
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,canvasHeight - 80,100,100);
  bunny.scale = 0.125;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();

  Engine.update(engine);
  ground.show()
  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
  
   }
  
  //write how bunny moves here
  if(keyDown(UP_ARROW)){
    bunny.y = bunny.y-20
  }

  if(keyDown(LEFT_ARROW)){
    bunny.x = bunny.x-1
  }

  if(keyDown(RIGHT_ARROW)){
    bunny.x = bunny.x+1
  }
  bunny.velocityY = bunny.velocityY+0.5;

  //write bunny.collide with the grounds here
  bunny.collide(invisibleGround);
  bunny.collide(ground2);
  bunny.collide(ground3);
  bunny.collide(ground4);
  bunny.collide(ground5);
  bunny.collide(ground6);
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}