import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Bookmark, House, Search, User } from "lucide-react-native";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";
import { TabProvider, useTabContext } from "@/hooks/useTabContext";

interface TabIconProps {
  title: string;
  icon: ImageSourcePropType;
  focused: boolean;
}
const TabIcon = ({ title, icon, focused }: TabIconProps) => {
  if (!focused) {
    return (
      <View className="size-full flex justify-center items-center">
        <Image
          source={icon}
          className="size-5"
          style={{ tintColor: focused ? undefined : "#a8b5db" }}
        />
      </View>
    );
  }

  return (
    <ImageBackground
      source={images.highlight}
      className="w-full flex flex-row flex-1 min-w-28 min-h-14 mt-3 justify-center items-center rounded-full overflow-hidden"
    >
      <Image source={icon} className="size-5" tintColor={"black"} />
      <Text className="text-base text-secondary font-semibold ml-2">
        {title}
      </Text>
    </ImageBackground>
  );
};

const TabsLayoutContent = () => {
  const { scrollToTop } = useTabContext();

  return (
    <Tabs
      screenOptions={{
        headerShown:false,

        // Tab Bar styling
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 25,
          height: 49,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Home" icon={icons.home} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: () => {
            scrollToTop('Home');
          },
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Search" icon={icons.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved/index"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Saved" icon={icons.save} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Profile" icon={icons.person} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

const TabsLayout = () => {
  return (
    <TabProvider>
      <TabsLayoutContent />
    </TabProvider>
  );
};

export default TabsLayout;
