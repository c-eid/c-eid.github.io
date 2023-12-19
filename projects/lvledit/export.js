function exportlvl(){
    var platformsforExport = []
    var collectablesforExport = []
    for(var i = 0; i < platforms.length; i++){
        
        platformsforExport.push("createPlatform(" + platforms[i].x + ", " + platforms[i].y + ", " + platforms[i].width + ", " + platforms[i].height + ", " + platforms[i].color +")<br>")
        
    }
    for(var i = 0; i < collectables.length; i++){
        //createCollectable(type, x, y, gravity, bounce)
        collectablesforExport.push("createCollectable(" + "'database'" + collectables[i].x + ", " + collectables[i].y + ", " + collectables[i].gravity + ", " + collectables[i].bounce + ")<br>")
        
    }
    alert(platformsforExport)
    alert(collectablesforExport)
}