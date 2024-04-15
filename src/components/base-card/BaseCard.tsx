import React, { ReactNode } from "react";
import { View } from "react-native";
import { Children } from "react";

function BaseCard({ children, cn }: { children?: ReactNode; cn?: string }) {
  const result = Children.toArray(children);
  return (
    <View className={`px-3 py-4 bg-gray-100 rounded-md flex-col ${cn}`}>
      {children && result[0] && <View>{result[0]}</View>}
      {children && result[1] && <View className="my-2">{result[1]}</View>}
      {children && result[2] && <View>{result[2]}</View>}
    </View>
  );
}

export default BaseCard;
