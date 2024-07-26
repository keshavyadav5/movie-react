import React, { useEffect, useState } from 'react';
import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalScroll from '../components/HorizontalScroll';
import fetchData from '../hoocks/fetchData';

const Home = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const {data : nowPlaying} = fetchData('https://api.themoviedb.org/3/movie/now_playing')
  const {data : topRated } = fetchData('https://api.themoviedb.org/3/movie/top_rated')
  const {data : popular } = fetchData('https://api.themoviedb.org/3/tv/popular')
  const {data : onTheAir } = fetchData('https://api.themoviedb.org/3/tv/on_the_air')


  return (
    <div>
      <BannerHome />
      <HorizontalScroll bannerData={bannerData} heading = {"Trending"} trending={true}/>
      <HorizontalScroll bannerData={nowPlaying} heading={"Now Playing"}/>
      <HorizontalScroll bannerData={topRated} heading={"Top Rated"}/>
      <HorizontalScroll bannerData={popular} heading={"Popular Series"}/>
      <HorizontalScroll bannerData={onTheAir} heading={"On The Air"}/>
    </div>
  );
};

export default Home;