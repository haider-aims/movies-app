import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";
import { useMovies, useTrendingMovies } from "@/hooks/movies";
import MovieCard from "@/components/movieCard";
import ScreenWrapper from "@/components/screenWrapper";
import Logo from "@/components/logo";
import { useTabContext } from "@/hooks/useTabContext";

// Horizontal Trending Movies Component
const TrendingMoviesSection = ({ trendingMovies }: { trendingMovies: any[] }) => (
  <View>
    <Text className="text-white my-5 font-bold text-2xl">
      Trending Movies
    </Text>
    <FlatList
      horizontal
      data={trendingMovies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="w-[8.4rem] h-64">
          <MovieCard movieDetails={item} />
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="w-5" />}
      className="mb-6"
    />
  </View>
);

// Header Component for the main FlatList
const ListHeader = ({ trendingMovies }: { trendingMovies: any[] }) => (
  <View>
    <Logo title="Aura" />
    <TrendingMoviesSection trendingMovies={trendingMovies} />
    <Text className="text-white my-5 font-bold text-2xl">
      Latest Movies
    </Text>
  </View>
);

const Home = () => {
  const { homeScrollRef } = useTabContext();
  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useMovies();
  const {
    data: trendingMovies,
    isLoading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useTrendingMovies();

  if (moviesLoading || trendingMoviesLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#AB8BFF" />
        </View>
      </ScreenWrapper>
    );
  }

  if (moviesError || trendingMoviesError) {
    const error = moviesError || trendingMoviesError;
    return (
      <ScreenWrapper>
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-red-400 text-center text-xl font-semibold capitalize">
            Error: {error?.message}
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <FlatList
        ref={homeScrollRef}
        data={movies?.results || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="w-[30%] h-64">
            <MovieCard movieDetails={item} />
          </View>
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: 20, 
          paddingBottom: 20 
        }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          marginBottom: 10,
        }}
        ListHeaderComponent={() => (
          <ListHeader trendingMovies={trendingMovies?.results || []} />
        )}
      />
    </ScreenWrapper>
  );
};

export default Home;
