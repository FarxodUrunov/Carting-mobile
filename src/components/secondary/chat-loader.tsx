import { View } from "react-native";
import React from "react";
import Colors from "_constants/colors";
import { useColorScheme } from "nativewind";

export default function ChatLoader() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="px-5 justify-between h-full pt-4">
      <View>
        <View
          style={{
            backgroundColor: Colors[colorScheme].colors.cardSecondary,
          }}
          className="p-4 rounded-md mb-8"
        >
          <View className="flex-row space-x-3 items-center mb-4">
            <View className="w-16 h-16 rounded-full bg-gray-300"></View>

            <View>
              <View className="bg-gray-300 rounded w-48 h-7 mb-1"></View>
              <View className="bg-gray-300 rounded w-20 h-5 mb-1"></View>
            </View>
          </View>

          <View className="w-60 h-7 bg-gray-300 rounded mb-4"></View>

          <View className="flex-row space-x-4">
            <View className="bg-gray-300 rounded flex-1 h-10"></View>
            <View className="bg-gray-300 rounded flex-1 h-10"></View>
          </View>
        </View>
        <View className="flex-row justify-end">
          <View className="w-52 h-24 bg-gray-300 rounded-2xl mb-2"></View>
        </View>
        <View className="flex-row justify-end mb-5">
          <View className="w-40 h-14 bg-gray-300 rounded-2xl"></View>
        </View>

        <View className="w-72 h-20 bg-gray-300 rounded-2xl"></View>
      </View>

      <View className="flex-row justify-between px-3 py-2.5 rounded-md border items-center h-12 mb-4 dark:border-gray-600 border-gray-300" />
    </View>
  );
}
