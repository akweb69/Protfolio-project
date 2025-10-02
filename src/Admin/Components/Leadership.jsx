import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";
import { FaTrash, FaEdit } from "react-icons/fa";

const Leadership = () => {
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        date: "",
        achievement: "",
        image: "",
    });
    const [leaderships, setLeaderships] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // Fetch leadership data
    useEffect(() => {
        const fetchLeaderships = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/leadership`);
                setLeaderships(response.data);
            } catch (error) {
                console.error("Error fetching leadership data:", error);
                toast.error("Failed to load leadership data");
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderships();
    }, [BASE_URL]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                // Update existing leadership
                await axios.patch(`${BASE_URL}/leadership/${editingId}`, formData);
                toast.success("Leadership updated successfully");
                setEditingId(null);
            } else {
                // Create new leadership
                await axios.post(`${BASE_URL}/leadership`, formData);
                toast.success("Leadership added successfully");
            }
            // Refresh leadership list
            const response = await axios.get(`${BASE_URL}/leadership`);
            setLeaderships(response.data);
            // Reset form
            setFormData({
                title: "",
                subtitle: "",
                description: "",
                date: "",
                achievement: "",
                image: "",
            });
        } catch (error) {
            console.error("Error saving leadership:", error);
            toast.error(`Failed to ${editingId ? "update" : "add"} leadership`);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit
    const handleEdit = (leadership) => {
        setFormData({
            title: leadership.title,
            subtitle: leadership.subtitle,
            description: leadership.description,
            date: leadership.date,
            achievement: leadership.achievement,
            image: leadership.image || "",
        });
        setEditingId(leadership._id);
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this leadership entry?")) return;
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/leadership/${id}`);
            toast.success("Leadership deleted successfully");
            setLeaderships(leaderships.filter((leadership) => leadership._id !== id));
        } catch (error) {
            console.error("Error deleting leadership:", error);
            toast.error("Failed to delete leadership");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <UpdateLoading />;

    return (
        <div className="w-full h-full bg-black/10 backdrop-blur-md shadow-lg rounded-2xl p-6">
            <h2 className="text-white text-3xl font-bold mb-2">
                {editingId ? "Update Leadership" : "Add Leadership"}
            </h2>
            <p className="text-gray-300">Manage leadership section content.</p>
            <div className="divider"></div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 grid md:grid-cols-2 gap-6 text-white">
                <div>
                    <label htmlFor="title" className="block text-sm mb-1 font-medium">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter leadership title..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="subtitle" className="block text-sm mb-1 font-medium">
                        Subtitle
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
                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm mb-1 font-medium">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write description..."
                        rows={5}
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm mb-1 font-medium">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="achievement" className="block text-sm mb-1 font-medium">
                        Achievement
                    </label>
                    <input
                        type="text"
                        id="achievement"
                        name="achievement"
                        value={formData.achievement}
                        onChange={handleChange}
                        placeholder="Enter achievement..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="image" className="block text-sm mb-1 font-medium">
                        Image URL (Optional)
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Enter image URL..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>
                <div className="md:col-span-2 flex justify-end gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-accent text-black hover:bg-accent/80 font-semibold py-2 px-6 rounded-xl shadow-md transition disabled:opacity-50"
                    >
                        {loading ? "Saving..." : editingId ? "Update Leadership" : "Add Leadership"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setFormData({
                                    title: "",
                                    subtitle: "",
                                    description: "",
                                    date: "",
                                    achievement: "",
                                    image: "",
                                });
                            }}
                            className="bg-gray-500 text-white hover:bg-gray-600 font-semibold py-2 px-6 rounded-xl shadow-md transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Leadership List */}
            <div className="mt-8">
                <h3 className="text-white text-xl font-semibold mb-4">Leadership Entries</h3>
                {leaderships.length === 0 ? (
                    <p className="text-gray-300">No leadership entries found.</p>
                ) : (
                    <div className="grid gap-4">
                        {leaderships.map((leadership) => (
                            <div
                                key={leadership._id}
                                className="p-4 border border-gray-500 rounded-xl text-white flex justify-between items-center"
                            >
                                <div>
                                    <h4 className="text-lg font-semibold">{leadership.title}</h4>
                                    <p className="text-gray-300">{leadership.subtitle}</p>
                                    <p className="text-sm">{new Date(leadership.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(leadership)}
                                        className="p-2 bg-blue-500 rounded-md hover:bg-blue-600"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(leadership._id)}
                                        className="p-2 bg-red-500 rounded-md hover:bg-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leadership;
