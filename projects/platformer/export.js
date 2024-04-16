function exportlvl() {
    //exports the level made in the level editor, 
    placetype = "output"
    document.getElementById('dropdown').value = placetype
    placeTypeChange()

    var platformsforExport = []
    var collectablesforExport = []
    var cannonsforExport = []
    var expor = document.getElementById('exported')
    for (var i = 0; i < platforms.length; i++) {

        platformsforExport.push("createPlatform(" + platforms[i].x + ", " + platforms[i].y + ", " + platforms[i].width + ", " + platforms[i].height + ", " + "'" + platforms[i].color + "'" + ", " + platforms[i].isStatic + ", " + platforms[i].kills + ", " + platforms[i].collides + ");")

    }
    for (var i = 0; i < collectables.length; i++) {
        //createCollectable(type, x, y, gravity, bounce)
        collectablesforExport.push("createCollectable(" + "'database'" + "," + collectables[i].x + ", " + collectables[i].y + ", " + collectables[i].gravity + ", " + collectables[i].bounce + ");")

    }
    for (var i = 1; i < cannons.length; i++) {
        //createCannon(rot, position, positionY, delay, width, height)
        cannonsforExport.push("createCannon( '" + cannons[i].wallLocation + "'," + cannons[i].x + ", " + cannons[i].y + ", " + cannons[i].delay + ");")
    }
    expor.value = (platformsforExport.join("\n") + "\n" + collectablesforExport.join("\n") + "\n" + cannonsforExport.join("\n"))
    lvlData = (platformsforExport.join(" ") + " " + collectablesforExport.join(" ") + " " + cannonsforExport.join(" "))
    console.log(lvlData)

   
  
}
function startImport(){
    //inports the level into the import section
    platforms = []
    collectables = []
    cannons = []
    eval(document.getElementById("imported").value)
    
}