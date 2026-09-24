import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Allbook = () => {
  const axiosSecure = useAxiosSecure(); // 1. হুকটি কম্পোনেন্টের ভেতর কল করা হলো
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAllBook = async () => {
      try {
        // 2. সরাসরি রিলেটিভ পাথ ব্যবহার (baseURL অটোমেটিক পাবে)
        const { data } = await axiosSecure.get(
          `/all-books?filter=${filter}&search=${search}`
        );
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchAllBook();
  }, [filter, search, axiosSecure]);

  const handleReset = () => {
    setFilter('');
    setSearch('');
  };

  return (
    <div>
      {/* Search Section */}
      <div className="flex justify-center py-10 w-full bg-gray-100">
        <div className="flex flex-col">
          <h2 className="md:text-2xl text-base font-semibold mb-5 text-center md:text-left">
            EXPLORE BOOKS
          </h2>

          <div className="flex flex-nowrap items-center gap-2 md:gap-5">
            <select
              name='category'
              id='category'
              className="border p-1 md:p-2 rounded text-xs md:text-sm bg-white"
              onChange={e => setFilter(e.target.value)}
              value={filter}
            >
              <option value=''>Filter by Category</option>
              <option value='Novel'>Novel</option>
              <option value='Thriller'>Thriller</option>
              <option value='History'>History</option>
              <option value='Science'>Science</option>
            </select>

            <div className="flex text-xs md:text-sm">
              <input
                type="text"
                name="search"
                onChange={e => setSearch(e.target.value)}
                value={search}
                placeholder="Enter Book"
                aria-label='Enter Book'
                className="border p-1 md:p-2 rounded-l w-28 md:w-auto bg-white"
              />

              <button 
                type="button" 
                className="bg-blue-500 text-white px-2 md:px-4 rounded-r hover:bg-blue-600 transition"
              >
                Search
              </button>
            </div>

            <button 
              type="button"
              onClick={handleReset} 
              className="border border-blue-500 px-2 md:px-4 py-1 md:py-2 rounded text-blue-500 text-xs md:text-sm hover:bg-blue-50 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Book Cards */}
      <div className="container mx-auto my-8 px-4">
        {books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {books.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No books found!</p>
        )}
      </div>
    </div>
  );
};

export default Allbook;