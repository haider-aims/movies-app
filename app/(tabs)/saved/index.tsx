import { View, ActivityIndicator, Text, FlatList } from "react-native";
import MovieCard from "@/components/movieCard";
import ScreenWrapper from "@/components/screenWrapper";
import Logo from "@/components/logo";
import { useGetSavedMovies } from "@/hooks/movies";
import { useUser } from "@/providers/auth";

// Header Component for the main FlatList
const ListHeader = () => (
  <View>
    <Logo title="Aura" />
    <Text className="text-white my-5 font-bold text-2xl">Saved Movies</Text>
  </View>
);

const Saved = () => {
  const user = useUser();
  const {
    data: savedMovies,
    isLoading: savedMoviesLoading,
    error: savedMoviesError,
  } = useGetSavedMovies(user?.id || "");

  if (savedMoviesLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#AB8BFF" />
        </View>
      </ScreenWrapper>
    );
  }

  if (savedMoviesError) {
    const error = savedMoviesError;
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
        data={savedMovies || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="w-[30%] h-64">
            <MovieCard movieDetails={item?.movie} />
          </View>
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          marginBottom: 10,
        }}
        ListHeaderComponent={() => <ListHeader />}
      />
    </ScreenWrapper>
  );
};

export default Saved;
