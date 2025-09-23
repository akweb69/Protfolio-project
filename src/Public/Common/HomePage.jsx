import React from 'react';
import Hero from './Hero';
import About from './About';
import Publications from '../Components/Publications';
import Trainings from '../Components/Trainings';
import Activity from '../Components/Activity';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <About />
            <Publications />
            <Trainings />
            <Activity />
        </div>
    );
};

export default HomePage;