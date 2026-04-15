import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from "chart.js"
import {Bar} from "react-chartjs-2"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VehicleChart = ({vehicles}) => {
    const data = {
        labels: vehicles.map((v) => v.name),
        datasets: [
            {
                label: "Total Cost",
                data: vehicles.map(v => v.services?.reduce((sum, s) => sum + s.cost, 0)),
                backgroundColor: "rgba(59,130,246,0.7)",
                borderRadius: 8
            }
        ]
    }
    return(
        <div className="bg-gray-800 p-4 rounded-xl">
            <h2 className="text-white">Service Cost Chart</h2>
            <Bar data={data} />
        </div>
    )
}

export default VehicleChart;

