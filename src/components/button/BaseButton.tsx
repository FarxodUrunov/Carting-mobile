import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ButtonVariants, IconPosition } from "./contants";
import BaseIcon from "~/icon/BaseIcon";
import icons from "~/icon/icons";
import { useColorScheme } from "nativewind";

export function BaseButton({
  title = "",
  variant = "primary",
  colored = true,
  icon,
  iconPosition = "left",
  error,
  onPress,
  hasLoader = false,
  isLoading,
  indicatorSize = "large",
  group = false,
}: {
  title?: string;
  icon?: keyof typeof icons;
  iconPosition?: IconPosition;
  variant?: ButtonVariants;
  colored?: Boolean;
  error?: Boolean;
  hasLoader?: Boolean;
  isLoading?: Boolean;
  indicatorSize?: "small" | "large";
  group?: Boolean;
  onPress: () => void;
}) {
  const { colorScheme } = useColorScheme();

  const btnVariants: { [key: string]: string } = {
    primary: colored ? "bg-lime-600" : "bg-gray-300",
    secondary: colored ? "border border-lime-600 " : "border border-red-500",
    teritary: colored ? "bg-lime-100" : "bg-gray-300",
    link: "bg-transparent",
    warning: "border border-red-500",
    delete: colorScheme === "dark" ? "bg-red-400" : "bg-red-600",
  };

  const btnColorVaraints: { [key: string]: string } = {
    primary: colored ? "text-white" : "text-gray-900",
    secondary: colorScheme === "dark" ? "text-white" : "text-gray-900",
    teritary: "text-gray-900",
    link: error ? "text-red-500" : colored ? "text-lime-500" : "text-gray-900",
    warning: "text-red-500",
    delete: "text-white",
  };

  const LoaderColorVariants: { [key: string]: string } = {
    primary: colored ? "white" : "#111827",
    secondary: colorScheme === "dark" ? "white" : "#111827",
    teritary: "#111827",
    link: error ? "#ef4444" : colored ? "#84cc16" : "#111827",
    delete: "white",
  };

  return hasLoader ? (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        group ? "flex-1" : ""
      } !px-4 !py-3 rounded-md flex-row justify-center items-center mb-2  ${
        btnVariants[variant]
      }`}
      disabled={isLoading as boolean}
    >
      {isLoading ? (
        <>
          <ActivityIndicator
            size={indicatorSize}
            color={`${LoaderColorVariants[variant]}`}
            className={`absolute`}
          />
          <Text
            className={`${btnColorVaraints[variant]} text-sm font-semibold text-center mx-2 opacity-50 capitalize`}
          >
            {title}
          </Text>
        </>
      ) : (
        <>
          {icon && (iconPosition == "left" || iconPosition == "leftRight") ? (
            <BaseIcon name={icon} cn={`${btnColorVaraints[variant]}`} />
          ) : null}
          {title ? (
            <Text
              className={`${btnColorVaraints[variant]} text-sm font-semibold text-center mx-2 capitalize`}
            >
              {title}
            </Text>
          ) : null}
          {icon && (iconPosition == "right" || iconPosition == "leftRight") ? (
            <BaseIcon name={icon} />
          ) : null}
        </>
      )}
    </TouchableOpacity>
  ) : (
    <Pressable
      onPress={onPress}
      className={`${
        group ? "flex-1" : ""
      } !px-4 !py-3 rounded-md flex-row justify-center items-center ${
        btnVariants[variant]
      } mb-2`}
    >
      {icon && (iconPosition == "left" || iconPosition == "leftRight") ? (
        <BaseIcon name={icon} cn={`${btnColorVaraints[variant]}`} />
      ) : null}
      {title ? (
        <Text
          className={`${btnColorVaraints[variant]} text-sm font-semibold text-center mx-2 capitalize`}
        >
          {title}
        </Text>
      ) : null}
      {icon && (iconPosition == "right" || iconPosition == "leftRight") ? (
        <BaseIcon name={icon} />
      ) : null}
    </Pressable>
  );
}
