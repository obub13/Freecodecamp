/** @type {HTMLCanvasElement} */ //autocomplete for canvas functions
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
let gameSpeed = 5;
// let gameFrame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "./imgs/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./imgs/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./imgs/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./imgs/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./imgs/layer-5.png";

//creating an event listener for the window itself - that way only when window is loaded up, the background funcitonality will start working
window.addEventListener("load", ()=>{
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
          this.speed = gameSpeed * this.speedModifier;  //sets speed of layer scrolling to gamespeed*modifier
          if (this.x <= -this.width) {  // function for repeating seamless layer
            this.x = 0;
          }
          this.x = Math.floor(this.x - this.speed);
          // this.x = gameFrame * this.speed % this.width;
        }
        draw() {
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
          ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
      }
      
      const layer1 = new Layer(backgroundLayer1, 0.2);
      const layer2 = new Layer(backgroundLayer2, 0.4);
      const layer3 = new Layer(backgroundLayer3, 0.6);
      const layer4 = new Layer(backgroundLayer4, 0.8);
      const layer5 = new Layer(backgroundLayer5, 1);
      
      const slider = document.getElementById('slider');
      slider.value = gameSpeed;
      const showGameSpeed = document.getElementById('showGameSpeed');
      showGameSpeed.innerHTML = gameSpeed;
      slider.addEventListener('change', (e)=>{
          gameSpeed = e.target.value;
          showGameSpeed.innerHTML = e.target.value;
      });
      
      const gameObjects = [layer1, layer2, layer3, layer4, layer5];
      
      const animate = () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach((object) => {
          object.update();
          object.draw();
        });
      //   gameFrame--;
        requestAnimationFrame(animate);
      };
      
      animate();      
});

