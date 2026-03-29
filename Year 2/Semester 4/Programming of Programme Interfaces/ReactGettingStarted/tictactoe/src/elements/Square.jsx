import { useState } from "react";

function Square({value, onButtonClick}) {

    //const [value, setValue] = useState("");

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
    return <button style={ButtonStyle} className="Square" onClick={onButtonClick}>{value}</button>

}


export default Square;