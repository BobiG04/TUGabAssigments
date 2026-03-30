import React from 'react';
import ReactDOM from 'react-dom/client';

const myFirstElement = <h1>Hello React!</h1>
const Header1 = <h2 id="demo">This text is red.</h2>
const Button = <button id="btn">Make H2 Red!</button>
const Element2 = <h1>React is {5 + 5} times better with JSX</h1>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(Button);
root.render(Header1);
root.render(Element2);

// Classes
class Car {
    constructor(carName) {
        this.brand = carName;
    }

    present() {
        return 'I have a ' + this.brand;
    }
}

const myCar = new Car("Ford");
myCar.present();

// Arrow Functions
/*hello = function() {
    return "Hello World!";
}

hello1 = () => {
    return "Hello World! Arrow function."
}

hello2 = () => "Hello World! Same function, even shorter writing.";

hello3 = val => "Hello " + val;*/

// This keyword

/*class Header {
    constructor() {
        this.color = "Red";
    }

    changeColor = () => {
        document.getElementById("demo").innerHTML += this;
    }
}

const myHeader = new Header();

window.addEventListener("load", myHeader.changeColor);

document.getElementById("btn").addEventListener("click", myHeader.changeColor);*/