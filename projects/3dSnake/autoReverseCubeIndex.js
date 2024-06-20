var cubes = [
    {
        made: false,
        x: 1280,
        y: 1400,
        offset: 100,
        radius: 1035,
        visible: true
    },
]
var plate = cubes[0]
const CxR = 22

for (var r = -11; r <= CxR/2; r++) {
    for (var c = -11; c <= CxR/2; c++) {
        var workingCube = {}
        workingCube.made = false
        workingCube.x = 400
        workingCube.y = 40
        workingCube.offset = 100
        workingCube.radius = 45
        workingCube.angleOffset  = findARbyXY(c*(1310/21), r*(1310/21)).angle
        workingCube.radiusOffset = findARbyXY(c*(1310/21), r*(1310/21)).radius
        workingCube.row = r+12
        workingCube.col = c+12
        workingCube.angleRefrence = 4
        workingCube.visible = false
        workingCube.calculated = true
        //console.log(workingCube.radiusOffset)
        //console.log(workingCube.angleOffset)

        cubes.push(workingCube)
    }
}

function findARbyXY(centX, centY) {
    let rs = (Math.sqrt((((centX) ** 2) + ((centY) ** 2))))

    let ae = 0

    if (centX >= 0 && centY > 0) {
        ae = (((Math.asin((centX / rs))) * 180) / Math.PI)
    }
    else if (centY <= 0 && centX > 0) {
        ae = ((Math.acos((centY / rs))) * 180) / Math.PI

    } else if (centY <= 0 && centX <= 0) {
        ae = (((Math.acos(((Math.abs(centY)) / rs))) * 180) / Math.PI) + 180
    } else if (centX <= 0 && centY > 0) {
        ae = ((((Math.acos(((Math.abs(centX)) / rs))) * 180) / Math.PI) + 270)
    } 
    if(isNaN(ae)){
        ae = 0 

    }
    if(isNaN(rs)){
        rs = 0
    }
    ae -= 45
    return {
        angle: ae,
        radius: rs
    }
}

