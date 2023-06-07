//Create playground with canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set a background
document.getElementById("start-btn").onclick = () => startGame();
const battleBackground = new Image();
battleBackground.src = "/images/battle-background.jpg";

function setBackground() {
  ctx.drawImage(battleBackground, 0, 0, canvas.width, canvas.height);
}

// Create a Player
class Player {
  constructor() {
    this.x = 20;
    this.y = 400;
    const img = document.createElement("img");
    img.addEventListener("load", () => {
      this.img = img;
    });
    img.src = "/images/player-stop.png";
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 80, 80);
  }

  moveRight() {
    this.x += 20;
  }

  moveLeft(){
    this.x -= 20;
  }

  moveUp(){
    this.y -=20;
  }

  moveDown(){
    this.y +=20;
  }
}

const luke = new Player();

//Add movement to the player
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      luke.moveRight();
      break;
    case 'ArrowLeft':
      luke.moveLeft();
      break;
    case 'ArrowUp':
      luke.moveUp();
      break;
    case 'ArrowDown':
      luke.moveDown();
      break;
  }
  updater();
});

// Start the game
function startGame() {
  setBackground();
  luke.draw();
}

// Update the game
function updater() {
  ctx.clearRect(0, 0, 500, 500);
  startGame();
}
