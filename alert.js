var result = false;
function myAlert(type = "alert", message = "ALERT", properties = {}, htmlContent = "",callback) {
    let div = document.createElement("div");
    let backgroundDiv = document.createElement("div");
    for (let property in properties) {
        div["style"][property] = properties[property];
    }
    div.innerHTML += htmlContent;
    div.classList.add("my-alert");
    backgroundDiv.classList.add("bg-alert");
    div.innerText = message;
    document.body.appendChild(div);
    document.body.appendChild(backgroundDiv);
    backgroundDiv.style.width = "100%";
    backgroundDiv.style.height = "100vh";
    backgroundDiv.style.position="fixed";
    backgroundDiv.style.top="0";
    backgroundDiv.style.marginTop="0";
    backgroundDiv.style.marginLeft="0";
    document.body.style.margin="0";
    div.style.position="fixed";
    div.style.left="50%";
    div.style.top="20vh";
    div.style.transform ="translate(-50%,-50%)";
    div.style.zIndex = "2";
    document.querySelectorAll("body *").forEach(x=>{x.style.filter = "blur(2px)";});
    document.querySelector(".my-alert").style.filter = "blur(0px)";
    //document.querySelector(".table-container").style.filter = "blur(2px)";
    switch (type) {
        case "confirm": return makeItConfirm(div, backgroundDiv);
    }
}

function makeItConfirm(box, bg) {
    const OKBUTTON = document.createElement("button");
    const CANCELBUTTON = document.createElement("button");
    OKBUTTON.innerText = "OK";
    CANCELBUTTON.innerText = "CANCEL";
    OKBUTTON.onclick = () => { result = true; document.body.removeChild(box); document.body.removeChild(bg); makeNormal(); console.log(result) }
    CANCELBUTTON.onclick = () => { result = false; document.body.removeChild(box); document.body.removeChild(bg); makeNormal(); console.log(result) };
    box.appendChild(OKBUTTON);
    box.appendChild(CANCELBUTTON);
    return result;
}

function getResult() {
    return result;
}

function makeNormal() {
    document.querySelector("body :not(.my-alert,.bg-alert)").style.filter = "blur(0px)";
    document.querySelector(".table-container").style.filter = "blur(0px)";
}