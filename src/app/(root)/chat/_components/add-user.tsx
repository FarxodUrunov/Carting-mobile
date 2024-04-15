import { View, Text, Modal, Pressable, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { BaseButton } from "~/button/BaseButton";
import { router } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import BaseInput from "~/input/BaseInput";
import { BaseText } from "~/text/BaseText";
import { useChats } from "-/chat.store";
import { useTranslation } from "react-i18next";

export default function AddUser({
  group_id,
  visible,
  onClose,
}: {
  group_id: number;
  visible: boolean;
  onClose: () => void;
}) {
  const [userId, setUserId] = useState<number[]>([]);
  const {
    getChatContacts,
    searchChatContacts,
    attachGroupMembers,
    contact_members,
  } = useChats();
  const { t } = useTranslation();
  useEffect(() => {
    getChatContacts();
  }, []);

  function handleSelect(id: number) {
    setUserId((prevUserIds: number[]) => {
      if (prevUserIds.includes(id)) {
        return prevUserIds.filter((i) => i !== id);
      }
      return [...prevUserIds, id];
    });
  }
  function onPress() {
    attachGroupMembers(group_id, { member_ids: userId });
    onClose();
  }
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="formSheet"
      animationType="slide"
    >
      <View className="flex-1 bg-gray-50 dark:bg-gray-900">
        <View className="flex-row mx-5 items-center justify-between py-6">
          <BaseText className="text-slate-700 dark:text-gray-300 text-sm font-medium">
            {t("add_new_user")}
          </BaseText>
          <Pressable onPress={onClose}>
            <BaseIcon name="xMark" />
          </Pressable>
        </View>
        <View className="px-5 flex-1 justify-between pb-4">
          <View className="flex-1 justify-center">
            <BaseInput
              label={t("search_user")}
              className="mb-6"
              placeholder={t("type_users_name")}
              onChange={(e) => {
                if (e.nativeEvent.text.length > 0) {
                  searchChatContacts(e.nativeEvent.text);
                } else {
                  searchChatContacts(null);
                }
              }}
            />

            <Text className="text-slate-700 dark:text-gray-300 text-xs mb-2">
              Add users
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              data={contact_members}
              renderItem={({ item }) => (
                <Pressable
                  className="flex-row relative"
                  key={item.id}
                  onPress={() => handleSelect(item.id)}
                >
                  <Image
                    className="w-12 h-12 rounded-full mr-3 mb-4"
                    source={{
                      uri: item.photo,
                    }}
                  />

                  <View>
                    <Text className="text-gray-900  dark:text-gray-50 font-bold">
                      {item.name}
                    </Text>
                    <Text className="text-gray-900 dark:text-gray-50 text-sm">
                      {item.type}
                    </Text>
                  </View>

                  {userId.includes(item.id) ? (
                    <BaseIcon
                      name="check"
                      cn={"text-lime-600 absolute right-0"}
                    />
                  ) : null}
                </Pressable>
              )}
            />
          </View>

          {userId.length > 0 ? (
            <BaseButton title={t("add_user")} onPress={onPress} />
          ) : (
            <BaseButton
              title={t("add_user")}
              onPress={() => {}}
              colored={false}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
