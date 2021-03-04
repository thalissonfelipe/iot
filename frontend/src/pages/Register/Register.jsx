import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
            !repeatPassword
        ) {
            setMessage({
                message: 'Todos os campos devem ser preenchidos.',
                type: 'error'
            });
            return;
        }

        if (password !== repeatPassword) {
            setMessage({
                message: 'Senhas diferentes.',
                type: 'error'
            });
            return;
        }

        const body = {
            username,
            email,
            password
        };

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/register`, body);
            setMessage({
                message: 'Novo usuário criado.',
                type: 'success'
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setMessage({
                        message: 'Username/email já cadastrado.',
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
                                            autoComplete="off"
                                        />
                                        <label htmlFor="pwd-id2">Repetir Senha</label>
                                        <input
                                            type="password"
                                            id="pwd-id2"
                                            className="text-input-register"
                                            value={repeatPassword}
                                            onChange={e => setRepeatPassword(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>
                            </div>
                            <div className="card-footer d-flex">
                                <input type="submit" className="submit-button-register" value="Cadastrar"></input>
                            </div>
                            {message && <p className={`flash-message flash-message-${message.type}`}>
                                {message.message}
                            </p>}
                        </div>
                        <Link to='/login' className="text-signup">Voltar</Link>
                    </form>                  
                </div>
            </div>
        </>
    );
}