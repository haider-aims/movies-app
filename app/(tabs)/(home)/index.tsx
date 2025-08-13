import { View, Image, ActivityIndicator, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import { useMovies } from "@/hooks/movies";
import MovieCard from "@/components/movieCard";
import { useTabContext } from "@/hooks/useTabContext";
import ScreenWrapper from "@/components/screenWrapper";

const Home = () => {
  const router = useRouter();
  const { homeScrollRef } = useTabContext();

  const { data: movies, isLoading, isError, error } = useMovies();

  // useEffect(() => {
  //   console.log("movies data: ", movies?.results?.length, movies?.results[0]);
  // }, [movies]);

  const navigateToSearchScreen = () => {
    router.push("/search");
  };

  const renderHeader = () => (
    <View>
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      {/* <SearchBar
        placeholder={"Search for movies"}
        onPress={navigateToSearchScreen}
      /> */}
      <Text className="text-light-200 my-5 font-bold text-xl">
        Latest Movies
      </Text>
    </View>
  );

  return (
    <ScreenWrapper>
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
        />
      )}
    </ScreenWrapper>
  );
};

export default Home;
