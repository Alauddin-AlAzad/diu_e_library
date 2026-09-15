import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import axios from 'axios';

const Allbook = () => {

  const [books, setBooks] = useState([])
  // const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [search, setSearch]=useState('')


  useEffect(() => {
    const fetchAllBook = async () => {

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-books?filter=${filter}&search=${search}`,);
      setBooks(data)

    }
    fetchAllBook();

  }, [filter,search]);

  const handleReset=()=>{
    setFilter('')
    setSearch('')
  }

  console.log(filter)
  // if (loading) {
  //       return (
  //           <div className="flex justify-center items-center min-h-[300px]">
  //               <div className="relative flex items-center justify-center">
  //                   <div className="w-16 h-16 border-4 border-[#1E4E8C]/20 border-t-[#1E4E8C] rounded-full animate-spin"></div>
  //               </div>
  //           </div>
  //       );
  //   }

  return (
    <div >

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
              <option >Filter by Category</option>
              <option value='Novel'>Novel</option>
              <option value='Thriller'>Thriller</option>
              <option value='History'>History</option>
              <option value='Science'>Science</option>
            </select>

            <div className="flex text-xs md:text-sm">
              <input
                type="text"
                name="search"
                onChange={e=>setSearch(e.target.value)}
                value={search}
                placeholder="Enter Book "
                aria-label='Enter Book'
                className="border p-1 md:p-2 rounded-l w-24 md:w-auto"
              />

              <button className="bg-blue-500 text-white px-2 md:px-4 rounded-r">
                Search
              </button>
            </div>

            <button onClick={handleReset} className="border border-blue-500 px-2 md:px-4 py-1 md:py-2 rounded text-blue-500 text-xs md:text-sm">
              Reset
            </button>

          </div>

        </div>

      </div>


      {/* Book Cards */}
      <div className="container mx-auto my-8 px-4 " >

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {books.map(book => (
            <BookCard key={book._id} book={book}></BookCard>
          ))}

        </div>


      </div>

    </div>
  );
};

export default Allbook;