import { View } from "react-native";
import { BaseText } from "~/text/BaseText";

export default function ProfileEmpty({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View className="px-3 py-4 dark:bg-gray-800 bg-gray-100 rounded-md mt-4 mb-6">
      <BaseText className="text-base font-bold mb-2 text-center">
        {title}
      </BaseText>
      <BaseText className="text-sm text-center">{subtitle}</BaseText>
    </View>
  );
}
