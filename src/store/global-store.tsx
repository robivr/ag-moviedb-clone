import React, { useState } from 'react';

const GlobalContext = React.createContext({
  genreFilter: [] as number[],
  movieList: [],
  searchButtonActive: false,
  infiniteScrollActive: false,
  nextPage: 0,
  searchMode: false,
  toggleGenre: (genreId: number) => {},
  activateSearchButton: () => {},
  activateInfiniteScroll: () => {},
  loadPopularMovies: () => {},
  loadMoviesByGenres: (firstSearch: boolean) => {},
  activateSearchMode: () => {},
});

const formatDate = (dateString: string) => {
  const tempDate = new Date(dateString).toDateString();
  const splitDate = tempDate.split(' ').splice(1);

  return `${splitDate[0]} ${splitDate[1]}, ${splitDate[2]}`;
};

export const GlobalContextProvider = (props: any) => {
  const [genreFilter, setGenreFilter] = useState<number[]>([]);
  const [searchButtonActive, setSearchButtonActive] = useState(false);
  const [infiniteScrollActive, setInfiniteScrollActive] = useState(false);
  const [movieList, setMovieList] = useState<any>([]);
  const [nextPage, setNextPage] = useState(1);
  const [searchMode, setSearchMode] = useState(false);

  const toggleGenre = (genreId: number) => {
    if (genreFilter.includes(genreId)) {
      const removedGenre = genreFilter.filter(
        (currGenreId) => currGenreId !== genreId
      );

      setGenreFilter(removedGenre);
    } else {
      setGenreFilter((currentGenreFilter) => [...currentGenreFilter, genreId]);
    }
  };

  const activateSearchButton = () => {
    setSearchButtonActive(true);
  };

  const activateInfiniteScroll = () => {
    setInfiniteScrollActive(true);
  };

  const activateSearchMode = () => {
    setSearchMode(true);
    setInfiniteScrollActive(false);

    loadMoviesByGenres(true);
  };

  const loadPopularMovies = async () => {
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

    setMovieList((currentMovieList: any) => [
      ...currentMovieList,
      ...formattedData,
    ]);
    setNextPage(nextPage + 1);
  };

  const loadMoviesByGenres = async (firstSearch: boolean) => {
    const discoverUrl = 'https://api.themoviedb.org/3/discover/movie';

    const res = await fetch(
      `${discoverUrl}?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${nextPage}&with_genres=${genreFilter.join(',')}`
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

    if (firstSearch) {
      setMovieList([...formattedData]);
      setNextPage(2);

      return;
    }

    setMovieList((currentMovieList: any) => [
      ...currentMovieList,
      ...formattedData,
    ]);
    setNextPage(nextPage + 1);
  };

  return (
    <GlobalContext.Provider
      value={{
        genreFilter,
        movieList,
        searchButtonActive,
        infiniteScrollActive,
        nextPage,
        searchMode,
        activateSearchButton,
        toggleGenre,
        activateInfiniteScroll,
        loadPopularMovies,
        loadMoviesByGenres,
        activateSearchMode,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
