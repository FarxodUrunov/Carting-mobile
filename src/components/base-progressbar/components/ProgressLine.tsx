import { useColorScheme } from "nativewind";
import React, { FC, useMemo } from "react";
import { View } from "react-native";

interface ProgressLineProps {
  progress: number;
  point: number;
}

const ProgressLine: FC<ProgressLineProps> = ({ progress, point }) => {
  const { colorScheme } = useColorScheme();
  const lineColor = useMemo(
    () => (colorScheme === "dark" ? "bg-gray-800" : "bg-gray-100"),
    [colorScheme]
  );
  const lineLimeColor = useMemo(
    () => (colorScheme === "dark" ? "bg-lime-500" : "bg-lime-600"),
    [colorScheme]
  );
  return (
    <View
      className={`w-full h-0.5 ${
        progress >= point ? lineLimeColor : lineColor
      }`}
    />
  );
};

export default ProgressLine;
