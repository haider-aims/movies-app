import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomTextInput } from "@/components/inputs";
import { Button } from "@/components/button";
import { icons } from "@/constants/icons";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/providers/auth";
import Toast from "react-native-toast-message";

export const signInSchema = z.object({
  email: z.string().min(1, "Enter your email").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

const SignIn = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    console.log("signin Form Data:", data);
    const { email, password } = data;
    try {
      const data = await signIn(email, password);
      console.log('login data: ', data)
      router.replace("/");
      Toast.show({
        type: "success",
        text1: "Sign In Successful",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Sign In Failed",
        text2: error?.message || "Invalid login credentials",
      });
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <View className="flex-1 justify-start items-center px-10">
          <View className="justify-center items-center mt-52 mb-20">
            <Image source={icons.logo} className="size-20" />
            <Text className="text-5xl font-bold text-accent">Aura</Text>
          </View>
          <CustomTextInput
            name="email"
            control={control}
            label="Email"
            error={errors.email}
            placeholder="Enter your Email"
            // variant="filled"
            className="min-w-full"
            keyboardType="email-address"
          />
          <CustomTextInput
            name="password"
            control={control}
            label="password"
            error={errors.password}
            placeholder="Enter your Password"
            variant="filled"
            secureTextEntry
            className="min-w-full"
          />

          <Button
            title="Login"
            fullWidth
            onPress={handleSubmit(onSubmit)}
            className="mt-10"
          />

          <Text className="text-md text-light-100 mt-6">
            If you don't have account?{" "}
            <Link href={"/signUp"} className="text-accent text-lg font-bold">
              SignUp
            </Link>
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SignIn;
