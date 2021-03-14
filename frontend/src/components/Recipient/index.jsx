import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';

import { getUsername } from '../../services/auth';

import './styles.css';
import imgProto from '../../assets/prototipo-recipiente.png'

export default function Recipient({ title, type }) {
    const [recipients, setRecipients] = useState([]);
    const [recipient, setRecipient] = useState(null);
    const [recipientId, setRecipientId] = useState('');
    const [ingredientType, setIngredientType] = useState('Carnes');
    const [content, setContent] = useState({
        a: '',
        b: '',
        c: ''
    });
    const [message, setMessage] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const options = (
        <>
            <option value="Carnes">Carnes</option>
            <option value="Frios">Frios</option>
            <option value="Verduras">Verduras</option>
            <option value="Frutas">Frutas</option>
            <option value="Legumes">Legumes</option>
            <option value="Temperos">Temperos</option>
            <option value="Outros">Outros</option>
        </>
    );

    function clearFields() {
        setRecipientId('');
        setIngredientType('Carnes');
        setContent({
            a: '',
            b: '',
            c: ''
        });
    }

    async function createRecipient() {
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

    async function editRecipient() {
        if (!recipient.ingredientType || !recipient.content.a || !recipient.content.b || !recipient.content.c) {
            setMessage({
                message: 'Todos os campos devem ser preenchidos.',
                type: 'error'
            });
            return;
        }

        const body = {
            ingredientType: recipient.ingredientType,
            content: recipient.content
        };

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/recipients/${recipientId}`, body);
            setMessage({
                message: 'Recipiente atualizado.',
                type: 'success'
            });
        } catch (error) {
            setMessage({
                message: 'Alguma coisa deu errado. Tente novamente!',
                type: 'error'
            });
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        setMessage(null);

        if (type === 'edit') {
            editRecipient();
        } else {
            createRecipient();
        }
    }

    useEffect(() => {
        if (type === 'edit') {
            const fetchData = async () => {
                const username = getUsername();
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/recipients?username=${username}`);
                setRecipients(data);
            }

            fetchData();
        }
    }, []);

    function handleSearchButton() {
        const recipientExists = recipients.find(recipient => recipient.recipientId === recipientId);
        if (!recipientId || !recipientExists) return;
        setRecipient(recipientExists);
        setShowForm(!showForm);
    }

    return (
        <div className="container recipient d-flex">
            <h1>{title}</h1>
            { type === 'edit' && (
                <div className="search-recipient">
                    <input
                        type="text"
                        value={recipientId}
                        placeholder="Digite o ID do recipiente"
                        onChange={e => setRecipientId(e.target.value)}
                        list="recipients-list"
                    />
                    <datalist id="recipients-list">
                        {recipients.map(recipient => (
                            <option key={recipient.recipientId} value={recipient.recipientId} />
                        ))}
                    </datalist>
                    <button onClick={handleSearchButton}>
                        <FaSearch size={16} />
                    </button>
                </div>
            ) }
            {(type === 'create' || (type === 'edit' && showForm)) && <div className="forms d-flex">
                <form onSubmit={onSubmit} className="form-recipient">
                    <div className="content-divider">
                        <div className="proto-image">
                            <img src={imgProto} alt='Humidity' id="proto-icon" />
                        </div>
                        <div className="form-content d-flex">
                            <label htmlFor="validation-id">ID do recipiente</label>
                            {recipient ? (
                                <input
                                    type="text"
                                    id="validation-id"
                                    disabled
                                    value={recipient.recipientId}
                                />
                            ) : (
                                <input
                                    type="text"
                                    id="validation-id"
                                    value={recipientId}
                                    onChange={e => setRecipientId(e.target.value)}
                                />
                            )}
                            <label htmlFor="ingredient-types">Tipo de Ingrediente</label>
                            {recipient ? (
                                <select
                                    name="Tipos"
                                    id="ingredient-types"
                                    value={recipient.ingredientType}
                                    onChange={e => setRecipient({ ...recipient, ingredientType: e.target.value })}
                                >
                                    {options}
                                </select>
                            ) : (
                                <select
                                    name="Tipos"
                                    id="ingredient-types"
                                    value={ingredientType}
                                    onChange={e => setIngredientType(e.target.value)}
                                >
                                    {options}
                                </select>
                            )}
                            <label htmlFor="slot-content" className="content-text">Conteúdo</label>
                            <div className="slot-content">
                                <svg className="slot-tag" width="22" height="22">
                                    <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                                    <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">A</text>
                                </svg>
                                {recipient ? (
                                    <input
                                        type="text"
                                        value={recipient.content.a}
                                        onChange={e => setRecipient({
                                            ...recipient,
                                            content: { ...recipient.content, a: e.target.value }
                                        })}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={content.a}
                                        onChange={e => setContent({ ...content, a: e.target.value })}
                                    />
                                )}
                            </div>
                            <div className="slot-content">
                                <svg className="slot-tag" width="22" height="22">
                                    <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                                    <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">B</text>
                                </svg>
                                {recipient ? (
                                    <input
                                        type="text"
                                        value={recipient.content.b}
                                        onChange={e => setRecipient({
                                            ...recipient,
                                            content: { ...recipient.content, b: e.target.value }
                                        })}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={content.b}
                                        onChange={e => setContent({ ...content, b: e.target.value })}
                                    />
                                )}
                            </div>
                            <div className="slot-content">
                                <svg className="slot-tag" width="22" height="22">
                                    <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                                    <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">C</text>
                                </svg>
                                {recipient ? (
                                    <input
                                        type="text"
                                        value={recipient.content.c}
                                        onChange={e => setRecipient({
                                            ...recipient,
                                            content: { ...recipient.content, c: e.target.value }
                                        })}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={content.c}
                                        onChange={e => setContent({ ...content, c: e.target.value })}
                                    />
                                )}
                            </div>
                            {message && <p className={`flash-message flash-message-${message.type}`}>
                                {message.message}
                            </p>}
                        </div>
                    </div>
                    <div className="card-footer d-flex">
                        <button type="Submit" className="submit-button">
                            {type === 'edit' ? 'Editar' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>}
        </div>
    );
}
