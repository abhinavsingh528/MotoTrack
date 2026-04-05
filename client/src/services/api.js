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