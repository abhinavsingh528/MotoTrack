import React, {useEffect, useState} from "react";
import { getVehicles } from "../services/api";
import VehicleList from "../components/VehicleList";
import VehicleForm from "../components/VehicleForm";

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true)
    
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

    return (
        <div className="min-h-screen bg-gray-900  text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-red-500">MotoTrack 🚗</h1>
            <div className="bg-gray-800 p-4 rounded-xl shadow-md mb-6">
                <VehicleForm fetchVehicles={fetchVehicles}/>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow-md">
                {loading ? (<p>Loading vehicles...</p>) 
                        : vehicles.length === 0 
                        ? (<p className="text-gray-400">No vehicles added yet 🫙</p>) 
                        : (<VehicleList vehicles={vehicles} fetchVehicles={fetchVehicles} />)
                }
            </div>
        </div>
    )
}

export default Home;