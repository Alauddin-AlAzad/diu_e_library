import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import axios from 'axios';

const Allbook = () => {

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAllBook();

    const handleFocus = () => {
      fetchAllBook();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchAllBook = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/books`, {
        validateStatus: () => true,
      });

      if (response.status === 200) {
        setBooks(response.data || []);
      } else {
        throw new Error('Server disconnected.');
      }
    } catch (err) {
      console.error('Failed to fetch books:', err);
      setBooks([]);
      setError('Server Disconnected. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-[#1E4E8C]/20 border-t-[#1E4E8C] rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

  return (
    <div >

      {/* Search Section */}
      <div className="flex justify-center py-10 w-full bg-gray-100">

        <div className="flex flex-col">

          <h2 className="md:text-2xl text-base font-semibold mb-5">
            EXPLORE BOOKS
          </h2>

          <div className="flex flex-nowrap items-center gap-2 md:gap-5">

            <select className="border p-1 md:p-2 rounded text-xs md:text-sm">
              <option>Category</option>
               <option value='Novel'>Novel</option>
              <option value='Thriller'>Thriller</option>
              <option value='History'>History</option>
              <option value='Science'>Science</option>
            </select>

            <div className="flex text-xs md:text-sm">
              <input
                type="text"
                name="search"
                placeholder="Book"
                className="border p-1 md:p-2 rounded-l w-24 md:w-auto"
              />

              <button className="bg-blue-500 text-white px-2 md:px-4 rounded-r">
                Search
              </button>
            </div>

            <button className="border border-blue-500 px-2 md:px-4 py-1 md:py-2 rounded text-blue-500 text-xs md:text-sm">
              Reset
            </button>

          </div>

        </div>

      </div>


      {/* Book Cards */}
      <div className="container mx-auto my-8 px-4 " >

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading books...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {books.map(book => (
              <BookCard key={book._id} book={book}></BookCard>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Allbook;