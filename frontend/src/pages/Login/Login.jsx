import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { login, isAuthenticated, currentUser } from '../../services/auth';

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
            setMessage({
                message: 'Todos os campos devem ser preenchidos.',
                type: 'error'
            });
            return;
        }

        const body = { username, password };

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/login`, body);
            login('logged');
            currentUser(username);
            history.push('/');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setMessage({
                        message: 'Username ou senha inválidos.',
                        type: 'error'
                    });
                } else if (error.response.status === 500) {
                    setMessage({
                        message: 'Alguma coisa deu errado. Tente novamente!',
                        type: 'error'
                    });
                }
            } else {
                setMessage({
                    message: 'Alguma coisa deu errado. Tente novamente!',
                    type: 'error'
                });
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
                                        autoComplete="off"
                                    />
                                    <input
                                        type="submit"
                                        id="login-button"
                                        value="Entrar"
                                    />
                                    { message && (
                                        <p className='flash-message flash-message-error'>
                                            {message.message}
                                        </p>
                                    )}
                                </form>
                                <Link to='/register' className="text-signup">Cadastre-se</Link>
                            </div>
                        </div>         
                    </div>
                </div>
            </div>
        </>
    );
}
