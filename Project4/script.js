/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);
class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "./imgs/boom.png";
    this.frame = 0;
    this.timer = 0; //timer for longer animation
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = "./sounds/Ice attack 2.wav";
  }
  update() {
    if (this.frame === 0) this.sound.play();
    //updates frame animation once every calculation (higher numbers = longer animation)
    this.timer++;
    if (this.timer % 20 === 0) {
      this.frame++;
    }
  }
  draw() {
    ctx.save(); //saves the canvas before rotating (must be used in order to run smoothly with multiple clicks)
    ctx.translate(this.x, this.y); //sets position of explosion on canvas
    ctx.rotate(this.angle);  //rotates explosion by angle
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
    ctx.restore(); //is used to restore the canvas to the saved state. This ensures that transformations applied to one element don't affect others.
  }
}

// ctx.fillRect(e.x - canvasPosition.left -100  , e.y - canvasPosition.top -100 , 200, 200);   //basically setting position on canvas minus half of width/height  in order to be centered.
window.addEventListener("click", (e) => {
  createAnimation(e);
});

function createAnimation(e) {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();
