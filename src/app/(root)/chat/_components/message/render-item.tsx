import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { dateTimeToTime } from "_utils/time";
import {
  ChatMessageMobile,
  ChatMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import * as Linking from "expo-linking";

export default function ChatRenderItem({
  item,
  index,
  user,
  room,
  isLoading,
}: {
  item: ChatMessageMobile;
  index: number;
  user: any;
  room: ChatMobile;
  isLoading: boolean;
}) {
  const currentUser = JSON.parse(user);

  return !isLoading ? (
    <View
      className={`w-full ${
        item.sender_id === currentUser.id ? "items-end" : ""
      }`}
      key={`chat-${index}-message`}
    >
      <View className="flex-row items-end mb-1.5 ">
        {item.sender_id !== currentUser.id && (
          <Image
            className="w-6 h-6 rounded-full mb-0.5 mr-1"
            source={{
              uri: room.members.find((m: any) => m.id === item.sender_id)
                ?.photo,
            }}
          />
        )}
        <View
          key={item.id}
          className={` px-3 py-1.5  rounded-2xl w-64 relative  ${
            item.sender_id === currentUser.id
              ? "bg-lime-600 dark:bg-lime-500"
              : "bg-gray-100 dark:bg-slate-800"
          }`}
        >
          <View className="flex-wrap ">
            <View className="w-full">
              {item.files &&
                item.files.length > 0 &&
                item.files.map((file, index) =>
                  file.original_name.endsWith(".jpg") ||
                  file.original_name.endsWith(".png") ||
                  file.original_name.endsWith(".jpeg") ? (
                    <Image
                      key={index}
                      className="w-32 h-32 rounded-2xl"
                      source={{
                        uri: file.url,
                      }}
                    />
                  ) : (
                    <Pressable
                      key={index}
                      onPress={() => Linking.openURL(file.url)}
                    >
                      <Text className="text-sm text-blue-500 dark:text-blue-300">
                        {file.original_name}
                      </Text>
                    </Pressable>
                  )
                )}
              <Text
                className={`text-sm ${
                  item.sender_id === currentUser.id
                    ? "text-gray-50 dark:text-white"
                    : "text-gray-900 dark:text-gray-50"
                }`}
              >
                {item.message}
              </Text>
            </View>
            <View className="items-end w-full">
              <Text
                className={`text-xs ${
                  item.sender_id === currentUser.id
                    ? "text-white dark:text-gray-50"
                    : "text-gray-900 dark:text-gray-50"
                }`}
              >
                {dateTimeToTime(item.created_at)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  ) : null;
}
