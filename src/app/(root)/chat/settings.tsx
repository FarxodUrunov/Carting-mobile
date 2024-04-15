import { View, Text, Image, Pressable, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { BaseButton } from "~/button/BaseButton";
import BaseInput from "~/input/BaseInput";
import { FlatList, RectButton } from "react-native-gesture-handler";
import BaseIcon from "~/icon/BaseIcon";
import { Stack, router, useGlobalSearchParams } from "expo-router";
import BottomModal from "~/modals/BottomModal";

import BaseAvatarUpload from "~/base-avatar-upload/BaseAvatarUpload";
import { ChatContactMember, useChats } from "-/chat.store";
import axios from "_utils/fetch";
import { BaseText } from "~/text/BaseText";
import AddUser from "./_components/add-user";
import { useTranslation } from "react-i18next";
import ChatSwipeableRow from "./_components/ChatSwipeableRow";

export default function ChatGroupSettingsScreen() {
  const { contact, deleteGroup, updateGroup, getGroup } = useChats();
  const { id: roomId, name, photo: po }: any = useGlobalSearchParams();

  const [isEdit, setIsEdit] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [groupChatName, setGroupChatName] = useState(name);
  const { t } = useTranslation();

  const [photo, setPhoto] = useState(po);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (roomId) {
      getGroup(Number(roomId));
    }
  }, [roomId]);

  const isOwner = contact.members.find(
    (member: any) => member.is_owner
  )?.is_owner;
  const handleFileUpload = async (img: string) => {
    const fileUri = Platform.OS === "ios" ? img.replace("file://", "") : img;
    const fileName = `${Date.now()}.jpeg`;
    const file = {
      uri: fileUri,
      name: fileName,
      type: "image/jpeg",
    };
    const formatData = new FormData();
    formatData.append("tag", "system");
    formatData.append("file", file as any);
    formatData.append("id", "1");

    try {
      const response: any = await axios.post("/medias", formatData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPhoto(response?.[0]);
    } catch (error) {}
  };

  const handleUpdateGroup = () => {
    setIsEdit(false);
    updateGroup(Number(roomId), {
      group_chat_name: groupChatName,
      group_chat_photo: photo,
    });
  };

  return (
    <View className="px-5">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t("group_settings"),
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable onPress={() => setIsEdit(true)}>
              <BaseIcon name="pencilAlt" />
            </Pressable>
          ),
        }}
      />

      <View className="bg-gray-100 dark:bg-slate-800 items-center justify-start flex-row p-4 rounded-md my-4">
        <Image
          className="w-12 h-12 rounded-full mr-2"
          source={{
            uri: photo,
          }}
        />

        <View className="items-start">
          <Text className="text-gray-900 dark:text-gray-50 font-semibold text-base">
            {name ?? t("no_group_name")}
          </Text>
          <Text className="text-gray-900 dark:text-gray-50 text-sm">
            {contact.members?.length} {t("members")}
          </Text>
        </View>
      </View>

      <FlatList
        data={contact.members}
        ListEmptyComponent={() => <Text>{t("no_user_found")}</Text>}
        ListHeaderComponent={() => (
          <View className="justify-between items-center flex-row">
            <Text className="text-gray-900 dark:text-gray-50 font-semibold mb-4 uppercase">
              {t("members")}
            </Text>
            <Pressable onPress={() => {}} className="flex-row items-center">
              <BaseIcon name="plus" width={18} height={18} cn="text-blue-500" />
              <Pressable onPress={() => setAddUserModal(true)}>
                <Text className="pl-1 text-blue-500  font-semibold">
                  {t("add_user")}
                </Text>
              </Pressable>
            </Pressable>
          </View>
        )}
        renderItem={({ item, index }) => (
          <ChatGroupUser
            isOwner={isOwner}
            item={item}
            index={index}
            groupId={roomId}
          />
        )}
        keyExtractor={(_item, index) => `message-${index}`}
      />
      <View>
        <BaseButton
          variant="link"
          error={true}
          onPress={() => setIsModalVisible(true)}
          title={t("delete_group")}
        />
        <BaseButton title={t("save_changes")} onPress={() => {}} />
      </View>
      <BottomModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <BaseText className="!text-red-500 mb-4">
          {t("delete_group_info")}?
        </BaseText>
        <BaseButton
          variant="secondary"
          onPress={() => setIsModalVisible(false)}
          title={t("cancel")}
        />
        <BaseButton
          variant="warning"
          error
          onPress={() =>
            deleteGroup(roomId).then(() => {
              setIsModalVisible(false);
              router.push("/(root)/(tabs)/(chat)");
            })
          }
          title={t("delete")}
        />
      </BottomModal>
      <BottomModal visible={isEdit} onClose={() => setIsEdit(false)}>
        <View className="flex-1 justify-between">
          <View className="items-center justify-center">
            <BaseAvatarUpload
              source={{ uri: photo }}
              onSetImageData={(item) => handleFileUpload(item)}
            />
            <View className="w-full mt-2 mb-10">
              <BaseInput
                label={t("group_name")}
                className="mb-6"
                value={groupChatName}
                onChangeText={(text) => {
                  setGroupChatName(text);
                }}
              />
            </View>

            <View className="w-full">
              <BaseButton
                title={t("update_group")}
                onPress={() => {
                  handleUpdateGroup();
                }}
              />
            </View>
          </View>
        </View>
      </BottomModal>
      <AddUser
        visible={addUserModal}
        onClose={() => setAddUserModal(false)}
        group_id={Number(roomId)}
      />
    </View>
  );
}

const Row = ({ item }: { item: ChatContactMember }) => (
  <RectButton>
    <View className="flex-row relative py-1">
      <Image
        className="w-12 h-12 rounded-full mr-2"
        source={{
          uri: item.photo,
        }}
      />

      <View>
        <Text className="text-gray-900 dark:text-gray-50 font-bold">
          {item.name}
        </Text>
        <Text className="text-gray-900 dark:text-gray-50 text-sm">
          {item.type}
        </Text>
      </View>
    </View>
  </RectButton>
);

function ChatGroupUser({ item, groupId, isOwner }: any) {
  const { getContact, removeGroupMember } = useChats();
  async function removeMember() {
    await removeGroupMember(Number(groupId), Number(item.id));
    await getContact(groupId);
  }
  return isOwner ? (
    <ChatSwipeableRow isOwner={isOwner} onSwipeDelete={removeMember}>
      <Row item={item} />
    </ChatSwipeableRow>
  ) : (
    <Row item={item} />
  );
}
