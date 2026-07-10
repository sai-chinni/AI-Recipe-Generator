import { FaHistory, FaUtensils } from "react-icons/fa";

function RightPanel({ history, onSelectHistory }) {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-6 min-h-[500px] flex flex-col">
            <h2 className="text-2xl font-bold mb-5 text-gray-800 flex items-center gap-2.5">
                <FaHistory className="text-orange-500" size={20} />
                History
            </h2>

            {history && history.length > 0 ? (
                <div className="space-y-2 flex-grow overflow-y-auto max-h-[550px] pr-1">
                    {history.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onSelectHistory(item)}
                            className="bg-orange-50/50 hover:bg-orange-50 border border-orange-100/30 rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition shadow-sm hover:shadow-md hover:border-orange-200"
                        >
                            <div className="bg-orange-500/10 p-2 rounded-xl text-orange-600">
                                <FaUtensils size={14} />
                            </div>
                            <span className="font-semibold text-gray-700 text-sm truncate">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                    <p className="text-gray-400 text-sm">
                        No search history yet.
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                        Your generated recipes will show up here.
                    </p>
                </div>
            )}
        </div>
    );
}

export default RightPanel;