import { View, Image, ActivityIndicator, Text, FlatList } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import { useMovies } from "@/hooks/movies";
import MovieCard from "@/components/movieCard";
import { useTabContext } from "@/hooks/useTabContext";
import ScreenWrapper from "@/components/screenWrapper";

const Search = () => {
  const { homeScrollRef } = useTabContext();
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(" ");

  const { data: movies, isLoading, isError, error } = useMovies(searchQuery);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query.trim());
    }, 500),
    []
  );

  const handleInputChange = (query: string) => {
    setInputValue(query);
    debouncedSearch(query);
  };

  const renderHeader = () => (
    <View>
      {searchQuery.trim() && !isLoading && !isError && (
        <Text className="text-xl text-white font-bold mb-3">
          {movies?.results && movies.results.length > 0 ? (
            <>Search Results for <Text className="text-accent">{searchQuery}</Text></>
          ) : (
            <Text className="text-gray-400">No results found for "{searchQuery}"</Text>
          )}
        </Text>
      )}
    </View>
  );
  return (
    <ScreenWrapper>
      <View className="flex-1">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="px-5">
          <SearchBar
            placeholder={"Search movies..."}
            value={inputValue}
            onChangeText={handleInputChange}
          />
        </View>
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color={"#0000ff"} />
          </View>
        ) : isError ? (
          <View className="flex-1 justify-center items-center px-5">
            <Text className="text-red-400 text-center text-xl font-semibold capitalize">
              Error: {error.message}
            </Text>
          </View>
        ) : (
          <FlatList
            ref={homeScrollRef}
            data={movies?.results || []}
            renderItem={({ item }) => (
              <View className="w-[30%] h-64">
                <MovieCard movieDetails={item} key={item.id.toString()} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            ListEmptyComponent={
              searchQuery.trim() && !isLoading ? (
                <View className="flex-1 justify-center items-center mt-10">
                  <Text className="text-gray-400 text-center text-lg">
                    No movies found for "{searchQuery}"
                  </Text>
                  <Text className="text-gray-500 text-center text-sm mt-2">
                    Try searching with different keywords
                  </Text>
                </View>
              ) : searchQuery.trim() === "" && inputValue.trim() === "" ? (
                <View className="flex-1 justify-center items-center mt-10">
                  <Text className="text-gray-400 text-center text-lg">
                    Search for movies by title, genre, or actor
                  </Text>
                </View>
              ) : null
            }
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Search;
