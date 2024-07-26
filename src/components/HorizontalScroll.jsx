import React, { useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Card from './Card';
import { useSelector } from 'react-redux';

const HorizontalScroll = ({bannerData,heading,trending}) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -260,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 260, 
      behavior: 'smooth',
    });
  };

  return (
    <div className='container my-10 px-3 w-full mx-auto'>
      <h2 className='text-xl lg:text-2xl mb-3 font-bold text-white'>{heading}</h2>

      <div className='relative'>
        <div
          ref={scrollRef}
          className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll overflow-hidden relative z-10 scrollbar-hide' 
        >
          {bannerData && bannerData.length > 0 ? (
            bannerData.map((item, index) => (
              <Card
                key={index + item.name || item.title + item.id}
                backdrop_path={item.poster_path}
                date={item.first_air_date}
                rating={item.vote_average}
                name={item.name}
                title={item.title}
                media={item.media_type}
                id={item.id}
                release_date={item.release_date}
                trending={trending}
              />
            ))
          ) : (
            <p>No trending movies available.</p>
          )}
        </div>

        {/* Next and Previous buttons */}
        <div className='absolute top-0 h-full w-full lg:flex justify-between items-center hidden'>
          <button
            onClick={scrollLeft}
            aria-label="Previous"
            className=' absoulute -ml-2 bg-white z-10 text-black p-1 rounded-full'
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Next"
            className='right-4 bg-white z-10 text-black p-1 rounded-full'
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
