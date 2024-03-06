async function saveString() {
   
    const inputValue = lvlData;

    const response = await fetch('https://certifiedhoodclassics.org/saveString', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: document.getElementById('Title1').textContent,
            author: document.getElementById('Author1').textContent,
            value: inputValue,
            key: getCookie("uniqueKey")
        }),
    });

    const data = await response.json();

    if (data.success) {
        alert(`String saved with ID: ${data.id}`);
    } else {
        alert('Failed to save string');
    }
}

async function getStringById() {
    const inputId = 5;

    const response = await fetch(`https://certifiedhoodclassics.org/getString/${inputId}`);

    if (response.ok) {
        const data = await response.json();
        eval(data.value);
    }
}

function startUpload() {
    var canUpload = hasKey();
    if (canUpload) {
        if(document.getElementById('upttitle').value !== ""){
            getInfo()
          }        
    } else {
        makeAccount()
    }
}

async function getInfo() {
    const inputId = getCookie("uniqueKey");

    const response = await fetch(`https://certifiedhoodclassics.org/getMyInfo/${inputId}`);

    if (response.ok) {
        const data = await response.json();
        document.getElementById('Author1').textContent = data.name
        document.getElementById('Title1').textContent = settitle
        document.getElementById('Preview').style.display = "block"
    }
}

async function makeAccount() {

    var makeKey = ""+(Math.random() * 100000000000000000) +""+(Math.random() * 1000000000000000)+""+(Math.random() * 1000000000000000);

    

    publicUsername = prompt("Input a username, this CANNOT BE CHANGED");

    const response = await fetch('https://certifiedhoodclassics.org/saveKey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name:publicUsername,
            key:makeKey
        }),
    });
    


    if(response.ok){
        $.cookie("uniqueKey", makeKey,{ expires: 1200000, path: '/' })
        alert("account created.")
    }
   

}


function finishUpload(){
    saveString()
}

