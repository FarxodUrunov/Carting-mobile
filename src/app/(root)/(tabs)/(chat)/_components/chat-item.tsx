import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { ChatContactMobile } from "@anysoftuz/carting-shared/dist/types/mobile";
import { router } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import { BaseText } from "~/text/BaseText";

export default function ChatItem({
  item,
  t,
}: {
  item: ChatContactMobile;
  t: any;
}) {
  function handlePress(item: any) {
    router.push({
      pathname: `/(root)/chat/[id]`,
      params: {
        id: item.id,
        proposal_vacancy_id: item.proposal_vacancy_id,
        item: JSON.stringify(item),
      },
    });
  }

  return (
    <Pressable
      onPress={() => handlePress(item)}
      key={`chat-${item.id}-${item.type}`}
      className="py-4 flex-row items-center border-b border-gray-200 dark:border-slate-800 relative"
    >
      {item.sender.photo.startsWith("https://") ? (
        <Image
          className="w-12 h-12 rounded-full mr-3"
          source={{
            uri: item.sender.photo,
          }}
        />
      ) : (
        <View className="w-12 h-12 rounded-full mr-3 bg-gray-300 items-center justify-center">
          <BaseText variant="tertiary">
            {item.sender.name
              .split(" ")
              .map((n) => n[0]?.toUpperCase())
              .join("")}
          </BaseText>
        </View>
      )}

      <View>
        <View className="flex-row mb-1 items-center">
          {item.type == "group" ? (
            <BaseIcon name="userGroup" />
          ) : item.type == "vacancy" ? (
            <BaseIcon name="vacancyIcon" />
          ) : item.type == "proposal" ? (
            <BaseIcon name="loadIcon" />
          ) : null}
          <Text className="ml-1 dark:text-gray-50 text-gray-900 font-semibold">
            {item.proposal_vacancy_id
              ? ` ` +
                t(item.type).toUpperCase() +
                ` ID: ` +
                item.proposal_vacancy_id
              : item.sender.name}
          </Text>
        </View>
        <Text className="dark:text-gray-50 text-gray-900 text-xs">
          {item.last_message?.text || t("no_messages_yet")}
        </Text>
      </View>
      {item.unread_message_count > 0 ? (
        <View className="absolute right-0 w-7 h-7 dark:bg-lime-500 bg-lime-600 rounded-full flex justify-center items-center">
          <Text className="text-white dark:text-gray-50">
            {item.unread_message_count}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}
