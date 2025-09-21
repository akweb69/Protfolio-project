import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";

const Training = () => {
    const [formData, setFormData] = useState({
        trainingName: "",
        description: "",
        trainingFrom: "",
        duration: "",
        meritPosition: "",
        award: "",
        joiningDate: "",
        completedDate: "",
        coverPhoto: "",
    });

    const [loading, setLoading] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [showTrainings, setShowTrainings] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const IMGBB_API = import.meta.env.VITE_IMGBB_KEY;

    // Helper function to format date for input
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        } catch (error) {
            console.error('Date formatting error:', error);
            return '';
        }
    };

    // Helper function to populate form data
    const populateFormData = (training) => {
        return {
            trainingName: training.trainingName || '',
            description: training.description || '',
            trainingFrom: training.trainingFrom || '',
            duration: training.duration || '',
            meritPosition: training.meritPosition || '',
            award: training.award || '',
            joiningDate: formatDateForInput(training.joiningDate),
            completedDate: formatDateForInput(training.completedDate),
            coverPhoto: training.coverPhoto || '',
        };
    };

    // Memoized fetch function
    const fetchTrainings = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/trainings`);
            setTrainings(res.data);
        } catch (error) {
            console.error("Error fetching trainings:", error);
            toast.error(error.response?.data?.error || "Failed to fetch trainings");
        } finally {
            setLoading(false);
        }
    }, [BASE_URL]);

    useEffect(() => {
        fetchTrainings();
    }, [fetchTrainings]);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle Image Upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file");
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        const formDataImg = new FormData();
        formDataImg.append("image", file);

        setLoading(true);
        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API}`,
                formDataImg
            );
            setFormData((prev) => ({
                ...prev,
                coverPhoto: res.data.data.url,
            }));
            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error("Image upload failed:", error);
            toast.error("Image upload failed!");
            setImagePreview(null);
        } finally {
            setLoading(false);
        }
    };

    // Reset Form
    const resetForm = () => {
        setFormData({
            trainingName: "",
            description: "",
            trainingFrom: "",
            duration: "",
            meritPosition: "",
            award: "",
            joiningDate: "",
            completedDate: "",
            coverPhoto: "",
        });
        setImagePreview(null);
        setEditingId(null);
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (!formData.trainingName.trim()) {
            toast.error("Training name is required");
            setLoading(false);
            return;
        }

        if (!formData.trainingFrom.trim()) {
            toast.error("Organization/Institute is required");
            setLoading(false);
            return;
        }

        try {
            let response;
            if (editingId) {
                // Update Training
                console.log("Updating training with ID:", editingId);
                console.log("Update data:", formData);

                response = await axios.patch(`${BASE_URL}/trainings/${editingId}`, formData);
                toast.success("Training updated successfully!");
            } else {
                // Create Training
                response = await axios.post(`${BASE_URL}/trainings`, formData);
                toast.success("Training added successfully!");
            }

            console.log("Response:", response.data);
            resetForm();
            fetchTrainings();
            setShowTrainings(true);
        } catch (error) {
            console.error("Error saving training:", error);
            console.error("Error response:", error.response?.data);
            toast.error(error.response?.data?.error || "Error saving training");
        } finally {
            setLoading(false);
        }
    };

    // Edit Training - FIXED VERSION
    const handleEdit = (training) => {
        console.log("Editing training:", training); // Debug log

        const populatedData = populateFormData(training);
        console.log("Populated form data:", populatedData); // Debug log

        setFormData(populatedData);
        setImagePreview(training.coverPhoto);
        setEditingId(training._id);
        setShowTrainings(false);

        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });

        toast.info("Editing mode - Update the form and click 'Update Training'");
    };

    // Delete Training
    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/trainings/${deleteId}`);
            toast.success("Training deleted successfully!");
            fetchTrainings();
        } catch (error) {
            console.error("Error deleting training:", error);
            toast.error(error.response?.data?.error || "Error deleting training");
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            setDeleteId(null);
        }
    };

    // Toggle Trainings List
    const toggleTrainingsList = () => {
        if (!showTrainings) {
            fetchTrainings();
        }
        setShowTrainings(!showTrainings);
    };

    if (loading && !showTrainings && !editingId) return <UpdateLoading />;

    return (
        <div className="w-full h-full bg-black/10 backdrop-blur-md shadow-lg rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-3xl font-bold">
                    {editingId ? "Edit Training" : "Training Management"}
                </h2>
                <button
                    onClick={toggleTrainingsList}
                    disabled={loading}
                    className="bg-accent text-black px-4 py-2 rounded-xl shadow hover:bg-accent/80 transition disabled:opacity-50"
                >
                    {showTrainings ? "Hide Trainings" : "My Trainings"}
                </button>
            </div>

            {!showTrainings ? (
                <div>
                    {/* Edit Info Banner */}
                    {editingId && (
                        <div className="bg-yellow-500/20 border border-yellow-500/30 p-3 rounded-xl mb-4">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 7z" />
                                </svg>
                                <p className="text-yellow-100 text-sm">
                                    You are editing: <strong>{formData.trainingName}</strong>
                                </p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 text-white">
                        {/* Cover Photo */}
                        <div className="md:col-span-2">
                            <label className="block text-sm mb-1 font-medium">Cover Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={loading}
                                className="w-full p-2 bg-transparent border border-gray-500 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-black hover:file:bg-accent/80"
                            />
                            {(imagePreview || formData.coverPhoto) && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview || formData.coverPhoto}
                                        alt="cover"
                                        className="w-32 h-32 object-cover rounded-xl border border-gray-500"
                                    />
                                    {imagePreview && !formData.coverPhoto && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            Preview - Upload to save
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Training Name */}
                        <div>
                            <label className="block text-sm mb-1 font-medium">Training Name *</label>
                            <input
                                type="text"
                                name="trainingName"
                                value={formData.trainingName}
                                onChange={handleChange}
                                placeholder="Enter training name..."
                                disabled={loading}
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl disabled:opacity-50"
                                required
                            />
                        </div>

                        {/* Training From */}
                        <div>
                            <label className="block text-sm mb-1 font-medium">Organization/Institute *</label>
                            <input
                                type="text"
                                name="trainingFrom"
                                value={formData.trainingFrom}
                                onChange={handleChange}
                                placeholder="Organization / Institute..."
                                disabled={loading}
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl disabled:opacity-50"
                                required
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm mb-1 font-medium">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g. 3 Months"
                                disabled={loading}
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl disabled:opacity-50"
                            />
                        </div>

                        {/* Merit Position */}
                        <div>
                            <label className="block text-sm mb-1 font-medium">Merit Position</label>
                            <input
                                type="text"
                                name="meritPosition"
                                value={formData.meritPosition}
                                onChange={handleChange}
                                placeholder="Optional"
                                disabled={loading}
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl disabled:opacity-50"
                            />
                        </div>

                        {/* Award */}
                        <div>
                            <label className="block text-sm mb-1 font-medium">Award</label>
                            <input
                                type="text"
                                name="award"
                                value={formData.award}
                                onChange={handleChange}
                                placeholder="Optional"
                                disabled={loading}
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl disabled:opacity-50"
                            />
                        </div>

                        {/* Joining Date */}
                        <div>
                            <label className="block text-sm mb-1 font-medium">Joining Date</label>
                            <input
                                type="date"
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl disabled:opacity-50"
                            />
                        </div>

                        {/* Completed Date */}
                        <div>
                            <label className="block text-sm mb-1 font-medium">Completed Date</label>
                            <input
                                type="date"
                                name="completedDate"
                                value={formData.completedDate}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl disabled:opacity-50"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm mb-1 font-medium">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Write about training..."
                                disabled={loading}
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl disabled:opacity-50"
                            />
                        </div>

                        {/* Submit & Reset Buttons */}
                        <div className="md:col-span-2 flex justify-between">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={loading}
                                    className="px-6 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition disabled:opacity-50"
                                >
                                    Cancel Edit
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-accent text-black px-6 py-2 rounded-xl shadow hover:bg-accent/80 transition disabled:opacity-50"
                            >
                                {loading ? "Saving..." : (editingId ? "Update Training" : "Add Training")}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    {loading ? (
                        <UpdateLoading />
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {trainings.length === 0 ? (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-400 text-lg">No trainings found. Add your first training!</p>
                                    <button
                                        onClick={() => setShowTrainings(false)}
                                        className="mt-4 bg-accent text-black px-6 py-2 rounded-xl shadow hover:bg-accent/80 transition"
                                    >
                                        Add Training
                                    </button>
                                </div>
                            ) : (
                                trainings.map((training) => (
                                    <div
                                        key={training._id}
                                        className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow hover:shadow-lg transition-shadow"
                                    >
                                        <div className="relative overflow-hidden rounded-xl mb-3">
                                            <img
                                                src={training?.coverPhoto || '/placeholder-image.jpg'}
                                                alt={training.trainingName}
                                                className="w-full h-40 object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 text-white line-clamp-2">
                                            {training.trainingName}
                                        </h3>

                                        <p className="text-gray-300 text-sm mb-1">
                                            <span className="font-medium">From:</span> {training.trainingFrom}
                                        </p>

                                        <p className="text-gray-400 text-sm mb-1">
                                            <span className="font-medium">Duration:</span> {training.duration}
                                        </p>

                                        <p className="text-gray-400 text-sm mb-2">
                                            <span className="font-medium">Period:</span> {training.joiningDate} - {training.completedDate}
                                        </p>

                                        {training.meritPosition && (
                                            <p className="text-green-400 text-sm mb-1 font-medium">
                                                🏆 Merit Position: {training.meritPosition}
                                            </p>
                                        )}

                                        {training.award && (
                                            <p className="text-yellow-400 text-sm mb-3 font-medium">
                                                🏅 Award: {training.award}
                                            </p>
                                        )}

                                        {training.description && (
                                            <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                                                {training.description}
                                            </p>
                                        )}

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(training)}
                                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeleteId(training._id);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h2>
                            <p className="text-gray-600">
                                Are you sure you want to delete "<strong>{trainings.find(t => t._id === deleteId)?.trainingName}</strong>"?
                                This action cannot be undone.
                            </p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={loading}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Delete Training"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Training;