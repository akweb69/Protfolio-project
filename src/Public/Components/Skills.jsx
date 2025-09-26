import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import UpdateLoading from '../../Admin/Components/UpdateLoading';

const gradientClasses = [
    'from-teal-500/30 to-cyan-500/30',
    'from-purple-500/30 to-indigo-500/30',
    'from-green-500/30 to-emerald-500/30',
    'from-blue-500/30 to-sky-500/30',
    'from-red-500/30 to-rose-500/30',
    'from-yellow-500/30 to-orange-500/30',
];

const Skills = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    // Load data
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/skills`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching skills data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <UpdateLoading />;
    }

    // Framer Motion variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.2, type: 'spring', stiffness: 80 },
        }),
    };

    return (
        <div className="grid gap-6 lg:grid-cols-1 ">
            <AnimatePresence>
                {data.map((item, index) => (
                    <motion.div
                        key={item._id || index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                        className={`relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br ${gradientClasses[index % gradientClasses.length]}`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <FaCheckCircle className="text-teal-400 text-2xl" />
                            <h2 className="text-xl font-semibold text-white">{item?.skill}</h2>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{item?.descriptions.slice(0, 300)}</p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Skills;