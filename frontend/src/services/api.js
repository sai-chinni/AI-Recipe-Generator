import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const generateRecipe = async (foodName) => {
    const response = await axios.post(
        `${API_URL}/generate-recipe`,
        {
            food_name: foodName,
        }
    );

    return response.data;
};