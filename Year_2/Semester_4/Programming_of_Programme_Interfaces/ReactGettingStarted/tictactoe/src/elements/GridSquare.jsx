import React, { useState } from 'react';
import Square from './Square.jsx';

export default function GridSquare() {

    // make component to choose who starts.
    const [isX, setXState] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const winner = CalWinner(squares);
    let gameStatus;

    if (winner)
        gameStatus = "Winner: " + winner;
    /*else if (!winner)
        gameStatus = "Nobody won. Refresh."; */
    else
        gameStatus = "Next player: " + (isX? "X" : "O");

    function ButHandle(i) {
        if (squares[i] || CalWinner(squares))
            return;

        const nextButtons = squares.slice();
        nextButtons[i] = "X";

        if (isX) {
            nextButtons[i] = "X";
        } else {
            nextButtons[i] = "O";
        }

        setSquares(nextButtons);
        setXState(!isX);
    }

    const RowStyle = {
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
    };

    const StatusStyle = {
        textAlign: "center",
        fontFamily: "Century Gothic",
        fontSize: "36px"
    };

    return (
        <>

            <div className='Status' style={StatusStyle}>{gameStatus}</div>
            <div style={RowStyle} className='Row'>
                <Square value={squares[0]} onButtonClick={() => ButHandle(0)} />
                <Square value={squares[1]} onButtonClick={() => ButHandle(1)} />
                <Square value={squares[2]} onButtonClick={() => ButHandle(2)} />
            </div>
            <div style={RowStyle} className='Row'>
                <Square value={squares[3]} onButtonClick={() => ButHandle(3)} />
                <Square value={squares[4]} onButtonClick={() => ButHandle(4)} />
                <Square value={squares[5]} onButtonClick={() => ButHandle(5)} />
            </div>
            <div style={RowStyle} className='Row'>
                <Square value={squares[6]} onButtonClick={() => ButHandle(6)} />
                <Square value={squares[7]} onButtonClick={() => ButHandle(7)} />
                <Square value={squares[8]} onButtonClick={() => ButHandle(8)} />
            </div>

        </>
    );

};

function CalWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a];
    }
    return null;
}