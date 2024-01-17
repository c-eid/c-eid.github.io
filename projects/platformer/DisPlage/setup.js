// setup variables
$(function() {
  console.log( "ready!" );
});
// REMOVED FROM HTML WAS CAUSING ISSUES <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg" />
const walkAcceleration = 2.5; // how much is added to the speed each frame
const gravity = 0.5; // how much is subtracted from speedY each frame
const friction = 1.5; // how much the player is slowed each frame
const maxSpeed = 8; // maximum horizontal speed, not vertical
const playerJumpStrength = 12; // this is subtracted from the speedY each jump
const projectileSpeed = 8; // the speed of projectiles

/////////////////////////////////////////////////
//////////ONLY CHANGE ABOVE THIS POINT///////////
/////////////////////////////////////////////////

// Base game variables

const playerScale = 0.8; //makes the player just a bit smaller. Doesn't affect the hitbox, just the image


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
let frameRate = 60
// canvas and context variables; must be initialized later
let canvas;
let ctx;



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


