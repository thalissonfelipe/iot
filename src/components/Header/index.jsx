import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.png';

export default function Header() {
    return (
        <header className="header d-flex">
            <Link to="/"><img src={logo} alt='Recipeful' /></Link>
        </header>
    );
}