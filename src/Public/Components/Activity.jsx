import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import HeadLine from './HeadLine';
import UpdateLoading from '../../Admin/Components/UpdateLoading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Activity = () => {
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const base_url = import.meta.env.VITE_BASE_URL;

    // Load data
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${base_url}/activity`)
            .then((res) => {
                setActivities(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching activity data:', error);
                toast.error('Error fetching activity data.');
                setLoading(false);
            });
    }, []);

    // Custom Arrows
    const CustomPrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-teal-600/80 text-white p-3 rounded-full hover:bg-teal-700 transition-transform hover:scale-110 z-10 shadow-md"
        >
            <FaChevronLeft size={18} />
        </button>
    );

    const CustomNextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-teal-600/80 text-white p-3 rounded-full hover:bg-teal-700 transition-transform hover:scale-110 z-10 shadow-md"
        >
            <FaChevronRight size={18} />
        </button>
    );

    // React-slick settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        dotsClass: 'slick-dots custom-dots',
        customPaging: () => (
            <div className="w-3 h-3 bg-teal-400 rounded-full opacity-50 hover:opacity-100 transition-opacity"></div>
        ),
    };

    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <section
            id="activities"
            className="w-11/12 mx-auto py-12 text-white"
        >
            {/* Animated Headline */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <HeadLine
                    title="Activities"
                    subTitle="Moments That Shape My Journey"
                />
            </motion.div>

            {/* Main Content */}
            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {activities.map((activity, index) => (
                            <motion.div
                                key={activity._id}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2, ease: 'easeOut' } },
                                }}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                                className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
                            >
                                {/* Cover Photo Slider */}
                                {activity?.coverPhotos?.length > 0 && (
                                    <div className="relative w-full overflow-hidden rounded-t-xl">
                                        <Slider {...settings}>
                                            {activity.coverPhotos.map((photo, i) => (
                                                <motion.img
                                                    key={i}
                                                    src={photo}
                                                    alt={activity.activityTitle}
                                                    className="w-full h-56 md:h-64 object-cover"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            ))}
                                        </Slider>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="flex items-center gap-2 text-xl font-semibold text-teal-400 mb-3">
                                        <FaRegCalendarAlt className="text-orange-400" />
                                        {activity.activityTitle}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed bg-gray-700/30 rounded-lg p-4 shadow-inner whitespace-pre-wrap overflow-scroll">
                                        {activity?.activityDescription}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </section>
    );
};

// Custom CSS for slick dots
const styles = `
  .custom-dots li {
    margin: 0 4px;
  }
  .custom-dots li.slick-active div {
    opacity: 1;
    transform: scale(1.2);
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Activity;