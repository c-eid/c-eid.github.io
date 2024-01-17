var inputId = 1;
var currentCanvas = "canvas";





async function getStringById() {


    const response = await fetch(`https://certifiedhoodclassics.org/getString/${inputId}`);

    if (response.ok) {

        const data = await response.json();
        console.log(data);
        eval(data.value);
    }
}
