import React, { useEffect, useState } from 'react';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BookCard from './BookCard';
import axios from 'axios';

const TabCategories = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();

    const handleFocus = () => {
      fetchBooks();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchBooks = async () => {
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
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setBooks([]);
      setError('Server Disconnected. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ["Novel", "Thriller", "History", "Science"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#1E4E8C]"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 bg-[#F8FAFF] min-h-screen">

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1E4E8C]">
        Browse Books By Categories
      </h2>

      <p className="text-sm text-center text-gray-500 max-w-2xl mx-auto mt-3 mb-10">
        Explore books by category: Novel, Thriller, History, Science
      </p>

      <Tabs>

        {/* TAB LIST */}
        <div className="flex justify-center mb-8">
          <TabList className="flex flex-wrap gap-3 bg-[#F0F6FF] p-2 rounded-xl border border-[#2F6FB2]/20">

            {categories.map((cat) => (
              <Tab
                key={cat}
                className="px-4 py-2 text-sm font-medium rounded-lg cursor-pointer 
                text-gray-600 hover:bg-[#2F6FB2] hover:text-white transition duration-300"
                selectedClassName="bg-[#1E4E8C] text-white shadow-md"
              >
                {cat}
              </Tab>
            ))}

          </TabList>
        </div>

        {/* PANELS */}
        {categories.map((cat) => (
          <TabPanel key={cat}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

              {books
                .filter(book => book.category === cat)
                .map(book => (
                  <BookCard key={book._id} book={book} />
                ))}

            </div>
          </TabPanel>
        ))}

      </Tabs>

    </div>
  );
};

export default TabCategories;