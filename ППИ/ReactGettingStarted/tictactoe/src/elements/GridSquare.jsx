import React from 'react';

let val = "";
let isX = true;

const GridSquare = () => {

    const ButtonStyle = {
        width: "80px",
        height: "80px",
        fontSize: "60px",
        margin: "40px",
        border: "none",
        background: "none",
        fontFamily: "Century Gothic",
        fontWeight: "bold",
        zIndex: "1",
        positon: "relative"
    };
    return (
        <button style={ButtonStyle} className="Square" id="Square" onClick={OnButClick}>{val}</button>
    );

};

function OnButClick() {

    if (isX == true && document.getElementById("Square")) {
        // X e na hod.
        console.log("Button Clicked! " + isX + val);
        isX = false;
        val = "X";
        document.getElementById("Square").value = "X";
    } else if (isX == false && document.getElementById("Square")) {
        // O e na hod.
        console.log("Button Clicked! " + isX + val);
        isX = true;
        val = "O";
    }
    //console.log("Button Clicked!");
}

export default GridSquare;