import { useColorScheme } from "nativewind";
import React, { FC } from "react";
import { Text, TextInput, View } from "react-native";

type BaseTextAreaType = {
  label?: string;
  description?: string;
  variant?: "default" | "gray";
  isError?: boolean;
  className?: string;
  placeholder?: string;
  onChange: ((e: any) => void | undefined) | undefined;
};
const BaseTextArea: FC<BaseTextAreaType> = ({
  label,
  description,
  variant = "default",
  isError = false,
  className,
  placeholder,
  onChange,
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="w-full ">
      <Text className="text-sm font-medium dark:text-white text-gray-700">
        {label}
      </Text>
      <TextInput
        onChange={(e) => onChange(e)}
        multiline
        placeholder={placeholder}
        placeholderTextColor={colorScheme === "dark" ? "#9e9e9e" : "#9a9a9a"}
        numberOfLines={5}
        className={`${className} my-1.5 px-3 py-2.5 ${
          variant === "gray" ? "bg-neutral-50 " : ""
        } rounded-md shadow border ${
          isError ? "border-red-500" : "border-gray-300 focus:border-lime-500"
        } text-base font-normal  ring-offset-2 ring-4 ring-red-300 dark:text-gray-100 text-gray-600`}
      />
      <Text className="text-sm font-normal dark:text-white text-gray-700">
        {description}
      </Text>
    </View>
  );
};

export default BaseTextArea;
