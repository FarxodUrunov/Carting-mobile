import { View } from "react-native";
import Skeleton from "~/skeleton";

export default function SkeletonMyVehicles() {
  return [1, 2, 3].map((item) => (
    <View
      key={item}
      className="px-4 py-3 rounded-md mb-6 dark:bg-gray-800 bg-gray-100"
    >
      <View className="flex-row my-4">
        <Skeleton variant="card" propClasses="w-16 h-16 mr-4" />
        <View className="flex-1">
          <Skeleton variant="card" propClasses="w-3/5 h-7" />
          <Skeleton variant="card" propClasses="w-20 h-5 mt-2" />
        </View>
      </View>
      <Skeleton variant="card" propClasses="w-44 h-6" />
      <Skeleton variant="card" propClasses="w-56 h-6 my-2" />

      <View className="flex-row mt-4">
        <Skeleton variant="card" propClasses="w-24 h-5 mr-4" />
        <Skeleton variant="card" propClasses="w-24 h-5 mr-4" />
      </View>
      <View className="flex-row mt-4">
        <Skeleton variant="card" propClasses="flex-1 w-full h-10 mb-2" />
      </View>
    </View>
  ));
}
