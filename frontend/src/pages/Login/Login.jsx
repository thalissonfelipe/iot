import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { login, isAuthenticated } from '../../services/auth';

import './styles.css';

import logo from '../../assets/logo vert.png';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const history = useHistory();

    if (isAuthenticated()) {
        history.push('/');
    }

    async function onSubmit(event) {
        event.preventDefault();
        setMessage(null);

        if (!username || !password) {
            setMessage('Todos os campos devem ser preenchidos.');
            return;
        }

        const body = { username, password };

        try {
            await axios.post('http://localhost:3001/login', body);
            login('logged');
            history.push('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Username ou senha inválidos.');
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
                    <div className="main-container d-flex">
                        <div className="main-component">
                            <div className = "logo"><img src={logo} alt="Logo vertical"/></div>
                            <div className = "login-content">
                                <h1>Login</h1>
                                <form onSubmit={onSubmit} className="form-login" autoComplete="off">
                                    <input
                                        type="text"
                                        id="user"
                                        className="text-input"
                                        placeholder="Usuário"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        id="password"
                                        className="text-input"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <input
                                        type="submit"
                                        id="login-button"
                                        value="Entrar"
                                    />
                                </form>
                                { message && <p>{message}</p> }
                                <Link to='/register' className="text-signup">Cadastre-se</Link>
                            </div>
                        </div>         
                    </div>
                </div>
            </div>
        </>
    );
}