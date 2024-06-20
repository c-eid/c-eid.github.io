var cubes = [
    {
        made: false,
        x: 1280,
        y: 1400,
        offset: 100,
        radius: 990,
        visible: true
    },
]

const CUBEROW = 22
const CUBECOL = 22

for(var r = 1; r<=CUBEROW; r++){
    for(var c = 1; c<=CUBECOL; c++){
        var workingCube = {}
        workingCube.made = false
        workingCube.x = 400
        workingCube.y = 40
        workingCube.offset= 100
        workingCube.radius = 45
        workingCube.angleOffset= 90/CUBECOL * c
        workingCube.radiusOffset = 90*r-45       
        workingCube.row = r
        workingCube.col = c
        workingCube.angleRefrence = 1
        workingCube.visible = false
        console.log(workingCube.radiusOffset)
        cubes.push(workingCube)

    }
}