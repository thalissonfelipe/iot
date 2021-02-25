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

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);

        return () => clearInterval(intervalId);
    }, []);
    
    return (
        recipients && (
            <div className="container dashboard d-flex">
                <h1>Monitoramento</h1>
                <div className="cards d-flex">
                    {recipients.map((recipient, i) => (
                        <Card
                            key={i}
                            name={`Recipiente 0${i+1}`}
                            type={recipient.ingredientType}
                            values={[recipient.temperature, recipient.humidity, recipient.weight1, recipient.weight2, recipient.weight3]}
                            priority={recipient.priority == 0 ? 'low' : recipient.priority == 1 ? 'medium' : 'high'}
                            outline={true}
                            content={recipient.content}
                        />
                    ))}
                </div>
            </div>
        )
    );
}
