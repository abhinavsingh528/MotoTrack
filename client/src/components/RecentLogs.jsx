const RecentLogs = ({ vehicles }) => {
    const getAllLogs = () => {
        const logs = [];

        vehicles.forEach((v) => {
            v.services?.forEach((s) => {
                logs.push({
                    vehicle: v.name,
                    type: "service",
                    description: s.description || "Service",
                    cost: s.cost,
                    date: new Date(s.date),
                });
            });

            v.fuelLogs?.forEach((f) => {
                logs.push({
                    vehicle: v.name,
                    type: "fuel",
                    description: `${f.liters}L fuel`,
                    cost: f.cost,
                    date: new Date(f.date),
                });
            });
        });

        return logs.sort((a, b) => b.date - a.date).slice(0, 8); // latest 8
    };

    const logs = getAllLogs();

    return (
        <div className="bg-gray-800 p-4 rounded-xl">
            <h2 className="text-white font-semibold mb-3">📝 Recent Logs</h2>
            {logs.length === 0 ? (
                <p className="text-gray-400 text-sm">No logs yet</p>
            ) : (
                <div className="space-y-2">
                    {logs.map((log, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{log.type === "fuel" ? "⛽" : "🔧"}</span>
                                <div>
                                    <p className="text-white text-sm font-semibold">{log.vehicle}</p>
                                    <p className="text-gray-400 text-xs">{log.description}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-green-400 text-sm font-semibold">₹{log.cost}</p>
                                <p className="text-gray-400 text-xs">{log.date.toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentLogs;