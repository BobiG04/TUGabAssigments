import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './elements/Header.jsx';
import Footer from './elements/Footer.jsx';
import TTTGrid from './elements/TTTGrid.jsx';
import GridSquare from './elements/GridSquare.jsx';

const head = ReactDOM.createRoot(document.getElementById('header'));
let main = ReactDOM.createRoot(document.getElementById('main'));
const foot = ReactDOM.createRoot(document.getElementById('footer'));

head.render(<Header/>);
main.render(<TTTGrid gridID="gridImg"/>);
foot.render(<Footer/>);