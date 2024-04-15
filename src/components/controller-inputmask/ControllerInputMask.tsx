import React from "react";
import { Controller } from "react-hook-form";
import { KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { Label } from "~/label/BaseLabel";
import { useColorScheme } from "nativewind";

type InputType =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url"
  | "phone-pad";

type ControllerInputProps = {
  control: any;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  rules?: any;
  inputClasses?: string;
  keyboardType?: InputType;
  mask: string;
  label?: string;
  errors: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};
const keyboardTypeMapping: Record<InputType, KeyboardTypeOptions> = {
  none: "default",
  text: "default",
  decimal: "decimal-pad",
  numeric: "numeric",
  tel: "phone-pad",
  email: "email-address",
  url: "url",
  search: "web-search",
  "phone-pad": "phone-pad",
};

const ControllerInputMask = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  rules,
  inputClasses,
  keyboardType,
  mask,
  label,
  errors,
  autoCapitalize,
  ...props
}: ControllerInputProps) => {
  const mappedKeyboardType = keyboardType
    ? keyboardTypeMapping[keyboardType]
    : undefined;
  const { colorScheme } = useColorScheme();
  return (
    <View>
      {label && (
        <Label
          htmlFor="keywords"
          className="font-medium mb-2 capitalize sm:text-base text-sm  dark:text-white text-gray-700"
        >
          {label}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <MaskedTextInput
            {...props}
            mask={mask}
            autoCapitalize="characters"
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            value={value || ""}
            placeholderTextColor="#9ca3af"
            style={
              "dark"
                ? inputStyles(colorScheme, errors, name).dark
                : inputStyles(colorScheme, errors, name).light
            }
            keyboardType={mappedKeyboardType ?? "default"}
          />
        )}
      />
      {errors[name] && (
        <Text className="text-red-500/70 mb-2">{errors[name].message}</Text>
      )}
    </View>
  );
};

export default ControllerInputMask;

const inputStyles = (colorScheme: any, errors: any, name: string) =>
  StyleSheet.create({
    dark: {
      marginTop: 6,
      height: 40,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: errors?.[name]
        ? "rgba(239,68,68,0.7)"
        : colorScheme === "dark"
        ? "#4B5563"
        : "#D0D7DE",
      borderRadius: 4,
      color: colorScheme === "dark" ? "white" : "rgb(55,65,81)",
    },
    light: {
      marginTop: 6,
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: errors?.[name]
        ? "rgba(239,68,68,0.7)"
        : colorScheme === "dark"
        ? "#4B5563"
        : "#D0D7DE",
      color: colorScheme === "dark" ? "white" : "rgb(55,65,81)",
    },
  });
