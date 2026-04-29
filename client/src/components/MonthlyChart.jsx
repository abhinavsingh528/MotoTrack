import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyChart = ({ vehicles }) => {
    // Build last 6 months labels
    const getLastSixMonths = () => {
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            months.push(d.toLocaleString("default", { month: "short", year: "2-digit" }));
        }
        return months;
    };

    const getMonthlyExpenses = () => {
        const now = new Date();
        const monthlyCosts = Array(6).fill(0);

        vehicles.forEach((v) => {
            // Service costs
            v.services?.forEach((s) => {
                const date = new Date(s.date);
                const monthsAgo = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
                if (monthsAgo >= 0 && monthsAgo < 6) {
                    monthlyCosts[5 - monthsAgo] += s.cost || 0;
                }
            });

            // Fuel costs
            v.fuelLogs?.forEach((f) => {
                const date = new Date(f.date);
                const monthsAgo = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
                if (monthsAgo >= 0 && monthsAgo < 6) {
                    monthlyCosts[5 - monthsAgo] += f.cost || 0;
                }
            });
        });

        return monthlyCosts;
    };

    if (vehicles.length === 0) return (
        <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-gray-400 text-center">No data yet 🫙</p>
        </div>
    );

    const data = {
        labels: getLastSixMonths(),
        datasets: [
            {
                label: "Total Expenses (₹)",
                data: getMonthlyExpenses(),
                backgroundColor: "rgba(239,68,68,0.7)",
                borderRadius: 8,
            }
        ]
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl">
            <h2 className="text-white font-semibold mb-2">📊 Monthly Expenses</h2>
            <div className="h-72">
                <Bar data={data} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default MonthlyChart;