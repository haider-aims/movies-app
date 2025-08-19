import { View, Text, TouchableOpacity, Image } from "react-native";
import { Movie } from "@/types/movie";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({ movieDetails }: { movieDetails: Movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movieDetails;
  const rating = Math.round(vote_average / 2);
  const realseYear = release_date?.split("-")[0];

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-full h-full">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-[75%] rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white font-bold text-xs mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row justify-start items-center gap-x-2 mt-1">
          <Image source={icons.star} />
          <Text className="text-white text-xs font-bold">{rating}</Text>
        </View>
        <Text className="text-light-300 text-xs font-bold">{realseYear}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
