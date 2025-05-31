import React from 'react';
import ReactDOM from 'react-dom/client';
import Image from './images/grid.png';

const Header = () => {
    const HeaderStyle = {
        color: "black",
        padding: "10px",
        fontFamily: "Minecraft",
        textAlign: "center",
        fontSize: "48px"
    };
    return (
        <>
            <h1 style={HeaderStyle}>Tic-Tac-Toe</h1>
        </>
    );
}

const TTTGrid = (gridID) => {
    const gridRowName1 = "GridRow1";
    const gridRowName2 = "GridRow2";
    const gridRowName3 = "GridRow3";
    const GridImgStyle = {
        textAlign: "center"
    };
    return (
        <>
            <div style={GridImgStyle} id={gridID}>
                <img src={Image}></img>
                <div id={gridRowName1}></div>
                <div id={gridRowName2}></div>
                <div id={gridRowName3}></div>
            </div>
        </>
    );
}

const Copy = () => {
    const FooterStyle = {
        color: "black",
        padding: "10px",
        fontFamily: "Minecraft",
        textAlign: "center"
    };
    return (
        <>
            <footer>
                <p style={FooterStyle}>&copy; Bogomil Ivanov, 2025.</p>
            </footer>
        </>
    );
}

const head = ReactDOM.createRoot(document.getElementById('header'));
let main = ReactDOM.createRoot(document.getElementById('main'));
const foot = ReactDOM.createRoot(document.getElementById('footer'));
head.render(Header());
main.render(TTTGrid());
foot.render(Copy());