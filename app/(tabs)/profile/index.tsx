import { View, Text, Image, ActivityIndicator, Alert } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import { useUser } from "@/providers/auth";
import { useSignOut } from "@/hooks/auth";
import { Button } from "@/components/button";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Logo from "@/components/logo";

const Profile = () => {
  const user = useUser();
  const router = useRouter();
  const { mutateAsync: signOut, isPending: signOutLoading } = useSignOut();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            Toast.show({
              type: "success",
              text1: "Signed out successfully",
            });
            router.replace("/signIn");
          } catch (error: any) {
            Toast.show({
              type: "error",
              text1: "Sign out failed",
              text2: error.message || "Something went wrong",
            });
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <ScreenWrapper>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#AB8BFF" />
          <Text className="text-light-200 mt-4">Loading profile...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View className="px-4">
        {/* Header */}
        <Logo title="Profile" />

        {/* User Info Card */}
        <View className="bg-dark-200 rounded-2xl p-6 mb-6">
          <View className="items-center mb-6">
            <View className="w-20 h-20 bg-accent rounded-full items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-white text-xl font-semibold">
              Welcome back!
            </Text>
          </View>

          {/* User Details */}
          <View className="space-y-6">
            <View className="border-b border-dark-100 pb-4">
              <Text className="text-light-100 text-base mb-2 font-medium">
                Email Address
              </Text>
              <Text className="text-white text-xl font-semibold">
                {user.email}
              </Text>
            </View>

            <View className="border-b border-dark-100 pb-4">
              <Text className="text-light-100 text-base mb-2 font-medium">
                Member Since
              </Text>
              <Text className="text-light-200 text-lg">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>

            <View>
              <Text className="text-light-100 text-base mb-2 font-medium">
                Account Status
              </Text>
              <View className="flex-row items-center">
                <View
                  className={`w-3 h-3 rounded-full mr-3 ${user.email_confirmed_at ? "bg-green-400" : "bg-yellow-400"}`}
                />
                <Text
                  className={`text-lg font-medium ${user.email_confirmed_at ? "text-green-400" : "text-yellow-400"}`}
                >
                  {user.email_confirmed_at
                    ? "Verified Account"
                    : "Email Verification Pending"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sign Out Button */}
        <View className="mt-auto mb-8">
          <Button
            title="Sign Out"
            // variant="outline"
            fullWidth
            loading={signOutLoading}
            onPress={handleSignOut}
            className="bg-red-500"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;
