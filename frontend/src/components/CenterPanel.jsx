import { useState, useEffect } from "react";
import { 
    FaRobot, 
    FaClock, 
    FaFire, 
    FaUsers, 
    FaUtensils, 
    FaExclamationTriangle, 
    FaCheck, 
    FaLightbulb,
    FaAppleAlt
} from "react-icons/fa";

function CenterPanel({ recipe, loading, error }) {
    const [checkedIngredients, setCheckedIngredients] = useState({});

    // Reset checked ingredients when recipe changes
    useEffect(() => {
        setCheckedIngredients({});
    }, [recipe]);

    const toggleIngredient = (index) => {
        setCheckedIngredients(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // 1. Loading State
    if (loading) {
        return (
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                {/* Header Skeleton */}
                <div className="bg-orange-100 p-8 h-32 flex flex-col justify-between">
                    <div className="h-6 bg-orange-200 rounded w-1/3"></div>
                    <div className="h-4 bg-orange-200 rounded w-2/3"></div>
                </div>

                <div className="p-8 space-y-6">
                    {/* Cooking Tip Loader */}
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-orange-500 font-medium animate-bounce">
                            Gemini is crafting the perfect recipe...
                        </p>
                    </div>

                    {/* Meta Stats Skeleton */}
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="h-16 bg-gray-100 rounded-xl"></div>
                        ))}
                    </div>

                    {/* Details Skeleton */}
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-100 rounded w-full"></div>
                        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Error State (Network or API logic failures)
    if (error || (recipe && !recipe.success)) {
        const message = error || recipe?.message || "Something went wrong while generating the recipe.";
        return (
            <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[500px]">
                <div className="bg-red-50 p-6 rounded-full text-red-500 mb-6">
                    <FaExclamationTriangle size={60} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Oops! Generation Failed
                </h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                    {message}
                </p>
                <div className="text-sm bg-orange-50 text-orange-700 px-4 py-3 rounded-xl border border-orange-100">
                    💡 Try searching for specific food names like "Margarita Pizza", "Paneer Butter Masala", or "Banana Smoothie".
                </div>
            </div>
        );
    }

    // 3. Initial Empty State
    if (!recipe) {
        return (
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white">
                    <h2 className="text-3xl font-bold">
                        AI Generated Recipe
                    </h2>
                    <p className="mt-2 text-orange-100">
                        Search any food and Gemini will prepare a complete recipe.
                    </p>
                </div>

                <div className="h-[500px] flex flex-col justify-center items-center p-6 text-center">
                    <div className="bg-orange-50 p-6 rounded-full text-orange-500 mb-6">
                        <FaRobot size={60} className="animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                        Ready to Cook?
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-sm">
                        Enter your favorite dish on the left, and watch our AI Chef instantly cook up detailed instructions, nutrition details, and kitchen tips!
                    </p>
                </div>
            </div>
        );
    }

    // 4. Success State (Recipe display)
    const { food_name, description, prep_time, cook_time, servings, difficulty, ingredients, instructions, tips, nutrition } = recipe;

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100/50">
            {/* Header section with gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white relative">
                <div className="absolute right-4 top-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {difficulty || "Medium"}
                </div>
                <h2 className="text-3xl font-black tracking-tight mb-2">
                    {food_name}
                </h2>
                <p className="text-orange-50 text-sm leading-relaxed max-w-xl">
                    {description}
                </p>
            </div>

            <div className="p-8 space-y-8">
                {/* Meta stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-orange-50/50 border border-orange-100/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <FaClock className="text-orange-500 mb-2" size={18} />
                        <span className="text-xs text-gray-400 uppercase font-semibold">Prep Time</span>
                        <span className="text-sm font-bold text-gray-800 mt-0.5 break-words max-w-full">{prep_time || "N/A"}</span>
                    </div>
                    <div className="bg-orange-50/50 border border-orange-100/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <FaFire className="text-orange-500 mb-2" size={18} />
                        <span className="text-xs text-gray-400 uppercase font-semibold">Cook Time</span>
                        <span className="text-sm font-bold text-gray-800 mt-0.5 break-words max-w-full">{cook_time || "N/A"}</span>
                    </div>
                    <div className="bg-orange-50/50 border border-orange-100/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <FaUsers className="text-orange-500 mb-2" size={18} />
                        <span className="text-xs text-gray-400 uppercase font-semibold">Servings</span>
                        <span className="text-sm font-bold text-gray-800 mt-0.5 break-words max-w-full">{servings || "N/A"}</span>
                    </div>
                    <div className="bg-orange-50/50 border border-orange-100/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <FaUtensils className="text-orange-500 mb-2" size={18} />
                        <span className="text-xs text-gray-400 uppercase font-semibold">Difficulty</span>
                        <span className="text-sm font-bold text-gray-800 mt-0.5 capitalize break-words max-w-full">{difficulty || "Medium"}</span>
                    </div>
                </div>

                {/* Nutrition display */}
                {nutrition && (
                    <div className="bg-amber-50/30 border border-amber-100 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <FaAppleAlt className="text-amber-600" size={16} />
                            <h3 className="font-bold text-gray-800 text-base">Nutrition Per Serving</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                            <div className="bg-white rounded-xl p-3 border border-amber-100/50 shadow-sm flex flex-col justify-between min-h-[72px]">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Calories</p>
                                <p className="font-bold text-amber-700 text-sm mt-1 break-words">{nutrition.calories || "—"}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-amber-100/50 shadow-sm flex flex-col justify-between min-h-[72px]">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Protein</p>
                                <p className="font-bold text-amber-700 text-sm mt-1 break-words">{nutrition.protein || "—"}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-amber-100/50 shadow-sm flex flex-col justify-between min-h-[72px]">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Carbs</p>
                                <p className="font-bold text-amber-700 text-sm mt-1 break-words">{nutrition.carbs || "—"}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-amber-100/50 shadow-sm flex flex-col justify-between min-h-[72px]">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Fat</p>
                                <p className="font-bold text-amber-700 text-sm mt-1 break-words">{nutrition.fat || "—"}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Ingredients section */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-orange-500 text-white w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold">1</span>
                        Ingredients
                        <span className="text-xs text-gray-400 font-normal ml-2">(Tap to check off)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ingredients && ingredients.map((ingredient, idx) => (
                            <div 
                                key={idx}
                                onClick={() => toggleIngredient(idx)}
                                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                                    checkedIngredients[idx] 
                                        ? "bg-green-50 border-green-200 text-gray-400 line-through" 
                                        : "bg-gray-50/50 border-gray-100 hover:bg-gray-50 text-gray-700"
                                }`}
                            >
                                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                                    checkedIngredients[idx]
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-gray-300 bg-white"
                                }`}>
                                    {checkedIngredients[idx] && <FaCheck size={10} />}
                                </div>
                                <span className="text-sm font-medium">{ingredient}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instructions section */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-orange-500 text-white w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold">2</span>
                        Instructions
                    </h3>
                    <div className="space-y-4">
                        {instructions && instructions.map((step, idx) => (
                            <div key={idx} className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50/50 transition">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </div>
                                <div className="pt-1">
                                    <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                        {step}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tips section */}
                {tips && tips.length > 0 && (
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                        <div className="flex items-center gap-2.5 mb-3 text-orange-700 font-bold">
                            <FaLightbulb size={18} />
                            <h4 className="text-lg">Chef's Secrets</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-orange-850 leading-relaxed font-medium">
                            {tips.map((tip, idx) => (
                                <li key={idx} className="flex gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CenterPanel;