function LoadPage(pagenumb) {
    let pageurl;
    
        switch (pagenumb) {
            case 0:
                pageurl = "./question1.html";
                break;
            case 1:
                pageurl = "./question2.html";
                break;
            case 2:
                pageurl = "./question3.html";
                break;
            default:
                break;
        }
        window.location.replace(pageurl);
}

function ResetForm() {
    document.getElementById("Form").reset();
}

function ResetTheForm() {
    window.location.replace("./index.html");
}