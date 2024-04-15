import { useChats } from "-/chat.store";
import { Stack, router, useGlobalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { View, Pressable, Keyboard, Dimensions, Platform } from "react-native";

import BaseIcon from "~/icon/BaseIcon";
import ChatMessagesScreen from "./_components/message-screen";
import ChatSendMessage from "./_components/send-message";
import ChatLoader from "~/secondary/chat-loader";
import { useTranslation } from "react-i18next";
import { ChatContactMobile } from "@anysoftuz/carting-shared/dist/types/mobile";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

export default function ChatScreen() {
  const { getContact, contact, loading, chatItem, getChatItem } = useChats();
  const { id, item }: { id: string; item: string } = useGlobalSearchParams();
  const { t } = useTranslation();
  const currentItem: ChatContactMobile = item ? JSON.parse(item) : {};

  useEffect(() => {
    if (id) {
      getContact(Number(id));
    }
    if (currentItem.proposal_vacancy_id) {
      getChatItem(
        currentItem.proposal_vacancy_id,
        currentItem.type === "vacancy" ? "vacancy" : "load"
      );
    }
  }, [id, item]);

  const viewRef = useRef<View>(null);

  if (loading) {
    return <ChatLoader />;
  }

  if (Platform.OS === "ios") {
    Keyboard.addListener("keyboardWillShow", () => {
      viewRef.current?.setNativeProps({
        style: {
          paddingBottom: Dimensions.get("window").height / 3.33,
        },
      });
    });

    Keyboard.addListener("keyboardWillHide", () => {
      viewRef.current?.setNativeProps({
        style: {
          paddingBottom: 0,
        },
      });
    });
  }
  function handlePress() {
    router.push({
      pathname: "/chat/settings",
      params: {
        id: currentItem?.id || 0,
        name: currentItem?.sender?.name || t("no_name"),
        photo: currentItem?.sender?.photo || "",
      },
    });
  }
  return (
    <CustomSafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          title: currentItem?.sender?.name || t("chat"),
          headerShadowVisible: false,
          headerRight: () =>
            currentItem?.type === "group" ? (
              <Pressable onPress={handlePress}>
                <BaseIcon name="setting" />
              </Pressable>
            ) : null,
          headerBackTitle: t("back"),
        }}
      />
      <View className="px-5 justify-between flex-1" ref={viewRef}>
        <ChatMessagesScreen
          room={contact}
          item={chatItem}
          proposal_vacancy_id={currentItem.proposal_vacancy_id}
        />
        <ChatSendMessage chat_id={Number(id)} />
      </View>
    </CustomSafeAreaView>
  );
}
