import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useEffect } from "react";
import { useChats } from "-/chat.store";
import FilterChatItems from "./_components/chat-filter";
import { useTranslation } from "react-i18next";

export default function ChatTabLayout() {
  const Tab = createMaterialTopTabNavigator();
  const { getContacts } = useChats();
  const { t } = useTranslation();
  useEffect(() => {
    getContacts({
      take: 100,
      cursor: 0,
      direction: "next",
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: { width: 150 },
        tabBarScrollEnabled: true,
      }}
    >
      <Tab.Screen
        name={t("proposals")}
        component={FilterChatItems}
        key="proposal"
        navigationKey="proposal"
      />
      <Tab.Screen
        name={t("groups")}
        component={FilterChatItems}
        key="group"
        navigationKey="group"
      />
      <Tab.Screen
        name={t("individual")}
        component={FilterChatItems}
        key="individual"
        navigationKey="individual"
      />
      <Tab.Screen
        name={t("vacancies")}
        component={FilterChatItems}
        key="vacancy"
        navigationKey="vacancy"
      />
    </Tab.Navigator>
  );
}
