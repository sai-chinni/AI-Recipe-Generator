function RightPanel() {
    const history = [
        "Chicken Biryani",
        "Pizza",
        "Butter Chicken",
        "Pasta",
        "Dosa",
        "Noodles",
        "Burger",
        "Paneer Curry"
    ];

    return (
        <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5">
                Recent Searches
            </h2>

            <div className="space-y-3 h-[580px] overflow-y-auto">
                {
                    history.map((food, index) => (
                        <div
                            key={index}
                            className="border border-orange-100 rounded-xl p-4 hover:bg-orange-50 cursor-pointer transition">
                            {food}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default RightPanel;