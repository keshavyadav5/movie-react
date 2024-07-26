import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hoocks/useFetch'; 
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScroll from '../components/HorizontalScroll';
import VideoPlay from '../components/VideoPlay';

const DetailsPage = () => {
  const params = useParams();

  // Correct the state access with the right property name
  const imageURL = useSelector((state) => state.movieData.imageURL);

  // Use the custom hooks to fetch data
  const { data } = useFetch(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetch(`/${params?.explore}/${params?.id}/credits`);
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`);
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  console.log("data", data);
  console.log("star cast", castData);

  const handlePlayVideo = (videoId) => {
    setPlayVideoId(videoId);
    setPlayVideo(true);
  };

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
  const writer = castData?.crew?.filter((el) => el?.job === "Writer")?.map((el) => el?.name)?.join(", ");

  return (
    <div className="bg-neutral-900 text-white">
      {/* Backdrop Image Section */}
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img
            src={imageURL + data?.backdrop_path}
            alt={data?.title || data?.name}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      {/* Main Content Section */}
      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        {/* Poster Image and Play Button */}
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-[240px]'>
          <img
            src={imageURL + data?.poster_path}
            alt={data?.title || data?.name}
            className='h-80 w-60 object-cover rounded shadow-lg'
          />
          <button
            onClick={() => handlePlayVideo(data?.videoId)}
            className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>
            Play Now
          </button>
        </div>

        {/* Movie Details */}
        <div className='flex-grow'>
          <h2 className='text-2xl lg:text-4xl font-bold'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400 italic'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center gap-3 text-neutral-200'>
            <p>
              <span className='font-semibold'>Rating:</span> {Number(data?.vote_average).toFixed(1)}
            </p>
            <span>|</span>
            <p>
              <span className='font-semibold'>Views:</span> {Number(data?.vote_count).toLocaleString()}
            </p>
            <span>|</span>
            <p>
              <span className='font-semibold'>Duration:</span> {duration[0]}h {duration[1]}m
            </p>
          </div>

          <Divider />

          {/* Overview */}
          <div className='my-4'>
            <h3 className='text-xl font-bold mb-2'>Overview</h3>
            <p className='text-neutral-300'>{data?.overview}</p>
          </div>

          <Divider />

          {/* Additional Information */}
          <div className='flex items-center gap-3 my-3'>
            <p>
              <span className='font-semibold'>Status:</span> {data?.status}
            </p>
            <span>|</span>
            <p>
              <span className='font-semibold'>Release Date:</span> {moment(data?.release_date).format("MMMM Do YYYY")}
            </p>
            <span>|</span>
            <p>
              <span className='font-semibold'>Revenue:</span> ${Number(data?.revenue).toLocaleString()}
            </p>
          </div>

          <Divider />

          {/* Crew Information */}
          <div>
            <p>
              <span className='font-semibold'>Director:</span> {castData?.crew?.find(el => el.job === 'Director')?.name || 'N/A'}
            </p>

            <Divider />

            <p>
              <span className='font-semibold'>Writer:</span> {writer || 'N/A'}
            </p>
          </div>

          <Divider />

          {/* Cast */}
          <h2 className='font-bold text-lg mb-3'>Cast:</h2>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-4'>
            {castData?.cast?.filter((el) => el?.profile_path).map((starCast, index) => (
              <div key={index} className='flex flex-col items-center'>
                <div className='w-24 h-24'>
                  <img
                    src={imageURL + starCast?.profile_path}
                    alt={starCast?.name}
                    className='w-full h-full object-cover rounded-full shadow-md'
                  />
                </div>
                <p className='font-bold text-center text-sm text-neutral-400 mt-2'>{starCast?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar and Recommendations */}
      <div className='bg-neutral-800 py-6'>
      <HorizontalScroll bannerData={similarData} heading = {"Similar " + (params?.explore || 'Movies')} trending={false}/>
      <HorizontalScroll bannerData={recommendationData} heading = {"Recommendation " + (params?.explore || 'Movies')} trending={false}/>
      </div>

      {/* Video Player */}
      {playVideo && (
        <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
      )}
    </div>
  );
};

export default DetailsPage;
