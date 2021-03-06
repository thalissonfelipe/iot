import React from 'react';

import Button from '../Button';

import './styles.css';
import humIcon from '../../assets/hum-icon.png';
import tempIcon from '../../assets/temp-icon.png';

export default function Card({ name, type, values, priority, outline, content }) {
    const _priority = {
        'low': 'Baixa',
        'medium': 'Média',
        'high': 'Alta',
        'default': 'Sem informação'
    };

    return (
        <div className="card d-flex">
            <div className="card-content d-flex">
                <h2>{name}</h2>
                <Button type={type} outline={outline} />
                <div className="sensor-values d-flex">
                    <div className="sensor-value d-flex">
                        <img src={tempIcon} alt='Temperature' id="card-icon-temp"/>
                        <span>{values[0] && values[0].toFixed(1)}ºC</span>
                    </div>
                    <div className="sensor-value d-flex">
                        <img src={humIcon} alt='Humidity' id="card-icon-hum"/>
                        <span>{values[1] && values[1].toFixed(0)}%</span>
                    </div>
                </div>
                <div className="slot-details">
                    <div className="slot-container">
                        <svg className="slot-tag" width="22" height="22">
                            <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                            <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">A</text>
                        </svg>
                        <span className="slot-qtd">{values[2] && values[2].toFixed(0)}g</span><p className="slot-text"> de </p><span className="slot-ing">{content.a}</span>
                    </div>
                    <div className="slot-container">
                        <svg className="slot-tag" width="22" height="22">
                            <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                            <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">B</text>
                        </svg>
                        <span className="slot-qtd">{values[3] && values[3].toFixed(0)}g</span><p className="slot-text"> de </p><span className="slot-ing">{content.b}</span>
                    </div>
                    <div className="slot-container">
                        <svg className="slot-tag" width="22" height="22">
                            <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                            <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">C</text>
                        </svg>
                        <span className="slot-qtd">{values[4] && values[4].toFixed(0)}g</span><p className="slot-text"> de </p><span className="slot-ing">{content.c}</span>
                    </div>
                </div>
            </div>
            <div className={'card-footer d-flex bg-' + priority}>
                <span>Prioridade</span>
                <h3>{_priority[priority]}</h3>
            </div>
        </div>
    );
}
