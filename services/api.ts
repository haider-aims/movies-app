import { tmdbInstance } from "@/config/axiosInstances";

export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    const endpoint = query
      ? `/search/movie?query=${encodeURIComponent(query)}`
          : `/discover/movie?sort_by=popularity.desc`;
      
      const res = await tmdbInstance.get(endpoint)
      return res.data
  } catch (error) {
      throw new Error('error fetching movies')
  }
};

export const fetchMovieDetails = async ({ movieId }: { movieId: string }) => {
    try {
        const res = await tmdbInstance.get(`/movie/${movieId}`)
        return res.data
    } catch (error) {
        throw new Error('error fetching movie details')
    }
};
