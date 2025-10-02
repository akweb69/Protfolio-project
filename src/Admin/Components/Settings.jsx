import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Settings = () => {
    const [visibility, setVisibility] = useState({
        hero: "visible",
        about: "visible",
        publications: "visible",
        training: "visible",
        activities: "visible",
        experiences: "visible",
        appointments: "visible",
        gallery: "visible",
        leadership: "visible",
        reviews: "visible",
    });
    const [loading, setLoading] = useState(false);

    // Fetch initial settings from the server
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/settings`);
                if (response.data) {
                    setVisibility({
                        hero: response.data[0].heroVisibility || "visible",
                        about: response.data[0].aboutVisibility || "visible",
                        publications: response.data[0].publicationsVisibility || "visible",
                        training: response.data[0].trainingVisibility || "visible",
                        activities: response.data[0].activitiesVisibility || "visible",
                        experiences: response.data[0].experiencesVisibility || "visible",
                        appointments: response.data[0].appointmentsVisibility || "visible",
                        gallery: response.data[0].galleryVisibility || "visible",
                        leadership: response.data[0].leadershipVisibility || "visible",
                        reviews: response.data[0].reviewsVisibility || "visible",
                    });
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
                toast.error("Failed to load settings");
            }
        };
        fetchSettings();
    }, []);

    // Function to handle visibility toggle
    const toggleVisibility = async (section, value) => {
        if (loading) return; // Prevent multiple clicks
        setLoading(true);
        try {
            const newVisibility = { ...visibility, [section]: value };
            setVisibility(newVisibility);

            // Prepare data for database
            const mainData = {
                heroVisibility: newVisibility.hero,
                aboutVisibility: newVisibility.about,
                publicationsVisibility: newVisibility.publications,
                trainingVisibility: newVisibility.training,
                activitiesVisibility: newVisibility.activities,
                experiencesVisibility: newVisibility.experiences,
                appointmentsVisibility: newVisibility.appointments,
                galleryVisibility: newVisibility.gallery,
                leadershipVisibility: newVisibility.leadership,
                reviewsVisibility: newVisibility.reviews,
            };

            // Send data to server
            await axios.post(`${import.meta.env.VITE_BASE_URL}/settings`, mainData);
            toast.success("Settings saved successfully");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings");
        } finally {
            setLoading(false);
        }
    };

    // Array of sections for dynamic rendering
    const sections = [
        { key: "hero", label: "Hero Section" },
        { key: "about", label: "About Section" },
        { key: "publications", label: "Publications Section" },
        { key: "training", label: "Training Section" },
        { key: "activities", label: "Activities Section" },
        { key: "experiences", label: "Experiences Section" },
        { key: "appointments", label: "Appointments Section" },
        { key: "gallery", label: "Gallery Section" },
        { key: "leadership", label: "Leadership Section" },
        { key: "reviews", label: "Reviews Section" },
    ];

    return (
        <div className="w-full p-4 bg-white/10 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            <div className="space-y-4">
                {sections.map(({ key, label }) => (
                    <div
                        key={key}
                        className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4"
                    >
                        <h1 className="text-white text-lg md:text-xl font-semibold">
                            {label} Visibility
                        </h1>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => toggleVisibility(key, "visible")}
                                className={`btn btn-accent ${visibility[key] === "visible" ? "bg-green-500" : "bg-gray-500"
                                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={loading}
                            >
                                Visible
                            </button>
                            <button
                                onClick={() => toggleVisibility(key, "hidden")}
                                className={`btn btn-accent ${visibility[key] === "hidden" ? "bg-red-500" : "bg-gray-500"
                                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={loading}
                            >
                                Hidden
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Settings;