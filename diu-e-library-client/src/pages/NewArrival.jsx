import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import NewArrivalItem from '../components/NewArrivalItem';


const NewArrival = () => {
    return (
        <div className="py-10">
            <div className='container mx-auto'>
                <p className='lg:text-3xl text-xl mx-4 py-4 font-bold'>
                    New Arrivals
                </p>
            </div>

            <div className="container mx-auto px-4">
                <Swiper
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 5 },
                    }}
                >
                    <SwiperSlide>
                        <NewArrivalItem title="Book 1" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <NewArrivalItem title="Book 2" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <NewArrivalItem title="Book 3" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <NewArrivalItem title="Book 4" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NewArrivalItem title="Book 5" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NewArrivalItem title="Book 6" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NewArrivalItem title="Book 7" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default NewArrival;