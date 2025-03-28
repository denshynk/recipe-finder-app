import axios from 'axios';

interface RecipeDetailsProps {
  title: string;
  image: string;
  instructions: string;
  ingredients: string[];
  readyInMinutes: number;
  servings: number;
  summary: string;
  error?: string;
}

const RecipeDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  let recipeDetails: RecipeDetailsProps = {
    title: '',
    image: '',
    instructions: '',
    ingredients: [],
    readyInMinutes: 0,
    servings: 0,
    summary: '',
  };

  let errorMessage: string | null = null;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
        },
      }
    );

    recipeDetails = {
      title: response.data.title,
      image: response.data.image,
      instructions: response.data.instructions,
      ingredients: response.data.extendedIngredients.map(
        (ingredient: { name: string }) => ingredient.name
      ),
      readyInMinutes: response.data.readyInMinutes,
      servings: response.data.servings,
      summary: response.data.summary,
    };
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    errorMessage = 'Failed to fetch recipe details.';
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#bef264] to-[#4d7c0f] py-8 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          {recipeDetails.title}
        </h1>
        <img
          src={recipeDetails.image}
          alt={recipeDetails.title}
          className="w-full h-72 object-cover rounded-lg shadow-md mb-6"
        />
        <div
          className="summary text-lg text-gray-600 mb-6"
          dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
        />
        <div className="flex justify-between text-lg text-gray-800 mb-6">
          <p>
            <strong>Time to prepare:</strong> {recipeDetails.readyInMinutes}{' '}
            minutes
          </p>
          <p>
            <strong>Servings:</strong> {recipeDetails.servings} servings
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ingredients
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
          {recipeDetails.ingredients.map((ingredient, index) => (
            <li key={index} className="text-lg">
              {ingredient}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Instructions
        </h3>
        <div
          className="instructions text-lg text-gray-600"
          dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}
        />
      </div>
    </div>
  );
};

export default RecipeDetails;
