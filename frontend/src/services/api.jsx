import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const generateRecipe = async (foodName) => {
    try {
        const response = await axios.post(`${API_URL}/generate-recipe`, {
            food_name: foodName,
        });

        return response.data;
    } catch (error) {
        console.error("Error generating recipe:", error);

        throw new Error(
            error.response?.data?.detail ||
            error.message ||
            "Failed to connect to the recipe server. Please make sure the backend is running."
        );
    }
};