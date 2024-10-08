// setup variables
$(function () {
  console.log("ready!");
});
// REMOVED FROM HTML WAS CAUSING ISSUES <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg" />
const walkAcceleration = 2.5; // how much is added to the speed each frame
const gravity = 0.5; // how much is subtracted from speedY each frame
const friction = 1.5; // how much the player is slowed each frame
const maxSpeed = 8; // maximum horizontal speed, not vertical
const playerJumpStrength = 12; // this is subtracted from the speedY each jump
const projectileSpeed = 8; // the speed of projectiles
// Player animation variables
const animationTypes = {
  duck: "duck",
  flyingJump: "flying-jump",
  frontDeath: "front-death",
  frontIdle: "front-idle",
  jump: "jump",
  lazer: "lazer",
  run: "run",
  stop: "stop",
  walk: "walk",
  shoot: "shoot",
};
/////////////////////////////////////////////////
//////////ONLY CHANGE ABOVE THIS POINT///////////
/////////////////////////////////////////////////

// Base game variables
const frameRate = 60;
const playerScale = 0.8; //makes the player just a bit smaller. Doesn't affect the hitbox, just the image

// Player variables
var hallies = [{
  x: 50,
  y: 100,
  speedX: 0,
  speedY: 0,
  width: undefined,
  height: undefined,
  onGround: false,
  facingRight: true,
  deadAndDeathAnimationDone: false,
  currentAnimationType: animationTypes.jump,
  frameIndex: 0,
  jumpTimer: 0,
  duckTimer: 0,
  DUCK_COUNTER_IDLE_VALUE: 14,
  rCanJump: true,
  lCanJump: true,
  keyPress: {
    any: false,
    up:false,
    down:false,
    left:false,
    right:false,
    space: false,
  },
  key: {
    up: "w",
    left: "a",
    down: "s",
    right: "d",
  },
  r:0,
  g:0,
  b:0
},{
  x: 50,
  y: 100,
  speedX: 0,
  speedY: 0,
  width: undefined,
  height: undefined,
  onGround: false,
  facingRight: true,
  deadAndDeathAnimationDone: false,
  currentAnimationType: animationTypes.jump,
  frameIndex: 0,
  jumpTimer: 0,
  duckTimer: 0,
  DUCK_COUNTER_IDLE_VALUE: 14,
  rCanJump: true,
  lCanJump: true,
  keyPress: {
    any: false,
    up:false,
    down:false,
    left:false,
    right:false,
    space: false,
  },
  key: {
    up: "ArrowUp",
    left: "ArrowLeft",
    down: "ArrowDown",
    right: "ArrowRight",
  },
  r:0.2,
  g:1,
  b:0
},
]

let hitDx;
let hitDy;
let hitBoxWidth = 50 * playerScale;
let hitBoxHeight = 105 * playerScale;
let firstTimeSetup = true;



var anyKeyPressed = false
let debugVar = false;

let spriteHeight = 0;
let spriteWidth = 0;
let spriteX = 0;
let spriteY = 0;
let offsetX = 0;
let offsetY = 0;

// Platform, cannon, projectile, and collectable variables
let platforms = [];
let outlines = [0, 0, 0, 0];
let cannons = [];
const cannonWidth = 118;
const cannonHeight = 80;
let projectiles = [];
const defaultProjectileWidth = 24;
const defaultProjectileHeight = defaultProjectileWidth;
const collectableWidth = 37;
const collectableHeight = 50;
let collectables = [];

// canvas and context variables; must be initialized later
let canvas;
let ctx;

// setup function variable
let setup;

let halleImage;
let animationDetails = {};

var collectableList = {
  database: { image: "images/collectables/database.png" },
  diamond: { image: "images/collectables/diamond-head.png" },
  grace: { image: "images/collectables/grace-head.png" },
  kennedi: { image: "images/collectables/kennedi-head.png" },
  max: { image: "images/collectables/max-head.png" },
  steve: { image: "images/collectables/steve-head.png" },
};


