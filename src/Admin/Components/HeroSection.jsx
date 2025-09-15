import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";

const HeroSection = () => {
    const [formData, setFormData] = React.useState({
        title: "",
        subtitle: "",
        typeText: "",
        descriptions: "",
        btnName: "",
        name: "",
        profileImage: "",
    });
    // handle loading
    const [loading, setLoading] = React.useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // image upload to imgbb
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const imgData = new FormData();
        imgData.append("image", file);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
                imgData
            );
            const imageUrl = res.data.data.url;

            setFormData((prevData) => ({
                ...prevData,
                profileImage: imageUrl,
            }));

            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Image upload failed!");
        } finally {
            setLoading(false);
        }
    };

    // load default value
    useEffect(() => {
        setLoading(true)
        axios
            .get(`${BASE_URL}/hero-section`)
            .then((response) => {
                setFormData(response.data[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching hero section data:", error);
                toast.error("Error fetching hero section data.");
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.patch(
                `${BASE_URL}/update-hero-section`,
                formData
            );

            console.log("Hero section updated successfully:", response.data);
            toast.success("Hero section updated successfully!");
        } catch (error) {
            console.error("Error updating hero section:", error);
            toast.error("Error updating hero section.");
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
            <h2 className="text-white text-3xl font-bold mb-2">Update Hero Section</h2>
            <p className="text-gray-300">Manage the hero section content and settings.</p>

            <form
                onSubmit={handleSubmit}
                className="mt-6 grid md:grid-cols-2 gap-6 text-white"
            >
                {/* Hero Title */}
                <div>
                    <label htmlFor="title" className="block text-sm mb-1 font-medium">
                        Hero Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter hero title..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                {/* Hero Subtitle */}
                <div>
                    <label htmlFor="subtitle" className="block text-sm mb-1 font-medium">
                        Hero Subtitle
                    </label>
                    <input
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        placeholder="Enter subtitle..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                {/* Type Text */}
                <div>
                    <label htmlFor="typeText" className="block text-sm mb-1 font-medium">
                        Hero Type Text
                    </label>
                    <input
                        type="text"
                        id="typeText"
                        name="typeText"
                        value={formData.typeText}
                        onChange={handleChange}
                        placeholder="Typing text..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>



                {/* Button Text */}
                <div>
                    <label htmlFor="btnName" className="block text-sm mb-1 font-medium">
                        Hero Button Text
                    </label>
                    <input
                        type="text"
                        id="btnName"
                        name="btnName"
                        value={formData.btnName}
                        onChange={handleChange}
                        placeholder="Button text..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm mb-1 font-medium">
                        Hero Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>
                {/* Descriptions */}
                <div className="md:col-span-2">
                    <label htmlFor="descriptions" className="block text-sm mb-1 font-medium">
                        Hero Descriptions
                    </label>
                    <textarea
                        id="descriptions"
                        name="descriptions"
                        value={formData.descriptions}
                        onChange={handleChange}
                        placeholder="Write short description..."
                        rows={3}
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                {/* Profile Image */}
                <div className="md:col-span-2 border rounded-xl p-4 border-gray-500">
                    <label htmlFor="profileImage" className="block text-sm mb-1 font-medium">
                        Hero Profile Image
                    </label>
                    <input
                        type="file"
                        id="profileImage"
                        onChange={handleFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:text-sm file:font-semibold file:bg-accent file:text-black
              hover:file:bg-accent/80 cursor-pointer mt-1 w-full text-sm text-gray-300"
                    />

                    {/* preview */}
                    {formData.profileImage && (
                        <img
                            src={formData.profileImage}
                            alt="Profile Preview"
                            className="mt-3 w-28 h-28 object-cover rounded-full border border-gray-500"
                        />
                    )}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-accent text-black hover:bg-accent/80 font-semibold py-2 px-6 rounded-xl shadow-md transition disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Hero Section"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HeroSection;
