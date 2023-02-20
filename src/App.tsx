import { useEffect, useState } from 'react';
import './App.css';

import MovieCard from './components/MovieCard/MovieCard';
import Sidebar from './components/Sidebar/Sidebar';

const trendingUrl = 'https://api.themoviedb.org/3/movie/popular';

const formatDate = (dateString: string) => {
  const tempDate = new Date(dateString).toDateString();
  const splitDate = tempDate.split(' ').splice(1);

  return `${splitDate[0]} ${splitDate[1]}, ${splitDate[2]}`;
};

interface MovieProps {
  id: number;
  adult: boolean;
  title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

function App() {
  const [movieList, setMovieList] = useState<MovieProps | any>(null);
  const [loadedPages, setLoadedPages] = useState(0);

  useEffect(() => {
    const fetchFirstBatch = async () => {
      const res = await fetch(
        `${trendingUrl}?api_key=${import.meta.env.VITE_API_KEY}`
      );
      const data = await res.json();

      const formattedData = data.results.map((movie: any) => {
        return {
          ...movie,
          release_date: formatDate(movie.release_date),
          backdrop_path: `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`,
          poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`,
        };
      });

      setMovieList(formattedData);
      setLoadedPages(loadedPages + 1);
    };
    fetchFirstBatch();
  }, []);

  const loadMoreMovies = async () => {
    const res = await fetch(
      `${trendingUrl}?api_key=${import.meta.env.VITE_API_KEY}&page=${
        loadedPages + 1
      }`
    );
    const data = await res.json();

    const formattedData: MovieProps[] = data.results.map(
      (movie: MovieProps) => {
        return {
          ...movie,
          release_date: formatDate(movie.release_date),
          backdrop_path: `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`,
          poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`,
        };
      }
    );

    setMovieList((currentMovieList: MovieProps[]) => [
      ...currentMovieList,
      ...formattedData,
    ]);
  };

  return (
    <div className="App">
      <div>
        <h2>Popular Movies</h2>
      </div>
      <div className="container">
        <Sidebar />
        <div className="movie-container">
          <div className="movie-grid">
            {movieList !== null &&
              movieList.map((movie: MovieProps) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
          </div>
          <div className="load_more" onClick={loadMoreMovies}>
            Load More
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
