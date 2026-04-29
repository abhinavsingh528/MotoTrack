const UpcomingServices = ({ vehicles }) => {
    const upcoming = vehicles
        .filter((v) => v.nextServiceDate)
        .map((v) => {
            const daysLeft = Math.ceil((new Date(v.nextServiceDate) - new Date()) / (1000 * 60 * 60 * 24));
            return { ...v, daysLeft };
        })
        .sort((a, b) => a.daysLeft - b.daysLeft)
        .slice(0, 5); // show top 5

    if (upcoming.length === 0) return (
        <div className="bg-gray-800 p-4 rounded-xl">
            <h2 className="text-white font-semibold mb-2">🔧 Upcoming Services</h2>
            <p className="text-gray-400 text-sm">No upcoming services</p>
        </div>
    );

    return (
        <div className="bg-gray-800 p-4 rounded-xl">
            <h2 className="text-white font-semibold mb-3">🔧 Upcoming Services</h2>
            <div className="space-y-2">
                {upcoming.map((v) => (
                    <div key={v._id} className={`flex justify-between items-center p-3 rounded-lg ${v.daysLeft < 0 ? "bg-red-500/20 border border-red-500" : v.daysLeft <= 7 ? "bg-yellow-500/20 border border-yellow-500" : "bg-gray-700"}`}>
                        <div>
                            <p className="text-white font-semibold text-sm">{v.name}</p>
                            <p className="text-gray-400 text-xs">{v.number}</p>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-semibold ${v.daysLeft < 0 ? "text-red-400" : v.daysLeft <= 7 ? "text-yellow-400" : "text-green-400"}`}>
                                {v.daysLeft < 0 ? `${Math.abs(v.daysLeft)} days overdue` : v.daysLeft === 0 ? "Due today!" : `${v.daysLeft} days left`}
                            </p>
                            <p className="text-gray-400 text-xs">{new Date(v.nextServiceDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingServices;