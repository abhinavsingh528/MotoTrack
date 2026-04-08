import { useState } from "react";
import { addVehicle } from "../services/api";

const VehicleForm = ({fetchVehicles}) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addVehicle({name, number});
        await fetchVehicles();

        //clear input
        setName("");
        setNumber("");

        
        // alert("Vehicle Added✅")
    };

    return (<form onSubmit={handleSubmit}>
                <h2>Add Vehicle</h2>
                <input type="text" name="" id="" onChange={(e) => setName(e.target.value)} placeholder="Vehicle Name" value={name} required/>
                <input type="text" name="" id="" onChange={(e) => setNumber(e.target.value)} placeholder="Vehicle Number" value={number} required/>
                <button type="submit">Add</button>
            </form>
    )
}

export default VehicleForm;