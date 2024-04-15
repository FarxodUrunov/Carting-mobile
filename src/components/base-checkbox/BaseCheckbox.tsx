import React, { ReactNode } from "react";
import { View, Pressable } from "react-native";
import BaseIcon from "~/icon/BaseIcon";

interface BaseCheckboxProps {
  children?: ReactNode;
  isChecked: boolean;
  disabled?: boolean;
  toggleChecked?: () => void;
}

const BaseCheckbox = ({
  children,
  isChecked,
  disabled = false,
  toggleChecked,
}: BaseCheckboxProps) => {
  return (
    <Pressable
      className="flex-row gap-2 items-center"
      onPress={toggleChecked}
      disabled={disabled}
    >
      <View
        className={`w-4 h-4 border-2 relative rounded ${
          isChecked ? "bg-lime-200 border-lime-600" : "bg-white border-gray-300"
        }`}
      >
        <View
          className={`absolute top-0.5 left-[1px] ${
            isChecked ? "flex" : "hidden"
          }`}
        >
          <BaseIcon
            name="checkboxIcon"
            cn={"text-red-500"}
            width={8}
            height={8}
          />
        </View>
      </View>
      {children}
    </Pressable>
  );
};

export default BaseCheckbox;
