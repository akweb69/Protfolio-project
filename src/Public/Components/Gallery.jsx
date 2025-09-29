import axios from "axios";
import { useEffect, useState } from "react";
import UpdateLoading from "../../Admin/Components/UpdateLoading";

const Gallery = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    // load data ---> get all gallery data
    useEffect(() => {
        // set loading true
        setLoading(true)
        // get all gallery data
        axios.get(`${import.meta.env.VITE_BASE_URL}/gallery`)
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }, [])
    // check loading
    if (loading) {
        return <UpdateLoading></UpdateLoading>
    }
    // main component ---> render gallery data
    return (
        <div>
            {/* render gallery data */}
            {data?.map((item) => (
                <div
                    key={item?._id}
                    className="bg-gray-100 p-4 rounded shadow relative"
                >
                    <img
                        src={item?.image}
                        alt={item?.title || 'Gallery Image'}
                        className="w-full h-40 object-cover rounded"
                    />
                    <h3 className="mt-2 font-semibold">{item?.title || 'No Title'}</h3>
                </div>
            ))}
        </div>
    );
};

export default Gallery;