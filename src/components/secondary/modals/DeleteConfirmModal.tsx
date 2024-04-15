import { View, Modal, Pressable } from "react-native";
import React from "react";
import BaseIcon from "~/icon/BaseIcon";
import { BaseText } from "~/text/BaseText";
import { useTranslation } from "react-i18next";
import { BaseButton } from "~/button/BaseButton";

export default function DeleteConfirmModal({
  title,
  isVisible,
  setIsVisible,
  handleDelete,
  isLoading,
}: {
  title: string;
  isVisible: boolean;
  isLoading: boolean;
  setIsVisible: any;
  handleDelete: any;
}) {
  const { t } = useTranslation();
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View
        className="w-full items-center justify-center  flex-1 px-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="relative w-full items-center justify-center rounded-lg p-6 dark:bg-gray-900 bg-white">
          <Pressable
            className="absolute right-6 top-6"
            onPress={() => setIsVisible(false)}
          >
            <BaseIcon name="close" />
          </Pressable>
          <View className="rounded-full bg-gray-200  dark:bg-gray-600 p-4">
            <BaseIcon
              name="exclamationCircle"
              cn="dark:text-gray-300 text-gray-700"
            />
          </View>
          <View className="mt-5 items-center w-full">
            <BaseText className="font-semibold">{t(title)}</BaseText>
            <BaseText variant="secondary">{t("delete_description")}</BaseText>
          </View>
          <View className="w-full mt-8 gap-4">
            <BaseButton
              title={t("delete")}
              variant="delete"
              onPress={handleDelete}
              colored={true}
              hasLoader
              isLoading={isLoading}
            />
            <BaseButton
              title={t("cancel")}
              variant="secondary"
              onPress={() => setIsVisible(false)}
              colored={true}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
