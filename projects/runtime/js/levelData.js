var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: 530},
          { type: "sawblade", x: 600, y: groundY},
          { type: "sawblade", x: 900, y: 520},
          { type: "enemy", x: 900, y: 30},
          { type: "reward", x: 1000, y: 30},
          { type: "mark", x: 1300, y: 30}
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "enemy", x: 300, y: 50 },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
          { type: "mark", x: 2000, y: 30}
        ],
      },
      {
        name: "Im making my own version and its gonna be better",
        number: 3,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 1800, y: groundY },
          { type: "sawblade", x: 2000, y: groundY },
          { type: "sawblade", x: 2300, y: groundY },
        ],
      },
    ];
    window.opspark.levelData = levelData;


  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
