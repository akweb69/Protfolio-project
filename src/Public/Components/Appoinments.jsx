import axios from "axios";
import React, { useState } from "react";
import HeadLine from "./HeadLine";
import toast from "react-hot-toast";

const Appointments = () => {
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
                toast.success("Appointment booked successfully");
                e.target.reset();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to book appointment");
        }
        setLoading(false);
    };

    return (
        <div
            id="appointments"
            className="w-11/12 mx-auto py-16 "
        >
            {/* headline */}
            <HeadLine
                title="Appointments"
                subTitle="Book an appointment with us and let's create something amazing together."
            />

            {/* main content */}
            <main className="lg:grid lg:grid-cols-2 gap-12 items-center mt-10">
                {/* left side icon sections */}
                <div className="flex justify-center items-center w-full">
                    <img
                        className="w-full md:w-[80%] drop-shadow-[0_0_25px_#22d3ee80]"
                        src="https://i.ibb.co.com/TDNYPCfx/pngtree-cartoon-hand-drawn-mobile-appointment-calendar-illustration-png-image-2268817-removebg-previ.png"
                        alt="appointment"
                    />
                </div>

                {/* form */}
                <form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-xl bg-gray-900/70 border border-gray-700 
  p-8 rounded-2xl w-full text-white shadow-lg"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-800 text-white 
        border border-gray-700 focus:outline-none 
        focus:ring-2 focus:ring-cyan-500 transition-all"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-800 text-white 
        border border-gray-700 focus:outline-none 
        focus:ring-2 focus:ring-cyan-500 transition-all"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-800 text-white 
        border border-gray-700 focus:outline-none 
        focus:ring-2 focus:ring-cyan-500 transition-all"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-800 text-white 
        border border-gray-700 focus:outline-none 
        focus:ring-2 focus:ring-cyan-500 transition-all"
                                required
                            />
                        </div>

                        {/* Time */}
                        <div className="md:col-span-2">
                            <label
                                htmlFor="time"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-800 text-white 
        border border-gray-700 focus:outline-none 
        focus:ring-2 focus:ring-cyan-500 transition-all"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="md:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="mt-1 p-3 rounded-lg w-full bg-gray-800 text-white 
        border border-gray-700 focus:outline-none 
        focus:ring-2 focus:ring-cyan-500 transition-all"
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 
      text-white font-semibold transition-all duration-300"
                        >
                            {loading ? "Booking..." : "Book Now"}
                        </button>
                    </div>
                </form>

            </main>
        </div>
    );
};

export default Appointments;
