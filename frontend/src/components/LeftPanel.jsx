import { FaSearch } from "react-icons/fa";

function LeftPanel({ searchQuery, setSearchQuery, onGenerate, loading }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onGenerate();
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">
                Search Recipe
            </h2>

            <p className="text-gray-500 mb-6">
                Enter your favourite food name.
            </p>

            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    placeholder="Chicken Biryani..."
                    className="w-full border-2 border-orange-100 rounded-xl px-5 py-4 pr-12 focus:border-orange-500 outline-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                />

                <FaSearch
                    className="absolute right-5 top-5 text-orange-400"
                />
            </div>

            <button 
                onClick={() => onGenerate()}
                disabled={loading || !searchQuery?.trim()}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition"
            >
                {loading ? "Generating..." : "Generate Recipe"}
            </button>

            <div className="mt-8">
                <h3 className="font-semibold mb-3">
                    Popular Searches
                </h3>

                <div className="flex flex-wrap gap-2">
                    {[
                        "Pizza",
                        "Burger",
                        "Pasta",
                        "Dosa",
                        "Biryani"
                    ].map(food => (
                        <span
                            key={food}
                            onClick={() => !loading && onGenerate(food)}
                            className="bg-orange-100 px-3 py-2 rounded-full text-sm cursor-pointer hover:bg-orange-200 transition disabled:opacity-50">
                            {food}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LeftPanel;