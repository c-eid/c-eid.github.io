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
  gamePieces.push(makeGamePiece(20, 7, 0, BOARD.width / 2, BOARD.height / 2))
  gamePieces.push(makeGamePiece(20, 1, 5, 20, 70))

  paddles.push(await makePaddles(100, BOARD.height / 2, "rgb(255,0,0)"))
  paddles.push(await makePaddles(BOARD.width - 100 - 10, BOARD.height / 2, "rgb(0,0,255)"))
  $(document).on('keydown', setKeyTrue);                           // change 'eventType' to the type of event you want to handle

  $(document).on('keyup', setKeyFalse);
  newTimer(230)
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
    drawGamePieces()
    wallCollision()
    ballHitPaddle()
    movement()
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
      for (bind in paddles[i].keys) {
        if (paddles[i].keys[bind].pressed === true) {

          if (bind === "up") {
            console.log(bind)
            if (paddles[i].speedY < 40) {
              paddles[i].speedY += 1
            }
            paddles[i].y -= paddles[i].speedY
            document.getElementById(paddles[i].id).setAttribute("y", paddles[i].y)
          }
          if (bind === "down") {
            if (paddles[i].speedY < 40) {
              paddles[i].speedY += 1
            }
            paddles[i].y += paddles[i].speedY
            document.getElementById(paddles[i].id).setAttribute("y", paddles[i].y)
          }
          if (bind === "left") {
            if (paddles[i].speedX < 40) {
              paddles[i].speedX += 1
            }
            paddles[i].x -= paddles[i].speedX
            document.getElementById(paddles[i].id).setAttribute("x", paddles[i].x)
          }
          if (bind === "right") {
            if (paddles[i].speedX < 40) {
              paddles[i].speedX += 1
            }
            paddles[i].x += paddles[i].speedX
            document.getElementById(paddles[i].id).setAttribute("x", paddles[i].x)
          }
        } 
      }
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
    }
  }

  function wallCollision() {
    for (var i = 0; i < gamePieces.length; i++) {
      if (gamePieces[i].cy + gamePieces[i].radius >= BOARD.height || gamePieces[i].cy - gamePieces[i].radius <= BOARD.y) {
        gamePieces[i].speedY *= -1
      }
      if (gamePieces[i].cx + gamePieces[i].radius >= BOARD.width || gamePieces[i].cx - gamePieces[i].radius <= BOARD.x) {
        gamePieces[i].speedX *= -1
      }
    }
  }

  function ballHitPaddle() {
    for (var i = 0; i < paddles.length; i++) {
      for (var j = 0; j < gamePieces.length; j++) {
        //right direction handler
        if (gamePieces[j].cx - gamePieces[j].radius - gamePieces[j].speedX >= paddles[i].x && //right collision
          gamePieces[j].cy + gamePieces[j].radius >= paddles[i].y && //top collision
          gamePieces[j].cy - gamePieces[j].radius <= paddles[i].y /*bottom collision*/) {
          gamePieces[j].speedX *= -1
        }


      }

    }
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
    return gamePiece
  }
  async function makePaddles(x, y, color, width = 20, height = 150) {
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
