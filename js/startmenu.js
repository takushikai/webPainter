function $get(str){
    return document.querySelector(str);
}

$get("#startBtn").onclick = function(){
    start();
}


$get("#roomCode").onkeydown = function(e){
    if(e.key == "Enter"){
        e.preventDefault();
        start();
    }
}


function start(){
    roomCode = $get("#roomCode").value;
    startmenu.hidden = true;
    pageframe.hidden = false;
    const slideHTML = window.open("./slide.html");
    slideHTML.onload = function(){
        $get("#slideRapper").insertAdjacentHTML("afterbegin",slideHTML.document.body.innerHTML);
        slideHTML.close();
    }

    //メディアがあるならここで再生させるべき
}