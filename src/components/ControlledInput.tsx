import { Text, TextInputProps } from "react-native";
import { Controller } from "react-hook-form";
import { forwardRef, useMemo, useState } from "react";
import { TextInput, View } from "react-native";
import icons from "~/icon/icons";
import { Label } from "~/label/BaseLabel";
import BaseIcon from "~/icon/BaseIcon";
import { useColorScheme } from "nativewind";

export type ControlledInputProps = {
  control: any;
  errors: any;
  name: string;
  label?: string;
  icon?: { [key: string]: keyof typeof icons };
  numeric?: boolean;
  onChangeText?:
    | (((text: string | number) => void) & ((text: string | number) => void))
    | undefined;
} & TextInputProps;
export function ControlledInput({
  control,
  errors,
  name,
  label,
  onChangeText,
  icon,
  numeric = false,
  ...props
}: ControlledInputProps) {
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CInput
            onBlur={onBlur}
            onChangeText={(e) => {
              onChangeText && onChangeText(e);
              numeric ? onChange(+e) : onChange(e);
            }}
            value={typeof value === "number" ? value.toString() : value}
            error={errors[name]}
            label={label}
            icon={icon}
            {...props}
          />
        )}
        name={name}
      />
      {errors[name] && (
        <Text className="text-red-500/70 mb-2">{errors[name].message}</Text>
      )}
    </>
  );
}

type CInputProps = TextInputProps & {
  error?: boolean;
  icon?: { [key: string]: keyof typeof icons };
  label?: string;
  size?: "sm" | "md" | "lg";
};

const CInput = forwardRef((props: CInputProps, ref: any) => {
  const [isFocused, setIsFocused] = useState(false);
  let { colorScheme } = useColorScheme();
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const { error, icon, label, size = "sm" } = props;

  const borderColor = useMemo(() => {
    if (error) return "border-red-500/70";

    return;
  }, [error]);

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
          className={`font-medium mb-2 capitalize ${
            size === "sm" ? "text-sm" : "text-base"
          } ${colorScheme === "dark" ? "text-white" : "text-gray-700"}`}
        >
          {label}
        </Label>
      )}

      <View className="w-full relative">
        <TextInput
          {...props}
          className={`${styledClasses}`}
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
              <View className="absolute -top-8 left-2">
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
    </View>
  );
});
