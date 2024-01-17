
var inputId = 1;
var currentAuthor = "Author1"
var currentCanvas = "canvas1"
var currentTitle = "Title1"
var currentId = "id1"
var currentCard = "card1"

next() 

function nextPressed(){
    clearCanvas()
    next()
}

function next() {
    ctx = document.getElementById(currentCanvas).getContext("2d");
    getStringById()
}

function nextCanvas() {
    if (currentCanvas === "canvas1") {
        currentCanvas = "canvas2"
        currentTitle = "Title2"
        currentAuthor = "Author2"
        currentId = "id2"
        currentCard = "card2"
    }
    else if (currentCanvas === "canvas2") {
        currentCanvas = "canvas3"
        currentTitle = "Title3"
        currentAuthor = "Author3"
        currentId = "id3"
        currentCard = "card3"
    }
    else if (currentCanvas === "canvas3") {
        currentCanvas = "canvas4"
        currentTitle = "Title4"
        currentAuthor = "Author4"
        currentId = "id4"
        currentCard = "card4"
    }
    else if (currentCanvas === "canvas4") {
        currentCanvas = "canvas5"
        currentTitle = "Title5"
        currentAuthor = "Author5"
        currentId = "id5"
        currentCard = "card5"
    }
    else if (currentCanvas === "canvas5") {
        currentCanvas = "canvas6"
        currentTitle = "Title6"
        currentAuthor = "Author6"
        currentId = "id6"
        currentCard = "card6"
    }
    else if (currentCanvas === "canvas6") {
        currentCanvas = "canvas1"
        currentTitle = "Title1"
        currentAuthor = "Author1"
        currentId = "id1"
        currentCard = "card1"
    }
}

async function getStringById() {


    const response = await fetch(`https://certifiedhoodclassics.org/getString/${inputId}`);

    if (response.ok) {
        document.getElementById("head1").style.display = "none"
        const data = await response.json();
        console.log(data)
        eval(data.value)
        
        document.getElementById("head1").style.display = "none"
        document.getElementById(currentTitle).textContent = data.title
        document.getElementById(currentAuthor).textContent = data.author
        document.getElementById(currentId).textContent = "#" + data.id
        document.getElementById(currentCard).style.display = "grid"
        document.getElementById(currentId).setAttribute("data-id", data.id)
        drawPlatforms();
        drawOutlines();
        drawCannons();
        drawCollectables();
        platforms = [];
        cannons = [];
        collectables = [];
        document.getElementById("next").style.display = "flex"
        if (inputId < 7) {
            document.getElementById("previous").style.display = "none"
        } else {
            document.getElementById("previous").style.display = "flex"
        }
        inputId++
        nextCanvas()

        if (currentCanvas !== "canvas1") {

            next()


        }

    } else if (!response.ok) {
        if (response.status === 404) {
            document.getElementById(currentCard).style.display = "none"
            nextCanvas()
            document.getElementById("next").style.display = "none"
            inputId++

            if (currentCard !== "card1") {
                next()
            }
        } else if (response.status === 500){
            document.getElementById("head1").style.display = "block"
        }
    }

    }
    function previous() {
        inputId -= 12;
        clearCanvas()
        document.getElementById(currentCard).style.display = "none"
        next();
    }
    function handleCopy(whichID) {
        navigator.clipboard.writeText(whichID.getAttribute("data-id"));
        whichID.textContent = "Id Copied"
        setTimeout(function () {
            whichID.textContent = "#" + whichID.getAttribute("data-id")
        }, 1500)
    }
    function clearCanvas(){
        document.getElementById("canvas1").getContext("2d").clearRect(0, 0, 1400, 750);
        document.getElementById("canvas2").getContext("2d").clearRect(0, 0, 1400, 750);
        document.getElementById("canvas3").getContext("2d").clearRect(0, 0, 1400, 750);
        document.getElementById("canvas4").getContext("2d").clearRect(0, 0, 1400, 750);
        document.getElementById("canvas5").getContext("2d").clearRect(0, 0, 1400, 750);
        document.getElementById("canvas6").getContext("2d").clearRect(0, 0, 1400, 750);
    }