import React from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 via-black to-indigo-900 text-white">
            <motion.div
                className="text-center p-8 rounded-2xl shadow-2xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                style={{
                    boxShadow: "0 0 30px rgba(0, 255, 255, 0.7), 0 0 60px rgba(255, 0, 255, 0.6)",
                }}
            >
                <motion.h1
                    className="text-7xl font-bold neon-text mb-4"
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        textShadow:
                            "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff",
                    }}
                >
                    404
                </motion.h1>
                <motion.p
                    className="text-xl mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Oops! The page you are looking for doesn’t exist.
                </motion.p>
                <motion.a
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    style={{
                        boxShadow: "0 0 15px cyan, 0 0 30px magenta",
                    }}
                >
                    <FaHome /> Go Home
                </motion.a>
            </motion.div>
        </div>
    );
};

export default NotFound;
