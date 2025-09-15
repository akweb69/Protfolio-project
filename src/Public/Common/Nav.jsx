import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="w-full py-4">
            <div className='max-w-3xl text-white px-6 mx-auto p-4 border rounded-full shadow-lg border-[rgba(0,0,0,0.2)]'>
                <div className="w-full flex justify-between items-center gap-4">
                    <h2 className='text-white text-2xl '>Abu Kalam</h2>
                    {/* right side links */}
                    <div className="flex items-center gap-2">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/about"}>About</Link>
                        <Link to={"/projects"}>Projects</Link>
                        <Link to={"/blogs"}>Blogs</Link>
                        <Link to={"/contact"}>Contact</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Nav;