import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.png';
import leftarrow from '../../assets/arrow left.png';
import rightarrow from '../../assets/arrow right.png';

export default function Header({ previous, next }) {
    return (
        <header className="header d-flex">
            <Link to={previous}><img src={leftarrow} className='arrow' alt='previous' /></Link>
            <Link to="/"><img src={logo} alt='Recipeful' /></Link>
            <Link to={next}><img src={rightarrow} className='arrow' alt='next' /></Link>
        </header>
    );
}