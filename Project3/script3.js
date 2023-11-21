/** @type {HTMLCanvasElement} */ //autocomplete for canvas functions
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let CANVAS_WIDTH = (canvas.width = 500);
let CANVAS_HEIGHT = (canvas.height = 900); //same as stylecss
const numberOfEnemies = 100;
const enemiesArray = []; //to save the enemies objects.

const enemyImage = new Image();
enemyImage.src = "./imgs/enemy1.png";
let gameFrame = 0;

// creating an enemy object example with x,y coordinates and width and height of the object itself.
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./imgs/enemy3.png";
    this.speed = Math.random() * 3 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas.width - this.width); //generates random position of enemy within canvas borders
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 4);
    this.angle = Math.random() * 500;  //determines where on path enemy will spawn
    this.angleSpeed = Math.random() * 0.5 + 0.5; //higher value = faster
    // this.curve = Math.random() * 150;
  }
  update() {
    //function for movement of enemy
    //math.sin = horiozontal movement, math.cos = vertical movement
    this.x = canvas.width / 2 * Math.sin((this.angle * Math.PI) / 360) +
      (canvas.width / 2 - this.width / 2); 
    this.y = canvas.height / 2 * Math.cos((this.angle * Math.PI) / 900) +
      (canvas.height / 2 - this.height / 2); 
    this.angle += this.angleSpeed;
    if (this.y + this.height < 0) this.y = canvas.height;
    //animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    //function for drawing enemy object
    // ctx.strokeRect(this.x, this.y, this.width, this.height); //draws border
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

// const enemy1 = new Enemy();
// const enemy2 = new Enemy();

//generative loop of enemies.
for (let index = 0; index < numberOfEnemies; index++) {
  enemiesArray.push(new Enemy());
}

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //   enemy1.update();
  //   enemy1.draw();
  for (let enemy in enemiesArray) {
    enemiesArray[enemy].update();
    enemiesArray[enemy].draw();
  }
  gameFrame++;
  requestAnimationFrame(animate); //some recoursing for animation
};

animate();
