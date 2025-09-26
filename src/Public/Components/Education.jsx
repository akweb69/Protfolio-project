import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUniversity, FaMapMarkerAlt, FaCalendarAlt, FaAward } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { GiRank3 } from 'react-icons/gi';
import UpdateLoading from '../../Admin/Components/UpdateLoading';
import toast from 'react-hot-toast';

const Education = () => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // Fetch all educations
    const fetchEducations = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/educations`);
            setEducations(res.data);
        } catch (err) {
            console.error('Error fetching educations:', err);
            toast.error('Error fetching educations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    if (loading) {
        return <UpdateLoading />;
    }

    // Framer Motion variants for card animation
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
        }),
    };

    return (
        <div className="grid gap-6">
            {educations?.length === 0 && (
                <motion.p
                    className="text-gray-400 text-center text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    No education added yet.
                </motion.p>
            )}

            <AnimatePresence>
                {educations?.map((edu, idx) => (
                    <motion.div
                        key={edu._id}
                        variants={cardVariants}
                        custom={idx}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                        className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    >
                        {/* Institute Logo */}
                        {edu.instituteLogo && (
                            <motion.img
                                whileHover={{ scale: 1.1 }}
                                src={edu.instituteLogo}
                                alt={edu.instituteName}
                                className="w-16 h-16 rounded-full border border-gray-600 object-cover shadow-md"
                            />
                        )}

                        {/* Education Info */}
                        <div className="flex-1 space-y-3">
                            <h3 className="text-xl font-bold text-teal-400 flex items-center gap-2">
                                <MdSchool className="text-teal-400" /> {edu.degreeName}
                            </h3>

                            <p className="text-gray-300 text-sm flex items-center gap-2">
                                <FaUniversity className="text-teal-400" /> {edu.instituteName}
                            </p>

                            <p className="text-gray-300 text-sm flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-400" /> {edu.location}
                            </p>

                            <p className="text-gray-300 text-sm flex items-center gap-2">
                                <FaCalendarAlt className="text-yellow-400" /> Session: {edu.session} | Duration: {edu.courseDuration}
                            </p>
                            <p className="text-gray-300 text-sm flex items-center gap-2">
                                <FaCalendarAlt className="text-yellow-400" /> Passing Year: {edu.passingYear}
                            </p>

                            <p className="text-gray-300 text-sm">
                                GPA: <span className="text-green-400">{edu.gpa}</span> | CGPA: <span className="text-blue-400">{edu.cgpa}</span>
                            </p>

                            <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>

                            {edu.meritPosition && (
                                <p className="text-pink-400 text-sm flex items-center gap-2 font-medium">
                                    <GiRank3 /> Merit Position: {edu.meritPosition}
                                </p>
                            )}

                            {edu.hasAward === 'yes' && edu.award && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-4 p-4 rounded-lg bg-gray-700/30 border border-gray-600 shadow-inner"
                                >
                                    <p className="text-yellow-400 font-semibold flex items-center gap-2">
                                        <FaAward /> Award
                                    </p>
                                    <p className="text-sm text-gray-200">{edu.award.name}</p>
                                    <p className="text-sm text-gray-300">
                                        {edu.award.instituteName} — {edu.award.location}
                                    </p>
                                    <p className="text-sm text-gray-400">{edu.award.date}</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Education;