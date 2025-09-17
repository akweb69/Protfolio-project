import React from 'react';
import Nav from '../Common/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../Common/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    );
};

export default HomeLayout;