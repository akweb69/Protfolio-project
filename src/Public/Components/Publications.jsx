import React, { useEffect, useState } from "react";
import HeadLine from "./HeadLine";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ExternalLink, Info } from "lucide-react";

const Publications = () => {
    const [loading, setLoading] = useState(false);
    const [publications, setPublications] = useState([]);
    const [selectedPub, setSelectedPub] = useState(null);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // load publications
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/publications`)
            .then((response) => {
                setPublications(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching publications data:", error);
                toast.error("Error fetching publications data.");
                setLoading(false);
            });
    }, []);

    return (
        <div
            id='publications'
            className="w-11/12 mx-auto">
            <HeadLine
                title={"Publications"}
                subTitle={"Show my research and publications"}
            />

            {/* main content start form here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {loading ? (
                    <div className="col-span-2 text-center py-10">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    publications.map((publication) => (
                        <motion.div
                            key={publication._id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gray-900/80 border border-gray-700 p-6 rounded-2xl shadow-lg flex flex-col h-full backdrop-blur-md"
                        >
                            {publication.coverPhotoUrl && (
                                <div className="mb-4">
                                    <img
                                        src={publication.coverPhotoUrl}
                                        alt={publication.title}
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                </div>
                            )}
                            <h2 className="text-xl font-bold text-white mb-1">
                                {publication.title}
                            </h2>
                            {publication.subtitle && (
                                <h3 className="text-md font-medium text-gray-300 mb-2">
                                    {publication.subtitle}
                                </h3>
                            )}

                            <div className="mb-3 text-sm text-gray-400">
                                {publication.date && (
                                    <p>
                                        {new Date(publication.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                )}
                                {publication.author && (
                                    <p>Author: {publication.author}</p>
                                )}
                            </div>

                            <p className="text-gray-300 line-clamp-3 mb-4 flex-grow">
                                {publication.description}
                            </p>

                            {/* buttons */}
                            <div className="flex gap-3 mt-auto">
                                <button
                                    onClick={() => setSelectedPub(publication)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                                >
                                    <Info size={18} />
                                    More Details
                                </button>

                                {publication.publicationLink && (
                                    <a
                                        href={publication.publicationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                        Go to Publication
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Modal */}
            {selectedPub && (
                <div className="fixed  inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-md flex items-center justify-center z-50 p-4 ">
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[rgba(0,0,0,0.6)] backdrop-blur-2xl p-6 rounded-2xl  w-full md:w-1/2 lg:w-2/3 text-gray-200 relative h-[calc(100vh-80px)] overflow-y-scroll"
                    >
                        <button
                            onClick={() => setSelectedPub(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white btn btn-error btn-xs rounded-full"
                        >
                            ✕
                        </button>
                        {selectedPub.coverPhotoUrl && (
                            <img
                                src={selectedPub.coverPhotoUrl}
                                alt={selectedPub.title}
                                className="w-full h-56 lg:h-[400px] object-cover rounded-xl mb-4"
                            />
                        )}
                        <h2 className="text-2xl font-bold mb-2">{selectedPub.title}</h2>
                        {selectedPub.subtitle && (
                            <h3 className="text-lg text-gray-300 mb-2">
                                {selectedPub.subtitle}
                            </h3>
                        )}
                        <p className="text-sm text-gray-400 mb-3">
                            {selectedPub.date &&
                                new Date(selectedPub.date).toLocaleDateString("en-US")}
                        </p>
                        <p className="mb-3">{selectedPub.description}</p>

                        {selectedPub.supervisorName && (
                            <div className="p-3 bg-[rgba(0,0,0,0.6)] backdrop-blur-2xl rounded-xl mb-3  shadow-xs shadow-teal-100 ">
                                <h4 className="font-semibold">Supervisor</h4>
                                <p>{selectedPub.supervisorName}</p>
                                {selectedPub.supervisorPosition && (
                                    <p className="text-sm text-gray-400">
                                        {selectedPub.supervisorPosition}
                                    </p>
                                )}
                                {selectedPub.supervisorInstitute && (
                                    <p className="text-sm text-gray-400">
                                        {selectedPub.supervisorInstitute}
                                    </p>
                                )}

                            </div>

                        )}
                        {/* goto publication link button */}
                        <div className="my-5">
                            {selectedPub.publicationLink && (
                                <a
                                    href={selectedPub.publicationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 btn btn-accent w-fit transition-colors"
                                >
                                    <ExternalLink size={18} />
                                    Go to Publication
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Publications;
