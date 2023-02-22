import React from 'react';
import './MovieCard.css';
import Rating from './Rating';

interface MovieProps {
  adult: boolean;
  title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
}

const MovieCard = ({
  adult,
  title,
  release_date,
  vote_average,
  backdrop_path,
  poster_path,
  overview,
}: MovieProps) => {
  return (
    <div className="movie-card">
      <img src={poster_path} alt={title + ' poster'} />
      <div className="movie-details">
        <Rating progress={Math.round(vote_average * 10)} />
        <h3>{title}</h3>
        <p className="movie-date">{release_date}</p>
        <p className="description">{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
