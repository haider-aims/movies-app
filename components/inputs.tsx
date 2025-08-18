import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { Control, Controller, FieldError } from "react-hook-form";

interface CustomTextInput extends TextInputProps {
  name: string;
  control: Control<any>;
  label: string;
  error?: FieldError;
  required?: boolean;
  variant?: "default" | "filled";
}

// Alternative dark variant component
export const CustomTextInput: React.FC<CustomTextInput> = ({
  name,
  control,
  label,
  error,
  required = false,
  className,
  ...textInputProps
}) => {
  const getInputStyles = () => {
    const baseStyles = "text-base px-4 py-3 rounded-xl border";

    if (error) {
      return `${baseStyles} border-red-400 bg-dark-200 text-red-300 placeholder:text-red-400`;
    }

    return `${baseStyles} border-dark-100 bg-dark-200 text-light-100 placeholder:text-light-300 focus:border-accent`;
  };

  return (
    <View className="mb-4">
      <Text className="text-base font-semibold mb-2 text-light-100 capitalize">
        {label}
        {required && <Text className="text-red-400"> *</Text>}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`${getInputStyles()} ${className || ""}`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={error ? "#fca5a5" : "#9CA4AB"}
            {...textInputProps}
          />
        )}
      />

      {error && (
        <Text className="text-red-400 text-sm mt-1 ml-1">{error.message}</Text>
      )}
    </View>
  );
};
