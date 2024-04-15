import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import { View, ScrollView } from "react-native";
import Skeleton from "~/skeleton";

export default function SkeletonOrderDetail() {
  const { colorScheme } = useColorScheme();
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="px-5 py-3">
        <Skeleton variant="card" propClasses="flex-1 h-6 mr-1" />
        <Skeleton variant="card" propClasses="w-32 h-6 my-2" />
        <Skeleton variant="card" propClasses="w-full h-6 my-2" />
        <View
          style={{
            backgroundColor: colors[colorScheme].colors.cardSecondary,
          }}
          className="px-4 py-3 my-2 rounded-md"
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
        <View
          className={`${
            colorScheme === "dark" ? "bg-gray-500" : "bg-gray-200"
          } rounded-lg my-2 w-full h-40`}
        />
        <View className="my-2">
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
        </View>
        <View
          className={`${
            colorScheme === "dark" ? "bg-gray-500" : "bg-gray-200"
          } rounded-lg my-2 w-full h-24`}
        />
        <Skeleton variant="card" propClasses="w-40 h-7 my-2" />
        <Skeleton variant="card" propClasses="w-16 h-4 my-2" />
        <Skeleton variant="card" propClasses="w-40 h-6 my-2" />
        <Skeleton variant="card" propClasses="w-16 h-4 my-2" />
        <Skeleton variant="card" propClasses="w-40 h-6 my-2" />
        <Skeleton variant="card" propClasses="w-16 h-4 my-2" />
        <Skeleton variant="card" propClasses="w-40 h-6 my-2" />
        <Skeleton variant="card" propClasses="w-16 h-4 my-2" />
        <Skeleton variant="card" propClasses="w-40 h-6 my-2" />
        <Skeleton variant="card" propClasses="w-full h-6 my-2" />
        <View className="flex-row my-2">
          <Skeleton variant="card" propClasses="flex-1 h-6 mr-1" />
          <Skeleton variant="card" propClasses="flex-1 h-6 ml-1" />
        </View>
      </View>
    </ScrollView>
  );
}
