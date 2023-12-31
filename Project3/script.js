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
    this.image.src = "./imgs/enemy1.png";
    // this.speed = Math.random() * 4 - 2;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas.width - this.width); //generates random position of enemy within canvas borders
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 3);  //the bigger the number the slower it flaps
  }
  update() {
    //function for movement of enemy - change num values to define wiggle motion
    this.x += Math.random() * 3 - 1.5;  
    this.y += Math.random() * 1 - .5;
    //animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    //function for drawing enemy object
    ctx.strokeRect(this.x, this.y, this.width, this.height);
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
