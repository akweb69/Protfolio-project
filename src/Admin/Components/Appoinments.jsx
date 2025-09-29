import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateLoading from './UpdateLoading';

const Appoinments = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    // load data-->
    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_BASE_URL}/appointments`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))

    }, [])
    // checking loading state
    if (loading) {
        return <UpdateLoading></UpdateLoading>
    }
    // main appointments table
    return (
        <div className='w-full p-4 md:p-6 bg-white/10 rounded-2xl'>
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl md:text-3xl fontHeader font-bold flex-1 text-white">All Appoinments</h1>
                <button className=" btn btn-primary     rounded-full">
                    Total <div className="badge  text-white badge-error badge-sm md:badge-sm ">+{data.length}</div>
                </button>
            </div>
            {/* main appointments table */}
            <main className="mt-6 w-full overflow-x-scroll">
                <table className="w-full   table table-md text-white">
                    <thead>
                        <tr className='text-white'>
                            <th className=" px-4 py-2">Name</th>
                            <th className=" px-4 py-2">Email</th>
                            <th className=" px-4 py-2">Phone</th>
                            <th className=" px-4 py-2">Date</th>
                            <th className=" px-4 py-2">Time</th>
                            <th className=" px-4 py-2">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => (
                                <tr key={item._id} className="border-b border-white/20">
                                    <td className=" px-4 py-2">{item?.name || 'N/A'}</td>
                                    <td className=" px-4 py-2">{item?.email || 'N/A'}</td>
                                    <td className=" px-4 py-2">{item?.phone || 'N/A'}</td>
                                    <td className=" px-4 py-2">{item?.date || 'N/A'}</td>
                                    <td className=" px-4 py-2">{item?.time || 'N/A'}</td>
                                    <td className=" px-4 py-2">{item?.message || 'N/A'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Appoinments;