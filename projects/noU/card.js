var t = true
var cardsAvalible = [
    [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t],
    [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t],
    [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t],
    [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t],
    [t, t, t, t, t, t, t, t],
]
var myDeck = []
cardConstructor()

function cardConstructor() {
    //combines both functions to make a new card
    myDeck.push(displayCard(selCardFromDeck()))
    // displayCard({type:"choose", number:"🟥🟦🟩🟨",id :"Kblack" + 1, color:"Kblack"})

}
function cardDestructor() {
    $(".card").remove()
    $(".backCard").remove()
    myDeck = []

}
function selCardFromDeck(cardId = false) {
    //finds a card and constucts an object with its info. If cardId is passed, it does not make a new one but flips the old card
    let generatedCard = {}
    let cardY
    generatedCard.className = "card"
    let cardX
    let cardColor
    if (cardId) {
        generatedCard.color = cardId.replace(/[0-9]/g, '')
        cardColor = cardId.replace(/[0-9]/g, '')
        if (cardColor === "Red") {
            cardY = 0
        } else if (cardColor === "Green") {
            cardY = 1
        } else if (cardColor === "Blue") {
            cardY = 2
        } else if (cardColor === "Yellow") {
            cardY = 3
        } else if (cardColor === "Kblack") {
            cardY = 4
        }

        generatedCard.flipping = true
        cardX = cardId.replace(/\D/g, "")
        cardsAvalible[cardY][cardX] = t
    } else {
        generatedCard.flipping = false
        let calcColor = Math.ceil(Math.random() * 108)
        if (calcColor <= 25) {
            cardY = 0
            cardColor = "Red"
        } else if (calcColor <= 50) {
            cardY = 1
            cardColor = "Green"
        } else if (calcColor <= 75) {
            cardY = 2
            cardColor = "Blue"
        } else if (calcColor <= 100) {
            cardY = 3
            cardColor = "Yellow"
        } else if (calcColor <= 108) {
            cardY = 4
            cardColor = "Kblack"
        }
        cardX = Math.floor(Math.random() * cardsAvalible[cardY].length)
        generatedCard.color = cardColor

    }
    if (cardsAvalible[cardY][cardX]) {

        if (cardColor === "Kblack") {

            if (cardX <= 3) {
                generatedCard.type = "plus4"
                generatedCard.number = "+4"
                generatedCard.id = "Kblack" + cardX

            } else {
                generatedCard.type = "choose"
                generatedCard.number = "🟥🟦🟩🟨"
                generatedCard.id = "Kblack" + cardX

            }
            cardsAvalible[cardY][cardX] = false
            return generatedCard
        } else {
            if (cardX <= 9) {
                generatedCard.type = "number"
                generatedCard.number = cardX
                generatedCard.id = cardColor + "" + cardX
            } else if (cardX <= 18) {
                generatedCard.type = "number"
                generatedCard.number = cardX - 9
                generatedCard.id = cardColor + "" + cardX
            } else if (cardX <= 20) {
                generatedCard.type = "plus2"
                generatedCard.number = "+2"
                generatedCard.id = cardColor + "" + cardX

            } else if (cardX <= 22) {
                generatedCard.type = "skip"
                generatedCard.number = "Ø"
                generatedCard.id = cardColor + "" + cardX

            } else if (cardX <= 24) {
                generatedCard.type = "reverse"
                generatedCard.number = "⟲"
                generatedCard.id = cardColor + "" + cardX

            }
            cardsAvalible[cardY][cardX] = false
            console.log(cardsAvalible)

            return generatedCard
        }
    } else {
        return selCardFromDeck()
    }
}
function displayCard(cardInfo) {
    //makes an element of a card from card info. 
    if (cardInfo.flipping) {
            $("#" + cardInfo.id).addClass("na")
            $(".na").removeAttr("id").css("animation-name", "").css("animation-duration", "").css("animation-direction", "")
            $(".na").get(0).offsetWidth
            $(".na").css("animation-name", "flip").css("animation-duration", ".2s").css("animation-direction", "forward").css("animation-fill-mode", "forward")

            $("<div>").appendTo("#myCardDeck").attr("class", "card").attr("id", "" + cardInfo.id).css("animation-name", "flipPause").css("animation-duration", ".4s").css("animation-direction", "forward").css("animation-fill-mode", "forward")

    } else {
        $("<div>").appendTo("#myCardDeck").attr("class", "card").attr("id", "" + cardInfo.id)

    }

    if (cardInfo.color === "Kblack") {
        $("#" + cardInfo.id).css("background-color", "black")
    } else if (cardInfo.color === "green") {
        $("#" + cardInfo.id).css("background-color", "#00FF88")
    } else {
        $("#" + cardInfo.id).css("background-color", cardInfo.color)
    }

    if (cardInfo.color === "Kblack") {
        $("<img>").addClass("smallImg").addClass("smallNum1").appendTo("#" + cardInfo.id).attr("src", "./media/image.png")
        $("<img>").addClass("bigImg").addClass("bigNumber").appendTo("#" + cardInfo.id).attr("src", "./media/image.png")
        $("<img>").addClass("smallImg").addClass("smallNum2").appendTo("#" + cardInfo.id).attr("src", "./media/image.png")
        $("<h1>").addClass("colour2").appendTo("#" + cardInfo.id).text(cardInfo.color[0]).attr("id", "C2" + cardInfo.id).css("height", "55%")


    } else {
        $("<h1>").addClass("bigNumber").appendTo("#" + cardInfo.id).text(cardInfo.number).attr("id", "BN" + cardInfo.id)
        $("<h1>").addClass("smallNum2").appendTo("#" + cardInfo.id).text(cardInfo.number).attr("id", "S2" + cardInfo.id)
        $("<h1>").addClass("smallNum1").appendTo("#" + cardInfo.id).text(cardInfo.number).attr("id", "S1" + cardInfo.id)
        $("<h1>").addClass("colour2").appendTo("#" + cardInfo.id).text(cardInfo.color[0]).attr("id", "C2" + cardInfo.id)

    }
    $("<h1>").addClass("colour1").appendTo("#" + cardInfo.id).text(cardInfo.color[0]).attr("id", "C1" + cardInfo.id)
    setTimeout(()=>{
       $(".na").remove()

    },200)
    setTimeout(()=>{
       $("#"+cardInfo.id).css("animation-name", "").css("animation-duration", "").css("animation-direction", "").css("scale", "0.5 0.5")

    },400)
    return cardInfo
}
$(window).on("click", () => {
    cardDestructor()
    cardConstructor()
})

function flipCard($card) {
    //alert($card.id)
    //alert(JSON.stringify($card))
    var cardHolder = {
        x: $("#" + $card.id).css('left'),
        y: $("#" + $card.id).css('top'),
        width: $("#" + $card.id).css('width'),
        height: $("#" + $card.id).css('height'),
        id: $card.id
    }


        if ($card.className === "card") {
          
            $("#" + $card.id).css("animation-name", "flip").css("animation-duration", ".21s").css("animation-direction", "forward").css("animation-fill-mode", "reverse")
            setTimeout(()=>{
                $("#" + $card.id).css("display", "none").remove()
                $card.className = "noU"
                $("<div>").appendTo("#myCardDeck").addClass("backCard").attr("id", $card.id).css("top", cardHolder.y).css("left", cardHolder.x).css("scale", "0 1").css("animation-name", "flip").css("animation-duration", ".2s").css("animation-direction", "reverse").css("animation-fill-mode", "forwards")
                $("<div>").appendTo("#" + $card.id).addClass("oval").attr("id", $card.id + "oval")
                $("<h1>").appendTo(`#${$card.id}oval`).text("noU").addClass("noU")
            },200)
            return $card
           
        } else {
           // $("#" + $card.id).remove()

            return displayCard(selCardFromDeck($card.id))
        }

}

function flipDeck(deck){
    for(var i = 0; i < deck.length; i++){
        deck[i]=flipCard(deck[i])
    }
}

$('body').on("keydown", (event)=>{
    if(event.key == "h"){
        flipDeck(myDeck)
    }
})

