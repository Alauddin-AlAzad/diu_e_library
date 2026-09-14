import React, { useState, useContext } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const Modal = ({ books, isOpen, onClose }) => {

    const { _id } = books || {}
    console.log(_id)
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate()

    if (!isOpen) return null;

    const handleBorrow = async (e) => {

        e.preventDefault()
        const form = e.target
        const title = form.bookName.value
        const userName = form.userName.value
        const userEmail = form.userEmail.value
        const returnDate = form.returnDate.value
        const bookId = _id
        const image = books?.imgUrl;
        const category = books?.category;

        const borrowData = { title, userName, userEmail, returnDate, bookId,image,category }
        try {
            // make a post request

            if (books?.owner?.email === user?.email) {
                toast.error("You Cant select your own book")
                return;
            }
            await axios.post(`${import.meta.env.VITE_API_URL}/borrow-book`, borrowData)
            //from reset
            form.reset()
            toast.success('Successfully borrowed book ');
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data)
        }


        navigate('/browwedbook')
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal Box */}
            <form onSubmit={handleBorrow}>
                <div className="relative w-full max-w-lg p-6 rounded-2xl 
                bg-[#F0F6FF] border border-[#2F6FB2]/20 shadow-xl">

                    {/*  Loading overlay */}
                    {loading && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl z-10">
                            <span className="loading loading-spinner loading-lg text-[#1E4E8C]"></span>
                        </div>
                    )}

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        type="button"
                        className="absolute right-3 top-3 text-gray-600 hover:text-black"
                    >
                        ✕
                    </button>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#1E4E8C] mb-4">
                        Borrow Book
                    </h3>

                    {/* Content */}
                    <div className="space-y-3">

                        <input
                            value={books?.bookName}
                            name='bookName'
                            readOnly
                            required
                            className="input w-full bg-white"
                        />

                        <input
                            value={user?.displayName}
                            name="userName"
                            required
                            readOnly
                            className="input w-full bg-white"
                        />

                        <input
                            value={user?.email}
                            name="userEmail"
                            readOnly
                            required
                            className="input w-full bg-white"
                        />

                        <div className='flex flex-row justify-between items-center gap-3'>
                            <h2 className='whitespace-nowrap font-medium text-[#1E4E8C]'>Return Date:</h2>

                            <input
                                type="date"
                                name="returnDate"
                                className="input"
                                required
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button

                        className="mt-4 w-full py-2 rounded-lg text-white font-medium 
                    bg-[#1E4E8C] hover:bg-[#2F6FB2] 
                    hover:scale-105 hover:shadow-lg transition duration-300"
                    >
                        Confirm Borrow
                    </button>

                </div>

            </form>

        </div>
    );
};

export default Modal;