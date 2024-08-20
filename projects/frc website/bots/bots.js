
var parallax = document.getElementById("all-contents"),
  speed = -0.07;

parallax.onscroll = function () {
    let elBackgrounPos = (parallax.scrollTop * speed) + "px";
    parallax.style.backgroundPositionY = elBackgrounPos;
};
