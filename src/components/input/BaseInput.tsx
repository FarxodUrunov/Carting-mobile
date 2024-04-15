import { forwardRef, useMemo, useState } from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";
import icons from "~/icon/icons";
import { Label } from "~/label/BaseLabel";
import BaseIcon from "~/icon/BaseIcon";
import { useColorScheme } from "nativewind";

type BaseInputProps = TextInputProps & {
  success?: boolean;
  error?: boolean;
  errorMessage?: string;
  inputRef?: any;
  icon?: { [key: string]: keyof typeof icons };
  label?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
};

const BaseInput = forwardRef((props: BaseInputProps, ref: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colorScheme } = useColorScheme();
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const {
    success,
    error,
    errorMessage,
    icon,
    label,
    size = "sm",
    disabled = false,
  } = props;

  const borderColor = useMemo(() => {
    if (error) return "border-red-500/70";
    if (success) return "border-lime-500/70";
    return;
  }, [error, success]);

  const isIcon = useMemo(() => {
    if (icon?.left) return "pl-10 pr-3";
    if (icon?.right) return "pr-3 pl-3";
    return "px-3";
  }, [icon]);

  const sizeStyle = useMemo(() => {
    if (size === "sm") return "h-11";
    if (size === "md") return "h-12";
  }, [size]);

  const styledClasses = useMemo(() => {
    return [
      `w-full border rounded-md ${
        colorScheme === "dark"
          ? "border-gray-700 text-gray-100"
          : "border-gray-300 text-gray-700"
      }`,
      borderColor,
      sizeStyle,
      isIcon,
      isFocused && !error ? "border-lime-500/70" : "",
    ].join(" ");
  }, [borderColor, isIcon, isFocused, error, colorScheme]);

  return (
    <View>
      {label && (
        <Label
          htmlFor="keywords"
          className={`font-medium mb-1 capitalize ${
            size === "sm" ? "text-sm" : "text-base"
          } ${colorScheme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          {label}
        </Label>
      )}

      <View className="w-full relative">
        <TextInput
          {...props}
          style={{
            backgroundColor: disabled
              ? colorScheme === "dark"
                ? "#1D2939"
                : "#F2F4F7"
              : colorScheme === "dark"
              ? "#101828"
              : "#FCFCFD",
          }}
          className={styledClasses}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAlignVertical="center"
          placeholderTextColor={colorScheme === "dark" ? "#6b7280" : "#9ca3af"}
        />
        {icon && (
          <View>
            {icon.right && (
              <View className="absolute -top-8 right-2">
                <BaseIcon
                  name={icon.right}
                  cn={
                    colorScheme === "dark" ? "text-slate-300" : "text-slate-700"
                  }
                />
              </View>
            )}
            {icon.left && (
              <View className="absolute -top-9 left-2">
                <BaseIcon
                  name={icon.left}
                  cn={
                    colorScheme === "dark" ? "text-slate-300" : "text-slate-700"
                  }
                />
              </View>
            )}
          </View>
        )}
      </View>
      {error && <Text className="text-red-500/70">{errorMessage}</Text>}
    </View>
  );
});

export default BaseInput;
