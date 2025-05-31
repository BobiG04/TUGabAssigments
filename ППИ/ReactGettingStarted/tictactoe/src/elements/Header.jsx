import React from 'react';

const Header = () => {
    const HeaderStyle = {
        color: "black",
        padding: "10px",
        fontFamily: "Minecraft",
        textAlign: "center",
        fontSize: "48px"
    };
    return (
        <h1 style={HeaderStyle}>Tic-Tac-Toe</h1>
    );
};

export default Header;