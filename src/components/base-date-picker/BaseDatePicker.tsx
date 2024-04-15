import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import BaseIcon from "~/icon/BaseIcon";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Label } from "~/label/BaseLabel";

const BaseDatePicker = ({
  error,
  errorMessage,
  label,
  dateValue,
  setDateValue,
  placeholder,
}: {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  dateValue: string;
  placeholder?: string;
  setDateValue: (val: string) => void;
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>("");

  const toggleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleShowPicker();
        setDateOfBirth(currentDate.toDateString());
        setDateValue(selectedDate.toISOString());
      }
    } else {
      toggleShowPicker();
    }
  };

  const confirmIOSDate = () => {
    toggleShowPicker();
    setDateValue(date.toDateString());
    setDateValue(date.toISOString());
  };

  useEffect(() => {
    setDateOfBirth(new Date(dateValue).toDateString());
  }, [dateValue]);

  return (
    <View>
      <View className="h-16 gap-1">
        {label && (
          <Label
            htmlFor="keywords"
            className="font-medium text-sm text-gray-700 dark:text-gray-300"
          >
            {label}
          </Label>
        )}
        <TouchableOpacity
          className={`flex-row justify-between items-center border py-2.5 rounded-lg px-2 ${
            error ? "border-red-500/70" : "border-gray-300 dark:border-gray-600"
          }`}
          onPress={toggleShowPicker}
        >
          <Text
            className={
              dateValue ? "text-gray-700 dark:text-gray-50" : "text-gray-400"
            }
          >
            {dateValue ? dateOfBirth : placeholder}
          </Text>
          <BaseIcon name="calendar" cn="text-gray-400" />
        </TouchableOpacity>
        {error && <Text className="text-red-500/70">{errorMessage}</Text>}
      </View>
      {showPicker ? (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={onChange}
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          style={{ height: 240 }}
        />
      ) : null}

      {showPicker && Platform.OS === "ios" && (
        <View className="flex-row justify-end mb-4">
          <TouchableOpacity
            onPress={toggleShowPicker}
            className="px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-600"
          >
            <Text className="text-gray-700 dark:text-gray-50">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={confirmIOSDate}
            className="px-4 py-3 rounded-lg bg-lime-500 ml-4"
          >
            <Text className="text-white">Confirm</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BaseDatePicker;
