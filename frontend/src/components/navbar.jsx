import { FaUtensils } from "react-icons/fa";

function NavBar() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <div className="flex items-center gap-3">
                    <div className="bg-orange-500 p-3 rounded-xl text-white">
                        <FaUtensils size={24} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            AI Recipe Generator
                        </h1>

                        <p className="text-sm text-gray-500">
                            Powered by Gemini AI
                        </p>
                    </div>
                </div>

                <div className="flex gap-8 font-medium">

                    <button className="text-orange-500">
                        Home
                    </button>

                    <button className="hover:text-orange-500">
                        History
                    </button>

                </div>

            </div>
        </header>
    );
}

export default NavBar;