import React from 'react';
import Nav from '../Common/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../Common/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Nav />
            <div className="pb-20">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default HomeLayout;