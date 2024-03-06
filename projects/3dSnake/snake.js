const bitCruncher = new Worker("PointMath.js"); //Starts a worker thread to do the heavy lifting of the math for points. This is so that it will run at over 30 fps on a school chromebook :|
var angle1 = 0;
var angle2 = 0;
var angle3 = 0;
var angle4 = 0;
var fpsCounter = 0;
var is = 0;
var ran;
var lazySorting = false
var clicked;
var open;
var mouse = {
    x: 0,
    y: 0
};
debugger;
//audio refrences for background visualization
const canvas = document.getElementById("canvas");
var documentHeight = document.body.clientHeight;
var documentWidth = document.body.clientWidth;
canvas.width = documentWidth * 2;
canvas.height = documentWidth * 2;

$("#canvas").css("width", documentWidth * 2 + "px").css("height", documentWidth * 2 + "px").css("left", (-(documentWidth / 2)) + "px").css("top", (-(documentWidth / 1.35)) + "px");

const ctx = canvas.getContext("2d");
ctx.lineWidth = 10;


// $("#circle").empty()
// $("#circle2").empty()
// $("#circle3").empty()
// $("#circle4").empty()
// $("#circle5").empty()
// $("#circle6").empty()
// $("#circle7").empty()
// $("#circle8").empty()

var offset = 100;
var ang = 1;
var down = 1.5;
var previous = 0;
var backgroundRotation = 0;
function main() {
    // Main() really just updates the angle 
    // I used to have everything in here, but it preformed worse
    // I think it would take a while to finish a task and it would have to finish that before moving on
    // also I can change the fps independantly for each task
    if (ang > 0.1) {
        ang -= 0.001;
    }


    angle1 += ang;





    if (angle1 >= 90) {
        angle2 += ang;
    }
    if (angle1 >= 180) {
        angle3 += ang;
    }
    // if (angle1 >= 315) {
    //     ang = 0
    // }
    // else
    if (angle1 >= 270) {
        angle4 += ang;
        ang = 0.1;

        //     if (offset <= 100) {
        //     offset += 0.01
        // }
    }
if (angle1 >= 360) {

    }
}

var renderShape = setInterval(renderShape, (1000 / 240));

var id = setInterval(main, (1000 / 240));
var fpsID = setInterval(fps, (1000));

function fps() {
    //fps counter. counts the fps for the render shape function, not the page
    $('#fps').text(fpsCounter + "");
    fpsCounter = 0;
}

function alongPath(id, angle, xposLocal = 400, yposLocal = 400, radius) {
    // This is used but I might migrate it to the second core/thread. This is only used twice, the other core executes this function 8 times per cube not frame.
    var Y = yposLocal / 2 + ((Math.sin(angle * Math.PI / 180) * radius)) / (1 + (offset / 100));
    var X = xposLocal + (Math.cos(angle * Math.PI / 180) * radius);
    if (!id === "") {

        var current = document.getElementById(id.splice(1));
        current.style.top = Y + "px";
        current.style.left = X + "px";
        // $(id).css("top", Y + "px")
        //     .css("left", X + "px");
    }
    return {
        point: " " + X + "," + Y + " ",
        x: X,
        y: Y
    };
}


function changeColor(id) {
    //Hides unused polygons, I dont think i use this anymore idk
    document.getElementById(id).style.display = "none";

}


function renderShape() {
   
    fpsCounter++;
    if (lazySorting === true) {
        cubes = cubes.sort(function (a, b) {
            if (a.radius === 990) {
                return 0
            } else if (b.radius === 990) {
                return 0
            }
            return a.liveY - b.liveY
        })
    }

    for (let i = 0; i < cubes.length; i++) {
        //creates polygons in svg
        if (cubes[i].made === false) {
            $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "front" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i * 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
            $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "back" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i * 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
            $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "left" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i * 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
            $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "top" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i * 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
            // $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "bottom" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i * 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
            $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "right" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i * 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);

            // $(".polygon" + i).css("stroke", "rgb(0,0,0)").css("fill", "rgb(0,255,255,0.2)").css("stroke-width", "1");
            $(".polygon" + 0).css("stroke", "rgb(0,0,0)").css("fill", "rgb(255,255,255)").css("stroke-width", "1");
            cubes[i].made = true;
        }

        // else {
        //     $(".polygon" + i).remove();
        //     $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "front" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,255," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        //     $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "back" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,255," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        //     $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "left" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,255," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        //     $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "top" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,255," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        //     $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "bottom" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,255," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        //     $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "right" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,255," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        // }

        if (lazySorting === false) {
            cubes = cubes.sort(function (a, b) {
                if (a.radius === 990) {
                    return 0
                } else if (b.radius === 990) {
                    return 0
                }
                return a.liveY - b.liveY
            })
        }
        //sends the cube two core to in order to do the math that takes awhile.
        bitCruncher.postMessage([i, angle1, angle2, angle3, angle4, cubes[i], ang]);



    }
}
bitCruncher.onmessage = (aDONT) => {
 //This has to be done on main core unfortualy, only main core can edit html  
    var a = aDONT.data;

    cubes[a[9]]["liveY"] = a[1].y;

    const idTop = document.getElementById(`top${a[9]}`);
    idTop.setAttribute("points", a[1].point + a[2].point + a[3].point + a[4].point + "");
    idTop.style.display = "block";
    //these check the position of two points to determine wether or not they should be rendered.
    if (a[1].x > a[2].x) {
        changeColor("front" + a[9]);
    } else {
        const idFront = document.getElementById(`front${a[9]}`);
        idFront.setAttribute("points", a[1].point + a[5].point + a[6].point + a[2].point + "");
        idFront.style.display = "block";
    }
    if (a[4].x < a[3].x) {
        changeColor("back" + a[9]);
    } else {
        const idBack = document.getElementById(`back${a[9]}`);
        idBack.setAttribute("points", a[4].point + a[8].point + a[7].point + a[3].point + "");
        idBack.style.display = "block";
    }
    if (a[2].x > a[3].x) {
        changeColor("left" + a[9]);
    } else {
        const idLeft = document.getElementById(`left${a[9]}`);
        idLeft.setAttribute("points", a[2].point + a[6].point + a[7].point + a[3].point + "");
        idLeft.style.display = "block";
    }
    if (a[1].x < a[4].x) {
        changeColor("right" + a[9]);
    } else {
        const idRight = document.getElementById(`right${a[9]}`);
        idRight.setAttribute("points", a[1].point + a[5].point + a[8].point + a[4].point + "");
        idRight.style.display = "block";
    }
    if (a[9] !== 0) {
        cubes[a[9]].x = alongPath("#circle" + a[9], ((window["angle" + cubes[a[9]].angleRefrence]) - cubes[a[9]].angleOffset), cubes[0].x, cubes[0].y, cubes[0].radius - cubes[a[9]].radiusOffset).x;
        cubes[a[9]].y = (alongPath("#circle" + a[9], ((window["angle" + cubes[a[9]].angleRefrence]) - cubes[a[9]].angleOffset), cubes[0].x, cubes[0].y, (cubes[0].radius - cubes[a[9]].radiusOffset) * 2).y) + ((cubes[0].y / 2) - cubes[a[9]].offset - 1);
    }

};
// $(document).on("click", place);

// function place() {
//     ang += 5;
//     // cubes.push({ made: false, x: mouse.x, y: mouse.y, offset: 100, radius: 0 })
// }
// function updateMousePos(event) {
//     mouse.x = event.clientX
//     mouse.y = event.clientY
// }
//visulizor for backround

$(window).on("click", chromeSucks);
audio = document.getElementById("audio");
function chromeSucks() {
    if (!clicked) {
        //have to put this in a stupid function on click because google 
        audio.src = "./944397.mp3";
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
    } else {
        audio.src = "./daydream.mp3";
        audio.play();
    }
}
function draw() {
    //draw is for backgoround
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

}




function animateBackground() {
    if (clicked) {
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(-10000, -10000, 20000, 20000);

        backgroundRotation += 0.01 + dataArray[14] / 5000;
        document.getElementById("canvas").style.transform = "rotate(" + backgroundRotation + "deg" + ")";

        let lWidth = dataArray[23] / 2.5;

        for (var i = 0; i < documentWidth * 2; i += 100 + (previous / 10)) {
            ctx.beginPath();
            ctx.lineWidth = 100 + (previous / 10) - lWidth;
            ctx.strokeStyle = "white";
            ctx.moveTo(0, i);
            ctx.lineTo(documentWidth * 2, i);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 100 + (previous / 10) - lWidth;
            ctx.moveTo(i, 0);
            ctx.lineTo(i, documentWidth * 2);
            ctx.closePath();
            ctx.stroke();
        }

        if (dataArray[3] >= 245) {
            previous += 5;
        }
        if (previous > 0) {
            previous -= down;
        }
    }
}