
/** @type {HTMLCanvasElement} */ //autocomplete for canvas functions
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');  //canvas context
console.log(ctx);

//setting up cavnas size(width, height) same as canvas html element
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

let playerState = 'run';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change',(e) => {
    playerState=e.target.value;
})
const playerImage = new Image();
playerImage.src = './imgs/shadow_dog.png'
const spriteWidth = 575; //image width is 6876px / 12 columns(number of columns) =  573 px
const spriteHeight = 523 //image height is 5230px / 10 rows(number of rows) = 523 px


let gameFrame = 0;
const staggerFrames = 5;  //sets pace of animation
const spriteAnimation = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
    },
];

animationStates.forEach((state,index)=>{
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimation[state.name] = frames;

})
console.log(spriteAnimation);
// console.log(spriteAnimation[playerState].loc[position].y);

const animate = () =>{
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT); //clears canvas
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimation[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimation[playerState].loc[position].y;
    // ctx.fillRect(100,50,100,100); //draws on canvas black default 
    // ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);
    //2-5 determine where we cut from image itself | last are where on canvas we want to place our piece
    ctx.drawImage(playerImage, frameX , frameY, spriteWidth,
    spriteHeight, 0, 0, spriteWidth, spriteHeight);  //take position from image and place it on position from canvas

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();