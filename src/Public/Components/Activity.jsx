import React, { useEffect, useState } from "react";
import HeadLine from "./HeadLine";
import axios from "axios";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Activity = () => {
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    // base url
    const base_url = import.meta.env.VITE_BASE_URL;

    // load data
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${base_url}/activity`)
            .then((res) => {
                setActivities(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error from getting activity-->", error);
                setLoading(false);
            });
    }, []);

    // Custom Arrows
    const CustomPrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-teal-600 to-teal-800 text-white p-2 rounded-full hover:scale-110 transition z-10 shadow-md"
        >
            <FaChevronLeft size={18} />
        </button>
    );

    const CustomNextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-l from-teal-600 to-teal-800 text-white p-2 rounded-full hover:scale-110 transition z-10 shadow-md"
        >
            <FaChevronRight size={18} />
        </button>
    );

    // react-slick settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    // check loading
    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div
            id='activities'
            className="w-11/12 mx-auto">
            {/* headline */}
            <HeadLine
                title="Activity"
                subTitle={"Discover the moments that define our journey and experiences."}
            />

            {/* main content */}
            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={activity._id}
                            className="bg-gradient-to-br from-white via-teal-50 to-teal-100 text-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition relative"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            {/* cover photo slider */}
                            <div className="relative w-full overflow-hidden rounded-xl shadow-md">
                                <Slider {...settings}>
                                    {activity?.coverPhotos?.map((photo, i) => (
                                        <img
                                            key={i}
                                            src={photo}
                                            alt={activity.activityTitle}
                                            className="w-full h-56 md:h-72 object-cover rounded-xl"
                                        />
                                    ))}
                                </Slider>
                            </div>

                            {/* Content */}
                            <motion.div
                                className="mt-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="flex items-center gap-2 text-xl font-semibold text-teal-800 mb-2">
                                    <FaRegCalendarAlt className="text-orange-600" />
                                    {activity.activityTitle}
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600 bg-white/70 overflow-auto rounded-lg p-3 shadow-sm whitespace-pre-wrap">
                                    {activity?.activityDescription}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Activity;
