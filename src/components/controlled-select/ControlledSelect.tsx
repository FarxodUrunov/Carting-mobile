import { useColorScheme } from "nativewind";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import BaseIcon from "~/icon/BaseIcon";
import { BaseText } from "~/text/BaseText";

const ControlledSelect = ({
  control,
  errors,
  name,
  options,
  placeholder = "Select",
  pickerStyles,
  manualStyle,
  label,
  handleValueChange,
  numeric = false,
}: {
  control: any;
  errors: any;
  name: string;
  options: any[];
  placeholder?: string;
  pickerStyles?: any;
  manualStyle?: boolean;
  label?: string;
  numeric?: boolean;
  handleValueChange?: (item: any) => void;
}) => {
  const { t } = useTranslation();
  let { colorScheme } = useColorScheme();

  return (
    <View>
      {label && (
        <BaseText className="font-medium mb-2 dark:text-white text-gray-700">
          {label}
        </BaseText>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            doneText={t("choose")}
            darkTheme={colorScheme === "dark"}
            useNativeAndroidPickerStyle={false}
            style={
              manualStyle
                ? pickerStyles
                : pickerSelectStyles(colorScheme, errors, name)
            }
            onValueChange={(item) => {
              if (item && item !== "undefined") {
                handleValueChange && handleValueChange(numeric ? +item : item);
                onChange(numeric ? +item : item);
              } else {
                handleValueChange && handleValueChange(undefined);
                onChange(undefined);
              }
            }}
            value={typeof value === "number" ? value.toString() : value}
            items={options}
            placeholder={{
              label: placeholder,
              value: undefined,
            }}
            Icon={() => {
              return <BaseIcon name="chevronDown" color="#D0D7DE" />;
            }}
          />
        )}
      />
      {errors?.[name] && (
        <Text className="text-red-500/70 mb-2">{errors?.[name]?.message}</Text>
      )}
    </View>
  );
};

export default ControlledSelect;

const pickerSelectStyles = (colorScheme: any, errors: any, name: string) =>
  StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: errors?.[name]
        ? "rgba(239,68,68,0.7)"
        : colorScheme === "dark"
        ? "#4B5563"
        : "#D0D7DE",
      borderRadius: 4,
      color: colorScheme === "dark" ? "white" : "rgb(55,65,81)",
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 14,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: errors?.[name]
        ? "rgba(239,68,68,0.7)"
        : colorScheme === "dark"
        ? "#4B5563"
        : "#D0D7DE",
      borderRadius: 4,
      color: colorScheme === "dark" ? "white" : "rgb(55,65,81)",
      paddingRight: 30,
    },
    iconContainer: {
      top: 7,
      right: 12,
    },
    placeholder: {
      color: colorScheme === "dark" ? "#6b7280" : "#9ca3af",
    },
  });
