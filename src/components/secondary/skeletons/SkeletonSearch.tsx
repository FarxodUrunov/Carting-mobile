import { View } from "react-native";
import Skeleton from "~/skeleton";
import { useColorScheme } from "nativewind";
import colors from "_constants/colors";

export default function SkeletonSearch() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="py-3 px-4">
      <View
        style={{
          backgroundColor: colors[colorScheme].colors.cardSecondary,
        }}
        className="px-4 py-3 rounded-md mb-2"
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row">
            <Skeleton variant="card" propClasses="w-6 h-6 mr-2" />
            <Skeleton variant="card" propClasses="w-32 h-6" />
          </View>
          <Skeleton variant="card" propClasses="w-10 h-6" />
        </View>
        <Skeleton variant="card" propClasses="w-full h-6 mt-2" />
      </View>

      <CardSkeleton />
      <CardSkeleton />
    </View>
  );
}

export const CardSkeleton = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      style={{
        backgroundColor: colors[colorScheme].colors.cardSecondary,
      }}
      className="px-4 py-3 rounded-md my-2"
    >
      <Skeleton variant="card" propClasses="w-full h-6" />
      <View className="flex-row my-4">
        <Skeleton variant="card" propClasses="w-16 h-16 mr-4" />
        <View className="flex-1">
          <Skeleton variant="card" propClasses="w-3/5 h-7" />
          <Skeleton variant="card" propClasses="w-20 h-5 mt-2" />
        </View>
      </View>
      <View className="flex-row">
        <Skeleton variant="card" propClasses="w-6 h-6" />
        <View className="ml-4">
          <Skeleton variant="card" propClasses="w-44 h-6" />
          <Skeleton variant="card" propClasses="w-32 h-6 mt-2" />
        </View>
      </View>
      <View className="flex-row my-4">
        <Skeleton variant="card" propClasses="w-6 h-6" />
        <View className="ml-4">
          <Skeleton variant="card" propClasses="w-44 h-6" />
          <Skeleton variant="card" propClasses="w-32 h-6 mt-2" />
        </View>
      </View>
      <View className="flex-row">
        <Skeleton variant="card" propClasses="w-16 h-5 mr-4" />
        <Skeleton variant="card" propClasses="w-16 h-5 mr-4" />
        <Skeleton variant="card" propClasses="w-16 h-5 mr-4" />
        <Skeleton variant="card" propClasses="w-16 h-5 mr-4" />
      </View>
      <View className="flex-row mt-4">
        <Skeleton variant="card" propClasses="flex-1 h-10 mr-2" />
        <Skeleton variant="card" propClasses="flex-1 h-10 ml-2" />
      </View>
    </View>
  );
};
