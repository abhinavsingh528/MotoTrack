import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await loginUser({ email, password });
            login(res.data);
            navigate("/")
        }
        catch (err){
            setError(err.response?.data?.message || "Login failed. Try again!")
        }
        finally {
            setLoading(false);
        }
    }

    if(loading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-red-500 mb-2">MototTrack 🚗</h1>
                <h2 className="text-xl font-semibold text-white mb-6 ">Welcome back</h2>
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" placeholder="Email" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Password" className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold text-white">Login</button>
                </form>
                <p className="text-gray-400 text-sm mt-4 text-center">
                    Don't have an Account? {" "}
                    <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;