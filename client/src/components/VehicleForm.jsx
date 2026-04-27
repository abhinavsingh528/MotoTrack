import { useState } from "react";
import { addVehicle } from "../services/api";

const VehicleForm = ({fetchVehicles}) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [nextServiceDate, setNextServiceDate] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addVehicle({name, number, nextServiceDate});
        await fetchVehicles();

        //clear input
        setName("");
        setNumber("");
        setNextServiceDate("");
        
        alert("Vehicle Added✅")
    };

    return (<form onSubmit={handleSubmit} className="bg-gray-600 p-6 rounded-2xl shadow-lg space-y-4">
                <h2 className="text-xl font-semibold text-blue-300">Add Vehicle</h2>
                <input type="text" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" name="" id="" onChange={(e) => setName(e.target.value)} placeholder="Vehicle Name" value={name} required/>
                <input type="text" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" name="" id="" onChange={(e) => setNumber(e.target.value)} placeholder="Vehicle Number" value={number} required/>
                <input type="date" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setNextServiceDate(e.target.value)} value={nextServiceDate}/>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold">Add</button>
            </form>
    )
}

export default VehicleForm;