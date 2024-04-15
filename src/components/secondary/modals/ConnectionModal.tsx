import { Linking, Text, Pressable } from "react-native";
import React from "react";
import BottomModal from "~/modals/BottomModal";
import BaseIcon from "~/icon/BaseIcon";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useNavigationState } from "@react-navigation/native";

export default function ConnectionModal({
  connectionModal,
  setConnectionModal,
  item,
}: {
  connectionModal: boolean;
  setConnectionModal: any;
  item: any;
}) {
  const { t } = useTranslation();
  const state = useNavigationState((state) => state);
  const currentRoute = state.routes[state.index].name;
  const handlePhonePress = () => {
    const phoneUrl = item?.owner
      ? `tel:${item?.owner?.phone ?? ""}`
      : `tel:${item?.phone ?? ""}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneUrl);
        } else {
          console.warn("Phone number is not supported");
        }
      })
      .catch((error) => console.error("Error opening phone app:", error));
  };
  return (
    <BottomModal
      visible={connectionModal}
      height={220}
      onClose={() => setConnectionModal(false)}
    >
      <>
        <Text className="text-lg font-semibold leading-7 pb-4 dark:text-white text-gray-900">
          {t("connection_with_customer")}
        </Text>
        <Pressable
          onPress={handlePhonePress}
          className="px-4 py-3 rounded-md items-center my-2 flex-row justify-center dark:bg-slate-700 bg-gray-200"
        >
          <BaseIcon name="phone" />
          {item?.owner ? (
            <Text className="pl-2 text-sm font-semibold dark:text-white text-gray-900">
              + {item?.owner?.phone ?? ""}
            </Text>
          ) : (
            <Text className="text-sm font-semibold dark:text-white text-gray-900">
              {item?.phone}
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            setConnectionModal(false);
            router.push({
              pathname: "/(root)/chat/[id]",
              params: {
                id: item.chat_id,
                proposal_vacancy_id: item.proposal_id,
                item: JSON.stringify({
                  proposal_vacancy_id: item.proposal_id,
                  type: currentRoute === "Loads" ? "load" : "vacancy",
                  sender: {
                    name: item.owner?.name,
                  },
                }),
              },
            });
          }}
          className="px-4 py-3 rounded-md items-center my-2 flex-row justify-center dark:bg-slate-700  bg-gray-200"
        >
          <BaseIcon name="chat" />
          <Text className="pl-2 text-sm font-semibold dark:text-white text-gray-900">
            {t("send_message")}
          </Text>
        </Pressable>
      </>
    </BottomModal>
  );
}
