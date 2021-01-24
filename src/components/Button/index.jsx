import React from 'react';

import './styles.css';

export default function Button({ type, outline }) {
    const classes = 'btn ' + (outline ? 'btn-outline ' : ' ');

    return (
        <button className={classes}>{type}</button>
    );
}