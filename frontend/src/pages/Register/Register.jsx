import React from 'react';
import { Link } from 'react-router-dom';

import '../Register/styles.css';

//import logo from '../../assets/logo.png';

export default function Register() {
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
                    <form action="post" class="form-recipient">
                        <div className="main-container-register d-flex">
                            <div className="register-card">
                                <h1>Cadastro</h1>
                                <hr />
                                    <div className="form-content d-flex">
                                        <label for="username-id">Nome de Usuário</label>
                                        <input type="text" id="username-id" className="text-input-register"></input>
                                        <label for="email-id">Email</label>
                                        <input type="text" id="email-id" className="text-input-register"></input>
                                        <label for="pwd-id">Senha</label>
                                        <input type="password" id="pwd-id" className="text-input-register"></input>
                                        <label for="pwd-id">Repetir Senha</label>
                                        <input type="password" id="pwd-id" className="text-input-register"></input>
                                    </div>
                            </div>
                            <div class="card-footer d-flex">
                                <input type="Submit" class="submit-button-register" value="Cadastrar"></input>
                            </div>
                        </div>
                        <Link to='/login' className="text-signup">Voltar</Link>
                    </form>                  
                </div>
            </div>
        </>
    );
}