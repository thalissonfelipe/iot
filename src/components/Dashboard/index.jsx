import React from 'react';

import Card from '../Card';

import './styles.css';

export default function Dashboard() {
    return (
        <div className="container dashboard d-flex">
            <h1>Monitoramento</h1>
            <div className="cards d-flex">
                <Card name='Recipiente 01' type='Carnes' values={[-2, 50]} priority='low' outline={true} contains={['Alcatra', 'Patinho', 'Maminha']}/>
                <Card name='Recipiente 02' type='Verduras' values={[8, 60]} priority='high' outline={false} contains={['Alface', 'Brocolis', 'Coentro']}/>
                <Card name='Recipiente 03' type='Frutas' values={[9, 80]} priority='medium' outline={true} contains={['Abacate', 'Banana', 'Cajarana']}/>
            </div>
        </div>
    );
}