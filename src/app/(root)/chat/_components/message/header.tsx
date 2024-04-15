import { View, Text, Image } from "react-native";
import React from "react";
import { BaseButton } from "~/button/BaseButton";
import { MobileChatContactLoadOrVacancy } from "@anysoftuz/carting-shared/dist/types/mobile";

import { TFunction } from "i18next";

export default function ListHeaderComponent({
  proposal_vacancy_id,
  item,
  onPress,
  t,
}: {
  proposal_vacancy_id: number | null;
  item: MobileChatContactLoadOrVacancy;
  onPress: (
    confirmType: "cancel" | "confirm",
    type: "proposal" | "vacancy"
  ) => void;
  t: TFunction<"translation", undefined>;
}) {
  return proposal_vacancy_id ? (
    <View className="p-1 my-4 dark:bg-slate-800 bg-gray-100 rounded-md">
      <View className="flex-row gap-3 items-center">
        <Image
          className="w-16 h-16 rounded"
          source={{
            uri: item.photo,
          }}
        />

        <View>
          <Text className="dark:text-gray-50 text-gray-900 text-xs font-bold">
            {item.title}
          </Text>
          <Text className="dark:text-gray-50 text-gray-900 text-xl font-bold">
            {item.price}
          </Text>
        </View>
      </View>

      {item.status === "confirmation" ? (
        <Text className="dark:text-gray-50 text-gray-900 mb-4 mt-4">
          {t("chat_order_confirmation_text")}
        </Text>
      ) : null}

      {item.status === "confirmation" ? (
        <View className="flex-row gap-4">
          <BaseButton
            title={t("cancel")}
            onPress={() => onPress("cancel", item.type)}
            variant="secondary"
            group
          />

          <BaseButton
            title={t("confirm")}
            onPress={() => onPress("confirm", item.type)}
            group
          />
        </View>
      ) : null}
    </View>
  ) : null;
}
