import { View, Text, Modal, ScrollView, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { BaseButton } from "~/button/BaseButton";
import { router } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import BaseInput from "~/input/BaseInput";
import { BaseText } from "~/text/BaseText";
import { useChats } from "-/chat.store";
import BaseAvatarUpload from "~/base-avatar-upload/BaseAvatarUpload";
import { useTranslation } from "react-i18next";

export default function ChatCreateGroupModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { contact_members, createGroup, getChatContacts, loading } = useChats();
  const [memberIds, setMemberIds] = useState<number[]>([]);
  const [groupChatName, groupChatNameState] = useState<string>("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    getChatContacts();
  }, []);

  function handleSelect(id: number) {
    setMemberIds((prevUserIds: number[]) => {
      if (prevUserIds.includes(id)) {
        return prevUserIds.filter((i) => i !== id);
      }
      return [...prevUserIds, id];
    });
  }

  const onSubmit = async () => {
    const result = await createGroup({
      group_chat_name: groupChatName,
      group_chat_photo: photo,
      member_ids: memberIds,
    });

    if (result) {
      setMemberIds([]);
      groupChatNameState("");
      onClose();
      router.push({
        pathname: `/(root)/(tabs)/(chat)`,
      });
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="formSheet"
      animationType="slide"
    >
      <ScrollView className="bg-gray-50 dark:bg-gray-900">
        <View className="flex-1 flex-row mx-5 items-center justify-between py-6">
          <BaseText className="text-slate-700 dark:text-gray-300 text-sm font-medium">
            {t("create_new_group_chat")}
          </BaseText>
          <Pressable onPress={onClose}>
            <BaseIcon name="xMark" />
          </Pressable>
        </View>
        <View className="px-5 flex-1 justify-between pb-4">
          <View className="my-6">
            <BaseAvatarUpload
              source={photo ? { uri: photo } : require("@/images/avatar.png")}
              setValue={setPhoto}
              type="chat"
            />
          </View>
          <View>
            <BaseInput
              value={groupChatName}
              label={t("group_name")}
              keyboardType="twitter"
              placeholder={t("group_name")}
              placeholderTextColor="#a2a2a2"
              onChangeText={(text) => groupChatNameState(text)}
            />
            <Text className="light text-slate-700 dark:text-gray-300 text-xs my-4">
              {t("add_users")}
            </Text>

            <ScrollView className="py-2 h-64 mb-6">
              {contact_members.length > 0 ? (
                contact_members.map((item: any) => (
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
                      <Text className="dark:text-gray-50 text-gray-900 font-bold">
                        {item.name}
                      </Text>
                      <Text className="dark:text-gray-50 text-gray-900 text-sm">
                        {item.type}
                      </Text>
                    </View>

                    {memberIds.includes(item.id) ? (
                      <BaseIcon
                        name="check"
                        cn="text-lime-600 absolute right-0"
                      />
                    ) : null}
                  </Pressable>
                ))
              ) : (
                <Text>{t("no_users_found")}</Text>
              )}
            </ScrollView>
          </View>

          {memberIds.length && groupChatName.length > 0 ? (
            <BaseButton
              title={t("create_group")}
              hasLoader
              isLoading={loading}
              onPress={() => onSubmit()}
            />
          ) : (
            <BaseButton
              title={t("create_group")}
              onPress={() => {}}
              colored={false}
            />
          )}
        </View>
      </ScrollView>
    </Modal>
  );
}
