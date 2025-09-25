import React, { useEffect, useState } from "react";
import HeadLine from "./HeadLine";
import axios from "axios";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import { motion } from "framer-motion";
import { FaBuilding, FaCalendarAlt, FaClock } from "react-icons/fa";

const Experiences = () => {
    const [loading, setLoading] = useState(false);
    const [experienceData, setExperienceData] = useState([]);
    const base_url = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${base_url}/experience`)
            .then((res) => {
                setExperienceData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div className="w-11/12 mx-auto py-10 relative overflow-hidden">
            {/* Title */}
            <HeadLine
                title="Experiences"
                subTitle="My work and professional journey"
            />

            {/* Neon vertical line */}
            <div className="absolute left-1/2 top-44 -translate-x-1/2 h-full
             w-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee]"></div>

            {/* Timeline */}
            <main className="relative grid grid-cols-2 gap-y-16">
                {experienceData?.map((exp, index) => (
                    <React.Fragment key={exp._id}>
                        {/* Even index → Right side content */}
                        {index % 2 === 0 ? (
                            <>
                                <div></div>
                                <motion.div
                                    initial={{ opacity: 0, x: 60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative bg-[#0d1224] p-6 rounded-2xl shadow-lg border border-gray-700"
                                >
                                    {/* Dot on line */}
                                    <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee,0_0_20px_#22d3ee]"></span>

                                    <h2 className="text-xl font-semibold text-white mb-2">
                                        {exp.role}
                                    </h2>
                                    <p className="flex items-center gap-2 text-gray-300 text-sm mb-1">
                                        <FaBuilding className="text-blue-400" /> {exp.where}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-300 text-sm mb-1">
                                        <FaCalendarAlt className="text-green-400" /> {exp.joiningDate} -{" "}
                                        {exp.resignDate}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                                        <FaClock className="text-yellow-400" /> {exp.duration}
                                    </p>
                                    <p className="text-gray-400 text-sm">{exp.description}</p>
                                    {/* why sections */}
                                    {
                                        exp?.isWhy === "Yes" && (
                                            <div className="mt-4 p-4 bg-[#0d1224] rounded-xl border border-gray-700">
                                                <h3 className="text-lg font-semibold text-white mb-2">
                                                    Why I Resigned
                                                </h3>
                                                <p className="text-gray-400 text-sm">{exp.why}</p>
                                            </div>
                                        )
                                    }
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, x: -60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative bg-[#0d1224]  p-6 rounded-2xl shadow-lg border border-gray-700"
                                >
                                    {/* Dot on line */}
                                    <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee,0_0_20px_#22d3ee]"></span>

                                    <h2 className="text-xl font-semibold text-white mb-2">
                                        {exp.role}
                                    </h2>
                                    <p className="flex items-center gap-2 text-gray-300 text-sm mb-1">
                                        <FaBuilding className="text-blue-400" /> {exp.where}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-300 text-sm mb-1">
                                        <FaCalendarAlt className="text-green-400" /> {exp.joiningDate} -{" "}
                                        {exp.resignDate}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                                        <FaClock className="text-yellow-400" /> {exp.duration}
                                    </p>
                                    <p className="text-gray-400 text-sm">{exp.description}</p>
                                </motion.div>
                                <div></div>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </main>
        </div>
    );
};

export default Experiences;
