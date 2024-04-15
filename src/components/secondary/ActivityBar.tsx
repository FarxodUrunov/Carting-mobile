import { View, Text } from "react-native";
import React from "react";
import BaseIcon from "~/icon/BaseIcon";
import BaseProgressBar from "~/progress/BaseProgressBar";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";

export default function ActivityBar({
  current,
  total,
  title,
}: {
  current: number;
  total: number;
  title: string;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className="rounded-md pt-4 px-4 pb-4"
      style={{
        backgroundColor: colors[colorScheme].colors.cardSecondary,
      }}
    >
      <BaseProgressBar current={current} total={total} placement="top-right">
        <View className="flex-row items-center">
          <BaseIcon
            name="lightningCircle"
            cn={`${
              (current / total) * 100 <= 50 && (current / total) * 100 > 5
                ? `text-amber-400`
                : (current / total) * 100 >= 50.001
                ? `text-lime-600`
                : ``
            }`}
          />

          <Text
            className={`ml-2 font-semibold ${
              colorScheme === "dark" ? "text-gray-50" : "text-gray-900"
            } `}
          >
            {title}
          </Text>
        </View>
      </BaseProgressBar>
    </View>
  );
}
