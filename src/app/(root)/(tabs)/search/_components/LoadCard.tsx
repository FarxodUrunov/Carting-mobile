import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { FormatDate } from "~/FormatDate";
import { useSearchStore } from "-/search.store";
import { useTranslation } from "react-i18next";

export default function LoadCard({ item, status }: any) {
  const { t } = useTranslation();
  const { getLoad } = useSearchStore();
  const handlePress = (orderId: number) => {
    getLoad(orderId);
    router.push(`/loads/${orderId}`);
  };
  return (
    <Pressable onPress={() => handlePress(item?.id)}>
      <View className="px-2 py-1 rounded flex-row justify-between items-center dark:bg-gray-600 bg-gray-200">
        <Text className="text-sm dark:text-gray-50 text-lime-600">
          {status}
        </Text>
        <Text className="text-sm dark:text-amber-400 text-amber-600">
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
        <View className="">
          <Text className="font-semibold dark:text-gray-50 text-gray-900">
            {item.title}
          </Text>
          <Text className="text-xl font-bold mt-2 dark:text-gray-50 text-gray-900">
            {item.price.toLocaleString()} {item.currency}
          </Text>
        </View>
      </View>
      <View className="relative">
        {/* <View className="w-10 h-[1px] bg-gray-300 rotate-90 absolute top-11 -left-2 -z-10" /> */}
        <View className="flex-row">
          <View className="w-6 h-6 border-[5px] rounded-full border-blue-500" />
          <View className="ml-2">
            <Text className="font-medium dark:text-gray-50 text-gray-900">
              {item.pickup_address}
            </Text>
            <Text className="text-sm dark:text-gray-400 text-gray-500">
              {FormatDate(item.pickup_time_from)}-{" "}
              {FormatDate(item.pickup_time_to)}
            </Text>
          </View>
        </View>
        <View className="flex-row mt-6">
          <View className="w-6 h-6 border-[5px] rounded-full border-lime-500" />
          <View className="ml-2">
            <Text className="font-medium dark:text-gray-50 text-gray-900">
              {item.delivery_address}
            </Text>
            <Text className="text-sm dark:text-gray-400 text-gray-500">
              {FormatDate(item.delivery_time)}
            </Text>
          </View>
        </View>
      </View>
      <View className="my-4 flex-row">
        {item.capacity && (
          <View className="py-1 rounded px-2 dark:bg-gray-600 bg-gray-200">
            <Text className="text-xs font-medium dark:text-gray-300 text-gray-700">
              {item.capacity} {t("kg")}
            </Text>
          </View>
        )}
        <View className="py-1 px-2 mx-2 rounded dark:bg-gray-600 bg-gray-200">
          <Text className="text-xs font-medium dark:text-gray-300 text-gray-700">
            {item.body_width}x{item.body_length}x{item.body_height}{" "}
            {t("load_volume_details")}{" "}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
