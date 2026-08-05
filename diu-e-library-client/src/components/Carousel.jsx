import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import bgimg1 from '../assets/bg-1.jpg';
import bgimg2 from '../assets/bg-2.jpg';
import bgimg3 from '../assets/bg-3.jpg';
import Slider from './Slider';


export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      loop
      autoplay={{ delay: 5000 }}
      navigation
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      <SwiperSlide>
        <Slider
          activeIndex={activeIndex}
          slideIndex={0}
          image={bgimg1}
          text="Unlimited Books"
          subtext="Search, borrow, and manage your library account with ease."
          button={[
            {label:'Start Exploring', to:'/login'}
          ]}
        />
      </SwiperSlide>

      <SwiperSlide>
        <Slider
          activeIndex={activeIndex}
          slideIndex={1}
          image={bgimg2}
          text="Read Anytime, Anywhere"
          subtext="24/7 access to books, journals, and research materials."
         button={[
            {label:'Browse Collection', to:'/allbooks'}
          ]}
        />
      </SwiperSlide>

      <SwiperSlide>
        <Slider
          activeIndex={activeIndex}
          slideIndex={2}
          image={bgimg3}
          text="Your Digital Library"
          subtext="Track reading, borrowing, and returns effortlessly."
         button={[
            {label:'Create Account', to:'/login'}
          ]}
        />
      </SwiperSlide>
    </Swiper>
  );
}
