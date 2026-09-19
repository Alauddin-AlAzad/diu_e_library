import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';

const BorrowBookcard = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchAllBooks();
        }
    }, [user?.email]);

    const fetchAllBooks = async () => {
        try {
            setLoading(true); 
            const { data } = await axiosSecure.get(
                `/my-borrow-book/${user?.email}`
            );
            setBooks(data);
        } catch (error) {
            console.error("Error fetching borrowed books:", error);
        } finally {
            setLoading(false); 
        }
    };

    const handleReturn = async (borrowId, mainBookId) => {
        try {
            const { data } = await axios.delete(
                `${import.meta.env.VITE_API_URL}/return-book/${borrowId}?bookId=${mainBookId}`
            );

            if (data?.deletedCount > 0) {
                toast.success("Book Returned Successfully");
                setBooks(prevBooks => prevBooks.filter(book => book._id !== borrowId));
            }
        } catch (error) {
            console.error("Error returning book:", error);
            toast.error("Failed to return the book.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-[#1E4E8C]/20 border-t-[#1E4E8C] rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }


    if (books.length === 0) {
        return <p className="text-center pt-5 text-gray-500">No borrowed books found!</p>;
    }

    return (
        <div className="pt-3 space-y-4">
            {books.map((book) => (
                <div
                    key={book._id}
                    className="flex flex-col md:flex-row justify-between md:items-center p-4 rounded-xl shadow-md gap-4 bg-[#F0F6FF] border border-[#2F6FB2]/20"
                >
                    {/* LEFT */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-[100px] h-[140px] sm:w-[120px] sm:h-[170px] rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                            <img
                                className="w-full h-full object-cover"
                                src={book.image || book.coverImage || "https://bookabook.pk/cdn/shop/products/38.png?v=1651693501"}
                                alt={book.title}
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-base sm:text-lg font-bold text-[#1E4E8C]">
                                {book.title}
                            </p>

                            {book.category && (
                                <p className="font-semibold text-[#2FB34A] text-sm sm:text-base">
                                    Category : {book.category}
                                </p>
                            )}

                            <div className="text-xs sm:text-sm text-gray-600">
                                {book.borrowedDate && <p>📅 Borrowed: {book.borrowedDate}</p>}
                                <p> Return: {book.returnDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-full md:w-auto">
                        <button 
                            onClick={() => handleReturn(book?._id, book?.bookId)} 
                            className="w-full md:w-auto px-5 py-2 rounded-lg text-white font-medium bg-[#1E4E8C] hover:bg-[#2F6FB2] hover:scale-105 hover:shadow-lg transition duration-300 cursor-pointer"
                        >
                            Return
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BorrowBookcard;