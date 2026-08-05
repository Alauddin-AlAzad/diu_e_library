import React from 'react';

const LatestNotice = () => {
    return (
        <div className='w-full bg-[#F0F6FF]  lg:pb-8 pb-6  '>
            <p className='text-center lg:py-10 py-6  text-xl lg:text-3xl font-bold'>Latest Notice</p>
            <div className='flex flex-col gap-4 w-[95%] mx-auto lg:w-full'>
                <div className='container mx-auto bg-white rounded-xl border border-gray-400  px-4 py-4'>
                    <p className='text-[16px] font-medium'>may 14, 2025</p>
                    <h3 className='lg:text-2xl text-xl text-[#1E4E8C] font-semibold py-2'>New Books Added to the Library</h3>
                    < p className='font-medium'>We’ve added a wide range of new collections to the library, including books on programming, research methodologies, and competitive programming. These resources are carefully selected to support your academic growth and skill development. We encourage all students to visit the library or explore the online portal to discover these new additions and make the most of them.</p>
                    <div className="pt-3">
                        <button className="px-5 py-2 bg-[#1E4E8C] text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                            Read More →
                        </button>
                    </div>
                </div>
                {/* 2 */}
                <div className='container mx-auto bg-white rounded-xl border border-gray-400  px-4 py-4'>
                    <p className='text-[16px] font-medium'>may 14, 2025</p>
                    <h3 className='lg:text-2xl text-xl text-[#1E4E8C] font-semibold py-2'>New Books Added to the Library</h3>
                    < p className='font-medium'>We’ve added a wide range of new collections to the library, including books on programming, research methodologies, and competitive programming. These resources are carefully selected to support your academic growth and skill development. We encourage all students to visit the library or explore the online portal to discover these new additions and make the most of them.</p>
                    <div className="pt-3">
                        <button className="px-5 py-2 bg-[#1E4E8C] text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                            Read More →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestNotice;