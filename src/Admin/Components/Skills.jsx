import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";

const Skills = () => {
    const [formData, setFormData] = React.useState({
        descriptions: "",
        skill: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [editId, setEditId] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // load data
    const fetchSkills = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/skills`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching skills data:", error);
            toast.error("Error fetching skills data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    // add new skill or update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editId) {
                await axios.patch(`${BASE_URL}/update-skill/${editId}`, formData);
                toast.success("Skill updated successfully!");
            } else {
                await axios.post(`${BASE_URL}/add-skills`, formData);
                toast.success("New skill added successfully!");
            }
            setFormData({ descriptions: "", skill: "" });
            setEditId(null);
            fetchSkills();
        } catch (error) {
            console.error("Error submitting skill:", error);
            toast.error("Error submitting skill.");
        } finally {
            setLoading(false);
        }
    };

    // edit button handler
    const handleEdit = (skillItem) => {
        setFormData({
            skill: skillItem.skill,
            descriptions: skillItem.descriptions,
        });
        setEditId(skillItem._id);
    };

    // delete button handler
    const handleDelete = async () => {
        if (!deleteId) return;
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/delete-skill/${deleteId}`);
            toast.success("Skill deleted successfully!");
            fetchSkills();
        } catch (error) {
            console.error("Error deleting skill:", error);
            toast.error("Error deleting skill.");
        } finally {
            setDeleteId(null); // modal close
            setLoading(false);
        }
    };

    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div className="w-full h-full bg-black/10 backdrop-blur-md shadow-lg rounded-2xl p-6">
            <h2 className="text-white text-3xl font-bold mb-2">
                Update Skills Section
            </h2>
            <p className="text-gray-300">Manage the skill section content and settings.</p>
            <div className="divider"></div>

            {/* Add / Update Form */}
            <form
                onSubmit={handleSubmit}
                className="mt-6 grid md:grid-cols-2 gap-6 text-white"
            >
                <div>
                    <label htmlFor="skill" className="block text-sm mb-1 font-medium">
                        {editId ? "Update Skill" : "Add New Skill"}
                    </label>
                    <input
                        type="text"
                        id="skill"
                        name="skill"
                        value={formData?.skill}
                        onChange={handleChange}
                        placeholder="Enter skill..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="descriptions" className="block text-sm mb-1 font-medium">
                        Skill Descriptions
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

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-accent text-black hover:bg-accent/80 font-semibold py-2 px-6 rounded-xl shadow-md transition disabled:opacity-50"
                    >
                        {loading ? "Processing..." : editId ? "Update Skill" : "Add New Skill"}
                    </button>
                </div>
            </form>

            {/* My skills section */}
            <div className="mt-8 text-white border border-gray-700 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 ">My Skills</h3>
                <div>
                    {data?.map((skillItem, index) => (
                        <div
                            key={skillItem?._id}
                            className="mb-4 p-4 rounded-lg border flex items-center gap-4"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <p className="text-xs btn btn-xs btn-error text-white rounded-full">
                                    {index + 1}
                                </p>
                                <h4 className="text-lg font-bold">{skillItem?.skill}</h4>
                                <p className="text-xs md:text-sm">
                                    {skillItem?.descriptions.slice(0, 90)}...
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(skillItem)}
                                    className="text-xs btn btn-xs btn-primary text-white"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setDeleteId(skillItem._id)}
                                    className="text-xs btn btn-xs btn-error text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-900 text-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
                        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                        <p className="mb-6 text-gray-300">
                            Are you sure you want to delete this skill? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;
