var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(xpos, ypos) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = xpos;
      sawBladeHitZone.y = ypos;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25
      obstacleImage.y = -25
    }
    // createSawBlade(300, 450)
    // createSawBlade(600, 450)
    // createSawBlade(600, 500)
    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = groundY - y;
      enemy.velocityX = -1;
      enemy.rotationalVelocity = 1;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10)
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.fadeOut();
      };
      game.addGameItem(enemy);
    }
    function createReward(x, y) {
      var reward = game.createGameItem("reward", 25);
      var blueSquare = draw.rect(50, 50, "blue");
      blueSquare.x = -25;
      blueSquare.y = -25;
      reward.addChild(blueSquare);
      reward.x = x;
      reward.y = groundY - y;
      reward.velocityX = -1;
      reward.rotationalVelocity = 1;
      reward.onPlayerCollision = function () {
        game.changeIntegrity(1000)
        reward.fadeOut();
      };
      reward.onProjectileCollision = function () {
        reward.fadeOut();
      };
      game.addGameItem(reward);
    }
    function createMarker(x, y) {
      var marker = game.createGameItem("marker", 50);
      var whiteSquare = draw.rect(50, 50, "White");
      whiteSquare.x = -25;
      whiteSquare.y = -25;
      marker.addChild(whiteSquare);
      marker.x = x;
      marker.y = groundY - y;
      marker.velocityX = -1;
      marker.onPlayerCollision = function () {
        startLevel()
        marker.fadeOut();
      }
      marker.onProjectileCollision = function () {
        startLevel()
        marker.fadeOut();
      
      };

      game.addGameItem(marker);
    }
    // createEnemy(400, 50)
    // createEnemy(800, 50)
    // createEnemy(1200, 50)
    // createReward(400, 100)
    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]     //refrence level for current level
      var levelObjects = level.gameItems   // refrence for each object ARRAY refrence levelobjects with []
      for(var i = 0; i < levelObjects.length; i++){
        if (levelObjects[i].type === "sawblade"){
          createSawBlade((levelObjects[i].x), (levelObjects[i].y))
        }
        else if (levelObjects[i].type === "enemy"){
          createEnemy((levelObjects[i].x), (levelObjects[i].y))
        }
        else if (levelObjects[i].type === "reward"){
          createReward((levelObjects[i].x), (levelObjects[i].y))
        }
        else if (levelObjects[i].type === "mark"){
          createMarker((levelObjects[i].x), (levelObjects[i].y))
        }
      }

      
      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
