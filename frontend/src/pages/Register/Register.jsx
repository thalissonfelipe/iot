import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { isAuthenticated } from '../../services/auth';

import '../Register/styles.css';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState(null);
    const history = useHistory();

    if (isAuthenticated()) {
        history.push('/');
    }

    async function onSubmit(event) {
        event.preventDefault();
        setMessage(null);

        if (
            !username ||
            !email ||
            !password ||
            !repeatPassword ||
            password !== repeatPassword
        ) {
            return;
        }

        const body = {
            username,
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:3001/register', body);
            setMessage(response.data);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setMessage(error.response.data);
            }
        }
    }

    return (
        <>
            <div className="z-display">
                <div className="background-content">
                    <div className="bg-shape">
                        <div className="rectangle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
                <div className="foreground-content">
                    <form onSubmit={onSubmit} className="form-recipient">
                        <div className="main-container-register d-flex">
                            <div className="register-card">
                                <h1>Cadastro</h1>
                                <hr />
                                    <div className="form-content d-flex">
                                        <label htmlFor="username-id">Nome de Usuário</label>
                                        <input
                                            type="text"
                                            id="username-id"
                                            className="text-input-register"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                        <label htmlFor="email-id">Email</label>
                                        <input
                                            type="text"
                                            id="email-id"
                                            className="text-input-register"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label htmlFor="pwd-id">Senha</label>
                                        <input
                                            type="password"
                                            id="pwd-id"
                                            className="text-input-register"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="pwd-id2">Repetir Senha</label>
                                        <input
                                            type="password"
                                            id="pwd-id2"
                                            className="text-input-register"
                                            value={repeatPassword}
                                            onChange={e => setRepeatPassword(e.target.value)}
                                        />
                                    </div>
                            </div>
                            <div className="card-footer d-flex">
                                <input type="submit" className="submit-button-register" value="Cadastrar"></input>
                            </div>
                        </div>
                        { message && <p>{message}</p> }
                        <Link to='/login' className="text-signup">Voltar</Link>
                    </form>                  
                </div>
            </div>
        </>
    );
}