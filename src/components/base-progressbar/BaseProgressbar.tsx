import React, { FC, useMemo } from "react";
import { Text, View } from "react-native";
import ProgressLine from "./components/ProgressLine";
import ProgressCircle from "./components/ProgressCircle";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";

type BaseProgressbarLiveTrackingProps = {
  progress: number;
  firstTitle?: string;
  secondTitle?: string;
  thirdTitle?: string;
};

const BaseProgressbarLiveTracking: FC<BaseProgressbarLiveTrackingProps> = ({
  progress,
  firstTitle = "basic",
  secondTitle = "additional",
  thirdTitle = "confirm",
}) => {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const textActiveColor = useMemo(
    () => (colorScheme === "dark" ? "text-gray-50" : "text-gray-900"),
    [colorScheme]
  );
  const textPassiveColor = useMemo(
    () => (colorScheme === "dark" ? "text-gray-700" : "text-gray-300"),
    [colorScheme]
  );
  return (
    <View className="w-36 justify-center items-center">
      <View className="flex flex-row items-center">
        <ProgressCircle progress={progress} point={1} />
        <ProgressLine progress={progress} point={2} />
        <ProgressCircle progress={progress} point={2} />
        <ProgressLine progress={progress} point={3} />
        <ProgressCircle progress={progress} point={3} />
      </View>
      <View
        // className="w-40 flex flex-row items-center justify-between"
        style={{
          width: 350,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Text
          className={`text-xs capitalize ${
            progress >= 1 ? textActiveColor : textPassiveColor
          }`}
        >
          {t(`${firstTitle}`)}
        </Text>
        <Text
          className={`text-xs capitalize ${
            progress >= 2 ? textActiveColor : textPassiveColor
          }`}
        >
          {t(`${secondTitle}`)}
        </Text>
        <Text
          className={`text-xs capitalize ${
            progress === 3 ? textActiveColor : textPassiveColor
          }`}
        >
          {t(`${thirdTitle}`)}
        </Text>
      </View>
    </View>
  );
};

export default BaseProgressbarLiveTracking;
