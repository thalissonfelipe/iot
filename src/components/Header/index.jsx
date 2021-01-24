import React from 'react';

import './styles.css';

import logo from '../../assets/logo.jpeg';

export default function Header() {
    return (
        <header className="header d-flex">
            <img src={logo} alt='Recipeful' />
        </header>
    );
}