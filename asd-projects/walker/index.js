/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };
  // Game Item Objects
var walker = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  speedX: 0,
  speedY: 0,
  id: "walker"
}
console.log(walker.width)

  // one-time setup
  
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
   
    repositionGameItem(walker)
    redrawGameItem(walker)
    wallCollision(walker)
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //changes speed on key

    if(event.which === KEY.LEFT){

      walker.speedX = -5;
      
    }  if(event.which === KEY.RIGHT){

      walker.speedX = 5;
      
    } if(event.which === KEY.UP){
     
      walker.speedY = -5;
      
    }  if(event.which === KEY.DOWN){
     
      walker.speedY = 5;
      
    }
  }
  function handleKeyUp(event) {
    //stops speed only in x or y depending on which was released
    if(event.which === KEY.LEFT){
      
      walker.speedX = 0;
      
    } if(event.which === KEY.RIGHT){
      walker.speedX = 0;
      
    } if(event.which === KEY.UP){
      walker.speedY = 0;
      
    }  if(event.which === KEY.DOWN){
      walker.speedY = 0;
      
    }
    
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function repositionGameItem(item){
    //repositions item based on its speed values, used item for multiplayer compatability
    item.x += item.speedX
    item.y += item.speedY
  } 
  function redrawGameItem(item){
    //changes location of item on screen based on x and y values.
    $(`#${item.id}`).css('left', item.x).css('top', item.y)
  }
  function wallCollision(item){
    if(item.x < 0){
     item.x -= item.speedX
    } 
     if(item.x + item.width > $("#board").width()){
      item.x -= item.speedX
    }
    if(item.y < 0){
      item.y -= item.speedY
    } if(item.y + item.height > $("#board").height()){
      item.y -= item.speedY
      
    }
    return
  }
}
