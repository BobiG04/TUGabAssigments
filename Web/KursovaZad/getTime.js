function GetTime () {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("time").innerHTML = getCurrentTime().GetTime;
    }

    xhttp.open("GET", "http://kst.tugab.bg/pis/gettimejson.php");
    xhttp.send();

    console.log("Hello!");

}