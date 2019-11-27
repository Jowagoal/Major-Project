// 2D Grid - Snake
// Jordie Walter
// Nov 12, 2019
//
// Extra for Experts: I'm not sure how much this qualifies for
// extra for experts but I'm really proud of the code for the size
// of the grid.  How I wrote the code allows the program to create
// the smallest possible grid for the number of skins there are.  
// this also means that in the future I will be able to add more
// skins to the store with a lot less code.  

//global variables

//this variable determines the state of the program
let state = "Main Menu";

let gameMode;

//these variables are the memory of the program
let arr = [];
let position = [0,0,0];
let secondPosition = [0,0,0];
let foodPosition = [0,0,0];
let bodyPosition = [];

let arrP2 = [];
let positionP2 = [0,950,0];
let secondPositionP2 = [0,0,0];
let foodPositionP2 = [0,0,0];
let bodyPositionP2 = [];

//these variables determine how the snake moves aswell as how long the snake is
let push0 = 50;
let push1 = 0;
let push2 = 0;
let push3 = 1;
let snakeLength;

let push0P2 = 50;
let push1P2 = 0;
let push2P2 = 0;
let push3P2 = 1;
let snakeLengthP2;

//these variables are for text and the difficulty slider in the options menu
let inconsolata;
let sliderX = 225;
let difficulty = 10;
let changingBingingsP1 = false;
let changingBingingsP2 = false;
let leftBindP1 = false;
let rightBindP1 = false;
let forwardBindP1 = false;
let backBindP1 = false;
let upBindP1 = false;
let downBindP1 = false;
let leftBindP2 = false;
let rightBindP2 = false;
let forwardBindP2 = false;
let backBindP2 = false;
let upBindP2 = false;
let downBindP2 = false;
let p1Controls = {
  left: 'a',
  lKeyCode: 65,
  right: 'd',
  rKeyCode: 68,
  forward: 'w',
  fKeyCode: 87,
  back: 's',
  bKeyCode: 83,
  up: 'ArrowUp',
  uKeyCode: 38,
  down: 'ArrowDown',
  dKeyCode: 40,
}
let p2Controls = {
  left: 'ArrowLeft',
  lKeyCode: 37,
  right: 'ArrowRight',
  rKeyCode: 39,
  forward: 'ArrowUp',
  fKeyCode: 38,
  back: 'ArrowDown',
  bKeyCode: 40,
  up: 'Enter',
  uKeyCode: 13,
  down: 'Shift',
  dKeyCode: 16,
}
let instructionsP1 = ["Controls:", p1Controls.left + ' = Left', p1Controls.right + ' = Right', p1Controls.forward + ' = Forward', p1Controls.back + ' = Back', p1Controls.up + ' = Up', p1Controls.down + ' = Down'];
let instructionsP2 = ["Controls:", p2Controls.left + ' = Left', p2Controls.right + ' = Right', p2Controls.forward + ' = Forward', p2Controls.back + ' = Back', p2Controls.up + ' = Up', p2Controls.down + ' = Down'];

//this variable kees track of if the game has been restarted
let restarted = false;

//variables for store and skins
let skin = "none";
let store;
let money = 0;
let moneyGained = 0;
//skins array holds all skins
let skins = [];
let noSkin;
let lineSkin;
let isotopeSkin;
let eyesSkin;

//variables for 2D array
let cols;
let rows;

let bare;
let snakeEyes;
let lines;
let iso;

function preload(){
  //preloads text font
  inconsolata = loadFont('assets/Inconsolata.otf');
  //preloads pictures for store
  bare = loadImage('assets/no skin.PNG')
  lines = loadImage('assets/lines.PNG');
  iso = loadImage('assets/iso.PNG');
  snakeEyes = loadImage('assets/snake eyes.PNG');
  
  eyesSkin = {
    name: 'Eyes',
    cost: 250,
    bought: 'no',
    active: 'no',
    picture: snakeEyes,
  };
  
  isotopeSkin = {
    name: 'Isotope',
    cost: 150,
    bought: 'no',
    active: 'no',
    picture: iso,
  };
  
  lineSkin = {
    name: 'Line',
    cost: 50,
    bought: 'no',
    active: 'no',
    picture: lines,
  };
  
  noSkin = {
    name: 'No Skin',
    cost: 'free',
    bought: 'yes',
    active: 'yes',
    picture: bare,
  };
  
  skins.push(noSkin);
  skins.push(lineSkin);
  skins.push(isotopeSkin);
  skins.push(eyesSkin);
}

//based on the state of the program, setup will create a new canvas
function setup() {
  if(state==="Main Menu"){
    createCanvas(windowWidth, windowHeight);

    document.getElementById("defaultCanvas0").style.visibility = "hidden";
    document.getElementById("defaultCanvas1").style.visibility = "hidden";
    document.getElementById("defaultCanvas2").style.visibility = "hidden";
    document.getElementById("defaultCanvas3").style.visibility = "hidden";
    document.getElementById("defaultCanvas4").style.visibility = "hidden";
    document.getElementById("defaultCanvas5").style.visibility = "hidden";
  }
  
  if(state==="Menu"){
    createCanvas(windowWidth, windowHeight);
    
    //hides all additional canvases
    document.getElementById("defaultCanvas0").style.visibility = "hidden";
    document.getElementById("defaultCanvas1").style.visibility = "hidden";
    document.getElementById("defaultCanvas2").style.visibility = "hidden";
    document.getElementById("defaultCanvas3").style.visibility = "hidden";
    document.getElementById("defaultCanvas4").style.visibility = "hidden";
    document.getElementById("defaultCanvas5").style.visibility = "hidden";
  }else if(state==="Options"){
    createCanvas(windowWidth, windowHeight);
  }else if(state==="Store"&&gameMode!=="Two Player"){
    createCanvas(windowWidth, windowHeight);
  }else if(state==="Play"){
    //creates 3d canvas
    createCanvas(windowWidth, windowHeight, WEBGL);
    
    //sets camera position and where it looks
    camera(-300,-400,600,500,700,-500);
    
    //sets initial position of food
    foodPosition[0]=ceil(random(-0.9,19))*50;
    foodPosition[1]=ceil(random(-0.9,19))*50;
    foodPosition[2]=ceil(random(-19,-0.9))*50;
    
    //shows all additional canvases
    document.getElementById("defaultCanvas0").style.visibility = "visible";
    document.getElementById("defaultCanvas1").style.visibility = "visible";
    document.getElementById("defaultCanvas2").style.visibility = "visible";
    document.getElementById("defaultCanvas3").style.visibility = "visible";
    document.getElementById("defaultCanvas4").style.visibility = "visible";
    document.getElementById("defaultCanvas5").style.visibility = "visible";
  }else if(state==="Game Over"){
    createCanvas(windowWidth, windowHeight);

    //calculates money gained for round
    moneyGained = (snakeLength-3)*difficulty;
    //adds money gained to total money(it adds twice for some reason)
    money+=moneyGained/2;
    
    //hides all additional canvases
    document.getElementById("defaultCanvas0").style.visibility = "hidden";
    document.getElementById("defaultCanvas1").style.visibility = "hidden";
    document.getElementById("defaultCanvas2").style.visibility = "hidden";
    document.getElementById("defaultCanvas3").style.visibility = "hidden";
    document.getElementById("defaultCanvas4").style.visibility = "hidden";
    document.getElementById("defaultCanvas5").style.visibility = "hidden";
  }
}

//draw loop will first check the state
function draw() {
  checkState();
}

//after state is determined, it will call its corresponding function
function checkState(){
  if(state==="Main Menu"){
    mainMenu();
    pointerDot();
  }
  if(state==="Menu"){
    //after user resets, all values that changed need to be reset
    resetAllValues();
    startScreen();
    pointerDot();
  }
  if(state==="Options"){
    optionMenu();
    pointerDot();
  }
  if(state==="Store"){
    storeMenu();
  }
  if(state==="Play"){
    gamePlay();
  }
  if(state==="Game Over"){
    restarted=true;
    deathScreen();
    pointerDot();
  }
}

//this just puts a red dot on the mouse
function pointerDot(){
  noStroke();
  fill(255,0,0);
  circle(mouseX, mouseY, 3);
}

//this function does everything on the start screen
function mainMenu(){
  //after the program is restarted, everything on the screen is displaced
  //this corrects that displacement
  if(restarted===true){
    translate(-1/2*width,-1/2*height);
  }

  background(100);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(inconsolata);
  
  //sets stroke, size, and fill for title
  noStroke();
  textSize(150);
  fill(0,255,100);
  //title
  text("3D Snake",width/2, height*2/8);
  
  //sets stroke and fill for the buttons
  stroke(0);
  fill(200);
  //creates buttons
  rect(width/2, height/2+height*1/8, width/4, height/8);
  rect(width/3, height/2+height*3/8, width/4, height/8);
  rect(width/3*2, height/2+height*3/8, width/4, height/8);
  
  //sets stroke, size, and fill for buttons
  noStroke();
  textSize(25);
  fill(0);
  //start game button
  text("Single Player",width/2, height/2+height*1/8);
  
  //options button
  text("Two Player",width/3, height/2+height*3/8);

  text("Online",width/3*2, height/2+height*3/8);
  
  if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2+height*1/8-height/16&&mouseY<height/2+height*1/8+height/16&&mouseIsPressed){
    //when mouse clicks options button, sets state to play and calls setup again to start the game
    gameMode="Single Player";
    state="Menu";
    p1Controls.up = 'ArrowUp';
    p1Controls.uKeyCode = 38;
    p1Controls.down = 'ArrowDown';
    p1Controls.dKeyCode = 40;
    instructionsP1[5]=p1Controls.up + " = Up";
    instructionsP1[6]=p1Controls.down + " = Down";
    setup();
  }else if(mouseX>width/3-width/8&&mouseX<width/3+width/8&&mouseY>height/2+height*1/8-height/16+height/4&&mouseY<height/2+height*1/8+height/16+height/4&&mouseIsPressed){
    //when mouse clicks options button, sets state to play and calls setup again to open options screen
    gameMode="Two Player";
    state="Menu";
    p1Controls.up = 't';
    p1Controls.uKeyCode = 84;
    p1Controls.down = 'g';
    p1Controls.dKeyCode = 71;
    instructionsP1[5]=p1Controls.up + " = Up";
    instructionsP1[6]=p1Controls.down + " = Down";
    setup();
  }else if(mouseX>width/3*2-width/8&&mouseX<width/3*2+width/8&&mouseY>height/2+height*1/8-height/16+height/4&&mouseY<height/2+height*1/8+height/16+height/4&&mouseIsPressed){
    //when mouse clicks options button, sets state to play and calls setup again to open options screen
    gameMode="Online";
    state="Menu";
    p1Controls.up = 'ArrowUp';
    p1Controls.uKeyCode = 38;
    p1Controls.down = 'ArrowDown';
    p1Controls.dKeyCode = 40;
    instructionsP1[5]=p1Controls.up + " = Up";
    instructionsP1[6]=p1Controls.down + " = Down";
    setup();
  }
}

//this function does everything on the start screen
function startScreen(){
  //after the program is restarted, everything on the screen is displaced
  //this corrects that displacement
  if(restarted===true){
    translate(-1/2*width,-1/2*height);
  }

  background(100);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(inconsolata);
  
  //sets stroke, size, and fill for title
  noStroke();
  textSize(100);
  fill(0,255,100);

  //title
  text("3D Snake",width/2, height/8);
  
  //sets stroke and fill for the buttons
  stroke(0);
  fill(200);

  if(gameMode!=="Two Player"){
    //creates buttons
    rect(width/2, height/2, width/4, height/8);
    rect(width/3, height/2+height/4, width/4, height/8);
    rect(width/3*2, height/2+height/4, width/4, height/8);
  }else{
    rect(width/2, height/2, width/4, height/8);
    rect(width/2, height/2+height/4, width/4, height/8);
  }
  
  //sets stroke, size, and fill for buttons
  noStroke();
  textSize(25);
  fill(0);

  if(gameMode!=="Two Player"){
    //start game button
    text("Start Game",width/2, height/2);
    //options button
    text("Options",width/3, height/2+height/4);
    //store button
    text("Store",width/3*2, height/2+height/4);
  }else{
//start game button
  text("Start Game",width/2, height/2);
  //options button
  text("Options",width/2, height/2+height/4);
  }
  if(gameMode!=="Two Player"){
    if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2-height/16&&mouseY<height/2+height/16&&mouseIsPressed){
      //when mouse clicks options button, sets state to play and calls setup again to start the game
      state="Play";
      setup();
    }else if(mouseX>width/3-width/8&&mouseX<width/3+width/8&&mouseY>height/2-height/16+height/4&&mouseY<height/2+height/16+height/4&&mouseIsPressed){
      //when mouse clicks options button, sets state to play and calls setup again to open options screen
      state="Options";
      setup();
    }else if(mouseX>width/3*2-width/8&&mouseX<width/3*2+width/8&&mouseY>height/2-height/16+height/4&&mouseY<height/2+height/16+height/4&&mouseIsPressed){
      //when mouse clicks options button, sets state to play and calls setup again to open options screen
      state="Store";
      setup();
    }
  }else{
    if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2-height/16&&mouseY<height/2+height/16&&mouseIsPressed){
      //when mouse clicks options button, sets state to play and calls setup again to start the game
      state="Play";
      setup();
    }else if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2-height/16+height/4&&mouseY<height/2+height/16+height/4&&mouseIsPressed){
      //when mouse clicks options button, sets state to play and calls setup again to open options screen
      state="Options";
      setup();
    }
  }
}

//after user resets, all values that changed need to be reset
function resetAllValues(){
  arr = [0,0,0,0];
  position = [0,0,0];
  secondPosition = [0,0,0];
  foodPosition = [0,0,0];
  bodyPosition = [];
  
  push0 = 50;
  push1 = 0;
  push2 = 0;
  push3 = 1;
  snakeLength = 3;

  arrP2 = [0,950,0,0];
  positionP2 = [0,950,0];
  secondPositionP2 = [0,0,0];
  foodPositionP2 = [0,0,0];
  bodyPositionP2 = [];
  
  push0P2 = 50;
  push1P2 = 0;
  push2P2 = 0;
  push3P2 = 1;
  snakeLengthP2 = 3;
}

//this function does everything on the options screen
function optionMenu(){
  background(200);
  fill(0);
  
  //after the program is restarted, everything on the screen is displaced
  //this corrects that displacement
  if(restarted===true){
    translate(-1/2*width,-1/2*height);
  }
  
  //writes the instructions on screen
  textAlign(LEFT, TOP);
  textFont(inconsolata);
  noStroke();
  textSize(25);
  controls();
  
  stroke(0);
  fill(255);
  //difficulty slider bar
  rect(225, 300, 250, 20);
  
  //notches on slider bar
  noStroke();
  fill(220);
  for(var j=0; j<9; j++){
    rect(125+25*j, 300, 5, 20);
  }
  
  //text for difficulty
  fill(0);
  textAlign(CENTER, CENTER);
  text("Difficulty", 225, 250);
  textSize(15);
  text("Easy", 100, 325);
  text("Normal", 225, 325);
  text("Hard", 350, 325);
  
  //the slider
  stroke(0);
  fill(150);
  rect(sliderX, 300, 9, 25);
  
  //if the mouse is down on any part of the bar, the slider will move to that position
  if(mouseX>100&&mouseX<350&&mouseY>474-12&&mouseY<474+12&&mouseIsPressed){
    sliderX=mouseX;
  }else 
  //when the mouse is released, the slider will snap to its nearest notch
  //each notch changes the difficulty of the game
  if(sliderX<100+25/2){
    sliderX=100;
    difficulty = 5;
  }else if(sliderX>=100+25/2&&sliderX<100+25/2*3){
    sliderX=100+25;
    difficulty = 6;
  }else if(sliderX>=100+25/2*3&&sliderX<100+25/2*5){
    sliderX=100+25*2;
    difficulty = 7;
  }else if(sliderX>=100+25/2*5&&sliderX<100+25/2*7){
    sliderX=100+25*3;
    difficulty = 8;
  }else if(sliderX>=100+25/2*7&&sliderX<100+25/2*9){
    sliderX=100+25*4;
    difficulty = 9;
  }else if(sliderX>=100+25/2*9&&sliderX<100+25/2*11){
    sliderX=100+25*5;
    difficulty = 10;
  }else if(sliderX>=100+25/2*11&&sliderX<100+25/2*13){
    sliderX=100+25*6;
    difficulty = 11;
  }else if(sliderX>=100+25/2*13&&sliderX<100+25/2*15){
    sliderX=100+25*7;
    difficulty = 12;
  }else if(sliderX>=100+25/2*15&&sliderX<100+25/2*17){
    sliderX=100+25*8;
    difficulty = 13;
  }else if(sliderX>=100+25/2*17&&sliderX<100+25/2*19){
    sliderX=100+25*9;
    difficulty = 14;
  }else if(sliderX>=100+25/2*19){
    sliderX=100+25*10;
    difficulty = 15;
  }
  
  //red back rectangle, changes the state back to menu
  fill(255,0,0);
  rectMode(CENTER);
  rect(width*0.9,-125, 30, 20);
  if(mouseX>width*0.9-15&&mouseX<width*0.9+15&&mouseY>38&&mouseY<60&&mouseIsPressed){
    state="Menu";
    changingBingingsP1=false;
    changingBingingsP2=false;
    setup();
  }

  //translates the origin back to the top left of the screen
  translate(0,-25*instructionsP1.length);
}

function controls(){
  if(gameMode!=="Two Player"){
    changePlayer1Bindings();
  }else{
    changePlayer1Bindings();
    changePlayer2Bindings();
    translate(-250,0);
  }
}

function changePlayer1Bindings(){
  if(mouseX>100&&mouseX<300&&mouseY>135+175&&mouseY<165+175&&mouseIsPressed){
    changingBingingsP1=true;
  }

  //for loop allows for easy changes to the instructions
  for(var i=0; i<instructionsP1.length; i++){
    text(instructionsP1[i], 100, 100);
    translate(0, 25);
  }
  
  if(changingBingingsP1===false){
    //button for key bindings
    stroke(100);
    fill(255);
    rect(200, 150, 200, 30);
    fill(0);
    stroke(255);
    text("Change Bindings", 105, 135);
  }else{
    text("Click box to", 105, 135);
    text("set new binding.", 105, 165);
  
    //left binding
    if(mouseX>75-7&&mouseX<75+7&&mouseY>150-19&&mouseY<150-5&&mouseIsPressed){
      leftBindP1=true;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
    }
    if(leftBindP1===true){
      fill(255,255,0);
      rect(75, -25-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p1Controls.lKeyCode = k;
          p1Controls.left = key;
          leftBindP1=false;
          instructionsP1 = ["Controls:", p1Controls.left + ' = Left', p1Controls.right + ' = Right', p1Controls.forward + ' = Forward', p1Controls.back + ' = Back', p1Controls.up + ' = Up', p1Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, -25-12, 14, 14);
    }
  
    //right binding
    if(mouseX>75-7&&mouseX<75+7&&mouseY>175-19&&mouseY<175-5&&mouseIsPressed){
      leftBindP1=false;
      rightBindP1=true;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
    }
    if(rightBindP1===true){
      fill(255,255,0);
      rect(75, 0-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p1Controls.rKeyCode = k;
          p1Controls.right = key;
          rightBindP1=false;
          instructionsP1 = ["Controls:", p1Controls.left + ' = Left', p1Controls.right + ' = Right', p1Controls.forward + ' = Forward', p1Controls.back + ' = Back', p1Controls.up + ' = Up', p1Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 0-12, 14, 14);
    }
  
    //forward binding
    if(mouseX>75-7&&mouseX<75+7&&mouseY>200-19&&mouseY<200-5&&mouseIsPressed){
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=true;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
    }
    if(forwardBindP1===true){
      fill(255,255,0);
      rect(75, 25-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p1Controls.fKeyCode = k;
          p1Controls.forward = key;
          forwardBindP1=false;
          instructionsP1 = ["Controls:", p1Controls.left + ' = Left', p1Controls.right + ' = Right', p1Controls.forward + ' = Forward', p1Controls.back + ' = Back', p1Controls.up + ' = Up', p1Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 25-12, 14, 14);
    }
  
    //back binding
    if(mouseX>75-7&&mouseX<75+7&&mouseY>225-19&&mouseY<225-5&&mouseIsPressed){
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=true;
      upBindP1=false;
      downBindP1=false;
    }
    if(backBindP1===true){
      fill(255,255,0);
      rect(75, 50-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p1Controls.bKeyCode = k;
          p1Controls.back = key;
          backBindP1=false;
          instructionsP1 = ["Controls:", p1Controls.left + ' = Left', p1Controls.right + ' = Right', p1Controls.forward + ' = Forward', p1Controls.back + ' = Back', p1Controls.up + ' = Up', p1Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 50-12, 14, 14);
    }
  
    //up binding
    if(mouseX>75-7&&mouseX<75+7&&mouseY>250-19&&mouseY<250-5&&mouseIsPressed){
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=true;
      downBindP1=false;
    }
    if(upBindP1===true){
      fill(255,255,0);
      rect(75, 75-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p1Controls.uKeyCode = k;
          p1Controls.up = key;
          upBindP1=false;
          instructionsP1 = ["Controls:", p1Controls.left + ' = Left', p1Controls.right + ' = Right', p1Controls.forward + ' = Forward', p1Controls.back + ' = Back', p1Controls.up + ' = Up', p1Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 75-12, 14, 14);
    }
  
    //down binding
    if(mouseX>75-7&&mouseX<75+7&&mouseY>275-19&&mouseY<275-5&&mouseIsPressed){
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=true;
    }
    if(downBindP1===true){
      fill(255,255,0);
      rect(75, 100-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p1Controls.dKeyCode = k;
          p1Controls.down = key;
          downBindP1=false;
          instructionsP1 = ["Controls:", p1Controls.left + ' = Left', p1Controls.right + ' = Right', p1Controls.forward + ' = Forward', p1Controls.back + ' = Back', p1Controls.up + ' = Up', p1Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 100-12, 14, 14);
    }
  }
}

function changePlayer2Bindings(){
  if(mouseX>100+250&&mouseX<300+250&&mouseY>135+175&&mouseY<165+175&&mouseIsPressed){
    changingBingingsP2=true;
  }

  translate(250, -25*instructionsP1.length);
  textAlign(LEFT, TOP);
  textFont(inconsolata);
  noStroke();
  textSize(25);
  fill(0);

  for(var i=0; i<instructionsP2.length; i++){
    text(instructionsP2[i], 100, 100);
    translate(0, 25);
  }
  
  if(changingBingingsP2===false){
    //button for key bindings
    stroke(100);
    fill(255);
    rect(200, 150, 200, 30);
    fill(0);
    stroke(255);
    text("Change Bindings", 105, 135);
  }else{
    text("Click box to", 105, 135);
    text("set new binding.", 105, 165);
  
    //left binding
    if(mouseX>75-7+250&&mouseX<75+7+250&&mouseY>150-19&&mouseY<150-5&&mouseIsPressed){
      leftBindP2=true;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=false;
      downBindP2=false;
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
    }
    if(leftBindP2===true){
      fill(255,255,0);
      rect(75, -25-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p2Controls.lKeyCode = k;
          p2Controls.left = key;
          leftBindP2=false;
          instructionsP2 = ["Controls:", p2Controls.left + ' = Left', p2Controls.right + ' = Right', p2Controls.forward + ' = Forward', p2Controls.back + ' = Back', p2Controls.up + ' = Up', p2Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, -25-12, 14, 14);
    }
  
    //right binding
    if(mouseX>75-7+250&&mouseX<75+7+250&&mouseY>175-19&&mouseY<175-5&&mouseIsPressed){
      leftBindP2=false;
      rightBindP2=true;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=false;
      downBindP2=false;
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
    }
    if(rightBindP2===true){
      fill(255,255,0);
      rect(75, 0-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p2Controls.rKeyCode = k;
          p2Controls.right = key;
          rightBindP2=false;
          instructionsP2 = ["Controls:", p2Controls.left + ' = Left', p2Controls.right + ' = Right', p2Controls.forward + ' = Forward', p2Controls.back + ' = Back', p2Controls.up + ' = Up', p2Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 0-12, 14, 14);
    }
  
    //forward binding
    if(mouseX>75-7+250&&mouseX<75+7+250&&mouseY>200-19&&mouseY<200-5&&mouseIsPressed){
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=true;
      backBindP2=false;
      upBindP2=false;
      downBindP2=false;
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
    }
    if(forwardBindP2===true){
      fill(255,255,0);
      rect(75, 25-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p2Controls.fKeyCode = k;
          p2Controls.forward = key;
          forwardBindP2=false;
          instructionsP2 = ["Controls:", p2Controls.left + ' = Left', p2Controls.right + ' = Right', p2Controls.forward + ' = Forward', p2Controls.back + ' = Back', p2Controls.up + ' = Up', p2Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 25-12, 14, 14);
    }
  
    //back binding
    if(mouseX>75-7+250&&mouseX<75+7+250&&mouseY>225-19&&mouseY<225-5&&mouseIsPressed){
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=true;
      upBindP2=false;
      downBindP2=false;
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
    }
    if(backBindP2===true){
      fill(255,255,0);
      rect(75, 50-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p2Controls.bKeyCode = k;
          p2Controls.back = key;
          backBindP2=false;
          instructionsP2 = ["Controls:", p2Controls.left + ' = Left', p2Controls.right + ' = Right', p2Controls.forward + ' = Forward', p2Controls.back + ' = Back', p2Controls.up + ' = Up', p2Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 50-12, 14, 14);
    }
  
    //up binding
    if(mouseX>75-7+250&&mouseX<75+7+250&&mouseY>250-19&&mouseY<250-5&&mouseIsPressed){
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=true;
      downBindP2=false;
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
    }
    if(upBindP2===true){
      fill(255,255,0);
      rect(75, 75-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p2Controls.uKeyCode = k;
          p2Controls.up = key;
          upBindP2=false;
          instructionsP2 = ["Controls:", p2Controls.left + ' = Left', p2Controls.right + ' = Right', p2Controls.forward + ' = Forward', p2Controls.back + ' = Back', p2Controls.up + ' = Up', p2Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 75-12, 14, 14);
    }
  
    //down binding
    if(mouseX>75-7+250&&mouseX<75+7+250&&mouseY>275-19&&mouseY<275-5&&mouseIsPressed){
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=false;
      downBindP2=true;
      leftBindP1=false;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
    }
    if(downBindP2===true){
      fill(255,255,0);
      rect(75, 100-12, 14, 14);
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          p2Controls.dKeyCode = k;
          p2Controls.down = key;
          downBindP2=false;
          instructionsP2 = ["Controls:", p2Controls.left + ' = Left', p2Controls.right + ' = Right', p2Controls.forward + ' = Forward', p2Controls.back + ' = Back', p2Controls.up + ' = Up', p2Controls.down + ' = Down'];
        }
      }
    }else{
      fill(255,0,0);
      rect(75, 100-12, 14, 14);
    }
  }
}

function storeMenu(){
  background(200);

  //after the program is restarted, everything on the screen is displaced
  //this corrects that displacement
  if(restarted===true){
    translate(-1/2*width,-1/2*height);
  }

  //creates creates the smallest possible rectangular grid based on the number of skins available
  if(skins.length<3){
    store = [[]]
  }else if(skins.length<7){
    store = [[],[]]
  }else if(skins.length<13){
    store = [[],[],[]]
  }else if(skins.length<21){
    store = [[],[],[],[]]
  }else if(skins.length<31){
    store = [[],[],[],[],[]]
  }
  let h = 0;
  for(var i=0; i<ceil(sqrt(skins.length)); i++){
    for(var j=0; j<floor(sqrt(skins.length)+0.42); j++){
      //sets number of rows and columns in grid
      rows = j+1;
      cols = i+1;

      //pushes skins into the grid
      if(store[i]===undefined){
        store[j][i] = skins[h];
      }else{
        store[i][j] = skins[h];
      }
      h++;
    }
  }

  //displays grid
  rectMode(LEFT, TOP);
  let cellSize = height/2/cols;
  //nested for loop doubles grid size(-1) to allow for spaces between items
  for (let y = 0; y < rows*2-1; y++) {
    for (let x = 0; x < cols*2-1; x++) {
      //only displays enough for the size of the grid
      if(y%2===0&&x%2===0){
        stroke(0);
        fill(220);
        rect(x*cellSize+cellSize, y*cellSize+cellSize, cellSize*1.5, cellSize*1.5);
        enterItem(x/2, y/2, x*cellSize+cellSize, y*cellSize+cellSize, cellSize*1.5);
      }
    }
  }

  //red back rectangle, changes the state back to menu
  fill(255,0,0);
  rectMode(CENTER);
  stroke(0);
  rect(width*0.9, 50, 30, 20);
  if(mouseX>width*0.9-15&&mouseX<width*0.9+15&&mouseY>38&&mouseY<60&&mouseIsPressed){
    state="Menu";
    setup();
  }

  //displays money on right side
  fill(255, 255, 0);
  text("Money: " + money, width*0.9, height*0.2);
  
  pointerDot();
}

//displays a skin and its information into the store
function enterItem(col, row, centerX, centerY, wh){
  textAlign(CENTER, CENTER);
  textSize(wh*1/8);
  
  //displays if the item is active, bought, or the cost of the item
  fill(150);
  //rectangle for button
  rect(centerX, centerY+wh*3/8, wh*5/8, wh*1/8);
  fill(255, 255, 0);
  //displays text
  if(store[row][col]!==undefined&&store[row][col].bought==='no'){
    text("Cost: " + store[row][col].cost, centerX, centerY+wh*3/8);
  }else if(store[row][col]!==undefined&&store[row][col].bought==='yes'&&store[row][col].active==='no'){
    text("Bought", centerX, centerY+wh*3/8);
  }else{
    text("Active", centerX, centerY+wh*3/8);
  }
  //checks if the mouse is clicked on the button
  if(mouseX>centerX-(wh*5/8)/2&&mouseX<centerX+(wh*5/8)/2&&mouseY>centerY+wh*3/8-(wh*1/8)/2&&mouseY<centerY+wh*3/8+(wh*1/8)/2&&mouseIsPressed){
    //if the skin is not bought and the user has enough to buy it...
    if(store[row][col].bought==='no'&&money>=store[row][col].cost){
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          //sets all other skins to not active
          if(store[y][x]!==undefined){
            store[y][x].active='no';
          }
        }
      }
      //subtracts money
      money-=store[row][col].cost;
      //set current skin to its name
      skin = store[row][col].name;
      //changes skin's bought and active to 'yes'
      store[row][col].bought='yes';
      store[row][col].active='yes';
    }else 
    //if the skin is bought...
    if(store[row][col].bought==='yes'){
      for (let a = 0; a < rows; a++) {
        for (let b = 0; b < cols; b++) {
          if(store[a][b]!==undefined){
            //sets all other skins to not active
            store[a][b].active='no';
          }
        }
      }
      //set current skin to its name
      skin = store[row][col].name;
      //changes skin's active to 'yes'
      store[row][col].active='yes';
    }
  }

  //displays the name of the skin
  fill(150);
  rect(centerX, centerY+wh*3/16, wh*7/8, wh*1/8);
  fill(0);
  if(store[row][col]!==undefined){
    text(store[row][col].name, centerX, centerY+wh*3/16);
  }

  //displays picture of the skin
  if(store[row][col]!==undefined){
    image(store[row][col].picture, centerX-wh*1/2+1, centerY+wh*-1/2, wh-2, wh*5/8);
  }

  //if a part of the array is not filled, places a sqaure same color as background over top
  if(store[row][col]===undefined){
    noStroke();
    fill(200);
    rect(centerX, centerY, wh+2, wh+2);
  }
}

//gameplay is split into two parts, board creation and the part that the user plays
function gamePlay(){
  background(220);
  
  createBoard();

  gameStart();
}

//the board is simply 12 lines to make a large box, the game is played within
function createBoard(){
  strokeWeight(5);
  fill(0,0,0);
  stroke(255,0,0);
  line(-25,-25,25,975,-25,25);
  line(-25,-25,25,-25,975,25);
  line(-25,-25,25,-25,-25,-975);
  
  line(975,975,-975,975,975,25);
  line(975,975,-975,975,-25,-975);
  line(975,975,-975,-25,975,-975);
  
  line(-25,975,25,975,975,25);
  line(-25,975,25,-25,975,-975);
  
  line(975,-25,-975,975,-25,25);
  line(975,-25,-975,-25,-25,-975);
  
  line(-25,-25,-975,-25,975,-975);
  
  line(975,-25,25,975,975,25);
}

//every part of the game the user plays is in this function
function gameStart(){
  //the difficulty changes the framerate
  frameRate(difficulty);
  
  orbitControl();
  strokeWeight(2);
  stroke(0);
  
  
  //food function makes the food
  food();
  if(gameMode!=="Two Player"){
    //arr is the memory of the moves
    //push0 through push3 tells the array which of 6 directions to move
    arr.push(push0);
    arr.push(push1);
    arr.push(push2);
    arr.push(push3);
    //moves the snake
    moveSnake();
  }else{
    push();
    arr.push(push0);
    arr.push(push1);
    arr.push(push2);
    arr.push(push3);
    moveSnake();
    pop();
    arrP2.push(push0P2);
    arrP2.push(push1P2);
    arrP2.push(push2P2);
    arrP2.push(push3P2);
    moveSnakeP2();
  }
}
    
function moveSnake(){
   //resets the current position to 0
  position[0]=0;
  position[1]=0;
  position[2]=0;
  //resets second position to 0
  secondPosition[0]=0;
  secondPosition[1]=0;
  secondPosition[2]=0;
  //for loop reads every 4 elements (bit) of the array
  for(var i=0; i<=arr.length; i+=4){
    //translates by the first 3 elements of a bit (x,y,z) 
    translate(arr[i],arr[i+1],arr[i+2]);
    //updates position and secondPosition
    if(arr[i+0]===50||arr[i+0]===-50||arr[i+1]===50||arr[i+1]===-50||arr[i+2]===50||arr[i+2]===-50){
      position[0]=position[0]+arr[i+0];
      position[1]=position[1]+arr[i+1];
      position[2]=position[2]+arr[i+2];
      secondPosition[0]=secondPosition[0]+arr[i-4];
      secondPosition[1]=secondPosition[1]+arr[i-3];
      secondPosition[2]=secondPosition[2]+arr[i-2];
    }
    //if the position is outside the border, state changes to game over and calls setup
    if(position[0]<0||position[0]>950||position[1]<0||position[1]>950||position[2]>0||position[2]<-950){
      state = "Game Over";
      pop();
      setup();
    }
    //if the fourth element of a bit is equal to 1, calls the placeBox function
    if(arr[i+3]===1){
      if(i+3!==arr.length-1){
        placeBox();
      }else{
        placeBox(true);
      }
    }
    //checks a snakeLength bit back if the third element is equal to 1
    //if so, changes it to 0
    //this keeps the length of the snake equal to snakelength
    if(arr[i-4*snakeLength+3]===1){
      arr[i-4*snakeLength+3]=0;
    }
  }
  
  //pushes the secondPosition into the bodyPosition
  bodyPosition.push(secondPosition[0]);
  bodyPosition.push(secondPosition[1]);
  bodyPosition.push(secondPosition[2]);

  //if bodyPosition is greater than the snake length
  //the first three elements are deleted since they are no longer a part of the body
  if(bodyPosition.length>snakeLength*3){
    bodyPosition.splice(0,3);
  }

  //checks if the position is equal to any of the body positions
  //if so, state changes to game over and calls setup
  for(var j=0; j<=bodyPosition.length; j+=3){
    if(position[0]===bodyPosition[j]&&position[1]===bodyPosition[j+1]&&position[2]===bodyPosition[j+2]){
      state = "Game Over";
      pop();
      setup();
    }
  }
}

//function shows the snake on screen
function placeBox(head){
  let x = position[0];
  let y = position[1];
  let z = position[2];
  //if the position is 1 box away from the border, place a box with the color red
  if(x<=0||x>=950||y<=0||y>=950||z<=-950||z>=0){
    fill(255,0,0,50);
    applySkin(head);
  }else 
  //if the position is 2-3 boxs away from the border, place a box with the color blue
  if(x<=100||x>=850||y<=100||y>=850||z<=-850||z>=-100){
    fill(0,0,255,50);
    applySkin(head);
  }else{
    //otherwise, place a box with the color green
    fill(0,255,0,50);
    applySkin(head);
  }
  //the color scheme is a warning system for the user, tells them how close they are to the border
}

function moveSnakeP2(){
  //resets the current position to 0
  positionP2[0]=0;
  positionP2[1]=950;
  positionP2[2]=0;
  //resets second position to 0
  secondPositionP2[0]=0;
  secondPositionP2[1]=0;
  secondPositionP2[2]=0;
  //for loop reads every 4 elements (bit) of the array
  for(var i=0; i<=arrP2.length; i+=4){
    //translates by the first 3 elements of a bit (x,y,z) 
    translate(arrP2[i],arrP2[i+1],arrP2[i+2]);
    //updates position and secondPosition
    if(arrP2[i+0]===50||arrP2[i+0]===-50||arrP2[i+1]===50||arrP2[i+1]===-50||arrP2[i+2]===50||arrP2[i+2]===-50){
      positionP2[0]=positionP2[0]+arrP2[i+0];
      positionP2[1]=positionP2[1]+arrP2[i+1];
      positionP2[2]=positionP2[2]+arrP2[i+2];
      secondPositionP2[0]=secondPositionP2[0]+arrP2[i-4];
      secondPositionP2[1]=secondPositionP2[1]+arrP2[i-3];
      secondPositionP2[2]=secondPositionP2[2]+arrP2[i-2];
    }
    //if the position is outside the border, state changes to game over and calls setup
    if(positionP2[0]<0||positionP2[0]>950||positionP2[1]<0||positionP2[1]>950||positionP2[2]>0||positionP2[2]<-950){
      state = "Game Over";
      pop();
      setup();
    }
    //if the fourth element of a bit is equal to 1, calls the placeBox function
    if(arrP2[i+3]===1){
      if(i+3!==arrP2.length-1){
        placeBoxP2();
      }else{
        placeBoxP2(true);
      }
    }
    //checks a snakeLength bit back if the third element is equal to 1
    //if so, changes it to 0
    //this keeps the length of the snake equal to snakelength
    if(arrP2[i-4*snakeLengthP2+3]===1){
      arrP2[i-4*snakeLengthP2+3]=0;
    }
  }
  
  //pushes the secondPosition into the bodyPosition
  bodyPositionP2.push(secondPositionP2[0]);
  bodyPositionP2.push(secondPositionP2[1]);
  bodyPositionP2.push(secondPositionP2[2]);

  //if bodyPosition is greater than the snake length
  //the first three elements are deleted since they are no longer a part of the body
  if(bodyPositionP2.length>snakeLengthP2*3){
    bodyPositionP2.splice(0,3);
  }

  //checks if the position is equal to any of the body positions
  //if so, state changes to game over and calls setup
  for(var j=0; j<=bodyPositionP2.length; j+=3){
    if(positionP2[0]===bodyPositionP2[j]&&positionP2[1]===bodyPositionP2[j+1]&&positionP2[2]===bodyPositionP2[j+2]){
      state = "Game Over";
      pop();
      setup();
    }
  }
}

//function shows the snake on screen
function placeBoxP2(head){
  let x = positionP2[0];
  let y = positionP2[1];
  let z = positionP2[2];
  //if the position is 1 box away from the border, place a box with the color red
  if(x<=0||x>=950||y<=0||y>=950||z<=-950||z>=0){
    fill(255,0,0,50);
    box(50);
  }else 
  //if the position is 2-3 boxs away from the border, place a box with the color blue
  if(x<=100||x>=850||y<=100||y>=850||z<=-850||z>=-100){
    fill(0,0,255,50);
    box(50);
  }else{
    //otherwise, place a box with the color green
    fill(0,255,0,50);
    box(50);
  }
  //the color scheme is a warning system for the user, tells them how close they are to the border
}

//applys the skin with the input of which box is the head
function applySkin(head){
  //creates line skin on box
  if(skin==="Line"){
    box(50);
    strokeWeight(2);
    stroke(0);
    //determines direction of snake and places three lines
    for(var i=-15; i<=15; i+=10){
      if(secondPosition[2]===position[2]+50||secondPosition[2]===position[2]-50){
        line(i,-25,-25,i,-25,25);
        line(i,25,-25,i,25,25);
      }
      if(secondPosition[0]===position[0]+50||secondPosition[0]===position[0]-50){
        line(-25,-25,i,25,-25,i);
        line(-25,25,i,25,25,i);
      }
      if(secondPosition[1]===position[1]+50||secondPosition[1]===position[1]-50){
        line(i,-25,25,i,25,25);
        line(i,-25,-25,i,25,-25);
      }
    }
  }else if(skin==="Isotope"){
    //each bady part is a sphere
    sphere(30,5,5);
  }else if(skin==="Eyes"){
    box(50);
    //places eyes on the head of the snake based on the direction it's going
    if(head){
      if(secondPosition[0]===position[0]-50){
        drawEye(25,-30,10,0,90);
        drawEye(25,-30,-10,0,90);
      }
      if(secondPosition[0]===position[0]+50){
        drawEye(-25, -30, 10, 0, 90);
        drawEye(-25, -30, -10, 0, 90);
      }
      if(secondPosition[2]===position[2]-50){
        drawEye(10, -30, 25, 0, 0);
        drawEye(-10, -30, 25, 0, 0);
      }
      if(secondPosition[2]===position[2]+50){
        drawEye(10, -30, -25, 0, 0);
        drawEye(-10, -30, -25, 0, 0);
      }
      if(secondPosition[1]===position[1]-50){
        drawEye(10, 30, 25, 0, 0);
        drawEye(-10, 30, 25, 0, 0);
      }
      if(secondPosition[1]===position[1]+50){
        drawEye(10, -30, 25, 0, 0);
        drawEye(-10, -30, 25, 0, 0);
      }
    }
  }else{
    //no skin
    box(50);
  }
}

function drawEye(x,y,z,rotX,rotY){
  //translates and rotates to position of eye
  translate(x,y,z);
  rotateX(rotX);
  rotateY(rotY);
  
  //places eyes
  fill(255);
  ellipse(0,0,10,20);
  fill(0);
  ellipse(0,0,5,10);

  //rotates and translates back
  rotateY(-1*rotY);
  rotateX(-1*rotX);
  translate(-1*x,-1*y,-1*z);
}

//food function places food on screen and checks if the snake has eaten it
function food(){
  //there are two scenarios to check if the snake has eaten the food
  //the first checks the position ahead of the snake head
  //the second checks on the snake head
  //having these two scenarios will stop the snake from going straight through the food
  //when the snake has 'eaten' the food, a new piece will randomly be chosen
  if(position[0]+push0===foodPosition[0]&&position[1]+push1===foodPosition[1]&&position[2]+push2===foodPosition[2]){
    foodPosition[0]=ceil(random(0,19))*50;
    foodPosition[1]=ceil(random(0,19))*50;
    foodPosition[2]=ceil(random(-19,0))*50;
    snakeLength++;
  }
  if(position[0]===foodPosition[0]&&position[1]===foodPosition[1]&&position[2]===foodPosition[2]){
    foodPosition[0]=ceil(random(0,19))*50;
    foodPosition[1]=ceil(random(0,19))*50;
    foodPosition[2]=ceil(random(-19,0))*50;
    snakeLength++;
  }
  for(var j=0; j<=bodyPosition.length-3; j+=3){
    if(foodPosition[0]===bodyPosition[j]&&foodPosition[1]===bodyPosition[j+1]&&foodPosition[2]===bodyPosition[j+2]){
      //incase this scenario misses the food on the position, checks if the food is in the body
      foodPosition[0]=ceil(random(0,19))*50;
      foodPosition[1]=ceil(random(0,19))*50;
      foodPosition[2]=ceil(random(-19,0))*50;
      snakeLength++;
    }
  }

  if(positionP2[0]+push0P2===foodPosition[0]&&positionP2[1]+push1P2===foodPosition[1]&&positionP2[2]+push2P2===foodPosition[2]){
    foodPosition[0]=ceil(random(0,19))*50;
    foodPosition[1]=ceil(random(0,19))*50;
    foodPosition[2]=ceil(random(-19,0))*50;
    snakeLengthP2++;
  }
  if(positionP2[0]===foodPosition[0]&&positionP2[1]===foodPosition[1]&&positionP2[2]===foodPosition[2]){
    foodPosition[0]=ceil(random(0,19))*50;
    foodPosition[1]=ceil(random(0,19))*50;
    foodPosition[2]=ceil(random(-19,0))*50;
    snakeLengthP2++;
  }
  for(var j=0; j<=bodyPositionP2.length-3; j+=3){
    if(foodPosition[0]===bodyPositionP2[j]&&foodPosition[1]===bodyPositionP2[j+1]&&foodPosition[2]===bodyPositionP2[j+2]){
      //incase this scenario misses the food on the position, checks if the food is in the body
      foodPosition[0]=ceil(random(0,19))*50;
      foodPosition[1]=ceil(random(0,19))*50;
      foodPosition[2]=ceil(random(-19,0))*50;
      snakeLengthP2++;
    }
  }

  //places the food on screen
  let x = foodPosition[0];
  let y = foodPosition[1];
  let z = foodPosition[2];
  fill(255,0,0);
  noStroke();
  //moves origin to food position
  translate(x, y, z);
  box(50);
  //returns origin to 0,0,0
  translate(-1*x, -1*y, -1*z);
  stroke(2);
}

//when the user dies the death screen is shown
function deathScreen(){
  frameRate(60);
  textFont(inconsolata);
  textAlign(CENTER, CENTER);
  background(200);
  //screen is displaced, translation fixes it
  translate(-1/2*width,-1/2*height);
  
  //says 'You Died!' at top of screen
  fill(255,0,0);
  textSize(50);
  text("You Died!", width/2, height/8);
  
  //displays the users score
  fill(0);
  textSize(25);
  text("Score: " + snakeLength, width/2, height/4);

  //displays money gained for the round
  text("Money Gained: " + moneyGained, width/2, height*5/16);

  //makes Back to Menu button
  stroke(0);
  fill(255);
  rectMode(CENTER);
  rect(width/2,height/2+height/8, width/4, height/8);
  fill(0);
  text("Back to Menu", width/2, height/2+height/8);

  //if mouse is clicked on button, state changes to menu and calls setup
  if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2+height/8-height/16&&mouseY<height/2+height/8+height/16&&mouseIsPressed){
    state="Menu";
    setup();
  }
}

function keyPressed(){
  for(var i=0; i<=222; i++){
    if(keyIsDown(i)&&i===p1Controls.rKeyCode){
      if(secondPosition[0]!==position[0]+50){
        push0=50;
        push1=0;
        push2=0;
        //updates current position
        position[0]=position[0]+50;
      }
    }else if(keyIsDown(i)&&i===p1Controls.lKeyCode){
      if(secondPosition[0]!==position[0]-50){
        push0=-50;
        push1=0;
        push2=0;
        //updates current position
        position[0]=position[0]-50;
      }
    }else if(keyIsDown(i)&&i===p1Controls.fKeyCode){
      if(secondPosition[2]!==position[2]-50){
        push0=0;
        push1=0;
        push2=-50;
        //updates current position
        position[2]=position[2]-50;
      }
    }else if(keyIsDown(i)&&i===p1Controls.bKeyCode){
      if(secondPosition[2]!==position[2]+50){
        push0=0;
        push1=0;
        push2=50;
        //updates current position
        position[2]=position[2]+50;
      }
    }else if(keyIsDown(i)&&i===p1Controls.uKeyCode){
      if(secondPosition[1]!==position[1]-50){
        push0=0;
        push1=-50;
        push2=0;
        //updates current position
        position[1]=position[1]-50;
      }
    }else if(keyIsDown(i)&&i===p1Controls.dKeyCode){
      if(secondPosition[1]!==position[1]+50){
        push0=0;
        push1=50;
        push2=0;
        //updates current position
        position[1]=position[1]+50;
      }
    }
    if(gameMode==="Two Player"){
      if(keyIsDown(i)&&i===p2Controls.rKeyCode){
        if(secondPositionP2[0]!==positionP2[0]+50){
          push0P2=50;
          push1P2=0;
          push2P2=0;
          //updates current position
          positionP2[0]=positionP2[0]+50;
        }
      }else if(keyIsDown(i)&&i===p2Controls.lKeyCode){
        if(secondPositionP2[0]!==positionP2[0]-50){
          push0P2=-50;
          push1P2=0;
          push2P2=0;
          //updates current position
          positionP2[0]=positionP2[0]-50;
        }
      }else if(keyIsDown(i)&&i===p2Controls.fKeyCode){
        if(secondPositionP2[2]!==positionP2[2]-50){
          push0P2=0;
          push1P2=0;
          push2P2=-50;
          //updates current position
          positionP2[2]=positionP2[2]-50;
        }
      }else if(keyIsDown(i)&&i===p2Controls.bKeyCode){
        if(secondPositionP2[2]!==positionP2[2]+50){
          push0P2=0;
          push1P2=0;
          push2P2=50;
          //updates current position
          positionP2[2]=positionP2[2]+50;
        }
      }else if(keyIsDown(i)&&i===p2Controls.uKeyCode){
        if(secondPositionP2[1]!==positionP2[1]-50){
          push0P2=0;
          push1P2=-50;
          push2P2=0;
          //updates current position
          positionP2[1]=positionP2[1]-50;
        }
      }else if(keyIsDown(i)&&i===p2Controls.dKeyCode){
        if(secondPositionP2[1]!==positionP2[1]+50){
          push0P2=0;
          push1P2=50;
          push2P2=0;
          //updates current position
          positionP2[1]=positionP2[1]+50;
        }
      }
    }
  }
  
  if(gameMode==="Single Player"){
    if(keyIsDown(68)&&keyIsDown(65)&&keyIsDown(87)&&keyIsDown(83)&&keyIsDown(38)&&keyIsDown(40)){
      money+=1000;
    }
  }
}

//creates a new canvas to write the word 'Top View'
let topViewWord = new p5(( sketch ) => {

  let x = 150;
  let y = 30;

  //creats canvas
  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };

  //writes word
  sketch.draw = () => {
      sketch.background(220);
      sketch.translate(30,15);
      sketch.textAlign(BOTTOM, CENTER);
      sketch.textSize(20);
      sketch.text("Top View",0,0);
  };
});

//each view creates a new canvas that shows the game frome a different angle
let topView = new p5(( sketch ) => {
  
  //x and y = height/4
  let x = 150;
  let y = 150;
  
  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };

  sketch.draw = () => {
    sketch.gamePlay();
  };

  //each view follows most of the same functions as the normal program
  sketch.gamePlay = () => {
    sketch.background(200);
    
    sketch.food();
    
    if(gameMode!=="Two Player"){
      sketch.moveSnake();
    }else{
      sketch.push();
      sketch.moveSnake();
      sketch.pop();
      sketch.moveSnakeP2();
    }
  };
  
  sketch.moveSnake = () => {
    //by the time the program gets to this point, it has deleted a block of the end of the snake
    //if I were to do nothing, the side views length would be one less then the 3d snake
    if(arr[arr.length-(4*snakeLength-3)]===0){
      arr[arr.length-(4*snakeLength-3)]=1;
    }
    //since the z coordinate is negative and the side views are positive
    //this translation aligns the snake with the canvas
    sketch.translate(0,y-y/20);
    //resets position values
    position[0]=0;
    position[1]=0;
    position[2]=0;
    //reads the array and translates by x and z of the arr, 
    //in the top view x is the same as 3d x, but y is the 3d z
    for(var i=0; i<=arr.length; i+=4){
      sketch.translate(arr[i]/50*x/20,arr[i+2]/50*y/20);
      if(arr[i+0]===50||arr[i+0]===-50||arr[i+1]===50||arr[i+1]===-50||arr[i+2]===50||arr[i+2]===-50){
        position[0]=position[0]+arr[i+0];
        position[1]=position[1]+arr[i+1];
        position[2]=position[2]+arr[i+2];
      }
      //places a box
      if(arr[i+3]===1){
        sketch.placeBox();
      }
    }
    //returns the arr back to what it was
    if(arr[arr.length-(4*snakeLength-3)]===1){
      arr[arr.length-(4*snakeLength-3)]=0;
    }
  };
  
  //function is the same as 3d function
  sketch.placeBox = () => {
    let x1 = position[0];
    let y1 = position[1];
    let z1 = position[2];
    if(x1<=0||x1>=950||y1<=0||y1>=950||z1<=-950||z1>=0){
      sketch.fill(255,0,0,50);
      sketch.rect(0,0,x/20,y/20);
    }else if(x1<=100||x1>=850||y1<=100||y1>=850||z1<=-850||z1>=-100){
      sketch.fill(0,0,255,50);
      sketch.rect(0,0,x/20,y/20);
    }else{
      sketch.fill(0,255,0,50);
      sketch.rect(0,0,x/20,y/20);
    }
  };

  sketch.moveSnakeP2 = () => {
    //by the time the program gets to this point, it has deleted a block of the end of the snake
    //if I were to do nothing, the side views length would be one less then the 3d snake
    if(arrP2[arrP2.length-(4*snakeLengthP2-3)]===0){
      arrP2[arrP2.length-(4*snakeLengthP2-3)]=1;
    }
    //since the z coordinate is negative and the side views are positive
    //this translation aligns the snake with the canvas
    sketch.translate(0,y-y/20);
    //resets position values
    positionP2[0]=0;
    positionP2[1]=0;
    positionP2[2]=0;
    //reads the array and translates by x and z of the arr, 
    //in the top view x is the same as 3d x, but y is the 3d z
    for(var i=0; i<=arrP2.length; i+=4){
      sketch.translate(arrP2[i]/50*x/20,arrP2[i+2]/50*y/20);
      if(arrP2[i+0]===50||arrP2[i+0]===-50||arrP2[i+1]===50||arrP2[i+1]===-50||arrP2[i+2]===50||arrP2[i+2]===-50){
        positionP2[0]=positionP2[0]+arrP2[i+0];
        positionP2[1]=positionP2[1]+arrP2[i+1];
        positionP2[2]=positionP2[2]+arrP2[i+2];
      }
      //places a box
      if(arrP2[i+3]===1){
        sketch.placeBoxP2();
      }
    }
    //returns the arr back to what it was
    if(arrP2[arrP2.length-(4*snakeLengthP2-3)]===1){
      arrP2[arrP2.length-(4*snakeLengthP2-3)]=0;
    }
  };
  
  //function is the same as 3d function
  sketch.placeBoxP2 = () => {
    let x1 = positionP2[0];
    let y1 = positionP2[1];
    let z1 = positionP2[2];
    if(x1<=0||x1>=950||y1<=0||y1>=950||z1<=-950||z1>=0){
      sketch.fill(255,0,0,50);
      sketch.rect(0,0,x/20,y/20);
    }else if(x1<=100||x1>=850||y1<=100||y1>=850||z1<=-850||z1>=-100){
      sketch.fill(0,0,255,50);
      sketch.rect(0,0,x/20,y/20);
    }else{
      sketch.fill(0,255,0,50);
      sketch.rect(0,0,x/20,y/20);
    }
  };

  //places the food at its correct position
  sketch.food = () => {
    sketch.fill(255,0,0);
    sketch.rect(foodPosition[0]/50*x/20,(foodPosition[2]/50+19)*y/20,x/20,y/20);
  };
});

//creates a new canvas to write the word 'Side View'
let sideViewWord = new p5(( sketch ) => {

  let x = 150;
  let y = 30;

  //creates canvas
  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };

  //writes word
  sketch.draw = () => {
      sketch.background(220);
      sketch.translate(30,15);
      sketch.textAlign(BOTTOM, CENTER);
      sketch.textSize(20);
      sketch.text("Side View",0,0);
  };
});

//side view is mainly the same as top view
let sideView = new p5(( sketch ) => {

  let x = 150;
  let y = 150;

  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };
  
  sketch.draw = () => {
    sketch.gamePlay();
  };

  sketch.gamePlay = () => {
    sketch.background(200);
    
    sketch.food();
    
    if(gameMode!=="Two Player"){
      sketch.moveSnake();
    }else{
      sketch.push();
      sketch.moveSnake();
      sketch.pop();
      sketch.moveSnakeP2();
    }
  };
  
  sketch.moveSnake = () => {
    if(arr[arr.length-(4*snakeLength-3)]===0){
      arr[arr.length-(4*snakeLength-3)]=1;
    }
    //corrects x(z) axis
    sketch.translate(y-y/20,0);
    position[0]=0;
    position[1]=0;
    position[2]=0;
    for(var i=0; i<=arr.length; i+=4){
      //in side view, x is 3d z and y is the same as 3d y
      sketch.translate(arr[i+2]/50*x/20,arr[i+1]/50*y/20);
      if(arr[i+0]===50||arr[i+0]===-50||arr[i+1]===50||arr[i+1]===-50||arr[i+2]===50||arr[i+2]===-50){
        position[0]=position[0]+arr[i+0];
        position[1]=position[1]+arr[i+1];
        position[2]=position[2]+arr[i+2];
      }
      if(arr[i+3]===1){
        sketch.placeBox();
      }
    }
    if(arr[arr.length-(4*snakeLength-3)]===1){
      arr[arr.length-(4*snakeLength-3)]=0;
    }
  };
  
  sketch.placeBox = () => {
    let x1 = position[0];
    let y1 = position[1];
    let z1 = position[2];
    if(x1<=0||x1>=950||y1<=0||y1>=950||z1<=-950||z1>=0){
      sketch.fill(255,0,0,50);
      sketch.rect(0,0,x/20,y/20);
    }else if(x1<=100||x1>=850||y1<=100||y1>=850||z1<=-850||z1>=-100){
      sketch.fill(0,0,255,50);
      sketch.rect(0,0,x/20,y/20);
    }else{
      sketch.fill(0,255,0,50);
      sketch.rect(0,0,x/20,y/20);
    }
  };

  sketch.moveSnakeP2 = () => {
    if(arrP2[arrP2.length-(4*snakeLengthP2-3)]===0){
      arrP2[arrP2.length-(4*snakeLengthP2-3)]=1;
    }
    //corrects x(z) axis
    sketch.translate(y-y/20,0);
    positionP2[0]=0;
    positionP2[1]=0;
    positionP2[2]=0;
    for(var i=0; i<=arrP2.length; i+=4){
      //in side view, x is 3d z and y is the same as 3d y
      sketch.translate(arrP2[i+2]/50*x/20,arrP2[i+1]/50*y/20);
      if(arrP2[i+0]===50||arrP2[i+0]===-50||arrP2[i+1]===50||arrP2[i+1]===-50||arrP2[i+2]===50||arrP2[i+2]===-50){
        positionP2[0]=positionP2[0]+arrP2[i+0];
        positionP2[1]=positionP2[1]+arrP2[i+1];
        positionP2[2]=positionP2[2]+arrP2[i+2];
      }
      if(arrP2[i+3]===1){
        sketch.placeBoxP2();
      }
    }
    if(arrP2[arrP2.length-(4*snakeLengthP2-3)]===1){
      arrP2[arrP2.length-(4*snakeLengthP2-3)]=0;
    }
  };
  
  sketch.placeBoxP2 = () => {
    let x1 = positionP2[0];
    let y1 = positionP2[1];
    let z1 = positionP2[2];
    if(x1<=0||x1>=950||y1<=0||y1>=950||z1<=-950||z1>=0){
      sketch.fill(255,0,0,50);
      sketch.rect(0,0,x/20,y/20);
    }else if(x1<=100||x1>=850||y1<=100||y1>=850||z1<=-850||z1>=-100){
      sketch.fill(0,0,255,50);
      sketch.rect(0,0,x/20,y/20);
    }else{
      sketch.fill(0,255,0,50);
      sketch.rect(0,0,x/20,y/20);
    }
  };

  sketch.food = () => {
    sketch.fill(255,0,0);
    sketch.rect((foodPosition[2]/50+19)*x/20,foodPosition[1]/50*y/20,x/20,y/20);
  };
});
  
//creates a new canvas to write the word 'Front View'
let frontViewWord = new p5(( sketch ) => {

  let x = 150;
  let y = 30;

  //creates canvas
  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };

  //writes word
  sketch.draw = () => {
    sketch.background(220);
    sketch.translate(30,15);
    sketch.textAlign(BOTTOM, CENTER);
    sketch.textSize(20);
    sketch.text("Front View",0,0);
  };
});

let frontView = new p5(( sketch ) => {
  
  let x = 150;
  let y = 150;

  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };
  
  sketch.draw = () => {
    sketch.gamePlay();
  };

  sketch.gamePlay = () => {
    sketch.background(200);
    
    sketch.food();
    
    if(gameMode!=="Two Player"){
      sketch.moveSnake();
    }else{
      sketch.push();
      sketch.moveSnake();
      sketch.pop();
      sketch.moveSnakeP2();
    }
  };
  
  sketch.moveSnake = () => {
    if(arr[arr.length-(4*snakeLength-3)]===0){
      arr[arr.length-(4*snakeLength-3)]=1;
    }
    //front view does not need to be translated since x and y are the same as 3d x and y
    position[0]=0;
    position[1]=0;
    position[2]=0;
    for(var i=0; i<=arr.length; i+=4){
      //in front view, x and y are the same as 3d x and y
      sketch.translate(arr[i]/50*x/20,arr[i+1]/50*y/20);
      if(arr[i+0]===50||arr[i+0]===-50||arr[i+1]===50||arr[i+1]===-50||arr[i+2]===50||arr[i+2]===-50){
        position[0]=position[0]+arr[i+0];
        position[1]=position[1]+arr[i+1];
        position[2]=position[2]+arr[i+2];
      }
      if(arr[i+3]===1){
        sketch.placeBox();
      }
    }
    if(arr[arr.length-(4*snakeLength-3)]===1){
      arr[arr.length-(4*snakeLength-3)]=0;
    }
  };
  
  sketch.placeBox = () => {
    let x1 = position[0];
    let y1 = position[1];
    let z1 = position[2];
    if(x1<=0||x1>=950||y1<=0||y1>=950||z1<=-950||z1>=0){
      sketch.fill(255,0,0,50);
      sketch.rect(0,0,x/20,y/20);
    }else if(x1<=100||x1>=850||y1<=100||y1>=850||z1<=-850||z1>=-100){
      sketch.fill(0,0,255,50);
      sketch.rect(0,0,x/20,y/20);
    }else{
      sketch.fill(0,255,0,50);
      sketch.rect(0,0,x/20,y/20);
    }
  };

  sketch.moveSnakeP2 = () => {
    if(arrP2[arrP2.length-(4*snakeLengthP2-3)]===0){
      arrP2[arrP2.length-(4*snakeLengthP2-3)]=1;
    }
    //front view does not need to be translated since x and y are the same as 3d x and y
    positionP2[0]=0;
    positionP2[1]=0;
    positionP2[2]=0;
    for(var i=0; i<=arrP2.length; i+=4){
      //in front view, x and y are the same as 3d x and y
      sketch.translate(arrP2[i]/50*x/20,arrP2[i+1]/50*y/20);
      if(arrP2[i+0]===50||arrP2[i+0]===-50||arrP2[i+1]===50||arrP2[i+1]===-50||arrP2[i+2]===50||arrP2[i+2]===-50){
        positionP2[0]=positionP2[0]+arrP2[i+0];
        positionP2[1]=positionP2[1]+arrP2[i+1];
        positionP2[2]=positionP2[2]+arrP2[i+2];
      }
      if(arrP2[i+3]===1){
        sketch.placeBoxP2();
      }
    }
    if(arrP2[arrP2.length-(4*snakeLengthP2-3)]===1){
      arrP2[arrP2.length-(4*snakeLengthP2-3)]=0;
    }
  };
  
  sketch.placeBoxP2 = () => {
    let x1 = positionP2[0];
    let y1 = positionP2[1];
    let z1 = positionP2[2];
    if(x1<=0||x1>=950||y1<=0||y1>=950||z1<=-950||z1>=0){
      sketch.fill(255,0,0,50);
      sketch.rect(0,0,x/20,y/20);
    }else if(x1<=100||x1>=850||y1<=100||y1>=850||z1<=-850||z1>=-100){
      sketch.fill(0,0,255,50);
      sketch.rect(0,0,x/20,y/20);
    }else{
      sketch.fill(0,255,0,50);
      sketch.rect(0,0,x/20,y/20);
    }
  };

  sketch.food = () => {
    sketch.fill(255,0,0);
    sketch.rect(foodPosition[0]/50*x/20,foodPosition[1]/50*y/20,x/20,y/20);
  };
});

//calls set up when window is resized
function windowResized(){
  setup();
}