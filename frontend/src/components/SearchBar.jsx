function SearchBar() {
    return (
        <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-xl font-semibold mb-4">
                Search Food
            </h2>
            <input
                type="text"
                placeholder="Enter food name..."
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg mt-4">
                Generate Recipe
            </button>
        </div>
    );
}

export default SearchBar;