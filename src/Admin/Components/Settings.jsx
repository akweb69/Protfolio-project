import { useState } from "react";

const Settings = () => {
    const [heroVisibility, setHeroVisibility] = useState("visible");
    const [aboutVisibility, setAboutVisibility] = useState("visible");
    const [publicationsVisibility, setPublicationsVisibility] = useState("visible");
    const [trainingVisibility, setTrainingVisibility] = useState("visible");
    const [activitiesVisibility, setActivitiesVisibility] = useState("visible");
    const [experiencesVisibility, setExperiencesVisibility] = useState("visible");
    const [appointmentsVisibility, setAppointmentsVisibility] = useState("visible");
    const [galleryVisibility, setGalleryVisibility] = useState("visible");
    const [leadershipVisibility, setLeadershipVisibility] = useState("visible");

    return (
        <div className="w-full p-4 bg-white/10 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            {/* form */}
            <div className="space-y-4 ">
                {/* hero section */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">Hero Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setHeroVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setHeroVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
                {/* About section */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">About Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setAboutVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setAboutVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
                {/* Publications sections */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">Publications Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setPublicationsVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setPublicationsVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
                {/* Training sections */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">Training Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setTrainingVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setTrainingVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
                {/* Activities sections */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">Activities Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setActivitiesVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setActivitiesVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
                {/* Experiences sections */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">Experiences Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setExperiencesVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setExperiencesVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
                {/* Appointments sections */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">Appointments Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setAppointmentsVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setAppointmentsVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
                {/* Gallery sections */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">Gallery Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setGalleryVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setGalleryVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
                {/* Leadership sections */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">Leadership Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setLeadershipVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setLeadershipVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
                {/* Leadership sections */}
                <div className="flex justify-between items-center gap-4 border border-white/10 rounded-lg p-4">
                    <h1 className="text-white text-lg md:text-xl font-semibold">Leadership Section Visibility</h1>
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => setLeadershipVisibility("visible")}
                            className="btn btn-accent">Visible</div>
                        <div
                            onClick={() => setLeadershipVisibility("hidden")}
                            className="btn btn-accent">Hidden</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;