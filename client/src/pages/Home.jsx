import React from "react";
import VehicleList from "../components/VehicleList";
import VehicleForm from "../components/VehicleForm";

const Home = () => {
    return (
        <div>
            <h1>MotoTrack</h1>
            <VehicleForm />
            <VehicleList />
        </div>
    )
}

export default Home;