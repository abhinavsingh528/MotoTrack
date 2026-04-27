import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
            <Link to="/" className="text-xl font-bold text-red-500">MotoTrack 🚗</Link>
            {user && (
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">👤 {user.name}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;