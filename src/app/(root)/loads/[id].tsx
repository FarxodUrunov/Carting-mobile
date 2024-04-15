import { useSetTitle } from "_hooks/useSetTitle";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import BaseIcon from "~/icon/BaseIcon";
import MapView, { Marker } from "react-native-maps";
import ActivityBar from "~/secondary/ActivityBar";
import { FormatDate } from "~/FormatDate";
import { FormatPhone } from "~/FormatPhone";
import SkeletonOrderDetail from "~/secondary/skeletons/SkeletonOrderDetail";
import CancelModal from "~/secondary/modals/CancelModal";
import { useEffect, useState } from "react";
import { FormatLoadType } from "~/Format";
import BaseAvatar from "~/base-avatar/BaseAvatar";
import RespondModal from "~/secondary/modals/RespondModal";
import { useSearchStore } from "-/search.store";
import { onShare } from "_utils/share";
import { useTranslation } from "react-i18next";

export default function OrderDetailScreen() {
  const { t } = useTranslation();
  const { isLoad, orderDetail, getOrderDetails, getMyTrucks } =
    useSearchStore();
  const isLoadingDetail = isLoad?.detail;
  useSetTitle("");
  const params = useLocalSearchParams();
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [respondModal, setRespondModal] = useState<boolean>(false);
  const [loadId, setLoadId] = useState<any>();

  const orderDetails = [
    { name: t("order_number"), value: orderDetail.id },
    { name: t("name_surname"), value: orderDetail.owner?.name },
    {
      name: t("order_price"),
      value: `${orderDetail.price?.toLocaleString()} ${orderDetail.currency}`,
    },
    {
      name: t("type_of_transport"),
      value: orderDetail.load_type
        ?.map((type: string) => FormatLoadType(type))
        .join(", "),
    },
    {
      name: t("payment_method"),
      value: orderDetail.payment_methods?.join(", "),
    },
    {
      name: t("phone_number"),
      value: `${FormatPhone(orderDetail.owner?.phone)}`,
    },
    { name: t("email_address"), value: orderDetail.owner?.email },
  ];

  const cancelModalText = [
    t("price_not_correct"),
    t("delivery_address_not_correct"),
    t("transport_not_correct"),
  ];
  useEffect(() => {
    getOrderDetails(+params.id);
  }, []);

  const handleRespond = (id: number) => {
    getMyTrucks();
    setLoadId(id);
    setRespondModal(true);
  };

  return !isLoadingDetail ? (
    <View className="flex-1 items-center justify-center">
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerShadowVisible: false,

          headerRight: () => (
            <Pressable
              className="m2-3"
              onPress={() =>
                onShare(
                  `https://carting.anysoft.uz/vacancies/${orderDetail.id}`
                )
              }
            >
              <BaseIcon name="share" />
            </Pressable>
          ),
          headerBackButtonMenuEnabled: true,
          headerBackTitle: t("back"),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full px-5 flex-1 dark:bg-gray-900 bg-gray-50"
      >
        <Text className="text-2xl font-bold my-3 dark:text-gray-50 text-gray-900">
          {orderDetail.title}
        </Text>
        <Text className="text-xl font-semibold dark:text-gray-50 text-gray-900">
          {orderDetail.price} {orderDetail.currency}
        </Text>
        <View className="flex flex-row rounded justify-between py-1 px-2 mt-4 dark:bg-gray-600 bg-gray-100">
          <Text className="text-sm font-normal dark:text-gray-50 text-gray-900">
            {t("starts_in")}{" "}
            {new Date(orderDetail.pickup_time_from).getUTCDate() -
              new Date().getUTCDate()}{" "}
            {t("days")}
          </Text>
          <Text className="text-sm font-normal dark:text-amber-400 text-amber-600">
            № {orderDetail.id}
          </Text>
        </View>
        <View className="w-full mt-4">
          <ActivityBar current={0} total={10} title={t("delivery_process")} />
        </View>
        <View style={{ width: "100%", height: 140 }}>
          <MapView
            style={{
              borderRadius: 5,
              borderWidth: 0,
              height: 144,
            }}
            className="flex-1"
            initialRegion={{
              latitude: orderDetail.pickup_latitude,
              longitude: orderDetail.pickup_longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: orderDetail.pickup_latitude,
                longitude: orderDetail.pickup_longitude,
              }}
              title={orderDetail.pickup_address}
            />
          </MapView>
        </View>
        <View className="relative mt-6 pr-4">
          {/* <View className="w-10 h-[1px] rotate-90 absolute top-11 -left-2 -z-10 dark:bg-gray-500 bg-gray-300" /> */}
          <View className="flex-row">
            <View className="w-6 h-6 border-[5px] rounded-full border-blue-500" />
            <View className="ml-2">
              <Text className="font-medium dark:text-gray-50 text-gray-900">
                {orderDetail.pickup_address}
              </Text>
              <Text className="text-sm dark:text-gray-400 text-gray-500">
                {FormatDate(orderDetail.pickup_time_from)}-{" "}
                {FormatDate(orderDetail.pickup_time_to)};
              </Text>
            </View>
          </View>
          <View className="flex-row mt-6">
            <View className="w-6 h-6 border-[5px] rounded-full border-lime-500" />
            <View className="ml-2">
              <Text className="font-medium dark:text-gray-50 text-gray-900">
                {orderDetail.delivery_address}
              </Text>
              <Text className="text-sm dark:text-gray-400 text-gray-500">
                {FormatDate(orderDetail.delivery_time)}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row gap-2 mt-4">
          <View className="px-2 py-1 rounded dark:bg-gray-600 bg-gray-100">
            <Text className="text-xs font-medium dark:text-gray-50 text-gray-900">
              {orderDetail.capacity} {t("kg")}
            </Text>
          </View>
          <View className="px-2 py-1 rounded dark:bg-gray-600 bg-gray-100">
            <Text className="text-xs font-medium dark:text-gray-50 text-gray-900">
              {orderDetail.body_width}x{orderDetail.body_length}x
              {orderDetail.body_height} {t("load_volume_details")}
            </Text>
          </View>
        </View>
        {orderDetail.description && (
          <Text className="text-sm font-normal mt-4 dark:text-gray-400 text-gray-50">
            {orderDetail.description}
          </Text>
        )}
        <Text className="text-lg font-semibold my-4 dark:text-gray-50 text-gray-900">
          {t("additional_info")}
        </Text>
        {orderDetails.map((item, i) => (
          <View className="gap-1 mb-6" key={`${item.value}-${i}`}>
            <Text className="text-xs font-medium uppercase dark:text-gray-50 text-gray-400">
              {item.name}
            </Text>
            <Text className="text-base font-medium dark:text-gray-50 text-gray-900">
              {item.value}
            </Text>
          </View>
        ))}
        {orderDetail.photos?.length > 0 && (
          <View className="">
            <Text
              className="text-xs font-medium uppercase mb-0.5
  dark:text-gray-400 text-gray-500"
            >
              {t("files")}
            </Text>
            <View>
              {orderDetail.photos.map((item, i) => (
                <View
                  key={`${item}-${i}`}
                  className="p-1 my-0.5 rounded border dark:border-gray-700 border-gray-200"
                >
                  <BaseAvatar source={{ uri: item }} variant="square">
                    <Text className="dark:text-gray-50 text-gray-900">
                      {item?.slice(0, 30)} ...
                    </Text>
                  </BaseAvatar>
                </View>
              ))}
            </View>
          </View>
        )}
        <Text className="text-sm font-normal my-3 dark:text-gray-600 text-gray-300 capitalize">
          {FormatDate(orderDetail.created_at)} in {orderDetail.pickup_address}
        </Text>
        <View className="flex flex-row mb-4 gap-4 flex-1">
          {orderDetail.is_assign && (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(root)/chat/[id]",
                  params: {
                    id: orderDetail?.chat_id,
                    proposal_vacancy_id: orderDetail.id,
                    item: JSON.stringify({
                      proposal_vacancy_id: orderDetail.id,
                      type: "load",
                      sender: {
                        name: orderDetail.owner?.name,
                      },
                    }),
                  },
                })
              }
              className="flex-1 px-4 py-3 rounded-md border justify-center items-center dark:bg-gray-900 bg-gray-50  dark:border-lime-500 border-lime-600"
            >
              <Text className="text-sm font-semibold dark:text-gray-50 text-gray-900 capitalize">
                {t("message")}
              </Text>
            </Pressable>
          )}
          {!orderDetail.is_assign ? (
            <Pressable
              onPress={() => handleRespond(orderDetail.id)}
              className="flex-1 px-4 py-3 rounded-md justify-center items-center dark:bg-lime-500 bg-lime-600"
            >
              <Text className="text-white text-sm font-semibold">
                {t("respond")}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setCancelModal(true)}
              className="flex-1 px-4 py-3 border rounded-md justify-center items-center dark:border-red-500 border-red-500"
            >
              <Text className="text-sm font-semibold text-red-500 capitalize">
                {t("cancel")}
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
      <CancelModal
        loadId={orderDetail.id}
        cancelModal={cancelModal}
        setCancelModal={setCancelModal}
        cancelModalText={cancelModalText}
      />
      <RespondModal
        respondModal={respondModal}
        setRespondModal={setRespondModal}
        loadId={loadId}
        setLoadId={setLoadId}
      />
    </View>
  ) : (
    <SkeletonOrderDetail />
  );
}
