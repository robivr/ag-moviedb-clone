import { useContext, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

import GlobalContext from './store/global-store';
import Sidebar from './components/Sidebar/Sidebar';
import MovieList from './components/MovieList/MovieList';

function App() {
  const ctx = useContext(GlobalContext);

  useEffect(() => {
    ctx.loadMovies();
  }, []);

  const loadMoreMovies = () => {
    ctx.loadMovies();
    ctx.activateInfiniteScroll();
  };

  return (
    <div className="App">
      <div>
        <h2>Popular Movies</h2>
      </div>
      <div className="container">
        <Sidebar />
        <div className="movie-container">
          <MovieList />
          {!ctx.infiniteScrollActive && (
            <div className="load_more" onClick={loadMoreMovies}>
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
              <div>child placeholder</div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
