import React from 'react';

const BorrowBookcard = () => {
    return (
        <div className='pt-3'>
            
            <div className='flex flex-col md:flex-row justify-between md:items-center p-4 rounded-xl shadow-md gap-4 
            bg-[#F0F6FF] border border-[#2F6FB2]/20'>

                {/* LEFT */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                    
                    <div className='w-[100px] h-[140px] sm:w-[120px] sm:h-[170px] rounded-lg overflow-hidden  shadow-sm'>
                        <img 
                            className='w-full h-full object-cover' 
                            src="https://bookabook.pk/cdn/shop/products/38.png?v=1651693501" 
                            alt="book" 
                        />
                    </div>

                    <div className='space-y-1'>
                        <p className='text-base sm:text-lg font-bold text-[#1E4E8C]'>
                            The Midnight Library: A Novel Book by Matt Haig
                        </p>

                        <p className='font-semibold text-[#2FB34A] text-sm sm:text-base'>
                            📚 Category : Novel
                        </p>

                        <div className='text-xs sm:text-sm text-gray-600'>
                            <p>📅 Borrowed: 13 April 2026</p>
                            <p>⏳ Return: 23 April 2026</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className='w-full md:w-auto'>
                    <button className='w-full md:w-auto px-5 py-2 rounded-lg text-white font-medium 
                    bg-[#1E4E8C] hover:bg-[#2F6FB2] 
                    hover:scale-105 hover:shadow-lg transition duration-300'>
                        Return
                    </button>
                </div>

            </div>

        </div>
    );
};

export default BorrowBookcard;