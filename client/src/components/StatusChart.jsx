import {Chart as ChartJS, ArcElement, Tooltip, Legend, plugins} from "chart.js"
import {Pie} from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({vehicles}) => {
    const active = vehicles.filter(v => v.status === "active").length;
    const service = vehicles.filter(v => v.status === "service").length;
    const completed = vehicles.filter(v => v.status === "completed").length;

    const data = {
        labels: ["Active 🚗", "In Service 🛠️", "Completed ✅"],
        datasets: [
            {
                data: [active, service, completed],
                backgroundColor: ["#22c55e", "#eab308", "#3b82f6"],
            }
        ],
        
    }

    return (
        <div className="bg-gray-800 p-4 rounded-xl mt-4">
            <h2 className="text-white">Vehicles by Status</h2>
            <div className="h-72 mt-6">
                <Pie data={data} options={{maintainAspectRatio: false}} />
            </div>
        </div>
    )
}

export default StatusChart