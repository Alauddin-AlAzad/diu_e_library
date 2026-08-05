import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50">
                <Navbar></Navbar>
            </header>
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;