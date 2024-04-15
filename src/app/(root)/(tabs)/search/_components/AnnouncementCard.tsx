import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import BaseIcon from "~/icon/BaseIcon";

import { useAnnouncementStore } from "-/announcement.store";
import { useTranslation } from "react-i18next";

export default function AnnouncementCard({ item, status }: any) {
  const { getAnnouncement } = useAnnouncementStore();
  const { t } = useTranslation();
  const handlePress = (announcementId: number) => {
    getAnnouncement(announcementId);
    router.push(`/announcements/${announcementId}`);
  };
  return (
    <Pressable onPress={() => handlePress(item.id)}>
      <View className="px-2 py-1 rounded flex-row justify-between items-center dark:bg-gray-600 bg-gray-200">
        <Text className="text-sm dark:text-gray-50 text-lime-600">
          {status}
        </Text>
        <Text className="text-sm text-amber-600 dark:text-amber-400">
          № {item.id}
        </Text>
      </View>
      <View className="my-4 flex-row">
        {item.photo && (
          <Image
            className="w-w60 h-h60 rounded mr-3"
            source={{
              uri: item.photo,
            }}
          />
        )}
        <View className="w-10/12">
          <Text className="font-semibold dark:text-gray-50 text-gray-900">
            {item.name}
          </Text>
          <Text className="text-xl font-bold mt-2 dark:text-gray-50 text-gray-900">
            {item.title}
          </Text>
        </View>
      </View>

      <View className="flex-row">
        <BaseIcon name="currencyDollar" color="#12B76A" />
        <View className="ml-2">
          <Text className="text-sm dark:text-gray-400 text-gray-500">
            <Text>{t("monthly")} </Text>
            <Text className="font-semibold text-base dark:text-gray-50 text-gray-900">
              {item.salary}
            </Text>
            <Text> {item.currency}</Text>
          </Text>
        </View>
      </View>
      <View className="flex-row my-2 items-center">
        <BaseIcon name="checkCircle" color="#12B76A" />
        <View className="ml-2">
          <Text className="font-medium dark:text-gray-50 text-gray-900">
            {t("cash")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
