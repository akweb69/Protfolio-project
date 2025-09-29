import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import HeadLine from "../../Public/Components/HeadLine";
import UpdateLoading from "./UpdateLoading";

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [settings, setSettings] = useState({
        hero: false,
        about: false,
        publications: false,
        trainings: false,
        activities: false,
        experiences: false,
        appointments: false,
        gallery: false,
        footer: false,
        reference: false,
    });

    // Fetch settings from database on component mount
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/settings`)
            .then((res) => {
                if (res.data && typeof res.data === "object") {
                    setSettings((prev) => ({
                        ...prev,
                        ...res.data,
                    }));
                } else {
                    toast.error("Invalid settings data received");
                }
                setLoading(false);
            })
            .catch((err) => {
                toast.error("Failed to load settings");
                console.error("Error fetching settings:", err);
                setLoading(false);
            });
    }, []);

    // Handle checkbox change
    const handleChange = (e) => {
        const { name, checked } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/settings`,
                settings
            );
            if (res.status === 200) {
                toast.success("Settings updated successfully");
            } else {
                toast.error("Unexpected response from server");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
            console.error("Error updating settings:", err);
        } finally {
            setSubmitLoading(false);
        }
    };

    // Render loading state
    if (loading) {
        return <UpdateLoading />;
    }

    // Final output
    return (
        <div className="w-11/12 mx-auto">
            <HeadLine title="Settings" subTitle="Manage your settings" />

            <form
                onSubmit={handleSubmit}
                className="w-full md:grid grid-cols-2 gap-4 mx-auto bg-white/10 rounded-xl border border-gray-200 p-4 space-y-4 md:space-y-0"
            >
                <CheckboxItem
                    label="Is Visible Hero Section"
                    name="hero"
                    checked={settings.hero} // Fixed: Access settings.hero
                    onChange={handleChange}
                />
                <CheckboxItem
                    label="Is Visible About Section"
                    name="about"
                    checked={settings.about} // Fixed: Access settings.about
                    onChange={handleChange}
                />
                <CheckboxItem
                    label="Is Visible Publications Section"
                    name="publications"
                    checked={settings.publications} // Fixed: Access settings.publications
                    onChange={handleChange}
                />
                <CheckboxItem
                    label="Is Visible Training and Workshops Section"
                    name="trainings"
                    checked={settings.trainings} // Fixed: Access settings.trainings
                    onChange={handleChange}
                />
                <CheckboxItem
                    label="Is Visible Activities Section"
                    name="activities"
                    checked={settings.activities} // Fixed: Access settings.activities
                    onChange={handleChange}
                />
                <CheckboxItem
                    label="Is Visible Experiences Section"
                    name="experiences"
                    checked={settings.experiences} // Fixed: Access settings.experiences
                    onChange={handleChange}
                />
                <CheckboxItem
                    label="Is Visible Appointments Section"
                    name="appointments"
                    checked={settings.appointments} // Fixed: Access settings.appointments
                    onChange={handleChange}
                />
                <CheckboxItem
                    label="Is Visible Gallery Section"
                    name="gallery"
                    checked={settings.gallery} // Fixed: Access settings.gallery
                    onChange={handleChange}
                />
                <CheckboxItem
                    label="Is Visible Footer Section"
                    name="footer"
                    checked={settings.footer} // Fixed: Access settings.footer
                    onChange={handleChange}
                />
                <CheckboxItem
                    label="Is Visible Reference Section"
                    name="reference"
                    checked={settings.reference} // Fixed: Access settings.reference
                    onChange={handleChange}
                />

                {/* Submit button */}
                <div className="flex col-span-2 justify-end">
                    <button
                        type="submit"
                        className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-900 cursor-pointer transition-colors disabled:bg-teal-400"
                        disabled={submitLoading}
                    >
                        {submitLoading ? "Updating..." : "Update Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Reusable Checkbox Component with improved accessibility
const CheckboxItem = ({ label, name, checked, onChange }) => (
    <div className="flex justify-between border border-teal-200 rounded-lg p-3 text-white items-center gap-3">
        <label
            htmlFor={name}
            className="text-sm md:text-lg font-semibold fontHeader text-white cursor-pointer"
        >
            {label}
        </label>
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            className="w-5 h-5 rounded border border-gray-300 focus:ring-teal-500"
            aria-checked={checked}
        />
    </div>
);

export default Settings;