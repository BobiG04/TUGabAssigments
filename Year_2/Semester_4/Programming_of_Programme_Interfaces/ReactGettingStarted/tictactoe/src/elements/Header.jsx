import React from 'react';

const Header = () => {
    const HeaderStyle = {
        color: "black",
        padding: "20px",
        fontFamily: "Century Gothic",
        textAlign: "center",
        fontSize: "56px",
        fontWeight: "bold",
        margin: "0px",
    };
    return (
        <h1 style={HeaderStyle}>Tic-Tac-Toe</h1>
    );
};

export default Header;