import React from "react";
import { FlatList } from "react-native";
import { useNavigationState } from "@react-navigation/native";

import { useChats } from "-/chat.store";

import EmptyScreen from "~/secondary/EmptyScreen";
import ChatListLoader from "./chat-list-loader";
import ChatItem from "./chat-item";
import { useTranslation } from "react-i18next";

export default function FilterChatItems() {
  const { loading, filterContacts } = useChats();
  const { t } = useTranslation();
  const state = useNavigationState((state) => state);

  return loading ? (
    <ChatListLoader />
  ) : (
    <FlatList
      className="px-5"
      ListEmptyComponent={() => (
        <EmptyScreen title={state.routes[state.index].name || t("chats")} />
      )}
      showsVerticalScrollIndicator={false}
      data={filterContacts(state.index)}
      keyExtractor={(item) => `chat-${item.id}-${item.type}`}
      renderItem={({ item }) => <ChatItem item={item} t={t} />}
    />
  );
}
