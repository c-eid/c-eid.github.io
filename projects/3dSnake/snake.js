$(document).ready(() => {
    var snake = {
        body: [{ row: 11, col: 11, direction: "none" }, { row: 0, col: 0, direction: "none" }, { row: 0, col: 0, direction: "none" }, { row: 0, col: 0, direction: "none" }],
    }
    var drag = {
        started: false,
        startedMouse: { x: 0, y: 0 },
        currentMouse: { x: 0, y: 0 },
        second: false
    }

    snake.head = snake.body[0]
    $("body").on("keydown", handleKeyDown)
    setInterval(newFrame, (1000 / 10))


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
        if (event.key === "ArrowUp" || event.key === "w") {
            snake.head.direction = "up"
        }
        else if (event.key === "ArrowLeft" || event.key === "a") {
            snake.head.direction = "left"
        }
        else if (event.key === "ArrowDown" || event.key === "s") {
            snake.head.direction = "down"
        }
        else if (event.key === "ArrowRight" || event.key === "d") {
            snake.head.direction = "right"
        }
    }

    function newFrame() {
        moveSnake()
    }


    function repositionSquare(square, oldRow = 0, oldCol = 0) {
        visifyRC(square.row, square.col)
        invisifyRC(oldRow, oldCol)

    }

    $("body").on("mousedown", (event) => {
        if (angle1 >= 270) {
            drag.started = true

            for (var i = 1; i < cubes.length; i++) {
                cubes[i].calculated = true
            }
            drag.startedMouse.x = event.pageX
            drag.startedMouse.y = event.pageY
        }
    })
    $("body").on("mousemove", (event) => {
        if (drag.started === true && angle1 >= 270) {
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
    $("body").on("mouseup", (event) => {
        if (angle1 >= 270) {
            drag.started = false
            drag.second = false
            for (var i = 1; i < cubes.length; i++) {
                cubes[i].calculated = false
            }
        }
    })



    // $("body").on("mousedown", (event)=>{
  //  if (angle1 >= 270) { 
    //     drag.started = true

    //     for(var i = 1; i < cubes.length; i++){
    //         cubes[i].calculated = true
    //     }
    //     drag.startedMouse.x = event.pageX
    //     drag.startedMouse.y = event.pageY
//}
// })
// $("body").on("mousemove", (event)=>{
//    if(angle1 >=270){
//     if(drag.started===true){

//         drag.currentMouse.x = event.pageX
//         drag.currentMouse.y = event.pageY

//     }
 //   }
// })
// $("body").on("mouseup", (event)=>{
//    if(angle1 >=270)
//     drag.started = false
//     drag.second = false
//     if(angle1 <= 0 || angle2 <= 0 || angle3 <= 0 || angle4 <= 0 ){
//         angle1+=360
//         angle2+=360
//         angle3+=360
//         angle4+=360

//     }
//     angle1 -= (drag.currentMouse.x - drag.startedMouse.x)/10
//     angle2 -= (drag.currentMouse.x - drag.startedMouse.x)/10
//     angle3 -= (drag.currentMouse.x - drag.startedMouse.x)/10
//     angle4 -= (drag.currentMouse.x - drag.startedMouse.x)/10
//     
//     for(var i = 1; i < cubes.length; i++){
//         cubes[i].calculated = false
//     }
//}
// })
})