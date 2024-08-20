var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mountains = [
    [],
    [],
    [],
    [],
    [],
]
const mountainTemplate={
    x:0,
    width:0,
    height:0,
    color:{r:0,b:0,g:0},    
}

function makeMountains(){ 
    var lastI = 0
    var next = 0
    for(var i = 0; lastI <= 1920; i += 200){
        var mountain = {};
        mountain.x = lastI
        mountain.width = i - lastI
        mountain.height = Math.ceil(Math.random() * 200)
        mountain.color = {}
        mountain.color.r =  80
        mountain.color.g = 0
        mountain.color.b = 120
        console.log(lastI)
        mountains[0][next]= mountain
        lastI = i
        next++
    }
}

function drawMountains(){
    for(var i = 0; i < mountains[0].length; i++){
        ctx.fillStyle = `rgb(${mountains[0][i].color.r},${mountains[0][i].color.g},${mountains[0][i].color.b})`
        ctx.beginPath();
        ctx.moveTo(mountains[0][i].x, 1080-100);
        ctx.lineTo(mountains[0][i].x + mountains[0][i].width/2, 1080-100-mountains[0][i].height);
        ctx.lineTo(mountains[0][i].x + mountains[0][i].width, 1080-100)
        ctx.lineTo(mountains[0][i].x, 1080-100);
        ctx.closePath();
        ctx.fill();
    }
}
console.log(mountains[0])
makeMountains()
drawMountains()

function main(){
    
}

