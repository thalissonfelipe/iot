import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Card from '../Card';
import { getUsername } from '../../services/auth';

import './styles.css';

export default function Dashboard() {
    const [recipients, setRecipients] = useState([]);

    useEffect(() => {
        const username = getUsername();

        const fetchData = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/recipients?username=${username}`);
            setRecipients(data);
        }

        fetchData();
        const intervalId = setInterval(fetchData, 10000);

        return () => clearInterval(intervalId);
    }, []);
    
    return (
        recipients && (
            <div className="container dashboard d-flex">
                <h1>Monitoramento</h1>
                <div className="cards d-flex">
                    {recipients.map((recipient, i) => {
                        // TODO: Add 'no recipients crated yet' message
                        return recipient.temperature && (
                            <Card
                                key={i}
                                name={`Recipiente 0${i+1}`}
                                type={recipient.ingredientType}
                                values={[recipient.temperature, recipient.humidity, recipient.weight1, recipient.weight2, recipient.weight3]}
                                priority={recipient.priority === '0' ? 'low' : recipient.priority === '1' ? 'medium' : 'high'}
                                outline={true}
                                content={recipient.content}
                            />
                        )
                    })}
                </div>
            </div>
        )
    );
}
