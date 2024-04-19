/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
async function bubbleSort(array){
    //uses the algorithm bubble sort to sort array
    for(var i = 0; i < array.length-1; i++){
        
        for(var j = array.length-1; j >= i + 1; j--){
      
            if(array[j].value < array[j-1].value){
                //tone((((1212-120)/array.length)*array[j].value)) //This generates a tone based on the value of J
                await sleep()  // We must sleep twice so each tone has enough time to play
                //tone((((1212-120)/array.length)*array[j-1].value)) // This generates a tone based on the value of J-1 
                await sleep();// Second sleep to allow it to play.
                //console.log(j)
                swap(array, j, j -1)
                updateCounter(bubbleCounter);
                
                
            }
        }
    }
}
// TODO 3: Implement quickSort
    async function quickSort(array, left, right){
        if(right-left > 0){
            let index = await partition(array, left, right)
            if(left < index-1){
                await quickSort(array, left, index-1)
            }
            if(index < right){
                await quickSort(array, index, right)
            }
        }
    }


// TODOs 4 & 5: Implement partition

async function partition(array, left, right){
    
    let pivot = array[Math.floor((right + left)/2)].value;
    while(left < right){
        while(array[left].value < pivot) left++
        
        while(array[right].value > pivot) right--
        
        
        if(left < right){
            swap(array, left, right)
            tone((((1212-120)/array.length)*array[left].value))
            updateCounter(quickCounter)
            await sleep()
            tone((((1212-120)/array.length)*array[right].value))
            await sleep()
        }
    }
return left+1

}

// TODO 1: Implement swap

//This funciton swaps two values in an arrays
function swap(array, i, j){
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
    drawSwap(array, i, j)

}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function tone(hz){
    //creates tone based of of the tone given.
    console.log(hz)
    let osc = AudCon.createOscillator()
    let gain = AudCon.createGain()
    osc.type = "triangle"
    osc.connect(gain)
    gain.connect(AudCon.destination)
    let frequency = hz+120
    osc.frequency.value = frequency
    osc.start(0)
    gain.gain.exponentialRampToValueAtTime(
        0.00001, AudCon.currentTime + 0.1
      )
    osc.stop(AudCon.currentTime + 0.1)
    
}
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}

