$(function () {
  // initialize canvas and context when able to
  
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      checkCookie()
      var savedLevel = parseInt(getCookie("lvlNum"))
      
      //start game
      levelmake();
      keyPress.left = true;
      keyPress.right = false;
      setInterval(main, 1000 / frameRate);
    }

  
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    for (let i = 100; i < canvas.width; i += 100) {
      createPlatform(i, canvas.height, -1, -canvas.height);
    }
    for (let i = 100; i < canvas.height; i += 100) {
      createPlatform(canvas.width, i, -canvas.width, -1);
    }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)
   


    function levelmake() {
      if (savedLevel === 2) { //level editor

        createPlatform(500, 560, 700, 10); //right
        createPlatform(500, 450, 10, 110); //right
        createPlatform(300, 450, 200, 10);//right
        createPlatform(300, 400, 10, 50);//right
        createPlatform(100, 400, 200, 10); //right
        createPlatform(100, 0, 10, 400); //right
        createPlatform(1200, 200, 10, 370)
        createPlatform(400, 300, 600, 10);//top
        createPlatform(750, 0, 10, 300);//top wall
        createCollectable('database', 850, 200, 0, 0); //collectables
        createCollectable('database', 1280, 300, 0, 0);
        createCollectable('database', 600, 200, 0, 0);
      }
      else if (savedLevel === 1) {
        createPlatform(300, 700, 200, 15);
        createPlatform(500, 600, 200, 15);
        createPlatform(200, 500, 200, 15);
        createPlatform(600, 400, 900, 15);
        
        
        createCollectable('database', 1280, 450, 0, 0); //collectables
        createCollectable('database', 1280, 300, 0, 0);
        createCollectable('database', 860, 200, 0, 0);
      } 
      else if (savedLevel === 3) {
        createPlatform(300, 700, 200, 15);
        createPlatform(500, 600, 200, 15);
        createPlatform(200, 500, 200, 15);
        createPlatform(600, 400, 900, 15);
        
        
        createCollectable('database', 1280, 450, 0, 0); //collectables
        createCollectable('database', 1280, 300, 0, 0);
        createCollectable('database', 860, 200, 0, 0);

    }

    }
    
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)


    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)




    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }
 
  registerSetup(setup);
});
