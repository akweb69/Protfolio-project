import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";
import { FaEdit, FaTrash } from "react-icons/fa";

const Experience = () => {
    const [formData, setFormData] = useState({
        role: "",
        where: "",
        description: "",
        type: "Intern", // Intern, Part-time, Full-time
        mode: "Remote", // Remote or Onsite
        joiningDate: "",
        resignDate: "",
        isWhy: "",
        why: "",
        duration: "",
    });

    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // load all experiences
    const fetchExperiences = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/experience`);
            setExperiences(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load experiences");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    // submit form (add or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (editId) {
                await axios.patch(`${BASE_URL}/update-experience/${editId}`, formData);
                toast.success("Experience updated successfully!");
            } else {
                await axios.post(`${BASE_URL}/add-experience`, formData);
                toast.success("Experience added successfully!");
            }
            setFormData({
                role: "",
                where: "",
                description: "",
                type: "Intern",
                mode: "Remote",
                joiningDate: "",
                resignDate: "",
                isWhy: "",
                why: "",
                duration: "",
            });
            setEditId(null);
            fetchExperiences();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    // edit experience
    const handleEdit = (exp) => {
        setFormData(exp);
        setEditId(exp._id);
    };

    // delete experience
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this experience?")) return;
        try {
            await axios.delete(`${BASE_URL}/delete-experience/${id}`);
            toast.success("Deleted successfully!");
            fetchExperiences();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete!");
        }
    };

    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div className="w-full h-full bg-black/10 backdrop-blur-md shadow-lg rounded-2xl p-6">
            <h2 className="text-white text-3xl font-bold mb-2">Manage Experiences</h2>
            <p className="text-gray-300">Add, edit or delete your experiences.</p>
            <div className="divider"></div>

            {/* Experience Form */}
            <form
                onSubmit={handleSubmit}
                className="mt-6 grid md:grid-cols-2 gap-6 text-white"
            >
                <div>
                    <label className="block text-sm mb-1">Position / Role</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g., Frontend Developer"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Where</label>
                    <input
                        type="text"
                        name="where"
                        value={formData.where}
                        onChange={handleChange}
                        placeholder="Company / Organization"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Short description..."
                        rows={4}
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-3 bg-black/30 border border-gray-500 rounded-xl"
                    >
                        <option>Intern</option>
                        <option>Part-time</option>
                        <option>Full-time</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">Mode</label>
                    <select
                        name="mode"
                        value={formData.mode}
                        onChange={handleChange}
                        className="w-full p-3 bg-black/30 border border-gray-500 rounded-xl"
                    >
                        <option>Remote</option>
                        <option>Onsite</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">Joining Date</label>
                    <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Resign Date</label>
                    <input
                        type="date"
                        name="resignDate"
                        value={formData.resignDate}
                        onChange={handleChange}
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Is Why</label>
                    <input
                        type="text"
                        name="isWhy"
                        value={formData.isWhy}
                        onChange={handleChange}
                        placeholder="Yes / No"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Why</label>
                    <input
                        type="text"
                        name="why"
                        value={formData.why}
                        onChange={handleChange}
                        placeholder="Reason for leaving"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 6 months"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl"
                    />
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-accent text-black hover:bg-accent/80 font-semibold py-2 px-6 rounded-xl shadow-md"
                    >
                        {editId ? "Update Experience" : "Add Experience"}
                    </button>
                </div>
            </form>

            <div className="divider"></div>

            {/* Show Experiences */}
            <div className="mt-6 space-y-4">
                {experiences.map((exp) => (
                    <div
                        key={exp._id}
                        className="bg-black/20 border border-gray-600 rounded-xl p-4 flex justify-between items-start"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                            <p className="text-gray-300">{exp.where}</p>
                            <p className="text-gray-400 text-sm">{exp.description}</p>
                            <p className="text-gray-400 text-sm">
                                {exp.type} • {exp.mode}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {exp.joiningDate} - {exp.resignDate || "Present"}
                            </p>
                            <p className="text-gray-400 text-sm">Duration: {exp.duration}</p>
                            {exp.why && <p className="text-red-400">Reason: {exp.why}</p>}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleEdit(exp)}
                                className="text-blue-400 hover:text-blue-500"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(exp._id)}
                                className="text-red-400 hover:text-red-500"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
