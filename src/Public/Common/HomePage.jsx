import React from 'react';
import Hero from './Hero';
import About from './About';
import Publications from '../Components/Publications';
import Trainings from '../Components/Trainings';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <About />
            <Publications />
            <Trainings />
        </div>
    );
};

export default HomePage;