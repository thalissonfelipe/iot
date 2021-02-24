import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo vert.png';

export default function Login() {
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
                                <form action="/" className="form-login" autoComplete="off">
                                    <input type="text" id="user" className="text-input" placeholder="Usuário"></input>
                                    <input type="password" id="password" className="text-input" placeholder="Senha"></input>
                                    <input type="submit" id="login-button" value="Entrar"></input>
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