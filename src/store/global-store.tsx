import React, { useState } from 'react';

const GlobalContext = React.createContext({
  genre_filter: [],
  movieList: [],
  search_button_active: false,
  infiniteScrollActive: false,
  nextPage: 0,
  toggleGenre: (genreId: number) => {},
  activateSearchButton: () => {},
  activateInfiniteScroll: () => {},
  loadMovies: () => {},
});

const formatDate = (dateString: string) => {
  const tempDate = new Date(dateString).toDateString();
  const splitDate = tempDate.split(' ').splice(1);

  return `${splitDate[0]} ${splitDate[1]}, ${splitDate[2]}`;
};

export const GlobalContextProvider = (props: any) => {
  const [genreFilter, setGenreFilter] = useState([]);
  const [searchButtonActive, setSearchButtonActive] = useState(false);
  const [infiniteScrollActive, setInfiniteScrollActive] = useState(false);
  const [movieList, setMovieList] = useState<any>([]);
  const [nextPage, setNextPage] = useState(1);

  const toggleGenre = (genreId: number) => {};

  const activateSearchButton = () => {
    setSearchButtonActive(true);
  };

  const activateInfiniteScroll = () => {
    setInfiniteScrollActive(true);
  };

  const loadMovies = async () => {
    const trendingUrl = 'https://api.themoviedb.org/3/movie/popular';

    const res = await fetch(
      `${trendingUrl}?api_key=${import.meta.env.VITE_API_KEY}&page=${nextPage}`
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

    console.log('fetching movies on page:', nextPage);
    setMovieList((currentMovieList: any) => [
      ...currentMovieList,
      ...formattedData,
    ]);
    setNextPage(nextPage + 1);
  };

  return (
    <GlobalContext.Provider
      value={{
        genre_filter: genreFilter,
        movieList,
        search_button_active: searchButtonActive,
        infiniteScrollActive,
        nextPage,
        activateSearchButton,
        toggleGenre,
        activateInfiniteScroll,
        loadMovies,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
