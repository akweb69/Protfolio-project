import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import UpdateLoading from '../../Admin/Components/UpdateLoading';

const Hero = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
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
                console.error('Error fetching hero data:', err);
                toast.error('Error fetching hero data');
                setLoading(false);
            });
    }, []);

    // Typing effect for typeText
    useEffect(() => {
        if (data.length === 0) return;

        const texts = data[0]?.typeText?.split(',') || [];
        if (texts.length === 0) return;

        if (charIndex < texts[textIndex].length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + texts[textIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayText('');
                setCharIndex(0);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, textIndex, data]);

    if (loading) {
        return <UpdateLoading />;
    }

    // Framer Motion variants for text content
    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    // Framer Motion variants for image
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, type: 'spring', stiffness: 100 } },
    };

    return (
        <section className="flex w-full min-h-[90vh] items-center justify-center">
            <div className="w-11/12 md:w-10/12  mx-auto md:grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center md:text-left"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 text-teal-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        {data[0]?.title || 'Welcome to My Portfolio'}
                    </h1>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-4 text-gray-200">
                        {data[0]?.subtitle || 'Crafting Digital Experiences'}
                    </h2>
                    {/* Typing Effect */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={textIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-xl md:text-3xl font-bold mb-4 text-teal-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        >
                            {displayText}
                            <span className="animate-pulse">|</span>
                        </motion.div>
                    </AnimatePresence>
                    <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        {data[0]?.descriptions ||
                            'Explore my work and discover how I bring ideas to life with creativity and precision.'}
                    </p>
                    {/* Button */}
                    <motion.div
                        className="flex justify-center md:justify-start gap-4 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-full font-semibold text-white text-lg shadow-lg transition-all duration-300"
                        >
                            {data[0]?.btnName || 'Discover More'} <FaArrowRight />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative flex justify-center md:justify-end mt-8 md:mt-0"
                >
                    <div className="relative rounded-full overflow-hidden w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-teal-400/50"
                            animate={{
                                boxShadow: [
                                    '0 0 10px rgba(34, 211, 238, 0.5)',
                                    '0 0 20px rgba(34, 211, 238, 0.8)',
                                    '0 0 10px rgba(34, 211, 238, 0.5)',
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <img
                            src={data[0]?.profileImage || 'https://via.placeholder.com/300x300.png?text=Profile'}
                            className="w-full h-full object-cover rounded-full relative z-10"
                            alt="Profile"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
