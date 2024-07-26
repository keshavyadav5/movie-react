import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageURL = useSelector(state => state.movieData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : bannerData.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); 
    return () => clearInterval(interval);
  }, [bannerData.length]); 

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden group'>
        {bannerData.map((data, index) => (
          <div key={index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative transition-transform duration-500' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            <div className='h-full w-full'>
              <img src={imageURL + data.backdrop_path} alt={data.title || data.name} className='h-full w-full object-cover' />
            </div>

            {/* Next and Previous buttons */}
            <div className='absolute top-0 w-full h-full px-3 hidden items-center justify-between group-hover:flex'>
              <button onClick={handlePrevious} aria-label="Previous" className='bg-white z-10 text-black p-1 rounded-full'>
                <FaAngleLeft />
              </button>
              <button onClick={handleNext} aria-label="Next" className='bg-white z-10 text-black p-1 rounded-full'>
                <FaAngleRight />
              </button>
            </div>

            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

            <div className='container mx-auto'>
              <div className='w-full absolute bottom-0 max-w-md px-3'>
                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data.title || data.name}</h2>
                <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                <div className='flex items-center gap-4'>
                  <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                  <span>|</span>
                  <p>Views: {Number(data.popularity).toFixed(0)}</p>
                </div>
                <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all scale-105'>
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerHome;