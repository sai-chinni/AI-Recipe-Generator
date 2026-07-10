import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import LeftPanel from "../components/LeftPanel";
import CenterPanel from "../components/CenterPanel";
import RightPanel from "../components/RightPanel";
import { generateRecipe } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState(() => {
        const savedHistory = localStorage.getItem("recipe_search_history");
        if (savedHistory) {
            try {
                return JSON.parse(savedHistory);
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
        return ["Chicken Biryani", "Pizza", "Masala Dosa", "Burger", "Pasta"];
    });

    useEffect(() => {
        localStorage.setItem("recipe_search_history", JSON.stringify(history));
    }, [history]);

    const handleGenerateRecipe = async (foodName) => {
        const query = foodName?.trim() || searchQuery?.trim();
        if (!query) return;

        setSearchQuery(query);
        setLoading(true);
        setError(null);
        setRecipe(null);

        try {
            const data = await generateRecipe(query);
            setRecipe(data);

            if (data && data.success) {
                setHistory(prev => {
                    const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
                    return [query, ...filtered].slice(0, 10);
                });
            }
        } catch (err) {
            setError(err.message || "Failed to generate recipe.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50">
            <NavBar />
            <div className="max-w-7xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="col-span-1 lg:col-span-3">
                        <LeftPanel 
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onGenerate={handleGenerateRecipe}
                            loading={loading}
                        />
                    </div>

                    <div className="col-span-1 lg:col-span-6">
                        <CenterPanel 
                            recipe={recipe}
                            loading={loading}
                            error={error}
                        />
                    </div>

                    <div className="col-span-1 lg:col-span-3">
                        <RightPanel 
                            history={history}
                            onSelectHistory={handleGenerateRecipe}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;