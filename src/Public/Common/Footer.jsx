import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white">Md Tanzim Khan</h2>
                    <p className="mt-3 text-sm leading-relaxed">
                        BSc Engineering in Electrical and Electronic Engineering
                    </p>
                    <p className="mt-4 text-xs text-gray-400">
                        © {new Date().getFullYear()} Md Tanzim Khan. All rights reserved.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#about" className="hover:text-blue-400 transition">About Me</a></li>
                        <li><a href="#projects" className="hover:text-blue-400 transition">Projects</a></li>
                        <li><a href="#skills" className="hover:text-blue-400 transition">Skills</a></li>
                        <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
                    </ul>
                </div>

                {/* Social Section */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Me</h3>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/tanzim.khan.12345" target="_blank" rel="noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition">
                            <FaFacebookF className="text-white" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 transition">
                            <FaLinkedinIn className="text-white" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition">
                            <FaGithub className="text-white" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-400 transition">
                            <FaTwitter className="text-white" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
                Designed & Developed with ❤️ by <span className="text-white font-semibold">Md Tanzim Khan</span>
            </div>
        </footer>
    );
};

export default Footer;
