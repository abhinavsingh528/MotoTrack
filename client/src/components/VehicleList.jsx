import React, {useEffect, useState} from "react";
import { getVehicles } from "../services/api";
import { deleteVehicle, updatedVehicle } from "../services/api";


const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editNumber, setEditNumber] = useState("");


    useEffect(() => {fetchVehicles()}, []);

    const fetchVehicles = async () => {
        const data = await getVehicles();
        setVehicles(data);
    }

    const handleDelete = async (id) => {
        await deleteVehicle(id);
        window.location.reload();
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
        window.location.reload();
    }

    return(
        <div>
            <h2>Vehicle List</h2>
            {vehicles.map((v) => (
                <div key={v._id}>
                    {editId === v._id ? (
                        <>
                            <input type="text" onChange={(e) => setEditName(e.target.value)} name="" id="" value={editName} />
                            <input type="text" onChange={(e) => setEditNumber(e.target.value)} name="" id="" value={editNumber}/>
                            <button onClick={handleUpdate}>Save</button>
                        </>
                    ) : (
                            <>
                                <h3>{v.name}</h3>
                                <p>{v.number}</p>
                                <button onClick={() => handleEdit(v)}>Edit</button>
                                <button onClick={() => handleDelete(v._id)}>Delete</button>

                            </>
                    )}
                    
                    
                </div>
            ))}
        </div>
    );
};



export default VehicleList;