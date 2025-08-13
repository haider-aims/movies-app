import { View, Image, TextInput } from "react-native";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  placeholder,
  onPress,
  value,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4 mb-5">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />

      <TextInput
        className="ml-2 flex-1 text-white"
        placeholder={placeholder}
        placeholderTextColor={"#ab8bff"}
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
