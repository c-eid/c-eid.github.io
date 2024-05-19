//$(document.createElementNS('http://www.w3.org/2000/svg', 'rect')).appendTo("svg").css("fill", "rgb(255,255,255)").attr("x", "0").attr("y", "100").attr("width", "100").attr("height", "100")
var BOARD = {
    x: 0,
    y: 0,
    width: 2560,
    height: 1050,
}
var list = []
var hasConfimedOverload = false
var MAX_SQUARES = 2000
var SEED = 2
const FACTOR = 1734339;
const INCREASE = 7181930;
var SLEEP_AMOUNT = 100;
var started = false
var currentSort = bubbleSort
var hasConfirmed2x = false
var moveCounter = document.getElementById("moveCount")
generateList()

function generateList() {
    let numbers = [];

    // start by making an array of numbers
    // this will be used to keep track of which values have already
    // been assigned to created elements
    for (var i = 1; i <= MAX_SQUARES; i++) {
        numbers.push(i);
    }

    // next, create the elements "randomly"
    let nextIndex = SEED;
    for (var i = 0; i < MAX_SQUARES; i++) {
        // choose the next element to create randomly (by grabbing an unused value for the element)
        nextIndex = chooseIndex(nextIndex, numbers);

        // create the element
        createAndAddElement(numbers[nextIndex]);

        // remove the chosen value from the list of numbers;
        // this way, every created element will have a unique value associated with it
        numbers.splice(nextIndex, 1);
    }
}
function createAndAddElement(value) {

    let offset = list.length / MAX_SQUARES * BOARD.width;

    $(document.createElementNS('http://www.w3.org/2000/svg', 'rect')).appendTo("svg").css("fill", "rgb(255,255,255)").attr("x", offset).attr("y", BOARD.height - BOARD.height * (value / MAX_SQUARES)).attr("width", BOARD.width / MAX_SQUARES).attr("height", BOARD.height).attr("id", "bar" + value)
    let newElement = { 'id': "bar" + value, 'value': value }
    list.push(newElement);
    // $("<div> ").addClass(cssClass)
    //           .addClass(elementClass)
    //           .attr("id", baseId+value)
    //           .css("height", MAX_SQUARE_HEIGHT + "%")
    //           .css("width", MAX_SQUARE_HEIGHT * value + "%")
    //           .css("background-size", 100/value + '% '+ 100 + '%')
    //           .css("top", offset + "%")
    //           .appendTo(listId);
}

function chooseIndex(startIndex, array) {
    return (startIndex * FACTOR + INCREASE) % array.length;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////// CORE LOGIC /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// TODO 2: Implement bubbleSort
async function bubbleSort(array) {
    //uses the algorithm bubble sort to sort array
    for (var i = 0; i < array.length - 1; i++) {

        for (var j = array.length - 1; j >= i + 1; j--) {

            if (array[j].value < array[j - 1].value) {
                tone((((1212 - 120) / array.length) * array[j].value)) //This generates a tone based on the value of J
                await sleep()  // We must sleep twice so each tone has enough time to play
                tone((((1212 - 120) / array.length) * array[j - 1].value)) // This generates a tone based on the value of J-1 
                await sleep();// Second sleep to allow it to play.
                //console.log(j)
                swap(array, j, j - 1)
                updateCounter(moveCounter);

            }
        }
    }
}
// TODO 3: Implement quickSort
async function quickSort(array, left = 0, right = list.length - 1) {
    if (right - left > 0) {
        let index = await partition(array, left, right)
        if (left < index - 1) {
            await quickSort(array, left, index - 1)
        }
        if (index < right) {
            await quickSort(array, index, right)
        }
    }
}


// TODOs 4 & 5: Implement partition

async function partition(array, left, right) {

    let pivot = array[Math.floor((right + left) / 2)].value;
    while (left < right) {
        while (array[left].value < pivot) left++

        while (array[right].value > pivot) right--


        if (left < right) {
            swap(array, left, right)
            tone((((1212 - 120) / array.length) * array[left].value))
            updateCounter(moveCounter)
            await sleep()
            tone((((1212 - 120) / array.length) * array[right].value))
            await sleep()

        }
    }
    return left + 1

}

// TODO 1: Implement swap

//This funciton swaps two values in an arrays
function swap(array, i, j) {
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
function tone(hz) {
    //creates tone based of of the tone given.

    let osc = AudCon.createOscillator()
    let gain = AudCon.createGain()
    osc.type = "triangle"
    osc.connect(gain)
    gain.connect(AudCon.destination)
    let frequency = hz + 120
    osc.frequency.value = frequency
    osc.start(0)
    gain.gain.exponentialRampToValueAtTime(
        0.00001, AudCon.currentTime + 0.1
    )
    osc.stop(AudCon.currentTime + 0.1)

}
function sleep() {
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j) {
    let element1 = array[i];
    let element2 = array[j];
    let temp2 = parseFloat($("#" + element1.id).attr("x"))
    $("#" + element1.id).attr('x', parseFloat($("#" + element2.id).attr("x")))
    $("#" + element2.id).attr('x', temp2)
}
// This function updates the specified counter
function updateCounter(counter) {
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}
function swapSort(to) {
    currentSort = to
}


$("#bubbleSort").on('click', swapSort(bubbleSort))
$("#quickSort").on('click', swapSort(quickSort))
$("#startButton").on('click', () => { 
    AudCon = new AudioContext(); 
    if(!started || hasConfirmed2x){
        started = true
        currentSort(list);
        $(moveCounter).text("Move Count: " + 0);
    }else{
        $('#prompt').text("This will run two concurrent sorting algorithims. This can cause unexpected and buggy behaviour. Continue?")
        $('#flLayer').css('display', "block")
        $('#confirm').on("click", () => {
            hasConfirmed2x = true
            currentSort(list);
            $('#cancel').off
            $('#confirm').off
            $('#flLayer').css('display', "none")
        })
        $('#cancel').on("click", () => {
            $('#cancel').off
            $('#confirm').off
            $('#flLayer').css('display', "none")
        })
    }

})
$('#range').on('input', () => {
    SLEEP_AMOUNT = document.getElementById('range').value
    document.getElementById('speed').value = (document.getElementById('range').value)
})
$('#speed').on('keyup', () => {
    SLEEP_AMOUNT = document.getElementById('speed').value
    document.getElementById('range').value = (document.getElementById('speed').value)
})
$("#number").on('keyup', () => {
    if (document.getElementById('number').value <= 4000 || hasConfimedOverload) {
        MAX_SQUARES = parseFloat(document.getElementById('number').value);

        for (var i = 0; i <= list.length; i++) {
            $("#bar" + i).remove()
        }
        list = []
        generateList()

        console.log(list.length)
    } else {
        $('#prompt').text('Over 4000 items can cause crashes, slowdowns, or freezes on underpowered hardware. Continue?')
        $('#flLayer').css('display', "block")

        $('#cancel').on('click', ()=> {
            $('#flLayer').css('display', "none")
            $('#cancel').off()
            $('#confirm').off()
        })
        $('#confirm').on("click", () => {
            $('#flLayer').css('display', "none")

            hasConfimedOverload = true
            MAX_SQUARES = parseFloat(document.getElementById('number').value);

            for (var i = 0; i <= list.length; i++) {
                $("#bar" + i).remove()
            }
            list = []
            generateList()

            console.log(list.length)
            $('#cancel').off()
            $('#confirm').off()

        })
    }

})