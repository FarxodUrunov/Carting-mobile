import { View, Text } from "react-native";
import React from "react";
import { TFunction } from "i18next";

export default function ListEmptyComponent({
  t,
}: {
  t: TFunction<"translation", undefined>;
}) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-gray-400 text-sm">{t("no_messages")}</Text>
    </View>
  );
}
