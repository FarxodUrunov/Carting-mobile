import { View, Text, Pressable, Image, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import BaseSwitch from "~/switch/BaseSwitch";
import { BaseText } from "~/text/BaseText";
import { FormatPhone } from "~/FormatPhone";
import { FormatTripType } from "~/Format";
import { FormatDate } from "~/FormatDate";
import SkeletonProfileDetail from "~/secondary/skeletons/SkeletonProfileDetail";
import { useProfile } from "-/profile.store";
import { useAuth } from "-/auth.store";
import { useTranslation } from "react-i18next";
import DeleteConfirmModal from "~/secondary/modals/DeleteConfirmModal";
import SafeAreaView from "~/safe-area/SafeAreaView";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

export default function ProfileVehiclesDetailScreen() {
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const { isLoad, vehicleDetail, setEditValues, updateVehicle, deleteVehicle } =
    useProfile();
  const [isVisible, setIsVisible] = useState(false);

  const { user } = useAuth();
  const [value, setValue] = useState<boolean>(false);
  useEffect(() => {
    if (vehicleDetail.status === "active") {
      setValue(true);
    } else {
      setValue(false);
    }
  }, []);

  const handleSwitch = (status: boolean) => {
    updateVehicle(vehicleDetail.id, { status: status ? "active" : "inactive" });
  };

  const handleEdit = (prop: string) => {
    setEditValues();

    router.push({
      pathname: prop === "basic" ? "/vehicles/add" : "/vehicles/add/additional",
      params: { edit: "edit" },
    });
  };
  const handleBackToVehicles = () => {
    // Need to fix
    if (params.edit === "edit") {
      router.push("/vehicles");
    } else {
      router.back();
    }
  };

  const handleDelete = async () => {
    const result = await deleteVehicle(vehicleDetail.id);
    if (result) {
      router.back();
    }
  };

  return (
    <CustomSafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft() {
            return (
              <Pressable
                onPress={handleBackToVehicles}
                className="flex-row items-center"
              >
                <BaseIcon name="chevronLeft" cn="text-lime-600" />
                <BaseText className="text-lg text-lime-600 font-semibold">
                  {t("my_vehicles")}
                </BaseText>
              </Pressable>
            );
          },
          headerRight: () => (
            <Pressable onPress={() => Alert.alert(t("link_copied"))}>
              <BaseIcon name="share" />
            </Pressable>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="px-5 py-4">
        {!isLoad.vehiclesDetail ? (
          <>
            <View className="border-b dark:border-gray-700 border-gray-200 pb-4">
              <View className="p-4 rounded-md flex-row mb-4 dark:bg-gray-800 bg-gray-100">
                {vehicleDetail.photos?.length > 0 && (
                  <Image
                    className="w-16 h-16 rounded "
                    source={{
                      uri: vehicleDetail.photos[0]?.url
                        ? vehicleDetail.photos[0]?.url
                        : vehicleDetail.photos[0],
                    }}
                  />
                )}

                <View className="px-4">
                  <BaseText className="text-lg font-semibold">
                    {vehicleDetail.model}
                  </BaseText>
                  <BaseText className="text-sm">
                    {vehicleDetail.auto_number}
                  </BaseText>
                </View>
              </View>
              <BaseText variant="tertiary" className="text-sm mb-4">
                {vehicleDetail.description}
              </BaseText>

              <View className="p-4 rounded-md flex-row justify-between items-center dark:bg-gray-800 bg-gray-100">
                <View className="w-64">
                  <BaseText className="text-base font-medium mb-2">
                    {t("truck_status")}
                  </BaseText>
                  <BaseText variant="tertiary" className="text-sm">
                    {t("truck_enable_description")}
                  </BaseText>
                </View>

                <BaseSwitch
                  value={value}
                  setValue={setValue}
                  onToggle={(e) => handleSwitch(e)}
                />
              </View>
            </View>

            <View className="border-b dark:border-gray-700 border-gray-200 mb-6">
              <View className="flex-row justify-between items-center my-4">
                <BaseText className="text-lg font-semibold">
                  {t("basic_info")}
                </BaseText>
                <Pressable onPress={() => handleEdit("basic")}>
                  <BaseIcon name="pencil" color="#4CA30D" />
                </Pressable>
              </View>

              <LabelDetail
                label={t("vehicle_number")}
                value={vehicleDetail.auto_number}
              />

              <LabelDetail
                label={t("testimonial_series")}
                value={vehicleDetail.certificate_code}
              />

              <LabelDetail
                label={t("testimonial_number")}
                value={vehicleDetail.certificate_number}
              />

              <LabelDetail
                label={t("trip_type")}
                value={t(vehicleDetail.trip_type)}
              />

              <LabelDetail
                label={t("phone_number")}
                value={FormatPhone(user.phone)}
              />

              <View className="mb-4">
                <BaseText
                  variant="tertiary"
                  className="text-sm font-medium mb-1.5 capitalize"
                >
                  {t("files")}
                </BaseText>
                {vehicleDetail.files_mobile?.map((item: any, i: number) => (
                  <View
                    key={`${item}-${i}`}
                    className="flex-row justify-between items-center p-1 rounded border dark:border-gray-700 border-gray-200"
                  >
                    <View className="flex-row items-center">
                      <Image
                        className="w-10 h-10 rounded-sm"
                        source={{
                          uri: item,
                        }}
                      />
                      <BaseText variant="secondary" className="mx-2">
                        {typeof item === "string"
                          ? item?.split("/")?.pop()
                          : `-`}
                      </BaseText>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View className="border-b dark:border-gray-700 border-gray-200">
              <View className="flex-row justify-between items-center mb-4">
                <BaseText className="text-lg font-semibold">
                  {t("additional_info")}
                </BaseText>
                <Pressable onPress={() => handleEdit("additional")}>
                  <BaseIcon name="pencil" color="#4CA30D" />
                </Pressable>
              </View>

              <LabelDetail
                label={t("transport_type")}
                value={t(vehicleDetail.vehicle_type)}
              />

              <LabelDetail label={t("model")} value={vehicleDetail.model} />

              <LabelDetail label={t("vin")} value={vehicleDetail.vin} />

              <LabelDetail
                label={t("size")}
                value={`${vehicleDetail.body_width}x${vehicleDetail.body_length}x${vehicleDetail.body_height}`}
              />

              <LabelDetail label={t("year")} value={vehicleDetail.made_year} />

              <LabelDetail
                label={t("capacity")}
                value={`${vehicleDetail.capacity} ${t("kg")}`}
              />

              <LabelDetail
                label={t("fuel")}
                value={t(vehicleDetail.fuel_type)}
              />

              <LabelDetail
                label={t("power")}
                value={`${vehicleDetail.power} ${t("hp")}`}
              />

              <LabelDetail
                label={t("transmission")}
                value={t(vehicleDetail.gearbox)}
              />

              <LabelDetail
                label={t("route")}
                value={`${vehicleDetail.from_region} - ${vehicleDetail.to_region}`}
              />

              <LabelDetail
                label={t("payment_method")}
                value={t(vehicleDetail.payment_methods?.join(", "))}
              />
            </View>
            <View className="pt-4">
              <Text className="dark:text-gray-700 text-gray-300 capitalize">
                {t("created")} {FormatDate(vehicleDetail.created_at)}
              </Text>
            </View>

            <View className="mb-12 pb-4 pt-6">
              <Pressable
                onPress={() => setIsVisible(true)}
                className="py-4 border border-red-500 rounded-md flex-row gap-2 justify-center items-center"
              >
                <BaseIcon name="trash" cn="dark:text-red-500 text-gray-900" />
                <Text className="dark:text-gray-50 text-gray-900 font-semibold">
                  {t("delete_vehicle")}
                </Text>
              </Pressable>
            </View>

            <DeleteConfirmModal
              isLoading={false}
              handleDelete={handleDelete}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              title={`${t("delete_vehicle")}`}
            />
          </>
        ) : (
          <SkeletonProfileDetail />
        )}
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const LabelDetail = ({ label, value }: { label: any; value: any }) => (
  <View className="mb-6">
    <BaseText variant="tertiary" className="text-xs font-medium uppercase">
      {label}
    </BaseText>
    <BaseText className="text-base font-medium uppercase">{value}</BaseText>
  </View>
);
