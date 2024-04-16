//Editor specefic flags

editMode = true
let isEditor = true

let placetype = "platform"; //["platform", "collectable", "cannon", "exOutput"]
let placecolor = "rgba(255, 255, 255, 0.3)";
let oldcol;
let gridSnap = false;
let placemode = true;
let cursorX;
let cursorY;
let setWidth = 100;
let setHeight = 10;
let setcolor;
let rot = 1;
let canpos = 0;
let cannonCR = 0;
let barSwitch = document.getElementById('dropdown');
let platbar = jQuery('#platformBar');
let collbar = jQuery('#collectableBar');
let cannbar = jQuery('#cannonBar');
let exporbar = jQuery('#exOutput');
let SizeButton = document.getElementById('sizeButton');
let Showsize = document.getElementById('Showsize');
let gRange;
let rotatedir = "left";
let bRange;
let rotationPoint;
let msslider;
let uploadCondition1 = false;
let platformKills = false;
let platformCollides = true;
var msvalue;
let lvlData;