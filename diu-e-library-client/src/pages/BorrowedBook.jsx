import React from 'react';
import BorrowBookcard from '../components/BorrowBookcard';

const BorrowedBook = () => {
    return (
        <div className='container mx-auto md:mt-15 mt-8 px-2 bg-gray-100 rounded-xl'>
            <h3 className="md:text-2xl text-base font-semibold mb-5 ">My Borrowed Books</h3>
            <div className=''>
                <BorrowBookcard></BorrowBookcard>
                <BorrowBookcard></BorrowBookcard>

            </div>
        </div>
    );
};

export default BorrowedBook;