import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/MovieSlice';

function App() {
  const dispatch = useDispatch()

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/week');
      dispatch(setBannerData(response.data.results))
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
const fetchConfiguration = async () =>{
  try {
    const response = await axios.get('/configuration')
    dispatch(setImageURL(response.data.images.secure_base_url+"original"))
  } catch (error) {
    console.log("erro",error);
  }
}

  useEffect(()=>{
    fetchTrendingData()
    fetchConfiguration()
  },[])
  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className=''>
        <Outlet className='min-h-[90vh]'/>
      </div>
      <Footer />
      <MobileNavigation/>
    </main>
  );
}

export default App;
