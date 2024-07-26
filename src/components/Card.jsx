import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const imageURL = useSelector(state => state.movieData.imageURL);

  return (
    <Link to={'/'+props.media+"/"+props.id} className='h-full w-full relative  hover:scale-105 transition-all'>
      <div className='min-w-[230px] max-w-[230px] '>
        <img
          src={imageURL + props.backdrop_path}
          alt="Movie Poster"
          className='h-full w-full object-cover'
        />
      </div>
      <div className='absolute top-5 bg-black/70 rounded-r-full '>
        {props.trending && <h2 className='text-sm px-4 py-1'>#1 Trending</h2>}
      </div>
      <div className='absolute w-full h-14 bg-black/70 bottom-0'>
        <h2 className='text-md px-2 py-1 text-neutral-300 text-ellipsis line-clamp-1 '>{props.title || props.name}</h2>
        <div className='flex justify-between px-2'>
          <p className='text-sm text-neutral-400'>{moment(props.date || props.release_date).format("MMM Do YY")}</p>
          <p className='text-white'>Rating : {Number(props.rating).toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;