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
    this.y = 500;
    this.width = 80;
    this.height = 80;
    this.lives = 3;
    this.droidDefeated = 0
    const img = new Image();
    img.addEventListener("load", () => {
      this.img = img;
    });
    img.src = "/images/player-stop.png";
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // For movement
  moveRight() {
    this.x += 20;
  }

  moveLeft() {
    this.x -= 20;
  }

  moveUp() {
    this.y -= 20;
  }

  moveDown() {
    this.y += 20;
  }

  // For crashing 
  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  crashWithEnemie(droid) {
    return !(this.bottom() < droid.top() || this.top() > droid.bottom() || this.right() < droid.left() || this.left() > droid.right());
  }
  crashWithShoot(droid) {
    return !(this.bottom() < droid.topBullet() || this.top() > droid.bottomBullet() || this.right() < droid.leftBullet() || this.left() > droid.rightBullet());
  }
  crashWithYoda(grogu) {
    return !(this.bottom() < grogu.top() || this.top() > grogu.bottom() || this.right() < grogu.left() || this.left() > grogu.right());
  }
}

const luke = new Player();

// Create element to collect and win
class Price {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
    this.width = 80;
    this.height = 80;
    const imgGrogu = new Image();
    imgGrogu.addEventListener("load", () => {
      this.imgGrogu = imgGrogu;
    });
    imgGrogu.src = "/images/grogu.png";
    imgGrogu.style.boxShadow = "";
  }

  draw() {
    ctx.drawImage(this.imgGrogu, this.x, this.y, this.width, this.height);
  }
    left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }
}

const grogu = new Price()


// Create obstacles
class Enemie {
  constructor(x) {
    this.x = x;
    this.y = 20;
    this.width = 100;
    this.height = 100;
    this.bulletX = this.x + 20;
    this.bulletY = this.y;
    this.bulletWidth = 20;
    this.bulletHeight = 60;
    const imgDroid = new Image();
    imgDroid.addEventListener("load", () => {
      this.imgDroid = imgDroid;
    });
    imgDroid.src = "/images/droid.png";
  }

  draw() {
    ctx.drawImage(this.imgDroid, this.x, this.y, this.width,this.height);
  }

  shoot() {
    let bullet = new Image(); // Create shooting
    bullet.addEventListener("load", () => {
      this.bullet = bullet;
    });
    bullet.src = "/images/red-shoot.png";
    ctx.drawImage(this.bullet, this.bulletX, this.bulletY, this.bulletWidth, this.bulletHeight);
  }
  
  // For crashing with droids
  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }
    
  // For crashing with bullet
    leftBullet() {
      return this.bulletX;
    }
  
    rightBullet() {
      return this.bulletX + this.bulletWidth;
    }
  
    topBullet() {
      return this.bulletY;
    }
  
    bottomBullet() {
      return this.bulletY + this.bulletHeight;
    }
}

let droidsArmy = [];
let frame = 0;

// Draw random droids and shoots
function createDroid() {
  //Moving enemies
  for (let i = 0; i < droidsArmy.length; i++) {
    droidsArmy[i].y += 1; // Droids speed
    droidsArmy[i].draw();

    if (droidsArmy[i].y > 40) {
      console.log("in shoot conditional");
      droidsArmy[i].shoot();
      droidsArmy[i].bulletY += 8; // Movement to the bullet
    }
  }

  //Creating with timer
  frame += 1;
  if (frame % 50 === 0) {
    //Here you set how many droids
    droidsArmy.push(new Enemie(Math.floor(Math.random() * canvas.width)));
  }
}

//Add movement to the player
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      luke.moveRight();
      break;
    case "ArrowLeft":
      luke.moveLeft();
      break;
    case "ArrowUp":
      luke.moveUp();
      break;
    case "ArrowDown":
      luke.moveDown();
      break;
  }
  // updateCanvas();
});

// Start/Stop the game
function startGame() {
  interval = setInterval(updateCanvas, 20); // Interval for createDroid()
  gameTimer();
}

function stopGame() {
  clearInterval(interval)
  
}

// Wining and loosing logic 
let time = 60;

function gameTimer() {
  setInterval(() => {
    let setTimer = document.getElementById("timer").innerHTML = time;
    time -= 1;
  }, 1000);
  if (time === 0){
    clearInterval(setTimer)
  }
}

function checkCrashWithDroid(){
  const crashed = droidsArmy.some((el) => {
    if(luke.crashWithEnemie(el)){
      const index = droidsArmy.indexOf(el)
      droidsArmy.splice(index,1)
    }
    return luke.crashWithEnemie(el)
  })

  if(crashed){
    luke.droidDefeated += 1
  }
}

function checkCrashWithBullet(){
  const crashed = droidsArmy.some((el) => {
    if(luke.crashWithShoot(el)){
      const index = droidsArmy.indexOf(el)
      droidsArmy.splice(index,1)
    }
    return luke.crashWithShoot(el)
  
  })
  console.log('in check',crashed)
  if(crashed){
    luke.lives -= 1
  }
}

function checkCrashWithYoda(){
  if(luke.crashWithYoda(grogu)) {
    console.log('You win')
    stopGame()
  }
  if(time < 50){
    grogu.draw()
  }
  }

function checkLives(){
  document.getElementById("lives").innerHTML = luke.lives;
  document.getElementById('droid-defeated').innerHTML = luke.droidDefeated
  if(luke.lives === 0){
    stopGame()
  }
  }

// Update the game
function updateCanvas() {
  ctx.clearRect(0, 0, 1500, 800);
  setBackground();
  luke.draw();
  createDroid();
  checkCrashWithBullet();
  checkCrashWithDroid();
  checkCrashWithYoda();
  checkLives();
}
