import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/style.css';

import logo from '../assets/react_logo.png';

export default class Hello extends Component {
    render() {
        return (
            <div>
                React Boilerplate
                <img src={logo} alt='React logo' />
            </div>
        )
    }
}

render(<Hello />, document.getElementById('app'));