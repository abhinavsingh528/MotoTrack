import React, {useEffect, useState} from "react";
import { getVehicles } from "../services/api";
import { deleteVehicle, updatedVehicle } from "../services/api";


const VehicleList = ({vehicles, fetchVehicles}) => {

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editNumber, setEditNumber] = useState("");


    const handleDelete = async (id) => {
        await deleteVehicle(id);
        await fetchVehicles();
        // window.location.reload();
    }

    const handleEdit = (v) => {
        setEditId(v._id);
        setEditName(v.name);
        setEditNumber(v.number);
    }

    const handleUpdate = async () => {
        await updatedVehicle(editId, {
            name: editName,
            number: editNumber,
        })
        await fetchVehicles();
        // window.location.reload();
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
                            <button className="w-1/10 m-2 bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold" onClick={handleUpdate}>Save</button>
                        </>
                    ) : (
                            <>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{v.name}</h3>
                                    <p className="text-gray-400">{v.number}</p>
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