import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaComment } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import HeadLine from './HeadLine';
import UpdateLoading from '../../Admin/Components/UpdateLoading';

const Appointments = () => {
    const [loading, setLoading] = useState(false);
    const base_url = import.meta.env.VITE_BASE_URL;

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${base_url}/appointments`, {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                date: e.target.date.value,
                time: e.target.time.value,
                message: e.target.message.value,
            });

            if (res.data.acknowledged) {
                toast.success('Appointment booked successfully');
                e.target.reset();
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            toast.error('Failed to book appointment');
        } finally {
            setLoading(false);
        }
    };

    // Framer Motion variants for form fields
    const fieldVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
        }),
    };

    return (
        <section
            id="appointments"
            className="w-11/12 mx-auto py-12 text-white"
        >
            {/* Animated Headline */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <HeadLine
                    title="Appointments"
                    subTitle="Schedule a Meeting to Collaborate"
                />
            </motion.div>

            {/* Main Content */}
            <main className="lg:grid lg:grid-cols-2 gap-12 items-center mt-10">
                {/* Left Side Image */}
                <motion.div
                    className="flex justify-center items-center w-full"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img
                        className="w-full md:w-[80%] drop-shadow-[0_0_25px_#22d3ee80] rounded-lg"
                        src="https://i.ibb.co.com/TDNYPCfx/pngtree-cartoon-hand-drawn-mobile-appointment-calendar-illustration-png-image-2268817-removebg-previ.png"
                        alt="appointment"
                    />
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-sm bg-gray-800/50 border border-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-teal-400" /> Name
                                </div>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                <div className="flex items-center gap-2">
                                    <FaEnvelope className="text-teal-400" /> Email
                                </div>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            />
                        </motion.div>

                        {/* Phone */}
                        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                                <div className="flex items-center gap-2">
                                    <FaPhone className="text-teal-400" /> Phone
                                </div>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            />
                        </motion.div>

                        {/* Date */}
                        <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-teal-400" /> Date
                                </div>
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            />
                        </motion.div>

                        {/* Time */}
                        <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible" className="md:col-span-2">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-teal-400" /> Time
                                </div>
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            />
                        </motion.div>

                        {/* Message */}
                        <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible" className="md:col-span-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                                <div className="flex items-center gap-2">
                                    <FaComment className="text-teal-400" /> Message
                                </div>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            ></textarea>
                        </motion.div>
                    </div>

                    {/* Submit Button */}
                    <motion.div
                        className="flex justify-end mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Booking...' : 'Book Now'}
                        </button>
                    </motion.div>
                </motion.form>
            </main>
        </section>
    );
};

export default Appointments;
