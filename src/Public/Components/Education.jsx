import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// icons
import { FaUniversity, FaMapMarkerAlt, FaCalendarAlt, FaAward } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { GiRank3 } from "react-icons/gi";

const Education = () => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // fetch all educations
    const fetchEducations = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/educations`);
            setEducations(res.data);
        } catch (err) {
            console.error("Error fetching educations:", err);
            toast.error("Error fetching educations");
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

    return (
        <div className="grid gap-6">
            {educations?.length === 0 && (
                <p className="text-gray-400 text-center">No education added yet.</p>
            )}

            {educations?.map((edu, idx) => (
                <motion.div
                    key={edu._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    whileHover={{ scale: 1.03 }}
                    className="relative bg-teal-500/3 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 items-start overflow-hidden group"
                >
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-accent/50 transition-all duration-300"></div>

                    {/* Logo */}
                    {edu.instituteLogo && (
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            src={edu.instituteLogo}
                            alt={edu.instituteName}
                            className="w-20 h-full rounded-full border border-white/20 shadow-md object-cover"
                        />
                    )}

                    {/* Info */}
                    <div className="flex-1 space-y-2 z-10">
                        <h3 className="text-xl font-bold text-accent flex items-center gap-2">
                            <MdSchool className="text-accent" /> {edu.degreeName}
                        </h3>

                        <p className="text-gray-200 text-sm flex items-center gap-2">
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

                        <p className="text-gray-400 text-sm">{edu.description}</p>

                        {edu.meritPosition && (
                            <p className="text-pink-400 text-sm flex items-center gap-2 font-medium">
                                <GiRank3 /> Merit Position: {edu.meritPosition}
                            </p>
                        )}

                        {edu.hasAward === "yes" && edu.award && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="mt-3 p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-inner"
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
        </div>
    );
};

export default Education;
