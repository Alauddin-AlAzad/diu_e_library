import React, { useEffect, useState, useCallback } from 'react';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BookCard from './BookCard';
import useAxiosSecure from '../hooks/useAxiosSecure';

const TabCategories = () => {
  const axiosSecure = useAxiosSecure(); 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

  
      const res = await axiosSecure.get('/books');

      if (res.status === 200) {
        setBooks(res.data || []);
      } else {
        throw new Error('Failed to load books');
      }
    } catch (err) {
      console.error('Failed to fetch books:', err);
      setBooks([]);
      setError('Server Disconnected. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchBooks();

    const handleFocus = () => {
      fetchBooks();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchBooks]);

  const categories = ["Novel", "Thriller", "History", "Science"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#1E4E8C]/20 border-t-[#1E4E8C] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 font-medium">
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
                text-gray-600 hover:bg-[#2F6FB2] hover:text-white transition duration-300 outline-none"
                selectedClassName="bg-[#1E4E8C] text-white shadow-md"
              >
                {cat}
              </Tab>
            ))}
          </TabList>
        </div>

        {/* PANELS */}
        {categories.map((cat) => {
          const filteredBooks = books.filter(book => book.category === cat);

          return (
            <TabPanel key={cat}>
              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredBooks.map(book => (
                    <BookCard key={book._id} book={book} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-10">
                  No books found in {cat} category.
                </p>
              )}
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
};

export default TabCategories;