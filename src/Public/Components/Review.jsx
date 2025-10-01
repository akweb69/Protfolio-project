import React, { useEffect, useState } from "react";
import HeadLine from "./HeadLine";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import axios from "axios";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const base_url = import.meta.env.VITE_BASE_URL;

    // load data ---> get all reviews data
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${base_url}/references`)
            .then((res) => {
                setReviews(res.data);
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

    // main output start from here-->
    return (
        <div className="w-11/12 mx-auto">
            <HeadLine title="Reviews" subTitle="Read what our clients say" />

            {/* main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 l gap-6">
                {reviews?.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.2 }}
                        className="relative rounded-2xl p-6 shadow-lg border border-gray-700 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl"
                    >
                        {/* Top section */}
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={item.profileImage}
                                alt={item.name}
                                className="h-16 w-16 rounded-full object-cover border-2 border-cyan-400"
                            />
                            <div>
                                <h4 className="text-white text-lg font-semibold flex items-center gap-2">
                                    {item.name}
                                </h4>
                                <p className="text-gray-400 text-sm">{item.profession}</p>
                                <p className="text-gray-500 text-xs italic">{item.institute}</p>
                            </div>
                        </div>

                        {/* Comment Section */}
                        <div className="relative">
                            <FaQuoteLeft className="text-cyan-400 text-2xl absolute -top-4 -left-2 opacity-70" />
                            <p className="text-gray-300 pl-6 italic">"{item.comment}"</p>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex mt-4 gap-1">
                            {Array.from({ length: item.rating || 5 }).map((_, i) => (
                                <FaStar key={i} className="text-yellow-400" />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Review;
