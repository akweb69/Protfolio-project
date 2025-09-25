import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeadLine from './HeadLine';
import toast from 'react-hot-toast';

const Appoinments = () => {
    const [loading, setLoading] = useState(false);
    const base_url = import.meta.env.VITE_BASE_URL;
    // handle submit
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
                toast.success("Appointment booked successfully")
                e.target.reset();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to book appointment")
        }
        setLoading(false);
    }

    return (
        <div className='w-11/12 mx-auto'>
            {/* headline */}
            <HeadLine
                title="Appoinments"
                subTitle={"Book an appointment with us and let's create something amazing together."}
            />
            {/* main content */}
            <main className="lg:grid lg:grid-cols-2 gap-8 items-center">
                {/* left side icon sections */}
                <div className="flex justify-center items-center w-full">
                    <img
                        className='w-full md:w-[80%]'
                        src="https://i.ibb.co.com/TDNYPCfx/pngtree-cartoon-hand-drawn-mobile-appointment-calendar-illustration-png-image-2268817-removebg-previ.png" alt="" />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-lg bg-white/10 border border-cyan-400/50 
             p-8 rounded-2xl 
             w-full"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-cyan-300 drop-shadow-md"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 p-3 rounded-lg w-full bg-black/30 text-white 
                   border border-cyan-400/40 focus:outline-none focus:ring-2 
                   focus:ring-cyan-400 "
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-cyan-300 drop-shadow-md"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 p-3 rounded-lg w-full bg-black/30 text-white 
                   border border-cyan-400/40 focus:outline-none focus:ring-2 
                   focus:ring-cyan-400 "
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-cyan-300 drop-shadow-md"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="mt-1 p-3 rounded-lg w-full bg-black/30 text-white 
                   border border-cyan-400/40 focus:outline-none focus:ring-2 
                   focus:ring-cyan-400 "
                                required
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-cyan-300 drop-shadow-md"
                            >
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="mt-1 p-3 rounded-lg w-full bg-black/30 text-white 
                   border border-cyan-400/40 focus:outline-none focus:ring-2 
                   focus:ring-cyan-400 "
                                required
                            />
                        </div>

                        {/* Time */}
                        <div className='col-span-2'>
                            <label
                                htmlFor="time"
                                className="block text-sm font-medium text-cyan-300 drop-shadow-md"
                            >
                                Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                className="mt-1 p-3 rounded-lg w-full bg-black/30 text-white 
                   border border-cyan-400/40 focus:outline-none focus:ring-2 
                   focus:ring-cyan-400 "
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="md:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-cyan-300 drop-shadow-md"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="mt-1 p-3 rounded-lg w-full bg-black/30 text-white 
                   border border-cyan-400/40 focus:outline-none focus:ring-2 
                   focus:ring-cyan-400 "
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-cyan-500 text-white font-semibold 
                 shadow-[0_0_10px_#22d3ee,0_0_20px_#22d3ee] hover:shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee] 
                 transition-all duration-300"
                        >
                            {loading ? "Booking..." : "Book Now"}
                        </button>
                    </div>
                </form>

            </main>

        </div>
    );
};

export default Appoinments;