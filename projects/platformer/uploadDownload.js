var inputId = 1;
var currentCanvas = "canvas";

next();

function next() {
    ctx = document.getElementById(currentCanvas).getContext("2d");
    getStringById();
}



async function getStringById() {


    const response = await fetch(`http://localhost:3000/getString/${inputId}`);

    if (response.ok) {

        const data = await response.json();
        console.log(data);
        eval(data.value);
    }
}
