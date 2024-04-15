import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="font-bold text-lg">This screen doesn't exist.</Text>

        <Link href="/" className="mt-4 py-4">
          <Text className="text-sm dark:text-gray-50 text-blue-400">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
