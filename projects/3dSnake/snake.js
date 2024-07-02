var dragHasPreview = true
var boostSlide = false
$("#playButton").on("mousedown", () => {
    clearInterval(id)
    $("#tut").css("display", "block")
    for (var i = 1; i < cubes.length; i++) {
        cubes[i].visible = false
    }

    angle1 = 335 + 360
    angle2 = 335 - 90 + 360
    angle3 = 335 - 180 + 360
    angle4 = 335 - 270 + 360
    $("#central").css("display", "none")

    audio.src = "./media/944397.mp3";
    audio.play();
    var queueDirection = "left"
    var snake = {
        body: [{ row: 11, col: 11, direction: "left" }, { row: 11, col: 12, direction: "none" }, { row: 11, col: 13, direction: "none" }, { row: 11, col: 14, direction: "none" }],
    }
    var apple = {
        row: 0,
        col: 0
    }
    var drag = {
        started: false,
        startedMouse: { x: 0, y: 0 },
        currentMouse: { x: 0, y: 0 },
        second: false
    }

    snake.head = snake.body[0]
    $("body").on("keydown", handleKeyDown)
    makeApple()
    var snakeFrames = setInterval(newFrame, (1000 / 10))
    function makeApple() {
        var arow = Math.ceil(Math.random() * (CxR - 1))
        var acol = Math.ceil(Math.random() * (CxR - 1))
        for (var i = 0; i < snake.body.length; i++) {
            if (arow === snake.body[i].row && acol === snake.body[i].col) {
                makeApple()
                return
            }
        }
        apple.row = arow
        apple.col = acol
        visifyRC(arow, acol)
    }
    function snakeCollision() {
        for (var i = 1; i < snake.body.length; i++) {
            if (snake.head.row === snake.body[i].row && snake.head.col === snake.body[i].col) {

                audio.pause()
                audio.src = "media/menuloop.mp3"
                audio.load()

                clearInterval(snakeFrames)
                clearInterval(id)
                $("body").off()
                $("svg").off()
                audio.pause()
                $("#score").text(`Score - ${snake.body.length}`)
                $('#menu').css("display", "none")
                $("#central").css("display", "flex")

                $("#deathMenu").css("display", 'flex')
            }
        }
    }
    function moveSnake() {
        for (var i = snake.body.length - 1; i > 0; i--) {
            var snakeSquare = snake.body[i];
            const oldRowd = snake.body[i].row
            const oldCold = snake.body[i].col
            var nextSnakeSquare = snake.body[i - 1];
            var nextRow = nextSnakeSquare.row;
            var nextCol = nextSnakeSquare.col;
            var nextDirection = nextSnakeSquare.direction;

            snakeSquare.direction = nextDirection;
            snakeSquare.row = nextRow;
            snakeSquare.col = nextCol;

            if (i < snake.body.length - 1) {
                repositionSquare(snakeSquare, 0, 0);
            }
            else {
                repositionSquare(snakeSquare, oldRowd, oldCold)
            }
        }

        const oldHeadRow = snake.head.row
        const oldHeadCol = snake.head.col
        if (snake.head.direction === "left" && snake.head.col - 1 > 0) {
            snake.head.col -= 1;
        } else if (snake.head.direction === "right" && snake.head.col - 1 < CxR) {
            snake.head.col += 1;
        } else if (snake.head.direction === "down" && snake.head.row - 1 < CxR) {
            snake.head.row += 1;
        } else if (snake.head.direction === "up" && snake.head.row - 1 > 0) {
            snake.head.row -= 1;
        }
        repositionSquare(snake.head);


    }


    function handleKeyDown(event) {
        if ((event.key === "ArrowUp" || event.key === "w") && snake.head.direction != "down") {
            queueDirection = "up"
        }
        else if ((event.key === "ArrowLeft" || event.key === "a") && snake.head.direction != "right") {
            queueDirection = "left"
        }
        else if ((event.key === "ArrowDown" || event.key === "s") && snake.head.direction != "up") {
            queueDirection = "down"
        }
        else if ((event.key === "ArrowRight" || event.key === "d") && snake.head.direction != "left") {
            queueDirection = "right"
        }
        if (boostSlide) {
            newFrame()
        }
    }

    function newFrame() {
        snake.head.direction = queueDirection
        moveSnake()
        if (snake.body.length >= 5) {
            $("#tut").remove()
        }
        appleCollision()
        snakeCollision()
    }

    function appleCollision() {
        for (var i = 0; i < snake.body.length; i++) {
            if (snake.head.row === apple.row && snake.head.col === apple.col) {
                snake.body.push({ row: 0, col: 0, direction: "none" })
                makeApple()
            }
        }
    }
    function repositionSquare(square, oldRow = 0, oldCol = 0) {
        visifyRC(square.row, square.col)
        invisifyRC(oldRow, oldCol)

    }
    $("#menuButton").on("mousedown", () => {
        snake.body = [{ row: 11, col: 11, direction: "left" }, { row: 11, col: 12, direction: "none" }, { row: 11, col: 13, direction: "none" }, { row: 11, col: 14, direction: "none" }]
        apple.row = 0
        apple.col = 0

        audio.play()

        for (var i = 1; i < cubes.length; i++) {
            cubes[i].visible = false
        }
        for (var i = 1; i < cubes.length; i++) {
            cubes[i].calculated = true
        }
        logo()
        $("#deathMenu").css("display", "none")
        $("#menu").css("display", 'grid')
        clearInterval(id)
        id = setInterval(main, (1000 / 240));


    })

    if (dragHasPreview) {
        $("svg").on("mousedown", (event) => {
            drag.started = true

            for (var i = 1; i < cubes.length; i++) {
                cubes[i].calculated = true
            }
            drag.startedMouse.x = event.pageX
            drag.startedMouse.y = event.pageY

        })
        $("svg").on("mousemove", (event) => {
            if (drag.started === true) {
                if (drag.second) {
                    angle1 += (drag.currentMouse.x - drag.startedMouse.x) / 10
                    angle2 += (drag.currentMouse.x - drag.startedMouse.x) / 10
                    angle3 += (drag.currentMouse.x - drag.startedMouse.x) / 10
                    angle4 += (drag.currentMouse.x - drag.startedMouse.x) / 10
                }
                drag.currentMouse.x = event.pageX
                drag.currentMouse.y = event.pageY
                if (angle1 <= 360 || angle2 <= 360 || angle3 <= 360 || angle4 <= 360) {
                    angle1 += 360
                    angle2 += 360
                    angle3 += 360
                    angle4 += 360

                }
                angle1 -= (drag.currentMouse.x - drag.startedMouse.x) / 10
                angle2 -= (drag.currentMouse.x - drag.startedMouse.x) / 10
                angle3 -= (drag.currentMouse.x - drag.startedMouse.x) / 10
                angle4 -= (drag.currentMouse.x - drag.startedMouse.x) / 10
                drag.second = true

            }
        })
        $("svg").on("mouseup", (event) => {
            drag.started = false
            drag.second = false
            for (var i = 1; i < cubes.length; i++) {
                cubes[i].calculated = false
            }
        })
    } else {


        $("svg").on("mousedown", (event) => {

            drag.started = true
            drag.startedMouse.x = event.pageX
            drag.startedMouse.y = event.pageY
            for (var i = 1; i < cubes.length; i++) {
                cubes[i].calculated = true
            }


        })
        $("svg").on("mousemove", (event) => {
            if (drag.started === true) {
                if (angle1 <= 360 || angle2 <= 360 || angle3 <= 360 || angle4 <= 360) {
                    angle1 += 360
                    angle2 += 360
                    angle3 += 360
                    angle4 += 360

                }

                drag.currentMouse.x = event.pageX
                drag.currentMouse.y = event.pageY

            }
        })
        $("svg").on("mouseup", (event) => {
            drag.started = false
            drag.second = false

            angle1 -= (drag.currentMouse.x - drag.startedMouse.x) / 10
            angle2 -= (drag.currentMouse.x - drag.startedMouse.x) / 10
            angle3 -= (drag.currentMouse.x - drag.startedMouse.x) / 10
            angle4 -= (drag.currentMouse.x - drag.startedMouse.x) / 10
            setTimeout(400, () => {
                for (var i = 1; i < cubes.length; i++) {
                    cubes[i].calculated = false
                }
            })
        })
    }
})



function logo() {
    visifyCR(2, 2)
    visifyCR(2, 3)
    visifyCR(2, 4)
    visifyCR(2, 6)

    visifyCR(3, 2)
    visifyCR(3, 4)
    visifyCR(3, 6)

    visifyCR(4, 2)
    visifyCR(4, 4)
    visifyCR(4, 5)
    visifyCR(4, 6)

    visifyCR(5, 10)
    visifyCR(5, 19)

    visifyCR(6, 2)
    visifyCR(6, 3)
    visifyCR(6, 4)
    visifyCR(6, 5)
    visifyCR(6, 6)
    visifyCR(6, 10)
    visifyCR(6, 14)
    visifyCR(6, 19)

    visifyCR(7, 2)
    visifyCR(7, 10)
    visifyCR(7, 14)
    visifyCR(7, 19)

    visifyCR(8, 2)
    visifyCR(8, 3)
    visifyCR(8, 4)
    visifyCR(8, 5)
    visifyCR(8, 6)
    visifyCR(8, 10)
    visifyCR(8, 14)
    visifyCR(8, 19)

    visifyCR(9, 10)
    visifyCR(9, 14)
    visifyCR(9, 19)

    visifyCR(10, 2)
    visifyCR(10, 3)
    visifyCR(10, 4)
    visifyCR(10, 5)
    visifyCR(10, 6)
    visifyCR(10, 11)
    visifyCR(10, 12)
    visifyCR(10, 13)
    visifyCR(10, 14)
    visifyCR(10, 15)
    visifyCR(10, 16)
    visifyCR(10, 17)
    visifyCR(10, 18)

    visifyCR(11, 2)
    visifyCR(11, 4)

    visifyCR(12, 2)
    visifyCR(12, 4)

    visifyCR(13, 2)
    visifyCR(13, 3)
    visifyCR(13, 4)
    visifyCR(13, 5)
    visifyCR(13, 6)
    visifyCR(13, 10)
    visifyCR(13, 11)
    visifyCR(13, 12)
    visifyCR(13, 13)
    visifyCR(13, 14)
    visifyCR(13, 15)
    visifyCR(13, 16)
    visifyCR(13, 17)
    visifyCR(13, 18)
    visifyCR(13, 19)

    visifyCR(14, 10)
    visifyCR(14, 19)

    visifyCR(15, 2)
    visifyCR(15, 3)
    visifyCR(15, 4)
    visifyCR(15, 5)
    visifyCR(15, 6)
    visifyCR(15, 10)
    visifyCR(15, 19)

    visifyCR(16, 4)
    visifyCR(16, 10)
    visifyCR(16, 19)

    visifyCR(17, 2)
    visifyCR(17, 3)
    visifyCR(17, 5)
    visifyCR(17, 6)
    visifyCR(17, 10)
    visifyCR(17, 19)

    visifyCR(18, 11)
    visifyCR(18, 12)
    visifyCR(18, 13)
    visifyCR(18, 14)
    visifyCR(18, 15)
    visifyCR(18, 16)
    visifyCR(18, 17)
    visifyCR(18, 18)

    visifyCR(19, 2)
    visifyCR(19, 3)
    visifyCR(19, 4)
    visifyCR(19, 5)
    visifyCR(19, 6)

    visifyCR(20, 2)
    visifyCR(20, 4)
    visifyCR(20, 6)

    visifyCR(21, 2)
    visifyCR(21, 4)
    visifyCR(21, 6)
}
audio = document.getElementById("audio");

$("#startButton").on("mousedown", () => {

    audio.src = "./media/menuloop.mp3";
    audio.play();
    context = new AudioContext();
    audioSrc = context.createMediaElementSource(audio);
    analyser = context.createAnalyser();
    audioSrc.connect(analyser);
    analyser.connect(context.destination);

    //start of data
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    clicked = true;
    setInterval(animateBackground, (1000 / 60));
    $("#startButton").remove()
    $("#epDiv").remove()


    cubes[0].visible = true
    logo()
    $("#menu").css("display", "grid")

})
$('#epilepsyStartButton').on("mousedown", () => {
    hasEpilepsy = true
    audio.src = "./media/menuloop.mp3";
    audio.play();
    context = new AudioContext();
    audioSrc = context.createMediaElementSource(audio);
    analyser = context.createAnalyser();
    audioSrc.connect(analyser);
    analyser.connect(context.destination);

    //start of data
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    clicked = true;
    setInterval(animateBackground, (1000 / 60));
    $("#startButton").remove()
    $("#epDiv").remove()
    cubes[0].visible = true
    logo()
    $("#menu").css("display", "grid")
    $("#epilepsyToggle").attr("checked", "true")
})

function openSettings() {
    $("#menu").css("display", "none")
    $("#settingsMenu").css("display", "block")
}

function openPerformance(){
    $("#menu").css("display", "none")
    $("#performanceMenu").css("display", "block")
}

function openCredits() {
    $("#menu").css("display", "none")
    $("#creditsMenu").css("display", "block")
}

function reverse(variable) {
    window[variable] = !window[variable]
}
$(".back").on("mousedown", () => {
    $("#settingsMenu").css("display", "none")
    $("#creditsMenu").css("display", "none")
    $("#performanceMenu").css("display", "none")
    $("#menu").css("display", "grid")
})
$("#frameCap").on("keyup", () => {
    if (document.getElementById("frameCap").valueAsNumber >= 10) {
        clearInterval(id)
        clearInterval(renderShapeInt)
        console.log(document.getElementById("frameCap").valueAsNumber)
        frameCap = document.getElementById("frameCap").valueAsNumber
        renderShapeInt = setInterval(renderShape, (1000 / frameCap));
        id = setInterval(main, (1000 / frameCap));
    }
})