function RecipeCard({ recipe }) {

    if (!recipe) {
        return (
            <h2>Search a food to generate its recipe.</h2>
        );
    }

    return (
        <div className="recipe-card">

            <h1>{recipe.food_name}</h1>

            <p>{recipe.description}</p>

            <h3>Ingredients</h3>

            <ul>
                {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3>Instructions</h3>

            <ol>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>

        </div>
    );
}

export default RecipeCard;