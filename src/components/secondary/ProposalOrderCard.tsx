import { Pressable, View } from "react-native";
import React from "react";
import { FormatDate } from "~/FormatDate";
import { BaseText } from "~/text/BaseText";
import { router } from "expo-router";

export default function ProposalOrderCard({ item }: { item: any }) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/(root)/chat/[id]`,
          params: {
            id: item.chat_id,
            proposal_vacancy_id: item.id,
            item: JSON.stringify({
              proposal_vacancy_id: item.id,
              type: "proposal",
              sender: {
                name: item.owner?.name,
              },
            }),
          },
        })
      }
    >
      <BaseText className="font-semibold capitalize">{item?.title}</BaseText>
      <BaseText className="text-xl font-bold mt-2">
        {item?.price?.toLocaleString()} {item?.currency}
      </BaseText>
      <View className="relative my-4">
        <View className="flex-row">
          <View className="w-6 h-6 border-[5px] rounded-full border-blue-500" />
          <View className="ml-2 flex-1">
            <BaseText className="font-medium ">{item?.pickup_address}</BaseText>
            <BaseText variant="tertiary" className="text-sm">
              {FormatDate(item?.pickup_time_from)}-{" "}
              {FormatDate(item?.pickup_time_to)}
            </BaseText>
          </View>
        </View>
        <View className="flex-row mt-6">
          <View className="w-6 h-6 border-[5px] rounded-full border-lime-500" />
          <View className="flex-1 ml-2">
            <BaseText className="font-medium ">
              {item?.delivery_address}
            </BaseText>
            <BaseText variant="tertiary" className="text-sm">
              {FormatDate(item?.delivery_time)}
            </BaseText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
