import React from 'react';
import Hero from './Hero';
import About from './About';
import Publications from '../Components/Publications';
import Trainings from '../Components/Trainings';
import Activity from '../Components/Activity';
import Experiences from '../Components/Experiences';
import Appoinments from '../Components/Appoinments';
import Gallery from '../Components/Gallery';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <About />
            <Publications />
            <Trainings />
            <Activity />
            <Experiences />
            <Appoinments />
            <Gallery></Gallery>
        </div>
    );
};

export default HomePage;