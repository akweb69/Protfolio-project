import React, { useEffect, useState } from 'react';
import HeadLine from '../Components/HeadLine';
import axios from 'axios';
import toast from 'react-hot-toast';
import UpdateLoading from '../../Admin/Components/UpdateLoading';
import Education from '../Components/Education';
import Skills from '../Components/Skills';

const About = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        setLoading(true)
        axios.get(`${baseUrl}/about-section`)
            .then(res => {
                const data = res.data;
                setData(data)
                setLoading(false)

            })
            .catch(error => {
                console.log("from fecthing about data--->", error)
                toast.error("Error from fetching about data")
            })
    }, [])
    // checking loading 
    if (loading) {
        return <UpdateLoading></UpdateLoading>
    }
    return (
        <div
            id='about'
            className='w-11/12 mx-auto text-white '>
            {/* headline */}
            <HeadLine
                title="About Me"
                subTitle="Get to know me better"
            />
            {/* about descriptions */}
            <p className="w-full px-3 text-center md:max-w-2/3  mx-auto md:text-lg text-gray-200">
                {data[0]?.descriptions}
            </p>
            <div className="lg:grid h-full grid-cols-2 gap-5 py-8 items-center space-y-6 lg:space-y-0">

                {/* educations sections */}
                <div className="border h-full border-[rgba(255,255,255,0.07)] p-4 rounded-lg shadow-md ">
                    <h1 className="text-3xl text-center md:text-4xl font-bold fontHeader text-teal-500">
                        Educations
                    </h1>
                    <div className="divider  "></div>
                    {/* main component */}
                    <Education></Education>
                </div>
                {/* skills sections */}
                <div className="border h-full border-[rgba(255,255,255,0.07)] p-4 rounded-lg shadow-md">
                    <h1 className="text-3xl text-center md:text-4xl font-bold fontHeader text-teal-500">
                        Skills
                    </h1>
                    <div className="divider "></div>
                    {/* main component */}
                    <Skills></Skills>
                </div>
            </div>
        </div>
    );
};

export default About;