import { useColorScheme } from "nativewind";
import React, { FC, useMemo } from "react";
import { View } from "react-native";
interface ProgressCircleProps {
  progress: number;
  point: number;
}

const ProgressCircle: FC<ProgressCircleProps> = ({ progress, point }) => {
  const { colorScheme } = useColorScheme();
  const circleColor = useMemo(
    () =>
      colorScheme === "dark"
        ? "border border-gray-800"
        : "border border-gray-200",
    [colorScheme]
  );
  const circleLimeColor = useMemo(
    () => (colorScheme === "dark" ? "bg-lime-500" : "bg-lime-600"),
    [colorScheme]
  );
  return (
    <View>
      <View
        className={`w-4 h-4 rounded-full ${
          progress >= point ? circleLimeColor : circleColor
        } `}
      />
    </View>
  );
};

export default ProgressCircle;
