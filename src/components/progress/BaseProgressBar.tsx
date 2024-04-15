import { useState, useEffect, ReactNode } from "react";
import { View, Text } from "react-native";

const BaseProgressBar = ({
  children,
  current,
  total,
  placement,
  placementColor,
}: {
  children?: ReactNode;
  current: number;
  total: number;
  placement: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "";
  placementColor?: string;
}) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    if (current > 0 && total > 0 && current <= total) {
      setPercent((current / total) * 100);
    } else if (current > total) {
      setPercent(100);
    } else {
      setPercent(0);
    }
  }, [current, total]);
  return (
    <View>
      {children}
      <View className="w-full h-1 dark:bg-gray-700 bg-gray-300  rounded mt-2 relative">
        <View
          style={{ width: `${percent}%` }}
          className="absolute z-50 h-full top-0 left-0 rounded dark:bg-lime-500 bg-lime-600"
        />
        <Text
          className={`absolute text-gray-50  ${
            placement === `top-right`
              ? `bottom-full right-0 mb-2`
              : placement === `top-left`
              ? `bottom-full left-0 mb-2`
              : placement === `bottom-right`
              ? `top-full right-0 mt-2`
              : placement === `bottom-left`
              ? `top-full left-0 mt-2`
              : `hidden`
          } ${placementColor}`}
        >
          {percent} %
        </Text>
      </View>
    </View>
  );
};

export default BaseProgressBar;
