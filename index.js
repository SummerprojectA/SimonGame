let order = [];
let playerorder = [];
let flash;
let turn;
let good;
let compturn;
let intervalId;
let strict = false;
let on = false;
let noise = true;
let win;

const turnCounter = document.querySelector("#turn");
const topleft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomleft = document.querySelector("#bottomleft");
const bottomright = document.querySelector("#bottomright");
const strictbutton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictbutton.addEventListener("click", (event) => {
  if (strictbutton.checked === true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener("click", (event) => {
  if (onButton.checked === true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = " ";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener("click", (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerorder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;

  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4 + 1));
  }

  compturn = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;
  if (flash == turn) {
    on = true;
    clearInterval(intervalId);
    compturn = false;
    clearColor();
  }

  if (compturn) {
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
    let audio1 = document.getElementById("clip1");
    audio1.play();
  }
  noise = true;
  topleft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio2 = document.getElementById("clip2");
    audio2.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio3 = document.getElementById("clip3");
    audio3.play();
  }
  noise = true;
  bottomleft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio4 = document.getElementById("clip4");
    audio4.play();
  }
  noise = true;
  bottomright.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topleft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomleft.style.backgroundColor = "goldenrod";
  bottomright.style.backgroundColor = "darkblue";
}

function flashColor() {
  topleft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomleft.style.backgroundColor = "yellow";
  bottomright.style.backgroundColor = "lightskyblue";
}

topleft.addEventListener("click", (event) => {
  if (on) {
    playerorder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
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

bottomleft.addEventListener("click", (event) => {
  if (on) {
    playerorder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomright.addEventListener("click", (event) => {
  if (on) {
    playerorder.push(4);
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
  if (playerorder[playerorder.length - 1] !== order[playerorder.length - 1])
    good = false;

  if (playerorder.length == 3 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compturn = true;
        flash = 0;
        playerorder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerorder.length && good && !win) {
    turn++;
    playerorder = [];
    compturn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}
