import Header from '../../components/Header';

import './styles.css';

export default function Ingredients() {
    return (
        <>
            <Header previous = '/' next='/recipients'/>
            <main className="main container d-flex">
                <header className="top-header d-flex">
                    <h1 className="title">Melhor Receita</h1>
                    <h2 className="subtitle">Lasanha de Carne Moída</h2>
                </header>
                <div className="scrollable-div">
                    <section className="ingredients-section d-flex">
                        <h3 className="h3">Ingredientes</h3>
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
                            <li className="list-item">Corte a massa da lasanha em tamanhos iguais, de preferência retângulos.</li>
                            <li className="list-item">Cozinhe em uma panela com água a carne até que fique no ponto desejado.</li>
                            <li className="list-item">Em seguida unte sua travessa e após isto, comece a colocar a massa.</li>
                            <li className="list-item">Depois da primeira camada de massa, coloque uma camada de carne moída.</li>
                            <li className="list-item">Agora uma camada de queijo e presunto, e então mais uma de massa.</li>
                            <li className="list-item">Adicione mais uma camada de carne moída, queijo e presunto e a última de massa.</li>
                            <li className="list-item">Leve ao forno até a massa ficar no ponto desejado.</li>
                            <li className="list-item">Sirva.</li>
                        </ol>
                        <h3 className="finished-text">Pronto!</h3>
                    </section>
                </div>
            </main>
        </>
    );
}
