import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import { X } from "lucide-react"; // close icon

const Nav = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    // load data
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/hero-section`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching hero section data:", error);
                setLoading(false);
            });
    }, []);

    // check loading state
    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div className="w-full py-4">
            <div className="max-w-5xl mx-auto px-6">
                <div className="w-full flex justify-between items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-6 py-3">
                    {/* Left: profile */}
                    <div className="flex items-center gap-3">
                        {data[0]?.profileImage && (
                            <img
                                src={data[0].profileImage}
                                alt={data[0]?.name || "profile"}
                                className="w-12 h-12 rounded-full object-cover border border-white/30 shadow-md p-0.5 "
                            />
                        )}
                        <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide">
                            {data[0]?.name || "Loading..."}
                        </h2>
                    </div>

                    {/* Right: nav links */}
                    <div className="hidden md:flex items-center gap-6 text-white font-medium">
                        <Link to={"/"} className="hover:text-blue-400 transition-colors">
                            Home
                        </Link>
                        <Link to={"/about"} className="hover:text-blue-400 transition-colors">
                            About
                        </Link>
                        <Link
                            to={"/projects"}
                            className="hover:text-blue-400 transition-colors"
                        >
                            Projects
                        </Link>
                        <Link to={"/blogs"} className="hover:text-blue-400 transition-colors">
                            Blogs
                        </Link>
                        <Link
                            to={"/contact"}
                            className="hover:text-blue-400 transition-colors"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="text-white text-2xl focus:outline-none hover:text-blue-400 transition-colors duration-200"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
                    {/* Slide-in menu */}
                    <div className="w-3/4 sm:w-1/2 md:w-1/3 h-full bg-gray-900 text-white shadow-lg flex flex-col p-6 animate-slideIn">
                        {/* Close button */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-semibold">
                                {data[0]?.name || "Menu"}
                            </h2>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="text-white hover:text-red-400 transition"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Menu Links */}
                        <nav className="flex flex-col gap-6 text-lg font-medium">
                            <Link
                                to={"/"}
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-blue-400 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to={"/about"}
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-blue-400 transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                to={"/projects"}
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-blue-400 transition-colors"
                            >
                                Projects
                            </Link>
                            <Link
                                to={"/blogs"}
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-blue-400 transition-colors"
                            >
                                Blogs
                            </Link>
                            <Link
                                to={"/contact"}
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-blue-400 transition-colors"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
