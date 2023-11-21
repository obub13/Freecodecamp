/** @type {HTMLCanvasElement} */ //autocomplete for canvas functions
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let CANVAS_WIDTH = (canvas.width = 500);
let CANVAS_HEIGHT = (canvas.height = 900); //same as stylecss
const numberOfEnemies = 25;
const enemiesArray = []; //to save the enemies objects.

const enemyImage = new Image();
enemyImage.src = "./imgs/enemy1.png";
let gameFrame = 0;

// creating an enemy object example with x,y coordinates and width and height of the object itself.
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./imgs/enemy2.png";
    this.speed = Math.random() * 1 + .5;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas.width - this.width); //generates random position of enemy within canvas borders
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 4);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }
  update() {
    //function for movement of enemy 
    this.x -= this.speed;  
    this.y += this.curve * Math.sin(this.angle); //creates a dynamic wave movement 
    this.angle += this.angleSpeed;
    if(this.x + this.width < 0) this.x = canvas.width;
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
