import React, {useEffect, useState} from "react";
import { getVehicles } from "../services/api";
import VehicleList from "../components/VehicleList";
import VehicleForm from "../components/VehicleForm";

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const data = await getVehicles();
            // console.log("Fetched:", data)
            setVehicles([...data]);
        } catch (error) {
            console.error("Failed to fetch vehicles:", error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {fetchVehicles()}, []);

    const fillteredVehicles = vehicles.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.number.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-gray-900  text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-red-500">MotoTrack 🚗</h1>
            <div className="bg-gray-800 p-4 rounded-xl shadow-md mb-6">
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
            </div>
            <div>
                <input type="text" placeholder="Search by name or number..." className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setSearch(e.target.value)} value={search} />
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow-md">
                
                {loading ? (<p>Loading vehicles...</p>) 
                        : vehicles.length === 0 
                        ? (<p className="text-gray-400">No vehicles added yet 🫙</p>) 
                        : (<VehicleList vehicles={fillteredVehicles} fetchVehicles={fetchVehicles} />)
                }
                {fillteredVehicles.length === 0 && (<p className="text-gray-400"> No vehicles match your search</p>)}
            </div>
        </div>
    )
}

export default Home;