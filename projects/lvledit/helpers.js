
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
let editMode = true;
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
let barSwitch = document.getElementById('dropdown');
let platbar = jQuery('#platformBar');
let collbar = jQuery('#collectableBar');
let cannbar = jQuery('#cannonBar');
let exporbar = jQuery('#exOutput');
let gRange;
let rotatedir = "left";
let bRange;
let rotationPoint;
let msslider;
let lvlData;
let uploadCondition1 = false;
let platformKills = false;
let platformCollides = true;
var msvalue;
window.onload = (event) => {
  msslider = document.getElementById('ms');
  msvalue = document.getElementById('msvalue');

  msvalue.value = msslider.value;

  msslider.oninput = function () {
    msvalue.value = msslider.value;
  };
  msvalue.oninput = function () {
    msslider.value = msvalue.value;
  };
};


///////////////////////////////////////////////
// Core functionality /////////////////////////
///////////////////////////////////////////////
function registerSetup(setup) {
  setupGame = setup;
}


function placeTypeChange() {
  placetype = document.getElementById('dropdown').value;
  if (placetype === "platform") {
    platbar = jQuery('#platformBar');

    platbar.css("display", "inherit");

  } else {
    platbar = jQuery('#platformBar');
    platbar.css("display", "none");
  }
  if (placetype === "collectable") {
    collbar = jQuery('#collectableBar');
    collbar.css("display", "inherit");
  } else {
    collbar = jQuery('#collectableBar');
    collbar.css("display", "none");
  }
  if (placetype === "cannon") {
    cannbar = jQuery('#cannonBar');
    cannbar.css("display", "inherit");
  } else {
    cannbar = jQuery('#cannonBar');
    cannbar.css("display", "none");
  }
  if (placetype === "output") {
    exporbar = jQuery('#exOutput');
    exporbar.css("display", "inherit");
  } else {
    exporbar = jQuery('#exOutput');
    exporbar.css("display", "none");
  }
  if (placetype === "import"){
    imporbar = jQuery('#importBar');
    imporbar.css("display", "inherit");
  } else {
    imporbar = jQuery('#importBar');
    imporbar.css("display", "none");
  }
}



var lor;
var savedLevels = parseInt(getCookie("lvlNum"));
var nextlvlint = savedLevels + 1;




function main() {
  ctx.clearRect(0, 0, 1400, 760); //erase the screen so you can draw everything in it's most current position
 

  if (player.deadAndDeathAnimationDone) {
    deathOfPlayer();
    return;
  }

  rotationPoint = 80 - gridSize / 2;

  //MOoooving platformssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  if (savedLevels === 4 || savedLevels === 3) {
    if (platforms[0].x <= min) {
      lor = true;
    }
    else if (platforms[0].x >= max) {
      lor = false;
    }



    if (lor === true) {
      platforms[0].x += 1;
    }
    else if (lor === false) {
      platforms[0].x -= 1;
    }
  }
  //enddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
  let collected;

  for (var i = 0; i < collectables.length; i++) {
    collected += 1;
    if (collected >= collected.length) {
      setInterval(main, 100000);
    }
  }



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
  drawPlatforms();
  drawOutlines();

  drawCannons();
  drawCollectables();
  document.getElementById("demo");



  if (editMode === false) {
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



  }




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

function SizeButton2() {
  gridSize /= 2;
  document.getElementById("gridinput").value = gridSize;
}
function SizeButton3() {
  gridSize *= 2;
  document.getElementById("gridinput").value = gridSize;
}
function SizeButton4() {
  gridSize = parseFloat(document.getElementById("gridinput").value);
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
    ctx.drawImage(
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
    ctx.save();
    ctx.scale(-1, 1); //mirror the entire canvas
    ctx.drawImage(
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
    ctx.restore(); //put the canvas back to normal
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
      //now that we know we have collided, we figure out the direction of collision
      if(platforms[i].kills && currentAnimationType !== animationTypes.frontDeath){
        frameIndex = 60;
        currentAnimationType = animationTypes.frontDeath;
      }
      if(platforms[i].collides){
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
function snapChange() {
  if (gridSnap === false) {
    gridSnap = true;
  }
  else if (gridSnap === true) {
    gridSnap = false;
  }
}
function snapChange2() {
  if (editMode === false) {
    editMode = true;
    for (var i = 0; i < collectables.length; i++) {
      collectables[i].collected = false;
    }
  }
  else if (editMode === true) {
    editMode = false;
  }
}
function snapChange3() {
  if (placemode === false) {
    placemode = true;
    document.getElementById("removeMode").innerHTML = "Remove Mode";
    document.getElementById("gridSlider").checked = true;
    gridSnap = true;

    placecolor = "rgba(255, 255, 255, 0.3)";
  }
  else if (placemode === true) {
    placemode = false;
    document.getElementById("removeMode").innerHTML = "Place Mode";
    document.getElementById("gridSlider").checked = false;
    gridSnap = false;
  }
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
    snapChange2()
    player.x = 50
    player.y = 100
    player.speedX = 0
    player.speedY = 0
    player.onGround = false
    player.facingRight = true
    player.deadAndDeathAnimationDone = false
    ctx.clearRect(0, 0, 1800, 1800)
    currentAnimationType = animationTypes.run;

  }
}
function changeIfKills(){
  if (platformKills){
    platformKills = false
  } else {
    platformKills = true
  }
}
function changeIfCollides(){
  if (platformCollides){
    platformCollides = false
  } else {
    platformCollides = true
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
function setColor() {
  setcolor = document.getElementById("color").value;
}
function place() {
  if (placemode) {
    if (placetype === "platform") {
      if (setWidth < 0 && setHeight < 0 && gridSnap) {
        cursorX += gridSize;
        cursorY += gridSize;
      }
      createPlatform(cursorX, cursorY, setWidth, setHeight, setcolor, true, platformKills, platformCollides);
    }
    else if (placetype === "collectable") {
      gRange = ((document.getElementById("gRange").value) / 100);
      bRange = ((document.getElementById("bRange").value) / 100);
      if (gridSnap) {
        createCollectable('database', cursorX + (gridSize / 2 - (database.width / 2)), cursorY + (gridSize / 2 - (database.height / 2)), gRange, bRange, cursorX + (gridSize / 2 - (database.width / 2)), cursorY + (gridSize / 2 - (database.height / 2)));
      }
      else {
        createCollectable('database', cursorX, cursorY, gRange, bRange, cursorX, cursorY);
      }
    }
    else if (placetype === "cannon") {
      createCannon(rotatedir, cursorX, cursorY, msslider.value);
    }
  }
  else {

    remove();
    placecolor = "rgba(255, 0, 0, 0)";
  }
}

function drawPlatforms() {
  for (var i = 0; i < platforms.length; i++) {
    ctx.fillStyle = platforms[i].color;
    ctx.fillStyle = platforms[i].color;
    ctx.fillRect(
      platforms[i].x,
      platforms[i].y,
      platforms[i].width,
      platforms[i].height
    );

  }
}
function drawOutlines() {
  if (placemode) {
    if (placetype === "platform") {
      ctx.fillStyle = setcolor + "3F";
      ctx.fillRect(
        outlines[0].x,
        outlines[0].y,
        outlines[0].width,
        outlines[0].height
      );
    }
    else if (placetype === "collectable") {
      if (gridSnap === true) {
        ctx.drawImage(
          database,

          cursorX + (gridSize / 2 - (database.width / 2)),
          cursorY + (gridSize / 2 - (database.height / 2)),
          database.width,
          database.height
        );
      }
      else {
        ctx.drawImage(
          database,
          cursorX,
          cursorY,
          37,
          50
        );
      }

    }
    else if (placetype === "cannon") {
      if (gridSnap) {

        if (rotatedir === "top") {
          cannons[0] = {
            x: cursorX + cannonWidth / 2 + (gridSize / 2),
            y: cursorY + rotationPoint + (gridSize / 2),
            rotation: 180,
            projectileCountdown: 0,
            location: "top",
            timeBetweenShots: 10 / (1000 / frameRate),
            projectileWidth: 10,
            projectileHeight: 10
          };
          canpos = cannons[0].x;
        } else if (rotatedir === "bottom") {
          cannons[0] = {
            x: cursorX - cannonWidth / 2 + (gridSize / 2),
            y: cursorY - rotationPoint + (gridSize / 2),
            // x: cursorX - cannonWidth / 2,
            // y: cursorY,
            rotation: 0,
            projectileCountdown: 0,
            location: "bottom",
            timeBetweenShots: 10 / (1000 / frameRate),
            projectileWidth: 10,
            projectileHeight: 10,
          };
          canpos = cannons[0].x;
        } else if (rotatedir === "left") {
          cannons[0] = {
            // x: cursorX,
            // y: cursorY - cannonWidth / 2,
            x: cursorX + cannonHeight,
            y: cursorY - cannonWidth / 2 + (gridSize / 2),
            rotation: 90,
            projectileCountdown: 0,
            location: "left",
            timeBetweenShots: 10 / (1000 / frameRate),
            projectileWidth: 10,
            projectileHeight: 10,
          };
          canpos = cannons[0].y;
        } else if (rotatedir === "right") {
          cannons[0] = {
            // x: cursorX,
            // y: cursorY + cannonWidth / 2,
            x: cursorX - cannonHeight + gridSize,
            y: cursorY + cannonWidth / 2 + (gridSize / 2),
            rotation: 270,
            projectileCountdown: 0,
            location: "right",
            timeBetweenShots: 10 / (1000 / frameRate),
            projectileWidth: 10,
            projectileHeight: 10,
          };
          canpos = cannons[0].y;
        }
      } else {
        if (rotatedir === "top") {
          cannons[0] = {
            x: cursorX + cannonWidth / 2,
            y: cursorY,
            rotation: 180,
            projectileCountdown: 0,
            location: "top",
            timeBetweenShots: 10 / (1000 / frameRate),
            projectileWidth: 10,
            projectileHeight: 10
          };
          canpos = cannons[0].x;
        } else if (rotatedir === "bottom") {
          cannons[0] = {
            x: cursorX - cannonWidth / 2,
            y: cursorY,
            rotation: 0,
            projectileCountdown: 0,
            location: "bottom",
            timeBetweenShots: 10 / (1000 / frameRate),
            projectileWidth: 10,
            projectileHeight: 10,
          };
          canpos = cannons[0].x;
        } else if (rotatedir === "left") {
          cannons[0] = {
            x: cursorX,
            y: cursorY - cannonWidth / 2,
            rotation: 90,
            projectileCountdown: 0,
            location: "left",
            timeBetweenShots: 10 / (1000 / frameRate),
            projectileWidth: 10,
            projectileHeight: 10,
          };
          canpos = cannons[0].y;
        } else if (rotatedir === "right") {
          cannons[0] = {
            x: cursorX,
            y: cursorY + cannonWidth / 2,
            rotation: 270,
            projectileCountdown: 0,
            location: "right",
            timeBetweenShots: 10 / (1000 / frameRate),
            projectileWidth: 10,
            projectileHeight: 10,
          };
          canpos = cannons[0].y;
        }
      }
    }
  }
}

function createOutline(x, y, width, height) {
  if (placetype === "platform") {
    outlines[0] = ({ x, y, width, height });
  }
  //this makes a platform using a seperate array i could have just made a fill style but whatever
  //collectables are in draw func


}


function drawProjectiles() {
  for (var i = 0; i < projectiles.length; i++) {
    ctx.drawImage(
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

    ctx.fillStyle = "blue";
    ctx.save(); //save the current translation of the screen.
    ctx.translate(cannons[i].x, cannons[i].y); //you are moving the top left of the screen to the pictures location, this is because you can't rotate the image, you have to rotate the whole page
    ctx.rotate((cannons[i].rotation * Math.PI) / 180); //then you rotate. rotation is centered on 0,0 on the canvas, which is why we moved the picture to 0,0 with translate(x,y)
    ctx.drawImage(cannonImage, 0, 0, cannonWidth, cannonHeight); //you draw the image on the rotated canvas. as of this line, the picture is straight and the rest of the page is rotated
    //also the previous line uses -width / 2 so that the picture is centered. This will mean that (0,0) is at the exact center of the image
    ctx.translate(-cannons[i].x, -cannons[i].y); //the reverse of the previous translate, this moves the page back to the correct place so that the image is no longer at (0,0)
    ctx.restore(); //this unrotates the canvas so the canvas is straight, but now since you did that the picture looks rotated
  }
}
function rotate() {

  if (placetype === "platform") {
    if (rot <= 1) {
      let tempW = setWidth;
      let tempH = setHeight;
      setWidth = tempH;
      setHeight = tempW;
      document.getElementById("height").value = setHeight;
      document.getElementById("width").value = setWidth;
      showCoords(event);
      rot += 1;
    }
    else if (rot === 2) {
      let tempW = setWidth * -1;
      let tempH = setHeight * -1;
      setWidth = tempH;
      setHeight = tempW;
      document.getElementById("height").value = setHeight;
      document.getElementById("width").value = setWidth;
      showCoords(event);
      rot = 1;
    }
  }
  if (placetype === "cannon") {
    if (cannonCR === 0) {
      cannonCR = 90;
      rotatedir = "top";
    } else if (cannonCR === 90) {
      cannonCR = 180;
      rotatedir = "right";
    } else if (cannonCR === 180) {
      cannonCR = 270;
      rotatedir = "bottom";
    } else if (cannonCR === 270) {
      cannonCR = 0;
      rotatedir = "left";
    }
  }
}
function drawCollectables() {
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].collected !== true) {
      //draw on screen if not collected
      ctx.drawImage(
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
      ctx.globalAlpha = collectables[i].alpha;
      ctx.drawImage(
        collectables[i].image,
        200 + 100 * i,
        10,
        collectableWidth,
        collectableHeight
      );
      ctx.globalAlpha = 1;
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


function createCollectable(type, x, y, gravity = 0.1, bounce = 1, posX = x, posY = y) {
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


}

function loadJson() {
  getJSON("halle.json", JsonFunction); //runs this before the setup because of timing things
}


function setCookie(name, value) {
  document.cookie = `${name}=${value}; expires=Thu, 18 Dec 3113 12:00:00 UTC;`;

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




function showCoords(event) {
  let x = event.clientX;
  let y = event.clientY;

  if (gridSnap === false) {
    cursorX = x;
    cursorY = y;
    if (x < 1410 && y < 760 && placemode) {
      createOutline(x, y, setWidth, setHeight);
    }
    else {
      createOutline(x, y, 0, 0);
      removeHi();
    }
  }
  else if (gridSnap === true) {
    x = Math.floor(x / gridSize) * gridSize;
    y = Math.floor(y / gridSize) * gridSize;
    cursorX = x;
    cursorY = y;
    if (x < 1400 && y < 760 && placemode) {
      if (setWidth < 0 && setHeight < 0) {
        x += gridSize;
        y += gridSize;
      }
      createOutline(x, y, setWidth, setHeight);
    }
    else {
      createOutline(x, y, 0, 0);
      removeHi();
    }
  }
  let text = "X coords: " + Math.round(x) + ", Y coords: " + Math.round(y);
  document.getElementById("demo").innerHTML = text;

}

function remove() {

  for (var i = platforms.length-1; i >= 0; i--) {
    if (platforms[i].x <= cursorX && (platforms[i].x + platforms[i].width - 1) > cursorX && platforms[i].y <= cursorY && (platforms[i].y + platforms[i].height - 1) > cursorY) {
      platforms.splice(i, 1);
      return;
    }
  }

  for (var i = 0; i < collectables.length; i++) {

    if (collectables[i].x <= cursorX && (
      collectables[i].x + collectableWidth - 1) > cursorX &&
      collectables[i].y <= cursorY && (
        collectables[i].y + collectableHeight - 1) > cursorY &&
      cursorY < 760) {

      collectables.splice(i, 1);
      return;
    }
  }
  for (var i = 0; i < cannons.length; i++) {
    if (cannons[i].x <= cursorX && (
      cannons[i].x + cannonWidth - 1) > cursorX &&
      cannons[i].y <= cursorY && (
        cannons[i].y + cannonHeight - 1) > cursorY &&
      cursorY < 760 &&
      cannons[i].wallLocation === "bottom") {/////////////////////////////bottomonly
      cannons.splice(i, 1);
      return;
    }
    else if (cannons[i].x >= cursorX && (
      cannons[i].x - cannonWidth - 40) < cursorX &&
      cannons[i].y >= cursorY && (
        cannons[i].y - cannonHeight - 1) < cursorY &&
      cursorY < 760 &&
      cannons[i].wallLocation === "top") {/////////////////////////////top
      cannons.splice(i, 1);

      return;
    }
    else if (cannons[i].x >= cursorX && (
      cannons[i].x - cannonHeight - 1) < cursorX &&
      cannons[i].y <= cursorY && (
        cannons[i].y + cannonWidth - 1) > cursorY &&
      cursorY < 760 &&
      cannons[i].wallLocation === "left") {/////////////////////////////left
      cannons.splice(i, 1);
      return;
    }
    else if (cannons[i].x <= cursorX && (
      cannons[i].x + cannonHeight - 1) > cursorX &&
      cannons[i].y >= cursorY && (
        cannons[i].y - cannonWidth - 1) < cursorY &&
      cursorY < 760 &&
      cannons[i].wallLocation === "right") {/////////////////////////////bottomonly
      cannons.splice(i, 1);
      return;
    }
  }
}
function removeHi() {
  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i].x <= cursorX && (platforms[i].x + platforms[i].width - 1) > cursorX && platforms[i].y <= cursorY && (platforms[i].y + platforms[i].height - 1) > cursorY && cursorY < 760) {

      platforms[i].color = "rgba(255, 0, 0, 0.5)";

    } else {
      platforms[i].color = platforms[i].savedcolor;
    }
  }
}

function hasKey() {
  let key = getCookie("uniqueKey");
  if (key === "") {
    return false;
  } else {
    return true;
  }
}
var settitle;
function setTitle(thisinput) {
  settitle = thisinput.value;
}

function setWH() {
  var xloc = document.getElementById("height").value;
  var text;
  text = parseInt(xloc);
  setHeight = text;
  var yloc = document.getElementById("width").value;
  var texty;
  texty = parseInt(yloc);
  setWidth = texty;
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

function onInfo() {
  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i].x <= cursorX && (platforms[i].x + platforms[i].width - 1) > cursorX && platforms[i].y <= cursorY && (platforms[i].y + platforms[i].height - 1) > cursorY && cursorY < 760) {

      $("#height").val(parseInt(platforms[i].height))
      $("#width").val(parseInt(platforms[i].width))
      setWH()
      createOutline(cursorX, cursorY, setWidth, setHeight);
      $("#color").val(platforms[i].color)
      setColor()
    }
  }

  for (var i = 0; i < collectables.length; i++) {

    if (collectables[i].x <= cursorX && (
      collectables[i].x + collectableWidth - 1) > cursorX &&
      collectables[i].y <= cursorY && (
        collectables[i].y + collectableHeight - 1) > cursorY &&
      cursorY < 760) {
        $("#gRange").val(collectables[i].gravity)
        $("#bRange").val(collectables[i].bounce)

    }
  }
  for (var i = 0; i < cannons.length; i++) {
    if (cannons[i].x <= cursorX && (
      cannons[i].x + cannonWidth - 1) > cursorX &&
      cannons[i].y <= cursorY && (
        cannons[i].y + cannonHeight - 1) > cursorY &&
      cursorY < 760 &&
      cannons[i].wallLocation === "bottom") {/////////////////////////////bottomonly
      
        $("#ms").val(parseInt(cannons[i].delay))
        $("#msvalue").val(parseInt(cannons[i].delay))
        
    }
    else if (cannons[i].x >= cursorX && (
      cannons[i].x - cannonWidth - 40) < cursorX &&
      cannons[i].y >= cursorY && (
        cannons[i].y - cannonHeight - 1) < cursorY &&
      cursorY < 760 &&
      cannons[i].wallLocation === "top") {/////////////////////////////top
        $("#ms").val(parseInt(cannons[i].delay))
        $("#msvalue").val(parseInt(cannons[i].delay))
    }
    else if (cannons[i].x >= cursorX && (
      cannons[i].x - cannonHeight - 1) < cursorX &&
      cannons[i].y <= cursorY && (
        cannons[i].y + cannonWidth - 1) > cursorY &&
      cursorY < 760 &&
      cannons[i].wallLocation === "left") {/////////////////////////////left
        $("#ms").val(parseInt(cannons[i].delay))
        $("#msvalue").val(parseInt(cannons[i].delay))
    }
    else if (cannons[i].x <= cursorX && (
      cannons[i].x + cannonHeight - 1) > cursorX &&
      cannons[i].y >= cursorY && (
        cannons[i].y - cannonWidth - 1) < cursorY &&
      cursorY < 760 &&
      cannons[i].wallLocation === "right") {/////////////////////////////bottomonly
        $("#ms").val(parseInt(cannons[i].delay))
        $("#msvalue").val(parseInt(cannons[i].delay))
    }
  }
}

document.addEventListener('mousedown', e => {
  // Check if the click is the middle button
  if (e.button === 1) {
    // Do something when the user does middle click

    onInfo()
    // Prevent default middle click behaviour of the middle click
    e.preventDefault()
  }
})
function hex(){
  if($("#colorHex").val()[0] !== "#"){
    $("#colorHex").val("#"+$("#colorHex").val())
  }
  $("#color").val($("#colorHex").val())
}
function colorSelected(){
  $("#colorHex").val($("#color").val())
}
