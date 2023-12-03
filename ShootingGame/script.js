/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 700;
let gameStatus = false;
let gameSpeed = 5;
let gameFrame = 0;
const explosions = [];
const enemies = [];
let numberOfEnemies = 10;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "../Project2/imgs/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "../Project2/imgs/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "../Project2/imgs/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "../Project2/imgs/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "../Project2/imgs/layer-5.png";

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier; //sets speed of layer scrolling to gamespeed*modifier
    if (this.x <= -this.width) {
      // function for repeating seamless layer
      this.x = 0;
    }
    this.x = Math.floor(this.x - this.speed);
    // this.x = gameFrame * this.speed % this.width;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

class Explosion {
  constructor(x, y) {
    //sprite dimensions from image
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    //object size on screen
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    //object position on screen
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.angle = Math.random() * 5;
    this.timer = 0;
    this.image = new Image();
    this.image.src = "../Project4/imgs/boom.png";
    this.sound = new Audio();
    this.sound.src = "../Project4/sounds/Ice attack 2.wav";
  }
  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 20 === 0) {
      this.frame++;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

class Enemy {
  constructor() {
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = canvas.width + Math.random() * 500; // generates enemies outside of right canvas border(for example x range is 800-1300)
    this.y = Math.min(canvas.height * (2 / 3) - this.height, Math.random() * (canvas.height * (2 / 3))); //sets Y limited to top 2/3rds of canvas
    this.image = new Image();
    this.image.src = "../Project3/imgs/enemy2.png";
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 4);
    this.speed = Math.random() * 1 + 0.5;
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * -2;
  }

  update() {
    //function for movement of enemy
    this.x -= this.speed;
    // this.y += this.curve * Math.sin(this.angle); //creates a dynamic wave movement
    // this.y = Math.max(0, this.y + this.curve * Math.sin(this.angle));
    this.y = Math.min(canvas.height * (2 / 3) - this.height, Math.max(0, this.y + this.curve * Math.sin(this.angle)));
    // Update y position with dynamic wave movement
    // this.y += this.curve * Math.sin(this.angle);
    
    // Ensure y stays in the top half of the screen
    // this.y = Math.max(0, Math.min(canvas.height / 3 + this.height, this.y));

    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {
      this.x = canvas.width;
      scoreCounter-=10;
      score.innerHTML = "Score: " + scoreCounter;
    }
    //animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      this.frame,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

const slider = document.getElementById("slider");
slider.value = gameSpeed;
const showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener("change", (e) => {
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = e.target.value;
});
//the background funcitonality
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);
const gameObjects = [layer1, layer2, layer3, layer4, layer5];

let animateBackground = () => {
  gameObjects.forEach((object) => {
    object.update();
    object.draw();
  });
};

let animateExplosion = () => {
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
};

let createEnemies = (numberOfEnemies) => {
  for (let index = 0; index < numberOfEnemies; index++) {
    enemies.push(new Enemy());
  }
};

let animateEnemy = () => {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();
  }
};

let score = document.getElementById("score");
let scoreCounter = 0;
score.innerHTML = "Score: " + scoreCounter;
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

startBtn.addEventListener("click", (e) => {
  gameStatus = true;
});

stopBtn.addEventListener("click", () => {
  gameStatus = false;
});

let createAnimation = (e) => {
  let canvasPosition = canvas.getBoundingClientRect();
  let clickX = e.x - canvasPosition.left;
  let clickY = e.y - canvasPosition.top;
  // Check if the click is within any enemy's bounding box
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (
      clickX >= enemy.x &&
      clickX <= enemy.x + enemy.width &&
      clickY >= enemy.y &&
      clickY <= enemy.y + enemy.height
    ) {
      // Create an explosion at the enemy's position
      explosions.push(
        new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2)
      );

      // Remove the enemy from the array
      console.log(enemy);
      enemies.splice(i, 1);

      // Update the score (you can customize the scoring logic)
      scoreCounter += 10;
      score.innerHTML = "Score: " + scoreCounter;

      // Break the loop since we found the clicked enemy
      break;
    }
  }
};

let shoot = (e) => {
  createAnimation(e);
};

canvas.addEventListener("click", shoot);

let animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameStatus) {
    animateBackground();
    
    // if(scoreCounter < 0) {
    //     gameStatus = false;
    // }
    if (enemies.length <= 0) {
      createEnemies(numberOfEnemies);
      numberOfEnemies += 10;
    }
    animateEnemy();
    animateExplosion();
    gameFrame++;
  }
  requestAnimationFrame(animate);
};

animate();
