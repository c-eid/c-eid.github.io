var background = function (window) {
    'use strict';

    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    let buildstart = 0
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function (app, ground) {
        /* Error Checking - DO NOT DELETE */
        if (!app) {
            throw new Error("Invalid app argument");
        }
        if (!ground || typeof (ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;

        // container which will be returned
        var background;

        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        let back
        let buildings = []
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth, canvasHeight, 'black');
            background.addChild(backgroundFill);

            // TODO 2: - Add a moon and starfield
            var runtimepics = draw.bitmap("img/moon.png");
            runtimepics.x = 0;
            runtimepics.y = 0;
            runtimepics.scaleX = 1.8;
            runtimepics.scaleY = 1.8;
            background.addChild(runtimepics)

            for (let i = 100; i < canvas.width; i += 100) {
                var grid = draw.rect(1, canvasHeight, "white");
                grid.x = i;
                grid.y = 0;
                background.addChild(grid);

                
              }
              
              for (let i = 100; i < canvas.height; i += 100) {
                var grid = draw.rect(canvas.width, 1, "white");
                grid.x = 0;
                grid.y = i;
                background.addChild(grid);

              }
            // var moon = draw.bitmap("img/moon.png");
            // moon.x = 1000;
            // moon.y = 100;
            // moon.scaleX = 1.0;
            // moon.scaleY = 1.0;
            // background.addChild(moon);

            // for (var i = 0; i < 101; i++) {
            //     var circle = draw.circle(10, "white", "LightGray", 2);
            //     circle.x = canvasWidth * Math.random();
            //     circle.y = groundY * Math.random();
            //     background.addChild(circle);
            // }
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            // for (var i = 0; i < 5; ++i) {
            //     var buildingHeight = Math.random() * 240 + 100 ;
            //     var building = draw.rect(75, buildingHeight, "LightGray", "Black", 1);
            //     building.x = 200 * i;
            //     building.y = groundY - buildingHeight;
            //     background.addChild(building);
            //     buildings.push(building);
            //   }


            // TODO 3: Part 1 - Add a tree
            // back = draw.bitmap("img/build1.png");
            // back.x = 0;
            // back.y = ground.y - 780;
            // back.scaleX = 1.7
            // back.scaleY = 1.7
            // background.addChild(back);

            for (var ix = 0; ix < canvasWidth; ix += 349) {
                var building = draw.bitmap("img/aquefer.png")
                building.x = ix;
                building.y = groundY - 46;
                building.scaleX = .5
                building.scaleY = .5
                background.addChild(building);
                buildings.push(building);
            }
        } // end of render function - DO NOT DELETE


        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = 1600;
            var canvasHeight = 800;
            var groundY = ground.y;

            // TODO 3: Part 2 - Move the tree!
            // back.x -= .5;



            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                var eachElement = buildings[i];
                eachElement.x -= 1

                if ((buildings[buildings.length - 1].x) <= (canvasWidth - 349)) {
                    var building = draw.bitmap("img/aquefer.png")
                    building.x = canvasWidth
                    building.y = groundY - 46;
                    building.scaleX = .5
                    building.scaleY = .5
                    background.addChild(building);
                    buildings.push(building);

                    
                }
                if (buildings[0].x + 350 === 0){
                    buildings[0].scaleX = 0
                    buildings[0].scaleY = 0
                    buildings.splice(0, 1)
                }
                // code to do something with each element
            }

        } // end of update function - DO NOT DELETE



        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;

        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);

        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
