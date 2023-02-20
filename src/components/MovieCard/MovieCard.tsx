import React from 'react';
import './MovieCard.css';

interface MovieProps {
  adult: boolean;
  title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

const MovieCard = ({
  adult,
  title,
  release_date,
  vote_average,
  backdrop_path,
  poster_path,
}: MovieProps) => {
  return (
    <div className="movie-card">
      <img src={poster_path} alt={title + ' poster'} />
      <div className="movie-details">
        <span className="movie-score">{Math.round(vote_average * 10)}%</span>
        <h3>{title}</h3>
        <p className="movie-date">{release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
