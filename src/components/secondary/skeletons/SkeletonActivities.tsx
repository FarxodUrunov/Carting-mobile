import { View, ScrollView } from "react-native";
import Skeleton from "~/skeleton";

export default function SkeletonActivites() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="px-5 py-3">
        <View className="rounded-md p-4 gap-4 bg-gray-50 dark:bg-gray-700">
          <View className="flex-row gap-4">
            <Skeleton variant="card" propClasses="w-6 h-6 mr-1" />
            <Skeleton variant="card" propClasses="w-20 h-6 mr-1" />
          </View>
          <Skeleton variant="card" propClasses="w-full h-6 mr-1" />
        </View>
        <View className="gap-4 mt-5">
          <View className="flex-row gap-4">
            <View className="bg-gray-50 dark:bg-gray-700 flex-1 rounded-md p-4 gap-1">
              <Skeleton variant="card" propClasses="w-1/3 h-6" />
              <Skeleton variant="card" propClasses="w-1/2 h-6" />
            </View>
            <View className="bg-gray-50 dark:bg-gray-700 flex-1 rounded-md p-4 gap-1">
              <Skeleton variant="card" propClasses="w-1/3 h-6" />
              <Skeleton variant="card" propClasses="w-1/2 h-6" />
            </View>
          </View>
          <View className="flex-row gap-4">
            <View className="bg-gray-50 dark:bg-gray-700 flex-1 rounded-md p-4 gap-1">
              <Skeleton variant="card" propClasses="w-1/3 h-6" />
              <Skeleton variant="card" propClasses="w-1/2 h-6" />
            </View>
            <View className="bg-gray-50 dark:bg-gray-700 flex-1 rounded-md p-4 gap-1">
              <Skeleton variant="card" propClasses="w-1/3 h-6" />
              <Skeleton variant="card" propClasses="w-1/2 h-6" />
            </View>
          </View>
        </View>
        <View className="mt-4">
          <Skeleton variant="card" propClasses="w-1/3 h-6 mt-2" />
          <Skeleton variant="card" propClasses="w-full h-80 mt-2" />
        </View>
        <View className="mt-4">
          <Skeleton variant="card" propClasses="w-1/3 h-6 mt-2" />
          <Skeleton variant="card" propClasses="w-full h-80 mt-2" />
        </View>
      </View>
    </ScrollView>
  );
}
