import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        activityTitle: "",
        activityDescription: "",
        coverPhotos: [],
    });
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

    // load activities
    const fetchActivities = () => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/activity`)
            .then((res) => {
                setActivities(res.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to fetch activities");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    // upload images to imgbb
    const handleImageUpload = async (files) => {
        const urls = [];
        for (let file of files) {
            const formData = new FormData();
            formData.append("image", file);
            try {
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
                    formData
                );
                urls.push(res.data.data.url);
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Image upload failed");
            }
        }
        return urls;
    };

    // add activity
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.activityTitle || !formData.activityDescription) {
            toast.error("Title & description required");
            return;
        }

        try {
            setLoading(true);
            const result = await axios.post(`${BASE_URL}/activity`, formData);
            toast.success("Activity added successfully!");
            setFormData({ activityTitle: "", activityDescription: "", coverPhotos: [] });
            fetchActivities();
        } catch (error) {
            console.error("Error adding activity:", error);
            toast.error("Failed to add activity");
        } finally {
            setLoading(false);
        }
    };

    // delete activity
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this activity?"))
            return;
        try {
            await axios.delete(`${BASE_URL}/activity/${id}`);
            toast.success("Activity deleted successfully");
            fetchActivities();
        } catch {
            toast.error("Failed to delete activity");
        }
    };

    // edit activity (prompt version)
    const handleEdit = async (activity) => {
        const updatedTitle = prompt("Update Title:", activity.activityTitle);
        const updatedDescription = prompt(
            "Update Description:",
            activity.activityDescription
        );
        if (!updatedTitle || !updatedDescription) return;

        try {
            await axios.patch(`${BASE_URL}/activity/${activity._id}`, {
                activityTitle: updatedTitle,
                activityDescription: updatedDescription,
            });
            toast.success("Activity updated successfully");
            fetchActivities();
        } catch {
            toast.error("Failed to update activity");
        }
    };

    if (loading) return <UpdateLoading />;

    return (
        <div className="w-11/12 mx-auto py-10">
            <h2 className="text-3xl font-bold text-white mb-6">My Activities</h2>

            {/* Add Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900/50 p-6 rounded-2xl shadow mb-10"
            >
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Activity Title</label>
                    <input
                        type="text"
                        value={formData.activityTitle}
                        onChange={(e) =>
                            setFormData({ ...formData, activityTitle: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                        placeholder="Enter activity title"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Activity Description</label>
                    <textarea
                        rows={4}
                        value={formData.activityDescription}
                        onChange={(e) =>
                            setFormData({ ...formData, activityDescription: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                        placeholder="Enter activity description"
                    />
                </div>

                {/* Dynamic Image Uploads */}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Upload Photos (max 3)</label>

                    {formData.coverPhotos.map((photo, index) => (
                        <div key={index} className="flex items-center gap-3 mb-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    if (e.target.files[0]) {
                                        const urls = await handleImageUpload([e.target.files[0]]);
                                        const updatedPhotos = [...formData.coverPhotos];
                                        updatedPhotos[index] = urls[0];
                                        setFormData({ ...formData, coverPhotos: updatedPhotos });
                                    }
                                }}
                                className="text-gray-300 file-input file-input-accent w-full"
                            />
                            {photo && (
                                <img
                                    src={photo}
                                    alt={`Preview ${index}`}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            )}
                        </div>
                    ))}

                    {/* Add More Button */}
                    {formData.coverPhotos.length < 3 && (
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    coverPhotos: [...formData.coverPhotos, ""],
                                })
                            }
                            className="mt-2 bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-2"
                        >
                            <FaPlus /> Add More
                        </button>
                    )}
                </div>


                <button
                    type="submit"
                    className="bg-accent text-black px-6 py-2 rounded-lg flex items-center gap-2"
                >
                    <FaPlus /> Add Activity
                </button>
            </form>

            {/* Activities List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity, index) => (
                    <motion.div
                        key={activity._id}
                        className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-gray-700 shadow-lg rounded-2xl overflow-hidden flex flex-col"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                    >
                        {/* Photos */}
                        <div className="grid grid-cols-3 gap-1">
                            {activity.coverPhotos?.slice(0, 3).map((photo, idx) => (
                                <img
                                    key={idx}
                                    src={photo}
                                    alt={`Activity ${idx}`}
                                    className="w-full h-28 object-cover"
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-white mb-2">
                                {activity.activityTitle}
                            </h3>
                            <p className="text-gray-300 text-sm whitespace-pre-line flex-grow">
                                {activity.activityDescription}
                            </p>

                            {/* Actions */}
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    onClick={() => handleEdit(activity)}
                                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(activity._id)}
                                    className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Activities;
