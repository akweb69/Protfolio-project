import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    // Load data
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/hero-section`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    // Typing effect for typeText
    useEffect(() => {
        if (data.length === 0) return;

        const texts = data[0]?.typeText?.split(",") || [];
        if (texts.length === 0) return;

        if (charIndex < texts[textIndex].length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + texts[textIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayText("");
                setCharIndex(0);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, textIndex, data]);

    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div className=" flex w-full  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-11/12   mx-auto md:grid grid-cols-2 gap-8 items-center justify-center">

                {/* Text Content */}
                <motion.div
                    className=" text-center lg:text-left"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
                        {data[0]?.title || "Welcome to My Portfolio"}
                    </h1>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-6 font-medium">
                        {data[0]?.subtitle || "Crafting Digital Experiences"}
                    </h2>

                    {/* Typing Effect */}
                    <div className="h-10 sm:h-12 text-cyan-400 font-semibold text-2xl sm:text-3xl lg:text-4xl mb-6">
                        {displayText}
                        <span className="animate-pulse">|</span>
                    </div>

                    <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        {data[0]?.descriptions ||
                            "Explore my work and discover how I bring ideas to life with creativity and precision."}
                    </p>

                    {/* Button */}
                    <div className="flex items-center flex-col md:flex-row gap-5">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-white text-lg shadow-xl transition-all duration-300"
                        >
                            {data[0]?.btnName || "Discover More"} <FaArrowRight />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-white text-lg shadow-xl transition-all duration-300"
                        >
                            Discover More <FaArrowRight />
                        </motion.button>
                    </div>
                </motion.div>
                {/* Profile Image with Animated Border and Shadow */}
                <motion.div
                    className="relative flex justify-center md:justify-end "
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100 }}
                >
                    <div className="relative rounded-full overflow-hidden w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 border-4 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gray-900 opacity-75"
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    "0 0 10px rgba(0, 255, 255, 0.5)",
                                    "0 0 20px rgba(0, 255, 255, 0.8)",
                                    "0 0 10px rgba(0, 255, 255, 0.5)",
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <img
                            src={
                                data[0]?.profileImage ||
                                "https://via.placeholder.com/300x300.png?text=Profile"
                            }
                            className="w-full h-full object-cover rounded-full relative z-10"
                            alt="Profile"
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default HomePage;