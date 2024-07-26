import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExploreCard from '../components/ExploreCard';

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const query = new URLSearchParams(location?.search).get('q') || '';

  const fetchData = async () => {
    if (loading || !query || !hasMore) return;

    try {
      setLoading(true);
      
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          query: query,
          page: page,
        },
      });

      setData((prev) => {
        return [...prev, ...response.data.results];
      });

      if (response.data.page >= response.data.total_pages) {
        setHasMore(false);
      }

      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      setHasMore(true);
      fetchData();
    }
  }, [location?.search]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='py-16'>

      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query}
          className='px-4 py-2 text-lg w-full bg-white rounded-full text-neutral-900 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition duration-200'
        />
      </div>

      <div className='container mx-auto px-4'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center lg:justify-start'>
          {data.map((item) => (
            <ExploreCard
              key={item.id}
              backdrop_path={item.poster_path}
              date={item.first_air_date || item.release_date}
              rating={item.vote_average}
              name={item.name || item.title}
              title={item.title || item.name}
              media={item.media_type || 'movie'} // Adjusted to support different media types
              id={item.id}
              release_date={item.release_date}
            />
          ))}
        </div>

        {loading && <p className="text-center text-lg text-neutral-600 mt-4">Loading...</p>}
        {!loading && !data.length && <p className="text-center text-lg text-neutral-600 mt-4">No results found.</p>}
      </div>
    </div>
  );
};

export default SearchPage;
