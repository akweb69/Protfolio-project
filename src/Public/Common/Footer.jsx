import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
    // Framer Motion variants for sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
        }),
    };

    // Social icon hover animation
    const iconVariants = {
        hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
    };

    return (
        <footer className="bg-gray-900/80 backdrop-blur-sm text-gray-300 py-12 px-6 md:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Section */}
                <motion.div
                    custom={0}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-bold text-teal-400">Md Tanzim Khan</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">
                        BSc Engineering in Electrical and Electronic Engineering
                    </p>
                    <p className="mt-4 text-xs text-gray-400">
                        © {new Date().getFullYear()} Md Tanzim Khan. All rights reserved.
                    </p>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    custom={1}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h3 className="text-lg font-semibold text-teal-400 mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { href: '#about', label: 'About Me' },
                            { href: '#projects', label: 'Projects' },
                            { href: '#skills', label: 'Skills' },
                            { href: '#contact', label: 'Contact' },
                        ].map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="hover:text-teal-400 transition-colors duration-300"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Social Section */}
                <motion.div
                    custom={2}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h3 className="text-lg font-semibold text-teal-400 mb-3">Follow Me</h3>
                    <div className="flex space-x-4">
                        {[
                            { href: 'https://www.facebook.com/tanzim.khan.12345', icon: FaFacebookF, color: 'hover:bg-blue-600' },
                            { href: 'https://www.linkedin.com', icon: FaLinkedinIn, color: 'hover:bg-blue-500' },
                            { href: 'https://github.com', icon: FaGithub, color: 'hover:bg-gray-700' },
                            { href: 'https://twitter.com', icon: FaTwitter, color: 'hover:bg-blue-400' },
                        ].map((social) => (
                            <motion.a
                                key={social.href}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/50 border border-gray-700 ${social.color} transition-colors duration-300`}
                                variants={iconVariants}
                                whileHover="hover"
                            >
                                <social.icon className="text-white" size={18} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Line */}
            <motion.div
                className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                Designed & Developed with <FaHeart className="inline text-red-400" /> by{' '}
                <span className="text-teal-400 font-semibold">Md Tanzim Khan</span>
            </motion.div>
        </footer>
    );
};

export default Footer;