/* global $, sessionStorage */

// $(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
runProgram()
async function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  let gameGoal
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var debug = true
  // Game Item Objects

  const BOARD = {
    x: 0,
    y: 0,
    width: 2560,
    height: 1025,
  }
  let gamePieces = [

  ]
  let paddles = [

  ]

  // one-time setup

  gamePieces.push(makeGamePiece(20))
  gamePieces.push(makeGamePiece(20, 30, 0, BOARD.width / 2, BOARD.height / 2))
  gamePieces.push(makeGamePiece(20, 30, 25, 20, 70))

  paddles.push(await makePaddles(100, BOARD.height / 2, "rgb(255,0,0)"))
  paddles.push(await makePaddles(BOARD.width - 100 - 10, BOARD.height / 2, "rgb(0,0,255)"))
  $(document).on('keydown', setKeyTrue);                           // change 'eventType' to the type of event you want to handle

  $(document).on('keyup', setKeyFalse);
  newTimer(1000)
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);

  // execute newFrame every 0.0166 seconds (60 Frames per second)


  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    movement()
    paddleCollision()
    drawGamePieces()
    wallCollision()

  }




  /* 
  Called in response to events.
  */


  function setKeyTrue(event) {
    for (var i = 0; i < paddles.length; i++) {
      for (bind in paddles[i].keys) {
        if (event.key === paddles[i].keys[bind].assignKey) {
          paddles[i].keys[bind].pressed = true
        }
      }
    }
  }
  function setKeyFalse(event) {
    for (var i = 0; i < paddles.length; i++) {
      for (bind in paddles[i].keys) {
        if (event.key === paddles[i].keys[bind].assignKey) {
          paddles[i].keys[bind].pressed = false

        }
      }
    }
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function movement() {
    for (var i = 0; i < paddles.length; i++) {
      paddles[i].speedX = 0
      paddles[i].speedY = 0
      for (bind in paddles[i].keys) {
        if (paddles[i].keys[bind].pressed === true) {

          if (bind === "up") {

            paddles[i].speedY = -5
            
          }
          if (bind === "down") {
            paddles[i].speedY = 5

        
          }
          if (bind === "left") {
            paddles[i].speedX = -5
          }
          if (bind === "right") {
            paddles[i].speedX = 5
  
          }
        }
      }
      paddles[i].y += paddles[i].speedY
      document.getElementById(paddles[i].id).setAttribute("y", paddles[i].y)
      paddles[i].x += paddles[i].speedX
      document.getElementById(paddles[i].id).setAttribute("x", paddles[i].x)
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function drawGamePieces() {
    for (var i = 0; i < gamePieces.length; i++) {
      gamePieces[i].cx += gamePieces[i].speedX
      gamePieces[i].cy += gamePieces[i].speedY
      $(gamePieces[i].id).attr("cx", gamePieces[i].cx).attr("cy", gamePieces[i].cy)
      if (debug) {

        $(gamePieces[i].id + "D").attr("cx", gamePieces[i].cx + gamePieces[i].speedX).attr("cy", gamePieces[i].cy + gamePieces[i].speedY)
        $(gamePieces[i].id + "L").attr("points", `${gamePieces[i].cx},${gamePieces[i].cy} ${gamePieces[i].cx + gamePieces[i].speedX},${gamePieces[i].cy + gamePieces[i].speedY}`)
      }
    }
  }

  function wallCollision() {
    for (var i = 0; i < gamePieces.length; i++) {
      if (gamePieces[i].cy + gamePieces[i].radius >= BOARD.height) {
        gamePieces[i].speedY *= -1
        
      }
      if( gamePieces[i].cy - gamePieces[i].radius <= BOARD.y){
        gamePieces[i].speedY *= -1
        gamePieces[i].cx = BOARD.y + gamePieces[i].radius
      }
      if (gamePieces[i].cx + gamePieces[i].radius >= BOARD.width) {
        gamePieces[i].speedX *= -1
        gamePieces[i].cx = BOARD.width - gamePieces[i].radius
      }
      if( gamePieces[i].cx - gamePieces[i].radius <= BOARD.x){
        gamePieces[i].speedX *= -1
        gamePieces[i].cx = BOARD.x + gamePieces[i].radius
      }
    }
  }

  function paddleCollision() {
    for (var i = 0; i < paddles.length; i++) {
      for (var j = 0; j < gamePieces.length; j++) {
        if (
          gamePieces[j].cx - gamePieces[j].radius + gamePieces[j].speedX <= paddles[i].x + paddles[i].width + paddles[i].speedX && //right collision
          gamePieces[j].cy + gamePieces[j].radius + gamePieces[j].speedY >= paddles[i].y + paddles[i].speedY && //bottom collision
          gamePieces[j].cy - gamePieces[j].radius + gamePieces[j].speedY <= paddles[i].y + paddles[i].height+ paddles[i].speedY /*bottom collision*/ &&
          gamePieces[j].cx + gamePieces[j].radius + gamePieces[j].speedX >= paddles[i].x + paddles[i].speedX  //Left collision
        ) {

          gamePieces[j].speedX *= -1
          console.log("dcollided")
          gamePieces[j].speedX += paddles[i].speedX
        }
        else if (lineSegmentsIntersect(
          gamePieces[j].cx, gamePieces[j].cy,
          gamePieces[j].cx + gamePieces[j].speedX, gamePieces[j].cy + gamePieces[j].speedY,
          paddles[i].x, paddles[i].y,
          paddles[i].x, paddles[i].y + paddles[i].height) && !((lineSegmentsIntersect(
            gamePieces[j].cx, gamePieces[j].cy,
            gamePieces[j].cx + gamePieces[j].speedX, gamePieces[j].cy + gamePieces[j].speedY,
            paddles[i].x, paddles[i].y,
            paddles[i].x + paddles[i].width, paddles[i].y)) && (
              lineSegmentsIntersect(
                gamePieces[j].cx, gamePieces[j].cy,
                gamePieces[j].cx + gamePieces[j].speedX, gamePieces[j].cy + gamePieces[j].speedY,
                paddles[i].x, paddles[i].y + paddles[i].height,
                paddles[i].x + paddles[i].width, paddles[i].y + paddles[i].height)
            ))) {
          gamePieces[j].speedX *= -1
          console.log("collided")
        }



      }

    }
  }
  function lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    var a_dx = x2 - x1;
    var a_dy = y2 - y1;
    var b_dx = x4 - x3;
    var b_dy = y4 - y3;
    var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
    var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
  }

  function rayCast(i, j) {

  }

  function newTimer(startTime) {
    gameGoal = startTime + ""
    $(".goalNumber").text(gameGoal[0] + ":" + gameGoal[1] + "" + gameGoal[2])
    var timer = setInterval(() => {
      gameGoal = gameGoal + ""
      if (gameGoal == 0) {
        gameGoal = "000"
        //endgame
      } else if (parseFloat(gameGoal[2] + gameGoal[1]) === 0 && gameGoal <= 100) {
        gameGoal = parseFloat(gameGoal)
        gameGoal -= 40
        gameGoal = "0" + gameGoal
      } else if (parseFloat(gameGoal[2] + gameGoal[1]) === 0) {
        gameGoal = parseFloat(gameGoal)
        gameGoal -= 40
        gameGoal = gameGoal + ""
      } else if (gameGoal <= 10) {
        gameGoal--
        gameGoal = "00" + gameGoal
      } else if (gameGoal <= 100) {
        gameGoal--
        gameGoal = "0" + gameGoal
      } else {
        gameGoal = parseFloat(gameGoal)
        gameGoal--
        gameGoal = gameGoal + ""
      }
      $(".goalNumber").text(gameGoal[0] + ":" + gameGoal[1] + "" + gameGoal[2])
    }, 1000);
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// FACTORY FUNCTIONS ///////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function makeGamePiece(radius = 10, speedX = 1, speedY = 1, cx = 100, cy = 100, color = `rgb(255,255,255)`) {
    let gamePiece = {}
    $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'))
      .appendTo("svg")
      .css("fill", color)
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", radius)
      .attr("class", "gamePiece")
      .attr("id", `piece${gamePieces.length - 1}`)
    gamePiece.cx = cx
    gamePiece.cy = cy
    gamePiece.radius = radius
    gamePiece.id = `#piece${gamePieces.length - 1}`
    gamePiece.speedX = speedX
    gamePiece.speedY = speedY
    gamePiece.color = color

    if (debug) {
      $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'))
        .appendTo("svg")
        .css("fill", "rgba(255,255,255,0.4)")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", radius)
        .attr("class", "gamePiece")
        .attr("id", `piece${gamePieces.length - 1}D`)

      $(document.createElementNS('http://www.w3.org/2000/svg', 'polyline'))
        .appendTo("svg")
        .css("stroke", "red")
        .css("stroke-width", "7")
        .attr("points", `${cx},${cy} 0,0`)
        .attr("id", `piece${gamePieces.length - 1}L`)

    }

    return gamePiece
  }
  async function makePaddles(x, y, color, width = 150, height = 150) {
    let paddle = {}
    $(document.createElementNS('http://www.w3.org/2000/svg', 'rect'))
      .appendTo("svg")
      .css("fill", color)
      .attr("id", 'paddle' + paddles.length)
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)

    paddle.keys = {};
    paddle.id = 'paddle' + paddles.length;
    $(".that").text("UP")
    $(".playerActivePrompt").text("(Player " + Math.min(paddles.length + 1) + ")")
    $(".prompt").css("display", 'flex')
    paddle.keys.up = { assignKey: (await assignKeys()).key, pressed: false }
    $(".that").text("DOWN")
    paddle.keys.down = { assignKey: (await assignKeys()).key, pressed: false }
    $(".that").text("LEFT")
    paddle.keys.left = { assignKey: (await assignKeys()).key, pressed: false }
    $(".that").text("RIGHT")
    paddle.keys.right = { assignKey: (await assignKeys()).key, pressed: false }
    $(".that").text("ITEM")
    paddle.keys.item = { key: (await assignKeys()).key, pressed: false }
    $(".prompt").css("display", 'none')



    paddle.height = height
    paddle.width = width
    paddle.x = x

    paddle.y = y
    paddle.color = color
    paddle.speedX = 5
    paddle.speedY = 5
    console.log(paddle)
    return paddle
  }

  async function assignKeys() {
    return new Promise(resolve => {
      window.addEventListener('keydown', resolve, { once: true });

    });
  }
}
