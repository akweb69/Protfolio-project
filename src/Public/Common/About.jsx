import React from 'react';
import HeadLine from '../Components/HeadLine';

const About = () => {
    return (
        <div className='w-11/12 mx-auto text-white '>
            {/* headline */}
            <HeadLine
                title="About Me"
                subTitle="Get to know me better"
            />
        </div>
    );
};

export default About;