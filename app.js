// Variables START
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;
let counter =0;
let isPlay = false;
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
// Variables END

strictButton.addEventListener("click", (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener("click", (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener("click", (event) => {
  if (on || window.console) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  counter++
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  console.log(order);
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightGreen";
 
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "red";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkolivegreen";
  topRight.style.backgroundColor = "indianred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "cadetblue";
}

function flashColor() {
    topLeft.style.backgroundColor = "lightGreen";
    topRight.style.backgroundColor = "red";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
  }


topLeft.addEventListener("click", (event) => {

  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
// working on new way to start game here
if (isPlay == false) {
    play();
    isPlay =true
  }
});

topRight.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomLeft.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
  if(isPlay == false ){

    strict = true;
  }
});

bottomRight.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

function check() {
    console.log("checked")
  if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 20 && good) {
    winGame();
  }
  if (good == false){
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {

        turnCounter.innerHTML = turn;
        clearColor();

        if(strict){

            play();
        }else{

            compTurn = true;
            flash= 0;
            playerOrder = [];
            good = true;
            intervalId = setInterval(gameTurn,800); 
        }
    },800)
    noise = false;
  }
  if (turn == playerOrder.length && good && !win){

    turn++
    playerOrder = [];
    compTurn = true;
    flash= 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn,800)
  }
  console.log("checked")
}

function winGame(){

flashColor();
turnCounter.innerHTML = "WIN!";
on =false;
win = true;

}