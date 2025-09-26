import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import HeadLine from './HeadLine';
import UpdateLoading from '../../Admin/Components/UpdateLoading';

const Publications = () => {
    const [loading, setLoading] = useState(false);
    const [publications, setPublications] = useState([]);
    const [selectedPub, setSelectedPub] = useState(null);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // Load publications
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/publications`)
            .then((response) => {
                setPublications(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching publications data:', error);
                toast.error('Error fetching publications data.');
                setLoading(false);
            });
    }, []);

    // Framer Motion variants for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
        }),
    };

    // Framer Motion variants for modal
    const modalVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <section
            id="publications"
            className="w-11/12 mx-auto py-12 text-white"
        >
            {/* Animated Headline */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <HeadLine
                    title="Publications"
                    subTitle="Explore My Research Contributions"
                />
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {loading ? (
                    <div className="col-span-2 text-center py-10">
                        <UpdateLoading />
                    </div>
                ) : (
                    publications.map((publication, idx) => (
                        <motion.div
                            key={publication._id}
                            variants={cardVariants}
                            custom={idx}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                            className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-xl shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
                        >
                            {publication.coverPhotoUrl && (
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    src={publication.coverPhotoUrl}
                                    alt={publication.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h2 className="text-xl font-bold text-teal-400 mb-2">{publication.title}</h2>
                            {publication.subtitle && (
                                <h3 className="text-md font-medium text-gray-300 mb-3">{publication.subtitle}</h3>
                            )}
                            <div className="mb-4 text-sm text-gray-400 space-y-1">
                                {publication.date && (
                                    <p>
                                        {new Date(publication.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                )}
                                {publication.author && <p>Author: {publication.author}</p>}
                            </div>
                            <p className="text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
                                {publication.description}
                            </p>
                            {/* Buttons */}
                            <div className="flex gap-3 mt-auto">
                                <button
                                    onClick={() => setSelectedPub(publication)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                                >
                                    <FaInfoCircle size={18} />
                                    More Details
                                </button>
                                {publication.publicationLink && (
                                    <a
                                        href={publication.publicationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                                    >
                                        <FaExternalLinkAlt size={18} />
                                        Go to Publication
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedPub && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -100 }}
                            className="relative bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl w-full max-w-3xl text-gray-200 max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedPub(null)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-white bg-gray-700/50 rounded-full p-2 hover:bg-gray-600 transition-colors"
                            >
                                <FaTimes size={18} />
                            </button>
                            {selectedPub.coverPhotoUrl && (
                                <img
                                    src={selectedPub.coverPhotoUrl}
                                    alt={selectedPub.title}
                                    className="w-full h-56 md:h-80 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h2 className="text-2xl font-bold text-teal-400 mb-2">{selectedPub.title}</h2>
                            {selectedPub.subtitle && (
                                <h3 className="text-lg text-gray-300 mb-3">{selectedPub.subtitle}</h3>
                            )}
                            <div className="text-sm text-gray-400 mb-4 space-y-1">
                                {selectedPub.date && (
                                    <p>
                                        {new Date(selectedPub.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                )}
                                {selectedPub.author && <p>Author: {selectedPub.author}</p>}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">{selectedPub.description}</p>
                            {selectedPub.supervisorName && (
                                <div className="p-4 bg-gray-700/30 rounded-lg mb-4 shadow-inner">
                                    <h4 className="font-semibold text-teal-400">Supervisor</h4>
                                    <p className="text-gray-200">{selectedPub.supervisorName}</p>
                                    {selectedPub.supervisorPosition && (
                                        <p className="text-sm text-gray-400">{selectedPub.supervisorPosition}</p>
                                    )}
                                    {selectedPub.supervisorInstitute && (
                                        <p className="text-sm text-gray-400">{selectedPub.supervisorInstitute}</p>
                                    )}
                                </div>
                            )}
                            {selectedPub.publicationLink && (
                                <a
                                    href={selectedPub.publicationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors w-fit"
                                >
                                    <FaExternalLinkAlt size={18} />
                                    Go to Publication
                                </a>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Publications;