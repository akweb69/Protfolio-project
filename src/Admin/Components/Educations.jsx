// Eductions.jsx
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";

const Eductions = () => {
    const [formData, setFormData] = React.useState({
        degreeName: "",
        instituteName: "",
        location: "",
        session: "",
        courseDuration: "",
        gpa: "",
        cgpa: "",
        passingYear: "",
        instituteLogo: "",
        description: "",
        meritPosition: "",
        hasAward: "no",
        award: {
            name: "",
            date: "",
            location: "",
            instituteName: "",
        },
    });

    const [localImageFile, setLocalImageFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [editId, setEditId] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

    // handle input change (flat fields)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    // handle nested award change
    const handleAwardChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, award: { ...p.award, [name]: value } }));
    };

    // handle radio for award yes/no
    const handleHasAward = (e) => {
        const val = e.target.value;
        setFormData((p) => ({ ...p, hasAward: val }));
        if (val === "no") {
            setFormData((p) => ({
                ...p,
                award: { name: "", date: "", location: "", instituteName: "" },
            }));
        }
    };

    // handle image selection
    const handleImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setLocalImageFile(file);
        }
    };

    // upload image to imgbb and return url
    const uploadToImgbb = async (file) => {
        if (!file) return "";
        if (!IMGBB_KEY) {
            toast.error("IMGBB API key not found in env.");
            return "";
        }
        try {
            const fData = new FormData();
            fData.append("image", file);
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
                fData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return res.data?.data?.url || "";
        } catch (err) {
            console.error("imgbb upload error:", err);
            toast.error("Image upload failed.");
            return "";
        }
    };

    // load educations
    const fetchEducations = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/educations`);
            setData(res.data || []);
        } catch (err) {
            console.error("fetch educations error:", err);
            toast.error("Failed to load educations.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // submit handler (add or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let logoUrl = formData.instituteLogo; // keep existing if editing and not changing image
            // if user selected a new local file, upload it
            if (localImageFile) {
                const uploaded = await uploadToImgbb(localImageFile);
                if (uploaded) logoUrl = uploaded;
            }

            const payload = {
                ...formData,
                instituteLogo: logoUrl,
            };

            if (editId) {
                await axios.patch(`${BASE_URL}/educations/${editId}`, payload);
                toast.success("Education updated successfully!");
            } else {
                await axios.post(`${BASE_URL}/educations`, payload);
                toast.success("Education added successfully!");
            }

            // reset form
            setFormData({
                degreeName: "",
                instituteName: "",
                location: "",
                session: "",
                courseDuration: "",
                gpa: "",
                cgpa: "",
                passingYear: "",
                instituteLogo: "",
                description: "",
                meritPosition: "",
                hasAward: "no",
                award: { name: "", date: "", location: "", instituteName: "" },
            });
            setLocalImageFile(null);
            setEditId(null);
            fetchEducations();
        } catch (err) {
            console.error("submit education error:", err);
            toast.error("Error submitting education.");
        } finally {
            setLoading(false);
        }
    };

    // edit handler
    const handleEdit = (item) => {
        setFormData({
            degreeName: item.degreeName || "",
            instituteName: item.instituteName || "",
            location: item.location || "",
            session: item.session || "",
            courseDuration: item.courseDuration || "",
            gpa: item.gpa || "",
            cgpa: item.cgpa || "",
            passingYear: item.passingYear || "",
            instituteLogo: item.instituteLogo || "",
            description: item.description || "",
            meritPosition: item.meritPosition || "",
            hasAward: item.hasAward || "no",
            award: item.award || { name: "", date: "", location: "", instituteName: "" },
        });
        setLocalImageFile(null); // start with existing logo, only replace when user picks file
        setEditId(item._id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // delete handler
    const handleDelete = async () => {
        if (!deleteId) return;
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/educations/${deleteId}`);
            toast.success("Education deleted.");
            fetchEducations();
        } catch (err) {
            console.error("delete education error:", err);
            toast.error("Failed to delete.");
        } finally {
            setDeleteId(null);
            setLoading(false);
        }
    };

    if (loading) return <UpdateLoading />;

    return (
        <div className="w-full h-full bg-black/10 backdrop-blur-md shadow-lg rounded-2xl p-6">
            <h2 className="text-white text-3xl font-bold mb-2">
                Update Education Section
            </h2>
            <p className="text-gray-300">Manage your education entries (cards).</p>
            <div className="divider"></div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 grid md:grid-cols-2 gap-6 text-white">
                <div>
                    <label className="block text-sm mb-1 font-medium">Degree Name</label>
                    <input
                        name="degreeName"
                        value={formData.degreeName}
                        onChange={handleChange}
                        placeholder="B.Sc. in ... / HSC / SSC"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 font-medium">Institute Name</label>
                    <input
                        name="instituteName"
                        value={formData.instituteName}
                        onChange={handleChange}
                        placeholder="Institute / University"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 font-medium">Location</label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 font-medium">Session</label>
                    <input
                        name="session"
                        value={formData.session}
                        onChange={handleChange}
                        placeholder="2019-2023"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 font-medium">Course Duration</label>
                    <input
                        name="courseDuration"
                        value={formData.courseDuration}
                        onChange={handleChange}
                        placeholder="4 years / 2 years"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 font-medium">Passing Year</label>
                    <input
                        name="passingYear"
                        value={formData.passingYear}
                        onChange={handleChange}
                        placeholder="2023"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 font-medium">GPA</label>
                    <input
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleChange}
                        placeholder="4.00"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 font-medium">CGPA (if any)</label>
                    <input
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        placeholder="3.75"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Short description about the program or notes..."
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 font-medium">Merit Position</label>
                    <input
                        name="meritPosition"
                        value={formData.meritPosition}
                        onChange={handleChange}
                        placeholder="e.g. 1st, 2nd (optional)"
                        className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                    />
                </div>

                {/* institute logo upload */}
                <div>
                    <label className="block text-sm mb-1 font-medium">Institute Logo (upload)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="w-full text-sm text-gray-300"
                    />
                    {/* preview */}
                    <div className="mt-3">
                        {localImageFile ? (
                            <img
                                src={URL.createObjectURL(localImageFile)}
                                alt="preview"
                                className="w-28 h-28 object-contain rounded-lg border"
                            />
                        ) : formData.instituteLogo ? (
                            <img
                                src={formData.instituteLogo}
                                alt="logo"
                                className="w-28 h-28 object-contain rounded-lg border"
                            />
                        ) : null}
                    </div>
                </div>

                {/* award radio */}
                <div className="md:col-span-2">
                    <label className="block text-sm mb-1 font-medium">Award?</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="hasAward"
                                value="yes"
                                checked={formData.hasAward === "yes"}
                                onChange={handleHasAward}
                            />
                            <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="hasAward"
                                value="no"
                                checked={formData.hasAward === "no"}
                                onChange={handleHasAward}
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>

                {/* conditional award fields */}
                {formData.hasAward === "yes" && (
                    <>
                        <div>
                            <label className="block text-sm mb-1 font-medium">Award Name</label>
                            <input
                                name="name"
                                value={formData.award.name}
                                onChange={handleAwardChange}
                                placeholder="Best Graduate / Scholarship"
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1 font-medium">Award Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.award.date}
                                onChange={handleAwardChange}
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1 font-medium">Award Location</label>
                            <input
                                name="location"
                                value={formData.award.location}
                                onChange={handleAwardChange}
                                placeholder="City / Venue"
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1 font-medium">Award Institute Name</label>
                            <input
                                name="instituteName"
                                value={formData.award.instituteName}
                                onChange={handleAwardChange}
                                placeholder="Awarding institute"
                                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
                            />
                        </div>
                    </>
                )}

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-accent text-black hover:bg-accent/80 font-semibold py-2 px-6 rounded-xl shadow-md transition disabled:opacity-50"
                    >
                        {loading ? "Processing..." : editId ? "Update Education" : "Add Education"}
                    </button>
                </div>
            </form>

            {/* List / Cards */}
            <div className="mt-8 text-white border border-gray-700 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">My Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data?.map((item, idx) => (
                        <div key={item._id} className="mb-4 p-4 rounded-lg border flex gap-4">
                            <div className="w-20 h-20 flex-shrink-0">
                                {item.instituteLogo ? (
                                    <img
                                        src={item.instituteLogo}
                                        alt="logo"
                                        className="w-20 h-20 object-contain rounded-lg border bg-white p-1"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-gray-800 flex items-center justify-center rounded-lg">
                                        <span className="text-xs text-gray-400">No Logo</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold">{item.degreeName}</h4>
                                        <p className="text-sm">{item.instituteName} • {item.location}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs">{item.session}</p>
                                        <p className="text-xs">{item.passingYear}</p>
                                    </div>
                                </div>

                                <p className="text-xs mt-2">{(item.description || "").slice(0, 120)}{(item.description || "").length > 120 ? "..." : ""}</p>

                                <div className="flex items-center gap-2 mt-3">
                                    <button onClick={() => handleEdit(item)} className="text-xs btn btn-xs btn-primary text-white">Edit</button>
                                    <button onClick={() => setDeleteId(item._id)} className="text-xs btn btn-xs btn-error text-white">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!data || data.length === 0) && <p className="text-gray-400">No education entries yet.</p>}
                </div>
            </div>

            {/* Delete confirm modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-900 text-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
                        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                        <p className="mb-6 text-gray-300">Are you sure you want to delete this education entry? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition">Cancel</button>
                            <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Eductions;
