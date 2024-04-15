import { FlatList, View } from "react-native";
import React from "react";
import Skeleton from "~/skeleton";

export default function SkeletonProposals({ status }: { status: string }) {
  return (
    <View className="flex-1 px-5 py-2">
      <FlatList
        className="flex-1"
        showsVerticalScrollIndicator={false}
        data={status === `active` ? [1] : [1, 2]}
        renderItem={() => (
          <View className="rounded-lg my-2 p-3 dark:bg-gray-800 bg-gray-100">
            <Skeleton variant="card" propClasses="w-full h-6" />
            <Skeleton variant="card" propClasses="w-44 h-7 mt-4" />
            <Skeleton variant="card" propClasses="w-20 h-7 mt-2" />
            <View className="my-4 flex-row">
              <Skeleton variant="card" propClasses="w-6 h-6 mr-4" />
              <View>
                <Skeleton variant="card" propClasses="w-40 h-6" />
                <Skeleton variant="card" propClasses="w-28 h-6 mt-2" />
              </View>
            </View>
            <View className="flex-row justify-between">
              <Skeleton variant="card" propClasses="w-16 h-5" />
              <Skeleton variant="card" propClasses="w-16 h-5" />
              <Skeleton variant="card" propClasses="w-16 h-5" />
              <Skeleton variant="card" propClasses="w-16 h-5" />
            </View>
            <Skeleton
              variant="card"
              propClasses={`w-full ${
                status === `active` ? `h-36` : `h-10`
              } mt-4`}
            />
          </View>
        )}
      />
      {status === `active` && (
        <Skeleton variant="card" propClasses="w-full h-36" />
      )}
    </View>
  );
}
