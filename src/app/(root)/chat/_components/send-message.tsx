import socket from "_utils/ws";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import BaseIcon from "~/icon/BaseIcon";

export default function ChatSendMessage({ chat_id }: { chat_id: number }) {
  const { colorScheme } = useColorScheme();

  const [message, setMessage] = useState<string>("");

  function handlePressSendMessage() {
    if (!message || message.length <= 0) return;
    socket.emit("send_new_message_mobile", {
      chat_id,
      message,
    });
    setMessage("");
  }

  return (
    <View className="flex-row px-3 py-2.5 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-slate-700 items-center  mb-4">
      {/* <View>
        <BaseIcon name="paperClip" />
      </View> */}
      <TextInput
        className="flex-1 px-2 dark:text-gray-50"
        placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.nativeEvent.text)}
      />
      <Pressable onPress={() => handlePressSendMessage()}>
        <BaseIcon name="sendMessage" />
      </Pressable>
    </View>
  );
}
