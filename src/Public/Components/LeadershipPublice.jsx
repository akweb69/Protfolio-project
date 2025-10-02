import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaCalendarAlt } from "react-icons/fa";
import HeadLine from "./HeadLine";
import UpdateLoading from "../../Admin/Components/UpdateLoading";


const LeadershipPublic = () => {
    const [leaderships, setLeaderships] = useState([]);
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // Fetch leadership data
    useEffect(() => {
        const fetchLeaderships = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/leadership`);
                setLeaderships(response.data);
            } catch (error) {
                console.error("Error fetching leadership data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderships();
    }, [BASE_URL]);

    if (loading) return <UpdateLoading />;

    return (
        <div className="w-11/12 mx-auto py-12">
            <HeadLine title="Leadership" subTitle="Our Leadership Journey" />
            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
                <AnimatePresence>
                    {leaderships.length === 0 ? (
                        <p className="text-center text-gray-300">No leadership entries available.</p>
                    ) : (
                        leaderships.map((leadership, index) => (
                            <motion.div
                                key={leadership._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className={`flex items-center mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                                    }`}
                            >
                                <div className="w-1/2 px-4">
                                    <div className="bg-black/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-500">
                                        {leadership.image && (
                                            <img
                                                src={leadership.image}
                                                alt={leadership.title}
                                                className="w-full h-48 object-cover rounded-md mb-4"
                                            />
                                        )}
                                        <h3 className="text-xl font-bold text-white">{leadership.title}</h3>
                                        <p className="text-gray-300">{leadership.subtitle}</p>
                                        <p className="text-gray-400 mt-2 whitespace-pre-line">{leadership.description}</p>
                                        <div className="flex items-center gap-2 mt-4">
                                            <FaCalendarAlt className="text-accent" />
                                            <span className="text-gray-300">
                                                {new Date(leadership.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {leadership.achievement && (
                                            <div className="flex items-center gap-2 mt-2">
                                                <FaTrophy className="text-yellow-500" />
                                                <span className="text-gray-300">{leadership.achievement}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2"></div>
                                {/* Timeline Dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full"></div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LeadershipPublic;
