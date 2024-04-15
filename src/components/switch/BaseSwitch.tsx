import React from "react";
import { View, Switch } from "react-native";
const BaseSwitch = ({
  value,
  setValue,
  thumbColor,
  trackColor,
  size,
  onToggle = () => {},
}: {
  value: boolean;
  setValue: any;
  thumbColor?: string;
  trackColor?: string;
  size?: "lg" | "md" | "sm";
  onToggle?: (e: boolean) => void;
}) => {
  const handleChange = (e: any) => {
    setValue((previousState: boolean) => !previousState);
    if (typeof e === "boolean") {
      onToggle(e);
    }
  };
  return (
    <View>
      <Switch
        value={value}
        style={{
          transform: [
            { scaleX: size === `lg` ? 1.2 : size === `sm` ? 0.8 : 1 },
            { scaleY: size === `lg` ? 1.2 : size === `sm` ? 0.8 : 1 },
          ],
        }}
        onValueChange={(e) => handleChange(e)}
        trackColor={{
          false: "#fff",
          true: trackColor ? trackColor : "#4CA30D",
        }}
        thumbColor={`${thumbColor ? thumbColor : `white`}`}
      />
    </View>
  );
};

export default BaseSwitch;
