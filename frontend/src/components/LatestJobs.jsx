import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-4xl font-bold text-center md:text-left">
                <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
            </h1>

            {/* Mobile horizontal slider */}
            <div className="sm:hidden my-8">
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
                    {allJobs.length <= 0 ? (
                        <span className="text-gray-500">No Job Available</span>
                    ) : (
                        allJobs.slice(0,6).map((job) => (
                            <div
                                key={job._id}
                                className="flex-shrink-0 w-72 snap-start"
                            >
                                <LatestJobCards job={job} />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Tablet & Desktop grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                {allJobs.length <= 0 ? (
                    <span className="col-span-full text-center text-gray-500">No Job Available</span>
                ) : (
                    allJobs.slice(0,6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestJobs;


