import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ScreenWrapper from "@/components/screenWrapper";
import {
  useIsMovieSaved,
  useMovieDetails,
  useSaveMovie,
  useUnsaveMovie,
} from "@/hooks/movies";
import { MovieDetail } from "@/types/movie";
import { getRating, getRealseYear } from "@/utils/utilityFunctions";
import { icons } from "@/constants/icons";
import { Heart } from "lucide-react-native";
import { useUser } from "@/providers/auth";
import Toast from "react-native-toast-message";
import { Button } from "@/components/button";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const router = useRouter();
  const user = useUser();
  const { id: movieId } = useLocalSearchParams();
  const { data: isSaved } = useIsMovieSaved(user?.id || "", movieId as string);
  const {
    data: movieDetails,
    isLoading,
    isError,
    error,
  } = useMovieDetails(movieId as string);
  const { mutateAsync: saveMovie, isPending: isSaving } = useSaveMovie();
  const { mutateAsync: unsaveMovie, isPending: isUnSaving } = useUnsaveMovie();

  const handleSaveMovie = async () => {
    try {
      if (isSaved) {
        await unsaveMovie({
          userId: user?.id || "",
          movieId: movieId as string,
        });
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Movie unsaved",
        });
        router.back();
        return;
      }

      const movieDetailsToSave = {
        id: parseInt(movieId as string),
        title: movieDetails?.title,
        poster_path: movieDetails?.poster_path,
        release_date: movieDetails?.release_date,
        vote_average: movieDetails?.vote_average,
      };

      await saveMovie({ userId: user?.id || "", movie: movieDetailsToSave });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Movie saved",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  if (isLoading || !movieDetails) {
    return (
      <ScreenWrapper>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={"#0000ff"} />
        </View>
      </ScreenWrapper>
    );
  }

  if (isError) {
    return (
      <ScreenWrapper>
        <View className="flex-1 justify-center items-center">
          <Text>{error.message}</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const {
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    vote_count,
    overview,
    genres,
    budget,
    revenue,
    production_companies,
  } = movieDetails as MovieDetail;
  // console.log("movie details", movieDetails);
  return (
    <ScreenWrapper>
      <>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <Image
              source={{
                uri: poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>

          <View className="p-3">
            <Text className="text-white text-xl font-bold mt-4 mb-2 capitalize">
              {title}
            </Text>
            <View className="flex-row justify-start gap-x-2">
              <Text className="text-light-200">
                {getRealseYear(release_date)}
              </Text>
              <Text className="text-light-200">{runtime}m</Text>
            </View>

            <View className="bg-dark-100 w-44 flex-row items-center rounded-lg px-2 py-1 mt-2 gap-x-1">
              <Image source={icons.star} className="size-5" />
              <Text className="text-light-200">
                {getRating(vote_average)}/5 ({vote_count} votes)
              </Text>
            </View>

            <MovieInfo label="Overview" value={overview} />
            <MovieInfo
              label="Genres"
              value={genres?.map((g) => g.name).join(" • ") || "N/A"}
            />

            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo
                label="Budget"
                value={`$${(budget ?? 0) / 1_000_000} million`}
              />
              <MovieInfo
                label="Revenue"
                value={`$${Math.round((revenue ?? 0) / 1_000_000)} million`}
              />
            </View>

            <MovieInfo
              label="Production Companies"
              value={
                production_companies?.map((c) => c.name).join(" • ") || "N/A"
              }
            />
          </View>
        </ScrollView>

        <Button
          title={isSaved ? "Remove" : "Save"}
          onPress={handleSaveMovie}
          loading={isSaving || isUnSaving}
          className="absolute bottom-6 left-0 right-0 mx-5"
          leftIcon={
            <Heart
              size={20}
              fill={isSaved ? "#ef4444" : "transparent"}
              color={isSaved ? "#ef4444" : "#ffffff"}
            />
          }
        />
      </>
    </ScreenWrapper>
  );
};

export default MovieDetails;
