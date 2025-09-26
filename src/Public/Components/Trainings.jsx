import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUniversity, FaRegClock, FaMedal, FaAward, FaCalendarAlt } from 'react-icons/fa';
import HeadLine from './HeadLine';
import UpdateLoading from '../../Admin/Components/UpdateLoading';
import toast from 'react-hot-toast';

const Trainings = () => {
    const [loading, setLoading] = useState(true);
    const [trainings, setTrainings] = useState([]);
    const base_url = import.meta.env.VITE_BASE_URL;

    // Fetch trainings
    useEffect(() => {
        setLoading(true);
        fetch(`${base_url}/trainings`)
            .then((res) => res.json())
            .then((data) => {
                setTrainings(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching trainings:', err);
                toast.error('Error fetching trainings');
                setLoading(false);
            });
    }, []);

    // Framer Motion variants for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
        }),
    };

    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <section
            id="trainings"
            className="w-11/12 mx-auto py-12 text-white"
        >
            {/* Animated Headline */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <HeadLine
                    title="Trainings & Workshops"
                    subTitle="Explore My Professional Development"
                />
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {trainings?.map((training, index) => (
                        <motion.div
                            key={training?._id}
                            variants={cardVariants}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                            className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Cover Photo */}
                            {training?.coverPhoto && (
                                <div className="relative">
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        className="w-full h-48 object-cover rounded-t-xl"
                                        src={training.coverPhoto}
                                        alt={training.trainingName}
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white font-semibold text-sm">View Training</p>
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl md:text-2xl font-bold text-teal-400 mb-2">
                                    {training?.trainingName}
                                </h2>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4 whitespace-pre-line">
                                    {training?.description}
                                </p>
                                <div className="space-y-2 text-gray-300 text-sm flex-grow">
                                    <p className="flex items-center gap-2">
                                        <FaUniversity className="text-indigo-400" />
                                        Institute: <span>{training?.trainingFrom}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaRegClock className="text-teal-400" />
                                        Duration: <span>{training?.duration}</span>
                                    </p>
                                    {training?.meritPosition && (
                                        <p className="flex items-center gap-2">
                                            <FaMedal className="text-yellow-400" />
                                            Merit: <span>{training?.meritPosition}</span>
                                        </p>
                                    )}
                                    {training?.award && (
                                        <p className="flex items-center gap-2">
                                            <FaAward className="text-pink-400" />
                                            <span>{training?.award}</span>
                                        </p>
                                    )}
                                    <p className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-green-400" />
                                        <span>
                                            {new Date(training?.joiningDate).toLocaleDateString()} →{' '}
                                            {new Date(training?.completedDate).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Trainings;