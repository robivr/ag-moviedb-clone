import { useState, useEffect, useContext } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import './Sidebar.css';
import Genre from './Genre';
import GlobalContext from '../../store/global-store';

const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US';

const Sidebar = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const ctx = useContext(GlobalContext);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `${genreUrl}&api_key=${import.meta.env.VITE_API_KEY}`
      );

      const data = await res.json();

      setGenreList(data.genres);
    };

    fetchGenres();
  }, []);

  const toggleFilter = () => {
    setFiltersOpen((filtersOpen) => !filtersOpen);
  };

  const handleSearch = () => {
    if (ctx.genreFilter.length === 0) {
      window.location.reload();
      return;
    }

    ctx.activateSearchMode();
  };

  return (
    <div className="sidebar">
      <div className="filter_card">
        <div className="card_name">
          <span>Sort</span>
          <span className="filter_icon">
            <AiOutlineRight />
          </span>
        </div>
      </div>
      <div className={`filter_card ${filtersOpen ? 'filter_open' : ''}`}>
        <div className="card_name" onClick={toggleFilter}>
          <span>Filters</span>
          <span className="filter_icon">
            <AiOutlineRight />
          </span>
        </div>
        <div className={`filter_card_bot ${filtersOpen ? 'filter_open' : ''}`}>
          <h3>Genres</h3>
          <ul className="genre-list">
            {genreList.map((genre: any) => (
              <Genre key={genre.id} {...genre} />
            ))}
          </ul>
        </div>
      </div>
      <div className="filter_card">
        <div className="card_name">
          <span>Where To Watch</span>
          <span className="filter_icon">
            <AiOutlineRight />
          </span>
        </div>
      </div>
      <div
        className={`filter_button ${
          ctx.searchButtonActive ? '' : 'filter_button_inactive'
        }`}
        onClick={handleSearch}
      >
        Search
      </div>
    </div>
  );
};

export default Sidebar;
