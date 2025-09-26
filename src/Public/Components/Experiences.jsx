import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBuilding, FaCalendarAlt, FaClock } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import HeadLine from './HeadLine';
import UpdateLoading from '../../Admin/Components/UpdateLoading';

const Experiences = () => {
    const [loading, setLoading] = useState(false);
    const [experienceData, setExperienceData] = useState([]);
    const base_url = import.meta.env.VITE_BASE_URL;

    // Fetch experiences
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${base_url}/experience`)
            .then((res) => {
                setExperienceData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching experiences:', err);
                toast.error('Error fetching experiences');
                setLoading(false);
            });
    }, []);

    // Framer Motion variants for cards
    const cardVariants = {
        hidden: { opacity: 0, x: (index) => (index % 2 === 0 ? 60 : -60) },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <section
            id="experiences"
            className="w-11/12 mx-auto py-12 text-white relative overflow-hidden"
        >
            {/* Animated Headline */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <HeadLine
                    title="Experiences"
                    subTitle="My Professional Journey"
                />
            </motion.div>

            {/* Neon Vertical Timeline Line */}
            <div className="absolute left-1/2 top-48 -translate-x-1/2 h-[calc(100%-8rem)] w-1 bg-teal-400 shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee] hidden md:block"></div>

            {/* Timeline */}
            <main className="relative grid grid-cols-1 md:grid-cols-2 gap-y-12 mt-8">
                <AnimatePresence>
                    {experienceData?.map((exp, index) => (
                        <React.Fragment key={exp._id}>
                            {/* Even index → Right side content */}
                            {index % 2 === 0 ? (
                                <>
                                    <div className="hidden md:block"></div>
                                    <motion.div
                                        variants={cardVariants}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                                        className="relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 md:ml-8"
                                    >
                                        {/* Dot on line */}
                                        <span className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-teal-400 shadow-[0_0_10px_#22d3ee,0_0_20px_#22d3ee] hidden md:block"></span>

                                        <h2 className="text-xl md:text-2xl font-semibold text-teal-400 mb-3">{exp.role}</h2>
                                        <div className="space-y-2 text-gray-300 text-sm mb-4">
                                            <p className="flex items-center gap-2">
                                                <FaBuilding className="text-blue-400" /> {exp.where}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-green-400" /> {exp.joiningDate} -{' '}
                                                {exp.resignDate || 'Present'}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <FaClock className="text-yellow-400" /> {exp.duration}
                                            </p>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                                        {exp?.isWhy === 'Yes' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600 shadow-inner"
                                            >
                                                <h3 className="text-lg font-semibold text-teal-400 mb-2">Why I Resigned</h3>
                                                <p className="text-gray-300 text-sm">{exp.why}</p>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        variants={cardVariants}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                                        className="relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 md:mr-8"
                                    >
                                        {/* Dot on line */}
                                        <span className="absolute -right-5 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-teal-400 shadow-[0_0_10px_#22d3ee,0_0_20px_#22d3ee] hidden md:block"></span>

                                        <h2 className="text-xl md:text-2xl font-semibold text-teal-400 mb-3">{exp.role}</h2>
                                        <div className="space-y-2 text-gray-300 text-sm mb-4">
                                            <p className="flex items-center gap-2">
                                                <FaBuilding className="text-blue-400" /> {exp.where}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-green-400" /> {exp.joiningDate} -{' '}
                                                {exp.resignDate || 'Present'}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <FaClock className="text-yellow-400" /> {exp.duration}
                                            </p>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                                        {exp?.isWhy === 'Yes' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600 shadow-inner"
                                            >
                                                <h3 className="text-lg font-semibold text-teal-400 mb-2">Why I Resigned</h3>
                                                <p className="text-gray-300 text-sm">{exp.why}</p>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                    <div className="hidden md:block"></div>
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </AnimatePresence>
            </main>
        </section>
    );
};

export default Experiences;
