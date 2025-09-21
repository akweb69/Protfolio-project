import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import UpdateLoading from "./UpdateLoading";

// Research_Publications.jsx
// Full component implementing dynamic CRUD for publications (create, read, update, delete)
// - Uses imgbb API for image upload
// - Adds a "My Publications" button on the top-right to open a publications panel (card view)
// - Edit + Delete with confirmation modal
// - Fully responsive

const Research_Publications = () => {
    const [formData, setFormData] = React.useState({
        title: "",
        subtitle: "",
        date: "",
        author: "",
        totalContributors: "",
        supervisorName: "",
        supervisorPosition: "",
        supervisorInstitute: "",
        publicationLink: "",
        coverPhoto: null, // File
        coverPhotoUrl: "", // URL after imgbb upload
        description: "",
    });

    const [loading, setLoading] = React.useState(false);
    const [publishing, setPublishing] = React.useState(false);
    const [publications, setPublications] = React.useState([]);
    const [showPanel, setShowPanel] = React.useState(false);
    const [editingId, setEditingId] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);
    const [confirmDelete, setConfirmDelete] = React.useState({ show: false, id: null });

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

    // Helper: fetch publications
    const fetchPublications = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/publications`);
            setPublications(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load publications.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublications();
    }, []);

    // load default about-section
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/about-section`)
            .then((response) => {
                if (response.data && response.data[0]) {
                    const about = response.data[0];
                    setFormData((prev) => ({ ...prev, description: about.descriptions || prev.description, author: about.name || prev.author }));
                }
            })
            .catch((error) => {
                console.error("Error fetching about section data:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setFormData((prev) => ({ ...prev, coverPhoto: file }));
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else setPreviewUrl(null);
    };

    // Upload image to imgbb
    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, formData);
            return res.data.data.url;
        } catch (err) {
            console.error("ImgBB upload failed", err);
            toast.error("Image upload failed.");
            return "";
        }
    };

    // Submit (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPublishing(true);

        try {
            let uploadedUrl = formData.coverPhotoUrl;
            if (formData.coverPhoto) {
                uploadedUrl = await uploadToImgBB(formData.coverPhoto);
            }

            const payload = {
                title: formData.title,
                subtitle: formData.subtitle,
                date: formData.date,
                author: formData.author,
                totalContributors: formData.totalContributors,
                supervisorName: formData.supervisorName,
                supervisorPosition: formData.supervisorPosition,
                supervisorInstitute: formData.supervisorInstitute,
                publicationLink: formData.publicationLink,
                description: formData.description,
                coverPhotoUrl: uploadedUrl,
            };

            if (editingId) {
                await axios.patch(`${BASE_URL}/publications/${editingId}`, payload);
                toast.success("Publication updated");
            } else {
                await axios.post(`${BASE_URL}/publications`, payload);
                toast.success("Publication created");
            }

            // reset + refresh list
            setFormData({ title: "", subtitle: "", date: "", author: "", totalContributors: "", supervisorName: "", supervisorPosition: "", supervisorInstitute: "", publicationLink: "", coverPhoto: null, coverPhotoUrl: "", description: "" });
            setPreviewUrl(null);
            setEditingId(null);
            fetchPublications();
        } catch (err) {
            console.error(err);
            toast.error("Failed to save publication.");
        } finally {
            setPublishing(false);
        }
    };

    const handleEdit = (pub) => {
        setEditingId(pub._id || pub.id || null);
        setFormData({
            title: pub.title || "",
            subtitle: pub.subtitle || "",
            date: pub.date || "",
            author: pub.author || "",
            totalContributors: pub.totalContributors || "",
            supervisorName: pub.supervisorName || "",
            supervisorPosition: pub.supervisorPosition || "",
            supervisorInstitute: pub.supervisorInstitute || "",
            publicationLink: pub.publicationLink || "",
            coverPhoto: null,
            coverPhotoUrl: pub.coverPhotoUrl || "",
            description: pub.description || "",
        });
        setPreviewUrl(pub.coverPhotoUrl || null);
        setShowPanel(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const confirmDeletePublication = (id) => {
        setConfirmDelete({ show: true, id });
    };

    const handleDelete = async () => {
        const id = confirmDelete.id;
        if (!id) return;
        setConfirmDelete({ show: false, id: null });
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/publications/${id}`);
            toast.success("Publication deleted");
            fetchPublications();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete publication.");
        } finally {
            setLoading(false);
        }
    };

    const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
        if (!show) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold mb-2">Confirm</h3>
                    <p className="mb-4 text-sm text-gray-700">{message}</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 rounded-xl border">Cancel</button>
                        <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-500 text-white">Delete</button>
                    </div>
                </div>
            </div>
        );
    };

    const PublicationsPanel = ({ open, onClose }) => {
        if (!open) return null;
        return (
            <div className="fixed inset-0 z-40 flex">
                <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-800 backdrop-blur-2xl rounded-xl  p-4 overflow-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-xl font-bold">My Publications</h3>
                        <button onClick={onClose} className="text-white">Close</button>
                    </div>

                    {publications.length === 0 && <p className="text-gray-300">No publications yet.</p>}

                    <div className="grid grid-cols-1 gap-4">
                        {publications.map((p) => (
                            <div key={p._id || p.id} className="bg-white/5 p-3 rounded-xl">
                                <div className="flex gap-3">
                                    <div className="w-20 h-20 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                        {p.coverPhotoUrl ? (
                                            <img src={p.coverPhotoUrl} alt="cover" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No Image</div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-semibold">{p.title}</h4>
                                        <p className="text-sm text-gray-300">{p.author} • {p.date}</p>
                                        <div className="mt-2 flex gap-2">
                                            <button onClick={() => handleEdit(p)} className="px-3 py-1 rounded bg-accent text-black text-sm  btn btn-secondary outline-none border-0 btn-sm">Edit</button>
                                            <button onClick={() => confirmDeletePublication(p._id || p.id)} className="px-3 py-1 rounded border text-sm btn btn-error btn-sm">Delete</button>
                                            {p.publicationLink && (
                                                <a href={p.publicationLink} target="_blank" rel="noreferrer" className="px-3 py-1 rounded border text-sm  btn btn-success btn-sm">Open</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1" onClick={onClose}></div>
            </div>
        );
    };

    if (loading) return <UpdateLoading />;

    return (
        <div className="w-full h-full bg-black/10 backdrop-blur-md shadow-lg rounded-2xl p-6 relative">
            <div className="absolute top-6 right-6">
                <button onClick={() => setShowPanel(true)} className="bg-accent text-black font-semibold py-2 px-4 rounded-xl shadow-md">My Publications</button>
            </div>

            <h2 className="text-white text-3xl font-bold mb-2">Research Publications</h2>
            <p className="text-gray-300">Add and manage your research publications below.</p>
            <div className="divider"></div>

            <form onSubmit={handleSubmit} className="mt-6 grid md:grid-cols-2 gap-6 text-white">
                <div>
                    <label htmlFor="title" className="block text-sm mb-1 font-medium">Publication Title</label>
                    <input name="title" id="title" value={formData.title} onChange={handleChange} placeholder="Enter publication title..." className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" />
                </div>

                <div>
                    <label htmlFor="subtitle" className="block text-sm mb-1 font-medium">Subtitle</label>
                    <input name="subtitle" id="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Enter subtitle..." className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm mb-1 font-medium">Date</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" />
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm mb-1 font-medium">Author</label>
                    <input name="author" id="author" value={formData.author} onChange={handleChange} placeholder="Author name..." className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" />
                </div>

                <div>
                    <label htmlFor="totalContributors" className="block text-sm mb-1 font-medium">Total Contributors</label>
                    <input name="totalContributors" id="totalContributors" value={formData.totalContributors} onChange={handleChange} placeholder="Number or names" className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" />
                </div>

                <div>
                    <label htmlFor="supervisorName" className="block text-sm mb-1 font-medium">Supervisor Name</label>
                    <input name="supervisorName" id="supervisorName" value={formData.supervisorName} onChange={handleChange} placeholder="Supervisor name..." className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" />
                </div>

                <div>
                    <label htmlFor="supervisorPosition" className="block text-sm mb-1 font-medium">Supervisor Position</label>
                    <input name="supervisorPosition" id="supervisorPosition" value={formData.supervisorPosition} onChange={handleChange} placeholder="Position..." className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="supervisorInstitute" className="block text-sm mb-1 font-medium">Supervisor Institute</label>
                    <input name="supervisorInstitute" id="supervisorInstitute" value={formData.supervisorInstitute} onChange={handleChange} placeholder="Institute..." className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="publicationLink" className="block text-sm mb-1 font-medium">Publication Link</label>
                    <input name="publicationLink" id="publicationLink" value={formData.publicationLink} onChange={handleChange} placeholder="https://..." className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" />
                </div>

                <div>
                    <label htmlFor="coverPhoto" className="block text-sm mb-1 font-medium">Cover Photo</label>
                    <input type="file" accept="image/*" id="coverPhoto" name="coverPhoto" onChange={handleFileChange} className="w-full text-sm text-gray-300" />
                    {previewUrl && (
                        <div className="mt-2 w-40 h-28 rounded overflow-hidden">
                            <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm mb-1 font-medium">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={6} className="w-full p-3 bg-transparent border border-gray-500 rounded-xl" placeholder="Short description..." />
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button type="submit" disabled={publishing} className="bg-accent text-black hover:bg-accent/80 font-semibold py-2 px-6 rounded-xl shadow-md transition disabled:opacity-50">
                        {publishing ? (editingId ? "Updating..." : "Publishing...") : (editingId ? "Update Publication" : "Add Publication")}
                    </button>
                </div>
            </form>

            <PublicationsPanel open={showPanel} onClose={() => setShowPanel(false)} />
            <ConfirmModal show={confirmDelete.show} onClose={() => setConfirmDelete({ show: false, id: null })} onConfirm={handleDelete} message={"Are you sure you want to delete this publication? This action cannot be undone."} />
        </div>
    );
};

export default Research_Publications;
