import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import AuthContext from '../Context/AuthContext';

const Modal = ({ books, isOpen, onClose }) => {
    const { user, loading } = useContext(AuthContext);


    if (!isOpen) return null;

    const handleBorrow = () => {

     
        toast.success('Successfully borrowed book ');


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
                        readOnly
                        className="input w-full bg-white"
                    />

                    <input
                        value={user?.displayName}
                        readOnly
                        className="input w-full bg-white"
                    />

                    <input
                        value={user?.email}
                        readOnly
                        className="input w-full bg-white"
                    />

                    <div className='flex flex-row justify-between items-center gap-3'>
                        <h2 className='whitespace-nowrap font-medium text-[#1E4E8C]'>Return Date:</h2>

                        <input
                            type="date"

                            className="input"
                        />
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={handleBorrow}
                    className="mt-4 w-full py-2 rounded-lg text-white font-medium 
                    bg-[#1E4E8C] hover:bg-[#2F6FB2] 
                    hover:scale-105 hover:shadow-lg transition duration-300"
                >
                    Confirm Borrow
                </button>

            </div>
        </div>
    );
};

export default Modal;