import React, {useEffect, useState} from "react";
import { getVehicles } from "../services/api";

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {fetchVehicles()}, []);

    const fetchVehicles = async () => {
        const data = await getVehicles();
        setVehicles(data);
    }

    return(
        <div>
            <h2>Vehicle List</h2>
            {vehicles.map((v) => (
                <div key={v._id}>
                    <h3>{v.name}</h3>
                    <p>{v.number}</p>
                </div>
            ))}
        </div>
    );
};



export default VehicleList;