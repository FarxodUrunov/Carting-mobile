import React from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import BaseInput from "~/input/BaseInput";

type ControllerInputProps = {
  control: any;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
  rules?: any;
  inputClasses?: string;
};

const ControllerInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  errorMessage,
  rules,
  inputClasses,
  ...props
}: ControllerInputProps) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <BaseInput
            {...props}
            className={inputClasses}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Text className="text-red-500 mt-1">{errorMessage}</Text>
    </View>
  );
};

export default ControllerInput;
