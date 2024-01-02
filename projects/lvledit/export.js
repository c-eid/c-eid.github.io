function exportlvl() {
    platbar = jQuery('#platformBar')
    platbar.css("display", "none")
    collbar = jQuery('#collectableBar')
    collbar.css("display", "none")
    cannbar = jQuery('#cannonBar')
    cannbar.css("display", "none")

    var platformsforExport = []
    var collectablesforExport = []
    var cannonsforExport = []
    var expor = document.getElementById('exported')
    for (var i = 5; i < platforms.length; i++) {

        platformsforExport.push("createPlatform(" + platforms[i].x + ", " + platforms[i].y + ", " + platforms[i].width + ", " + platforms[i].height + ", " + "'" + platforms[i].color + "'" + ");")

    }
    for (var i = 0; i < collectables.length; i++) {
        //createCollectable(type, x, y, gravity, bounce)
        collectablesforExport.push("createCollectable(" + "'database'" + "," + collectables[i].x + ", " + collectables[i].y + ", " + collectables[i].gravity + ", " + collectables[i].bounce + ");")

    }
    for (var i = 1; i < cannons.length; i++) {
        //createCannon(rot, position, positionY, delay, width, height)
        cannonsforExport.push("createCannons( '" + cannons[i].wallLocation + "'," + cannons[i].x + ", " + cannons[i].y + ", " + cannons[i].delay + ");")
    }
    expor.innerHTML = (platformsforExport.join("<br>") + "<br>" + collectablesforExport.join("<br>") + "<br>" + cannonsforExport.join("<br>"))
    lvldata = (platformsforExport + collectablesforExport + cannonsforExport)





    
}