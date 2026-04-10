import React, {useEffect, useState} from "react";
import { getVehicles } from "../services/api";
import { deleteVehicle, updatedVehicle, addService } from "../services/api";



const VehicleList = ({vehicles, fetchVehicles}) => {

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editNumber, setEditNumber] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [serviceCost, setServiceCost] = useState("");
    const [serviceDesc, setServiceDesc] = useState("");



    const handleDelete = async (id) => {
        await deleteVehicle(id);
        await fetchVehicles();
        // window.location.reload();
    }

    const handleEdit = (v) => {
        setEditId(v._id);
        setEditName(v.name);
        setEditNumber(v.number);
        setEditStatus(v.status);
    }

    const handleUpdate = async () => {
        await updatedVehicle(editId, {
            name: editName,
            number: editNumber,
            status: editStatus,
        })
        // await fetchVehicles();
        window.location.reload();
    }

    const handleAddService = async (id) => {
        await addService(id, {
            cost: serviceCost,
            description: serviceDesc,
        })
        setServiceCost("");
        setServiceDesc("");
        await fetchVehicles();
    }

    return(
        
        <div className="grid gap-4">
            <h2 className="text-xl font-semibold text-blue-300">Vehicle List</h2>
            {vehicles.map((v) => ( 
                <div key={v._id} className="bg-gray-600 p-4 rounded-xl shadow-md flex justify-between items-center ">
                    {editId === v._id ? (
                        <>
                            <input type="text" className="w-1/4 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setEditName(e.target.value)} name="" id="" value={editName} />
                            <input type="text" className="w-1/4 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"  onChange={(e) => setEditNumber(e.target.value)} name="" id="" value={editNumber}/>
                            <select className="bg-gray-700 text-white p-1 rounded" onChange={(e) => setEditStatus(e.target.value)} value={editStatus}>
                                <option value="active">Active</option>
                                <option value="service">In Service</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button className="w-1/10 m-2 bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold" onClick={handleUpdate}>Save</button>
                        </>
                    ) : ( 
                            <>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{v.name}</h3>
                                    <p className="text-gray-400">{v.number}</p>
                                    <p className="text-sm text-gray-400">Status:
                                        <span className={`px-2 py-1 rounded text-sm font-semibold ${v.status === 'active' ? "bg-green-500 text-red-600" : v.status === 'service' ? "bg-yellow-500 text-fuchsia-600" : "bg-blue-500 text-green-900" }`}>{v.status}</span>
                                    </p>
                                    <p className={`${new Date(v.nextServiceDate) < new Date() ? "text-red-500" : "text-green-400"}`}>
                                        Next Service: {v.nextServiceDate ? new Date(v.nextServiceDate).toLocaleDateString() : "Not Set"} <br />
                                        {new Date(v.nextServiceDate) < new Date() ? "Service Due" : "All Good"}
                                    </p>
                                    <p>
                                        Total Cost: {v.services?.reduce((sum, s) => sum + s.cost, 0)}
                                    </p>
                                    
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
                                    <input type="number" className="w-1/3 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" placeholder="Cost" onChange={(e) => setServiceCost(e.target.value)} />
                                    <input type="text" className="w-1/3 m-2 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" placeholder="Description" onChange={(e) => setServiceDesc(e.target.value)} />
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