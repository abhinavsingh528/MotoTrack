import React, {useEffect, useState} from "react";
import { getVehicles } from "../services/api";
import VehicleList from "../components/VehicleList";
import VehicleForm from "../components/VehicleForm";
import VehicleChart from "../components/VehicleChart";
import StatusChart from "../components/StatusChart";
import Navbar from "../components/Navbar";

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    
    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const res = await getVehicles();
            // console.log("Fetched:", data)
            setVehicles([...res.data]);
        } catch (error) {
            console.error("Failed to fetch vehicles:", error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {fetchVehicles()}, []);

    const filteredVehicles = vehicles.filter((v) => {
        const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.number.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || v.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    
    const getReminders = () => {
            const reminders = [];
            const today = new Date();

            vehicles.forEach((v) => {
                // Service due
                if (v.nextServiceDate) {
                    const daysLeft = Math.ceil((new Date(v.nextServiceDate) - today) / (1000 * 60 * 60 * 24));
                    if (daysLeft < 0) {
                        reminders.push({ vehicle: v.name, message: "Service is overdue!", type: "error" });
                    } else if (daysLeft <= 7) {
                        reminders.push({ vehicle: v.name, message: `Service due in ${daysLeft} days`, type: "warning" });
                    }
                }
            
                // Insurance expiry
                if (v.insuranceExpiry) {
                    const daysLeft = Math.ceil((new Date(v.insuranceExpiry) - today) / (1000 * 60 * 60 * 24));
                    if (daysLeft < 0) {
                        reminders.push({ vehicle: v.name, message: "Insurance has expired!", type: "error" });
                    } else if (daysLeft <= 30) {
                        reminders.push({ vehicle: v.name, message: `Insurance expires in ${daysLeft} days`, type: "warning" });
                    }
                }
            
                // PUC expiry
                if (v.pucExpiry) {
                    const daysLeft = Math.ceil((new Date(v.pucExpiry) - today) / (1000 * 60 * 60 * 24));
                    if (daysLeft < 0) {
                        reminders.push({ vehicle: v.name, message: "PUC has expired!", type: "error" });
                    } else if (daysLeft <= 30) {
                        reminders.push({ vehicle: v.name, message: `PUC expires in ${daysLeft} days`, type: "warning" });
                    }
                }
            });
        
            return reminders;
    };

    return (
        <div className="min-h-screen bg-gray-900  text-white p-6">
            <Navbar/>
            
            <div className="bg-gray-800 p-4 rounded-xl shadow-md mb-6 mt-6">
                <VehicleForm fetchVehicles={fetchVehicles}/>
            </div>
            {/* Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-gray-400">Total Vehicles</p>
                    <h2 className="text-2xl text-white font-bold">{vehicles.length}</h2>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-gray-400">Total Cost</p>
                    <h2 className="text-2xl text-green-400 font-bold">{vehicles.reduce((sum, v) => sum + (v.services?.reduce((s, x) => s + x.cost, 0) || 0 ), 0)  }</h2>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-gray-400">Total Services</p>
                    <h2 className="text-2xl text-blue-400 font-bold">{vehicles.reduce((sum, v) => sum + (v.services?.length || 0 ), 0)  }</h2>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-gray-400">Due Services</p>
                    <h2 className="text-2xl text-red-400 font-bold">{vehicles.filter(v => v.nextServiceDate && new Date(v.nextServiceDate) < new Date()).length}</h2>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-gray-400">Alerts</p>
                    <h2 className="text-2xl text-red-400 font-bold">{getReminders().length}</h2>
                </div>
            </div>
            {/* Smart Reminders */}
            {getReminders().length > 0 && (
                <div className="bg-gray-800 p-4 rounded-xl mb-6">
                    <h2 className="text-lg font-semibold text-white mb-3">🔔 Smart Reminders</h2>
                    <div className="space-y-2">
                        {getReminders().map((r, index) => (
                            <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${r.type === "error" ? "bg-red-500/20 border border-red-500" : "bg-yellow-500/20 border border-yellow-500"}`}>
                                <span className="text-xl">{r.type === "error" ? "🚨" : "⚠️"}</span>
                                <div>
                                    <p className={`font-semibold text-sm ${r.type === "error" ? "text-red-400" : "text-yellow-400"}`}>{r.vehicle}</p>
                                    <p className="text-gray-300 text-sm">{r.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="grid md:grid-cols-2 gap-6 mt-6 mb-6">
                <VehicleChart vehicles={vehicles} />
                <StatusChart vehicles={vehicles} />
            </div>
            <div>
                <input type="text" placeholder="Search by name or number..." className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setSearch(e.target.value)} value={search} />
            </div>
            <div>
                <select className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}  name="" id="">
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="service">In Service</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow-md">
                
                {loading ? (<p>Loading vehicles...</p>)
                         : vehicles.length === 0
                         ? (<p className="text-gray-400">No vehicles added yet 🫙</p>)
                         : (<VehicleList vehicles={filteredVehicles} fetchVehicles={fetchVehicles} />)
                }
                {filteredVehicles.length === 0 && vehicles.length > 0 && (
                    <p className="text-gray-400">No vehicles match your search</p>
                )}
            </div>
        </div>
    )
}

export default Home;