import axios from "axios";
import React, { useEffect } from "react";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const gradientClasses = [
    "from-purple-500 to-pink-500",
    "from-yellow-400 to-orange-500",
    "from-green-400 to-blue-500",
    "from-red-500 to-yellow-500",
    "from-indigo-500 to-purple-600",
    "from-teal-400 to-cyan-500",
];

const Skills = () => {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);

    // load data --->
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/skills`)
            .then((response) => {
                const data = response.data;
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error form fetching skills data--->", error);
                setLoading(false);
            });
    }, []);

    // check loading--->
    if (loading) {
        return <UpdateLoading />;
    }

    // framer motion variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, type: "spring", stiffness: 80 },
        }),
    };

    // final output --->
    return (
        <div className="grid gap-6 lg:grid-cols-1 p-4">
            {data.map((item, index) => (
                <motion.div
                    key={item._id || index}
                    className={`bg-gradient-to-br ${gradientClasses[index % gradientClasses.length]
                        } backdrop-blur-lg shadow-lg rounded-2xl p-5 border border-white/20 hover:shadow-2xl transition-all`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                >
                    <div className="flex items-center gap-3 mb-3 ">
                        <FaCheckCircle className="text-white text-2xl" />
                        <h2 className="text-xl font-semibold text-white">{item?.skill}</h2>
                    </div>
                    <p className="text-gray-200">{item?.descriptions.slice(0, 300)}</p>
                </motion.div>
            ))}
        </div>
    );
};

export default Skills;