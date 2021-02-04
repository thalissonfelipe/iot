import Header from '../../components/Header';

import heroImg from '../../assets/ingredient-hero-header.svg';

import './styles.css';

export default function Ingredients() {
    return (
        <>
            <Header />
            <main className="main container d-flex">
                <header className="top-header d-flex">
                    <h1 className="title">Melhor Receita</h1>
                    <h2 className="subtitle">Lasanha de Carne Moída</h2>
                </header>
                <section className="ingredients-section d-flex">
                    <h3 className="h3">Ingredients</h3>
                    <ul className="list d-flex">
                        <li className="list-item">1kg de carne moída</li>
                        <li className="list-item">700g de massa</li>
                        <li className="list-item">500g de presunto</li>
                        <li className="list-item">600g de queijo</li>
                        <li className="list-item">Sal e pimenta</li>
                    </ul>
                </section>
                <section className="preparation-mode d-flex">
                    <h3 className="h3">Preparo</h3>
                    <ol className="list d-flex">
                        <li className="list-item">Tempere a carne moída com sal e pimenta a gosto e reserve.</li>
                        <li className="list-item">Cozinhe em uma penela com água a carne até que fique no ponto desejado.</li>
                    </ol>
                </section>
            </main>
        </>
    );
}
