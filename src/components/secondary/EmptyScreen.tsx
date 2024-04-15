import { View, Image } from "react-native";
import React from "react";
import { BaseText } from "~/text/BaseText";
import { useTranslation } from "react-i18next";

export default function EmptyScreen({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <View className="flex-1 justify-center items-center h-[70vh]">
      <Image source={require("@/images/no-data.png")} className="w-20 h-20" />
      <BaseText className="text-center text-base font-medium capitalize">
        {t(title)}
      </BaseText>
    </View>
  );
}
