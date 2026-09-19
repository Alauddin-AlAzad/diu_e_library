import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Allbook = () => {
  const axiosSecure = useAxiosSecure(); // ১. কম্পোনেন্টের ভেতর হুক কল করো
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAllBook = async () => {
      try {
        // ২. baseURL অটোমেটিক আসবে, শুধু রিলেটিভ পাথ দাও
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
          <h2 className="md:text-2xl text-base font-semibold mb-5">
            EXPLORE BOOKS
          </h2>

          <div className="flex flex-nowrap items-center gap-2 md:gap-5">
            <select
              name='category'
              id='category'
              className="border p-1 md:p-2 rounded text-xs md:text-sm"
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
                className="border p-1 md:p-2 rounded-l w-24 md:w-auto"
              />

              <button type="button" className="bg-blue-500 text-white px-2 md:px-4 rounded-r">
                Search
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="border border-blue-500 px-2 md:px-4 py-1 md:py-2 rounded text-blue-500 text-xs md:text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Book Cards */}
      <div className="container mx-auto my-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allbook;