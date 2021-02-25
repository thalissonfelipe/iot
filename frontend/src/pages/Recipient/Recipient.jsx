import { useState } from 'react';
import axios from 'axios';

import Header from '../../components/Header';

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

    const onSubmit = async e => {
        e.preventDefault();

        if (!recipientId || !ingredientType || !content.a || !content.b || !content.c) {
            alert('Preencha todos os campos!'); // TODO: improve feedback to the user
            return
        }

        const body = { recipientId, ingredientType, content };

        const response = await axios.post('http://localhost:3001/recipients', body);
        if (response.status === 201) {
            alert(response.data);
            // reset fields
            setRecipientId('');
            setIngredientType('Carnes');
            setContent({
                a: '',
                b: '',
                c: ''
            });
        } else if (response.status === 500) {
            alert('Internal Error!');
        }
    }

    return (
        <>
            <Header previous = '/ingredients' next='/'/>
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
