import React, { useEffect, useState } from "react";
import HeadLine from "./HeadLine";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import { motion } from "framer-motion";
import {
    FaAward,
    FaCalendarAlt,
    FaRegClock,
    FaMedal,
    FaUniversity,
} from "react-icons/fa";

const Trainings = () => {
    const [loading, setLoading] = useState(true);
    const [trainings, setTrainings] = useState([]);
    const base_url = import.meta.env.VITE_BASE_URL;

    // fetch trainings
    useEffect(() => {
        setLoading(true);
        fetch(`${base_url}/trainings`)
            .then((res) => res.json())
            .then((data) => {
                setTrainings(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    // check loading
    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div className="w-11/12 mx-auto py-10">
            <HeadLine
                title="Trainings & Workshops"
                subTitle="Trainings I have participated in"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainings?.map((training, index) => (
                    <motion.div
                        key={training?._id}
                        className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-md border border-gray-700 shadow-lg rounded-2xl overflow-hidden flex flex-col"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
                    >
                        {/* cover photo */}
                        <div className="relative">
                            <img
                                className="w-full h-56 object-cover"
                                src={training?.coverPhoto}
                                alt={training?.trainingName}
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                                <p className="text-white font-semibold">View Training</p>
                            </div>
                        </div>

                        {/* content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                                {training?.trainingName}
                            </h2>
                            <p className="text-gray-300 text-sm mb-4 whitespace-pre-line">
                                {training?.description}
                            </p>

                            <div className="space-y-2 text-gray-200 text-sm flex-grow">
                                <p className="flex items-center gap-2">
                                    <FaUniversity className="text-indigo-400" />{" "}
                                    Institute:  <span>{training?.trainingFrom}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaRegClock className="text-teal-400" />{" "}
                                    Duration: <span>{training?.duration}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaMedal className="text-yellow-400" />{" "}
                                    <span>Merit: {training?.meritPosition}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaAward className="text-pink-400" />{" "}
                                    <span>{training?.award}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-green-400" />{" "}
                                    <span>
                                        {new Date(training?.joiningDate).toLocaleDateString()} →{" "}
                                        {new Date(training?.completedDate).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Trainings;
