import React from 'react';

import './styles.css';

export default function Button({ type, outline }) {
    const _ing = {
        'Carnes': 'meat',
        'Verduras': 'veg',
        'Frutas': 'fruit',
        'Frios': 'fruit'
    };
    
    const classes = 'btn-' + _ing[type] + (outline ? '-outline ' : ' ');

    return (
        <button className={classes}>{type}</button>
    );
}