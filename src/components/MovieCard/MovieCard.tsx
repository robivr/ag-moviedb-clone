import React from 'react';
import './MovieCard.css';

const MovieCard = ({
  adult,
  title,
  release_date,
  vote_average,
  backdrop_path,
}: any) => {
  return (
    <div className="movie-card">
      <img src={backdrop_path} alt={title + ' poster'} />
      <div className="movie-details">
        <span className="movie-score">{Math.round(vote_average * 10)}%</span>
        <h3>{title}</h3>
        <p className="movie-date">{release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
