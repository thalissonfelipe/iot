import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../Card';

import './styles.css';

export default function Dashboard() {
    const [recipients, setRecipients] = useState([]);

    const fetchData = async () => {
        const { data } = await axios.get('http://localhost:3001/recipients');
        setRecipients(data);
    }

    // fetchData();

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);

        return () => clearInterval(intervalId);
    }, []);
    
    return (
        <div className="container dashboard d-flex">
            <h1>Monitoramento</h1>
            <div className="cards d-flex">
                {recipients && recipients.map((recipient, i) => (
                    <Card
                        key={i}
                        name={`Recipiente 0${i+1}`}
                        type='Carnes'
                        values={[recipient.temperature, recipient.humidity]}
                        priority='low' outline={true} contains={['Alcatra', 'Patinho', 'Maminha']}
                    />
                ))}
                {/* <Card name='Recipiente 01' type='Carnes' values={[-2, 50]} priority='low' outline={true} contains={['Alcatra', 'Patinho', 'Maminha']}/>
                <Card name='Recipiente 02' type='Verduras' values={[8, 60]} priority='high' outline={true} contains={['Alface', 'Brocolis', 'Coentro']}/>
                <Card name='Recipiente 03' type='Frutas' values={[9, 80]} priority='medium' outline={true} contains={['Abacate', 'Banana', 'Cajarana']}/> */}
            </div>
        </div>
    );
}