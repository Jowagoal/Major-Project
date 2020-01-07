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
let gameType;

//these variables are the memory of the program
let arr = [];
let position = [0,0,0];
let secondPosition = [0,0,0];
let foodPosition = [0,0,0];
let bodyPosition = [];
let points;
let p1Died;

let arrP2 = [];
let positionP2 = [0,950,0];
let secondPositionP2 = [0,0,0];
let foodPositionP2 = [0,0,0];
let bodyPositionP2 = [];
let pointsP2;
let p2Died;

let playerDeath;
let highScores;
let highScores5;
let highScores6;
let highScores7;
let highScores8;
let highScores9;
let highScores10;
let highScores11;
let highScores12;
let highScores13;
let highScores14;
let highScores15;

let firstIteration = true;
let firstIterationDeath = true;
let gameTimeStarted;
let time;

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
let topHatSkin;
let trainSkin;
let theSmoke = [];

//variables for 2D array
let cols;
let rows;

let bare;
let snakeEyes;
let lines;
let iso;
let topHat;
let train;

let orderOfPositions = [];
let positionPlaceCounter = 0;
let shadowFoodPosition = [];

function preload(){
  //preloads text font
  inconsolata = loadFont('assets/Inconsolata.otf');
  //preloads pictures for store
  bare = loadImage('assets/no skin.PNG')
  lines = loadImage('assets/lines.PNG');
  iso = loadImage('assets/iso.PNG');
  snakeEyes = loadImage('assets/snake eyes.PNG');
  topHat = loadImage('assets/top hat.PNG');
  train = loadImage('assets/train.PNG');
  
  noSkin = {
    name: 'No Skin',
    cost: 'free',
    bought: 'yes',
    active: 'yes',
    picture: bare,
  };
  
  lineSkin = {
    name: 'Line',
    cost: 50,
    bought: 'no',
    active: 'no',
    picture: lines,
  };

  isotopeSkin = {
    name: 'Isotope',
    cost: 150,
    bought: 'no',
    active: 'no',
    picture: iso,
  };

  eyesSkin = {
    name: 'Eyes',
    cost: 250,
    bought: 'no',
    active: 'no',
    picture: snakeEyes,
  };
  
  topHatSkin = {
    name: 'Top Hat',
    cost: 500,
    bought: 'no',
    active: 'no',
    picture: topHat,
  };

  trainSkin = {
    name: 'Train',
    cost: 1000,
    bought: 'no',
    active: 'no',
    picture: train,
  };
  
  /*
    1  2  5  10 17 26
    3  4  6  11 18 27
    7  8  9  12 19 28
    13 14 15 16 20 29
    21 22 23 24 25 30
    31 32 33 34 35 36
  */

  skins.push(noSkin);
  skins.push(lineSkin);
  skins.push(eyesSkin);
  skins.push(topHatSkin);
  skins.push(isotopeSkin);
  skins.push(trainSkin);

  if(getItem("High Scores 5")===null){
    highScores5 = [];
  }else{
    highScores5 = getItem("High Scores 5")
  }
  if(getItem("High Scores 6")===null){
    highScores6 = [];
  }else{
    highScores6 = getItem("High Scores 6")
  }
  if(getItem("High Scores 7")===null){
    highScores7 = [];
  }else{
    highScores7 = getItem("High Scores 7")
  }
  if(getItem("High Scores 8")===null){
    highScores8 = [];
  }else{
    highScores8 = getItem("High Scores 8")
  }
  if(getItem("High Scores 9")===null){
    highScores9 = [];
  }else{
    highScores9 = getItem("High Scores 9")
  }
  if(getItem("High Scores 10")===null){
    highScores10 = [];
  }else{
    highScores10 = getItem("High Scores 10")
  }
  if(getItem("High Scores 11")===null){
    highScores11 = [];
  }else{
    highScores11 = getItem("High Scores 11")
  }
  if(getItem("High Scores 12")===null){
    highScores12 = [];
  }else{
    highScores12 = getItem("High Scores 12")
  }
  if(getItem("High Scores 13")===null){
    highScores13 = [];
  }else{
    highScores13 = getItem("High Scores 13")
  }
  if(getItem("High Scores 14")===null){
    highScores14 = [];
  }else{
    highScores14 = getItem("High Scores 14")
  }
  if(getItem("High Scores 15")===null){
    highScores15 = [];
  }else{
    highScores15 = getItem("High Scores 15")
  }
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
    document.getElementById("defaultCanvas6").style.visibility = "hidden";
    document.getElementById("defaultCanvas7").style.visibility = "hidden";
    document.getElementById("defaultCanvas8").style.visibility = "hidden";
    
  }
  
  if(state==="Menu"){
    createCanvas(windowWidth, windowHeight);
  }else if(state==="Select Game Type"){
    createCanvas(windowWidth, windowHeight);
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
    
    /*
    foodPosition[0]=10*50;
    foodPosition[1]=1*50;
    foodPosition[2]=-19*50;
    */
   foodPosition[0]=ceil(random(-0.9,19))*50;
   foodPosition[1]=ceil(random(-0.9,19))*50;
   foodPosition[2]=ceil(random(-19.9,0))*50;
   
   if(foodPosition[0]===0&&foodPosition[2]===-950){
      shadowFoodPosition[0] = foodPosition[0]-50;
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
   }else if(foodPosition[2]===0){
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2]-50;
    }else if(foodPosition[2]===-950){
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2]+50;
    }else if(foodPosition[0]===0){
      shadowFoodPosition[0] = foodPosition[0]+50;
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }else{
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }
    

    //shows all additional canvases
    document.getElementById("defaultCanvas0").style.visibility = "visible";
    document.getElementById("defaultCanvas1").style.visibility = "visible";
    document.getElementById("defaultCanvas2").style.visibility = "visible";
    document.getElementById("defaultCanvas3").style.visibility = "visible";
    document.getElementById("defaultCanvas4").style.visibility = "visible";
    document.getElementById("defaultCanvas5").style.visibility = "visible";
    document.getElementById("defaultCanvas6").style.visibility = "visible";
    if(gameType==="Points"){
      document.getElementById("defaultCanvas7").style.visibility = "visible";
      document.getElementById("defaultCanvas8").style.visibility = "visible";
    }
    if(gameMode==="AI"){
      labelPositions();
    }
  }else if(state==="Game Over"){
    createCanvas(windowWidth, windowHeight);

    if(gameMode!=="AI"){
      //calculates money gained for round
      moneyGained = (snakeLength-3)*difficulty;
      //adds money gained to total money(it adds twice for some reason)
      money+=moneyGained/2;
    }
    
    //hides all additional canvases
    document.getElementById("defaultCanvas0").style.visibility = "hidden";
    document.getElementById("defaultCanvas1").style.visibility = "hidden";
    document.getElementById("defaultCanvas2").style.visibility = "hidden";
    document.getElementById("defaultCanvas3").style.visibility = "hidden";
    document.getElementById("defaultCanvas4").style.visibility = "hidden";
    document.getElementById("defaultCanvas5").style.visibility = "hidden";
    document.getElementById("defaultCanvas6").style.visibility = "hidden";
    document.getElementById("defaultCanvas7").style.visibility = "hidden";
    document.getElementById("defaultCanvas8").style.visibility = "hidden";
    
  }else if(state==="LeaderBoard"){
    createCanvas(windowWidth, windowHeight);
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
  if(state==="Select Game Type"){
    selectGameType();
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
  if(state==="LeaderBoard"){
    leaderBoard();
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

  text("AI",width/3*2, height/2+height*3/8);
  
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
    gameMode="AI";
    state="Menu";
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
  
  //buttons
  stroke(0);
  strokeWeight(1);
  fill(200);
  rect(width/2, height/2, width/4, height/8);
  rect(width/2, height/2+height*1/4, width/4, height/8);

  //displays words
  noStroke();
  textSize(25);
  fill(0);
  text("Start Game",width/2, height/2);
  text("Main Menu",width/2, height/2+height*1/4);

  if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2-height/16&&mouseY<height/2+height/16&&mouseIsPressed){
    //when mouse clicks options button, sets state to play and calls setup again to start the game
    if(gameMode==="Two Player"){
      state="Select Game Type"
      setup();
    }else{
      state="Play";
      setup();
    }
  }else if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2+height*1/4-height/16&&mouseY<height/2+height*1/4+height/16&&mouseIsPressed){
    //when mouse clicks options button, sets state to play and calls setup again to start the game
    state="Main Menu";
    setup();
  }

  //settings
  if(mouseX>width*1/16-25&&mouseX<width*1/16+25&&mouseY>height*1/8-25&&mouseY<height*1/8+25){
    settingIcon(true);
    if(mouseIsPressed){
      //when mouse clicks options icon, sets state to options and calls setup again to open options screen
      state="Options";
      setup();
    }
  }else{
    settingIcon(false);
  }

  //store
  if(gameMode!=="Two Player"){
    if(mouseX>width*15/16-25&&mouseX<width*15/16+25&&mouseY>height*1/8-25&&mouseY<height*1/8+25){
      StoreIcon(true);
      if(mouseIsPressed){
        //when mouse clicks store icon, sets state to store and calls setup again to open store screen
        state="Store";
        setup();
      }
    }else{
      StoreIcon(false);
    }
  }
}

//draws the setting icon
function settingIcon(on){
  push();
  translate(width*1/16, height*1/8);
  noStroke();
  if(!on){
    fill(50);
  }else{
    fill(0,0,150);
  }
  for(var i=0; i<12; i++){
    ellipse(0, 0, 50, 10);
    rotate(10);
  }
  fill(100);
  circle(0, 0, 34);
  pop();
}

//draws the store icon
function StoreIcon(on){
  push();
  translate(width*15/16, height*1/8);
  if(!on){
    fill(50);
    stroke(50);
  }else{
    fill(0,0,150);
    stroke(0,0,150);
  }
  quad(-15,-15,25,-10,20,15,-10,15);
  strokeWeight(3);
  line(-15,-15,-18,-22);
  line(-18,-22,-25,-25);
  circle(-2,20,8,8);
  circle(12,20,8,8);
  pop();
}

//after user resets, all values that changed need to be reset
function resetAllValues(){
  arr = [0,0,0,0];
  position = [0,0,0];
  secondPosition = [0,0,0];
  foodPosition = [0,0,0];
  bodyPosition = [];
  points = 0;
  
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
  pointsP2 = 0;
  
  push0P2 = 50;
  push1P2 = 0;
  push2P2 = 0;
  push3P2 = 1;
  snakeLengthP2 = 3;

  firstIteration = true;
  firstIterationDeath = true;
  gameType;

  theSmoke = [];

  orderOfPositions = [];
  positionPlaceCounter = 0;
}

function selectGameType(){

  if(restarted===true){
    translate(-1/2*width,-1/2*height);
  }

  background(200);
  fill(50,255,50);
  textSize(75);
  text("Select Game Mode", width/2, height/10);

  noStroke();
  if(mouseX>width/2-width/4-width/8&&mouseX<width/2-width/4+width/8&&mouseY>height/2-height/8-height/16&&mouseY<height/2-height/8+height/16){
    fill(255,255,0);
    rect(width/2-width/4, height/2-height/8, width/4, height/8);
    fill(200,0,200);
    rect(width/2+width/4, height/2-height/8, width/4, height/8);
    if(mouseIsPressed){
      gameType = "Survival";
      state = "Play";
      setup();
    }
  }else if(mouseX>width/2+width/4-width/8&&mouseX<width/2+width/4+width/8&&mouseY>height/2-height/8-height/16&&mouseY<height/2-height/8+height/16){
    fill(255,255,0);
    rect(width/2+width/4, height/2-height/8, width/4, height/8);
    fill(200,0,200);
    rect(width/2-width/4, height/2-height/8, width/4, height/8);
    if(mouseIsPressed){
      gameType = "Points"
      state = "Play";
      setup();
    }
  }else{
    fill(200,0,200);
    rect(width/2-width/4, height/2-height/8, width/4, height/8);
    rect(width/2+width/4, height/2-height/8, width/4, height/8);
  }
  
  textSize(40);
  fill(25);
  text("Survival", width/2-width/4, height/2-height/8);
  text("Points", width/2+width/4, height/2-height/8);

  textSize(30);
  text("Play aginst your", width/2-width/4, height*16/32);
  text("opponent until", width/2-width/4, height*18/32);
  text("one of you perishes.", width/2-width/4, height*20/32);

  textSize(30);
  text("Play aginst your opponent", width/2+width/4, height*16/32);
  text("to see who can eat the", width/2+width/4, height*18/32);
  text("most food in a limited", width/2+width/4, height*20/32);
  text("amount of time.", width/2+width/4, height*22/32);

  text("Players lose 3 points if", width/2+width/4, height*26/32);
  text("they die, then respawn.", width/2+width/4, height*28/32);
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
  
  if(gameMode!=="AI"){
    difficultyBar();
  }
  
  //red back rectangle, changes the state back to menu
  stroke(0);
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

function difficultyBar(){
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
}

function controls(){
  if(gameMode==="Single Player"){
    changePlayer1Bindings();
  }else if(gameMode==="Two Player"){
    changePlayer1Bindings();
    changePlayer2Bindings();
    translate(-250,0);
  }else{
    text("Controls:", 100, 100);
    translate(0, 25);
    text("UpArrow = Increase Simulation Speed", 100, 100);
    translate(0, 25);
    text("DownArrow = Decrease Simulation Speed", 100, 100);
    translate(0, 125);
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
        //if a part of the array is not filled, places a sqaure same color as background over top
        if(store[y/2][x/2]!==undefined){
          rect(x*cellSize+cellSize, y*cellSize+cellSize, cellSize*1.5, cellSize*1.5);
          enterItem(x/2, y/2, x*cellSize+cellSize, y*cellSize+cellSize, cellSize*1.5);
        }
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
    image(store[row][col].picture, centerX-wh*1/3+1, centerY+wh*-1/2+1, wh*6/8, wh*5/8-4);
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
  
  p1Died=false;
  p2Died=false;
  
  if(firstIteration&&gameType==="Points"){
    gameTimeStarted = frameCount;
    time = 101;
  }
  
  
  orbitControl();
  strokeWeight(2);
  stroke(0);
  
  for (let i = theSmoke.length-1; i>=0; i--) {
    theSmoke[i].update();
    if (theSmoke[i].isDone()) {
      theSmoke.splice(i, 1);
    }
    else {
      theSmoke[i].display();
    }
  }
  
  //food function makes the food
  food();
  if(gameMode==="AI"){
    //memory system has been entirely restructured, 
    //the old array filled up too fast
    if(firstIteration){
      position[0]+=push0;
      position[1]+=push1;
      position[2]+=push2;
    }else{
      bodyPosition.push(position[0]);
      bodyPosition.push(position[1]);
      bodyPosition.push(position[2]);
      secondPosition[0]=position[0];
      secondPosition[1]=position[1];
      secondPosition[2]=position[2];
      if(bodyPosition.length>(snakeLength-1)*3){
        bodyPosition.splice(0,3);
      }
      position[0]+=push0;
      position[1]+=push1;
      position[2]+=push2;
    }
    moveSnake();
    
    let arrayOfNeighborPositions = neighboringPositions();
    calculateMove(arrayOfNeighborPositions);

  }else{
    if(gameMode!=="Two Player"){
      //memory system has been entirely restructured, 
      //the old array filled up too fast
      if(firstIteration){
        position[0]+=push0;
        position[1]+=push1;
        position[2]+=push2;
      }else{
        bodyPosition.push(position[0]);
        bodyPosition.push(position[1]);
        bodyPosition.push(position[2]);
        secondPosition[0]=position[0];
        secondPosition[1]=position[1];
        secondPosition[2]=position[2];
        if(bodyPosition.length>(snakeLength-1)*3){
          bodyPosition.splice(0,3);
        }
        position[0]+=push0;
        position[1]+=push1;
        position[2]+=push2;
      }
      //moves the snake
      moveSnake();
    }else{
      if(firstIteration){
        position[0]+=push0;
        position[1]+=push1;
        position[2]+=push2;
      }else{
        bodyPosition.push(position[0]);
        bodyPosition.push(position[1]);
        bodyPosition.push(position[2]);
        secondPosition[0]=position[0];
        secondPosition[1]=position[1];
        secondPosition[2]=position[2];
        if(bodyPosition.length>(snakeLength-1)*3){
          bodyPosition.splice(0,3);
        }
        position[0]+=push0;
        position[1]+=push1;
        position[2]+=push2;
      }
      moveSnake();
      if(firstIteration){
        positionP2[0]+=push0P2
        positionP2[1]+=push1P2;
        positionP2[2]+=push2P2;
      }else{
        bodyPositionP2.push(positionP2[0]);
        bodyPositionP2.push(positionP2[1]);
        bodyPositionP2.push(positionP2[2]);
        secondPositionP2[0]=positionP2[0];
        secondPositionP2[1]=positionP2[1];
        secondPositionP2[2]=positionP2[2];
        if(bodyPositionP2.length>(snakeLength-1)*3){
          bodyPositionP2.splice(0,3);
        }
        positionP2[0]+=push0P2;
        positionP2[1]+=push1P2;
        positionP2[2]+=push2P2;
      }
      moveSnakeP2();
      if(gameType==="Points"){
        timer();
      }
    }
  }
  firstIteration=false;
}

function timer(){
  if((frameCount-gameTimeStarted)%difficulty===0){
    time--;
  }
  if(time<=0){
    state = "Game Over";
    pop();
    setup();
  }
}
    
function moveSnake(){
  //if the position is outside the border, state changes to game over and calls setup
  if(position[0]<0||position[0]>950||position[1]<0||position[1]>950||position[2]>0||position[2]<-950){
    playerHasDied(1);
  }
  //checks if the position is equal to any of the body positions
  //if so, state changes to game over and calls setup
  for(var j=0; j<bodyPosition.length; j+=3){
    if((position[0]===bodyPosition[j]&&position[1]===bodyPosition[j+1]&&position[2]===bodyPosition[j+2])||(position[0]+push[0]===bodyPositionP2[j]&&position[1]+push[1]===bodyPositionP2[j+1]&&position[2]+push[2]===bodyPositionP2[j+2])&&p1Died===false){
      playerHasDied(1);
    }
  }
  if(position[0]===positionP2[0]&&position[1]===positionP2[1]&&position[2]===positionP2[2]&&gameMode==="Two Player"){
    playerHasDied(1);
    playerHasDied(2); 
  }
  push();
  translate(position[0], position[1], position[2]);
  placeBox(position[0],position[1],position[2],true);
  pop();
  for(var i=bodyPosition.length-3; i>=0; i-=3){
    push();
    translate(bodyPosition[i+0], bodyPosition[i+1], bodyPosition[i+2]);
    placeBox(bodyPosition[i+0],bodyPosition[i+1],bodyPosition[i+2]);
    pop();
  }
}

//function shows the snake on screen
function placeBox(x1,y1,z1,head){
  let x = x1;
  let y = y1;
  let z = z1;
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
  //if the positionP2 is outside the border, state changes to game over and calls setup
  if(positionP2[0]<0||positionP2[0]>950||positionP2[1]<0||positionP2[1]>950||positionP2[2]>0||positionP2[2]<-950){
    playerHasDied(2);
  }
  //checks if the positionP2 is equal to any of the body positions
  //if so, state changes to game over and calls setup
  for(var j=0; j<bodyPosition.length; j+=3){
    if((positionP2[0]===bodyPosition[j]&&positionP2[1]===bodyPosition[j+1]&&positionP2[2]===bodyPosition[j+2])||(positionP2[0]+push[0]===bodyPositionP2[j]&&positionP2[1]+push[1]===bodyPositionP2[j+1]&&positionP2[2]+push[2]===bodyPositionP2[j+2])&&p1Died===false){
      playerHasDied(2);
    }
  }
  if(position[0]===positionP2[0]&&position[1]===positionP2[1]&&position[2]===positionP2[2]&&gameMode==="Two Player"){
    playerHasDied(1);
    playerHasDied(2); 
  }
  push();
  translate(positionP2[0], positionP2[1], positionP2[2]);
  placeBoxP2(positionP2[0],positionP2[1],positionP2[2],true);
  pop();
  for(var i=bodyPositionP2.length-3; i>=0; i-=3){
    push();
    translate(bodyPositionP2[i+0], bodyPositionP2[i+1], bodyPositionP2[i+2]);
    placeBoxP2(bodyPositionP2[i+0],bodyPositionP2[i+1],bodyPositionP2[i+2]);
    pop();
  }
}

//function shows the snake on screen
function placeBoxP2(x1,y1,z1,head){
  let x = x1;
  let y = y1;
  let z = z1;
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
  if(gameMode!=="Two Player"){
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
    }else if(skin==="Top Hat"){
      box(50);
      if(head){
        fill(0);
        if(secondPosition[0]===position[0]-50||secondPosition[0]===position[0]+50||secondPosition[2]===position[2]-50||secondPosition[2]===position[2]+50){
          push();
          translate(0,-25,0);
          rotateX(1.4);
          circle(0,0,40,40);
          pop();
          push();
          translate(0,-35,0);
          cylinder(10,20,30,30);
          pop();
          push();
          translate(0,-27.5,0);
          fill(255,0,0);
          cylinder(12,5,30,30,false,false);
          pop();
        }else{
          push();
          translate(0,0,25);
          circle(0,0,40,40);
          pop();
          push();
          translate(0,0,35);
          rotateX(1.4);
          cylinder(10,20,30,30);
          pop();
          push();
          translate(0,0,27.5);
          rotateX(1.4);
          fill(255,0,0);
          cylinder(12,5,30,30,false,false);
          pop();
        }
      }
    }else if(skin==="Train"){
      box(50);
      if(head){
        if(secondPosition[0]===position[0]-50||secondPosition[0]===position[0]+50||secondPosition[2]===position[2]-50||secondPosition[2]===position[2]+50){
          push();
          fill(200);
          translate(0,-30,0);
          cylinder(10,10,30,30);
          pop();
          push();
          fill(0);
          translate(0,-37.5,0);
          cylinder(12,5,30,30);
          translate(0,-7.5,0);
          let mySmoke = new Smoke(position[0],position[1],position[2],false);
          theSmoke.push(mySmoke);
          pop();
        }else{
          push();
          fill(200);
          translate(0,0,30);
          rotateX(1.4);
          cylinder(10,10,30,30);
          pop();
          push();
          fill(0);
          translate(0,0,37.5);
          rotateX(1.4);
          cylinder(12,5,30,30);
          rotateX(-1.4);
          translate(0,0,7.5)
          let mySmoke = new Smoke(position[0],position[1],position[2],true);
          theSmoke.push(mySmoke);
          pop();
        }
      }
    }else{
      //no skin
      box(50);
    }
  }else{
    box(50);
  }
}

class Smoke {
  constructor(x,y,z,upDown) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = 25;
    this.alpha = 255;
    this.upDown = upDown;
    this.waverX = random(-10,10);
    this.waverY = random(-10,10);
    this.waverZ = random(-10,10);
  }

  display() {
    noStroke();
    fill(100,this.alpha);
    push();
    if(this.upDown){
      translate(this.x,this.y,this.z+50);
    }else{
      translate(this.x,this.y-50,this.z);
    }
    sphere(this.radius);
    translate(25+this.waverX,-12.5+this.waverY,0+this.waverZ);
    sphere(this.radius);
    translate(0+this.waverX,25+this.waverY,-12.5+this.waverZ);
    sphere(this.radius);
    translate(-12.5+this.waverX,0+this.waverY,25+this.waverZ);
    sphere(this.radius);
    pop();
  }

  update() {
    this.y-=5;
    this.radius-=1;
    this.alpha-=10;
    this.x+=random(1,-1);
    this.waverX += random(-1,1);
    this.waverY += random(-1,1);
    this.waverZ += random(-1,1);
  }

  isDone() {
    return this.alpha <= 0;
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
    foodPosition[0]=ceil(random(-0.9,19))*50;
    foodPosition[1]=ceil(random(-0.9,19))*50;
    foodPosition[2]=ceil(random(-19.9,0))*50;
    if(foodPosition[0]===0&&foodPosition[2]===-950){
      shadowFoodPosition[0] = foodPosition[0]-50;
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }else if(foodPosition[2]===0){
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2]-50;
    }else if(foodPosition[2]===-950){
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2]+50;
    }else if(foodPosition[0]===0){
      shadowFoodPosition[0] = foodPosition[0]+50;
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }else{
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }
    snakeLength++;
    points++;
  }
  if(position[0]===foodPosition[0]&&position[1]===foodPosition[1]&&position[2]===foodPosition[2]){
    foodPosition[0]=ceil(random(-0.9,19))*50;
    foodPosition[1]=ceil(random(-0.9,19))*50;
    foodPosition[2]=ceil(random(-19.9,0))*50;
    if(foodPosition[0]===0&&foodPosition[2]===-950){
      shadowFoodPosition[0] = foodPosition[0]-50;
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }else if(foodPosition[2]===0){
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2]-50;
    }else if(foodPosition[2]===-950){
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2]+50;
    }else if(foodPosition[0]===0){
      shadowFoodPosition[0] = foodPosition[0]+50;
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }else{
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }
    snakeLength++;
    points++;
  }
  for(var j=0; j<=bodyPosition.length-3; j+=3){
    if(foodPosition[0]===bodyPosition[j]&&foodPosition[1]===bodyPosition[j+1]&&foodPosition[2]===bodyPosition[j+2]){
      foodPosition[0]=ceil(random(-0.9,19))*50;
      foodPosition[1]=ceil(random(-0.9,19))*50;
      foodPosition[2]=ceil(random(-19.9,0))*50;
    if(foodPosition[0]===0&&foodPosition[2]===-950){
        sadowFoodPosition[0] = foodPosition[0]-50;
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }else if(foodPosition[2]===0){
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2]-50;
    }else if(foodPosition[2]===-950){
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2]+50;
    }else if(foodPosition[0]===0){
      shadowFoodPosition[0] = foodPosition[0]+50;
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }else{
      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }
      snakeLength++;
      points++;
    }
  }

  if(positionP2[0]+push0P2===foodPosition[0]&&positionP2[1]+push1P2===foodPosition[1]&&positionP2[2]+push2P2===foodPosition[2]){
    foodPosition[0]=ceil(random(0,19))*50;
    foodPosition[1]=ceil(random(0,19))*50;
    foodPosition[2]=ceil(random(-19.9,0))*50;
    snakeLengthP2++;
    pointsP2++;
  }
  if(positionP2[0]===foodPosition[0]&&positionP2[1]===foodPosition[1]&&positionP2[2]===foodPosition[2]){
    foodPosition[0]=ceil(random(0,19))*50;
    foodPosition[1]=ceil(random(0,19))*50;
    foodPosition[2]=ceil(random(-19.9,0))*50;
    snakeLengthP2++;
    pointsP2++;
  }
  for(var j=0; j<=bodyPositionP2.length-3; j+=3){
    if(foodPosition[0]===bodyPositionP2[j]&&foodPosition[1]===bodyPositionP2[j+1]&&foodPosition[2]===bodyPositionP2[j+2]){
      foodPosition[0]=ceil(random(0,19))*50;
      foodPosition[1]=ceil(random(0,19))*50;
      foodPosition[2]=ceil(random(-19.9,0))*50;
      snakeLengthP2++;
      pointsP2++;
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

function playerHasDied(p){
  if(p===1){
    if(gameType==="Survival"){
      state = "Game Over";
      playerDeath = 1;
      pop();
      setup();
    }else if(gameType==="Points"){
      arr = [0,0,0,0];
      position = [0,0,0];
      secondPosition = [];
      bodyPosition = [];

      push0 = 50;
      push1 = 0;
      push2 = 0;
      push3 = 1;
      snakeLength = 3;

      points-=3;
      if(points<0){
        points=0;
      }
      p1Died=true;
    }else{
      state = "Game Over";
      pop();
      setup();
    }
  }else{
    if(gameType==="Survival"){
      state = "Game Over";
      playerDeath = 2;
      pop();
      setup();
    }else if(gameType==="Points"){
      arrP2 = [0,950,0,0];
      positionP2 = [0,950,0];
      secondPositionP2 = [];
      bodyPositionP2 = [];

      push0P2 = 50;
      push1P2 = 0;
      push2P2 = 0;
      push3P2 = 1;
      snakeLengthP2 = 3;

      pointsP2-=3;
      if(pointsP2<0){
        pointsP2=0;
      }
      p2Died=true;
    }else{
      state = "Game Over";
      pop();
      setup();
    }
  }
}

function labelPositions(){
  let currentPosition = [50,0,0];
  let directionX = 'right';
  let directionZ = 'forward';
  for(var y=0; y<20; y++){
    for(var z=0; z<20; z++){
      for(var x=0; x<19; x++){
        currentPosition = [...currentPosition];
        if(x!==0){
          if(directionX==='right'){
            currentPosition[0]+=50;
          }else{
            currentPosition[0]-=50;
          }
        }
        if(currentPosition[2]===-1000){
          currentPosition[2]=-950;
        }
        orderOfPositions.push([...currentPosition]);
        if(orderOfPositions.length===6840){
          orderOfPositions.push([50, 900, 0]);
          currentPosition[1]=900;
          for(var i=0; i<18; i++){
            currentPosition = [...currentPosition];
            currentPosition[0]+=50;
            orderOfPositions.push([...currentPosition]);
          }
          currentPosition[1]=850;
          directionX='right';
        }
        if(orderOfPositions.length===7239){
          orderOfPositions.push([950, 900, -950]);
          currentPosition[1]=900;
          currentPosition[2]=-950;
          for(var i=0; i<18; i++){
            currentPosition = [...currentPosition];
            currentPosition[0]-=50;
            orderOfPositions.push([...currentPosition]);
          }
          currentPosition[1]=900;
          directionX='left';
        }
      }
      if(directionX==='right'){
        directionX='left';
      }else{
        directionX='right';
      }
      if(directionZ==='forward'){
        currentPosition[2]-=50;
      }else{
        currentPosition[2]+=50;
      }
    }
    if(directionZ==='forward'){
      directionZ='back';
    }else{
      directionZ='forward';
    }
    currentPosition[1]+=50;
  }

  currentPosition = [...currentPosition];
  currentPosition[0] -= 50;
  currentPosition[1] = 950;
  currentPosition[2] -= 50;


  for(var j=0; j<20; j++){
    for(var k=0; k<20; k++){
      currentPosition = [...currentPosition];
      if(k!==0){
        if(directionZ==="forward"){
          currentPosition[2]-=50;
        }else{
          currentPosition[2]+=50;
        }
      }
      orderOfPositions.push([...currentPosition]);
    }
    if(directionZ==='forward'){
      directionZ='back';
    }else{
      directionZ='forward';
    }
    currentPosition[1]-=50;
  }

  if(orderOfPositions.length>8040){
    orderOfPositions.splice(8041, 8001);
  }

  for(var i=1; i<9; i++){
    for(var j=760*i; j<761*i+379; j++){
      orderOfPositions[j][2]-=50;
    }
  }

  for(var i=0; i<7; i++){
    for(var j=1900+760*i; j<=1900+760*i+i; j++){
      orderOfPositions[j][2]+=50;
    }
  }
}

let nextChoice = false;

function calculateMove(moveArr){
  let choice;
  let choiceMade = false;
  let moveMade = false;
  if(positionPlaceCounter===8001){
    push0 = 50;
    push1 = 0;
    push2 = 0;
    positionPlaceCounter=0;
  }
  if(nextChoice){
    choice = forwardPosition(true);
    nextChoice = false;
    choiceMade = true;
  }
  if(choiceMade===false){
    if(shadowFoodPosition[2]!==foodPosition[2]){
      if(shadowFoodPosition[2]===-50){
        if(position[0]===shadowFoodPosition[0]&&position[1]===shadowFoodPosition[1]&&position[2]===shadowFoodPosition[2]){
          choice = backPosition(true);
        }else{
          choice = pathOpen(moveArr, "Best");
        }
      }else if(shadowFoodPosition[2]===-900){
        if(position[0]===shadowFoodPosition[0]&&position[1]===shadowFoodPosition[1]&&position[2]===shadowFoodPosition[2]){
          choice = forwardPosition(true);
        }else{
          choice = pathOpen(moveArr, "Best");
        }
      }
    }else if(shadowFoodPosition[0]!==foodPosition[0]){
      if(shadowFoodPosition[0]===50){
        if(position[0]===shadowFoodPosition[0]&&position[1]===shadowFoodPosition[1]&&position[2]===shadowFoodPosition[2]){
          choice = leftPosition(true);
          nextChoice = true;
        }else{
          choice = pathOpen(moveArr, "Best");
        }
      }
    }else{
      choice = pathOpen(moveArr, "Best");
    }
  }
  if(orderOfPositions[choice]!==undefined&&orderOfPositions[positionPlaceCounter]!==undefined){
    if(orderOfPositions[choice][0]-orderOfPositions[positionPlaceCounter][0]!==0){
      push0 = orderOfPositions[choice][0]-orderOfPositions[positionPlaceCounter][0];
      push1 = 0;
      push2 = 0;
      positionPlaceCounter = choice;
      moveMade = true;
    }else if(orderOfPositions[choice][1]-orderOfPositions[positionPlaceCounter][1]!==0){
      push0 = 0;
      push1 = orderOfPositions[choice][1]-orderOfPositions[positionPlaceCounter][1];
      push2 = 0;
      positionPlaceCounter = choice;
      moveMade = true;
    }else if(orderOfPositions[choice][2]-orderOfPositions[positionPlaceCounter][2]!==0){
      push0 = 0;
      push1 = 0;
      push2 = orderOfPositions[choice][2]-orderOfPositions[positionPlaceCounter][2];
      positionPlaceCounter = choice;
      moveMade = true;
    }
  }
  if(moveMade===false){
    if(orderOfPositions[positionPlaceCounter+1]!==undefined){
      if(orderOfPositions[positionPlaceCounter+1][0]-orderOfPositions[positionPlaceCounter][0]!==0){
        push0 = orderOfPositions[positionPlaceCounter+1][0]-orderOfPositions[positionPlaceCounter][0];
        push1 = 0;
        push2 = 0;
      }else if(orderOfPositions[positionPlaceCounter+1][1]-orderOfPositions[positionPlaceCounter][1]!==0){
        push0 = 0;
        push1 = orderOfPositions[positionPlaceCounter+1][1]-orderOfPositions[positionPlaceCounter][1];
        push2 = 0;
      }else{
        push0 = 0;
        push1 = 0;
        push2 = orderOfPositions[positionPlaceCounter+1][2]-orderOfPositions[positionPlaceCounter][2];
      }
      positionPlaceCounter++;
      moveMade = true;
    }
  }
}

let swap = false;

function findPath(x){
  let openF = forward();
  let openR = right();
  let openD = down();
  let openL = left();
  let openB = back();
  let openU = up();
  if(x!=='forward/back'){
    if(openR){
      return forwardPosition(openR);
    }else if(openD){
      return forwardPosition(openD);
    }else if(openL){
      return forwardPosition(openL);
    }else if(openU){
      return forwardPosition(openU);
    }
  }else if(x!=='right/left'){
    if(openF){
      return forwardPosition(openF);
    }else if(openD){
      return forwardPosition(openD);
    }else if(openB){
      return forwardPosition(openB);
    }else if(openU){
      return forwardPosition(openU);
    }
  }else if(x!=='up/down'){
    if(openF){
      return forwardPosition(openF);
    }else if(openR){
      return forwardPosition(openR);
    }else if(openL){
      return forwardPosition(openL);
    }else if(openB){
      return forwardPosition(openB);
    }
  }
}

function pathOpen(array, option){
  let counter;
  if(option==="Next Best"){
    counter = 0;
  }
  let pathNotFound = true;
  let pathTest = array.length-1;
  let pathIsBad = false;
  while(pathNotFound){
    if(pathTest===0){
      return array[0];
    }
    pathIsBad = false;
    if(array[pathTest]<positionPlaceCounter){
      for(var i=0; i<=bodyPosition.length; i+=3){
        for(var j=positionPlaceCounter+1; j<8000; j++){
          if(bodyPosition[i]===orderOfPositions[j][0]&&bodyPosition[i+1]===orderOfPositions[j][1]&&bodyPosition[i+2]===orderOfPositions[j][2]){
            pathIsBad = true;
          }
        }
      }
      if(!pathIsBad){
        for(var i=0; i<=bodyPosition.length; i+=3){
          for(var j=0; j<array[pathTest]; j++){
            if(bodyPosition[i]===orderOfPositions[j][0]&&bodyPosition[i+1]===orderOfPositions[j][1]&&bodyPosition[i+2]===orderOfPositions[j][2]){
              pathIsBad = true;
            }
          }
        }
      }
      if(!pathIsBad){
        let missFood = willIMissFood("Double", array, pathTest);
        if(option==="Next Best"){
          if(!missFood&&counter<1&&pathTest!==array.length-1){
            return array[pathTest];
          }else{
            pathTest--;
            counter--;
          }
        }else{
          if(!missFood){
            return array[pathTest];
          }else{
            pathTest--;
          }
        }
      }else{
        pathTest--;
      }
    }else{
      for(var i=0; i<=bodyPosition.length; i+=3){
        for(var j=positionPlaceCounter+1; j<array[pathTest]; j++){
          if(bodyPosition[i]===orderOfPositions[j][0]&&bodyPosition[i+1]===orderOfPositions[j][1]&&bodyPosition[i+2]===orderOfPositions[j][2]){
            pathIsBad = true;
          }
        }
      }
      if(!pathIsBad){
        let missFood = willIMissFood("Single", array, pathTest);
        if(option==="Next Best"){
          if(!missFood&&counter<1&&pathTest!==array.length-1){
            return array[pathTest];
          }else{
            pathTest--;
            counter--;
          }
        }else{
          if(!missFood){
            return array[pathTest];
          }else{
            pathTest--;
          }
        }
      }else{
        pathTest--;
      }
    }
  }
}

function willIMissFood(x, array, pathTest){
  if(x==="Double"){
    if(swap===false){
      for(var j=positionPlaceCounter+1; j<8000; j++){
        if(shadowFoodPosition[0]===orderOfPositions[j][0]&&shadowFoodPosition[1]===orderOfPositions[j][1]&&shadowFoodPosition[2]===orderOfPositions[j][2]){
          return true;
        }
      }
      for(var j=0; j<array[pathTest]; j++){
        if(shadowFoodPosition[0]===orderOfPositions[j][0]&&shadowFoodPosition[1]===orderOfPositions[j][1]&&shadowFoodPosition[2]===orderOfPositions[j][2]){
          return true;
        }
      }
      return false;
    }else{
      for(var j=positionPlaceCounter+1; j<8000; j++){
        if(!(shadowFoodPosition[0]===orderOfPositions[j][0]&&shadowFoodPosition[1]===orderOfPositions[j][1]&&shadowFoodPosition[2]===orderOfPositions[j][2])){
          return true;
        }
      }
      for(var j=0; j<array[pathTest]; j++){
        if(!(shadowFoodPosition[0]===orderOfPositions[j][0]&&shadowFoodPosition[1]===orderOfPositions[j][1]&&shadowFoodPosition[2]===orderOfPositions[j][2])){
          return true;
        }
      }
      return false;
    }
  }else{
    for(var j=positionPlaceCounter+1; j<array[pathTest]; j++){
      if(shadowFoodPosition[0]===orderOfPositions[j][0]&&shadowFoodPosition[1]===orderOfPositions[j][1]&&shadowFoodPosition[2]===orderOfPositions[j][2]){
        return true;
      }
    }
    return false;
  }
}

function neighboringPositions(){
  let openR = right();
  let openL = left();
  let openF = forward();
  let openB = back();
  let openU = up();
  let openD = down();

  let positionR = rightPosition(openR);
  let positionL = leftPosition(openL); 
  let positionF = forwardPosition(openF); 
  let positionB = backPosition(openB); 
  let positionU = upPosition(openU); 
  let positionD = downPosition(openD); 

  let neighborPositionsGreaterThan = [];
  let neighborPositionsLessThan = [];

  if(openR){
    if(positionR<positionPlaceCounter){
      neighborPositionsLessThan.push(positionR);
    }else{
      neighborPositionsGreaterThan.push(positionR);
    }
  }

  if(openL){
    if(positionL<positionPlaceCounter){
      neighborPositionsLessThan.push(positionL);
    }else{
      neighborPositionsGreaterThan.push(positionL);
    }
  }

  if(openF){
    if(positionF<positionPlaceCounter){
      neighborPositionsLessThan.push(positionF);
    }else{
      neighborPositionsGreaterThan.push(positionF);
    }
  }

  if(openB){
    if(positionB<positionPlaceCounter){
      neighborPositionsLessThan.push(positionB);
    }else{
      neighborPositionsGreaterThan.push(positionB);
    }
  }

  if(openU){
    if(positionU<positionPlaceCounter){
      neighborPositionsLessThan.push(positionU);
    }else{
      neighborPositionsGreaterThan.push(positionU);
    }
  }

  if(openD){
    if(positionD<positionPlaceCounter){
      neighborPositionsLessThan.push(positionD);
    }else{
      neighborPositionsGreaterThan.push(positionD);
    }
  }

  let greaterArr = bubbleSort(neighborPositionsGreaterThan);
  let lessArr = bubbleSort(neighborPositionsLessThan);

  for(var i=0; i<lessArr.length; i++){
    greaterArr.push(lessArr[i]);
  }

  return greaterArr;
}

function right(){
  for(var i=0; i<=bodyPosition.length; i+=3){
    if(position[0]+50===1000||(position[0]+50===bodyPosition[i+0]&&position[1]===bodyPosition[i+1]&&position[2]===bodyPosition[i+2])){
      return false;
    }
  }
  return true;
}

function left(){
  for(var i=0; i<=bodyPosition.length; i+=3){
    if(position[0]-50===-50||(position[0]-50===bodyPosition[i+0]&&position[1]===bodyPosition[i+1]&&position[2]===bodyPosition[i+2])){
      return false;
    }
  }
  return true;
}

function forward(){
  for(var i=0; i<=bodyPosition.length; i+=3){
    if(position[2]-50===-1000||(position[0]===bodyPosition[i+0]&&position[1]===bodyPosition[i+1]&&position[2]-50===bodyPosition[i+2])){
      return false;
    }
  }
  return true;
}

function back(){
  for(var i=0; i<=bodyPosition.length; i+=3){
    if(position[2]+50===50||(position[0]===bodyPosition[i+0]&&position[1]===bodyPosition[i+1]&&position[2]+50===bodyPosition[i+2])){
      return false;
    }
  }
  return true;
}

function up(){
  for(var i=0; i<=bodyPosition.length; i+=3){
    if(position[1]-50===-50||(position[0]===bodyPosition[i+0]&&position[1]-50===bodyPosition[i+1]&&position[2]===bodyPosition[i+2])){
      return false;
    }
  }
  return true;
}

function down(){
  for(var i=0; i<=bodyPosition.length; i+=3){
    if(position[1]+50===1000||(position[0]===bodyPosition[i+0]&&position[1]+50===bodyPosition[i+1]&&position[2]===bodyPosition[i+2])){
      return false;
    }
  }
  return true;
}

function rightPosition(x){
  if(x){
    for(var i=0; i<orderOfPositions.length; i++){
      if(position[0]+50===orderOfPositions[i][0]&&position[1]===orderOfPositions[i][1]&&position[2]===orderOfPositions[i][2]){
        return i;
      }
    }
  }else{
    return false;
  }
}

function leftPosition(x){
  if(x){
    for(var i=0; i<orderOfPositions.length; i++){
      if(position[0]-50===orderOfPositions[i][0]&&position[1]===orderOfPositions[i][1]&&position[2]===orderOfPositions[i][2]){
        return i;
      }
    }
  }else{
    return false;
  }
}

function forwardPosition(x){
  if(x){
    for(var i=0; i<orderOfPositions.length; i++){
      if(position[0]===orderOfPositions[i][0]&&position[1]===orderOfPositions[i][1]&&position[2]-50===orderOfPositions[i][2]){
        return i;
      }
    }
  }else{
    return false;
  }
}

function backPosition(x){
  if(x){
    for(var i=0; i<orderOfPositions.length; i++){
      if(position[0]===orderOfPositions[i][0]&&position[1]===orderOfPositions[i][1]&&position[2]+50===orderOfPositions[i][2]){
        return i;
      }
    }
  }else{
    return false;
  }
}

function upPosition(x){
  if(x){
    for(var i=0; i<orderOfPositions.length; i++){
      if(position[0]===orderOfPositions[i][0]&&position[1]-50===orderOfPositions[i][1]&&position[2]===orderOfPositions[i][2]){
        return i;
      }
    }
  }else{
    return false;
  }
}

function downPosition(x){
  if(x){
    for(var i=0; i<orderOfPositions.length; i++){
      if(position[0]===orderOfPositions[i][0]&&position[1]+50===orderOfPositions[i][1]&&position[2]===orderOfPositions[i][2]){
        return i;
      }
    }
  }else{
    return false;
  }
}

function bubbleSort(thisArray){
  let again = true;
  while(again){
    again = false;
    for(var i=0; i<thisArray.length-1; i++){
      if(thisArray[i]>thisArray[i+1]){
        let hold = thisArray [i];
        thisArray[i]=thisArray[i+1];
        thisArray[i+1]=hold;
        again = true;
      }
    }
  }
  return thisArray;
}

//when the user dies the death screen is shown
function deathScreen(){
  frameRate(60);
  textFont(inconsolata);
  textAlign(CENTER, CENTER);
  background(200);
  //screen is displaced, translation fixes it
  translate(-1/2*width,-1/2*height);
  
  if(gameMode!=="Two Player"){
    //says 'You Died!' at top of screen
    fill(255,0,0);
    textSize(50);
    if(gameMode==="Single Player"){
      text("You Died!", width/2, height/8);
    }else{
      text("AI Died!", width/2, height/8);
    }

    //displays the users score
    fill(0);
    textSize(25);
    text("Score: " + snakeLength, width/2, height*5/16);
  }
  
  if(gameMode==="Single Player"){
    //leaderboard
    if(mouseX>width*15/16-25&&mouseX<width*15/16+25&&mouseY>height*1/8-25/2&&mouseY<height*1/8+25/2){
      leaderBoardIcon(true);
      if(mouseIsPressed){
        //when mouse clicks store icon, sets state to store and calls setup again to open store screen
        state="LeaderBoard";
        setup();
      }
    }else{
      leaderBoardIcon(false);
    }

    if(firstIterationDeath){
      let thisScore = {
        score: snakeLength,
        day: 0,
        month: 0,
        year: 0,
        thisDifficulty: difficulty,
      };
      thisScore.day = day();
      thisScore.month = month();
      thisScore.year = year();
      if(thisScore.month===1){
        thisScore.month = "January"
      }else if(thisScore.month===2){
        thisScore.month = "February"
      }else if(thisScore.month===3){
        thisScore.month = "March"
      }else if(thisScore.month===4){
        thisScore.month = "April"
      }else if(thisScore.month===5){
        thisScore.month = "May"
      }else if(thisScore.month===6){
        thisScore.month = "June"
      }else if(thisScore.month===7){
        thisScore.month = "July"
      }else if(thisScore.month===8){
        thisScore.month = "August"
      }else if(thisScore.month===9){
        thisScore.month = "September"
      }else if(thisScore.month===10){
        thisScore.month = "October"
      }else if(thisScore.month===11){
        thisScore.month = "November"
      }else if(thisScore.month===12){
        thisScore.month = "December"
      }

      if(thisScore.thisDifficulty===5){
        for(var i=0; i<10; i++){
          if(highScores5[i]!==undefined){
            if(thisScore.score>highScores5[i].score){
              highScores5.splice(i, 0, thisScore);
              if(highScores5.length>10){
                highScores5.pop();
              }
              break;
            }
          }else{
            highScores5.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 5", highScores5);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===6){
        for(var i=0; i<10; i++){
          if(highScores6[i]!==undefined){
            if(thisScore.score>highScores6[i].score){
              highScores6.splice(i, 0, thisScore);
              if(highScores6.length>10){
                highScores6.pop();
              }
              break;
            }
          }else{
            highScores6.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 6", highScores6);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===7){
        for(var i=0; i<10; i++){
          if(highScores7[i]!==undefined){
            if(thisScore.score>highScores7[i].score){
              highScores7.splice(i, 0, thisScore);
              if(highScores7.length>10){
                highScores7.pop();
              }
              break;
            }
          }else{
            highScores7.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 7", highScores7);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===8){
        for(var i=0; i<10; i++){
          if(highScores8[i]!==undefined){
            if(thisScore.score>highScores8[i].score){
              highScores8.splice(i, 0, thisScore);
              if(highScores8.length>10){
                highScores8.pop();
              }
              break;
            }
          }else{
            highScores8.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 8", highScores8);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===9){
        for(var i=0; i<10; i++){
          if(highScores9[i]!==undefined){
            if(thisScore.score>highScores9[i].score){
              highScores9.splice(i, 0, thisScore);
              if(highScores9.length>10){
                highScores9.pop();
              }
              break;
            }
          }else{
            highScores9.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 9", highScores9);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===10){
        for(var i=0; i<10; i++){
          if(highScores10[i]!==undefined){
            if(thisScore.score>highScores10[i].score){
              highScores10.splice(i, 0, thisScore);
              if(highScores10.length>10){
                highScores10.pop();
              }
              break;
            }
          }else{
            highScores10.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 10", highScores10);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===11){
        for(var i=0; i<10; i++){
          if(highScores11[i]!==undefined){
            if(thisScore.score>highScores11[i].score){
              highScores11.splice(i, 0, thisScore);
              if(highScores11.length>10){
                highScores11.pop();
              }
              break;
            }
          }else{
            highScores11.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 11", highScores11);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===12){
        for(var i=0; i<10; i++){
          if(highScores12[i]!==undefined){
            if(thisScore.score>highScores12[i].score){
              highScores12.splice(i, 0, thisScore);
              if(highScores12.length>10){
                highScores12.pop();
              }
              break;
            }
          }else{
            highScores12.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 12", highScores12);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===13){
        for(var i=0; i<10; i++){
          if(highScores13[i]!==undefined){
            if(thisScore.score>highScores13[i].score){
              highScores13.splice(i, 0, thisScore);
              if(highScores13.length>10){
                highScores13.pop();
              }
              break;
            }
          }else{
            highScores13.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 13", highScores13);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===14){
        for(var i=0; i<10; i++){
          if(highScores14[i]!==undefined){
            if(thisScore.score>highScores14[i].score){
              highScores14.splice(i, 0, thisScore);
              if(highScores14.length>10){
                highScores14.pop();
              }
              break;
            }
          }else{
            highScores14.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 14", highScores14);
        firstIterationDeath=false;
      }
      if(thisScore.thisDifficulty===15){
        for(var i=0; i<10; i++){
          if(highScores15[i]!==undefined){
            if(thisScore.score>highScores15[i].score){
              highScores15.splice(i, 0, thisScore);
              if(highScores15.length>10){
                highScores15.pop();
              }
              break;
            }
          }else{
            highScores15.splice(i, 0, thisScore);
            break;
          }
        }
        storeItem("High Scores 15", highScores15);
        firstIterationDeath=false;
      }
    }

    if(difficulty===5){
      text("Difficulty: 5", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 5")[0].score, width/2, height*6/16);
    }
    if(difficulty===6){
      text("Difficulty: 6", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 6")[0].score, width/2, height*6/16);
    }
    if(difficulty===7){
      text("Difficulty: 7", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 7")[0].score, width/2, height*6/16);
    }
    if(difficulty===8){
      text("Difficulty: 8", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 8")[0].score, width/2, height*6/16);
    }
    if(difficulty===9){
      text("Difficulty: 9", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 9")[0].score, width/2, height*6/16);
    }
    if(difficulty===10){
      text("Difficulty: 10", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 10")[0].score, width/2, height*6/16);
    }
    if(difficulty===11){
      text("Difficulty: 11", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 11")[0].score, width/2, height*6/16);
    }
    if(difficulty===12){
      text("Difficulty: 12", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 12")[0].score, width/2, height*6/16);
    }
    if(difficulty===13){
      text("Difficulty: 13", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 13")[0].score, width/2, height*6/16);
    }
    if(difficulty===14){
      text("Difficulty: 14", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 14")[0].score, width/2, height*6/16);
    }
    if(difficulty===15){
      text("Difficulty: 15", width/2, height*4/16);
      text("High Score: " + getItem("High Scores 15")[0].score, width/2, height*6/16);
    }
    
    

    //displays money gained for the round
    text("Money Gained: " + moneyGained, width/2, height*7/16);
  }else if(gameMode==="Two Player"){
    if(gameType==="Survival"){
      text("Player " + playerDeath + " Died!", width/2, height/8);
    }else{
      textSize(75);
      fill(220,0,220);
      text("Time's Up!", width/2, height/8);
      textSize(50);
      fill(255,40,0);
      text("Player 1 Score:", width/4, height*5/16);
      text(points, width/4, height*7/16);
      fill(0,0,200);
      text("Player 2 Score:", width*3/4, height*5/16);
      text(pointsP2, width*3/4, height*7/16);
    }
  }

  //makes Back to Menu button
  stroke(0);
  fill(255);
  textSize(25);
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

//draws the leader board icon
function leaderBoardIcon(on){
  push();
  translate(width*15/16, height*1/8);
  noStroke();
  if(!on){
    fill(100);
  }else{
    fill(0,0,150);
  }
  rectMode(CENTER);
  rect(0,0,17,50/2);
  rect(-17,4,17,34/2);
  rect(17,6,17,13);
  pop();
}

function leaderBoard(){
  background(200);

  translate(-1*width/2, -1*height/2);

  textSize(75);
  fill(255,0,255);
  text("High Scores", width/2, height*1/8);

  textSize(25);
  fill(200,0,200);
  text("For difficulty " + difficulty, width/2, height*7/32);

  //writes top scores
  textSize(50);
  fill(0);
  push();

  if(difficulty===5){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 5").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 5")[i].score, 0, 0);
    }
    pop();
  
    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 5").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 5")[i].month + " " +  getItem("High Scores 5")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===6){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 6").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 6")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 6").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 6")[i].month + " " +  getItem("High Scores 6")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===7){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 7").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 7")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 7").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 7")[i].month + " " +  getItem("High Scores 7")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===8){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 8").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 8")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 8").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 8")[i].month + " " +  getItem("High Scores 8")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===9){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 9").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 9")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 9").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 9")[i].month + " " +  getItem("High Scores 9")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===10){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 10").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 10")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 10").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 10")[i].month + " " +  getItem("High Scores 10")[i].day + ", " +  getItem("High Scores 10")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===11){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 11").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 11")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 11").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 11")[i].month + " " +  getItem("High Scores 11")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===12){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 12").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 12")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 12").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 12")[i].month + " " +  getItem("High Scores 12")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===13){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 13").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 13")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 13").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 13")[i].month + " " +  getItem("High Scores 13")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===14){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 14").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 14")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 14").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 14")[i].month + " " +  getItem("High Scores 14")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }
  if(difficulty===15){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 15").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      text((i+1) + ". " + getItem("High Scores 15")[i].score, 0, 0);
    }
    pop();

    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 15").length; i++){
      translate(0, height*1/16);
      text(getItem("High Scores 15")[i].month + " " +  getItem("High Scores 15")[i].day + ", " +  getItem("High Scores")[i].year, 0, 0);
    }
    pop();
  }

  fill(255,0,0);
  rectMode(CENTER);
  stroke(0);
  rect(width*0.9, 50, 30, 20);
  if(mouseX>width*0.9-15&&mouseX<width*0.9+15&&mouseY>38&&mouseY<60&&mouseIsPressed){
    state="Game Over";
    setup();
  }
}

function keyPressed(){
  if(gameMode!=="AI"){
    for(var i=0; i<=222; i++){
      if(keyIsDown(i)&&i===p1Controls.rKeyCode){
        if(secondPosition[0]!==position[0]+50){
          push0=50;
          push1=0;
          push2=0;
        }
      }else if(keyIsDown(i)&&i===p1Controls.lKeyCode){
        if(secondPosition[0]!==position[0]-50){
          push0=-50;
          push1=0;
          push2=0;
        }
      }else if(keyIsDown(i)&&i===p1Controls.fKeyCode){
        if(secondPosition[2]!==position[2]-50){
          push0=0;
          push1=0;
          push2=-50;
        }
      }else if(keyIsDown(i)&&i===p1Controls.bKeyCode){
        if(secondPosition[2]!==position[2]+50){
          push0=0;
          push1=0;
          push2=50;
        }
      }else if(keyIsDown(i)&&i===p1Controls.uKeyCode){
        if(secondPosition[1]!==position[1]-50){
          push0=0;
          push1=-50;
          push2=0;
        }
      }else if(keyIsDown(i)&&i===p1Controls.dKeyCode){
        if(secondPosition[1]!==position[1]+50){
          push0=0;
          push1=50;
          push2=0;
        }
      }
      if(gameMode==="Two Player"){
        if(keyIsDown(i)&&i===p2Controls.rKeyCode){
          if(secondPositionP2[0]!==positionP2[0]+50){
            push0P2=50;
            push1P2=0;
            push2P2=0;
          }
        }else if(keyIsDown(i)&&i===p2Controls.lKeyCode){
          if(secondPositionP2[0]!==positionP2[0]-50){
            push0P2=-50;
            push1P2=0;
            push2P2=0;
          }
        }else if(keyIsDown(i)&&i===p2Controls.fKeyCode){
          if(secondPositionP2[2]!==positionP2[2]-50){
            push0P2=0;
            push1P2=0;
            push2P2=-50;
          }
        }else if(keyIsDown(i)&&i===p2Controls.bKeyCode){
          if(secondPositionP2[2]!==positionP2[2]+50){
            push0P2=0;
            push1P2=0;
            push2P2=50;
          }
        }else if(keyIsDown(i)&&i===p2Controls.uKeyCode){
          if(secondPositionP2[1]!==positionP2[1]-50){
            push0P2=0;
            push1P2=-50;
            push2P2=0;
          }
        }else if(keyIsDown(i)&&i===p2Controls.dKeyCode){
          if(secondPositionP2[1]!==positionP2[1]+50){
            push0P2=0;
            push1P2=50;
            push2P2=0;
          }
        }
      }
    }
    
    if(gameMode!=="Two Player"){
      if(keyIsDown(68)&&keyIsDown(65)&&keyIsDown(87)&&keyIsDown(83)&&keyIsDown(38)&&keyIsDown(40)){
        money+=1000;
      }
    }
  }
  if(keyIsDown(38)&&difficulty!==60){
    difficulty++
  }
  if(keyIsDown(40)&&difficulty!==1){
    difficulty--
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
    //since the z coordinate is negative and the side views are positive
    //this translation aligns the snake with the canvas
    sketch.translate(0,y-y/20);
    
    sketch.push();
    sketch.translate(position[0]/50*x/20, position[2]/50*y/20);
    sketch.placeBox(position[0],position[1],position[2],true);
    sketch.pop();
    for(var i=bodyPosition.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPosition[i+0]/50*x/20, bodyPosition[i+2]/50*y/20);
      sketch.placeBox(bodyPosition[i+0],bodyPosition[i+1],bodyPosition[i+2]);
      sketch.pop();
    }
  };
  
  //function is the same as 3d function
  sketch.placeBox = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
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
    //since the z coordinate is negative and the side views are positive
    //this translation aligns the snake with the canvas
    sketch.translate(0,y-y/20);
    
    sketch.push();
    sketch.translate(positionP2[0]/50*x/20, positionP2[2]/50*y/20);
    sketch.placeBoxP2(positionP2[0],positionP2[1],positionP2[2],true);
    sketch.pop();
    for(var i=bodyPositionP2.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPositionP2[i+0]/50*x/20, bodyPositionP2[i+2]/50*y/20);
      sketch.placeBoxP2(bodyPositionP2[i+0],bodyPositionP2[i+1],bodyPositionP2[i+2]);
      sketch.pop();
    }
  };
  
  //function is the same as 3d function
  sketch.placeBoxP2 = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
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
    //in side view, x is 3d z and y is the same as 3d y
    sketch.translate(y-y/20,0);
    
    sketch.push();
    sketch.translate(position[2]/50*x/20, position[1]/50*y/20);
    sketch.placeBox(position[0],position[1],position[2],true);
    sketch.pop();
    for(var i=bodyPosition.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPosition[i+2]/50*x/20, bodyPosition[i+1]/50*y/20);
      sketch.placeBox(bodyPosition[i+0],bodyPosition[i+1],bodyPosition[i+2]);
      sketch.pop();
    }
  };
  
  sketch.placeBox = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
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
    //in side view, x is 3d z and y is the same as 3d y
    sketch.translate(y-y/20,0);
    
    sketch.push();
    sketch.translate(positionP2[2]/50*x/20, positionP2[1]/50*y/20);
    sketch.placeBoxP2(positionP2[0],positionP2[1],positionP2[2],true);
    sketch.pop();
    for(var i=bodyPositionP2.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPositionP2[i+2]/50*x/20, bodyPositionP2[i+1]/50*y/20);
      sketch.placeBoxP2(bodyPositionP2[i+0],bodyPositionP2[i+1],bodyPositionP2[i+2]);
      sketch.pop();
    }
  };
  
  sketch.placeBoxP2 = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
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
    //in front view, x and y are the same as 3d x and y
    sketch.push();
    sketch.translate(position[0]/50*x/20, position[1]/50*y/20);
    sketch.placeBox(position[0],position[1],position[2],true);
    sketch.pop();
    for(var i=bodyPosition.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPosition[i+0]/50*x/20, bodyPosition[i+1]/50*y/20);
      sketch.placeBox(bodyPosition[i+0],bodyPosition[i+1],bodyPosition[i+2]);
      sketch.pop();
    }
  };
  
  sketch.placeBox = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
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
    //in front view, x and y are the same as 3d x and y
    sketch.push();
    sketch.translate(positionP2[0]/50*x/20, positionP2[1]/50*y/20);
    sketch.placeBoxP2(positionP2[0],positionP2[1],positionP2[2],true);
    sketch.pop();
    for(var i=bodyPositionP2.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPositionP2[i+0]/50*x/20, bodyPositionP2[i+1]/50*y/20);
      sketch.placeBoxP2(bodyPositionP2[i+0],bodyPositionP2[i+1],bodyPositionP2[i+2]);
      sketch.pop();
    }
  };
  
  sketch.placeBoxP2 = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
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

let display = new p5(( sketch ) => {

  let x = 250;
  let y = 100;

  //creates canvas
  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };

  //writes word
  sketch.draw = () => {
    sketch.background(220);
    sketch.translate(30,15);
    sketch.textAlign(BOTTOM, CENTER);
    sketch.textSize(50);
    if(gameMode==="Two Player"){
      sketch.text(time,0,10);
    }
    if(gameMode==="AI"){
      sketch.text("Score: " + (snakeLength-3).toString(10),-30,10);
      sketch.textSize(30);
      sketch.text("Speed: " + difficulty.toString(10),0,60);
    }
  };
});

let p1Points = new p5(( sketch ) => {

  let x = 100;
  let y = 50;

  //creates canvas
  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };

  //writes word
  sketch.draw = () => {
    sketch.background(220);
    sketch.translate(30,15);
    sketch.textAlign(BOTTOM, CENTER);
    sketch.textSize(50);
    sketch.fill(255,40,0);
    if(gameMode==="Two Player"){
      sketch.text(points,0,10);
    }
  };
});

let p2Points = new p5(( sketch ) => {

  let x = 100;
  let y = 50;

  //creates canvas
  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };

  //writes word
  sketch.draw = () => {
    sketch.background(220);
    sketch.translate(30,15);
    sketch.textAlign(BOTTOM, CENTER);
    sketch.textSize(50);
    sketch.fill(0,0,200);
    if(gameMode==="Two Player"){
      sketch.text(pointsP2,0,10);
    }
  };
});

//calls set up when window is resized
function windowResized(){
  setup();
}