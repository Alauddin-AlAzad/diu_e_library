import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import Modal from '../components/Modal';
import AuthContext from '../Context/AuthContext';

const BookDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const [books, setBook] = useState(null);
    const navigate = useNavigate()

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchBookDetails();
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/book/${id}`);
            setBook(data);
        } catch (error) {
            console.error('Failed to fetch book details:', error);
            setBook(null);
        }
    };


    return (
        <div>


            <div className='container mx-auto min-h-[300px] my-20 flex lg:flex-row flex-col items-center lg:items-start justify-center gap-6 pt-8 px-4'>

                {/*  BOOK IMAGE */}
                <div className="lg:w-[30%] w-[70%] sm:w-[50%]">
                    <img
                        className="w-full h-full object-cover rounded-xl shadow-lg border border-[#2F6FB2]/20"
                        src={books?.imgUrl}
                        alt={books?.bookName}
                    />
                </div>

                <div className='lg:w-[49%] w-full p-4 rounded-xl bg-[#F0F6FF] border border-[#2F6FB2]/20 shadow-sm'>

                    <h2 className='text-lg lg:text-2xl font-medium mb-2 text-[#1E4E8C]'>
                        {books?.bookName}
                    </h2>

                    <p className='text-sm lg:text-[16px] text-[#FF005E] font-medium mb-2'>
                        Author: {books?.authorName}
                    </p>

                    <p className='text-sm lg:text-[16px] mb-2'>
                        Category: <span className="font-medium">{books?.category}</span>
                    </p>

                    <div className='flex gap-2 text-gray-500 text-sm mb-4'>
                        <span>{books?.rating} Star</span>
                        <span>•</span>
                        <span>{books?.quantity} book available</span>
                    </div>

                    <div className='my-2 p-4 bg-white rounded-lg border border-gray-200'>

                        <h3 className='text-lg lg:text-xl font-semibold mb-2 text-[#1E4E8C]'>
                            Your Details
                        </h3>

                        <>
                            <p className='font-medium text-sm lg:text-base my-1'>
                                Name: {user?.displayName}
                            </p>

                            <p className='font-medium text-sm lg:text-base'>
                                Email: {user?.email}
                            </p>
                        </>


                    </div>

                    {/* BUTTON */}
                    <button
                        className='btn w-full rounded-xl text-white text-sm lg:text-base mt-4 
                        bg-[#1E4E8C] hover:bg-[#2F6FB2]
                        transition duration-300 hover:scale-[1.02]'
                        onClick={() => setIsModalOpen(true)}
                        disabled={books?.quantity === 0}
                    >
                        {books?.quantity === 0 ? 'Not Available' : 'Borrow Now'}
                       
                    </button>

                    {/* 📖 DESCRIPTION */}
                    <div className='mt-6'>
                        <h2 className='text-lg lg:text-xl font-semibold mb-2'>
                            Details:
                        </h2>

                        <p className='text-sm lg:text-base text-gray-600 leading-relaxed'>
                            {books?.description || 'No description available.'}
                        </p>
                    </div>

                </div>
            </div>

            {/*  MODAL */}
            <Modal
                books={books}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </div>
    );
};

export default BookDetails;