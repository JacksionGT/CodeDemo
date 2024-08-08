import React, { Component } from 'react';
import ReactDom from 'react-dom';

const App = () => {

    console.log('=====================');

    return (
        <div>
            <p>First Line</p>
            <p>Second Line</p>
        </div>
    )
};

ReactDom.render(
    <App />
    , document.getElementById('app'),
);