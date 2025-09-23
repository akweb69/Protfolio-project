import React, { useEffect, useState } from "react";
import HeadLine from "./HeadLine";
import axios from "axios";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black z-10"
        >
            <FaChevronLeft size={18} />
        </button>
    );

    const CustomNextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black z-10"
        >
            <FaChevronRight size={18} />
        </button>
    );

    // react-slick settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    // check loading
    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div className="w-11/12 mx-auto">
            {/* headline */}
            <HeadLine title="Activity" subTitle={"Discover the moments that define our journey and experiences."} />

            {/* main content */}
            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {activities.map((activity) => (
                        <div
                            key={activity._id}
                            className="bg-teal-100 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
                        >
                            {/* cover photo slider */}
                            <div className="relative w-full overflow-hidden rounded-lg">
                                <Slider {...settings}>
                                    {activity?.coverPhotos?.map((photo, i) => (
                                        <img
                                            key={i}
                                            src={photo}
                                            alt={activity.activityTitle}
                                            className="w-full h-52 md:h-72 object-cover rounded-lg"
                                        />
                                    ))}
                                </Slider>
                            </div>

                            <div className="mt-3">
                                <h3 className="text-lg bg-orange-800/20 p-2 rounded-lg mb-4 font-bold text-black">
                                    {activity.activityTitle}
                                </h3>
                                <p className="text-sm bg-teal-800/20 rounded-lg p-2 text-gray-600 whitespace-pre-line">
                                    {activity?.activityDescription}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Activity;
