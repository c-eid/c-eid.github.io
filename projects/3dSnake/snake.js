


var angle1 = 0;
var angle2 = 0;
var angle3 = 0;
var angle4 = 0;


var ran;

var clicked;
var open;

var mouse = {
    x: 0,
    y: 0
};
debugger;
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
    // if (angle1 >= 315){
    //     ang=0
    // }
    // else
    if (angle1 >= 270) {
        angle4 += ang;
        ang = 0.1;

        //     if (offset <= 100) {
        //     offset += 0.01
        // }
    }

        sort();
    

    renderShape();
    if (clicked) {
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(-10000, -10000, 20000, 20000);
        console.log(dataArray[14]);
        backgroundRotation += 0.01 + dataArray[14] / 5000;
        document.getElementById("canvas").style.transform = "rotate(" + backgroundRotation + "deg" + ")";
        console.log(dataArray[3]);
        let lWidth = dataArray[23] / 15;

        for (var i = 0; i < documentWidth * 2; i += 100 + (previous / 10)) {
            ctx.beginPath();
            ctx.lineWidth = 0 + lWidth;
            ctx.strokeStyle = "white";
            ctx.moveTo(0, i);
            ctx.lineTo(documentWidth * 2, i);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 0 + lWidth;
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

var id = setInterval(main, (1000 / 240));



function alongPath(id, angle, xposLocal = 400, yposLocal = 400, radius) {
    var Y = yposLocal / 2 + ((Math.sin(angle * Math.PI / 180) * radius)) / (1 + (offset / 100));
    var X = xposLocal + (Math.cos(angle * Math.PI / 180) * radius);

    $(id).css("top", Y + "px")
        .css("left", X + "px");

    return {
        point: " " + X + "," + Y + " ",
        x: X,
        y: Y
    };
}


function changeColor(id) {
    $(id).css("display", "none");

}

function sort() {

    // this creates the elements in order so that there are layer correctly
    for (var i = 1; i < cubes.length - 1; i++) {
        for (var I = 1; I < cubes.length - 1; I++) {

            if (cubes[I].liveY >= cubes[I + 1].liveY) {


                var temp = cubes[I];
                cubes[I] = cubes[I + 1];
                cubes[I + 1] = temp;
            }
        }
    }
}
function renderShape() {

    for (var i = 0; i < cubes.length; i++) {
        $(".polygon" + i).remove();
        // for (var j = 1; j <= 8; j++) {
        //     $("<div>").attr("id", "circle" + j + "" + i)
        //         .addClass("circle")
        //         .text(j + "")
        //         .appendTo(".circlesDiv")

        // }
        $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "front" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(122,0," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "back" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(122,0," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "left" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(122,0," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "top" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(122,0," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "bottom" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(122,0," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
        $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "right" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(122,0," + i + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);



        // $(".polygon" + i).css("stroke", "rgb(0,0,0)").css("fill", "rgb(0,255,255)").css("stroke-width", "1");
        // $(".polygon" + 0).css("stroke", "rgb(0,0,0)").css("fill", "rgb(255,255,255)").css("stroke-width", "1");


        var cubesY = alongPath("#circle1" + i, angle1, cubes[i].x, cubes[i].y, cubes[i].radius);
        alongPath("#circle5" + i, angle1, cubes[i].x, cubes[i].y + cubes[i].offset, cubes[i].radius);
        if (angle1 >= 90) {

            alongPath("#circle2" + i, angle2, cubes[i].x, cubes[i].y, cubes[i].radius);
            alongPath("#circle6" + i, angle2, cubes[i].x, cubes[i].y + cubes[i].offset, cubes[i].radius);
        }
        if (angle1 >= 180) {

            alongPath("#circle3" + i, angle3, cubes[i].x, cubes[i].y, cubes[i].radius);
            alongPath("#circle7" + i, angle3, cubes[i].x, cubes[i].y + cubes[i].offset, cubes[i].radius);
        }
        if (angle1 >= 270) {




            alongPath("#circle4" + i, angle4, cubes[i].x, cubes[i].y, cubes[i].radius);
            alongPath("#circle8" + i, angle4, cubes[i].x, cubes[i].y + cubes[i].offset, cubes[i].radius);

            var a1 = alongPath("#circle" + i, angle1, (cubes[i].x), cubes[i].y, cubes[i].radius);
            cubes[i]["liveY"] = a1.y;
            var a2 = alongPath("#circle2" + i, angle2, (cubes[i].x), cubes[i].y, cubes[i].radius);
            var a3 = alongPath("#circle3" + i, angle3, (cubes[i].x), cubes[i].y, cubes[i].radius);
            var a4 = alongPath("#circle4" + i, angle4, (cubes[i].x), cubes[i].y, cubes[i].radius);
            var a5 = alongPath("#circle5" + i, angle1, (cubes[i].x), cubes[i].y + cubes[i].offset, cubes[i].radius);
            var a6 = alongPath("#circle6" + i, angle2, (cubes[i].x), cubes[i].y + cubes[i].offset, cubes[i].radius);
            var a7 = alongPath("#circle7" + i, angle3, (cubes[i].x), cubes[i].y + cubes[i].offset, cubes[i].radius);
            var a8 = alongPath("#circle8" + i, angle4, (cubes[i].x), cubes[i].y + cubes[i].offset, cubes[i].radius);
            $("#back" + i).attr("points", a4.point + a8.point + a7.point + a3.point).css("display", "block");
            $("#front" + i).attr("points", a1.point + a5.point + a6.point + a2.point).css("display", "block");
            $("#bottom" + i).attr("points", a5.point + a6.point + a7.point + a8.point).css("display", "block");
            $("#left" + i).attr("points", a2.point + a6.point + a7.point + a3.point).css("display", "block");
            $("#right" + i).attr("points", a1.point + a5.point + a8.point + a4.point).css("display", "block");
            $("#top" + i).attr("points", a1.point + a2.point + a3.point + a4.point).css("display", "block");
            $(".polygon" + i).css("z-index", cubesY.y);
            if (a1.x > a2.x) {
                changeColor("#front" + i);
            }
            if (a4.x < a3.x) {
                changeColor("#back" + i);
            }
            if (a2.x > a3.x) {
                changeColor("#left" + i);
            }
            if (a1.x < a4.x) {
                changeColor("#right" + i);
            }
            changeColor("#bottom" + i);
        }
        if (i !== 0) {
            
            cubes[i].x = alongPath("#circle" + i, ((window["angle" + cubes[i].angleRefrence]) - cubes[i].angleOffset), cubes[0].x, cubes[0].y, cubes[0].radius - cubes[i].radiusOffset).x;

            cubes[i].y = (alongPath("#circle" + i, ((window["angle" + cubes[i].angleRefrence]) - cubes[i].angleOffset), cubes[0].x, cubes[0].y, (cubes[0].radius - cubes[i].radiusOffset) * 2).y) + ((cubes[0].y / 2) - cubes[i].offset - 1);

        }

    }


}
// $(document).on("click", place);

// function place() {
//     ang += 5;
//     // cubes.push({ made: false, x: mouse.x, y: mouse.y, offset: 100, radius: 0 })
// }
// function updateMousePos(event) {
//     mouse.x = event.clientX
//     mouse.y = event.clientY
// }
//visulizor for backround-----------------------------

$(window).on("click", chromeSucks);
function chromeSucks() {
    if (!clicked) {
        //have to put this in a stupid function on click because google is 'restarted'
        audio = document.getElementById("audio");
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

    }
}
function draw() {

    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

}


