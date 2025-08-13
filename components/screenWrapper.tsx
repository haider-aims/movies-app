import { View, Text, Image } from "react-native";
import React, { ReactElement } from "react";
import { images } from "@/constants/images";

const ScreenWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      {children}
    </View>
  );
};

export default ScreenWrapper;
