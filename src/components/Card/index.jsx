import React from 'react';

import Button from '../Button';

import './styles.css';

import tempIcon from '../../assets/temp-icon.png';
import humIcon from '../../assets/hum-icon.png';

export default function Card({ name, type, values, priority, outline }) {
    const _priority = {
        'low': 'Baixa',
        'medium': 'Média',
        'high': 'Alta'
    };

    return (
        <div className="card d-flex">
            <div className="card-content d-flex">
                <h2>{name}</h2>
                <Button type={type} outline={outline} />
                <div className="sensor-values d-flex">
                    <div className="sensor-value d-flex">
                        <img src={tempIcon} alt='Temperature' />
                        <span>{values[0]}ºC</span>
                    </div>
                    <div className="sensor-value d-flex">
                        <img src={humIcon} alt='Humidity' />
                        <span>{values[1]}%</span>
                    </div>
                </div>
            </div>
            <div className={'card-footer d-flex ' + 'bg-' + priority}>
                <span>Prioridade</span>
                <h3>{_priority[priority]}</h3>
            </div>
        </div>
    );
}