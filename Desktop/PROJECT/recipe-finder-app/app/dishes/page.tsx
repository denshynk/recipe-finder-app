import axios from 'axios';

interface Dish {
  id: number;
  title: string;
  image: string;
}

const Dishes = async ({
  searchParams,
}: {
  searchParams: { query: string; cuisine: string; maxReadyTime: string };
}) => {
  // Use the 'use' to await searchParams (nextjs feature)
  const { query, cuisine, maxReadyTime } = await searchParams;

  let dishes: Dish[] = [];
  let errorMessage: string | null = null;

  try {
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch',
      {
        params: {
          apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
          query,
          cuisine,
          maxReadyTime,
        },
      }
    );
    dishes = response.data.results;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    errorMessage = 'Failed to fetch recipes.';
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (dishes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#d7f8e0] to-[#4d7c0f] py-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8">
          Discover Delicious Recipes
        </h1>
        <p className="text-4xl text-center text-gray-700">
          Unfortunately, we could not find any recipes matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#d7f8e0] to-[#4d7c0f] py-8 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8">
        Discover Delicious Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="flex flex-col border border-gray-300 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 p-4"
          >
            <div className="relative mb-4">
              <img
                src={dish.image}
                alt={dish.title}
                className="w-full h-56 object-cover rounded-lg shadow-md transition duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {dish.title}
            </h3>
            <a
              href={`/dishes/${dish.id}`}
              className="text-blue-600 hover:text-blue-800 transition duration-300 flex flex-1 items-end"
            >
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
