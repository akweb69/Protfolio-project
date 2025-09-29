import axios from "axios";
import { useEffect, useState } from "react";
import UpdateLoading from "../../Admin/Components/UpdateLoading";

const Gallery = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    // load data
    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_BASE_URL}/gallery`)
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    // check loading
    if (loading) {
        return <UpdateLoading></UpdateLoading>
    }
    // main component
    return (
        <div>
            fdfd
        </div>
    );
};

export default Gallery;