import { useContext, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

import GlobalContext from './store/global-store';
import Sidebar from './components/Sidebar/Sidebar';
import MovieList from './components/MovieList/MovieList';

function App() {
  const ctx = useContext(GlobalContext);

  useEffect(() => {
    ctx.loadPopularMovies();
  }, []);

  const loadMoreMovies = () => {
    if (ctx.searchMode) {
      ctx.loadMoviesByGenres();
    } else {
      ctx.loadPopularMovies();
    }
  };

  const handleLoadMoreClick = () => {
    ctx.activateInfiniteScroll();
  };

  if (!import.meta.env.VITE_API_KEY) {
    return <h1>Error, please contact support</h1>;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <h2>Popular Movies</h2>
        </div>
        <div className="content">
          <Sidebar />
          <div className="movie-container">
            <MovieList />
            {!ctx.infiniteScrollActive && (
              <div className="load_more" onClick={handleLoadMoreClick}>
                Load More
              </div>
            )}
            {ctx.infiniteScrollActive && (
              <InfiniteScroll
                dataLength={ctx.movieList.length}
                next={loadMoreMovies}
                loader={<h4>Loading ...</h4>}
                hasMore={ctx.nextPage <= 1000}
              >
                <div>{null}</div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
