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
                    {/* Social Icons */}
                    <div className="flex justify-center md:justify-start gap-4 mt-6">
                        <a href={data[0]?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href={data[0]?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                        </a>
                        <a href={`https://wa.me/${data[0]?.whatsapp || ''}`} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-2.036-7.23c1.003 0 1.816-.813 1.816-1.816s-.813-1.816-1.816-1.816-1.816.813-1.816 1.816.813 1.816 1.816 1.816M12.051 0C5.431 0 .008 5.424.008 12.045c0 2.126.557 4.165 1.608 5.958L.056 23.694c-.023.393.274.74.666.74.143 0 .286-.043.408-.126l5.116-2.994c1.63.628 3.423.96 5.264.96 6.62 0 12.043-5.424 12.043-12.044C24.094 5.424 18.671.001 12.051.001z" /></svg>
                        </a>
                        <a href={`mailto:${data[0]?.email || ''}`} className="text-teal-400 hover:text-teal-300 transition">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24V3H0zm21.6 2L12 11.25 2.4 5h19.2zM2 19V7.2l10 7.5L22 7.2V19H2z" /></svg>
                        </a>
                    </div>
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
