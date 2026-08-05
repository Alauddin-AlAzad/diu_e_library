import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import TabCategories from '../components/TabCategories';
import NewArrival from './NewArrival';
import LatestNotice from '../components/LatestNotice';

const Home = () => {
    return (
        <div>
         <Carousel></Carousel>
         <TabCategories></TabCategories>
         <NewArrival></NewArrival>
         <LatestNotice></LatestNotice>
        </div>
    );
};

export default Home;