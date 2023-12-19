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
      
    }

  
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50, "white"); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "rgb(28, 26, 26"); //right
    createPlatform(-50, -50, 50, canvas.height + 500, "rgb(28, 26, 26");
    createPlatform(canvas.width, -50, 50, canvas.height + 100, "rgb(28, 26, 26");

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */



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
        createCollectable('database', 850, 200, 5, 1); //collectables
        createCollectable('database', 1280, 300, 5, 1);
        createCollectable('database', 600, 200, 5, 1);
      }
      else if (savedLevel === 4) {
        min = 300
        max = 1200
        createPlatform(300, 700, 200, 15, "#FF00FF");
        createPlatform(500, 600, 200, 15, "white");
        createPlatform(200, 500, 200, 15);
        createPlatform(600, 400, 900, 15);
        
        
        createCollectable('database', 1280, 450, 0, 0); //collectables
        createCollectable('database', 1280, 300, 0, 0);
        createCollectable('database', 860, 200, 0, 0);
      } 
      else if (savedLevel === 3) {
        min = 400
        max = 600
        createPlatform(400, 300, 200, 15, "#FF00FF");
        createPlatform(0, 200, 200, 15, "white");
        
        
        
        createCollectable('database', 1280, 450, 0, 0); //collectables
        createCollectable('database', 1280, 300, 0, 0);
        createCollectable('database', 860, 200, 0, 0);
      } 
      else{
        
      }
    }
    createPlatform(10000, 1, 100, 10) //buffer
    setInterval(main, 1000 / frameRate);
    
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

    // to do:
    // collectables DONE
    //    different collectables
    //    behaviors, like next level
    //    
    // cannons
    //    cannon rework needed for optimal usage DONE
    
    //    make cannon in html
    // moving platforms
    // breakable platforms
    // semisolid platforms
    // slow and fast movement for halle (ice)platforms


    setColor()
    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }
 
  registerSetup(setup);
});

