import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import motorcycleBg from "../assets/motorcycle-background-image.jpg";
import logo from "../assets/logo.png";
import bellIcon from "../assets/bell-regular-full.svg";
import chartIcon from "../assets/chart-column-solid-full.svg";
import shieldIcon from "../assets/shield-solid-full.svg";
import lockIcon from "../assets/lock-solid-full.svg";
import eyeIcon from "../assets/eye-solid-full.svg";
import atIcon from "../assets/at-solid-full.svg";
import arrowIcon from "../assets/arrow-right-from-bracket-solid-full.svg";
import userPlusIcon from "../assets/user-plus-solid-full.svg";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await registerUser({ name, email, password });
            login(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-900 flex">

            {/* Left Panel */}
            <div
                className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
                style={{
                    backgroundImage: `url(${motorcycleBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/90"></div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <img src={logo} alt="MotoTrack" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                        <p className="text-white font-bold text-xl leading-none">
                            Moto<span className="text-blue-400">Track</span>
                        </p>
                        <p className="text-gray-300 text-xs">Track. Maintain. Ride Smooth.</p>
                    </div>
                </div>

                {/* Hero Text */}
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                        Start Your<br />
                        <span className="text-blue-400">Journey</span><br />
                        With Us
                    </h1>
                    <p className="text-gray-200 mb-10 leading-relaxed max-w-sm">
                        Join thousands of riders who trust MotoTrack to keep their vehicles in perfect condition.
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                        {[
                            { icon: bellIcon, title: "Timely Reminders", desc: "Never miss a service or renewal." },
                            { icon: chartIcon, title: "Track Everything", desc: "Maintenance, expenses, fuel & more." },
                            { icon: shieldIcon, title: "Secure & Reliable", desc: "Your data is safe with us." },
                        ].map((f) => (
                            <div key={f.title} className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-500/30 backdrop-blur border border-blue-400/30 rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                                    <img src={f.icon} alt={f.title} className="w-full h-full invert" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{f.title}</p>
                                    <p className="text-gray-300 text-xs">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 h-2"></div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900">
                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <img src={logo} alt="MotoTrack" className="w-9 h-9 rounded-lg object-cover" />
                        <span className="text-white font-bold text-lg">
                            Moto<span className="text-blue-400">Track</span>
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-1">Create account</h2>
                    <p className="text-gray-400 mb-8">Join MotoTrack and start tracking today</p>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-700 mb-8">
                        <Link
                            to="/login"
                            className="pb-3 px-4 text-gray-400 hover:text-white text-sm transition flex items-center gap-2"
                        >
                            <img src={arrowIcon} alt="" className="w-4 h-4 opacity-60" />
                            Login
                        </Link>
                        <button className="pb-3 px-4 text-blue-400 border-b-2 border-blue-400 font-semibold text-sm flex items-center gap-2">
                            <img src={userPlusIcon} alt="" className="w-4 h-4 invert" />
                            Sign Up
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
                            <div className="relative">
                                <img src={userPlusIcon} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                                <input
                                    type="text"
                                    placeholder="Abhinav Singh"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Email address</label>
                            <div className="relative">
                                <img src={atIcon} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Password</label>
                            <div className="relative">
                                <img src={lockIcon} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    className="w-full pl-11 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition"
                                >
                                    <img src={eyeIcon} alt="toggle" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                        >
                            <img src={userPlusIcon} alt="" className="w-4 h-4 invert" />
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gray-700"></div>
                        <span className="text-gray-500 text-sm">or</span>
                        <div className="flex-1 h-px bg-gray-700"></div>
                    </div>

                    <p className="text-center text-gray-400 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                            Login →
                        </Link>
                    </p>

                    {/* Security note */}
                    <div className="mt-8 flex items-center gap-2 text-gray-500 text-xs justify-center border border-gray-800 rounded-xl p-3">
                        <img src={shieldIcon} alt="" className="w-4 h-4 opacity-50" />
                        <span>Your data is protected with secure encryption.</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;