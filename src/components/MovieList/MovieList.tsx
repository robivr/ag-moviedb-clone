import { useContext } from 'react';

import GlobalContext from '../../store/global-store';
import MovieCard from '../MovieCard/MovieCard';

interface MovieProps {
  id: number;
  adult: boolean;
  title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

const MovieList = () => {
  const ctx = useContext(GlobalContext);

  return (
    <div className="movie-grid">
      {ctx.movieList !== null &&
        ctx.movieList.map((movie: MovieProps) => (
          <MovieCard key={movie.id + movie.title} {...movie} />
        ))}
    </div>
  );
};

export default MovieList;
