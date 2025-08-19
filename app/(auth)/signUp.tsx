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
import { useSignUp } from "@/hooks/auth";
import Toast from "react-native-toast-message";

export const signUpSchema = z
  .object({
    email: z.string().min(1, "Enter your email").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error will show under confirmPassword field
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const {
    mutateAsync: signup,
    isPending: signUpLoading,
  } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    const { email, password } = data;

    try {
      await signup({ email, password });
      
      Toast.show({
        type: "success",
        text1: "Check your email",
        text2: "Please confirm your account before signing in",
      });
      router.replace("/signIn");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Error Signing Up",
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
            variant="filled"
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
          <CustomTextInput
            name="confirmPassword"
            control={control}
            label="confirm Password"
            error={errors.confirmPassword}
            placeholder="Re-Enter your Password"
            variant="filled"
            secureTextEntry
            className="min-w-full"
          />

          <Button
            title="SignUp"
            fullWidth
            loading={signUpLoading}
            onPress={handleSubmit(onSubmit)}
            className="mt-10"
          />

          <Text className="text-md text-light-100 mt-6">
            If you already have account?{" "}
            <Link href={"/signIn"} className="text-accent text-lg font-bold">
              SignIn
            </Link>
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SignUp;
