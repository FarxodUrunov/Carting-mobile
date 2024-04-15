import { View } from "react-native";
import React from "react";
import Skeleton from "~/skeleton";
import { useColorScheme } from "nativewind";
import colors from "_constants/colors";

export default function SkeletonProfileCareer() {
  const { colorScheme } = useColorScheme();
  return (
    <View>
      {[1, 2, 3].map((item) => (
        <View
          key={item}
          style={{
            backgroundColor: colors[colorScheme].colors.cardSecondary,
          }}
          className="w-full p-4 rounded-md mb-6"
        >
          <View className="flex-row">
            <Skeleton variant="card" propClasses="w-16 h-16" />
            <View className="ml-4">
              <Skeleton variant="card" propClasses="w-40 h-7 my-1" />
              <Skeleton variant="card" propClasses="w-16 h-6 my-1" />
            </View>
          </View>
          <Skeleton variant="card" propClasses="w-40 h-6 my-1" />
          <Skeleton variant="card" propClasses="w-[90%] h-6 my-1" />
          <View className="flex-row justify-between mt-4">
            <Skeleton variant="card" propClasses="w-16 h-5 my-1" />
            <Skeleton variant="card" propClasses="w-24 h-5 my-1" />
            <Skeleton variant="card" propClasses="w-24 h-5 my-1" />
          </View>
          <Skeleton variant="card" propClasses="w-full h-10 mt-4 " />
        </View>
      ))}
    </View>
  );
}
