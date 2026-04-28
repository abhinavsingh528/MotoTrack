import { useState } from "react";
import { deleteVehicle, updatedVehicle, addService, addFuelLog } from "../services/api";

const VehicleList = ({ vehicles, fetchVehicles }) => {
    const getExpiryStatus = (date) => {
        if (!date) return null;
        const today = new Date();
        const expiry = new Date(date);
        const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
        if (daysLeft < 0) return { label: "Expired ❌", color: "text-red-500" };
        if (daysLeft <= 30) return { label: `Expires in ${daysLeft} days ⚠️`, color: "text-yellow-400" };
        return { label: `Valid ✅ (${daysLeft} days)`, color: "text-green-400" };
    };
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editNumber, setEditNumber] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [serviceInputs, setServiceInputs] = useState({});
    const [editModel, setEditModel] = useState("");
    const [editYear, setEditYear] = useState("");
    const [editOdometer, setEditOdometer] = useState("");
    const [fuelInputs, setFuelInputs] = useState({});
    const [showFuel, setShowFuel] = useState({});

    const handleDelete = async (id) => {
        await deleteVehicle(id);
        await fetchVehicles();
    };

    const handleEdit = (v) => {
        setEditId(v._id);
        setEditName(v.name);
        setEditNumber(v.number);
        setEditStatus(v.status);
        setEditModel(v.model || "");
        setEditYear(v.year || "");
        setEditOdometer(v.odometer || "");
    };

    const handleUpdate = async () => {
        await updatedVehicle(editId, {
            name: editName,
            number: editNumber,
            status: editStatus,
            model: editModel,
            year: editYear,
            odometer: editOdometer,
        });
        setEditId(null);
        await fetchVehicles();
    };

    const handleServiceInput = (id, field, value) => {
        setServiceInputs((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
    };

    const handleAddService = async (id) => {
        const { cost = "", description = "" } = serviceInputs[id] || {};
        await addService(id, { cost, description });
        setServiceInputs((prev) => ({ ...prev, [id]: { cost: "", description: "" } }));
        await fetchVehicles();
    };

    const handleFuelInput = (id, field, value) => {
        setFuelInputs((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
    };

    const handleAddFuel = async (id) => {
        const { liters = "", cost = "", odometer = "" } = fuelInputs[id] || {};
        await addFuelLog(id, { liters, cost, odometer });
        setFuelInputs((prev) => ({ ...prev, [id]: { liters: "", cost: "", odometer: "" } }));
        await fetchVehicles();
    };

    const getMileage = (fuelLogs) => {
        if (!fuelLogs || fuelLogs.length < 2) return null;
        const sorted = [...fuelLogs].sort((a, b) => new Date(a.date) - new Date(b.date));
        const first = sorted[0];
        const last = sorted[sorted.length - 1];
        const totalKm = last.odometer - first.odometer;
        const totalLiters = sorted.slice(1).reduce((sum, l) => sum + l.liters, 0);
        if (totalLiters === 0) return null;
        return (totalKm / totalLiters).toFixed(2);
    };

    return (
        <div className="grid gap-4">
            <h2 className="text-xl font-semibold text-blue-300">Vehicle List</h2>
            {vehicles.map((v) => (
                <div key={v._id} className="bg-gray-600 p-4 rounded-xl shadow-md flex justify-between items-center">
                    {editId === v._id ? (
                        <>
                            <input type="text" className="w-1/4 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setEditName(e.target.value)} value={editName} placeholder="Name" />
                            <input type="text" className="w-1/4 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setEditNumber(e.target.value)} value={editNumber} placeholder="Number" />
                            <input type="text" className="w-1/4 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setEditModel(e.target.value)} value={editModel} placeholder="Model" />
                            <input type="number" className="w-1/4 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setEditYear(e.target.value)} value={editYear} placeholder="Year" />
                            <input type="number" className="w-1/4 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setEditOdometer(e.target.value)} value={editOdometer} placeholder="Odometer" />
                            <select className="bg-gray-700 text-white p-1 rounded" onChange={(e) => setEditStatus(e.target.value)} value={editStatus}>
                                <option value="active">Active</option>
                                <option value="service">In Service</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button className="m-2 bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold" onClick={handleUpdate}>Save</button>
                            <button className="m-2 bg-gray-500 hover:bg-gray-600 transition p-3 rounded-lg font-semibold" onClick={() => setEditId(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-lg font-bold text-white">{v.name}</h3>
                                <p className="text-gray-400">{v.number}</p>
                                <p className="text-sm text-gray-400">Status:
                                    <span className={`px-2 py-1 rounded text-sm font-semibold ${v.status === "active" ? "bg-green-600 text-green-100" : v.status === "service" ? "bg-yellow-600 text-yellow-100" : "bg-blue-600 text-blue-100"}`}>{v.status}</span>
                                </p>
                                {(v.model || v.year) && (
                                    <p className="text-gray-400 text-sm">🚗 {v.model} {v.year}</p>
                                )}
                                {v.odometer > 0 && (
                                    <p className="text-gray-400 text-sm">🛣️ Odometer: {v.odometer} km</p>
                                )}
                                <div className="mt-2 space-y-1">
                                    {getExpiryStatus(v.insuranceExpiry) && (
                                        <p className={`text-sm ${getExpiryStatus(v.insuranceExpiry).color}`}>
                                            🛡️ Insurance: {getExpiryStatus(v.insuranceExpiry).label}
                                        </p>
                                    )}
                                    {getExpiryStatus(v.pucExpiry) && (
                                        <p className={`text-sm ${getExpiryStatus(v.pucExpiry).color}`}>
                                            📋 PUC: {getExpiryStatus(v.pucExpiry).label}
                                        </p>
                                    )}
                                </div>
                                <p className={`${v.nextServiceDate && new Date(v.nextServiceDate) < new Date() ? "text-red-500" : "text-green-400"}`}>
                                    Next Service: {v.nextServiceDate ? new Date(v.nextServiceDate).toLocaleDateString() : "Not Set"} <br />
                                    {v.nextServiceDate ? (new Date(v.nextServiceDate) < new Date() ? "⚠️ Service Due" : "✅ All Good") : ""}
                                </p>
                                <p>Total Cost: {v.services?.reduce((sum, s) => sum + s.cost, 0) || 0}</p>
                                {v.services && v.services.length > 0 && (
                                    <div className="mt-3 bg-gray-700 p-2 rounded">
                                        <h4 className="text-sm font-semibold text-blue-300 mb-1">Service History</h4>
                                        {v.services.map((s, index) => (
                                            <div key={index} className="text-sm text-gray-300 flex justify-between">
                                                <span>💰 {s.cost} - {s.description}</span>
                                                <span>{new Date(s.date).toLocaleDateString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                )}
                                {/* Fuel Section */}
                                <div className="mt-3">
                                    <button
                                        className="text-sm text-blue-400 hover:underline"
                                        onClick={() => setShowFuel((prev) => ({ ...prev, [v._id]: !prev[v._id] }))}
                                    >
                                        {showFuel[v._id] ? "Hide Fuel Logs ▲" : "Show Fuel Logs ▼"}
                                    </button>
                                                            
                                    {showFuel[v._id] && (
                                        <div className="mt-2 bg-gray-700 p-3 rounded-lg">
                                            <h4 className="text-sm font-semibold text-blue-300 mb-2">⛽ Fuel Logs</h4>
                                    
                                            {/* Mileage */}
                                            {getMileage(v.fuelLogs) && (
                                                <p className="text-green-400 text-sm mb-2">
                                                    🏎️ Avg Mileage: {getMileage(v.fuelLogs)} km/L
                                                </p>
                                            )}
                                
                                            {/* Fuel log history */}
                                            {v.fuelLogs && v.fuelLogs.length > 0 ? (
                                                <div className="space-y-1 mb-3">
                                                    {v.fuelLogs.map((f, index) => (
                                                        <div key={index} className="text-sm text-gray-300 flex justify-between">
                                                            <span>⛽ {f.liters}L — ₹{f.cost} — {f.odometer} km</span>
                                                            <span>{new Date(f.date).toLocaleDateString()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 text-sm mb-2">No fuel logs yet</p>
                                            )}
                                
                                            {/* Add fuel form */}
                                            <div className="grid grid-cols-3 gap-2 mt-2">
                                                <input
                                                    type="number"
                                                    className="p-2 rounded-lg bg-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                                    placeholder="Liters"
                                                    value={fuelInputs[v._id]?.liters || ""}
                                                    onChange={(e) => handleFuelInput(v._id, "liters", e.target.value)}
                                                />
                                                <input
                                                    type="number"
                                                    className="p-2 rounded-lg bg-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                                    placeholder="Cost (₹)"
                                                    value={fuelInputs[v._id]?.cost || ""}
                                                    onChange={(e) => handleFuelInput(v._id, "cost", e.target.value)}
                                                />
                                                <input
                                                    type="number"
                                                    className="p-2 rounded-lg bg-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                                    placeholder="Odometer"
                                                    value={fuelInputs[v._id]?.odometer || ""}
                                                    onChange={(e) => handleFuelInput(v._id, "odometer", e.target.value)}
                                                />
                                            </div>
                                            <button
                                                className="mt-2 w-full bg-green-500 hover:bg-green-600 transition p-2 rounded-lg text-sm font-semibold"
                                                onClick={() => handleAddFuel(v._id)}
                                            >
                                                ⛽ Add Fuel Log
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <input type="number" className="w-1/3 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" placeholder="Cost" value={serviceInputs[v._id]?.cost || ""} onChange={(e) => handleServiceInput(v._id, "cost", e.target.value)} required/>
                                <input type="text" className="w-1/3 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" placeholder="Description" value={serviceInputs[v._id]?.description || ""} onChange={(e) => handleServiceInput(v._id, "description", e.target.value)} required/>
                                <button className="w-1/5 m-2 bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold" onClick={() => handleAddService(v._id)}>Add Service</button>
                            </div>
                            
                            <div className="space-x-2">
                                <button className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded" onClick={() => handleEdit(v)}>Edit</button>
                                <button className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded ml-2" onClick={() => handleDelete(v._id)}>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default VehicleList;