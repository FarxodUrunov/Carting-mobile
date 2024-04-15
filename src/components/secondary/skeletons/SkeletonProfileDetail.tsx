import { View } from "react-native";
import React from "react";
import Skeleton from "~/skeleton";
import Colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import colors from "_constants/colors";

export default function SkeletonProfileDetail() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-1">
      <View
        style={{
          backgroundColor: colors[colorScheme].colors.cardSecondary,
        }}
        className="w-full p-4 rounded-lg flex-row"
      >
        <Skeleton variant="circle" propClasses="w-16 h-16" />
        <View className="justify-between ml-4">
          <Skeleton variant="card" propClasses="w-48 h-7" />
          <Skeleton variant="card" propClasses="w-16 h-5 " />
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors[colorScheme || "light"].colors.cardSecondary,
        }}
        className="w-full my-4 h-24 p-4 rounded-lg flex-row"
      />
      <Skeleton variant="card" propClasses="w-40 h-7" />

      <Skeleton variant="card" propClasses="w-14 h-4 my-2" />
      <Skeleton variant="card" propClasses="w-40 h-7" />
      <Skeleton variant="card" propClasses="w-14 h-4 my-2" />
      <Skeleton variant="card" propClasses="w-40 h-7" />
      <Skeleton variant="card" propClasses="w-14 h-4 my-2" />
      <Skeleton variant="card" propClasses="w-40 h-7" />
      <Skeleton variant="card" propClasses="w-14 h-4 my-2" />
      <Skeleton variant="card" propClasses="w-40 h-7" />
      <Skeleton variant="card" propClasses="w-14 h-4 my-2" />
      <Skeleton variant="card" propClasses="w-40 h-7" />
      <Skeleton variant="card" propClasses="w-14 h-4 my-2" />
      <Skeleton variant="card" propClasses="w-40 h-7" />
      <Skeleton variant="card" propClasses="w-14 h-4 my-2" />
      <Skeleton variant="card" propClasses="w-40 h-7" />
      <Skeleton variant="card" propClasses="w-14 h-4 my-2" />
      <Skeleton variant="card" propClasses="w-40 h-7" />
      <View className="flex-row my-4 justify-between">
        <Skeleton variant="card" propClasses="w-[49%] h-7" />
        <Skeleton variant="card" propClasses="w-[49%] h-7" />
      </View>
    </View>
  );
}
