import React, { Component, useState } from 'react';
import ReactDom from 'react-dom';
import ShowCom from './Show';

const App = () => {
    return (
        <div>
            <p>First Line</p>
            <p>Second Line</p>
            <p>-----------------------------------------</p>
            <ShowCom name="溜溜"/>
            <p>-----------------------------------------</p>
        </div>
    )
};

ReactDom.render(
    <App />
    , document.getElementById('app'),
);