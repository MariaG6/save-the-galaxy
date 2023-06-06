//Create playground with canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set a background
const battleBackground = new Image();
battleBackground.src = '/images/battle-background.jpg';
// battleBackground.style.width = canvas.width;
// battleBackground.style.height = canvas.height;

function setBackground() {
  ctx.drawImage(battleBackground, 0, 0, canvas.width, canvas.height);
  console.log(battleBackground);
}
setBackground();

// Create a Player
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const img = document.createElement("img");
    img.addEventListener("load", () => {
      this.img = img;
    });
    img.src = "/images/player-stop.png";
  }
}

// Update the game
function updater() {
  ctx.clearRect(0, 0, 500, 500);
  setBackground();
}
