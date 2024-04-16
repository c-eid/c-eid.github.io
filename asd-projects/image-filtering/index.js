// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify)


  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  //Iterates over image and applies a filter to each 'pixel' or rgb value of image

    for (var i = 0; i < image.length; i++) {
      for (var j = 0; j < image[i].length; j++) {
        let rgbString = image[i][j]

          let rgbNumbers = rgbStringToArray(rgbString)
          filterFunction(rgbNumbers)
          rgbString = rgbArrayToString(rgbNumbers)
          image[i][j] = rgbString
        
      }
    }
  
}

function smudge(smudging){
  //not working but is supposed to move the red and blue values over by one
  var imgRedArr = rgbStringToArray(og[globalR][globalC+1])[RED]
  var imgBlueArr = rgbStringToArray(og[globalR][globalC-1])[BLUE]
  smudging[RED] = imgRedArr
  smudging[BLUE] = imgBlueArr
}
// TODO 7: Create the applyFilterNoBackground function


// TODO 5: Create the keepInBounds function
function keepInBounds(bounded) {
  //Keeps a value passed in under 255 and over 0
  return (bounded < 0) ? 0 : (bounded > 255) ? 255 : bounded
}

// TODO 3: Create reddify function
function reddify(underReddification) {
  //Adds red to image when filtered
  underReddification[RED] = 200
}

// TODO 6: Create more filter functions
function decreaseBlue(unblue) {
    //removes blue from image when filtered
  unblue[BLUE] = keepInBounds(unblue[BLUE] - 50)
}
function increaseGreenByBlue(underIncrease) {
    //Adds the blue value to green value 
  underIncrease[GREEN] = keepInBounds(underIncrease[BLUE] + underIncrease[GREEN])
}
function applyFilterNoBackground(filterFunction) {
  //Applys the filter to any pixel that is not equal to the top left
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[i].length; j++) {
      let rgbString = image[i][j]
      if (rgbString !== image[0][0]) {
        let rgbNumbers = rgbStringToArray(rgbString)
        filterFunction(rgbNumbers)
        rgbString = rgbArrayToString(rgbNumbers)
        image[i][j] = rgbString
      }
    }
  }
}
// CHALLENGE code goes below here

