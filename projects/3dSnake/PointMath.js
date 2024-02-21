


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

onmessage = (s) => {
    
    let i = s.data[0]
    angle1 = s.data[1]
    angle2= s.data[2]
    angle3= s.data[3]
    angle4= s.data[4]
    let cubeC1 =s.data[5]
    if(i===0){
        sort()
    }
    var cubesY = alongPathCore2("#circle1" + i, angle1, cubeC1.x, cubeC1.y, cubeC1.radius);
    alongPathCore2("#circle5" + i, angle1, cubeC1.x, cubeC1.y + cubeC1.offset, cubeC1.radius);
    if (angle1 >= 90) {

        alongPathCore2("#circle2" + i, angle2, cubeC1.x, cubeC1.y, cubeC1.radius);
        alongPathCore2("#circle6" + i, angle2, cubeC1.x, cubeC1.y + cubeC1.offset, cubeC1.radius);
    }
    if (angle1 >= 180) {

        alongPathCore2("#circle3" + i, angle3, cubeC1.x, cubeC1.y, cubeC1.radius);
        alongPathCore2("#circle7" + i, angle3, cubeC1.x, cubeC1.y + cubeC1.offset, cubeC1.radius);
    }
    if (angle1 >= 270) {


        

        alongPathCore2("#circle4" + i, angle4, cubeC1.x, cubeC1.y, cubeC1.radius);
        alongPathCore2("#circle8" + i, angle4, cubeC1.x, cubeC1.y + cubeC1.offset, cubeC1.radius);

        var a1 = alongPathCore2("#circle" + i, angle1, (cubeC1.x), cubeC1.y, cubeC1.radius);
        var a2 = alongPathCore2("", angle2, (cubeC1.x), cubeC1.y, cubeC1.radius);
        var a3 = alongPathCore2("", angle3, (cubeC1.x), cubeC1.y, cubeC1.radius);
        var a4 = alongPathCore2("", angle4, (cubeC1.x), cubeC1.y, cubeC1.radius);
        var a5 = alongPathCore2("", angle1, (cubeC1.x), cubeC1.y + cubeC1.offset, cubeC1.radius);
        var a6 = alongPathCore2("", angle2, (cubeC1.x), cubeC1.y + cubeC1.offset, cubeC1.radius);
        var a7 = alongPathCore2("", angle3, (cubeC1.x), cubeC1.y + cubeC1.offset, cubeC1.radius);
        var a8 = alongPathCore2("", angle4, (cubeC1.x), cubeC1.y + cubeC1.offset, cubeC1.radius);

        postMessage([true,a1,a2,a3,a4,a5,a6,a7,a8,i])

    }
    // if (i !== 0) {

    //     cubeC1.x = alongPathCore2("#circle" + i, ((window["angle" + cubeC1.angleRefrence]) - cubeC1.angleOffset), cubes[0].x, cubes[0].y, cubes[0].radius - cubeC1.radiusOffset).x;

    //     cubeC1.y = (alongPathCore2("#circle" + i, ((window["angle" + cubeC1.angleRefrence]) - cubeC1.angleOffset), cubes[0].x, cubes[0].y, (cubes[0].radius - cubeC1.radiusOffset) * 2).y) + ((cubes[0].y / 2) - cubeC1.offset - 1);

    // }
    
}


function alongPathCore2(id, angle, xposLocal = 400, yposLocal = 400, radius) {
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




