import { useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchMovieDetails } from '@/services/api';

export const MOVIE_QUERY_KEYS = {
  movies: (query: string) => ['movies', query] as const,
  movieDetails: (movieId: string) => ['movie', movieId] as const,
};

export const useMovies = (query: string = '') => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.movies(query),
    queryFn: () => fetchMovies({ query }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMovieDetails = (movieId: string) => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.movieDetails(movieId),
    queryFn: () => fetchMovieDetails({ movieId }),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};