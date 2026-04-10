const BASE_URL = "http://localhost:5000/api";

// Get All Vehicles
export const getVehicles = async () => {
    const res = await fetch(`${BASE_URL}/vehicles`);
    return res.json();
};

// Add Vehicle
export const addVehicle = async (data) => {
    const res = await fetch(`${BASE_URL}/vehicles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

// Delete Vehicle
export const deleteVehicle = async (id) => {
    const res = await fetch(`${BASE_URL}/vehicles/${id}`, {
        method: "DELETE",
    })
    return res.json();
}

// Update Vehicle
export const updatedVehicle = async (id, data) => {
    const res = await fetch(`${BASE_URL}/vehicles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json()
}

// Add Service
export const addService = async (id, data) => {
    const res = await fetch (`${BASE_URL}/vehicles/${id}/service`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return res.json();
}