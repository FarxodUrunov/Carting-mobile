import { ReactNode } from "react";
import { View } from "react-native";
import { BaseText } from "~/text/BaseText";

const BaseBadge = ({
  children,
  text,
  cn,
  variant = "primary",
  cnText,
}: {
  children?: ReactNode;
  text: string;
  cn?: string;
  variant?: "primary" | "secondary";
  cnText?: string;
}) => {
  return (
    <View
      className={`rounded px-2 py-1 flex-row items-center justify-center ${
        variant === "primary"
          ? "dark:bg-gray-800 bg-gray-200"
          : "dark:bg-gray-500 bg-gray-200"
      } ${cn}`}
    >
      <BaseText
        className={`text-xs font-medium dark:text-gray-50 text-gray-700 ${
          children && `ml-2`
        } ${cnText}`}
      >
        {text}
      </BaseText>
      {children}
    </View>
  );
};

export default BaseBadge;
