import { tmdbInstance } from "@/config/axiosInstances";
import { supabase } from "@/lib/supabase";
import { Movie } from "@/types/movie";
class MovieService {
  private static instance: MovieService;

  private constructor() {}

  public static getInstance(): MovieService {
    if (!MovieService.instance) {
      MovieService.instance = new MovieService();
    }
    return MovieService.instance;
  }

  async getMovies({ query }: { query: string }) {
    try {
      const endpoint = query
        ? `/search/movie?query=${encodeURIComponent(query)}`
        : `/discover/movie?sort_by=popularity.desc`;

      const res = await tmdbInstance.get(endpoint);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }
  async getMovieDetails({ movieId }: { movieId: string }) {
    try {
      const res = await tmdbInstance.get(`/movie/${movieId}`);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }

  async getTrendingMovies() {
    try {
      const res = await tmdbInstance.get(`/trending/movie/day`);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }

  async getSavedMovies(userId: string) {
    try {
      const { data, error } = await supabase
        .from("saved_movies")
        .select(`
          *,
          movie:movie_id (
            id,
            title,
            poster_path,
            release_date,
            vote_average
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  }
  
  async saveMovie({ userId, movie }: { userId: string; movie: Partial<Movie> }) {

    try {
      const { data: movieData, error: movieError } = await supabase
        .from("movie")
        .upsert(movie)
        .select()
        .single();

      if (movieError) {
        throw movieError;
      }

      const movieId = movieData.id;

      const { data, error } = await supabase
        .from("saved_movies")
        .insert({
          user_id: userId,
          movie_id: movieId,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async unsaveMovie({ userId, movieId }: { userId: string; movieId: string }) {
    try {
      const { data, error } = await supabase
        .from("saved_movies")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async isMovieSaved(userId: string, movieId: string) {
    try {
      const { data, error } = await supabase
        .from("saved_movies")
        .select("*")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return !!data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const movieService = MovieService.getInstance();
