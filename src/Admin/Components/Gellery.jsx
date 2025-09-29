import React, { useState, useEffect } from "react";

const Gellery = () => {
    const [formData, setFormData] = useState({ title: "", image: "" });
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [gallery, setGallery] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL; // <-- backend API
    const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY; // <-- imgbb key

    // Load all gallery data
    useEffect(() => {
        fetch(`${BASE_URL}/gallery`)
            .then((res) => res.json())
            .then((data) => setGallery(data))
            .catch((err) => console.error(err));
    }, [BASE_URL]);

    // handle file upload to imgbb
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setFormData((prev) => ({ ...prev, image: data.data.url }));
                setPreview(data.data.url);
            }
        } catch (error) {
            console.error("Image upload error:", error);
        } finally {
            setLoading(false);
        }
    };

    // handle title input
    const handleChange = (e) => {
        setFormData({ ...formData, title: e.target.value });
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.image) return alert("Please add title and image");

        try {
            const res = await fetch(`${BASE_URL}/gallery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const newData = await res.json();
            setGallery([...gallery, newData]);
            setFormData({ title: "", image: "" });
            setPreview("");
        } catch (err) {
            console.error(err);
        }
    };

    // handle delete
    const handleDelete = async (id) => {
        try {
            await fetch(`${BASE_URL}/gallery/${id}`, { method: "DELETE" });
            setGallery(gallery.filter((item) => item._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full mx-auto p-6">
            {/* Upload Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white/10 shadow-md rounded-lg p-4  max-w-xl mb-10 mx-auto"
            >
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter image title"
                    className="border p-2 w-full bg-transparent text-white rounded mb-3 input input-accent"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-3 w-full file-input file-input-accent bg-transparent"
                />
                {loading && <p className="text-blue-500">Uploading...</p>}
                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="w-full h-48 object-cover rounded mb-3"
                    />
                )}
                <button
                    type="submit"
                    className=" btn btn-accent w-full text-white py-2 px-4 rounded"
                >
                    Save
                </button>
            </form>

            {/* Gallery List */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {gallery.map((item) => (
                    <div
                        key={item._id}
                        className="bg-gray-100 p-4 rounded shadow relative"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="mt-2 font-semibold">{item.title}</h3>
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gellery;
