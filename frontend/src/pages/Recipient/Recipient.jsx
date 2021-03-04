import axios from 'axios';
import { useState } from 'react';

import Header from '../../components/Header';
import { getUsername } from '../../services/auth';

import './styles.css';
import imgProto from '../../assets/prototipo-recipiente.png'

export default function Recipient() {
    const [recipientId, setRecipientId] = useState('');
    const [ingredientType, setIngredientType] = useState('Carnes');
    const [content, setContent] = useState({
        a: '',
        b: '',
        c: ''
    });
    const [message, setMessage] = useState(null);

    function clearFields() {
        setRecipientId('');
        setIngredientType('Carnes');
        setContent({
            a: '',
            b: '',
            c: ''
        });
    }

    const onSubmit = async e => {
        e.preventDefault();
        setMessage(null);

        if (!recipientId || !ingredientType || !content.a || !content.b || !content.c) {
            setMessage({
                message: 'Todos os campos devem ser preenchidos.',
                type: 'error'
            });
            return;
        }

        const body = {
            recipientId,
            ingredientType,
            content,
            username: getUsername()
        };

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/recipients`, body);
        if (response.status === 201) {
            clearFields();
            setMessage({
                message: 'Novo recipiente criado.',
                type: 'success'
            });
        } else if (response.status === 500) {
            setMessage({
                message: 'Alguma coisa deu errado. Tente novamente!',
                type: 'error'
            });
        }
    }

    return (
        <>
            <Header previous='/ingredients' next='/'/>
            <div className="container recipient d-flex">
                <h1>Cadastrar Recipiente</h1>
                <div className="forms d-flex">
                    <form onSubmit={onSubmit} className="form-recipient">
                        <div className="content-divider">
                            <div className="proto-image">
                                <img src={imgProto} alt='Humidity' id="proto-icon" />
                            </div>
                            <div className="form-content d-flex">
                                <label htmlFor="validation-id">ID do recipiente</label>
                                <input
                                    type="text"
                                    id="validation-id"
                                    value={recipientId}
                                    onChange={e => setRecipientId(e.target.value)}
                                />
                                <label htmlFor="ingredient-types">Tipo de Ingrediente</label>
                                <select
                                    name="Tipos"
                                    id="ingredient-types"
                                    value={ingredientType}
                                    onChange={e => setIngredientType(e.target.value)}
                                >
                                    <option value="Carnes">Carnes</option>
                                    <option value="Frios">Frios</option>
                                    <option value="Verduras">Verduras</option>
                                    <option value="Frutas">Frutas</option>
                                    <option value="Legumes">Legumes</option>
                                    <option value="Temperos">Temperos</option>
                                    <option value="Outros">Outros</option>
                                </select>
                                <label htmlFor="slot-content" className="content-text">Conteúdo</label>
                                <div className="slot-content">
                                    <svg className="slot-tag" width="22" height="22">
                                        <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                                        <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">A</text>
                                    </svg>
                                    <input
                                        type="text"
                                        value={content.a}
                                        onChange={e => setContent({...content, a: e.target.value })}
                                    />
                                </div>
                                <div className="slot-content">
                                    <svg className="slot-tag" width="22" height="22">
                                        <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                                        <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">B</text>
                                    </svg>
                                    <input
                                        type="text"
                                        value={content.b}
                                        onChange={e => setContent({...content, b: e.target.value })}
                                    />
                                </div>
                                <div className="slot-content">
                                    <svg className="slot-tag" width="22" height="22">
                                        <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                                        <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">C</text>
                                    </svg>
                                    <input
                                        type="text"
                                        value={content.c}
                                        onChange={e => setContent({...content, c: e.target.value })}
                                    />
                                </div>
                                {message && <p className={`flash-message flash-message-${message.type}`}>
                                    {message.message}
                                </p>}
                            </div>
                        </div>
                        <div className="card-footer d-flex">
                            <button type="Submit" className="submit-button">Cadastrar</button>
                        </div>
                    </form>
                </div>   
            </div> 
        </>
    );
}
