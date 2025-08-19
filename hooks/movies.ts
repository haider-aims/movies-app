import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { movieService } from "@/services/movie";

export const MOVIE_QUERY_KEYS = {
  movies: (query: string) => ["movies", query] as const,
  movieDetails: (movieId: string) => ["movie", movieId] as const,
  trendingMovies: () => ["trendingMovies"] as const,
  savedMovies: (userId: string) => ["savedMovies", userId] as const,
  isMovieSaved: (userId: string, movieId: string) =>
    ["isMovieSaved", userId, movieId] as const,
};

export const useMovies = (query: string = "") => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.movies(query),
    queryFn: () => movieService.getMovies({ query }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMovieDetails = (movieId: string) => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.movieDetails(movieId),
    queryFn: () => movieService.getMovieDetails({ movieId }),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.trendingMovies(),
    queryFn: () => movieService.getTrendingMovies(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSaveMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { userId: string; movie: Partial<Movie> }) =>
      movieService.saveMovie(params),
    onSuccess: (data, variables) => {
      // Invalidate saved movies list
      queryClient.invalidateQueries({
        queryKey: MOVIE_QUERY_KEYS.savedMovies(variables.userId),
      });
      // Invalidate is-saved check
      queryClient.invalidateQueries({
        queryKey: MOVIE_QUERY_KEYS.isMovieSaved(
          variables.userId,
          variables.movie.id?.toString() || ""
        ),
      });
      // Invalidate movie details
      queryClient.invalidateQueries({
        queryKey: MOVIE_QUERY_KEYS.movieDetails(
          variables.movie.id?.toString() || ""
        ),
      });
    },
  });
};

export const useGetSavedMovies = (userId: string) => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.savedMovies(userId),
    queryFn: () => movieService.getSavedMovies(userId),
  });
};

export const useUnsaveMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { userId: string; movieId: string }) =>
      movieService.unsaveMovie(params),
    onSuccess: (data, variables) => {
      // Invalidate saved movies list
      queryClient.invalidateQueries({
        queryKey: MOVIE_QUERY_KEYS.savedMovies(variables.userId),
      });
      // Invalidate is-saved check
      queryClient.invalidateQueries({
        queryKey: MOVIE_QUERY_KEYS.isMovieSaved(
          variables.userId,
          variables.movieId
        ),
      });
      // Invalidate movie details
      queryClient.invalidateQueries({
        queryKey: MOVIE_QUERY_KEYS.movieDetails(
          variables.movieId
        ),
      });
    },
  });
};

export const useIsMovieSaved = (userId: string, movieId: string) => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.isMovieSaved(userId, movieId),
    queryFn: () => movieService.isMovieSaved(userId, movieId),
  });
};
