// 3D Snake
// Jordie Walter
// Jan 20, 2019

//global variables

//this variable determines the state of the program
let state = "Main Menu";

let gameMode;
let gameType;

//these variables are the memory of the program
let gameSize = 13;

//player 1
let position = [0,0,0];
let secondPosition = [0,0,0];
let bodyPosition = [];
let points;
let p1Died;

//food
let foodPosition = [0,0,0];

//player 2
let positionP2 = [0,gameSize*50,0];
let secondPositionP2 = [0,0,0];
let foodPositionP2 = [0,0,0];
let bodyPositionP2 = [];
let pointsP2;
let p2Died;

//which player dies
let playerDeath;
//leaderboards
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

//for timed gamemode
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

//these variables are for items in the options menu
let inconsolata;
//sliders
let sliderX = 225;
let gameSliderX = 225+300;
let difficulty = 10;
let axisHelp = false;
//variables for changing controls
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
let aiRestarted = false;
let firstIteration = true;
let firstIterationDeath = true;

//variables for store and skins
let skin = "none";
let hat = "none";
let skinStore;
let hatStore;
let store = "Skins"
let money = 0;
let moneyGained = 0;
//skins/hats array holds all skins/hats
let skins = [];
let hats = [];
let noSkin;
let noHat;
let lineSkin;
let isotopeSkin;
let eyesSkin;
let topHatSkin;
let trainSkin;
let scalesSkin;
let theSmoke = [];

//variables for 2D arrays
let skinCols;
let skinRows;

let hatCols;
let hatRows;

//variables for pictures
let bare;
let snakeEyes;
let lines;
let iso;
let topHat;
let train;
let greenScales;
let blueScales;
let redScales;
let scales;

//backgrounds
let menuBackground;
let gameBackground;
let img = 1;

//Ai variables
let orderOfPositions = [];
let positionPlaceCounter = 0;
let shadowFoodPosition = [];
let bufferX;

//music
let menuMusic;
let gameMusic;

function preload(){
  //preloads audio
  gameMusic = new Audio("assets/echelon.mp3");
  menuMusic = new Audio("assets/streetsound_150_bpm.mp3");
  //preloads text font
  inconsolata = loadFont('assets/Inconsolata.otf');
  //preloads pictures for store
  bare = loadImage('assets/no skin.PNG')
  lines = loadImage('assets/lines.PNG');
  iso = loadImage('assets/iso.PNG');
  snakeEyes = loadImage('assets/snake eyes.PNG');
  topHat = loadImage('assets/top hat.PNG');
  train = loadImage('assets/train.PNG');
  greenScales = loadImage('assets/green scales.png');
  blueScales = loadImage('assets/blue scales.png');
  redScales = loadImage('assets/red scales.png');
  scales = loadImage('assets/scales.PNG');
  menuBackground = loadImage('assets/game background.jpg');
  if(img===1){
    gameBackground = loadImage('assets/game background.webp');
  }else{
    gameBackground = loadImage('assets/game background 2.jpg');
  }
  
  //sets each skin/hat to their object value
  noSkin = {
    name: 'No Skin',
    cost: 'free',
    bought: 'yes',
    active: 'yes',
    picture: bare,
  };

  noHat = {
    name: 'No Hat',
    cost: 'free',
    bought: 'yes',
    active: 'yes',
    picture: bare,
  };
  
  lineSkin = {
    name: 'Line',
    cost: 10,
    bought: 'no',
    active: 'no',
    picture: lines,
  };

  isotopeSkin = {
    name: 'Isotope',
    cost: 50,
    bought: 'no',
    active: 'no',
    picture: iso,
  };

  eyesSkin = {
    name: 'Eyes',
    cost: 100,
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

  scalesSkin = {
    name: 'Scales',
    cost: 250,
    bought: 'no',
    active: 'no',
    picture: scales,
  };

  //pushes hats/skins into their corresponding array
  skins.push(noSkin);
  skins.push(lineSkin);
  skins.push(isotopeSkin);
  skins.push(scalesSkin);

  hats.push(noHat);
  hats.push(eyesSkin);
  hats.push(topHatSkin);
  hats.push(trainSkin);

  //sets variables to the stored leaderboards
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
    foodPosition[0]=ceil(random(-0.9,gameSize))*50;
    foodPosition[1]=ceil(random(-0.9,gameSize))*50;
    foodPosition[2]=floor(random(-1*gameSize,0.9))*50;
    shadowFoodPosition[0] = foodPosition[0];
    shadowFoodPosition[1] = foodPosition[1];
    shadowFoodPosition[2] = foodPosition[2];

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
    if(gameType==="Points"||gameMode==="AI"){
      document.getElementById("defaultCanvas6").style.visibility = "visible";
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
      money+=moneyGained;
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
    if(gameMode==="AI"){
      aiRestarted = true;
    }
    deathScreen();
    pointerDot();
  }
  if(state==="LeaderBoard"){
    leaderBoard();
    pointerDot();
  }
  //resets music if it reaches the end of its track
  if(gameMusic.currentTime===gameMusic.duration){
    gameMusic.currentTime = 0;
  }
  if(menuMusic.currentTime===menuMusic.duration){
    menuMusic.currentTime = 0;
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
  //user has to interact with the screen before it can play music
  if(mouseX!==pmouseX&&firstIteration){
    menuMusic.play();
  }
  //after the program is restarted, everything on the screen is displaced
  //this corrects that displacement
  if(restarted){
    translate(-1/2*width,-1/2*height);
  }

  //resets difficulty for when the user switches gameModes
  difficulty = 10;
  sliderX = 225;
  gameSize = 13;
  gameSliderX = 225 + 300;

  //sets background
  background(0);
  image(menuBackground,0,0,windowWidth,windowHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(inconsolata);
  
  //sets stroke, size, and fill for title
  stroke(0);
  strokeWeight(5);
  textSize(150);
  fill(255,255,0);
  //title
  text("3D Snake",width/2, height*2/8);
  
  //sets stroke and fill for the buttons
  stroke(0);
  fill(0,200,0);
  //creates buttons
  rect(width/2, height/2+height*1/8, width/4, height/8);
  rect(width/3, height/2+height*3/8, width/4, height/8);
  rect(width/3*2, height/2+height*3/8, width/4, height/8);
  
  //sets stroke, size, and fill for buttons
  noStroke();
  textSize(25);
  fill(0);
  //single player button
  text("Single Player",width/2, height/2+height*1/8);
  
  //two player button
  text("Two Player",width/3, height/2+height*3/8);

  //Ai button
  text("AI",width/3*2, height/2+height*3/8);
  
  if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2+height*1/8-height/16&&mouseY<height/2+height*1/8+height/16&&mouseIsPressed){
    //when mouse clicks single player button, sets state to menu and calls setup, resets player one controls
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
    //when mouse clicks two player button, sets state to menu and calls setup, resets player one controls
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
    //when mouse clicks ai button, sets state to menu and calls setup
    gameMode="AI";
    state="Menu";
    setup();
  }
}

//this function does everything on the start screen
function startScreen(){
  //after the program is restarted, everything on the screen is displaced
  //this corrects that displacement
  if(restarted){
    translate(-1/2*width,-1/2*height);
  }

  //sets background
  background(0);
  image(menuBackground,0,0,windowWidth,windowHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(inconsolata);
  
  //sets stroke, size, and fill for title
  stroke(0);
  strokeWeight(5);
  textSize(100);
  fill(0,255,0);

  //title
  text("3D Snake",width/2, height/8);
  
  //buttons
  fill(200,0,0);
  rect(width/2, height/2, width/4, height/8);
  rect(width/2, height/2+height*1/4, width/4, height/8);

  //displays words
  noStroke();
  textSize(25);
  fill(0);
  text("Start Game",width/2, height/2);
  text("Main Menu",width/2, height/2+height*1/4);

  if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2-height/16&&mouseY<height/2+height/16&&mouseIsPressed){
    //if play is pressed
    if(gameMode==="Two Player"){
      //selects game type for two player
      state="Select Game Type"
      setup();
    }else{
      //starts game
      state="Play";
      setup();
    }
  }else if(mouseX>width/2-width/8&&mouseX<width/2+width/8&&mouseY>height/2+height*1/4-height/16&&mouseY<height/2+height*1/4+height/16&&mouseIsPressed){
    //returns to menu screen
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

  //leaderboard
  if(gameMode==="Single Player"){
    if(mouseX>width*15/16-25&&mouseX<width*15/16+25&&mouseY>height*1/8-25/2+100&&mouseY<height*1/8+25/2+100){
      leaderBoardIcon(true, 100);
      if(mouseIsPressed){
        //when mouse clicks store icon, sets state to store and calls setup again to open store screen
        state="LeaderBoard";
        leaderBoardFrom = 'Menu';
        setup();
      }
    }else{
      leaderBoardIcon(false, 100);
    }
  }
}

//draws the setting icon
function settingIcon(on){
  push();
  translate(width*1/16, height*1/8);
  noStroke();
  if(!on){
    fill(0,0,255);
  }else{
    fill(0,255,0);
  }
  for(var i=0; i<12; i++){
    ellipse(0, 0, 50, 10);
    rotate(10);
  }
  fill(200,0,0);
  circle(0, 0, 34);
  pop();
}

//draws the store icon
function StoreIcon(on){
  push();
  translate(width*15/16, height*1/8);
  if(!on){
    fill(200,0,0);
    stroke(0,0,255);
  }else{
    fill(200,0,0);
    stroke(0,255,0);
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
  
  positionP2 = [0,gameSize*50,0];
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
  shadowFoodPosition = [];
}

//function allows the user to select a game mode to player in
function selectGameType(){
  //after the program is restarted, everything on the screen is displaced
  //this corrects that displacement  
  if(restarted){
    translate(-1/2*width,-1/2*height);
  }

  //background
  background(0);
  image(menuBackground,0,0,windowWidth,windowHeight);
  fill(50,255,50);
  textSize(75);
  text("Select Game Mode", width/2, height/10);

  noStroke();
  //survival game mode
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
  }else 
  //points game mode
  if(mouseX>width/2+width/4-width/8&&mouseX<width/2+width/4+width/8&&mouseY>height/2-height/8-height/16&&mouseY<height/2-height/8+height/16){
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
  
  //text for each game mode describes what they do
  textSize(40);
  fill(0);
  text("Survival", width/2-width/4, height/2-height/8);
  text("Points", width/2+width/4, height/2-height/8);

  fill(255,165,0);
  textSize(30);
  text("Play aginst your", width/2-width/4, height*16/32);
  text("opponent until", width/2-width/4, height*18/32);
  text("one of you perishes.", width/2-width/4, height*20/32);

  textSize(30);
  text("Play aginst your opponent", width/2+width/4, height*16/32);
  text("to see who can eat the", width/2+width/4, height*18/32);
  text("most food in a limited", width/2+width/4, height*20/32);
  text("amount of time.", width/2+width/4, height*22/32);

  text("Players respawn if they die.", width/2+width/4, height*26/32);
}

//this function does everything on the options screen
function optionMenu(){
  background(0);
  fill(255,165,0);
  
  //after the program is restarted, everything on the screen is displaced
  //this corrects that displacement
  if(restarted){
    translate(-1/2*width,-1/2*height);
  }
  image(menuBackground,0,0,windowWidth,windowHeight);
  
  //writes the instructions on screen
  textAlign(LEFT, TOP);
  textFont(inconsolata);
  strokeWeight(1);
  stroke(255,165,0);
  textSize(25);

  //displays controls
  controls();
  
  if(gameMode!=="AI"){
    //makes the difficulty bar and option for axis help to people playing
    difficultyBar();
    axisHelpButton();
  }
  //bar to select border size
  gameBar();
  
  //red back button
  stroke(0);
  fill(255,0,0);
  rectMode(CENTER);
  rect(width*0.9,-125, 30, 20)
  fill(255);
  stroke(255);
  textSize(20)
  if(gameMode==="AI"){
    text("X", width*0.9-5, -125-10);
  }else{
    text("X", width*0.9, -125);
  }
  if(mouseX>width*0.9-15&&mouseX<width*0.9+15&&mouseY>38&&mouseY<60&&mouseIsPressed){
    state="Menu";
    changingBingingsP1=false;
    changingBingingsP2=false;
    setup();
  }
  
  //translates the origin back to the top left of the screen
  translate(0,-25*instructionsP1.length);
}

//creates bar to set the size of the border
function gameBar(){
  fill(0,0,200);
  stroke(0);
  strokeWeight(3);
  push();
  translate(50,0);
  //game size slider bar
  rect(225+300, 300, 250, 20);
  
  //notches on slider bar
  fill(255,165,0);
  stroke(255,165,0);
  strokeWeight(1);
  for(var j=0; j<11; j++){
    rect(100+25*j+300, 300, 5, 20);
  }
  
  //text for size
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Area of Play", 225+300, 250);
  textSize(15);
  text("Small", 100+300, 325);
  text("Medium", 225+300, 325);
  text("Large", 350+300, 325);
  
  //the slider
  stroke(0);
  strokeWeight(2);
  fill(255,185,0);
  rect(gameSliderX, 300, 9, 30);
  
  //if the mouse is down on any part of the bar, the slider will move to that position
  if(mouseX>100+350&&mouseX<350+350&&mouseY>474-12&&mouseY<474+12&&mouseIsPressed){
    gameSliderX=mouseX-50;
  }else 
  //when the mouse is released, the slider will snap to its nearest notch
  //each notch changes the size of the game
  if(gameSliderX<100+300+25/2){
    gameSliderX=100+300;
    gameSize = 3;
  }else if(gameSliderX>=100+300+25/2&&gameSliderX<100+300+25/2*3){
    gameSliderX=100+300+25;
    gameSize = 5;
  }else if(gameSliderX>=100+300+25/2*3&&gameSliderX<100+300+25/2*5){
    gameSliderX=100+300+25*2;
    gameSize = 7;
  }else if(gameSliderX>=100+300+25/2*5&&gameSliderX<100+300+25/2*7){
    gameSliderX=100+300+25*3;
    gameSize = 9;
  }else if(gameSliderX>=100+300+25/2*7&&gameSliderX<100+300+25/2*9){
    gameSliderX=100+300+25*4;
    gameSize = 11;
  }else if(gameSliderX>=100+300+25/2*9&&gameSliderX<100+300+25/2*11){
    gameSliderX=100+300+25*5;
    gameSize = 13;
  }else if(gameSliderX>=100+300+25/2*11&&gameSliderX<100+300+25/2*13){
    gameSliderX=100+300+25*6;
    gameSize = 15;
  }else if(gameSliderX>=100+300+25/2*13&&gameSliderX<100+300+25/2*15){
    gameSliderX=100+300+25*7;
    gameSize = 17;
  }else if(gameSliderX>=100+300+25/2*15&&gameSliderX<100+300+25/2*17){
    gameSliderX=100+300+25*8;
    gameSize = 19;
  }else if(gameSliderX>=100+300+25/2*17&&gameSliderX<100+300+25/2*19){
    gameSliderX=100+300+25*9;
    gameSize = 21;
  }else if(gameSliderX>=100+300+25/2*19){
    gameSliderX=100+300+25*10;
    gameSize = 23;
  }
  pop();
}

function difficultyBar(){
  fill(0,0,200);
  stroke(0);
  strokeWeight(3);
  //difficulty slider bar
  rect(225, 300, 250, 20);
  
  //notches on slider bar
  fill(255,165,0);
  stroke(255,165,0);
  strokeWeight(1);
  for(var j=0; j<11; j++){
    rect(100+25*j, 300, 5, 20);
  }
  
  //text for difficulty
  textAlign(CENTER, CENTER);
  text("Difficulty", 225, 250);
  textSize(15);
  text("Easy", 100, 325);
  text("Normal", 225, 325);
  text("Hard", 350, 325);
  if(gameMode==="Single Player"){
    text("Less Money", 100, 350);
    text("More Money", 350, 350);
  }
  
  //the slider
  stroke(0);
  strokeWeight(2);
  fill(255,185,0);
  rect(sliderX, 300, 9, 30);
  
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

//function creats button to set the axis help on or off
function axisHelpButton(){
  //if help is on, button is green. otherwise red
  if(axisHelp){
    fill(0,255,0);
  }else{
    fill(255,0,0);
  }
  stroke(0);
  rect(100,400,24,24);

  fill(255,165,0);
  stroke(255,165,0);
  strokeWeight(1);
  textSize(25);
  //if help is on, text says disable. otherwise enable
  if(axisHelp){
    text("Disable Axis Help", 250, 400);
  }else{
    text("Enable Axis Help", 250, 400);
  }
  //button is activated in the function mouseReleased
}

//displays controls for the different game modes
function controls(){
  if(gameMode==="Single Player"){
    changePlayer1Bindings();
  }else if(gameMode==="Two Player"){
    changePlayer1Bindings();
    changePlayer2Bindings();
    translate(-250,0);
  }else{
    //ai
    text("Controls:", 100, 100);
    translate(0, 25);
    text("UpArrow = Increase Simulation Speed", 100, 100);
    translate(0, 25);
    text("DownArrow = Decrease Simulation Speed", 100, 100);
    translate(0, 125);
  }
}

//displays instructions and allows to re-bind them
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
    stroke(0);
    strokeWeight(3);
    fill(0,0,255);
    rect(200, 150, 200, 30);

    fill(255,165,0);
    stroke(255,165,0);
    strokeWeight(1);
    text("Change Bindings", 105, 135);
  }else{
    text("Click box to", 105, 135);
    text("set new binding.", 105, 165);
    stroke(0);
  
    //left binding
    if(mouseX>75-7&&mouseX<75+7&&mouseY>150-19&&mouseY<150-5&&mouseIsPressed){
      //sets binding change to true for whichever button is pressed
      leftBindP1=true;
      rightBindP1=false;
      forwardBindP1=false;
      backBindP1=false;
      upBindP1=false;
      downBindP1=false;
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=false;
      downBindP2=false;
    }
    //when button for changing is active, the next button pressed is bound to that control
    if(leftBindP1===true){
      fill(255,255,0);
      rect(75, -25-12, 14, 14);
      //keys are labeled up to 222, so it checks every key to see which is pressed
      for(var k=0; k<=222; k++){
        if(keyIsDown(k)&&k!==p1Controls.lKeyCode&&k!==p1Controls.rKeyCode&&k!==p1Controls.fKeyCode&&k!==p1Controls.bKeyCode&&k!==p1Controls.uKeyCode&&k!==p1Controls.dKeyCode&&k!==p2Controls.lKeyCode&&k!==p2Controls.rKeyCode&&k!==p2Controls.fKeyCode&&k!==p2Controls.bKeyCode&&k!==p2Controls.uKeyCode&&k!==p2Controls.dKeyCode){
          //sets new key values
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
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=false;
      downBindP2=false;
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
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=false;
      downBindP2=false;
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
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=false;
      downBindP2=false;
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
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=false;
      downBindP2=false;
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
      leftBindP2=false;
      rightBindP2=false;
      forwardBindP2=false;
      backBindP2=false;
      upBindP2=false;
      downBindP2=false;
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

//displays instructions and allows to re-bind them
function changePlayer2Bindings(){
  if(mouseX>100+250&&mouseX<300+250&&mouseY>135+175&&mouseY<165+175&&mouseIsPressed){
    changingBingingsP2=true;
  }

  translate(250, -25*instructionsP1.length);
  textAlign(LEFT, TOP);
  textFont(inconsolata);

  strokeWeight(1);
  stroke(255,165,0);
  fill(255,165,0);
  textSize(25);
  //for loop allows for easy changes to the instructions
  for(var i=0; i<instructionsP2.length; i++){
    text(instructionsP2[i], 100, 100);
    translate(0, 25);
  }
  
  if(changingBingingsP2===false){
    //button for key bindings
    stroke(0);
    strokeWeight(3);
    fill(0,0,255);
    rect(200, 150, 200, 30);
    
    fill(255,165,0);
    stroke(255,165,0);
    strokeWeight(1);
    text("Change Bindings", 105, 135);
  }else{
    text("Click box to", 105, 135);
    text("set new binding.", 105, 165);
    stroke(0);
  
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

//displays everything in the store
function storeMenu(){
  background(0);
  
  //after the program is restarted, everything on the screen is displaced
  //this corrects that displacement
  if(restarted){
    translate(-1/2*width,-1/2*height);
  }

  //background
  image(menuBackground,0,0,windowWidth,windowHeight);

  //sets store to display skins when skins is pressed
  if(mouseX>width/2&&mouseX<width/2+200&&mouseY>height*3/8-25&&mouseY<height*3/8+25&&mouseIsPressed){
    store = "Skins";
  }

  //sets store to display hats when hats is pressed
  if(mouseX>width/2&&mouseX<width/2+200&&mouseY>height*5/8-25&&mouseY<height*5/8+25&&mouseIsPressed){
    store = "Hats";
  }

  strokeWeight(3);
  fill(0,0,255);
  //colors stroke to show which store is open
  if(store==="Skins"){
    stroke(255,255,0);
  }else{
    stroke(0,0,255);
  }
  //skins button
  rect(width/2+100, height*3/8, 200, 50);
  strokeWeight(1);
  stroke(255,165,0);
  fill(255,165,0);
  text("Skins", width/2+100, height*3/8);

  strokeWeight(3);
  fill(0,0,255);
  //colors stroke to show which store is open
  if(store==="Hats"){
    stroke(255,255,0);
  }else{
    stroke(0,0,255);
  }
  //hats button
  rect(width/2+100, height*5/8, 200, 50);
  strokeWeight(1);
  stroke(255,165,0);
  fill(255,165,0);
  text("Hats", width/2+100, height*5/8);

  //displays active store
  if(store==="Skins"){
    displaySkinStore();
  }else{
    displayHatStore();
  }

  //red back rectangle, changes the state back to menu
  fill(255,0,0);
  rectMode(CENTER);
  stroke(0);
  rect(width*0.9, 50, 30, 20);
  fill(255);
  stroke(255);
  textSize(20)
  text("X", width*0.9, 50);
  if(mouseX>width*0.9-15&&mouseX<width*0.9+15&&mouseY>38&&mouseY<60&&mouseIsPressed){
    state="Menu";
    setup();
  }

  //displays money on right side
  stroke(255,165,0);
  fill(255, 165, 0);
  text("Money: " + money, width*0.9, height*0.2);
  
  pointerDot();
}

//displays the skins store
function displaySkinStore(){
  //creates creates the smallest possible rectangular grid based on the number of skins available
  if(skins.length<3){
    skinStore = [[]]
  }else if(skins.length<7){
    skinStore = [[],[]]
  }else if(skins.length<13){
    skinStore = [[],[],[]]
  }else if(skins.length<21){
    skinStore = [[],[],[],[]]
  }else if(skins.length<31){
    skinStore = [[],[],[],[],[]]
  }
  let h = 0;
  for(var i=0; i<ceil(sqrt(skins.length)); i++){
    for(var j=0; j<floor(sqrt(skins.length)+0.42); j++){
      //sets number of rows and columns in grid
      skinRows = j+1;
      skinCols = i+1;

      //pushes skins into the grid
      if(skinStore[i]===undefined){
        skinStore[j][i] = skins[h];
      }else{
        skinStore[i][j] = skins[h];
      }
      h++;
    }
  }

  //displays grid
  rectMode(LEFT, TOP);
  let cellSize = height/2/skinCols;
  //nested for loop doubles grid size(-1) to allow for spaces between items
  for (let y = 0; y < skinRows*2-1; y++) {
    for (let x = 0; x < skinCols*2-1; x++) {
      //only displays enough for the size of the grid
      if(y%2===0&&x%2===0){
        noStroke();
        fill(220);
        //if a part of the array is not filled, places a sqaure same color as background over top
        if(skinStore[y/2][x/2]!==undefined){
          enterItemSkins(x/2, y/2, x*cellSize+cellSize, y*cellSize+cellSize, cellSize*1.5);
        }
      }
    }
  }
}

//displays hats store
function displayHatStore(){
  //creates creates the smallest possible rectangular grid based on the number of skins available
  if(hats.length<3){
    hatStore = [[]]
  }else if(hats.length<7){
    hatStore = [[],[]]
  }else if(hats.length<13){
    hatStore = [[],[],[]]
  }else if(hats.length<21){
    hatStore = [[],[],[],[]]
  }else if(hats.length<31){
    hatStore = [[],[],[],[],[]]
  }
  let h = 0;
  for(var i=0; i<ceil(sqrt(hats.length)); i++){
    for(var j=0; j<floor(sqrt(hats.length)+0.42); j++){
      //sets number of rows and columns in grid
      hatRows = j+1;
      hatCols = i+1;

      //pushes hats into the grid
      if(hatStore[i]===undefined){
        hatStore[j][i] = hats[h];
      }else{
        hatStore[i][j] = hats[h];
      }
      h++;
    }
  }

  //displays grid
  rectMode(LEFT, TOP);
  let cellSize = height/2/hatCols;
  //nested for loop doubles grid size(-1) to allow for spaces between items
  for (let y = 0; y < hatRows*2-1; y++) {
    for (let x = 0; x < hatCols*2-1; x++) {
      //only displays enough for the size of the grid
      if(y%2===0&&x%2===0){
        noStroke();
        fill(220);
        //if a part of the array is not filled, places a sqaure same color as background over top
        if(hatStore[y/2][x/2]!==undefined){
          enterItemHats(x/2, y/2, x*cellSize+cellSize, y*cellSize+cellSize, cellSize*1.5);
        }
      }
    }
  }
}

//displays a skin and its information into the store
function enterItemSkins(col, row, centerX, centerY, wh){
  textAlign(CENTER, CENTER);
  textSize(wh*1/8);
  
  //displays if the item is active, bought, or the cost of the item
  fill(255, 165, 0);
  //displays text
  if(skinStore[row][col]!==undefined&&skinStore[row][col].bought==='no'){
    text("Cost: " + skinStore[row][col].cost, centerX, centerY+wh*4/16);
  }else if(skinStore[row][col]!==undefined&&skinStore[row][col].bought==='yes'&&skinStore[row][col].active==='no'){
    text("Bought", centerX, centerY+wh*4/16);
  }else{
    text("Active", centerX, centerY+wh*4/16);
  }
  //checks if the mouse is clicked on the button
  if(mouseX>centerX-wh/2&&mouseX<centerX+wh/2&&mouseY>centerY-wh/2&&mouseY<centerY+wh/2&&mouseIsPressed){
    //if the skin is not bought and the user has enough to buy it...
    if(skinStore[row][col].bought==='no'&&money>=skinStore[row][col].cost){
      for (let y = 0; y < skinRows; y++) {
        for (let x = 0; x < skinCols; x++) {
          //sets all other skins to not active
          if(skinStore[y][x]!==undefined){
            skinStore[y][x].active='no';
          }
        }
      }
      //subtracts money
      money-=skinStore[row][col].cost;
      //set current skin to its name
      skin = skinStore[row][col].name;
      //changes skin's bought and active to 'yes'
      skinStore[row][col].bought='yes';
      skinStore[row][col].active='yes';
    }else 
    //if the skin is bought...
    if(skinStore[row][col].bought==='yes'){
      for (let a = 0; a < skinRows; a++) {
        for (let b = 0; b < skinCols; b++) {
          if(skinStore[a][b]!==undefined){
            //sets all other skins to not active
            skinStore[a][b].active='no';
          }
        }
      }
      //set current skin to its name
      skin = skinStore[row][col].name;
      //changes skin's active to 'yes'
      skinStore[row][col].active='yes';
    }
  }

  //displays the name of the skin
  fill(255,165,0);
  stroke(255,165,0);
  if(skinStore[row][col]!==undefined){
    text(skinStore[row][col].name, centerX, centerY+wh*2/16);
  }

  //displays picture of the skin
  if(skinStore[row][col]!==undefined){
    image(skinStore[row][col].picture, centerX-wh/4, centerY-wh*1/2,wh/2,wh/2);
  }
}

//displays a hat and its information into the store
function enterItemHats(col, row, centerX, centerY, wh){
  textAlign(CENTER, CENTER);
  textSize(wh*1/8);
  
  //displays if the item is active, bought, or the cost of the item
  fill(255, 165, 0);
  //displays text
  if(hatStore[row][col]!==undefined&&hatStore[row][col].bought==='no'){
    text("Cost: " + hatStore[row][col].cost, centerX, centerY+wh*4/16);
  }else if(hatStore[row][col]!==undefined&&hatStore[row][col].bought==='yes'&&hatStore[row][col].active==='no'){
    text("Bought", centerX, centerY+wh*4/16);
  }else{
    text("Active", centerX, centerY+wh*4/16);
  }
  //checks if the mouse is clicked on the button
  if(mouseX>centerX-wh/2&&mouseX<centerX+wh/2&&mouseY>centerY-wh/2&&mouseY<centerY+wh/2&&mouseIsPressed){
    //if the hat is not bought and the user has enough to buy it...
    if(hatStore[row][col].bought==='no'&&money>=hatStore[row][col].cost){
      for (let y = 0; y < hatRows; y++) {
        for (let x = 0; x < hatCols; x++) {
          //sets all other hats to not active
          if(hatStore[y][x]!==undefined){
            hatStore[y][x].active='no';
          }
        }
      }
      //subtracts money
      money-=hatStore[row][col].cost;
      //set current hat to its name
      hat = hatStore[row][col].name;
      //changes hat's bought and active to 'yes'
      hatStore[row][col].bought='yes';
      hatStore[row][col].active='yes';
    }else 
    //if the hat is bought...
    if(hatStore[row][col].bought==='yes'){
      for (let a = 0; a < hatRows; a++) {
        for (let b = 0; b < hatCols; b++) {
          if(hatStore[a][b]!==undefined){
            //sets all other hats to not active
            hatStore[a][b].active='no';
          }
        }
      }
      //set current hat to its name
      hat = hatStore[row][col].name;
      //changes hat's active to 'yes'
      hatStore[row][col].active='yes';
    }
  }

  //displays the name of the hat
  fill(255,165,0);
  stroke(255,165,0);
  if(hatStore[row][col]!==undefined){
    text(hatStore[row][col].name, centerX, centerY+wh*2/16);
  }

  //displays picture of the hat
  if(hatStore[row][col]!==undefined){
    image(hatStore[row][col].picture, centerX-wh/4, centerY-wh*1/2,wh/2,wh/2);
  }
}

//sets music, background, creates board and starts the game
function gamePlay(){
  //plays game music
  menuMusic.pause();
  menuMusic.currentTime = 0;
  gameMusic.play();

  //sets game background
  background(0);
  push();
  if(img===1){
    translate(1300,2000,-500);
  }else{
    translate(1000,1500,-1000);
  }
  rotateY(-0.65);
  rotateX(0.63);
  rotateZ(-0.02);
  if(skin!=="Line"){
    image(gameBackground, 6500/-2, 3600/-2, 6500, 3600);
  }
  pop();
  
  createBoard();

  gameStart();
}

//the board is simply 12 lines to make a large box, the game is played within
function createBoard(){
  strokeWeight(5);
  fill(0,0,0);
  stroke(255,0,0);
  line(-25,-25,25,gameSize*50+25,-25,25);
  line(-25,-25,25,-25,gameSize*50+25,25);
  line(-25,-25,25,-25,-25,gameSize*-50-25);
  
  line(gameSize*50+25,gameSize*50+25,gameSize*-50-25,gameSize*50+25,gameSize*50+25,25);
  line(gameSize*50+25,gameSize*50+25,gameSize*-50-25,gameSize*50+25,-25,gameSize*-50-25);
  line(gameSize*50+25,gameSize*50+25,gameSize*-50-25,-25,gameSize*50+25,gameSize*-50-25);
  
  line(-25,gameSize*50+25,25,gameSize*50+25,gameSize*50+25,25);
  line(-25,gameSize*50+25,25,-25,gameSize*50+25,gameSize*-50-25);
  
  line(gameSize*50+25,-25,gameSize*-50-25,gameSize*50+25,-25,25);
  line(gameSize*50+25,-25,gameSize*-50-25,-25,-25,gameSize*-50-25);
  
  line(-25,-25,gameSize*-50-25,-25,gameSize*50+25,gameSize*-50-25);
  
  line(gameSize*50+25,-25,25,gameSize*50+25,gameSize*50+25,25);
}

//every part of the game the user plays is in this function
function gameStart(){
  //the difficulty changes the framerate
  frameRate(difficulty);
  
  //resets values
  p1Died=false;
  p2Died=false;
  
  //counts time for points gamemode
  if(firstIteration&&gameType==="Points"){
    gameTimeStarted = frameCount;
    time = 101;
  }
  
  
  orbitControl();
  strokeWeight(2);
  stroke(0);
  
  //updates smoke skin
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
      //sets body size here
      if(bodyPosition.length>(snakeLength-1)*3){
        bodyPosition.splice(0,3);
      }
      position[0]+=push0;
      position[1]+=push1;
      position[2]+=push2;
    }
    moveSnake();
    
    //finds neighboring positions
    let arrayOfNeighborPositions = neighboringPositions();
    //calculates the move to make
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
        //sets body size here
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
        //sets body size here
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
        //sets body size here
        if(bodyPositionP2.length>(snakeLengthP2-1)*3){
          bodyPositionP2.splice(0,3);
        }
        positionP2[0]+=push0P2;
        positionP2[1]+=push1P2;
        positionP2[2]+=push2P2;
      }
      moveSnakeP2();
      //timer
      if(gameType==="Points"){
        timer();
      }
    }
  }
  firstIteration=false;
}

//logic for timer
function timer(){
  //finds out when a second has passed
  if((frameCount-gameTimeStarted)%difficulty===0){
    time--;
  }
  //ends game when time is up
  if(time<=0){
    state = "Game Over";
    pop();
    setup();
  }
}

//moves snake
function moveSnake(){
  //if the position is outside the border, state changes to game over and calls setup
  if(position[0]<0||position[0]>gameSize*50||position[1]<0||position[1]>gameSize*50||position[2]>0||position[2]<-gameSize*50){
    playerHasDied(1);
  }
  //checks if the position is equal to any of the body positions
  //if so, state changes to game over and calls setup
  for(var j=0; j<bodyPosition.length; j+=3){
    if((position[0]===bodyPosition[j]&&position[1]===bodyPosition[j+1]&&position[2]===bodyPosition[j+2])||(position[0]+push[0]===bodyPositionP2[j]&&position[1]+push[1]===bodyPositionP2[j+1]&&position[2]+push[2]===bodyPositionP2[j+2])&&p1Died===false){
      playerHasDied(1);
    }
  }
  //if heads collide
  if(position[0]===positionP2[0]&&position[1]===positionP2[1]&&position[2]===positionP2[2]&&gameMode==="Two Player"){
    playerHasDied(1);
    playerHasDied(2); 
  }
  for(var i=bodyPosition.length-3; i>=0; i-=3){
    push();
    translate(bodyPosition[i+0], bodyPosition[i+1], bodyPosition[i+2]);
    //places body
    placeBox(bodyPosition[i+0],bodyPosition[i+1],bodyPosition[i+2]);
    pop();
  }
  push();
  translate(position[0], position[1], position[2]);
  //places head
  placeBox(position[0],position[1],position[2],true);  
  pop();
  //applies axis help if activated
  if(gameMode!=="AI"&&axisHelp){
    addVisibility();
  }
}

//function shows the snake on screen
function placeBox(x1,y1,z1,head){
  let x = x1;
  let y = y1;
  let z = z1;
  //if the position is 1 box away from the border, place a box with the color red
  if(x<=0||x>=gameSize*50||y<=0||y>=gameSize*50||z<=-gameSize*50||z>=0){
    fill(255,0,0,100);
    applySkin(true, false, false);
    applyHat(head);
  }else 
  //if the position is 2-3 boxs away from the border, place a box with the color blue
  if(x<=100||x>=(gameSize-2)*50||y<=100||y>=(gameSize-2)*50||z<=-(gameSize-2)*50||z>=-100){
    fill(0,0,255,100);
    applySkin(false, false, true);
    applyHat(head);
  }else{
    //otherwise, place a box with the color green
    fill(0,255,0,100);
    applySkin(false, true, false);
    applyHat(head);
  }
  //the color scheme is a warning system for the user, tells them how close they are to the border
}

function moveSnakeP2(){
  //if the positionP2 is outside the border, state changes to game over and calls setup
  if(positionP2[0]<0||positionP2[0]>gameSize*50||positionP2[1]<0||positionP2[1]>gameSize*50||positionP2[2]>0||positionP2[2]<-gameSize*50){
    playerHasDied(2);
  }
  //checks if the positionP2 is equal to any of the body positions
  //if so, state changes to game over and calls setup
  for(var j=0; j<bodyPosition.length; j+=3){
    if((positionP2[0]===bodyPosition[j]&&positionP2[1]===bodyPosition[j+1]&&positionP2[2]===bodyPosition[j+2])||(positionP2[0]+push[0]===bodyPositionP2[j]&&positionP2[1]+push[1]===bodyPositionP2[j+1]&&positionP2[2]+push[2]===bodyPositionP2[j+2])&&p1Died===false){
      playerHasDied(2);
    }
  }
  //if heads collide
  if(position[0]===positionP2[0]&&position[1]===positionP2[1]&&position[2]===positionP2[2]&&gameMode==="Two Player"){
    playerHasDied(1);
    playerHasDied(2); 
  }
  for(var i=bodyPositionP2.length-3; i>=0; i-=3){
    push();
    translate(bodyPositionP2[i+0], bodyPositionP2[i+1], bodyPositionP2[i+2]);
    placeBoxP2(bodyPositionP2[i+0],bodyPositionP2[i+1],bodyPositionP2[i+2]);
    pop();
  }
  push();
  translate(positionP2[0], positionP2[1], positionP2[2]);
  placeBoxP2(positionP2[0],positionP2[1],positionP2[2],true);
  pop();
  //applies axis visibility if activated
  if(gameMode!=="AI"&&axisHelp){
    addVisibilityP2();
  }
}

//function shows the snake on screen
function placeBoxP2(x1,y1,z1){
  let x = x1;
  let y = y1;
  let z = z1;
  stroke(0);
  strokeWeight(3);
  //if the position is 1 box away from the border, place a box with the color red
  if(x<=0||x>=gameSize*50||y<=0||y>=gameSize*50||z<=-gameSize*50||z>=0){
    fill(255,0,0,100);
    box(50);
  }else 
  //if the position is 2-3 boxs away from the border, place a box with the color blue
  if(x<=100||x>=(gameSize-2)*50||y<=100||y>=(gameSize-2)*50||z<=-(gameSize-2)*50||z>=-100){
    fill(0,0,255,100);
    box(50);
  }else{
    //otherwise, place a box with the color green
    fill(0,255,0,100);
    box(50);
  }
  //the color scheme is a warning system for the user, tells them how close they are to the border
}

//applys the skin with the input of which color this body part is
function applySkin(r, g, b){
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
    }else if(skin==="Scales"){
      box(50);
        if(r){
          applyScales(-25,-25,-25,1.58,0,redScales);
          applyScales(-25,25,-25,1.58,0,redScales);
          applyScales(-25,-25,-25,0,0,redScales);
          applyScales(-25,-25,25,0,0,redScales);
          applyScales(-25,-25,25,0,1.58,redScales);
          applyScales(25,-25,25,0,1.58,redScales);
        }else if(b){
          applyScales(-25,-25,-25,1.58,0,blueScales);
          applyScales(-25,25,-25,1.58,0,blueScales);
          applyScales(-25,-25,-25,0,0,blueScales);
          applyScales(-25,-25,25,0,0,blueScales);
          applyScales(-25,-25,25,0,1.58,blueScales);
          applyScales(25,-25,25,0,1.58,blueScales);
        }else if(g){
          applyScales(-25,-25,-25,1.58,0,greenScales);
          applyScales(-25,25,-25,1.58,0,greenScales);
          applyScales(-25,-25,-25,0,0,greenScales);
          applyScales(-25,-25,25,0,0,greenScales);
          applyScales(-25,-25,25,0,1.58,greenScales);
          applyScales(25,-25,25,0,1.58,greenScales);
        }
    }else{
      //no skin
      box(50);
    }
  }else{
    box(50);
  }
}

//applies the hat with the input of which box is the head
function applyHat(head){
  //creates line skin on box
  if(gameMode!=="Two Player"){
    if(hat==="Eyes"){
      //places eyes on the head of the snake based on the direction it's going
      if(head){
        if(secondPosition[0]===position[0]-50){
          drawEye(25,-30,10,5,0,0,5,10,5);
          drawEye(25,-30,-10,5,0,0,5,10,5);
        }
        if(secondPosition[0]===position[0]+50){
          drawEye(-25,-30,10,-5,0,0,5,10,5);
          drawEye(-25,-30,-10,-5,0,0,5,10,5);
        }
        if(secondPosition[2]===position[2]-50){
          drawEye(10,-30,25,0,0,5,5,10,5);
          drawEye(-10,-30,25,0,0,5,5,10,5);
        }
        if(secondPosition[2]===position[2]+50){
          drawEye(10,-30,-25,0,0,-5,5,10,5);
          drawEye(-10,-30,-25,0,0,-5,5,10,5);
        }
        if(secondPosition[1]===position[1]-50){
          drawEye(10,30,25,0,5,0,5,5,10);
          drawEye(-10,30,25,0,5,0,5,5,10);
        }
        if(secondPosition[1]===position[1]+50){
          drawEye(10,-30,25,0,-5,0,5,5,10);
          drawEye(-10,-30,25,0,-5,0,5,5,10);
        }
      }
    }else if(hat==="Top Hat"){
      //places a top hat on the head based on the direction it is going
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
    }else if(hat==="Train"){
      //places smoke stake on the head based on the direction the snake is going
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
          //sends smoke out of smoke stack
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
          translate(0,0,7.5);
          //sends smoke out of smoke stack
          let mySmoke = new Smoke(position[0],position[1],position[2],true);
          theSmoke.push(mySmoke);
          pop();
        }
      }
    }
  }else{
    box(50);
  }
}

//rotates and translates to correct position to add scales
function applyScales(x,y,z,rX,rY,c){
  push();
  translate(x,y,z);
  rotateX(rX);
  rotateY(rY);
  image(c,0,0,50,50,0,0,200,200);
  pop();
}

//creates smoke
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
    //moves to current position
    if(this.upDown){
      translate(this.x,this.y,this.z+50);
    }else{
      translate(this.x,this.y-50,this.z);
    }
    //places smoke and translates by its waver amount, to appear more like smoke
    sphere(this.radius);
    translate(25+this.waverX,-12.5+this.waverY,0+this.waverZ);
    sphere(this.radius);
    translate(0+this.waverX,25+this.waverY,-12.5+this.waverZ);
    sphere(this.radius);
    translate(-12.5+this.waverX,0+this.waverY,25+this.waverZ);
    sphere(this.radius);
    pop();
  }

  //updates values
  update() {
    this.y-=5;
    this.radius-=1;
    this.alpha-=10;
    this.x+=random(1,-1);
    this.waverX += random(-1,1);
    this.waverY += random(-1,1);
    this.waverZ += random(-1,1);
  }

  //checks if smoke has dissapated
  isDone() {
    return this.alpha <= 0;
  }
}

function drawEye(x,y,z,aX,aY,aZ,rX,rY,rZ){
  push();
  
  //translates to position of eye
  translate(x,y,z);
  
  //places eyes
  fill(255);
  stroke(255);
  //white eye
  ellipsoid(rX,rY,rZ);
  fill(0);
  stroke(0);
  translate(aX,aY,aZ);
  //pupil
  ellipsoid(rX/2,rY/2,rZ/2);
  pop();
}

function addVisibility(){
  //Player 1
  strokeWeight(5);
  //places x axis
  stroke(255,0,0);
  if(position[1]===foodPosition[1]&&position[2]===foodPosition[2]){
    //if snake is on same x axis, line stops at food
    if(position[0]<foodPosition[0]){
      line(-25,position[1],position[2],foodPosition[0]-25,position[1],position[2]);
    }else{
      line(foodPosition[0]+25,position[1],position[2],gameSize*50+25,position[1],position[2]);
    }
  }else{
    line(-25,position[1],position[2],gameSize*50+25,position[1],position[2]);
  }
  //places y axis
  stroke(0,0,255);
  if(position[0]===foodPosition[0]&&position[2]===foodPosition[2]){
    //if snake is on same y axis, line stops at food
    if(position[1]<foodPosition[1]){
      line(position[0],-25,position[2],position[0],foodPosition[1]-25,position[2]);
    }else{
      line(position[0],foodPosition[1]+25,position[2],position[0],gameSize*50+25,position[2]);
    }
  }else{
    line(position[0],-25,position[2],position[0],gameSize*50+25,position[2]);
  }
  //places z axis
  stroke(0,255,0);
  if(position[0]===foodPosition[0]&&position[1]===foodPosition[1]){
    //if snake is on same z axis, line stops at food
    if(position[2]<foodPosition[2]){
      line(position[0],position[1],foodPosition[2]-25,position[0],position[1],gameSize*-50-25);
    }else{
      line(position[0],position[1],25,position[0],position[1],foodPosition[2]+25);
    }
  }else{
    line(position[0],position[1],25,position[0],position[1],gameSize*-50-25);
  }
}

function addVisibilityP2(){
  //x
  stroke(255,0,0);
  if(positionP2[1]===foodPosition[1]&&positionP2[2]===foodPosition[2]){
    if(positionP2[0]<foodPosition[0]){
      line(-25,positionP2[1],positionP2[2],foodPosition[0]-25,positionP2[1],positionP2[2]);
    }else{
      line(foodPosition[0]+25,positionP2[1],positionP2[2],gameSize*50+25,positionP2[1],positionP2[2]);
    }
  }else{
    line(-25,positionP2[1],positionP2[2],gameSize*50+25,positionP2[1],positionP2[2]);
  }
  //y
  stroke(0,0,255);
  if(positionP2[0]===foodPosition[0]&&positionP2[2]===foodPosition[2]){
    if(positionP2[1]<foodPosition[1]){
      line(positionP2[0],-25,positionP2[2],positionP2[0],foodPosition[1]-25,positionP2[2]);
    }else{
      line(positionP2[0],foodPosition[1]+25,positionP2[2],positionP2[0],gameSize*50+25,positionP2[2]);
    }
  }else{
    line(positionP2[0],-25,positionP2[2],positionP2[0],gameSize*50+25,positionP2[2]);
  }
  //z
  stroke(0,255,0);
  if(positionP2[0]===foodPosition[0]&&positionP2[1]===foodPosition[1]){
    if(positionP2[2]<foodPosition[2]){
      line(positionP2[0],positionP2[1],foodPosition[2]-25,positionP2[0],positionP2[1],gameSize*-50-25);
    }else{
      line(positionP2[0],positionP2[1],25,positionP2[0],positionP2[1],foodPosition[2]+25);
    }
  }else{
    line(positionP2[0],positionP2[1],25,positionP2[0],positionP2[1],gameSize*-50-25);
  }

}

//food function places food on screen and checks if the snake has eaten it
function food(){
  //there are two scenarios to check if the snake has eaten the food
  //the first checks the position ahead of the snake head
  //the second checks on the snake head
  //having these two scenarios will stop the snake from going straight through the food
  //when the snake has 'eaten' the food, a new piece will randomly be chosen
  if(position[0]+push0===foodPosition[0]&&position[1]+push1===foodPosition[1]&&position[2]+push2===foodPosition[2]){
    foodPosition[0]=ceil(random(-0.9,gameSize))*50;
    foodPosition[1]=ceil(random(-0.9,gameSize))*50;
    foodPosition[2]=floor(random(-1* gameSize,0.9))*50

    shadowFoodPosition[0] = foodPosition[0];
    shadowFoodPosition[1] = foodPosition[1];
    shadowFoodPosition[2] = foodPosition[2];
    snakeLength++;
    points++
  }
  if(position[0]===foodPosition[0]&&position[1]===foodPosition[1]&&position[2]===foodPosition[2]){
    foodPosition[0]=ceil(random(-0.9,gameSize))*50;
    foodPosition[1]=ceil(random(-0.9,gameSize))*50;
    foodPosition[2]=floor(random(-1* gameSize,0.9))*50

    shadowFoodPosition[0] = foodPosition[0];
    shadowFoodPosition[1] = foodPosition[1];
    shadowFoodPosition[2] = foodPosition[2];
    snakeLength++;
    points++
  }
  for(var j=0; j<=bodyPosition.length-3; j+=3){
    if(foodPosition[0]===bodyPosition[j]&&foodPosition[1]===bodyPosition[j+1]&&foodPosition[2]===bodyPosition[j+2]){
      foodPosition[0]=ceil(random(-0.9,gameSize))*50;
      foodPosition[1]=ceil(random(-0.9,gameSize))*50;
      foodPosition[2]=floor(random(-1* gameSize,0.9))*50

      shadowFoodPosition[0] = foodPosition[0];
      shadowFoodPosition[1] = foodPosition[1];
      shadowFoodPosition[2] = foodPosition[2];
    }
  }

  if(positionP2[0]+push0P2===foodPosition[0]&&positionP2[1]+push1P2===foodPosition[1]&&positionP2[2]+push2P2===foodPosition[2]){
    foodPosition[0]=ceil(random(0,gameSize))*50;
    foodPosition[1]=ceil(random(0,gameSize))*50;
    foodPosition[2]=floor(random(-gameSize,0.9))*50;
    snakeLengthP2++;
    pointsP2++;
  }
  if(positionP2[0]===foodPosition[0]&&positionP2[1]===foodPosition[1]&&positionP2[2]===foodPosition[2]){
    foodPosition[0]=ceil(random(0,gameSize))*50;
    foodPosition[1]=ceil(random(0,gameSize))*50;
    foodPosition[2]=floor(random(-gameSize,0.9))*50;
    snakeLengthP2++;
    pointsP2++;
  }
  for(var j=0; j<=bodyPositionP2.length-3; j+=3){
    if(foodPosition[0]===bodyPositionP2[j]&&foodPosition[1]===bodyPositionP2[j+1]&&foodPosition[2]===bodyPositionP2[j+2]){
      foodPosition[0]=ceil(random(0,gameSize))*50;
      foodPosition[1]=ceil(random(0,gameSize))*50;
      foodPosition[2]=floor(random(-gameSize,0.9))*50;
      snakeLengthP2++;
      pointsP2++;
    }
  }

  //places the food on screen
  let x = foodPosition[0];
  let y = foodPosition[1];
  let z = foodPosition[2];
  fill(255,0,0);
  stroke(0);
  strokeWeight(3);
  //moves origin to food position
  translate(x, y, z);
  box(50);
  //returns origin to 0,0,0
  translate(-1*x, -1*y, -1*z);
  stroke(2);
}

//when a player has died, depending on the gameMode and gameType it will display death screen or reset player
function playerHasDied(p){
  if(p===1){
    if(gameType==="Survival"){
      state = "Game Over";
      playerDeath = 1;
      pop();
      setup();
    }else if(gameType==="Points"){
      position = [0,0,0];
      secondPosition = [];
      bodyPosition = [];

      push0 = 50;
      push1 = 0;
      push2 = 0;
      push3 = 1;
      snakeLength = 3;
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
      positionP2 = [0,gameSize*50,0];
      secondPositionP2 = [];
      bodyPositionP2 = [];

      push0P2 = 50;
      push1P2 = 0;
      push2P2 = 0;
      push3P2 = 1;
      snakeLengthP2 = 3;
      p2Died=true;
    }else{
      state = "Game Over";
      pop();
      setup();
    }
  }
}

//labels every position on the board for the ai to follow
function labelPositions(){
  if(aiRestarted){
    currentPosition = [50,0,0];
  }else{
    currentPosition = [0,0,0];
  }

 let directionZ;

  //labels each layer 
  for(var y=0; y<gameSize+1; y++){
    if(y%2===0){
      createLayer('forward');
    }else{
      createLayer('back');
    }
    currentPosition[1]+=50;
  }
  
  
  currentPosition = [...currentPosition];
  currentPosition[0] = 0;
  currentPosition[1] = gameSize*50;
  currentPosition[2] = 0;

  //labels left wall to return back to starting space
  for(var j=0; j<gameSize+1; j++){
    for(var k=0; k<gameSize+1; k++){
      currentPosition = [...currentPosition];
      if(k!==0){
        if(directionZ==="forward"){
          currentPosition[2]+=50;
        }else{
          currentPosition[2]-=50;
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
}

//labels a layer
function createLayer(direction){
  for(var z=0; z>-(gameSize+1); z--){
    if(z%2===0){
      createRow('right');
    }else{
      createRow('left');
    }
    if(z!==-gameSize){
      if(direction==='forward'){
        currentPosition[2]-=50;
      }
      if(direction==='back'){
        currentPosition[2]+=50;
      }
    }
  }
}

//labels each row
function createRow(direction){
  for(var x=0; x<gameSize; x++){
    currentPosition = [...currentPosition];
    if(!bufferX){
      if(direction==="right"){
        currentPosition[0]+=50;
      }
      if(direction==="left"){
        currentPosition[0]-=50;
      }
    }else{
      bufferX = false;
    }
    orderOfPositions.push([...currentPosition]);
  }
  bufferX = true;
}

//creates a list of the neighboring positions
function neighboringPositions(){
  //checks if immediate neighbors are open
  let openR = right();
  let openL = left();
  let openF = forward();
  let openB = back();
  let openU = up();
  let openD = down();

  //finds the position number of neighboring positions that are open
  let positionR = rightPosition(openR);
  let positionL = leftPosition(openL); 
  let positionF = forwardPosition(openF); 
  let positionB = backPosition(openB); 
  let positionU = upPosition(openU); 
  let positionD = downPosition(openD); 

  //puts each open position into an array
  //if position is larger that current position, it goes into greater thatn array, otherwise less then array
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

  //sorts each array from smallest to largest
  let greaterArr = bubbleSort(neighborPositionsGreaterThan);
  let lessArr = bubbleSort(neighborPositionsLessThan);

  //orders all positions into one array from smallest skip to largest skip
  for(var i=0; i<lessArr.length; i++){
    greaterArr.push(lessArr[i]);
  }

  return greaterArr;
}

//checks neighbors to see if they are open
function right(){
  for(var i=0; i<=bodyPosition.length; i+=3){
    if(position[0]+50===gameSize*50+50||(position[0]+50===bodyPosition[i+0]&&position[1]===bodyPosition[i+1]&&position[2]===bodyPosition[i+2])){
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
    if(position[2]-50===-gameSize*50-50||(position[0]===bodyPosition[i+0]&&position[1]===bodyPosition[i+1]&&position[2]-50===bodyPosition[i+2])){
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
    if(position[1]+50===gameSize*50+50||(position[0]===bodyPosition[i+0]&&position[1]+50===bodyPosition[i+1]&&position[2]===bodyPosition[i+2])){
      return false;
    }
  }
  return true;
}

//finds position of open neighbors
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

//sorter
function bubbleSort(thisArray){
  let again = true;
  while(again){
    again = false;
    for(var i=0; i<thisArray.length-1; i++){
      if(thisArray[i]>thisArray[i+1]){
        //swap
        let hold = thisArray [i];
        thisArray[i]=thisArray[i+1];
        thisArray[i+1]=hold;
        again = true;
      }
    }
  }
  return thisArray;
}

//calculates the best move to make
function calculateMove(moveArr){
  let choice;
  //chooses the position that skips the most spaces
  //skipped spaces must not have a body part or the food in it
  choice = pathOpen(moveArr);
  //incase a choice is not made
  if(choice===undefined){
    choice = positionPlaceCounter+1;
  }
  //when the snake is at the end of the labeled positions
  //returns to the first position
  if(positionPlaceCounter===orderOfPositions.length-1){
    choice = 0;
  }
  //changes the pushes to move to the corresponding choice, also sets the position counter
  if(orderOfPositions[choice][0]-orderOfPositions[positionPlaceCounter][0]!==0){
    push0 = orderOfPositions[choice][0]-orderOfPositions[positionPlaceCounter][0];
    push1 = 0;
    push2 = 0;
    positionPlaceCounter = choice;
  }else if(orderOfPositions[choice][1]-orderOfPositions[positionPlaceCounter][1]!==0){
    push0 = 0;
    push1 = orderOfPositions[choice][1]-orderOfPositions[positionPlaceCounter][1];
    push2 = 0;
    positionPlaceCounter = choice;
  }else if(orderOfPositions[choice][2]-orderOfPositions[positionPlaceCounter][2]!==0){
    push0 = 0;
    push1 = 0;
    push2 = orderOfPositions[choice][2]-orderOfPositions[positionPlaceCounter][2];
    positionPlaceCounter = choice;
  }
}

//checks if a path is open based on its neighboring positions
function pathOpen(array, option){
  let pathNotFound = true;
  let pathTest = array.length-1;
  let pathIsBad = false;
  while(pathNotFound){
    if(pathTest===0){
      return array[0];
    }
    pathIsBad = false;
    if(array[pathTest]<positionPlaceCounter){
      //checks if there is a body in the positions to be skipped
      for(var i=0; i<=bodyPosition.length; i+=3){
        for(var j=positionPlaceCounter+1; j<Math.pow(gameSize+1,3); j++){
          if(bodyPosition[i]===orderOfPositions[j][0]&&bodyPosition[i+1]===orderOfPositions[j][1]&&bodyPosition[i+2]===orderOfPositions[j][2]){
            pathIsBad = true;
          }
        }
      }
      //checks if there is a body in the positions to be skipped (looped back to start)
      if(!pathIsBad){
        for(var i=0; i<=bodyPosition.length; i+=3){
          for(var j=0; j<array[pathTest]; j++){
            if(bodyPosition[i]===orderOfPositions[j][0]&&bodyPosition[i+1]===orderOfPositions[j][1]&&bodyPosition[i+2]===orderOfPositions[j][2]){
              pathIsBad = true;
            }
          }
        }
      }
      //if path is open, checks if the food will be missed
      if(!pathIsBad){
        let missFood = willIMissFood("Double", array, pathTest);
        if(option==="Next Best"){
          if(!missFood&&pathTest!==array.length-1){
            return array[pathTest];
          }else{
            pathTest--;
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
      //checks if there is a body in the positions to be skipped
      for(var i=0; i<=bodyPosition.length; i+=3){
        for(var j=positionPlaceCounter+1; j<array[pathTest]; j++){
          if(bodyPosition[i]===orderOfPositions[j][0]&&bodyPosition[i+1]===orderOfPositions[j][1]&&bodyPosition[i+2]===orderOfPositions[j][2]){
            pathIsBad = true;
          }
        }
      }
      //if path is open, checks if the food will be missed
      if(!pathIsBad){
        let missFood = willIMissFood("Single", array, pathTest);
        if(option==="Next Best"){
          if(!missFood&&pathTest!==array.length-1){
            return array[pathTest];
          }else{
            pathTest--;
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

//all positions to be skipped to see if the food will be missed
function willIMissFood(x, array, pathTest){
  if(x==="Double"){
    for(var j=positionPlaceCounter+1; j<Math.pow(gameSize+1,3); j++){
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
    for(var j=positionPlaceCounter+1; j<array[pathTest]; j++){
      if(shadowFoodPosition[0]===orderOfPositions[j][0]&&shadowFoodPosition[1]===orderOfPositions[j][1]&&shadowFoodPosition[2]===orderOfPositions[j][2]){
        return true;
      }
    }
    return false;
  }
}

//when the user dies the death screen is shown
function deathScreen(){
  menuMusic.play();
  gameMusic.pause();
  gameMusic.currentTime = 0;
  frameRate(60);
  textFont(inconsolata);
  textAlign(CENTER, CENTER);
  //screen is displaced, translation fixes it
  translate(-1/2*width,-1/2*height);
  background(0);
  image(menuBackground,0,0,windowWidth,windowHeight);
  // fill(255, 0, 0);
  // rect(0, 0, 700, 700)

  if(gameMode!=="Two Player"){
    //says 'You Died!' at top of screen
    stroke(0);
    textSize(75);
    fill(255,0,0);
    if(gameMode==="Single Player"){
      text("You Died!", width/2, height/8);
    }else{
      if(snakeLength===Math.pow(gameSize+1,3)+1){
        text("AI Beat the Board!", width/2, height/8);
      }else{
        text("AI Died!", width/2, height/8);
      }
    }

    //displays the users score
    fill(220,220,0);
    textSize(25);
    text("Score: " + snakeLength, width/2, height*5/16);
  }
  
  if(gameMode==="Single Player"){
    //leaderboard icon
    if(mouseX>width*15/16-25&&mouseX<width*15/16+25&&mouseY>height*1/8-25/2&&mouseY<height*1/8+25/2){
      leaderBoardIcon(true);
      if(mouseIsPressed){
        //when mouse clicks store icon, sets state to store and calls setup again to open store screen
        state="LeaderBoard";
        leaderBoardFrom = 'Game Over';
        setup();
      }
    }else{
      leaderBoardIcon(false);
    }

    //only goes through once
    if(firstIterationDeath){
      //creates object for this score
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
      //changes month to a word
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

      //enters score into its correct leaderboard
      if(thisScore.thisDifficulty===5){
        for(var i=0; i<10; i++){
          if(highScores5[i]!==undefined){
            //places score into correct position
            if(thisScore.score>highScores5[i].score){
              highScores5.splice(i, 0, thisScore);
              //keeps leader board at a length of 10
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
        //stores new high score
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

    //writes the difficulty the user was on and displays highscore
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
      //displays player who died
      textSize(75);
      text("Player " + playerDeath + " Died!", width/2, height/8);
    }else{
      //displays scores
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
  fill(0,220,0);
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
function leaderBoardIcon(on, y){
  push();
  if(y!==undefined){
    translate(0, y);
  }
  translate(width*15/16, height*1/8);
  fill(255,0,0);
  if(!on){
    stroke(0,0,255);
  }else{
    stroke(0,255,0);
  }
  rectMode(CENTER);
  rect(0,0,17,50/2);
  rect(-17,4,17,34/2);
  rect(17,6,17,13);
  pop();
}

//displays leaderboard for the difficulty the user was on
function leaderBoard(){
  if(restarted){
    translate(-1*width/2, -1*height/2);
  }

  //background
  background(0);
  image(menuBackground,0,0,windowWidth,windowHeight);

  //says high scores for the difficulty user was on
  textSize(75);
  fill(200,0,200);
  text("High Scores", width/2, height*1/8);

  textSize(40);
  fill(200,0,200);
  text("For difficulty " + difficulty, width/2, height*7/32);

  //writes top scores
  textSize(50);
  fill(255,165,0);
  push();

  //places each score on-screen
  if(difficulty===5){
    translate(width*11/32, height*2/8);
    for(var i=0; i<getItem("High Scores 5").length; i++){
      translate(0, height*1/16);
      if(i===9){
        translate(-12,0);
      }
      //score
      text((i+1) + ". " + getItem("High Scores 5")[i].score, 0, 0);
    }
    pop();
  
    //writes date top scores were made
    push();
    translate(width*19/32, height*2/8);
    textSize(30);
    for(var i=0; i<getItem("High Scores 5").length; i++){
      translate(0, height*1/16);
      //date
      text(getItem("High Scores 5")[i].month + " " +  getItem("High Scores 5")[i].day + ", " +  getItem("High Scores 5")[i].year, 0, 0);
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
      text(getItem("High Scores 6")[i].month + " " +  getItem("High Scores 6")[i].day + ", " +  getItem("High Scores 6")[i].year, 0, 0);
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
      text(getItem("High Scores 7")[i].month + " " +  getItem("High Scores 7")[i].day + ", " +  getItem("High Scores 7")[i].year, 0, 0);
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
      text(getItem("High Scores 8")[i].month + " " +  getItem("High Scores 8")[i].day + ", " +  getItem("High Scores 8")[i].year, 0, 0);
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
      text(getItem("High Scores 9")[i].month + " " +  getItem("High Scores 9")[i].day + ", " +  getItem("High Scores 9")[i].year, 0, 0);
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
      text(getItem("High Scores 11")[i].month + " " +  getItem("High Scores 11")[i].day + ", " +  getItem("High Scores 11")[i].year, 0, 0);
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
      text(getItem("High Scores 12")[i].month + " " +  getItem("High Scores 12")[i].day + ", " +  getItem("High Scores 12")[i].year, 0, 0);
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
      text(getItem("High Scores 13")[i].month + " " +  getItem("High Scores 13")[i].day + ", " +  getItem("High Scores 13")[i].year, 0, 0);
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
      text(getItem("High Scores 14")[i].month + " " +  getItem("High Scores 14")[i].day + ", " +  getItem("High Scores 14")[i].year, 0, 0);
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
      text(getItem("High Scores 15")[i].month + " " +  getItem("High Scores 15")[i].day + ", " +  getItem("High Scores 15")[i].year, 0, 0);
    }
    pop();
  }

  //red button to leave leaderboard
  fill(255,0,0);
  rectMode(CENTER);
  stroke(0);
  rect(width*0.9, 50, 30, 20);
  fill(255);
  stroke(255);
  textSize(20)
  text("X", width*0.9, 50);
  if(mouseX>width*0.9-15&&mouseX<width*0.9+15&&mouseY>38&&mouseY<60&&mouseIsPressed){
    //returns to correct screen
    if(leaderBoardFrom==='Menu'){
      state="Menu";
    }else{
      state="Game Over";
    }
    setup();
  }
}

function keyPressed(){
  if(gameMode!=="AI"){
    //buttons move snake for their corresponding player
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
  }
  //cheat codes for money
  if(gameMode!=="Two Player"){
    if(keyIsDown(68)&&keyIsDown(65)&&keyIsDown(87)&&keyIsDown(83)&&keyIsDown(38)&&keyIsDown(40)){
      money+=1000;
    }
  }
  //increase and decrease speed of Ai
  if(gameMode==="AI"&&state==="Play"){
    if(keyIsDown(38)&&difficulty!==60){
      difficulty++;
    }
    if(keyIsDown(40)&&difficulty!==1){
      difficulty--;
    }
  }
}

//function pushes the button for axis help when the mouse is released
function mouseReleased(){
  if(mouseX>100-12&&mouseX<100+12&&mouseY>575-12&&mouseY<575+12&&gameMode!=="AI"&&state==="Options"){
    if(axisHelp){
      axisHelp = false;
    }else{
      axisHelp = true;
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
      sketch.background(0);
      sketch.fill(255,0,255);
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
    sketch.background(0);

    sketch.push();
    sketch.stroke(255,0,0);
    sketch.strokeWeight(1);
    sketch.line(0,0,150,0);
    sketch.line(150,0,150,150);
    sketch.line(150,150,0,150);
    sketch.line(0,150,0,0);
    sketch.pop();
    
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
    sketch.translate(0,y-y/(gameSize+1));
    
    sketch.push();
    sketch.translate(position[0]/50*x/(gameSize+1), position[2]/50*y/(gameSize+1));
    sketch.placeBox(position[0],position[1],position[2],true);
    sketch.pop();
    for(var i=bodyPosition.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPosition[i+0]/50*x/(gameSize+1), bodyPosition[i+2]/50*y/(gameSize+1));
      sketch.placeBox(bodyPosition[i+0],bodyPosition[i+1],bodyPosition[i+2]);
      sketch.pop();
    }
  };
  
  //function is the same as 3d function
  sketch.placeBox = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
    if(x1<=0||x1>=gameSize*50||y1<=0||y1>=gameSize*50||z1<=-gameSize*50||z1>=0){
      sketch.fill(255,0,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else if(x1<=100||x1>=(gameSize-2)*50||y1<=100||y1>=(gameSize-2)*50||z1<=-(gameSize-2)*50||z1>=-100){
      sketch.fill(0,0,255,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else{
      sketch.fill(0,255,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }
  };

  sketch.moveSnakeP2 = () => {
    //since the z coordinate is negative and the side views are positive
    //this translation aligns the snake with the canvas
    sketch.translate(0,y-y/(gameSize+1));
    
    sketch.push();
    sketch.translate(positionP2[0]/50*x/(gameSize+1), positionP2[2]/50*y/(gameSize+1));
    sketch.placeBoxP2(positionP2[0],positionP2[1],positionP2[2],true);
    sketch.pop();
    for(var i=bodyPositionP2.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPositionP2[i+0]/50*x/(gameSize+1), bodyPositionP2[i+2]/50*y/(gameSize+1));
      sketch.placeBoxP2(bodyPositionP2[i+0],bodyPositionP2[i+1],bodyPositionP2[i+2]);
      sketch.pop();
    }
  };
  
  //function is the same as 3d function
  sketch.placeBoxP2 = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
    if(x1<=0||x1>=gameSize*50||y1<=0||y1>=gameSize*50||z1<=-gameSize*50||z1>=0){
      sketch.fill(255,0,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else if(x1<=100||x1>=(gameSize-2)*50||y1<=100||y1>=(gameSize-2)*50||z1<=-(gameSize-2)*50||z1>=-100){
      sketch.fill(0,0,255,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else{
      sketch.fill(0,255,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }
  };

  //places the food at its correct position
  sketch.food = () => {
    sketch.fill(255,0,0);
    sketch.rect(foodPosition[0]/50*x/(gameSize+1),(foodPosition[2]/50+gameSize)*y/(gameSize+1),x/(gameSize+1),y/(gameSize+1));
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
    sketch.background(0);
    sketch.fill(255,0,255);
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
    sketch.background(0);

    sketch.push();
    sketch.stroke(255,0,0);
    sketch.strokeWeight(1);
    sketch.line(0,0,150,0);
    sketch.line(150,0,150,150);
    sketch.line(150,150,0,150);
    sketch.line(0,150,0,0);
    sketch.pop();
    
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
    sketch.translate(y-y/(gameSize+1),0);
    
    sketch.push();
    sketch.translate(position[2]/50*x/(gameSize+1), position[1]/50*y/(gameSize+1));
    sketch.placeBox(position[0],position[1],position[2],true);
    sketch.pop();
    for(var i=bodyPosition.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPosition[i+2]/50*x/(gameSize+1), bodyPosition[i+1]/50*y/(gameSize+1));
      sketch.placeBox(bodyPosition[i+0],bodyPosition[i+1],bodyPosition[i+2]);
      sketch.pop();
    }
  };
  
  sketch.placeBox = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
    if(x1<=0||x1>=gameSize*50||y1<=0||y1>=gameSize*50||z1<=-gameSize*50||z1>=0){
      sketch.fill(255,0,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else if(x1<=100||x1>=(gameSize-2)*50||y1<=100||y1>=(gameSize-2)*50||z1<=-(gameSize-2)*50||z1>=-100){
      sketch.fill(0,0,255,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else{
      sketch.fill(0,255,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }
  };

  sketch.moveSnakeP2 = () => {
    //in side view, x is 3d z and y is the same as 3d y
    sketch.translate(y-y/(gameSize+1),0);
    
    sketch.push();
    sketch.translate(positionP2[2]/50*x/(gameSize+1), positionP2[1]/50*y/(gameSize+1));
    sketch.placeBoxP2(positionP2[0],positionP2[1],positionP2[2],true);
    sketch.pop();
    for(var i=bodyPositionP2.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPositionP2[i+2]/50*x/(gameSize+1), bodyPositionP2[i+1]/50*y/(gameSize+1));
      sketch.placeBoxP2(bodyPositionP2[i+0],bodyPositionP2[i+1],bodyPositionP2[i+2]);
      sketch.pop();
    }
  };
  
  sketch.placeBoxP2 = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
    if(x1<=0||x1>=gameSize*50||y1<=0||y1>=gameSize*50||z1<=-gameSize*50||z1>=0){
      sketch.fill(255,0,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else if(x1<=100||x1>=(gameSize-2)*50||y1<=100||y1>=(gameSize-2)*50||z1<=-(gameSize-2)*50||z1>=-100){
      sketch.fill(0,0,255,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else{
      sketch.fill(0,255,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }
  };

  sketch.food = () => {
    sketch.fill(255,0,0);
    sketch.rect((foodPosition[2]/50+gameSize)*x/(gameSize+1),foodPosition[1]/50*y/(gameSize+1),x/(gameSize+1),y/(gameSize+1));
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
    sketch.background(0);
    sketch.fill(255,0,255);
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
    sketch.background(0);

    sketch.push();
    sketch.stroke(255,0,0);
    sketch.strokeWeight(1);
    sketch.line(0,0,150,0);
    sketch.line(150,0,150,150);
    sketch.line(150,150,0,150);
    sketch.line(0,150,0,0);
    sketch.pop();
    
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
    sketch.translate(position[0]/50*x/(gameSize+1), position[1]/50*y/(gameSize+1));
    sketch.placeBox(position[0],position[1],position[2],true);
    sketch.pop();
    for(var i=bodyPosition.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPosition[i+0]/50*x/(gameSize+1), bodyPosition[i+1]/50*y/(gameSize+1));
      sketch.placeBox(bodyPosition[i+0],bodyPosition[i+1],bodyPosition[i+2]);
      sketch.pop();
    }
  };
  
  sketch.placeBox = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
    if(x1<=0||x1>=gameSize*50||y1<=0||y1>=gameSize*50||z1<=-gameSize*50||z1>=0){
      sketch.fill(255,0,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else if(x1<=100||x1>=(gameSize-2)*50||y1<=100||y1>=(gameSize-2)*50||z1<=-(gameSize-2)*50||z1>=-100){
      sketch.fill(0,0,255,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else{
      sketch.fill(0,255,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }
  };

  sketch.moveSnakeP2 = () => {
    //in front view, x and y are the same as 3d x and y
    sketch.push();
    sketch.translate(positionP2[0]/50*x/(gameSize+1), positionP2[1]/50*y/(gameSize+1));
    sketch.placeBoxP2(positionP2[0],positionP2[1],positionP2[2],true);
    sketch.pop();
    for(var i=bodyPositionP2.length-3; i>=0; i-=3){
      sketch.push();
      sketch.translate(bodyPositionP2[i+0]/50*x/(gameSize+1), bodyPositionP2[i+1]/50*y/(gameSize+1));
      sketch.placeBoxP2(bodyPositionP2[i+0],bodyPositionP2[i+1],bodyPositionP2[i+2]);
      sketch.pop();
    }
  };
  
  sketch.placeBoxP2 = (x2,y2,z2) => {
    let x1 = x2;
    let y1 = y2;
    let z1 = z2;
    if(x1<=0||x1>=gameSize*50||y1<=0||y1>=gameSize*50||z1<=-gameSize*50||z1>=0){
      sketch.fill(255,0,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else if(x1<=100||x1>=(gameSize-2)*50||y1<=100||y1>=(gameSize-2)*50||z1<=-(gameSize-2)*50||z1>=-100){
      sketch.fill(0,0,255,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }else{
      sketch.fill(0,255,0,150);
      sketch.rect(0,0,x/(gameSize+1),y/(gameSize+1));
    }
  };

  sketch.food = () => {
    sketch.fill(255,0,0);
    sketch.rect(foodPosition[0]/50*x/(gameSize+1),foodPosition[1]/50*y/(gameSize+1),x/(gameSize+1),y/(gameSize+1));
  };
});

//display has different uses based on the game mode
let display = new p5(( sketch ) => {

  let x = 250;
  let y = 150;

  //creates canvas
  sketch.setup = () => {
    sketch.createCanvas(x, y);
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.translate(30,15);
    sketch.textAlign(BOTTOM, CENTER);
    sketch.textSize(50);
    sketch.fill(255,165,0);
    //writes time for two player
    if(gameMode==="Two Player"){
      sketch.text(time,0,10);
    }
    //writes score and speed for Ai
    if(gameMode==="AI"){
      sketch.text("Score: " + snakeLength.toString(10),-30,10);
      sketch.textSize(30);
      sketch.text("Speed: " + difficulty.toString(10),0,60);
      sketch.fill(0,0,255);
      sketch.rect(-30,85,200,50);
      sketch.fill(255,165,0);
      //creates a button to end the program
      sketch.text("Terminate",0,115);
      if(state==="Play"&&sketch.mouseX>0&&sketch.mouseX<200&&sketch.mouseY>100&&sketch.mouseY<150&&mouseIsPressed){
        state = "Game Over";
        pop();
        setup();
      }
    }
    //writes score for single player
    if(gameMode==="Single Player"){
      sketch.text("Score: " + (snakeLength).toString(10),-30,10);
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

  //writes points for player 1
  sketch.draw = () => {
    sketch.background(0);
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

  //writes points for player 2
  sketch.draw = () => {
    sketch.background(0);
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
  //resizing during play will make the 3D canvas diasappear
  if(state!=="Play"){
    resizeCanvas(windowWidth,windowHeight);
  }
}