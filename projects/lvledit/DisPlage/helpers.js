
///// DO NOT CHANGE ANYTHING IN THIS FILE /////
let platOffset = 0
let gridSize = 100
let gridmove = 0
let gridmoveY = 13
let min
let placetype = "platform" //["platform", "collectable", "cannon", "exOutput"]
let placecolor = "rgba(255, 255, 255, 0.3)"
let max
let oldcol
let editMode = true
let gridSnap = false
let placemode = true
let cursorX
let cursorY
let SizeNum = 50

let setWidth = 100
let setHeight = 10
let setcolor
let rot = 1
let canpos = 0
let cannonCR = 0

var gRange
var rotatedir = "left"
var bRange
var rotationPoint
var msslider
let lvlData
var msvalue







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
        )
      }
      else {
        ctx.drawImage(
          database,
          cursorX,
          cursorY,
          37,
          50
        )
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
          canpos = cannons[0].x
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
          canpos = cannons[0].x
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
          canpos = cannons[0].y
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
          canpos = cannons[0].y
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
          canpos = cannons[0].x
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
          canpos = cannons[0].x
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
          canpos = cannons[0].y
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
          canpos = cannons[0].y
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
      collectables[i].y = collectables[i].posY
      collectables[i].x = collectables[i].posX
      collectables[i].speedy = 0
    }
  }
}

function createPlatform(x, y, width, height, color = "#FFFFFF") {
  let savedcolor = color

  if (width < 0) {
    x += width
    width *= -1
  }
  if (height < 0) {
    y += height
    height *= -1
  }

  platforms.push({ x, y, width, height, color, savedcolor });

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
      canpos = cannons[0].x
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
      canpos = cannons[0].x
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
      canpos = cannons[0].y
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
      canpos = cannons[0].y
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





function setWH() {
  var xloc = document.getElementById("height").value;
  var text;
  text = parseInt(xloc)
  setHeight = text
  var yloc = document.getElementById("width").value;
  var texty
  texty = parseInt(yloc)
  setWidth = texty
}
function drawGrid() {
  for (let i = gridSize; i < canvas.width; i += gridSize) {
    ctx.fillStyle = "white"
    ctx.fillRect(
      i,
      0,
      1,
      canvas.height
    )

  }

  for (let i = gridSize; i < canvas.height; i += gridSize) {
    ctx.fillRect(
      0,
      i,
      canvas.width,
      1
    )
  }
}
