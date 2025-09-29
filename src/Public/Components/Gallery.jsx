import axios from "axios";
import { useEffect, useState } from "react";
import UpdateLoading from "../../Admin/Components/UpdateLoading";
import HeadLine from "./HeadLine";

const Gallery = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    // load data ---> get all gallery data
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/gallery`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div className="w-11/12 mx-auto">
            <HeadLine title="Gallery" subTitle={"Explore stunning gallery"} />

            {/* Masonry Layout */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
                {data?.map((item) => (
                    <div
                        key={item?._id}
                        className="relative overflow-hidden rounded-lg break-inside-avoid"
                    >
                        <img
                            src={item?.image}
                            alt={item?.title || "Gallery Image"}
                            className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <h3 className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-xs md:text-sm rounded">
                            {item?.title || "No Title"}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
