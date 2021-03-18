import axios from 'axios';
import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import FabIcon from '../../components/FabIcon';

import { isAuthenticated, getUsername } from '../../services/auth';

import './styles.css';

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSeeMoreButton, setShowSeeMoreButton] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            const usernameQuery =  isAuthenticated() ? `&username=${getUsername()}` : '';
            const url = `${process.env.REACT_APP_API_URL}/recipes?page=${currentPage}${usernameQuery}`;
            const { data } = await axios.get(url);

            if (data.length === 0) {
                setShowSeeMoreButton(false);
                return;
            } else {
                setShowSeeMoreButton(true);
            }
            setRecipes([...recipes, ...data]);
        }
        fetchRecipes();
    }, [currentPage]);

    return (
        <>
            {/* <FabIcon /> */}
            <Header previous='recipients' next='dashboard' />
            <div className="container">
                <h1>Receitas</h1>
                <div className="recipes-list">
                    {
                        recipes && recipes.map((recipe, idx) => {
                            return <RecipeCard
                                key={idx}
                                recipe={recipe}
                            />
                        })
                    }
                </div>
                {(recipes && showSeeMoreButton) && (
                    <button
                        className="see-more"
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Ver mais
                    </button>
                )}
            </div>
        </>
    );
}
