import { useCallback } from "react";
import { useColorScheme } from "nativewind";
import { Text as DefaultText, TextProps } from "react-native";

type LabelProps = TextProps & { htmlFor: string };

export function Label({ htmlFor, ...props }: LabelProps) {
  const { style, ...otherProps } = props;
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? "white" : "black";

  const ref = useCallback((node: DefaultText | null) => {}, []);

  return (
    <DefaultText
      accessibilityRole={undefined}
      ref={ref}
      style={[{ color }, style]}
      {...otherProps}
    />
  );
}
