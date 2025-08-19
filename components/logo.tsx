import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const Logo = ({ title }: { title?: string }) => {
  return (
    <View className="items-center mt-24 mb-8">
      <Image source={icons.logo} className="w-16 h-14 mb-4" />
      {title && <Text className="text-3xl font-bold text-white">{title}</Text>}
    </View>
  );
};

export default Logo;
