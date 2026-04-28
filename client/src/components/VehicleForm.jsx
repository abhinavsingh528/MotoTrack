import { useState } from "react";
import { addVehicle } from "../services/api";

const VehicleForm = ({fetchVehicles}) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [nextServiceDate, setNextServiceDate] = useState("")
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [odometer, setOdometer] = useState("");
    const [insuranceExpiry, setInsuranceExpiry] = useState("");
    const [pucExpiry, setPucExpiry] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addVehicle({ name, number, nextServiceDate, model, year, odometer, insuranceExpiry, pucExpiry });
        await fetchVehicles();

        //clear input
        setName("");
        setNumber("");
        setNextServiceDate("");
        setModel("");
        setYear("");
        setOdometer("");
        setInsuranceExpiry(""); 
        setPucExpiry("");
        
        alert("Vehicle Added✅")
    };

    return (<form onSubmit={handleSubmit} className="bg-gray-600 p-6 rounded-2xl shadow-lg space-y-4">
                <h2 className="text-xl font-semibold text-blue-300">Add Vehicle</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setName(e.target.value)} placeholder="Vehicle Name" value={name} required />
                    <input type="text" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setNumber(e.target.value)} placeholder="Vehicle Number" value={number} required />
                    <input type="text" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setModel(e.target.value)} placeholder="Model (e.g. Honda Activa)" value={model} required/>
                    <input type="number" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setYear(e.target.value)} placeholder="Year (e.g. 2021)" value={year} min="1990" max="2030" required/>
                    <input type="number" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setOdometer(e.target.value)} placeholder="Odometer (km)" value={odometer} required/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Next Service Date</label>
                        <input type="date" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setNextServiceDate(e.target.value)} value={nextServiceDate} required/>
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Insurance Expiry</label>
                        <input type="date" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setInsuranceExpiry(e.target.value)} value={insuranceExpiry} required/>
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">PUC Expiry</label>
                        <input type="date" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setPucExpiry(e.target.value)} value={pucExpiry} required/>
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold">Add Vehicle</button>
            </form>
    )
}

export default VehicleForm;