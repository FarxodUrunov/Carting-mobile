import { FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import {
  ChatMobile,
  MobileChatContactLoadOrVacancy,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import socket from "_utils/ws";
import { useChats } from "-/chat.store";
import ListEmptyComponent from "./message/empty";
import ListHeaderComponent from "./message/header";
import ChatRenderItem from "./message/render-item";
import { useStorageState } from "_hooks/storage.hook";
import { useTranslation } from "react-i18next";

export default function MessagesScreen({
  proposal_vacancy_id,
  room,
  item,
}: {
  proposal_vacancy_id: number | null;
  room: ChatMobile;
  item: MobileChatContactLoadOrVacancy;
}) {
  const { t } = useTranslation();
  const [[isLoading, user]] = useStorageState("user");
  const { setMessage, proposalUpdate, vacancyUpdate } = useChats();
  const flatRef = React.useRef<FlatList>(null);

  useEffect(() => {
    socket.on("receive_new_message", (data: any) => {
      setMessage({
        id: data.id,
        sender_id: data.sender_id,
        message: data.message,
        files: data.files,
        created_at: data.created_at,
      });
      socket.emit(
        "update_last_read_message",
        {
          chat_id: room.id,
          last_read_msg_id: data.id,
        },
        (data: any) => {
          console.log("update_last_read_message", data);
        }
      );
    });
    flatRef.current?.scrollToEnd({ animated: true });
    return () => {
      socket.off("receive_new_message");
    };
  }, [socket]);
  async function onPressItem(
    confirmType: "cancel" | "confirm",
    type: "proposal" | "vacancy"
  ) {
    if (proposal_vacancy_id) {
      if (type === "vacancy") {
        await vacancyUpdate(proposal_vacancy_id, confirmType);
      } else {
        await proposalUpdate(proposal_vacancy_id, confirmType);
      }
    }
  }
  return (
    <FlatList
      className="mb-4"
      ref={flatRef}
      keyExtractor={(item, index) => `chat-${item?.id}-${index}-message`}
      data={room.messages?.data}
      initialNumToRender={100}
      onContentSizeChange={() =>
        flatRef.current?.scrollToEnd({ animated: true })
      }
      onLayout={() => flatRef.current?.scrollToEnd({ animated: true })}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <ListEmptyComponent t={t} />}
      ListHeaderComponent={() => (
        <ListHeaderComponent
          t={t}
          proposal_vacancy_id={proposal_vacancy_id}
          item={item}
          onPress={onPressItem}
        />
      )}
      renderItem={({ item, index }) => (
        <ChatRenderItem
          item={item}
          index={index}
          user={user}
          room={room}
          isLoading={isLoading}
        />
      )}
    />
  );
}
