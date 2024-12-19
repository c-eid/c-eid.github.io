$(function () {
  // initialize canvas and context when able to
 
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvasprite = document.getElementById("sprite");
  stx = canvasprite.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      
      // halleImage = document.getElementById("player");
      halleR = document.getElementById("halleR");
      halleG = document.getElementById("halleG");
      halle = document.getElementById("halle")
      halleB = document.getElementById("halleB");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      checkCookie()
      var savedLevel = parseInt(getCookie("lvlNum"))
      createPlatform(-50, -50, canvas.width + 100, 50, "white"); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "rgb(28, 26, 26"); //bottom
    createPlatform(-50, -50, 50, canvas.height + 500, "rgb(28, 26, 26");
    createPlatform(canvas.width, -50, 50, canvas.height + 100, "rgb(28, 26, 26");

      //start game
      if(!editMode){
        levelmake()
      }
      setInterval(main, (1000/frameRate))
    }

  
    //create walls
    
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
    // example usage: createPlatform(x,y,width,height,color)
   



    
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)


    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(rot, position, positionY, delay, width, height)

    // to do:
    // collectables DONE
    //    different collectables
    //    behaviors, like next level
    //    
    // cannons
    //    cannon rework needed for optimal usage DONE
    
    //    make cannon in html DONE

    ////////EXPORTING done
    // moving platforms 
    // breakable platforms
    // semisolid platforms
    // slow and fast movement for halle (ice)platforms


    
    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }
registerSetup(setup);
 
});

