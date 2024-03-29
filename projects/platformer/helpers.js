
///// DO NOT CHANGE ANYTHING IN THIS FILE /////
let platOffset = 0;
let gridSize = 100;
let gridmove = 0;
let gridmoveY = 13;
let min;
let placetype = "platform"; //["platform", "collectable", "cannon", "exOutput"]
let placecolor = "rgba(255, 255, 255, 0.3)";
let max;
let oldcol;
let editMode = false;
let gridSnap = false;
let placemode = true;
let cursorX;
let cursorY;
let SizeNum = 50;
let SizeButton = document.getElementById('sizeButton');
let Showsize = document.getElementById('Showsize');
let setWidth = 100;
let setHeight = 10;
let setcolor;
let rot = 1;
let canpos = 0;
let cannonCR = 0;
var barSwitch = document.getElementById('dropdown');
var platbar = jQuery('#platformBar');
var collbar = jQuery('#collectableBar');
var cannbar = jQuery('#cannonBar');
var exporbar = jQuery('#exOutput');
var gRange;
var rotatedir = "left";
var bRange;
var rotationPoint;
var msslider;
let lvlData;
var platformAcceloration = 0
var msvalue;



///////////////////////////////////////////////
// Core functionality /////////////////////////
///////////////////////////////////////////////
function registerSetup(setup) {
  setupGame = setup;
}



let collected = 0;

var lor;
checkCookie()

var savedLevels = parseInt(getCookie("lvlNum"));
var nextlvlint = savedLevels + 1;


drawPlatforms()

function main() {
  stx.clearRect(0, 0, 1400, 750); //erase the screen so you can draw everything in it's most current position


  if (player.deadAndDeathAnimationDone) {
    deathOfPlayer();
    return;
  }

  rotationPoint = 80 - gridSize / 2;


  //MOoooving platformssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  if (savedLevels === 3) {
    if (platforms[0].x <= min) {
      lor = true;
    }
    else if (platforms[0].x >= max) {
      lor = false;
    }



    if (lor === true) {
      platforms[0].x += 1;
      platformAcceloration = 2
    }
    else if (lor === false) {
      platforms[0].x -= 1;
      platformAcceloration = -2
    }
  }
  //enddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd



  // if (
  //   collectables[0].collected &&
  //   collectables[1].collected &&
  //   collectables[2].collected
  // ) {
  //   collectables[2].collected = false
  //   collectables[1].collected = false
  //   setInterval(main, 200);
  //   setCookie("lvlNum", nextlvlint)
  //   window.location.reload()
  // }
  // else{

  // }
  drawGrid();
  drawNonStaticPlatforms();


  drawCannons();
  drawCollectables();

  if(collected >= collectables.length && collectables.length !== 0){
   
    collected = 0
    checkCookie()
    player.x = 50;
      player.y = 100;
      player.speedX = 0;

      player.speedY = 0;
      player.onGround = false;
      player.facingRight = true;
      player.deadAndDeathAnimationDone = false;
      ctx.clearRect(0, 0, 1800, 1800);
      platforms = [];
      cannons = [];
      collectables = [];
      
      savedLevels += 1;
      
      setCookie("lvlNum", parseInt(savedLevels))
      platformAcceloration = 0
      levelmake()
  }


  playerFrictionAndGravity();
  player.x += player.speedX;
  player.y += player.speedY;
  collision(); //checks if the player will collide with something in this frame
  keyboardControlActions(); //keyboard controls.
  projectileCollision(); //checks if the player is getting hit by a projectile in the next frame
  collectablesCollide(); //checks if player has touched a collectable
  drawProjectiles();
  animate(); //this changes halle's picture to the next frame so it looks animated.
  //debug()                   //debugging values. Comment this out when not debugging.
  drawRobot(); //this actually displays the image of the robot.





  // while (gridmove < 13 && platforms[platOffset + 12].x < 2575) {
  //   platforms[platOffset + gridmove].x *= 1.001
  //   gridmove += 1
  // }
  // if (gridmove === 13) {
  //   gridmove = 0
  // }

  // while (gridmoveY < 20 && platforms[platOffset + 16].y < 800) {
  //   platforms[platOffset + gridmoveY].y *= 1.001
  //   gridmoveY += 1
  // }
  // if (gridmoveY === 20) {
  //   gridmoveY = 13
  // }

}


function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
      setupGame();
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
}

function JsonFunction(status, response) {
  /*
      diagram of the json
      top level is the name of the animation
      also don't you dare complain, this is operation sparks fault for making the animation so complicated.
      animation name{
          coordinates{
              sx: xpadding,
              sy: ypadding,
              width: cords.swidth,
              height: cords.sheight,
              hitWidth: 50, //cords.width,
              hitHeight: 105,//cords.height,
              hitDx: 0,
              hitDy: 0,
              xoffset: xoffset,
              yoffset: yoffset,
          }
          maxHeight: largest size the sprite can be
          maxWidth: 
      }
    */
  animationDetails = response;
}

///////////////////////////////////////////////
// Helper functions ///////////////////////////
///////////////////////////////////////////////



function changeAnimationType() {
  if (currentAnimationType === animationTypes.frontDeath) {
    if (
      frameIndex >= animationDetails[currentAnimationType].coordinates.length
    ) {
      player.deadAndDeathAnimationDone = true;
    }
    return;
  }
  if (jumpTimer > 0 && !player.onGround) {
    currentAnimationType = animationTypes.jump;
    jumpTimer--;
  } else {
    jumpTimer = 0;
    if (Math.abs(player.speedX) > 0) {
      //if you're moving then change animation to walking or running
      if (keyPress.left || keyPress.right) {
        currentAnimationType = animationTypes.run;
      } else {
        currentAnimationType = animationTypes.walk;
      }
    } else if (player.onGround) {
      if (keyPress.down) {
        currentAnimationType = animationTypes.duck;
        if (duckTimer < DUCK_COUNTER_IDLE_VALUE) {
          // not using index 0 because the animation is too slow then
          frameIndex = 3;
          duckTimer = DUCK_COUNTER_IDLE_VALUE * 2 - frameIndex;
        }
      } else if (
        duckTimer === 0 ||
        currentAnimationType === animationTypes.walk
      ) {
        currentAnimationType = animationTypes.frontIdle;
      }
    }
  }
}

function debug() {
  debugVar = true;

  ctx.fillText("xs" + player.speedX + " x: " + player.x, 500, 200);
  ctx.fillText("ys" + player.speedY + " y: " + player.y, 500, 250);

  ctx.fillStyle = "black";
  ctx.fillText("on ground " + player.onGround, 150 + player.x, player.y - 20);
  ctx.fillText("hitx" + hitDx, 150 + player.x, player.y);
  ctx.fillText("hity" + hitDy, 150 + player.x, player.y + 20);
  ctx.fillText("offsetx" + offsetX, 150 + player.x, player.y + 40);
  ctx.fillText("offsetY" + offsetY, 150 + player.x, player.y + 60);

  ctx.fillStyle = "grey";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  //debug showing collision
  ctx.fillStyle = "yellow";
  ctx.fillRect(500, 100, 50, 50);

  ctx.fillStyle = "green";
  ctx.fillRect(player.x, player.y, hitBoxWidth, hitBoxHeight);

  if (collision() !== undefined) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(player.x, player.y - 50, 10, 10);
  }
}


function animate() {
  if (
    !(
      keyPress.down &&
      duckTimer === DUCK_COUNTER_IDLE_VALUE &&
      currentAnimationType === animationTypes.duck
    )
  ) {
    frameIndex = frameIndex + 15 / frameRate;
    if (duckTimer > 0) {
      duckTimer -= 0.25;
    }
  }
  changeAnimationType();
  if (frameIndex >= animationDetails[currentAnimationType].coordinates.length) {
    frameIndex = 0;
  }
  spriteX =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .sx;
  spriteY =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .sy;
  spriteWidth =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .width;
  spriteHeight =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .height;
  maxWidth = animationDetails[currentAnimationType].maxWidth * playerScale;
  maxHeight = animationDetails[currentAnimationType].maxHeight * playerScale;
  offsetX =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .xoffset * playerScale;
  offsetY =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .yoffset * playerScale;
  player.width =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .width * playerScale;
  player.height =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .height * playerScale;
  hitDx =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .hitDx * playerScale;
  hitDy =
    animationDetails[currentAnimationType].coordinates[Math.floor(frameIndex)]
      .hitDy * playerScale;
}

function drawRobot() {
  //ctx.drawImage(imageVaribale, sourceY, SourceX, sourceWidth, sourceHeight, canvasX, canvasY, finalWidth, finalHeight)
  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  //you only need the extra four source arguments if you want to display just a portion of the picture; if you want to show the whole picture you can just do drawImage(imageVar, canvasX, canvasY, width, height)

  //next section draws hallie. There is an if so that the image is reversed based on the direction of travel
  //there is also a hitDx and hitDy; those are offsets for the animation; enable debugger to see the true hitbox in green
  //you can enable the debug view by uncommenting the debug() function call in the main function.
  if (player.deadAndDeathAnimationDone) {
    return; //return stops the function, we don't want to draw the robot after we die
  }

  if (player.facingRight) {
    stx.drawImage(
      halleImage,
      spriteX,
      spriteY,
      spriteWidth,
      spriteHeight,
      player.x - hitDx,
      player.y - hitDy,
      player.width,
      player.height
    );
  } else {
    //for running to the left you mirror the image
    stx.save();
    stx.scale(-1, 1); //mirror the entire canvas
    stx.drawImage(
      halleImage,
      spriteX,
      spriteY,
      spriteWidth,
      spriteHeight,
      -player.x - player.width + hitDx,
      player.y - hitDy,
      player.width,
      player.height
    );
    stx.restore(); //put the canvas back to normal
  }
}

function collision() {
  player.onGround = false; // Reset this every frame; if the player is actually on the ground, the resolveCollision function will set it to true
  var result = undefined;
  for (var i = 0; i < platforms.length; i++) {
    // Check for collision
   
    if (
      player.x + hitBoxWidth > platforms[i].x &&
      player.x < platforms[i].x + platforms[i].width &&
      player.y < platforms[i].y + platforms[i].height &&
      player.y + hitBoxHeight > platforms[i].y
    ) {
      if(platforms[i].kills && currentAnimationType !== animationTypes.frontDeath){
        currentAnimationType = animationTypes.frontDeath;
        frameIndex = 0;
      }
      if(platforms[i].collides){
      //now that we know we have collided, we figure out the direction of collision
      result = resolveCollision(
        platforms[i].x,
        platforms[i].y,
        platforms[i].width,
        platforms[i].height
      );
      }
    }
  }
  return result;
}
let lCanJump;
let rCanJump;
function resolveCollision(objx, objy, objw, objh) {
  //this is the return value
  let collisionDirection = "";
  //found here https://stackoverflow.com/questions/38648693/resolve-collision-of-two-2d-elements
  //first we find the distance between the center of the object and the player
  let dx = player.x + hitBoxWidth / 2 - (objx + objw / 2);
  let dy = player.y + hitBoxHeight / 2 - (objy + objh / 2);

  //get half-widths of each item
  let halfWidth = hitBoxWidth / 2 + objw / 2;
  let halfHeight = hitBoxHeight / 2 + objh / 2;

  // if the x and y vector are less than the half width or half height,
  // then we must be inside the object, causing a collision
  let originx = halfWidth - Math.abs(dx);
  let originy = halfHeight - Math.abs(dy);

  if (debugVar) {
    //debug
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(objx + dx, objy);
    ctx.lineTo(objx, objy);
    ctx.lineTo(objx, objy + dy);
    ctx.stroke();
    ctx.fillStyle = "rbga(252,186,3,.3)";
    ctx.fillRect(player.x, player.y, hitBoxWidth, hitBoxHeight);
  }
  var WJ;

  if (originx >= originy) {
    if (dy > 0) {
      //bottom collision
      collisionDirection = "bottom";
      player.y = player.y + originy + 1;
      player.speedY = 0;

    } else {
      //top collision
      collisionDirection = "top";
      player.y = player.y - originy;
      player.speedY = 0;
      player.onGround = true;
      rCanJump = true;
      lCanJump = true;
      if(objx === platforms[0].x){
        player.x += platformAcceloration
      }
    }
  } else {
    if (dx > 0) {
      //left collision
      collisionDirection = "left";
      player.x = player.x + originx;
      player.speedX = 0;
      //walljumping code
      if (keyPress.space || keyPress.up) {
        if (lCanJump) {
          player.speedY = 0 - playerJumpStrength;
          jumpTimer = 19; //this counts how many frames to have the jump last.
          player.onGround = false; //bug fix for jump animation, you have to change this or the jump animation doesn't work
          frameIndex = 4;
          setTimeout(offl(), 120);
        }

      }
    } else {
      //right collision
      collisionDirection = "right";
      player.x = player.x - originx;
      player.speedX = 0;
      //walljumping code
      if (keyPress.space || keyPress.up) {
        if (rCanJump) {
          player.speedY = 0 - playerJumpStrength;
          jumpTimer = 19; //this counts how many frames to have the jump last.
          player.onGround = false; //bug fix for jump animation, you have to change this or the jump animation doesn't work
          frameIndex = 4;
          setTimeout(offR(), 120);
        }

      }

    }
  }

  return collisionDirection;
}
function offR() {
  lCanJump = true;
  rCanJump = false;
}
function offl() {
  rCanJump = true;
  lCanJump = false;
}

function projectileCollision() {
  //checking if the player is dead
  if (currentAnimationType === animationTypes.frontDeath) {
    return;
  }

  for (var i = 0; i < projectiles.length; i++) {
    //this deletes any projectiles that go off the screen
    if (
      projectiles[i].x > canvas.width + 100 + projectiles[i].width ||
      projectiles[i].x < -100 - projectiles[i].width ||
      projectiles[i].y > canvas.height + 100 + projectiles[i].height ||
      projectiles[i].y < -100 - projectiles[i].height
    ) {
      projectiles.splice(i, 1);
    }

    if (i === projectiles.length) {
      return;
    }

    //collision with the player
    if (
      projectiles[i].x < player.x + hitBoxWidth &&
      projectiles[i].x + projectiles[i].width > player.x &&
      projectiles[i].y < player.y + hitBoxHeight &&
      projectiles[i].y + projectiles[i].height > player.y
    ) {
      currentAnimationType = animationTypes.frontDeath;
      frameIndex = 0;
    }
  }
}




function deathOfPlayer() {
drawPlatforms()
  ctx.fillStyle = "grey";
  
  ctx.fillRect(
    canvas.width / 4,
    canvas.height / 6,
    canvas.width / 2,
    canvas.height / 2
  );
  ctx.fillStyle = "black";
  ctx.font = "800% serif";
  
  ctx.fillText(
    "You are dead",
    canvas.width / 4,
    canvas.height / 6 + canvas.height / 5,
    (canvas.width / 16) * 14
  );
  ctx.font = "500% serif";
  ctx.fillText(
    "Hit any key to restart",
    canvas.width / 4,
    canvas.height / 6 + canvas.height / 3,
    (canvas.width / 16) * 14
  );

  if (keyPress.any) {
    debugger
    keyPress.any = false;

    for (var i = 0; i < collectables.length; i++) {
      collectables[i].collected = false;
    }
    
    player.x = 50;
    player.y = 100;
    player.speedX = 0;
    player.speedY = 0;
    player.onGround = false;
    player.facingRight = true;
    player.deadAndDeathAnimationDone = false;
    ctx.clearRect(0, 0, 1800, 1800);

    currentAnimationType = animationTypes.run;
    // window.location.reload();
  }
}

function playerFrictionAndGravity() {
  //max speed limiter for ground
  if (player.speedX > maxSpeed) {
    player.speedX = maxSpeed;
  } else if (player.speedX < -maxSpeed) {
    player.speedX = -maxSpeed;
  }
  //friction
  if (Math.abs(player.speedX) < 1) {
    //this makes sure that the player actually stops when the speed gets low enough
    //otherwise if you just always reduce speed it will just end up jiggling
    player.speedX = 0;
  } else if (player.speedX > 0) {
    player.speedX = player.speedX - friction;
  } else {
    player.speedX = player.speedX + friction;
  }

  if (player.onGround === false) {
    player.speedY = player.speedY + gravity;
  }
}

function drawPlatforms(){
  for (var i = 0; i < platforms.length; i++) {
    if(platforms[i].isStatic){
    ctx.fillStyle = platforms[i].color;
    ctx.fillStyle = platforms[i].color;
    ctx.fillRect(
      platforms[i].x,
      platforms[i].y,
      platforms[i].width,
      platforms[i].height
    );
    }
}}

function drawNonStaticPlatforms() {

  for (var i = 0; i < platforms.length; i++) {


      stx.fillStyle = platforms[i].color;
    stx.fillStyle = platforms[i].color;
    stx.fillRect(
      platforms[i].x,
      platforms[i].y,
      platforms[i].width,
      platforms[i].height
    );
    }
  }



function drawProjectiles() {
  for (var i = 0; i < projectiles.length; i++) {
    stx.drawImage(
      projectileImage,
      projectiles[i].x,
      projectiles[i].y,
      projectiles[i].width,
      projectiles[i].height
    );
    projectiles[i].x = projectiles[i].x + projectiles[i].speedX;
    projectiles[i].y = projectiles[i].y + projectiles[i].speedY;
  }
}

function drawCannons() {
  for (var i = 0; i < cannons.length; i++) {
    if (cannons[i].projectileCountdown >= cannons[i].timeBetweenShots) {
      cannons[i].projectileCountdown = 0;
      createProjectile(
        cannons[i].location,
        cannons[i].x,
        cannons[i].y,
        cannons[i].projectileWidth,
        cannons[i].projectileHeight
      );
    } else {
      cannons[i].projectileCountdown = cannons[i].projectileCountdown + 1;
    }

    stx.fillStyle = "blue";
    stx.save(); //save the current translation of the screen.
    stx.translate(cannons[i].x, cannons[i].y); //you are moving the top left of the screen to the pictures location, this is because you can't rotate the image, you have to rotate the whole page
    stx.rotate((cannons[i].rotation * Math.PI) / 180); //then you rotate. rotation is centered on 0,0 on the canvas, which is why we moved the picture to 0,0 with translate(x,y)
    stx.drawImage(cannonImage, 0, 0, cannonWidth, cannonHeight); //you draw the image on the rotated canvas. as of this line, the picture is straight and the rest of the page is rotated
    //also the previous line uses -width / 2 so that the picture is centered. This will mean that (0,0) is at the exact center of the image
    stx.translate(-cannons[i].x, -cannons[i].y); //the reverse of the previous translate, this moves the page back to the correct place so that the image is no longer at (0,0)
    stx.restore(); //this unrotates the canvas so the canvas is straight, but now since you did that the picture looks rotated
  }
}

function drawCollectables() {
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].collected !== true) {
      //draw on screen if not collected
      stx.drawImage(
        collectables[i].image,
        collectables[i].x,
        collectables[i].y,
        collectableWidth,
        collectableHeight
      );
    } else {
      //draw the icons at the top if collected
      if (collectables[i].alpha > 0.4) {
        collectables[i].alpha = collectables[i].alpha - 0.007;
      }
      stx.globalAlpha = collectables[i].alpha;
      stx.drawImage(
        collectables[i].image,
        200 + 100 * i,
        10,
        collectableWidth,
        collectableHeight
      );
      stx.globalAlpha = 1;
    }

    //gravity
    if (editMode === false) {
      collectables[i].speedy = collectables[i].speedy + collectables[i].gravity;
      collectables[i].y = collectables[i].y + collectables[i].speedy;

      // Check for collision with platforms in order to bounce
      for (var j = 0; j < platforms.length; j++) {
        if (
          collectables[i].x + collectableWidth > platforms[j].x &&
          collectables[i].x < platforms[j].x + platforms[j].width &&
          collectables[i].y < platforms[j].y + platforms[j].height &&
          collectables[i].y + collectableHeight > platforms[j].y
        ) {
          //bottom of collectable is below top of platform
          collectables[i].y = collectables[i].y - collectables[i].speedy;
          collectables[i].speedy *= -collectables[i].bounce;
        }
      }
    }
    else {
      collectables[i].y = collectables[i].posY;
      collectables[i].x = collectables[i].posX;
      collectables[i].speedy = 0;
    }
  }
}

function collectablesCollide() {
  for (var i = 0; i < collectables.length; i++) {
    if (
      collectables[i].x + collectableWidth > player.x &&
      collectables[i].x < player.x + hitBoxWidth &&
      collectables[i].y < player.y + hitBoxHeight &&
      collectables[i].y + collectableHeight > player.y
    ) {
      
      collectables[i].collected = true;
      collectables[i].x = -100
      collectables[i].y = -100
      collected ++
    }
  }
}

function createPlatform(x, y, width, height, color = "#FFFFFF", isStatic = true, kills = false, collides = true) {

  let savedcolor = color;

  if (width < 0) {
    x += width;
    width *= -1;
  }
  if (height < 0) {
    y += height;
    height *= -1;
  }

  platforms.push({ x, y, width, height, color, savedcolor, isStatic, kills, collides});
  
}


function createCannon(
  wallLocation,
  position,
  positionY,
  timeBetweenShots,
  width = defaultProjectileWidth,
  height = defaultProjectileHeight,
) {
  if (gridSnap === true) {
    if (wallLocation === "top") {
      cannons.push({
        x: parseInt(position + cannonWidth / 2 + (gridSize / 2)),
        y: parseInt(positionY + rotationPoint + (gridSize / 2)),
        rotation: 180,
        delay: timeBetweenShots,
        wallLocation,
        projectileCountdown: 0,
        location: "top",
        timeBetweenShots: timeBetweenShots / (1000 / frameRate),
        projectileWidth: width,
        projectileHeight: height
      });
      canpos = cannons[0].x;
    } else if (wallLocation === "bottom") {
      cannons.push({
        x: parseInt(position - cannonWidth / 2 + (gridSize / 2)),
        y: parseInt(positionY - rotationPoint + (gridSize / 2)),
        // x: cursorX - cannonWidth / 2,
        // y: cursorY,
        rotation: 0,
        wallLocation,
        delay: timeBetweenShots,
        projectileCountdown: 0,
        location: "bottom",
        timeBetweenShots: timeBetweenShots / (1000 / frameRate),
        projectileWidth: width,
        projectileHeight: height
      });
      canpos = cannons[0].x;
    } else if (wallLocation === "left") {
      cannons.push({
        // x: cursorX,
        // y: cursorY - cannonWidth / 2,
        x: parseInt(position + cannonHeight),
        y: parseInt(positionY - cannonWidth / 2 + (gridSize / 2)),
        rotation: 90,
        wallLocation,
        delay: timeBetweenShots,
        projectileCountdown: 0,
        location: "left",
        timeBetweenShots: timeBetweenShots / (1000 / frameRate),
        projectileWidth: width,
        projectileHeight: height
      });
      canpos = cannons[0].y;
    } else if (wallLocation === "right") {
      cannons.push({
        // x: cursorX,
        // y: cursorY + cannonWidth / 2,
        x: parseInt(position - cannonHeight + gridSize),
        y: parseInt(positionY + cannonWidth / 2 + (gridSize / 2)),
        rotation: 270,
        projectileCountdown: 0,
        delay: timeBetweenShots,
        location: "right",
        wallLocation,
        timeBetweenShots: timeBetweenShots / (1000 / frameRate),
        projectileWidth: width,
        projectileHeight: height
      });
      canpos = cannons[0].y;
    }
  } else if (gridSnap === false) {

    if (wallLocation === "top") {
      cannons.push({
        x: position + cannonWidth / 2,
        y: positionY,
        rotation: 180,
        wallLocation,
        projectileCountdown: 0,
        location: wallLocation,
        delay: timeBetweenShots,
        timeBetweenShots: timeBetweenShots / (1000 / frameRate),
        projectileWidth: width,
        projectileHeight: height,
      });
    } else if (wallLocation === "bottom") {
      cannons.push({
        x: position - cannonWidth / 2,
        y: positionY,
        rotation: 0,
        projectileCountdown: 0,
        wallLocation,
        delay: timeBetweenShots,
        location: wallLocation,
        timeBetweenShots: timeBetweenShots / (1000 / frameRate),
        projectileWidth: width,
        projectileHeight: height,
      });
    } else if (wallLocation === "left") {
      cannons.push({
        x: position,
        y: positionY - cannonWidth / 2,
        rotation: 90,
        projectileCountdown: 0,
        delay: timeBetweenShots,
        wallLocation,
        location: wallLocation,
        timeBetweenShots: timeBetweenShots / (1000 / frameRate),
        projectileWidth: width,
        projectileHeight: height,
      });
    } else if (wallLocation === "right") {
      cannons.push({
        width: 300,
        height: 300,
        x: position,
        delay: timeBetweenShots,
        wallLocation,
        y: positionY + cannonWidth / 2,
        rotation: 270,
        projectileCountdown: 0,
        location: wallLocation,
        timeBetweenShots: timeBetweenShots / (1000 / frameRate),
        projectileWidth: width,
        projectileHeight: height,
      });
    }
  }
}


function createCollectable(type, x, y, gravity = 0.1, bounce = 1, posX, posY) {
  if (type !== "") {
    var img = document.createElement("img"); // this is not necessary; we could simply make a single element for each collectable type in the HTML instead
    img.src = collectableList[type].image;
    img.id = "image" + collectables.length;
    collectables.push({
      image: img,
      x: x,
      y: y,
      speedy: 0,
      collected: false,
      alpha: 2,
      gravity: gravity,
      bounce: bounce,
      posX,
      posY
    });
  }
}

function createProjectile(wallLocation, x, y, width, height) {
  //checking if the player is dead
  if (currentAnimationType === animationTypes.frontDeath) {
    return;
  }

  if (wallLocation === "top") {
    projectiles.push({
      x: x - 71.5,
      y: y - 55 - height / 2,
      speedX: 0,
      speedY: projectileSpeed,
      width,
      height,
    });
  } else if (wallLocation === "bottom") {
    projectiles.push({
      x: x + 47,
      y: y + 50 + height / 2,
      speedX: 0,
      speedY: -projectileSpeed,
      width,
      height,
    });
  } else if (wallLocation === "left") {
    projectiles.push({
      x: x - 80 - width / 2,
      y: y + 46,
      speedX: projectileSpeed,
      speedY: 0,
      width,
      height,
    });
  } else if (wallLocation === "right") {
    projectiles.push({
      x: x + 40 + width / 2,
      y: y - 71.5,
      speedX: -projectileSpeed,
      speedY: 0,
      width,
      height,
    });
  }

  // putting this here instead of in every if
  projectiles[projectiles.length - 1].x -= (width - defaultProjectileWidth) / 2;
  projectiles[projectiles.length - 1].y -=
    (height - defaultProjectileHeight) / 2;
}

function keyboardControlActions() {
  keyPress.any = false; //keyboardHandler will set this to true if you press any key. Setting the variable to false here makes sure that key press dosen't stick around.
  //this is used for respawning; if you hit any key after you die this variable will be set to true and you will respawn.

  if (currentAnimationType === animationTypes.frontDeath) {
    return;
  }

  if (keyPress.left) {
    player.speedX -= walkAcceleration;
    player.facingRight = false;
  }
  if (keyPress.right) {
    player.speedX += walkAcceleration;
    player.facingRight = true;
  }
  if (keyPress.space || keyPress.up) {
    if (player.onGround) {
      //this only lets you jump if you are on the ground
      player.speedY = player.speedY - playerJumpStrength;
      jumpTimer = 19; //this counts how many frames to have the jump last.
      player.onGround = false; //bug fix for jump animation, you have to change this or the jump animation doesn't work
      frameIndex = 4;
    }



  }
}

function handleKeyDown(e) {
  keyPress.any = true;
  if (e.key === "ArrowUp" || e.key === "w") {
    keyPress.up = true;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    keyPress.left = true;

  }
  if (e.key === "ArrowDown" || e.key === "s") {
    keyPress.down = true;
  }
  if (e.key === "ArrowRight" || e.key === "d") {
    keyPress.right = true;

  }
  if (e.key === " ") {
    keyPress.space = true;
  }
}

function handleKeyUp(e) {
  if (e.key === "ArrowUp" || e.key === "w") {
    keyPress.up = false;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    keyPress.left = false;
  }
  if (e.key === "ArrowDown" || e.key === "s") {
    keyPress.down = false;
    if (currentAnimationType === animationTypes.duck) {
      duckTimer = 8;
      frameIndex = 20;
    }
  }
  if (e.key === "ArrowRight" || e.key === "d") {
    keyPress.right = false;
  }
  if (e.key === " ") {
    keyPress.space = false;
  }
  if (e.key === "r") {
    setCookie("lvlNum", 1);
    window.location.reload();
  }

}

function loadJson() {
  getJSON("halle.json", JsonFunction); //runs this before the setup because of timing things
}


function setCookie(name, value) {
  document.cookie = `${name}=${value};`;
};

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";

}
function checkCookie() {
  let ss = getCookie("lvlNum");
  if (ss === "") {
    setCookie("lvlNum", 1);
  }
}





function drawGrid() {
  for (let i = gridSize; i < canvas.width; i += gridSize) {
    ctx.fillStyle = "white";
    ctx.fillRect(
      i,
      0,
      1,
      canvas.height
    );

  }

  for (let i = gridSize; i < canvas.height; i += gridSize) {
    ctx.fillRect(
      0,
      i,
      canvas.width,
      1
    );
  }
}


function levelmake() {
  var savedLevel = parseInt(getCookie("lvlNum"))
  if (savedLevel === 1) { //level editor
    createPlatform(-50, -50, canvas.width + 100, 50, "white"); //top
    createPlatform(-50, -50, 50, canvas.height + 500, "rgb(28, 26, 26");
    createPlatform(canvas.width, -50, 50, canvas.height + 100, "rgb(28, 26, 26");
    createPlatform(100, 500, 100, 100, '#3b3b3b', true, false);
    createPlatform(100, 600, 100, 100, '#3b3b3b', true, false);
    createPlatform(0, 700, 100, 100, '#3b3b3b', true, false);
    createPlatform(100, 700, 100, 100, '#3b3b3b', true, false);
    createPlatform(500, 500, 100, 100, '#3b3b3b', true, false);
    createPlatform(400, 500, 100, 100, '#3b3b3b', true, false);
    createPlatform(400, 600, 100, 100, '#3b3b3b', true, false);
    createPlatform(500, 600, 100, 100, '#3b3b3b', true, false);
    createPlatform(500, 700, 100, 100, '#3b3b3b', true, false);
    createPlatform(400, 700, 100, 100, '#3b3b3b', true, false);
    createPlatform(900, 500, 100, 100, '#3b3b3b', true, false);
    createPlatform(900, 700, 100, 100, '#3b3b3b', true, false);
    createPlatform(900, 600, 100, 100, '#3b3b3b', true, false);
    createPlatform(800, 600, 100, 100, '#3b3b3b', true, false);
    createPlatform(800, 700, 100, 100, '#3b3b3b', true, false);
    createPlatform(1300, 600, 100, 100, '#3b3b3b', true, false);
    createPlatform(1300, 700, 100, 100, '#3b3b3b', true, false);
    createPlatform(1300, 700, 100, 100, '#3b3b3b', true, false);
    createPlatform(1200, 700, 100, 100, '#3b3b3b', true, false);
    createPlatform(1200, 600, 100, 100, '#3b3b3b', true, false);
    createPlatform(1300, 500, 100, 100, '#3b3b3b', true, false);
    createPlatform(1300, 500, 100, 10, '#262626', true, false);
    createPlatform(1200, 600, 10, 100, '#262626', true, false);
    createPlatform(1200, 700, 10, 100, '#262626', true, false);
    createPlatform(800, 700, 10, 100, '#262626', true, false);
    createPlatform(800, 600, 10, 100, '#262626', true, false);
    createPlatform(800, 500, 100, 100, '#3b3b3b', true, false);
    createPlatform(800, 500, 10, 100, '#262626', true, false);
    createPlatform(800, 500, 100, 10, '#262626', true, false);
    createPlatform(900, 500, 100, 10, '#262626', true, false);
    createPlatform(990, 500, 10, 100, '#262626', true, false);
    createPlatform(990, 600, 10, 100, '#262626', true, false);
    createPlatform(990, 700, 10, 100, '#262626', true, false);
    createPlatform(590, 500, 10, 100, '#262626', true, false);
    createPlatform(590, 600, 10, 100, '#262626', true, false);
    createPlatform(590, 700, 10, 100, '#262626', true, false);
    createPlatform(500, 500, 100, 10, '#262626', true, false);
    createPlatform(400, 500, 100, 10, '#262626', true, false);
    createPlatform(400, 500, 10, 100, '#262626', true, false);
    createPlatform(400, 600, 10, 100, '#262626', true, false);
    createPlatform(400, 700, 10, 100, '#262626', true, false);
    createPlatform(100, 500, 100, 10, '#262626', true, false);
    createPlatform(190, 500, 10, 100, '#262626', true, false);
    createPlatform(190, 700, 10, 100, '#262626', true, false);
    createPlatform(190, 600, 10, 100, '#262626', true, false);
    createPlatform(420, 510, 10, 10, '#262626', true, false);
    createPlatform(410, 520, 10, 10, '#262626', true, false);
    createPlatform(410, 530, 10, 10, '#262626', true, false);
    createPlatform(420, 520, 10, 10, '#262626', true, false);
    createPlatform(440, 510, 10, 10, '#262626', true, false);
    createPlatform(430, 510, 10, 10, '#262626', true, false);
    createPlatform(410, 540, 10, 10, '#262626', true, false);
    createPlatform(410, 510, 10, 10, '#262626', true, false);
    createPlatform(580, 510, 10, 10, '#262626', true, false);
    createPlatform(570, 510, 10, 10, '#262626', true, false);
    createPlatform(560, 510, 10, 10, '#262626', true, false);
    createPlatform(580, 520, 10, 10, '#262626', true, false);
    createPlatform(580, 530, 10, 10, '#262626', true, false);
    createPlatform(570, 520, 10, 10, '#262626', true, false);
    createPlatform(580, 540, 10, 10, '#262626', true, false);
    createPlatform(550, 510, 10, 10, '#262626', true, false);
    createPlatform(810, 510, 10, 10, '#262626', true, false);
    createPlatform(810, 520, 10, 10, '#262626', true, false);
    createPlatform(810, 530, 10, 10, '#262626', true, false);
    createPlatform(810, 540, 10, 10, '#262626', true, false);
    createPlatform(820, 520, 10, 10, '#262626', true, false);
    createPlatform(820, 510, 10, 10, '#262626', true, false);
    createPlatform(830, 510, 10, 10, '#262626', true, false);
    createPlatform(840, 510, 10, 10, '#262626', true, false);
    createPlatform(950, 510, 10, 10, '#262626', true, false);
    createPlatform(960, 510, 10, 10, '#262626', true, false);
    createPlatform(970, 510, 10, 10, '#262626', true, false);
    createPlatform(980, 510, 10, 10, '#262626', true, false);
    createPlatform(970, 520, 10, 10, '#262626', true, false);
    createPlatform(980, 520, 10, 10, '#262626', true, false);
    createPlatform(980, 530, 10, 10, '#262626', true, false);
    createPlatform(980, 540, 10, 10, '#262626', true, false);
    createPlatform(1200, 500, 100, 100, '#3b3b3b', true, false);
    createPlatform(1200, 500, 100, 10, '#262626', true, false);
    createPlatform(1200, 500, 10, 100, '#262626', true, false);
    createPlatform(1210, 510, 10, 10, '#262626', true, false);
    createPlatform(1210, 530, 10, 10, '#262626', true, false);
    createPlatform(1210, 520, 10, 10, '#262626', true, false);
    createPlatform(1210, 540, 10, 10, '#262626', true, false);
    createPlatform(1220, 510, 10, 10, '#262626', true, false);
    createPlatform(1240, 510, 10, 10, '#262626', true, false);
    createPlatform(1230, 510, 10, 10, '#262626', true, false);
    createPlatform(1220, 520, 10, 10, '#262626', true, false);
    createPlatform(150, 510, 10, 10, '#262626', true, false);
    createPlatform(160, 510, 10, 10, '#262626', true, false);
    createPlatform(170, 510, 10, 10, '#262626', true, false);
    createPlatform(180, 510, 10, 10, '#262626', true, false);
    createPlatform(170, 520, 10, 10, '#262626', true, false);
    createPlatform(180, 520, 10, 10, '#262626', true, false);
    createPlatform(180, 530, 10, 10, '#262626', true, false);
    createPlatform(180, 540, 10, 10, '#262626', true, false);
    createPlatform(200, 620, 200, 10, '#fdc93b', true, false);
    createPlatform(600, 590, 200, 10, '#fdc93b', true, false);
    createPlatform(1000, 600, 200, 10, '#fdc93b', true, false);
    createPlatform(220, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(230, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(290, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(320, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(310, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(350, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(370, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(380, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(390, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(600, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(610, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(620, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(640, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(630, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(780, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(790, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(1000, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1010, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1020, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1060, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1070, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1090, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1080, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1110, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1100, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1100, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(1090, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(1080, 580, 10, 10, '#fdc93b', true, false);
    createPlatform(1140, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1160, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1150, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1180, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(1190, 590, 10, 10, '#fdc93b', true, false);
    createPlatform(200, 620, 10, 10, '#fdc93b', true, false);
    createPlatform(250, 620, 10, 10, '#fdc93b', true, false);
    createPlatform(260, 620, 10, 10, '#fdc93b', true, false);
    createPlatform(270, 620, 10, 10, '#fdc93b', true, false);
    createPlatform(290, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(310, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(320, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(350, 610, 10, 10, '#fdc93b', true, false);
    createPlatform(200, 620, 10, 10, '#fdc93b', true, true);
    createPlatform(210, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(240, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(290, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(260, 620, 10, 10, '#fdc93b', true, true);
    createPlatform(300, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(310, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(320, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(360, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(370, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(200, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(220, 600, 10, 10, '#fdc93b', true, true);
    createPlatform(220, 600, 10, 10, '#fdc93b', true, true);
    createPlatform(230, 600, 10, 10, '#fdc93b', true, true);
    createPlatform(250, 610, 10, 10, '#fdc93b', true, true);
    createPlatform(310, 600, 10, 10, '#fdc93b', true, true);
    createPlatform(310, 600, 10, 10, '#fdc93b', true, true);
    createPlatform(300, 600, 10, 10, '#fdc93b', true, true);
    createPlatform(370, 600, 10, 10, '#fdc93b', true, true);
    createPlatform(380, 600, 10, 10, '#fdc93b', true, true);
    createPlatform(390, 600, 10, 10, '#fdc93b', true, true);
    createPlatform(790, 570, 10, 10, '#fdc93b', true, true);
    createPlatform(750, 580, 10, 10, '#fdc93b', true, true);
    createPlatform(740, 580, 10, 10, '#fdc93b', true, true);
    createPlatform(730, 580, 10, 10, '#fdc93b', true, true);
    createPlatform(720, 580, 10, 10, '#fdc93b', true, true);
    createPlatform(650, 580, 10, 10, '#fdc93b', true, true);
    createPlatform(630, 570, 10, 10, '#fdc93b', true, true);
    createPlatform(620, 570, 10, 10, '#fdc93b', true, true);
    createPlatform(610, 570, 10, 10, '#fdc93b', true, true);
    createPlatform(690, 580, 10, 10, '#fdc93b', true, true);
    createPlatform(770, 580, 10, 10, '#fdc93b', true, true);
    createPlatform(0, 600, 100, 100, '#3b3b3b', true, false);
    createPlatform(0, 500, 100, 100, '#3b3b3b', true, false);
    createPlatform(0, 500, 100, 10, '#262626', true, false);
    createPlatform(200, 620, 30, 10, '#ee8824', true, true);
    createPlatform(220, 630, 30, 10, '#ee8824', true, true);
    createPlatform(250, 630, 30, 10, '#ee8824', true, true);
    createPlatform(280, 630, 30, 10, '#ee8824', true, true);
    createPlatform(290, 620, 30, 10, '#ee8824', true, true);
    createPlatform(310, 630, 30, 10, '#ee8824', true, true);
    createPlatform(360, 630, 30, 10, '#ee8824', true, true);
    createPlatform(350, 630, 30, 10, '#ee8824', true, true);
    createPlatform(340, 630, 30, 10, '#ee8824', true, true);
    createPlatform(370, 630, 30, 10, '#ee8824', true, true);
    createPlatform(370, 620, 30, 10, '#ee8824', true, true);
    createPlatform(210, 630, 30, 10, '#ee8824', true, true);
    createPlatform(200, 630, 30, 10, '#ee8824', true, true);
    createPlatform(610, 590, 30, 10, '#ee8824', true, true);
    createPlatform(600, 610, 30, 10, '#ee8824', true, true);
    createPlatform(600, 600, 30, 10, '#ee8824', true, true);
    createPlatform(640, 600, 30, 10, '#ee8824', true, true);
    createPlatform(630, 600, 30, 10, '#ee8824', true, true);
    createPlatform(670, 600, 30, 10, '#ee8824', true, true);
    createPlatform(700, 600, 30, 10, '#ee8824', true, true);
    createPlatform(730, 600, 30, 10, '#ee8824', true, true);
    createPlatform(770, 610, 30, 10, '#ee8824', true, true);
    createPlatform(770, 600, 30, 10, '#ee8824', true, true);
    createPlatform(770, 590, 30, 10, '#ee8824', true, true);
    createPlatform(750, 600, 30, 10, '#ee8824', true, true);
    createPlatform(700, 610, 30, 10, '#ee8824', true, true);
    createPlatform(670, 610, 30, 10, '#ee8824', true, true);
    createPlatform(220, 640, 30, 10, '#ee8824', true, true);
    createPlatform(260, 640, 30, 10, '#ee8824', true, true);
    createPlatform(320, 640, 30, 10, '#ee8824', true, true);
    createPlatform(290, 640, 30, 10, '#ee8824', true, true);
    createPlatform(250, 640, 30, 10, '#ee8824', true, true);
    createPlatform(200, 640, 30, 10, '#ee8824', true, true);
    createPlatform(360, 640, 30, 10, '#ee8824', true, true);
    createPlatform(350, 640, 30, 10, '#ee8824', true, true);
    createPlatform(370, 640, 30, 10, '#ee8824', true, true);
    createPlatform(630, 610, 30, 10, '#ee8824', true, true);
    createPlatform(650, 610, 30, 10, '#ee8824', true, true);
    createPlatform(730, 610, 30, 10, '#ee8824', true, true);
    createPlatform(750, 610, 30, 10, '#ee8824', true, true);
    createPlatform(1000, 610, 30, 10, '#ee8824', true, true);
    createPlatform(1020, 610, 30, 10, '#ee8824', true, true);
    createPlatform(1050, 610, 30, 10, '#ee8824', true, true);
    createPlatform(1070, 600, 30, 10, '#ee8824', true, true);
    createPlatform(1080, 610, 30, 10, '#ee8824', true, true);
    createPlatform(1100, 610, 30, 10, '#ee8824', true, true);
    createPlatform(1120, 610, 30, 10, '#ee8824', true, true);
    createPlatform(1150, 610, 30, 10, '#ee8824', true, true);
    createPlatform(1170, 610, 30, 10, '#ee8824', true, true);
    createPlatform(1000, 620, 30, 10, '#ee8824', true, true);
    createPlatform(1030, 620, 30, 10, '#ee8824', true, true);
    createPlatform(1060, 620, 30, 10, '#ee8824', true, true);
    createPlatform(1090, 620, 30, 10, '#ee8824', true, true);
    createPlatform(1110, 620, 30, 10, '#ee8824', true, true);
    createPlatform(1130, 620, 30, 10, '#ee8824', true, true);
    createPlatform(1160, 620, 30, 10, '#ee8824', true, true);
    createPlatform(1170, 620, 30, 10, '#ee8824', true, true);
    createPlatform(200, 650, 200, 10, '#ce532e', true, true);
    createPlatform(600, 620, 200, 10, '#ce532e', true, true);
    createPlatform(1000, 630, 200, 10, '#ce532e', true, true);
    createPlatform(1020, 630, 10, 10, '#ce532e', true, true);
    createPlatform(1020, 620, 10, 10, '#ce532e', true, true);
    createPlatform(1070, 620, 10, 10, '#ce532e', true, true);
    createPlatform(1080, 620, 10, 10, '#ce532e', true, true);
    createPlatform(1130, 620, 10, 10, '#ce532e', true, true);
    createPlatform(1140, 620, 10, 10, '#ce532e', true, true);
    createPlatform(1160, 620, 10, 10, '#ce532e', true, true);
    createPlatform(1150, 620, 10, 10, '#ce532e', true, true);
    createPlatform(610, 610, 10, 10, '#ce532e', true, true);
    createPlatform(620, 610, 10, 10, '#ce532e', true, true);
    createPlatform(630, 610, 10, 10, '#ce532e', true, true);
    createPlatform(690, 610, 10, 10, '#ce532e', true, true);
    createPlatform(640, 610, 10, 10, '#ce532e', true, true);
    createPlatform(650, 610, 10, 10, '#ce532e', true, true);
    createPlatform(700, 610, 10, 10, '#ce532e', true, true);
    createPlatform(740, 610, 10, 10, '#ce532e', true, true);
    createPlatform(770, 620, 10, 10, '#ce532e', true, true);
    createPlatform(770, 610, 10, 10, '#ce532e', true, true);
    createPlatform(210, 640, 10, 10, '#ce532e', true, true);
    createPlatform(200, 640, 10, 10, '#ce532e', true, true);
    createPlatform(240, 640, 10, 10, '#ce532e', true, true);
    createPlatform(290, 630, 10, 10, '#ce532e', true, true);
    createPlatform(310, 640, 10, 10, '#ce532e', true, true);
    createPlatform(300, 640, 10, 10, '#ce532e', true, true);
    createPlatform(290, 640, 10, 10, '#ce532e', true, true);
    createPlatform(370, 640, 10, 10, '#ce532e', true, true);
    createPlatform(350, 640, 10, 10, '#ce532e', true, true);
    createPlatform(360, 640, 10, 10, '#ce532e', true, true);
    createPlatform(280, 640, 10, 10, '#ce532e', true, true);
    createPlatform(270, 640, 10, 10, '#ce532e', true, true);
    createPlatform(290, 630, 10, 10, '#ce532e', true, true);
    createPlatform(280, 630, 10, 10, '#ce532e', true, true);
    createPlatform(1000, 640, 200, 10, '#ce532e', true, true);
    createPlatform(600, 630, 200, 10, '#ce532e', true, true);
    createPlatform(200, 660, 200, 10, '#ce532e', true, true);
    createPlatform(200, 670, 200, 10, '#ce532e', true, true);
    createPlatform(200, 680, 200, 10, '#ce532e', true, true);
    createPlatform(600, 640, 200, 10, '#ce532e', true, true);
    createPlatform(600, 650, 200, 10, '#ce532e', true, true);
    createPlatform(600, 660, 200, 10, '#ce532e', true, true);
    createPlatform(600, 680, 200, 10, '#ce532e', true, true);
    createPlatform(600, 670, 200, 10, '#ce532e', true, true);
    createPlatform(1000, 650, 200, 10, '#ce532e', true, true);
    createPlatform(1000, 660, 200, 10, '#ce532e', true, true);
    createPlatform(1000, 670, 200, 10, '#ce532e', true, true);
    createPlatform(1000, 680, 200, 10, '#af3f27', true, true);
    createPlatform(1000, 690, 200, 10, '#af3f27', true, true);
    createPlatform(1000, 700, 200, 10, '#af3f27', true, true);
    createPlatform(1000, 710, 200, 10, '#af3f27', true, true);
    createPlatform(1000, 720, 200, 10, '#af3f27', true, true);
    createPlatform(1000, 730, 200, 10, '#af3f27', true, true);
    createPlatform(600, 690, 200, 10, '#af3f27', true, true);
    createPlatform(600, 710, 200, 10, '#af3f27', true, true);
    createPlatform(600, 700, 200, 10, '#af3f27', true, true);
    createPlatform(600, 720, 200, 10, '#af3f27', true, true);
    createPlatform(600, 730, 200, 10, '#af3f27', true, true);
    createPlatform(200, 690, 200, 10, '#af3f27', true, true);
    createPlatform(200, 710, 200, 10, '#af3f27', true, true);
    createPlatform(200, 720, 200, 10, '#af3f27', true, true);
    createPlatform(200, 730, 200, 10, '#af3f27', true, true);
    createPlatform(200, 700, 200, 10, '#af3f27', true, true);
    createPlatform(600, 680, 200, 10, '#af3f27', true, true);
    createPlatform(1010, 670, 30, 10, '#af3f27', true, true);
    createPlatform(1070, 670, 30, 10, '#af3f27', true, true);
    createPlatform(1090, 660, 30, 10, '#af3f27', true, true);
    createPlatform(1100, 670, 30, 10, '#af3f27', true, true);
    createPlatform(1160, 670, 30, 10, '#af3f27', true, true);
    createPlatform(610, 670, 30, 10, '#af3f27', true, true);
    createPlatform(640, 670, 30, 10, '#af3f27', true, true);
    createPlatform(640, 660, 30, 10, '#af3f27', true, true);
    createPlatform(680, 670, 30, 10, '#af3f27', true, true);
    createPlatform(670, 670, 30, 10, '#af3f27', true, true);
    createPlatform(760, 660, 30, 10, '#af3f27', true, true);
    createPlatform(750, 670, 30, 10, '#af3f27', true, true);
    createPlatform(770, 670, 30, 10, '#af3f27', true, true);
    createPlatform(200, 680, 30, 10, '#af3f27', true, true);
    createPlatform(260, 690, 30, 10, '#af3f27', true, true);
    createPlatform(260, 680, 30, 10, '#af3f27', true, true);
    createPlatform(280, 670, 30, 10, '#af3f27', true, true);
    createPlatform(290, 680, 30, 10, '#af3f27', true, true);
    createPlatform(350, 680, 30, 10, '#af3f27', true, true);
    createPlatform(340, 680, 30, 10, '#af3f27', true, true);
    createPlatform(380, 680, 30, 10, '#af3f27', true, true);
    createPlatform(400, 610, 10, 100, '#262626', true, true);
    createCollectable('database',276.5, 360, 0, 0);
    createCollectable('database',686.5, 350, 0, 0);
    createCollectable('database',1086.5, 340, 0, 0);
    // createPlatform(500, 560, 700, 10); //right
    // createPlatform(500, 450, 10, 110); //right
    // createPlatform(300, 450, 200, 10);//right
    // createPlatform(300, 400, 10, 50);//right
    // createPlatform(100, 400, 200, 10); //right
    // createPlatform(100, 0, 10, 400); //right
    // createPlatform(1200, 200, 10, 370)
    // createPlatform(400, 300, 600, 10);//top
    // createPlatform(750, 0, 10, 300);//top wall
    // createCollectable('database', 850, 200, 5, 1); //collectables
    // createCollectable('database', 1280, 300, 5, 1);
    // createCollectable('database', 600, 200, 5, 1);
  }
  else if (savedLevel === 4){
    createPlatform(0, 12.5, 10, 100, '#078d1d');
createPlatform(10, 10, 10, 100, '#078d1d');
createPlatform(20, 40, 10, 100, '#078d1d');
createPlatform(20, 10, 10, 100, '#078d1d');
createPlatform(20, 0, 10, 100, '#078d1d');
createPlatform(30, -40, 10, 100, '#078d1d');
createPlatform(40, -20, 10, 100, '#078d1d');
createPlatform(50, -10, 10, 100, '#078d1d');
createPlatform(60, -20, 10, 100, '#078d1d');
createPlatform(100, -40, 10, 100, '#078d1d');
createPlatform(70, -40, 10, 100, '#078d1d');
createPlatform(80, -40, 10, 100, '#078d1d');
createPlatform(80, -30, 10, 100, '#078d1d');
createPlatform(90, -40, 10, 100, '#078d1d');
createPlatform(130, -20, 10, 100, '#078d1d');
createPlatform(120, -20, 10, 100, '#078d1d');
createPlatform(110, -10, 10, 100, '#078d1d');
createPlatform(150, 0, 10, 100, '#078d1d');
createPlatform(140, 0, 10, 100, '#078d1d');
createPlatform(170, 20, 10, 100, '#078d1d');
createPlatform(160, 30, 10, 100, '#078d1d');
createPlatform(160, -70, 10, 100, '#078d1d');
createPlatform(170, -60, 10, 100, '#078d1d');
createPlatform(180, -30, 10, 100, '#078d1d');
createPlatform(200, -20, 10, 100, '#078d1d');
createPlatform(190, -10, 10, 100, '#078d1d');
createPlatform(210, -10, 10, 100, '#078d1d');
createPlatform(220, 10, 10, 100, '#078d1d');
createPlatform(220, -70, 10, 100, '#078d1d');
createPlatform(240, -60, 10, 100, '#078d1d');
createPlatform(230, -60, 10, 100, '#078d1d');
createPlatform(230, -40, 10, 100, '#078d1d');
createPlatform(250, -40, 10, 100, '#078d1d');
createPlatform(260, -30, 10, 100, '#078d1d');
createPlatform(270, -60, 10, 100, '#078d1d');
createPlatform(280, -30, 10, 100, '#078d1d');
createPlatform(290, -20, 10, 100, '#078d1d');
createPlatform(300, -10, 10, 100, '#078d1d');
createPlatform(310, -30, 10, 100, '#078d1d');
createPlatform(320, -20, 10, 100, '#078d1d');
createPlatform(350, -10, 10, 100, '#078d1d');
createPlatform(340, -10, 10, 100, '#078d1d');
createPlatform(330, -20, 10, 100, '#078d1d');
createPlatform(360, 10, 10, 100, '#078d1d');
createPlatform(360, -20, 10, 100, '#078d1d');
createPlatform(370, -20, 10, 100, '#078d1d');
createPlatform(390, -30, 10, 100, '#078d1d');
createPlatform(380, -30, 10, 100, '#078d1d');
createPlatform(400, -30, 10, 100, '#078d1d');
createPlatform(410, -10, 10, 100, '#078d1d');
createPlatform(390, -20, 10, 100, '#078d1d');
createPlatform(420, 0, 10, 100, '#078d1d');
createPlatform(430, -30, 10, 100, '#078d1d');
createPlatform(440, -30, 10, 100, '#078d1d');
createPlatform(440, -10, 10, 100, '#078d1d');
createPlatform(450, -10, 10, 100, '#078d1d');
createPlatform(460, 0, 10, 100, '#078d1d');
createPlatform(480, -20, 10, 100, '#078d1d');
createPlatform(470, -50, 10, 100, '#078d1d');
createPlatform(490, -10, 10, 100, '#078d1d');
createPlatform(500, -30, 10, 100, '#078d1d');
createPlatform(510, -50, 10, 100, '#078d1d');
createPlatform(520, -30, 10, 100, '#078d1d');
createPlatform(530, -20, 10, 100, '#078d1d');
createPlatform(540, -10, 10, 100, '#078d1d');
createPlatform(550, -30, 10, 100, '#078d1d');
createPlatform(560, -20, 10, 100, '#078d1d');
createPlatform(580, -30, 10, 100, '#078d1d');
createPlatform(570, -50, 10, 100, '#078d1d');
createPlatform(570, -30, 10, 100, '#078d1d');
createPlatform(590, -30, 10, 100, '#078d1d');
createPlatform(600, -20, 10, 100, '#078d1d');
createPlatform(610, -40, 10, 100, '#078d1d');
createPlatform(620, -20, 10, 100, '#078d1d');
createPlatform(630, -10, 10, 100, '#078d1d');
createPlatform(640, -40, 10, 100, '#078d1d');
createPlatform(650, -30, 10, 100, '#078d1d');
createPlatform(670, -20, 10, 100, '#078d1d');
createPlatform(660, -10, 10, 100, '#078d1d');
createPlatform(660, -10, 10, 100, '#078d1d');
createPlatform(670, 0, 10, 100, '#078d1d');
createPlatform(680, 30, 10, 100, '#078d1d');
createPlatform(670, 30, 10, 100, '#078d1d');
createPlatform(670, 50, 10, 100, '#078d1d');
createPlatform(660, 30, 10, 100, '#078d1d');
createPlatform(650, 0, 10, 100, '#078d1d');
createPlatform(650, -10, 10, 100, '#078d1d');
createPlatform(700, -50, 10, 100, '#078d1d');
createPlatform(690, -50, 10, 100, '#078d1d');
createPlatform(670, -50, 10, 100, '#078d1d');
createPlatform(680, -50, 10, 100, '#078d1d');
createPlatform(720, 0, 10, 100, '#078d1d');
createPlatform(700, -10, 10, 100, '#078d1d');
createPlatform(720, -10, 10, 100, '#078d1d');
createPlatform(720, -20, 10, 100, '#078d1d');
createPlatform(710, -40, 10, 100, '#078d1d');
createPlatform(750, -30, 10, 100, '#078d1d');
createPlatform(740, -30, 10, 100, '#078d1d');
createPlatform(730, -40, 10, 100, '#078d1d');
createPlatform(770, -10, 10, 100, '#078d1d');
createPlatform(760, -10, 10, 100, '#078d1d');
createPlatform(790, 0, 10, 100, '#078d1d');
createPlatform(780, 0, 10, 100, '#078d1d');
createPlatform(800, -10, 10, 100, '#078d1d');
createPlatform(820, -30, 10, 100, '#078d1d');
createPlatform(810, -30, 10, 100, '#078d1d');
createPlatform(830, -10, 10, 100, '#078d1d');
createPlatform(850, 0, 10, 100, '#078d1d');
createPlatform(840, -10, 10, 100, '#078d1d');
createPlatform(860, 10, 10, 100, '#078d1d');
createPlatform(870, 30, 10, 100, '#078d1d');
createPlatform(870, 70, 10, 100, '#078d1d');
createPlatform(880, 60, 10, 100, '#078d1d');
createPlatform(890, 30, 10, 100, '#078d1d');
createPlatform(890, -50, 10, 100, '#078d1d');
createPlatform(870, -50, 10, 100, '#078d1d');
createPlatform(880, -40, 10, 100, '#078d1d');
createPlatform(870, -60, 10, 100, '#078d1d');
createPlatform(860, -80, 10, 100, '#078d1d');
createPlatform(900, -20, 10, 100, '#078d1d');
createPlatform(910, -40, 10, 100, '#078d1d');
createPlatform(930, -20, 10, 100, '#078d1d');
createPlatform(920, -10, 10, 100, '#078d1d');
createPlatform(940, -10, 10, 100, '#078d1d');
createPlatform(950, -30, 10, 100, '#078d1d');
createPlatform(960, -10, 10, 100, '#078d1d');
createPlatform(970, 10, 10, 100, '#078d1d');
createPlatform(990, -10, 10, 100, '#078d1d');
createPlatform(980, -20, 10, 100, '#078d1d');
createPlatform(970, -20, 10, 100, '#078d1d');
createPlatform(1000, 10, 10, 100, '#078d1d');
createPlatform(1020, 0, 10, 100, '#078d1d');
createPlatform(1010, -20, 10, 100, '#078d1d');
createPlatform(1000, -50, 10, 100, '#078d1d');
createPlatform(1040, 30, 10, 100, '#078d1d');
createPlatform(1040, 20, 10, 100, '#078d1d');
createPlatform(1030, 10, 10, 100, '#078d1d');
createPlatform(1020, -70, 10, 100, '#078d1d');
createPlatform(1040, -60, 10, 100, '#078d1d');
createPlatform(1030, -60, 10, 100, '#078d1d');
createPlatform(1050, -50, 10, 100, '#078d1d');
createPlatform(1060, -40, 10, 100, '#078d1d');
createPlatform(1070, -20, 10, 100, '#078d1d');
createPlatform(1090, -40, 10, 100, '#078d1d');
createPlatform(1080, -40, 10, 100, '#078d1d');
createPlatform(1080, -30, 10, 100, '#078d1d');
createPlatform(1110, -40, 10, 100, '#078d1d');
createPlatform(1100, -20, 10, 100, '#078d1d');
createPlatform(1130, -30, 10, 100, '#078d1d');
createPlatform(1120, -40, 10, 100, '#078d1d');
createPlatform(1150, -30, 10, 100, '#078d1d');
createPlatform(1140, -20, 10, 100, '#078d1d');
createPlatform(1140, -10, 10, 100, '#078d1d');
createPlatform(1170, -30, 10, 100, '#078d1d');
createPlatform(1180, 0, 10, 100, '#078d1d');
createPlatform(1170, -10, 10, 100, '#078d1d');
createPlatform(1160, -30, 10, 100, '#078d1d');
createPlatform(1210, -10, 10, 100, '#078d1d');
createPlatform(1200, 20, 10, 100, '#078d1d');
createPlatform(1190, 20, 10, 100, '#078d1d');
createPlatform(1190, -80, 10, 100, '#078d1d');
createPlatform(1200, -60, 10, 100, '#078d1d');
createPlatform(1220, -10, 10, 100, '#078d1d');
createPlatform(1240, -40, 10, 100, '#078d1d');
createPlatform(1240, -40, 10, 100, '#078d1d');
createPlatform(1230, -30, 10, 100, '#078d1d');
createPlatform(1270, -50, 10, 100, '#078d1d');
createPlatform(1250, -40, 10, 100, '#078d1d');
createPlatform(1260, -60, 10, 100, '#078d1d');
createPlatform(1310, -50, 10, 100, '#078d1d');
createPlatform(1280, -50, 10, 100, '#078d1d');
createPlatform(1300, -50, 10, 100, '#078d1d');
createPlatform(1290, -30, 10, 100, '#078d1d');
createPlatform(1340, -20, 10, 100, '#078d1d');
createPlatform(1330, -30, 10, 100, '#078d1d');
createPlatform(1320, -30, 10, 100, '#078d1d');
createPlatform(1370, -20, 10, 100, '#078d1d');
createPlatform(1350, -20, 10, 100, '#078d1d');
createPlatform(1360, -30, 10, 100, '#078d1d');
createPlatform(1390, -30, 10, 100, '#078d1d');
createPlatform(1390, -50, 10, 100, '#078d1d');
createPlatform(1380, -40, 10, 100, '#078d1d');
createPlatform(200, 700, 100, 100, '#8d4307');
createPlatform(300, 700, 100, 100, '#8d4307');
createPlatform(400, 600, 100, 100, '#8d4307');
createPlatform(400, 700, 100, 100, '#8d4307');
createPlatform(800, 500, 100, 100, '#8d4307');
createPlatform(700, 500, 100, 100, '#8d4307');
createPlatform(700, 600, 100, 100, '#8d4307');
createPlatform(700, 700, 100, 100, '#8d4307');
createPlatform(800, 700, 100, 100, '#8d4307');
createPlatform(800, 600, 100, 100, '#8d4307');
createPlatform(1200, 400, 100, 100, '#8d4307');
createPlatform(1300, 400, 100, 100, '#8d4307');
createPlatform(720, 510, 10, 100, '#552702');
createPlatform(710, 560, 10, 100, '#552702');
createPlatform(730, 600, 10, 100, '#552702');
createPlatform(720, 680, 10, 100, '#552702');
createPlatform(750, 670, 10, 100, '#552702');
createPlatform(740, 650, 10, 100, '#552702');
createPlatform(740, 600, 10, 100, '#552702');
createPlatform(770, 600, 10, 100, '#552702');
createPlatform(750, 580, 10, 100, '#552702');
createPlatform(760, 570, 10, 100, '#552702');
createPlatform(750, 550, 10, 100, '#552702');
createPlatform(740, 510, 10, 100, '#552702');
createPlatform(750, 500, 10, 100, '#552702');
createPlatform(770, 530, 10, 100, '#552702');
createPlatform(810, 550, 10, 100, '#552702');
createPlatform(780, 570, 10, 100, '#552702');
createPlatform(790, 580, 10, 100, '#552702');
createPlatform(810, 630, 10, 100, '#552702');
createPlatform(800, 630, 10, 100, '#552702');
createPlatform(800, 670, 10, 100, '#552702');
createPlatform(820, 670, 10, 100, '#552702');
createPlatform(840, 670, 10, 100, '#552702');
createPlatform(860, 690, 10, 100, '#552702');
createPlatform(850, 670, 10, 100, '#552702');
createPlatform(810, 660, 10, 100, '#552702');
createPlatform(830, 630, 10, 100, '#552702');
createPlatform(850, 630, 10, 100, '#552702');
createPlatform(880, 590, 10, 100, '#552702');
createPlatform(870, 610, 10, 100, '#552702');
createPlatform(880, 670, 10, 100, '#552702');
createPlatform(860, 600, 10, 100, '#552702');
createPlatform(840, 550, 10, 100, '#552702');
createPlatform(850, 560, 10, 100, '#552702');
createPlatform(820, 540, 10, 100, '#552702');
createPlatform(830, 530, 10, 100, '#552702');
createPlatform(860, 500, 10, 100, '#552702');
createPlatform(850, 500, 10, 100, '#552702');
createPlatform(840, 500, 10, 100, '#552702');
createPlatform(780, 500, 10, 100, '#552702');
createPlatform(790, 500, 10, 100, '#552702');
createPlatform(840, 570, 10, 100, '#552702');
createPlatform(850, 580, 10, 100, '#411e01');
createPlatform(840, 580, 10, 100, '#411e01');
createPlatform(840, 560, 10, 100, '#411e01');
createPlatform(850, 570, 10, 100, '#411e01');
createPlatform(830, 600, 10, 100, '#411e01');
createPlatform(840, 620, 10, 100, '#411e01');
createPlatform(770, 570, 10, 100, '#411e01');
createPlatform(760, 580, 10, 100, '#411e01');
createPlatform(740, 580, 10, 100, '#411e01');
createPlatform(750, 570, 10, 100, '#411e01');
createPlatform(750, 560, 10, 100, '#411e01');
createPlatform(750, 630, 10, 100, '#411e01');
createPlatform(770, 550, 10, 100, '#411e01');
createPlatform(780, 570, 10, 100, '#411e01');
createPlatform(770, 660, 10, 100, '#411e01');
createPlatform(750, 670, 10, 100, '#411e01');
createPlatform(760, 660, 10, 100, '#411e01');
createPlatform(790, 660, 10, 100, '#411e01');
createPlatform(780, 650, 10, 100, '#411e01');
createPlatform(1220, 420, 100, 10, '#623109');
createPlatform(1220, 430, 100, 10, '#623109');
createPlatform(1260, 440, 100, 10, '#623109');
createPlatform(1260, 440, 100, 10, '#623109');
createPlatform(1250, 450, 100, 10, '#623109');
createPlatform(1210, 460, 100, 10, '#623109');
createPlatform(1260, 460, 100, 10, '#623109');
createPlatform(1270, 470, 100, 10, '#623109');
createPlatform(1290, 460, 100, 10, '#623109');
createPlatform(1290, 480, 100, 10, '#623109');
createPlatform(1300, 480, 100, 10, '#623109');
createPlatform(1300, 460, 100, 10, '#623109');
createPlatform(1290, 450, 100, 10, '#623109');
createPlatform(1290, 420, 100, 10, '#623109');
createPlatform(1300, 430, 100, 10, '#623109');
createPlatform(1250, 440, 100, 10, '#371c06');
createPlatform(1270, 450, 100, 10, '#371c06');
createPlatform(1270, 460, 100, 10, '#371c06');
createPlatform(1230, 460, 100, 10, '#371c06');
createPlatform(1240, 470, 100, 10, '#371c06');
createCollectable("database", 1300, 200, 0, 0)
createCollectable("database", 1300, 600, 0, 0)
createCollectable("database", 775, 300, 0, 0)
createPlatform(-50, -50, canvas.width + 100, 50, "white"); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "rgb(28, 26, 26"); //right
    createPlatform(-50, -50, 50, canvas.height + 500, "rgb(28, 26, 26");
    createPlatform(canvas.width, -50, 50, canvas.height + 100, "rgb(28, 26, 26");
}
  else if (savedLevel === 2) {
    createPlatform(-50, -50, 1500, 50, 'white', true, false, true);
    createPlatform(-50, -50, 50, 1250, 'rgb(28, 26, 26', true, false, true);
    createPlatform(1400, -50, 50, 850, 'rgb(28, 26, 26', true, false, true);
    createPlatform(10000, 1, 100, 10, '#FFFFFF', true, false, true);
    createPlatform(-50, -50, 1500, 50, 'white', true, false, true);
    createPlatform(-50, -50, 50, 1250, 'rgb(28, 26, 26', true, false, true);
    createPlatform(1400, -50, 50, 850, 'rgb(28, 26, 26', true, false, true);
    createPlatform(10000, 1, 100, 10, '#FFFFFF', true, false, true);
    createPlatform(-50, -50, 1500, 50, 'white', true, false, true);
    createPlatform(-50, -50, 50, 1250, 'rgb(28, 26, 26', true, false, true);
    createPlatform(1400, -50, 50, 850, 'rgba(255, 0, 0, 0.5)', true, false, true);
    createPlatform(10000, 1, 100, 10, '#FFFFFF', true, false, true);
    createPlatform(-50, -50, 1500, 50, 'white', true, false, true);
    createPlatform(-50, -50, 50, 1250, 'rgb(28, 26, 26', true, false, true);
    createPlatform(1400, -50, 50, 850, 'rgba(255, 0, 0, 0.5)', true, false, true);
    createPlatform(10000, 1, 100, 10, '#FFFFFF', true, false, true);
    createPlatform(0, 700, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(0, 600, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(0, 500, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(100, 500, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(100, 600, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(100, 700, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(400, 500, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(400, 700, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(400, 600, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(500, 500, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(500, 600, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(500, 600, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(500, 700, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(800, 300, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1100, 200, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1100, 300, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1100, 400, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1100, 500, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1100, 700, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1200, 200, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1300, 200, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1300, 400, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1200, 300, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1300, 300, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1200, 400, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1200, 500, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1200, 600, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1200, 700, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1300, 700, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1300, 600, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1300, 500, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(1300, 200, 100, 10, '#262626', true, false, true);
    createPlatform(1200, 200, 100, 10, '#262626', true, false, true);
    createPlatform(1100, 200, 100, 10, '#262626', true, false, true);
    createPlatform(1100, 200, 10, 100, '#262626', true, false, true);
    createPlatform(1100, 300, 10, 100, '#262626', true, false, true);
    createPlatform(1100, 400, 10, 100, '#262626', true, false, true);
    createPlatform(1100, 500, 10, 100, '#262626', true, false, true);
    createPlatform(1100, 700, 10, 100, '#262626', true, false, true);
    createPlatform(800, 390, 100, 10, '#262626', true, false, true);
    createPlatform(890, 300, 10, 100, '#262626', true, false, true);
    createPlatform(800, 300, 100, 10, '#262626', true, false, true);
    createPlatform(400, 500, 100, 10, '#262626', true, false, true);
    createPlatform(500, 500, 100, 10, '#262626', true, false, true);
    createPlatform(400, 500, 10, 100, '#262626', true, false, true);
    createPlatform(400, 700, 10, 100, '#262626', true, false, true);
    createPlatform(400, 600, 10, 100, '#262626', true, false, true);
    createPlatform(590, 500, 10, 100, '#262626', true, false, true);
    createPlatform(590, 600, 10, 100, '#262626', true, false, true);
    createPlatform(590, 700, 10, 100, '#262626', true, false, true);
    createPlatform(190, 700, 10, 100, '#262626', true, false, true);
    createPlatform(190, 600, 10, 100, '#262626', true, false, true);
    createPlatform(190, 500, 10, 100, '#262626', true, false, true);
    createPlatform(100, 500, 100, 10, '#262626', true, false, true);
    createPlatform(0, 500, 100, 10, '#262626', true, false, true);
    createPlatform(700, 300, 100, 100, '#3d3d3d', true, false, true);
    createPlatform(700, 300, 100, 10, '#262626', true, false, true);
    createPlatform(700, 300, 10, 100, '#262626', true, false, true);
    createPlatform(700, 390, 100, 10, '#262626', true, false, true);
    createPlatform(810, 320, 10, 10, '#3d3d3d', true, false, true);
    createPlatform(720, 310, 10, 10, '#262626', true, false, true);
    createPlatform(710, 310, 10, 10, '#262626', true, false, true);
    createPlatform(710, 320, 10, 10, '#262626', true, false, true);
    createPlatform(720, 320, 10, 10, '#262626', true, false, true);
    createPlatform(730, 310, 10, 10, '#262626', true, false, true);
    createPlatform(710, 330, 10, 10, '#262626', true, false, true);
    createPlatform(710, 340, 10, 10, '#262626', true, false, true);
    createPlatform(740, 310, 10, 10, '#262626', true, false, true);
    createPlatform(710, 350, 10, 10, '#262626', true, false, true);
    createPlatform(710, 360, 10, 10, '#262626', true, false, true);
    createPlatform(710, 370, 10, 10, '#262626', true, false, true);
    createPlatform(710, 380, 10, 10, '#262626', true, false, true);
    createPlatform(720, 370, 10, 10, '#262626', true, false, true);
    createPlatform(720, 380, 10, 10, '#262626', true, false, true);
    createPlatform(730, 380, 10, 10, '#262626', true, false, true);
    createPlatform(740, 380, 10, 10, '#262626', true, false, true);
    createPlatform(880, 380, 10, 10, '#262626', true, false, true);
    createPlatform(870, 380, 10, 10, '#262626', true, false, true);
    createPlatform(860, 380, 10, 10, '#262626', true, false, true);
    createPlatform(850, 380, 10, 10, '#262626', true, false, true);
    createPlatform(880, 370, 10, 10, '#262626', true, false, true);
    createPlatform(870, 370, 10, 10, '#262626', true, false, true);
    createPlatform(880, 350, 10, 10, '#262626', true, false, true);
    createPlatform(880, 360, 10, 10, '#262626', true, false, true);
    createPlatform(880, 330, 10, 10, '#262626', true, false, true);
    createPlatform(880, 330, 10, 10, '#262626', true, false, true);
    createPlatform(880, 320, 10, 10, '#262626', true, false, true);
    createPlatform(880, 310, 10, 10, '#262626', true, false, true);
    createPlatform(870, 310, 10, 10, '#262626', true, false, true);
    createPlatform(860, 310, 10, 10, '#262626', true, false, true);
    createPlatform(870, 320, 10, 10, '#262626', true, false, true);
    createPlatform(890, 340, 10, 10, '#262626', true, false, true);
    createPlatform(880, 340, 10, 10, '#262626', true, false, true);
    createPlatform(860, 310, 10, 10, '#262626', true, false, true);
    createPlatform(850, 310, 10, 10, '#262626', true, false, true);
    createPlatform(1110, 210, 10, 10, '#262626', true, false, true);
    createPlatform(1110, 220, 10, 10, '#262626', true, false, true);
    createPlatform(1110, 230, 10, 10, '#262626', true, false, true);
    createPlatform(1110, 240, 10, 10, '#262626', true, false, true);
    createPlatform(1120, 220, 10, 10, '#262626', true, false, true);
    createPlatform(1120, 210, 10, 10, '#262626', true, false, true);
    createPlatform(1140, 210, 10, 10, '#262626', true, false, true);
    createPlatform(1130, 210, 10, 10, '#262626', true, false, true);
    createPlatform(580, 510, 10, 10, '#262626', true, false, true);
    createPlatform(570, 510, 10, 10, '#262626', true, false, true);
    createPlatform(560, 510, 10, 10, '#262626', true, false, true);
    createPlatform(560, 510, 10, 10, '#262626', true, false, true);
    createPlatform(550, 510, 10, 10, '#262626', true, false, true);
    createPlatform(580, 520, 10, 10, '#262626', true, false, true);
    createPlatform(580, 530, 10, 10, '#262626', true, false, true);
    createPlatform(580, 540, 10, 10, '#262626', true, false, true);
    createPlatform(570, 520, 10, 10, '#262626', true, false, true);
    createPlatform(410, 510, 10, 10, '#262626', true, false, true);
    createPlatform(420, 510, 10, 10, '#262626', true, false, true);
    createPlatform(430, 510, 10, 10, '#262626', true, false, true);
    createPlatform(440, 510, 10, 10, '#262626', true, false, true);
    createPlatform(410, 520, 10, 10, '#262626', true, false, true);
    createPlatform(410, 530, 10, 10, '#262626', true, false, true);
    createPlatform(410, 540, 10, 10, '#262626', true, false, true);
    createPlatform(420, 520, 10, 10, '#262626', true, false, true);
    createPlatform(180, 510, 10, 10, '#262626', true, false, true);
    createPlatform(170, 510, 10, 10, '#262626', true, false, true);
    createPlatform(160, 510, 10, 10, '#262626', true, false, true);
    createPlatform(150, 510, 10, 10, '#262626', true, false, true);
    createPlatform(180, 520, 10, 10, '#262626', true, false, true);
    createPlatform(180, 530, 10, 10, '#262626', true, false, true);
    createPlatform(180, 540, 10, 10, '#262626', true, false, true);
    createPlatform(170, 520, 10, 10, '#262626', true, false, true);
    createPlatform(600, 600, 100, 10, '#fdc93b', true, true, false);
    createPlatform(900, 600, 100, 10, '#fdc93b', true, true, false);
    createPlatform(1000, 600, 100, 10, '#fdc93b', true, true, false);
    createPlatform(300, 600, 100, 10, '#fdc93b', true, true, false);
    createPlatform(200, 600, 100, 10, '#fdc93b', true, true, false);
    createPlatform(700, 610, 100, 10, '#fdc93b', true, true, false);
    createPlatform(800, 610, 100, 10, '#fdc93b', true, true, false);
    createPlatform(930, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(940, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(950, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(940, 580, 10, 10, '#fdc93b', true, true, false);
    createPlatform(970, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(970, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(960, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(950, 580, 10, 10, '#fdc93b', true, true, false);
    createPlatform(1040, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(1030, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(1020, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(1070, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(1080, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(1090, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(1090, 580, 10, 10, '#fdc93b', true, true, false);
    createPlatform(850, 600, 10, 10, '#fdc93b', true, true, false);
    createPlatform(870, 600, 10, 10, '#fdc93b', true, true, false);
    createPlatform(860, 600, 10, 10, '#fdc93b', true, true, false);
    createPlatform(860, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(850, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(840, 600, 10, 10, '#fdc93b', true, true, false);
    createPlatform(830, 600, 10, 10, '#fdc93b', true, true, false);
    createPlatform(740, 600, 10, 10, '#fdc93b', true, true, false);
    createPlatform(730, 600, 10, 10, '#fdc93b', true, true, false);
    createPlatform(610, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(630, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(650, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(640, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(610, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(620, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(200, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(210, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(220, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(240, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(230, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(200, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(200, 580, 10, 10, '#fdc93b', true, true, false);
    createPlatform(210, 580, 10, 10, '#fdc93b', true, true, false);
    createPlatform(360, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(350, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(350, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(340, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(320, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(330, 590, 10, 10, '#fdc93b', true, true, false);
    createPlatform(340, 580, 10, 10, '#fdc93b', true, true, false);
    createPlatform(350, 580, 10, 10, '#fdc93b', true, true, false);
    createPlatform(660, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(650, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(600, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(610, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(640, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(620, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(600, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(680, 630, 40, 10, '#ee8824', true, true, false);
    createPlatform(680, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(750, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(720, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(800, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(790, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(840, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(850, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(890, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(900, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(950, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(950, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(910, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(910, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(900, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(1000, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(1010, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(990, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(990, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(1050, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(1060, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(1060, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(1040, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(830, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(920, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(200, 600, 40, 10, '#ee8824', true, true, false);
    createPlatform(200, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(250, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(240, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(290, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(340, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(330, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(360, 610, 40, 10, '#ee8824', true, true, false);
    createPlatform(360, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(310, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(280, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(340, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(230, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(240, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(200, 620, 40, 10, '#ee8824', true, true, false);
    createPlatform(340, 600, 10, 10, '#ee8824', true, true, false);
    createPlatform(350, 600, 10, 10, '#ee8824', true, true, false);
    createPlatform(200, 590, 10, 10, '#ee8824', true, true, false);
    createPlatform(950, 600, 10, 10, '#ee8824', true, true, false);
    createPlatform(940, 600, 10, 10, '#ee8824', true, true, false);
    createPlatform(200, 620, 40, 10, '#ce532e', true, true, false);
    createPlatform(240, 620, 40, 10, '#ce532e', true, true, false);
    createPlatform(250, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(280, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(310, 620, 40, 10, '#ce532e', true, true, false);
    createPlatform(330, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(320, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(360, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(200, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(210, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(600, 620, 40, 10, '#ce532e', true, true, false);
    createPlatform(630, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(600, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(660, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(710, 640, 40, 10, '#ce532e', true, true, false);
    createPlatform(730, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(680, 640, 40, 10, '#ce532e', true, true, false);
    createPlatform(720, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(770, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(810, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(780, 620, 40, 10, '#ce532e', true, true, false);
    createPlatform(850, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(890, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(920, 620, 40, 10, '#ce532e', true, true, false);
    createPlatform(930, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(970, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(1000, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(1000, 620, 40, 10, '#ce532e', true, true, false);
    createPlatform(1040, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(1060, 630, 40, 10, '#ce532e', true, true, false);
    createPlatform(200, 640, 200, 10, '#ce532e', true, true, false);
    createPlatform(600, 640, 200, 10, '#ce532e', true, true, false);
    createPlatform(800, 640, 200, 10, '#ce532e', true, true, false);
    createPlatform(900, 640, 200, 10, '#ce532e', true, true, false);
    createPlatform(200, 650, 200, 10, '#ce532e', true, true, false);
    createPlatform(600, 650, 200, 10, '#ce532e', true, true, false);
    createPlatform(800, 650, 200, 10, '#ce532e', true, true, false);
    createPlatform(900, 650, 200, 10, '#ce532e', true, true, false);
    createPlatform(200, 660, 200, 10, '#ce532e', true, true, false);
    createPlatform(600, 660, 200, 10, '#ce532e', true, true, false);
    createPlatform(800, 660, 200, 10, '#ce532e', true, true, false);
    createPlatform(890, 660, 200, 10, '#ce532e', true, true, false);
    createPlatform(900, 650, 200, 10, '#ce532e', true, true, false);
    createPlatform(900, 660, 200, 10, '#ce532e', true, true, false);
    createPlatform(200, 670, 200, 10, '#ce532e', true, true, false);
    createPlatform(600, 670, 200, 10, '#ce532e', true, true, false);
    createPlatform(800, 680, 200, 10, '#ce532e', true, true, false);
    createPlatform(800, 680, 200, 10, '#ce532e', true, true, false);
    createPlatform(800, 670, 200, 10, '#ce532e', true, true, false);
    createPlatform(900, 670, 200, 10, '#ce532e', true, true, false);
    createPlatform(900, 680, 200, 10, '#ce532e', true, true, false);
    createPlatform(600, 700, 200, 10, '#af3f27', true, true, false);
    createPlatform(600, 710, 200, 10, '#af3f27', true, true, false);
    createPlatform(600, 730, 200, 10, '#af3f27', true, true, false);
    createPlatform(600, 720, 200, 10, '#af3f27', true, true, false);
    createPlatform(800, 700, 200, 50, '#af3f27', true, true, false);
    createPlatform(900, 700, 200, 50, '#af3f27', true, true, false);
    createPlatform(600, 710, 200, 50, '#af3f27', true, true, false);
    createPlatform(200, 700, 200, 50, '#af3f27', true, true, false);
    createPlatform(200, 680, 200, 50, '#af3f27', true, true, false);
    createPlatform(600, 680, 200, 50, '#af3f27', true, true, false);
    createPlatform(800, 690, 200, 50, '#af3f27', true, true, false);
    createPlatform(890, 690, 200, 50, '#af3f27', true, true, false);
    createPlatform(900, 690, 200, 50, '#af3f27', true, true, false);
    createPlatform(640, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(630, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(620, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(650, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(640, 660, 10, 10, '#af3f27', true, true, false);
    createPlatform(660, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(650, 660, 10, 10, '#af3f27', true, true, false);
    createPlatform(700, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(720, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(710, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(750, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(760, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(800, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(800, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(850, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(870, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(860, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(840, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(860, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(870, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(890, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(890, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(880, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(900, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(900, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(910, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(910, 660, 10, 10, '#af3f27', true, true, false);
    createPlatform(920, 660, 10, 10, '#af3f27', true, true, false);
    createPlatform(920, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(910, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(920, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(930, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(940, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(960, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(950, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(960, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(950, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(940, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(930, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(970, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(980, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(1010, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(1040, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(1030, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(1030, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(1030, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(1080, 680, 10, 10, '#af3f27', true, true, false);
    createPlatform(1100, 600, 100, 100, '#3d3d3d', true, true, false);
    createPlatform(1100, 600, 10, 100, '#262626', true, true, false);
    createPlatform(200, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(220, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(210, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(210, 660, 10, 10, '#af3f27', true, true, false);
    createPlatform(250, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(240, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(230, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(360, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(380, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(370, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(390, 670, 10, 10, '#af3f27', true, true, false);
    createPlatform(390, 660, 10, 10, '#af3f27', true, true, false);
    createPlatform(380, 660, 10, 10, '#af3f27', true, true, false);
    createPlatform(880, 290, 10, 10, '#808080', false, false, false);
    createPlatform(870, 290, 10, 10, '#808080', false, false, false);
    createPlatform(860, 290, 10, 10, '#808080', false, false, false);
    createPlatform(850, 290, 10, 10, '#808080', false, false, false);
    createPlatform(840, 290, 10, 10, '#808080', false, false, false);
    createPlatform(850, 280, 10, 10, '#808080', false, false, false);
    createPlatform(860, 280, 10, 10, '#808080', false, false, false);
    createPlatform(870, 280, 10, 10, '#808080', false, false, false);
    createPlatform(860, 270, 10, 10, '#808080', false, false, false);
    createPlatform(860, 260, 10, 10, '#808080', false, false, false);
    createPlatform(860, 250, 10, 10, '#808080', false, false, false);
    createPlatform(860, 240, 10, 10, '#808080', false, false, false);
    createPlatform(850, 240, 10, 10, '#808080', false, false, false);
    createPlatform(870, 240, 10, 10, '#808080', false, false, false);
    createPlatform(870, 220, 10, 10, '#808080', false, false, false);
    createPlatform(870, 230, 10, 10, '#808080', false, false, false);
    createPlatform(870, 210, 10, 10, '#808080', false, false, false);
    createPlatform(870, 200, 10, 10, '#808080', false, false, false);
    createPlatform(860, 200, 10, 10, '#808080', false, false, false);
    createPlatform(850, 200, 10, 10, '#808080', false, false, false);
    createPlatform(850, 210, 10, 10, '#808080', false, false, false);
    createPlatform(850, 220, 10, 10, '#808080', false, false, false);
    createPlatform(850, 230, 10, 10, '#808080', false, false, false);
    createPlatform(860, 200, 10, 10, '#808080', false, false, false);
    createPlatform(860, 190, 10, 10, '#808080', false, false, false);
    createPlatform(860, 180, 10, 10, '#808080', false, false, false);
    createPlatform(860, 170, 10, 10, '#808080', false, false, false);
    createPlatform(860, 160, 10, 10, '#808080', false, false, false);
    createPlatform(850, 160, 10, 10, '#808080', false, false, false);
    createPlatform(870, 160, 10, 10, '#808080', false, false, false);
    createPlatform(870, 150, 10, 10, '#808080', false, false, false);
    createPlatform(870, 140, 10, 10, '#808080', false, false, false);
    createPlatform(870, 130, 10, 10, '#808080', false, false, false);
    createPlatform(870, 120, 10, 10, '#808080', false, false, false);
    createPlatform(860, 120, 10, 10, '#808080', false, false, false);
    createPlatform(850, 120, 10, 10, '#808080', false, false, false);
    createPlatform(850, 140, 10, 10, '#808080', false, false, false);
    createPlatform(850, 150, 10, 10, '#808080', false, false, false);
    createPlatform(850, 130, 10, 10, '#808080', false, false, false);
    createPlatform(860, 100, 10, 10, '#808080', false, false, false);
    createPlatform(860, 110, 10, 10, '#808080', false, false, false);
    createPlatform(860, 90, 10, 10, '#808080', false, false, false);
    createPlatform(850, 80, 10, 10, '#808080', false, false, false);
    createPlatform(860, 80, 10, 10, '#808080', false, false, false);
    createPlatform(870, 70, 10, 10, '#808080', false, false, false);
    createPlatform(870, 80, 10, 10, '#808080', false, false, false);
    createPlatform(870, 60, 10, 10, '#808080', false, false, false);
    createPlatform(870, 50, 10, 10, '#808080', false, false, false);
    createPlatform(870, 40, 10, 10, '#808080', false, false, false);
    createPlatform(860, 40, 10, 10, '#808080', false, false, false);
    createPlatform(850, 40, 10, 10, '#808080', false, false, false);
    createPlatform(850, 50, 10, 10, '#808080', false, false, false);
    createPlatform(850, 60, 10, 10, '#808080', false, false, false);
    createPlatform(850, 70, 10, 10, '#808080', false, false, false);
    createPlatform(860, 10, 10, 10, '#808080', false, false, false);
    createPlatform(860, 20, 10, 10, '#808080', false, false, false);
    createPlatform(860, 30, 10, 10, '#808080', false, false, false);
    createPlatform(850, 0, 10, 10, '#808080', false, false, false);
    createPlatform(860, 0, 10, 10, '#808080', false, false, false);
    createPlatform(870, 0, 10, 10, '#808080', false, false, false);
    createPlatform(710, 290, 10, 10, '#808080', false, false, false);
    createPlatform(720, 290, 10, 10, '#808080', false, false, false);
    createPlatform(730, 290, 10, 10, '#808080', false, false, false);
    createPlatform(740, 290, 10, 10, '#808080', false, false, false);
    createPlatform(750, 290, 10, 10, '#808080', false, false, false);
    createPlatform(730, 280, 10, 10, '#808080', false, false, false);
    createPlatform(720, 280, 10, 10, '#808080', false, false, false);
    createPlatform(740, 280, 10, 10, '#808080', false, false, false);
    createPlatform(730, 270, 10, 10, '#808080', false, false, false);
    createPlatform(730, 260, 10, 10, '#808080', false, false, false);
    createPlatform(730, 250, 10, 10, '#808080', false, false, false);
    createPlatform(720, 240, 10, 10, '#808080', false, false, false);
    createPlatform(740, 240, 10, 10, '#808080', false, false, false);
    createPlatform(730, 240, 10, 10, '#808080', false, false, false);
    createPlatform(740, 230, 10, 10, '#808080', false, false, false);
    createPlatform(740, 220, 10, 10, '#808080', false, false, false);
    createPlatform(740, 210, 10, 10, '#808080', false, false, false);
    createPlatform(740, 200, 10, 10, '#808080', false, false, false);
    createPlatform(730, 200, 10, 10, '#808080', false, false, false);
    createPlatform(720, 200, 10, 10, '#808080', false, false, false);
    createPlatform(720, 210, 10, 10, '#808080', false, false, false);
    createPlatform(720, 220, 10, 10, '#808080', false, false, false);
    createPlatform(720, 230, 10, 10, '#808080', false, false, false);
    createPlatform(730, 170, 10, 10, '#808080', false, false, false);
    createPlatform(730, 180, 10, 10, '#808080', false, false, false);
    createPlatform(730, 190, 10, 10, '#808080', false, false, false);
    createPlatform(720, 150, 10, 10, '#808080', false, false, false);
    createPlatform(730, 160, 10, 10, '#808080', false, false, false);
    createPlatform(720, 160, 10, 10, '#808080', false, false, false);
    createPlatform(740, 160, 10, 10, '#808080', false, false, false);
    createPlatform(740, 150, 10, 10, '#808080', false, false, false);
    createPlatform(740, 140, 10, 10, '#808080', false, false, false);
    createPlatform(740, 130, 10, 10, '#808080', false, false, false);
    createPlatform(740, 120, 10, 10, '#808080', false, false, false);
    createPlatform(730, 120, 10, 10, '#808080', false, false, false);
    createPlatform(720, 120, 10, 10, '#808080', false, false, false);
    createPlatform(720, 130, 10, 10, '#808080', false, false, false);
    createPlatform(720, 140, 10, 10, '#808080', false, false, false);
    createPlatform(730, 80, 10, 10, '#808080', false, false, false);
    createPlatform(730, 90, 10, 10, '#808080', false, false, false);
    createPlatform(730, 100, 10, 10, '#808080', false, false, false);
    createPlatform(730, 110, 10, 10, '#808080', false, false, false);
    createPlatform(720, 80, 10, 10, '#808080', false, false, false);
    createPlatform(740, 80, 10, 10, '#808080', false, false, false);
    createPlatform(740, 60, 10, 10, '#808080', false, false, false);
    createPlatform(740, 70, 10, 10, '#808080', false, false, false);
    createPlatform(740, 50, 10, 10, '#808080', false, false, false);
    createPlatform(740, 40, 10, 10, '#808080', false, false, false);
    createPlatform(730, 40, 10, 10, '#808080', false, false, false);
    createPlatform(720, 40, 10, 10, '#808080', false, false, false);
    createPlatform(720, 50, 10, 10, '#808080', false, false, false);
    createPlatform(720, 70, 10, 10, '#808080', false, false, false);
    createPlatform(720, 60, 10, 10, '#808080', false, false, false);
    createPlatform(730, 10, 10, 10, '#808080', false, false, false);
    createPlatform(730, 20, 10, 10, '#808080', false, false, false);
    createPlatform(730, 30, 10, 10, '#808080', false, false, false);
    createPlatform(720, 0, 10, 10, '#808080', false, false, false);
    createPlatform(730, 0, 10, 10, '#808080', false, false, false);
    createPlatform(740, 0, 10, 10, '#808080', false, false, false);
    createCollectable('database',1028, 479, 0, 0);
    createCollectable('database',932, 326, 0, 0);
    createCollectable('database',281, 344, 0, 0);
    createCollectable('database',1335, 57, 0, 0);
    
    

  } 
  else if (savedLevel === 3) {
    min = 400
    max = 600
    createPlatform(400, 300, 200, 15, "#FF00FF", false);
    createPlatform(0, 200, 200, 15, "white");
    
    createPlatform(-50, -50, canvas.width + 100, 50, "white"); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "rgb(28, 26, 26"); //right
    createPlatform(-50, -50, 50, canvas.height + 500, "rgb(28, 26, 26");
    createPlatform(canvas.width, -50, 50, canvas.height + 100, "rgb(28, 26, 26");
    
    createCollectable('database', 1280, 450, 0, 0); //collectables
 
  } 
  else{
    
  }
  
    
    
}