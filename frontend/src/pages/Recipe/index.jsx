import Header from '../../components/Header';
import FabIcon from '../../components/FabIcon';

import './styles.css';

export default function Recipe({ history: { location: { state } } }) {
    return (
        <>
            <FabIcon />
            <Header previous='/' next='/dashboard'/>
            <main className="main container d-flex">
                <header className="top-header d-flex">
                    <img src={state.image_url} alt="Food"/>
                    <h1 className="title">{state.name}</h1>
                </header>
                <div className="scrollable-div">
                    <section className="ingredients-section d-flex">
                        <h3 className="h3">Ingredientes</h3>
                        <ul className="list d-flex">
                            {
                                state.ingredients.map((ingredient, idx) => (
                                    <li key={idx} className="list-item">
                                        {ingredient}
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                    <section className="preparation-mode d-flex">
                        <h3 className="h3">Preparo</h3>
                        <ol className="list d-flex">
                            {
                                state.instructions.map((instruction, idx) => (
                                    <li key={idx} className="list-item">
                                        {instruction}
                                    </li>
                                ))
                            }
                        </ol>
                        <h3 className="finished-text">Pronto!</h3>
                    </section>
                </div>
            </main>
        </>
    );
}
