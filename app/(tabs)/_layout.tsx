import { Tabs } from "expo-router";
import { Bookmark, House, Search, User } from "lucide-react-native";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        // Header styling
        headerStyle: {
          backgroundColor: "#0F0D23",
          height: 100,
        },
        headerTitleStyle: {
          color: "#FFFFFF",
          fontSize: 20,
          fontWeight: "600",
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,

        // Tab Bar styling
        tabBarShowLabel: false,
        // tabBarItemStyle: {
        //   width: "100%",
        //   height: "100%",
        //   justifyContent: "center",
        //   alignItems: "center",
        // },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          paddingTop: 5,
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          // position: "absolute",
          // overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="saved/index"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size }) => (
            <Bookmark color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
