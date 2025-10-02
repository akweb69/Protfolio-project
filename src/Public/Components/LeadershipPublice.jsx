import React from 'react';
import HeadLine from './HeadLine';
import UpdateLoading from '../../Admin/Components/UpdateLoading';

const LeadershipPublice = () => {
    const [loading, setLoading] = useState(false);


    // check loading 
    if (loading) {
        return (
            <UpdateLoading></UpdateLoading>
        )
    }
    return (
        <div className='w-11/12 mx-auto'>
            <HeadLine title="Leadership" subTitle="Meet Our Leadership Team" />
            {/* main content */}
        </div>
    );
};

export default LeadershipPublice;