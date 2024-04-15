import { View, ScrollView } from "react-native";
import React from "react";
import Skeleton from "~/skeleton";

export default function SkeletonWithTruck() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="dark:bg-gray-700 bg-gray-100 rounded-lg h-20 w-full items-center justify-center">
        <Skeleton variant="card" propClasses="w-[90%] h-2" />
      </View>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <View key={item} className="my-6">
          <Skeleton variant="card" propClasses="w-1/4 h-2 my-1" />
          <Skeleton variant="card" propClasses="w-4/5 h-11 " />
        </View>
      ))}
    </ScrollView>
  );
}
