import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";

const Training = () => {
    const [formData, setFormData] = React.useState({
        descriptions: "", name: "",
    });
    // handle loading
    const [loading, setLoading] = React.useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    // load default value
    useEffect(() => {
        setLoading(true)
        axios
            .get(`${BASE_URL}/about-section`)
            .then((response) => {
                setFormData(response.data[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching about section data:", error);
                toast.error("Error fetching about section data.");
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const id = "68cbd163653bd1b3d06c40aa"
        try {
            const response = await axios.patch(
                `${BASE_URL}/update-about-section/${id}`,
                formData
            );
            console.log("About section updated successfully:", response.data);
            toast.success("About section updated successfully!");
        } catch (error) {
            console.error("Error updating about section:", error);
            toast.error("Error updating about section.");
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <UpdateLoading></UpdateLoading>
        )
    }

    return (
        <div className="w-full h-full bg-black/10 backdrop-blur-md shadow-lg rounded-2xl p-6">
            <h2 className="text-white text-3xl font-bold mb-2">Update About Section</h2>
            <p className="text-gray-300">Manage the about  section content and settings.</p>
            <div className="divider"></div>
            <form
                onSubmit={handleSubmit}
                className="mt-6 grid md:grid-cols-2 gap-6 text-white"
            >
                {/* Hero Name */}
                <div>
                    <label htmlFor="name" className="block text-sm mb-1 font-medium">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter hero name..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>
                {/* Descriptions */}
                <div className="md:col-span-2">
                    <label htmlFor="descriptions" className="block text-sm mb-1 font-medium">
                        About Descriptions
                    </label>
                    <textarea
                        id="descriptions"
                        name="descriptions"
                        value={formData.descriptions}
                        onChange={handleChange}
                        placeholder="Write short description..."
                        rows={10}
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-accent text-black hover:bg-accent/80 font-semibold py-2 px-6 rounded-xl shadow-md transition disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update About Section"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Training;
