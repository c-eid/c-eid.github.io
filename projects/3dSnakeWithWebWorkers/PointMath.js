


var angle1 = 0;
var angle2 = 0;
var angle3 = 0;
var angle4 = 0;

var offset = 100;
var ang = 1;
var down = 1.5;
var previous = 0;
var backgroundRotation = 0;
var cubes = [
    {
        made: false,
        x: 1280,
        y: 1400,
        offset: 100,
        radius: 990,
        visible: true
    }
]

onmessage = (e) => {
    
    let i = e[0]
    angle1 = e[1]
    angle2= e[2]
    angle3= e[3]
    angle4= e[4]
    let cubeC1 =e[5]
    console.log(e[5])
    var cubesY = alongPath("#circle1" + i, angle1, cubeC1.x, cubeC1.y, cubeC1.radius);
    alongPath("#circle5" + i, angle1, cubeC1.x, cubeC1.y + cubeC1.offset, cubeC1.radius);
    if (angle1 >= 90) {

        alongPath("#circle2" + i, angle2, cubeC1.x, cubeC1.y, cubeC1.radius);
        alongPath("#circle6" + i, angle2, cubeC1.x, cubeC1.y + cubeC1.offset, cubeC1.radius);
    }
    if (angle1 >= 180) {

        alongPath("#circle3" + i, angle3, cubeC1.x, cubeC1.y, cubeC1.radius);
        alongPath("#circle7" + i, angle3, cubeC1.x, cubeC1.y + cubeC1.offset, cubeC1.radius);
    }
    if (angle1 >= 270) {


        

        alongPath("#circle4" + i, angle4, cubeC1.x, cubeC1.y, cubeC1.radius);
        alongPath("#circle8" + i, angle4, cubeC1.x, cubeC1.y + cubeC1.offset, cubeC1.radius);

        a1 = alongPath("#circle" + i, angle1, (cubeC1.x), cubeC1.y, cubeC1.radius);
        cubeC1["liveY"] = a1.y;
        a2 = alongPath("", angle2, (cubeC1.x), cubeC1.y, cubeC1.radius);
        a3 = alongPath("", angle3, (cubeC1.x), cubeC1.y, cubeC1.radius);
        a4 = alongPath("", angle4, (cubeC1.x), cubeC1.y, cubeC1.radius);
        a5 = alongPath("", angle1, (cubeC1.x), cubeC1.y + cubeC1.offset, cubeC1.radius);
        a6 = alongPath("", angle2, (cubeC1.x), cubeC1.y + cubeC1.offset, cubeC1.radius);
        a7 = alongPath("", angle3, (cubeC1.x), cubeC1.y + cubeC1.offset, cubeC1.radius);
        a8 = alongPath("", angle4, (cubeC1.x), cubeC1.y + cubeC1.offset, cubeC1.radius);



    }
    // if (i !== 0) {

    //     cubeC1.x = alongPath("#circle" + i, ((window["angle" + cubeC1.angleRefrence]) - cubeC1.angleOffset), cubes[0].x, cubes[0].y, cubes[0].radius - cubeC1.radiusOffset).x;

    //     cubeC1.y = (alongPath("#circle" + i, ((window["angle" + cubeC1.angleRefrence]) - cubeC1.angleOffset), cubes[0].x, cubes[0].y, (cubes[0].radius - cubeC1.radiusOffset) * 2).y) + ((cubes[0].y / 2) - cubeC1.offset - 1);

    // }
    postMessage([true,a1,a2,a3,a4,a5,a6,a7,a8])
}


function alongPath(id, angle, xposLocal = 400, yposLocal = 400, radius) {
    var Y = yposLocal / 2 + ((Math.sin(angle * Math.PI / 180) * radius)) / (1 + (offset / 100));
    var X = xposLocal + (Math.cos(angle * Math.PI / 180) * radius);
    if (!id === "") {

        var current = document.getElementById(id.splice(1))
        current.style.top = Y + "px"
        current.style.left = X + "px"
        // $(id).css("top", Y + "px")
        //     .css("left", X + "px");
    }
    return {
        point: " " + X + "," + Y + " ",
        x: X,
        y: Y
    };
}




