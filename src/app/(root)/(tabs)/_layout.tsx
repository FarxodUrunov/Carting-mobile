import { Tabs } from "expo-router";
import { Pressable } from "react-native";
import BaseIcon from "~/icon/BaseIcon";
import ChatSearchModal from "./(chat)/_components/create-group";
import { useEffect, useState } from "react";
import MainHeader from "./search/_components/MainHeader";
import { useTranslation } from "react-i18next";
import socket from "_utils/ws";
import { useChats } from "-/chat.store";

export default function TabLayout() {
  const [visible, setVisible] = useState(false);
  const { setNewMessageContacts, unreadMessageCount } = useChats();
  const { t } = useTranslation();
  useEffect(() => {
    socket.on("receive_new_message", (data: any) => {
      setNewMessageContacts(data);
    });

    return () => {
      socket.off("receive_new_message");
    };
  }, [socket]);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "400",
            textTransform: "uppercase",
            textAlign: "center",
          },
        }}
      >
        <Tabs.Screen
          name="search"
          options={{
            title: t("search"),
            tabBarIcon: ({ color }) => <BaseIcon name="search" color={color} />,
            header: (props) => <MainHeader />,
          }}
        />
        <Tabs.Screen
          key="PROPOSAL_DETAIL"
          name="proposal"
          options={{
            title: t("proposals"),
            tabBarIcon: ({ color }) => (
              <BaseIcon name="proposals" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(chat)"
          options={{
            headerShadowVisible: false,
            tabBarBadge:
              unreadMessageCount() > 0 ? unreadMessageCount() : undefined,
            title: t("chats"),
            tabBarIcon: ({ color }) => <BaseIcon name="chat" color={color} />,
            headerRight: () => {
              return (
                <Pressable className="px-2" onPress={() => setVisible(true)}>
                  <BaseIcon name="plus" />
                </Pressable>
              );
            },
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: t("profile"),
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <BaseIcon name="profile" color={color} />
            ),
          }}
        />
      </Tabs>

      <ChatSearchModal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}
