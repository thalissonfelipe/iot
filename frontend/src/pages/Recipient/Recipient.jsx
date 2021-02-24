import Header from '../../components/Header';

import './styles.css';

import imgProto from '../../assets/prototipo-recipiente.png'

export default function Recipient() {
    return (
        <>
            <Header previous = '/ingredients' next='/'/>
            <div className="container recipient d-flex">
                <h1>Cadastrar Recipiente</h1>
                <div className="forms d-flex">
                    <form action="post" className="form-recipient">
                        <div className="content-divider">
                            <div className="proto-image">
                                <img src={imgProto} alt='Humidity' id="proto-icon" />
                            </div>
                            <div className="form-content d-flex">
                                <label for="validation-id">ID do recipiente</label>
                                <input type="text" id="validation-id"></input>
                                <label for="ingredient-types">Tipo de Ingrediente</label>
                                <select name="Tipos" id="ingredient-types">
                                    <option value="Carnes" selected>Carnes</option>
                                    <option value="Frios">Frios</option>
                                    <option value="Verduras">Verduras</option>
                                    <option value="Frutas">Frutas</option>
                                    <option value="Legumes">Legumes</option>
                                    <option value="Temperos">Temperos</option>
                                    <option value="Outros">Outros</option>
                                </select>
                                <label for="slot-content" className="content-text">Conteúdo</label>
                                <div className="slot-content">
                                    <svg className="slot-tag" width="22" height="22">
                                        <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                                        <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">A</text>
                                    </svg>
                                    <input type="text" id="content"></input>
                                </div>
                                <div className="slot-content">
                                    <svg className="slot-tag" width="22" height="22">
                                        <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                                        <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">B</text>
                                    </svg>
                                    <input type="text" id="content"></input>
                                </div>
                                <div className="slot-content">
                                    <svg className="slot-tag" width="22" height="22">
                                        <circle cx="11" cy="11" r="10" stroke="black" strokeWidth="1" fill="none"/>
                                        <text x="50%" y="50%" fontSize="1rem" fontWeight="700" textAnchor="middle" fill="black" dy=".3em">C</text>
                                    </svg>
                                    <input type="text" id="content"></input>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer d-flex">
                            <input type="Submit" className="submit-button" value="Cadastrar"></input>
                        </div>
                    </form>
                </div>   
            </div> 
        </>
    );
}
