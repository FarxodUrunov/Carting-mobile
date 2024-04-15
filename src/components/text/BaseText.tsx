import { Text as StyledComponent, TextProps } from "react-native";
import { useColorScheme } from "nativewind";

export function BaseText({
  variant = "primary",
  className,
  ...props
}: TextProps & {
  variant?: "primary" | "secondary" | "tertiary";
  className?: any;
}) {
  const { colorScheme } = useColorScheme();

  const colors: any = {
    light: {
      primary: "text-gray-900",
      secondary: "text-gray-700",
      tertiary: "text-gray-500",
    },
    dark: {
      primary: "text-gray-50",
      secondary: "text-gray-300",
      tertiary: "text-gray-400",
    },
  };

  return (
    <StyledComponent
      className={`${className} ${
        colors[colorScheme ?? "light"][variant]
      } text-base`}
      {...props}
    >
      {props.children}
    </StyledComponent>
  );
}
