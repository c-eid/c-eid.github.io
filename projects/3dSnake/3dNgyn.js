const bitCruncher = new Worker("PointMath.js"); //Starts a worker thread to do the heavy lifting of the math for points. This is so that it will run at over 30 fps on a school chromebook :|
var angle1 = 0;
var angle2 = 0;
var angle3 = 0;
var isSingleCore = true
var angle4 = 0;
var frameCap = 240
var hasEpilepsy = false
var useSvg = true
var fpsCounter = 0;
var is = 0;
var ran;
var rtx = 0
var averageAud
var clicked;
var initalPreloadVisible = true
var open;
var enableWasm = false
var mouse = {
    x: 0,
    y: 0
};
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
var percent = 0
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
    // if (ang > 0.1) {
    //     ang -= 0.001;
    // }


    angle1 += ang;
    if (percent <= 270) {
        percent += ang
        $("#percentLoaded").text(Math.floor((percent / 270) * 100) + "%")
    } else {
        $("#percentDiv").remove()
        $("#startButton").css("display", "flex")
        $("#epilepsyStartButton").css("display", "flex")
    }




    if (angle1 >= 90) {
        angle2 += ang;
    }
    if (angle1 >= 180) {
        angle3 += ang;
    }

    if (angle1 >= 270) {
        angle4 += ang;
        ang = 0.1
        
        // if(initalPreloadVisible === true){
        //     for(var i = 1; i < cubes.length; i++){
        //         cubes[i].calculated = false
        //     }

        // }
        // clearInterval(id)


        //     if (offset <= 100) {
        //     offset += 0.01
        // }
    }

    if (angle1 >= 360) {
       
    }

}

var renderShapeInt = setInterval(renderShape, (1000 / frameCap));

var id = setInterval(main, (1000 / frameCap));
var fpsID = setInterval(fps, (1000));

function fps() {
    //fps counter. counts the fps for the render shape function, not the page
    $('#fps').text(fpsCounter + "");
    if (fpsCounter <= 29) {
        $("#performance").css("display", "flex")

    } else {
        $("#performance").css("display", "none")

    }
    fpsCounter = 0;
}

function alongPath(id, angle, xposLocal = 400, yposLocal = 400, radius, radius2 = radius) {
    // This is used but I might migrate it to the second core/thread. This is only used twice, the other core executes this function 8 times per cube not frame.
    var Y = yposLocal / 2 + ((Math.sin(angle * Math.PI / 180) * radius2)) / (1 + (offset / 100));
    var X = xposLocal + (Math.cos(angle * Math.PI / 180) * radius);
    if (!id === "") {

        // var current = document.getElementById(id.splice(1));
        // current.style.top = Y + "px";
        // current.style.left = X + "px";
        // $(id).css("top", Y + "px")
        //     .css("left", X + "px");
    }
    return {
        point: " " + X + "," + Y + " ",
        x: X,
        y: Y
    };
}


function invisify(id) {
    //Hides unused polygons, 
    if (useSvg) {
        document.getElementById(id).style.display = "none";
    }
}
function visify(id, i = "not") {
    //Shows used polygons if visible
    if (useSvg) {
        if (i === "not") {
            document.getElementById(id).style.display = "block";
        } else if (cubes[i].visible) {
            document.getElementById(id).style.display = "block";
        }
    }
}



function renderShape() {
    if(!useSvg){
        rtx.clearRect(0, 0, 9000, 9000)
    }
    fpsCounter++;
    cubes = cubes.sort(function (a, b) {
        if (a.radius === cubes[0].radius) {
            return 0
        } else if (b.radius === cubes[0].radius) {
            return 0
        }


        return a.liveY - b.liveY
    })

    for (let i = 0; i < cubes.length; i++) {
        //creates polygons in svg

        if (cubes[i].made === false) {
            if (useSvg) {
                $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "front" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i / 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
                $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "back" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i / 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
                $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "left" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i / 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
                $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "top" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i / 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
                // $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "bottom" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i * 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);
                $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')).attr("id", "right" + i).attr("points", "1,1 1,1 1,1 1,1").appendTo("svg").css("fill", "rgb(255,0," + i / 2 + ")").css("stroke", "rgba(0, 0, 0)").css("stroke-width", "1").addClass("polygon" + i);

                //$(".polygon" + i).css("stroke", "rgb(0,0,0)").css("fill", "rgb(0,255,255)").css("stroke-width", "1");
                $(".polygon" + 0).css("stroke", "rgb(0,0,0)").css("fill", "rgb(255,255,255)").css("stroke-width", "1");
                cubes[i].made = true;
            } else {
                cubes[i].made = true;

            }
        }


        //sends the cube two core to in order to do the math that takes awhile.
        if (cubes[i].visible || cubes[i].calculated) {
            if (!isSingleCore) {
                cubes = cubes.sort(function (a, b) {
                    if (a.radius === cubes[0].radius) {
                        return 0
                    } else if (b.radius === cubes[0].radius) {
                        return 0
                    }


                    return a.liveY - b.liveY
                })
                bitCruncher.postMessage([i, angle1, angle2, angle3, angle4, cubes[i], ang]);
            } else {


                let a1 = alongPath("#circle" + i, angle1, (cubes[i].x), cubes[i].y, cubes[i].radius);
                let a2 = alongPath("", angle2, (cubes[i].x), cubes[i].y, cubes[i].radius);
                let a3 = alongPath("", angle3, (cubes[i].x), cubes[i].y, cubes[i].radius);
                let a4 = alongPath("", angle4, (cubes[i].x), cubes[i].y, cubes[i].radius);
                let a5 = alongPath("", angle1, (cubes[i].x), cubes[i].y + cubes[i].offset, cubes[i].radius);
                let a6 = alongPath("", angle2, (cubes[i].x), cubes[i].y + cubes[i].offset, cubes[i].radius);
                let a7 = alongPath("", angle3, (cubes[i].x), cubes[i].y + cubes[i].offset, cubes[i].radius);
                let a8 = alongPath("", angle4, (cubes[i].x), cubes[i].y + cubes[i].offset, cubes[i].radius);



                cubes[i]["liveY"] = a1.y;

                var bottomMidX = (a6.x + a7.x) / 2

                var bottomMidY = (a6.y + a7.y) / 2
                if (useSvg) {
                    if (i !== 0) {
                        cubes[i].x = alongPath("#circle" + i, ((window["angle" + cubes[i].angleRefrence]) - cubes[i].angleOffset), cubes[0].x, cubes[0].y, cubes[i].radiusOffset).x;
                        cubes[i].y = (alongPath("#circle" + i, ((window["angle" + cubes[i].angleRefrence]) - cubes[i].angleOffset), cubes[0].x, cubes[0].y, (cubes[i].radiusOffset) * 2).y) + ((cubes[0].y / 2) - cubes[i].offset - 1);

                    }
                    if (cubes[i].visible || cubes[i].calculated) {
                        if (!cubes[i].visible) {
                            //catch for calculated but invisible
                            invisify("top" + i);
                            
                            invisify("right" + i);
                            invisify("front" + i);
                            invisify("back" + i);
                            invisify("left" + i);
                        }
                        const idTop = document.getElementById(`top${i}`);
                        idTop.setAttribute("points", a1.point + a2.point + a3.point + a4.point + "");
                        visify(`top${i}`, i);
                        //these check the position of two points to determine wether or not they should be rendered.
                        if (a1.x > a2.x) {
                            invisify("front" + i);
                        } else {
                            const idFront = document.getElementById(`front${i}`);
                            idFront.setAttribute("points", a1.point + a5.point + a6.point + a2.point + "");
                            visify(`front${i}`, i)
                        }
                        if (a4.x < a3.x) {
                            invisify("back" + i);
                        } else {
                            const idBack = document.getElementById(`back${i}`);
                            idBack.setAttribute("points", a4.point + a8.point + a7.point + a3.point + "");
                            visify(`back${i}`, i)
                        }
                        if (a2.x > a3.x) {
                            invisify("left" + i);
                        } else {
                            const idLeft = document.getElementById(`left${i}`);
                            idLeft.setAttribute("points", a2.point + a6.point + a7.point + a3.point + "");
                            visify(`left${i}`, i)
                        }
                        if (a1.x < a4.x) {
                            invisify("right" + i);
                        } else {
                            const idRight = document.getElementById(`right${i}`);
                            idRight.setAttribute("points", a1.point + a5.point + a8.point + a4.point + "");
                            visify(`right${i}`, i)
                        }

                    } else {
                        //catch for when invisible and still renders somehow
                        invisify("top" + i);
                        invisify("right" + i);
                        invisify("front" + i);
                        invisify("back" + i);
                        invisify("left" + i);
                    }

                } else {
                    //html canvas support. idk how but runs slower then svg and is abandoned for now
                    if (cubes[i].visible) {
                        rtx.fillStyle = '#ff00ff';
                        if (i === 0) {
                            rtx.fillStyle = '#ffffff';
                        }
                        rtx.strokeStyle = "#000000"
                        rtx.lineWidth = 5

                    
                        if (!(a1.x > a2.x)) {
                            rtx.beginPath();

                            rtx.moveTo(a1.x, a1.y);
                            rtx.lineTo(a5.x, a5.y);
                            rtx.lineTo(a6.x, a6.y);
                            rtx.lineTo(a2.x, a2.y);
                            rtx.stroke()

                            rtx.closePath();

                            rtx.fill();
                        }
                        if (!(a4.x < a3.x)) {
                            rtx.beginPath();

                            rtx.moveTo(a4.x, a4.y);
                            rtx.lineTo(a8.x, a8.y);
                            rtx.lineTo(a7.x, a7.y);
                            rtx.lineTo(a3.x, a3.y);
                            rtx.stroke()

                            rtx.closePath();

                            rtx.fill();
                        }
                        if (!(a2.x > a3.x)) {
                            rtx.beginPath();

                            rtx.moveTo(a2.x, a2.y);
                            rtx.lineTo(a6.x, a6.y);
                            rtx.lineTo(a7.x, a7.y);
                            rtx.lineTo(a3.x, a3.y);
                            rtx.stroke()

                            rtx.closePath();

                            rtx.fill();

                        }
                        if (!(a1.x < a4.x)) {
                            rtx.beginPath();

                            rtx.moveTo(a1.x, a1.y);
                            rtx.lineTo(a5.x, a5.y);
                            rtx.lineTo(a8.x, a8.y);
                            rtx.lineTo(a4.x, a4.y);
                            rtx.stroke()

                            rtx.closePath();

                            rtx.fill();
                        }
                        rtx.beginPath();
                        rtx.moveTo(a1.x, a1.y);
                        rtx.lineTo(a2.x, a2.y);
                        rtx.lineTo(a3.x, a3.y);
                        rtx.lineTo(a4.x, a4.y);
                        rtx.lineTo(a1.x, a1.y);
                        rtx.closePath();
                        rtx.stroke()

                        rtx.fill();
                    }
                    if (i !== 0) {
                        cubes[i].x = alongPath("#circle" + i, ((window["angle" + cubes[i].angleRefrence]) - cubes[i].angleOffset), cubes[0].x, cubes[0].y, cubes[i].radiusOffset).x;
                        cubes[i].y = (alongPath("#circle" + i, ((window["angle" + cubes[i].angleRefrence]) - cubes[i].angleOffset), cubes[0].x, cubes[0].y, (cubes[i].radiusOffset) * 2).y) + ((cubes[0].y / 2) - cubes[i].offset - 1);

                    }
                }
            }
        } else {
            cubes[i].liveY = alongPath("#circle" + i, angle1, (cubes[i].x), cubes[i].y, cubes[i].radius).y;
            invisify("top" + i);
            invisify("right" + i);
            invisify("front" + i);
            invisify("back" + i);
            invisify("left" + i);
        }

    }
}

bitCruncher.onmessage = (aDONT) => {
    //This has to be done on main core unfortunatly, only main core can edit html  


    var a = aDONT.data;

    cubes[a[9]]["liveY"] = a[1].y;

    var bottomMidX = (a[6].x + a[7].x) / 2

    var bottomMidY = (a[6].y + a[7].y) / 2
    if (useSvg) {
        if (a[9] !== 0) {
            cubes[a[9]].x = alongPath("#circle" + a[9], ((window["angle" + cubes[a[9]].angleRefrence]) - cubes[a[9]].angleOffset), cubes[0].x, cubes[0].y, cubes[a[9]].radiusOffset).x;
            cubes[a[9]].y = (alongPath("#circle" + a[9], ((window["angle" + cubes[a[9]].angleRefrence]) - cubes[a[9]].angleOffset), cubes[0].x, cubes[0].y, (cubes[a[9]].radiusOffset) * 2).y) + ((cubes[0].y / 2) - cubes[a[9]].offset - 1);

        }
        if (cubes[a[9]].visible || cubes[a[9]].calculated) {
            if (!cubes[a[9]].visible) {
                //catch for calculated but invisible
                invisify("top" + a[9]);
                invisify("right" + a[9]);
                invisify("front" + a[9]);
                invisify("back" + a[9]);
                invisify("left" + a[9]);
            }
            const idTop = document.getElementById(`top${a[9]}`);
            idTop.setAttribute("points", a[1].point + a[2].point + a[3].point + a[4].point + "");
            visify(`top${a[9]}`, a[9]);
            //these check the position of two points to determine wether or not they should be rendered.
            if (a[1].x > a[2].x) {
                invisify("front" + a[9]);
            } else {
                const idFront = document.getElementById(`front${a[9]}`);
                idFront.setAttribute("points", a[1].point + a[5].point + a[6].point + a[2].point + "");
                visify(`front${a[9]}`, a[9])
            }
            if (a[4].x < a[3].x) {
                invisify("back" + a[9]);
            } else {
                const idBack = document.getElementById(`back${a[9]}`);
                idBack.setAttribute("points", a[4].point + a[8].point + a[7].point + a[3].point + "");
                visify(`back${a[9]}`, a[9])
            }
            if (a[2].x > a[3].x) {
                invisify("left" + a[9]);
            } else {
                const idLeft = document.getElementById(`left${a[9]}`);
                idLeft.setAttribute("points", a[2].point + a[6].point + a[7].point + a[3].point + "");
                visify(`left${a[9]}`, a[9])
            }
            if (a[1].x < a[4].x) {
                invisify("right" + a[9]);
            } else {
                const idRight = document.getElementById(`right${a[9]}`);
                idRight.setAttribute("points", a[1].point + a[5].point + a[8].point + a[4].point + "");
                visify(`right${a[9]}`, a[9])
            }

        } else {
            //catch for when invisible and still renders somehow
            invisify("top" + a[9]);
            invisify("right" + a[9]);
            invisify("front" + a[9]);
            invisify("back" + a[9]);
            invisify("left" + a[9]);
        }

    } 
    //else {
        //html canvas support. idk how but runs slower then svg and is abandoned for now
    //     if (cubes[a[9]].visible) {
    //         rtx.fillStyle = '#ff00ff';
    //         if (a[9] === 0) {
    //             rtx.fillStyle = '#ffffff';
    //         }
    //         rtx.strokeStyle = "#000000"
    //         rtx.lineWidth = 5

        
    //         if (!(a[1].x > a[2].x)) {
    //             rtx.beginPath();

    //             rtx.moveTo(a[1].x, a[1].y);
    //             rtx.lineTo(a[5].x, a[5].y);
    //             rtx.lineTo(a[6].x, a[6].y);
    //             rtx.lineTo(a[2].x, a[2].y);
    //             rtx.stroke()

    //             rtx.closePath();

    //             rtx.fill();
    //         }
    //         if (!(a[4].x < a[3].x)) {
    //             rtx.beginPath();

    //             rtx.moveTo(a[4].x, a[4].y);
    //             rtx.lineTo(a[8].x, a[8].y);
    //             rtx.lineTo(a[7].x, a[7].y);
    //             rtx.lineTo(a[3].x, a[3].y);
    //             rtx.stroke()

    //             rtx.closePath();

    //             rtx.fill();
    //         }
    //         if (!(a[2].x > a[3].x)) {
    //             rtx.beginPath();

    //             rtx.moveTo(a[2].x, a[2].y);
    //             rtx.lineTo(a[6].x, a[6].y);
    //             rtx.lineTo(a[7].x, a[7].y);
    //             rtx.lineTo(a[3].x, a[3].y);
    //             rtx.stroke()

    //             rtx.closePath();

    //             rtx.fill();

    //         }
    //         if (!(a[1].x < a[4].x)) {
    //             rtx.beginPath();

    //             rtx.moveTo(a[1].x, a[1].y);
    //             rtx.lineTo(a[5].x, a[5].y);
    //             rtx.lineTo(a[8].x, a[8].y);
    //             rtx.lineTo(a[4].x, a[4].y);
    //             rtx.stroke()

    //             rtx.closePath();

    //             rtx.fill();
    //         }
    //         rtx.beginPath();
    //         rtx.moveTo(a[1].x, a[1].y);
    //         rtx.lineTo(a[2].x, a[2].y);
    //         rtx.lineTo(a[3].x, a[3].y);
    //         rtx.lineTo(a[4].x, a[4].y);
    //         rtx.lineTo(a[1].x, a[1].y);
    //         rtx.closePath();
    //         rtx.stroke()

    //         rtx.fill();
    //     }

    //     if (a[9] !== 0) {
    //         cubes[a[9]].x = alongPath("#circle" + a[9], ((window["angle" + cubes[a[9]].angleRefrence]) - cubes[a[9]].angleOffset), cubes[0].x, cubes[0].y, cubes[a[9]].radiusOffset).x;
    //         cubes[a[9]].y = (alongPath("#circle" + a[9], ((window["angle" + cubes[a[9]].angleRefrence]) - cubes[a[9]].angleOffset), cubes[0].x, cubes[0].y, (cubes[a[9]].radiusOffset) * 2).y) + ((cubes[0].y / 2) - cubes[a[9]].offset - 1);

    //     }
    // }

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
//visulizor for backround

//$(window).on("click", chromeSucks);

function draw() {
    //draw is for backgoround
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

}




function animateBackground() {
    if (clicked) {
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        backgroundRotation += 0.01 + dataArray[14] / 5000;
        document.getElementById("canvas").style.transform = "rotate(" + backgroundRotation + "deg" + ")";
        if (!hasEpilepsy) {
            ctx.clearRect(-10000, -10000, 20000, 20000);
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
            averageAud = 0

            for (var i = 0; i < bufferLength; i++) {
                averageAud += dataArray[i]
            }
            averageAud = averageAud / bufferLength
            //console.log(averageAud)
            dataArray.sort()

            document.getElementById("body").style.backgroundImage = `linear-gradient(to right, ${hsvToRgb((2.8125 * averageAud), 1, 1)}, ${hsvToRgb((1.41176470588 * dataArray[64]), 1, 1)}`
        } else {
            ctx.clearRect(-10000, -10000, 20000, 20000);

            for (var i = 0; i < documentWidth * 2; i += 100) {
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.strokeStyle = "white";
                ctx.moveTo(0, i);
                ctx.lineTo(documentWidth * 2, i);
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.moveTo(i, 0);
                ctx.lineTo(i, documentWidth * 2);
                ctx.closePath();
                ctx.stroke();
            }
            document.getElementById("body").style.backgroundImage = 'linear-gradient(to right, #E100FF, #7F00FF)'
        }
    }
}

function hsvToRgb(h, s, v) {
    var r, g, b;
    h /= 360
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;

}

function visifyRC(row, col) {
    for (var i = 1; i < cubes.length; i++) {
        if (cubes[i].row === row && cubes[i].col === col) {
            cubes[i].visible = true
            // visify("top" + i);
            // visify("right" + i);
            // visify("front" + i);
            // visify("back" + i);
            // visify("left" + i);
            return
        }
    }
}
function visifyCR(col, row) {
    for (var i = 1; i < cubes.length; i++) {
        if (cubes[i].row === row && cubes[i].col === col) {
            cubes[i].visible = true
            // visify("top" + i);
            // visify("right" + i);
            // visify("front" + i);
            // visify("back" + i);
            // visify("left" + i);
            return
        }
    }
}
function invisifyRC(row, col) {
    for (var i = 1; i < cubes.length; i++) {
        if (cubes[i].row === row && cubes[i].col === col) {
            cubes[i].visible = false
            invisify("top" + i);
            invisify("right" + i);
            invisify("front" + i);
            invisify("back" + i);
            invisify("left" + i);
            return
        }
    }
}