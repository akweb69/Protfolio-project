import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import About from './About';
import Publications from '../Components/Publications';
import Trainings from '../Components/Trainings';
import Activity from '../Components/Activity';
import Experiences from '../Components/Experiences';
import Appoinments from '../Components/Appoinments';
import Gallery from '../Components/Gallery';
import Review from '../Components/review';
import axios from 'axios';
import UpdateLoading from '../../Admin/Components/UpdateLoading';
import LeadershipPublic from '../Components/LeadershipPublice';

const HomePage = () => {
    const [visibility, setVisibility] = useState({
        hero: "visible",
        about: "visible",
        publications: "visible",
        training: "visible",
        activities: "visible",
        experiences: "visible",
        appointments: "visible",
        gallery: "visible",
        leadership: "visible",
        reviews: "visible",
    });
    const [loading, setLoading] = useState(false);
    // load data -->
    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/settings`)
            .then(response => {
                setVisibility(response.data[0]);
                console.log(response.data[0]);
                setLoading(false);
            })
            .catch(error => {
                toast.error("Failed to fetch settings");
                setLoading(false);
            });
    }, []);
    // check loading
    if (loading) {
        return <UpdateLoading></UpdateLoading>
    }
    return (
        <div>
            {visibility?.heroVisibility === "visible" && <Hero />}
            {visibility?.aboutVisibility === "visible" && <About />}
            {visibility?.publicationsVisibility === "visible" && <Publications />}
            {visibility?.trainingVisibility === "visible" && <Trainings />}
            {visibility?.experiencesVisibility === "visible" && <Experiences />}
            {visibility?.leadershipVisibility === "visible" && <LeadershipPublic />}
            {visibility?.reviewsVisibility === "visible" && <Review />}
            {visibility?.appointmentsVisibility === "visible" && <Appoinments />}
            {visibility?.galleryVisibility === "visible" && <Gallery />}
            {visibility?.activitiesVisibility === "visible" && <Activity />}



        </div>
    );
};

export default HomePage;