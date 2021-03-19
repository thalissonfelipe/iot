import { useHistory } from 'react-router-dom';

import { isAuthenticated } from '../../services/auth';

import './styles.css';

export default function RecipeCard({ recipe }) {
    const history = useHistory();

    function handleOnClick() {
        history.push({
            pathname: `/recipes/${recipe.name.replace(' ', '-')}`,
            state: recipe
        });
    }

    return (
        <div className="recipe-card" onClick={handleOnClick}>
            <img src={recipe.image_url + "?w=200"} alt="Food" />
            <div className="recipe-info">
                <h2 title={recipe.name}>{recipe.name}</h2>
                {(isAuthenticated() && recipe.total) ? <span>{recipe.score} de {recipe.total} ingredientes</span> : ''}
            </div>
        </div>
    );
}
