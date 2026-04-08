import React, {useEffect, useState} from "react";
import { getVehicles } from "../services/api";
import VehicleList from "../components/VehicleList";
import VehicleForm from "../components/VehicleForm";

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    
    const fetchVehicles = async () => {
        const data = await getVehicles();
        console.log("Fetched:", data)
        setVehicles([...data]);
    }

    useEffect(() => {fetchVehicles()}, []);

    return (
        <div>
            <h1>MotoTrack</h1>
            <VehicleForm fetchVehicles={fetchVehicles}/>
            <VehicleList vehicles={vehicles} fetchVehicles={fetchVehicles} />
        </div>
    )
}

export default Home;