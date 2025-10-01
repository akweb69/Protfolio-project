import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";

const Reviews = () => {
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        profession: "",
        institute: "",
        comment: "",
        profileImage: ""
    });
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY;

    // Fetch reviews on component mount
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/references`);
            setReviews(response.data);
            console.log(response.data);
        } catch (error) {
            toast.error("Failed to fetch reviews");
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image upload to imgbb
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imgFormData = new FormData();
        imgFormData.append("image", file);

        try {
            setLoading(true);
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                imgFormData
            );
            setFormData({ ...formData, profileImage: response.data.data.url });
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.profileImage) {
            toast.error("Please upload a profile image");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/references`, formData);
            if (response.data.insertedId) {
                toast.success("Review added successfully");
                setFormData({
                    name: "",
                    profession: "",
                    institute: "",
                    comment: "",
                    profileImage: ""
                });
                fetchReviews();
            }
        } catch (error) {
            toast.error("Failed to add review");
        } finally {
            setLoading(false);
        }
    };

    // Handle review deletion
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            setLoading(true);
            const response = await axios.delete(`${BASE_URL}/references/${id}`);
            if (response.data.deletedCount > 0) {
                toast.success("Review deleted successfully");
                fetchReviews();
            }
        } catch (error) {
            toast.error("Failed to delete review");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <UpdateLoading />;
    }

    return (
        <div className="w-full h-full bg-black/10 backdrop-blur-md shadow-lg rounded-2xl p-6">
            <h2 className="text-white text-3xl font-bold mb-2">Update Reviews Section</h2>
            <p className="text-gray-300">Manage the reviews section content and settings.</p>
            <div className="divider"></div>

            {/* Review Submission Form */}
            <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4 md:space-y-0 text-white bg-white/10 rounded-xl p-4">
                <div>
                    <label htmlFor="name" className="block mb-2">Name of Reviewer</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md input input-accent bg-transparent text-white"
                        placeholder="Enter name of reviewer"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="profession" className="block mb-2">Profession</label>
                    <input
                        type="text"
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md input input-accent bg-transparent text-white"
                        placeholder="Enter profession"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="institute" className="block mb-2">Institute</label>
                    <input
                        type="text"
                        id="institute"
                        name="institute"
                        value={formData.institute}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md input input-accent bg-transparent text-white"
                        placeholder="Enter institute"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="profileImage" className="block mb-2">Profile Image</label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-2 rounded-md input input-accent bg-transparent text-white"
                    />
                    {formData.profileImage && (
                        <img src={formData.profileImage} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
                    )}
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="comment" className="block mb-2">Comment</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md input input-accent bg-transparent text-white"
                        placeholder="Enter review comment"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className="btn btn-accent w-full">Submit Review</button>
                </div>
            </form>

            {/* Reviews Display */}
            <div className="mt-6">
                <h3 className="text-white text-2xl font-bold mb-4">Existing Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-white/10 p-4 rounded-xl">
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.profileImage}
                                    alt={review.name}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="text-white font-bold">{review.name}</h4>
                                    <p className="text-gray-300">{review.profession}</p>
                                    <p className="text-gray-300">{review.institute}</p>
                                </div>
                            </div>
                            <p className="text-gray-200 mt-2">{review.comment}</p>
                            <button
                                onClick={() => handleDelete(review._id)}
                                className="btn btn-error btn-sm mt-2"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;