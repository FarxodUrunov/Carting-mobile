import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import BaseIcon from "~/icon/BaseIcon";
import BaseProgressbar from "~/base-progressbar/BaseProgressbar";
import { BaseButton } from "~/button/BaseButton";
import { FormatLoadType } from "~/Format";
import { BaseText } from "~/text/BaseText";
import { useProfile } from "-/profile.store";
import { useTranslation } from "react-i18next";

export default function ProfileAddVehicleConfirmScreen() {
  const { t } = useTranslation();
  const {
    confirmData,
    createNewTruck,
    regions,
    models,
    clearValues,
    updateVehicle,
  } = useProfile();
  const [indicator, setIndicator] = useState(false);
  const params = useLocalSearchParams();

  const handleCreateUpdate = async () => {
    setIndicator(true);
    if (params && params.edit === "edit") {
      const result: any = await updateVehicle(confirmData.id, confirmData);
      if (result) {
        router.push({
          pathname: `/vehicles/${result.id}`,
          params: { edit: "edit" },
        });
        clearValues();
      }
    } else {
      const result = await createNewTruck();
      if (result) {
        // router.push({
        //   pathname: "/vehicles",
        //   params: { create: "create" },
        // });
        router.navigate("/vehicles");
        clearValues();
      }
    }
    setIndicator(false);
  };
  const handleBackToAdditional = () => {
    if (params && params.edit === "edit") {
      router.push({
        pathname: "/vehicles/add/additional",
        params: { edit: "edit" },
      });
    } else {
      router.push("/vehicles/add/additional");
    }
  };
  const handleBackToBasic = () => {
    if (params && params.edit === "edit") {
      router.push({
        pathname: "/vehicles/add",
        params: { edit: "edit" },
      });
    } else {
      router.push("/vehicles/add");
    }
  };

  return (
    <ScrollView
      className="px-5 y-4 flex-1"
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen
        options={{
          headerTitle: t("confirm"),
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft() {
            return (
              <Pressable
                onPress={handleBackToAdditional}
                className="flex-row items-center"
              >
                <BaseIcon name="chevronLeft" cn="text-lime-600" />
                <BaseText className="text-lg text-lime-600 font-semibold capitalize">
                  {t("additional")}
                </BaseText>
              </Pressable>
            );
          },
        }}
      />
      <View className="items-center mb-6 pb-6 border-b dark:border-gray-700 border-gray-200">
        <BaseProgressbar progress={3} />
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <BaseText className="text-lg font-semibold">{t("basic_info")}</BaseText>
        <Pressable onPress={handleBackToBasic}>
          <BaseIcon name="pencil" color="#4CA30D" />
        </Pressable>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("vehicle_number")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.auto_number}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("testimonial_series")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.certificate_code}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("testimonial_number")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.certificate_number}
        </BaseText>
      </View>

      <View className="flex-row pb-6 border-b mb-6 dark:border-gray-700 border-gray-200">
        {confirmData.photos?.length > 0 &&
          confirmData.photos?.map((item: any, i: number) => (
            <View key={`${item}-${i}`} className="w-1/4 p-1">
              <Image
                className="w-full h-[76px] rounded object-cover"
                source={{
                  uri: item.url ? item.url : item,
                }}
              />
            </View>
          ))}
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <BaseText className="text-lg font-semibold">
          {t("additional_info")}
        </BaseText>
        <Pressable onPress={handleBackToAdditional}>
          <BaseIcon name="pencil" color="#4CA30D" />
        </Pressable>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("transport_type")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {t(confirmData.vehicle_type)}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("model")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {models.find((el: any) => el.id == confirmData.model_id)?.value}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("vin")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.vin}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("size")}
        </BaseText>
        <View className="flex-row items-center">
          <BaseText className="font-medium uppercase">
            {confirmData.body_width}
          </BaseText>
          <BaseText className="text-xs">x</BaseText>
          <BaseText className="font-medium uppercase">
            {confirmData.body_length}
          </BaseText>
          <BaseText className="text-xs">x</BaseText>
          <BaseText className="font-medium uppercase">
            {confirmData.body_height}
          </BaseText>
        </View>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("year")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.made_year}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("capacity")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.capacity?.toLocaleString()} {t("kg")}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("extend_m3")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.volume?.toLocaleString()} {t("m_3")}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("transportation_type")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.load_type?.length > 0 &&
            confirmData.load_type?.map((type: string) => FormatLoadType(type))}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("fuel")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.fuel_type}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("power")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.power} {t("hp")}
        </BaseText>
      </View>
      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("transmission")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.gearbox}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("region")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {
            regions.find((el: any) => el.id === confirmData.from_region_id)
              ?.name
          }{" "}
          -{" "}
          {regions.find((el: any) => el.id === confirmData.to_region_id)?.name}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("supplementary")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.supplementary?.length > 0 &&
            confirmData.supplementary?.map((item: string) =>
              item === `tent_trailer` ? t("tent_trailer") : t("fridge")
            )}
        </BaseText>
      </View>

      <View className="mb-6">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("payment_method")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.payment_methods?.join(", ")}
        </BaseText>
      </View>

      <View className="pb-6 border-b mb-4 dark:border-gray-700 border-gray-200">
        <BaseText variant="tertiary" className="text-xs font-medium uppercase">
          {t("description")}
        </BaseText>
        <BaseText className="text-base font-medium uppercase">
          {confirmData.description}
        </BaseText>
      </View>

      <View className="mb-4">
        <BaseText variant="tertiary" className="text-sm font-medium mb-1.5">
          {t("files")}
        </BaseText>
        {confirmData.files_mobile &&
          confirmData.files_mobile?.length > 0 &&
          confirmData.files_mobile?.map((item: any, i: number) => (
            <View
              key={`${item}-${i}`}
              className="flex-row justify-between items-center p-1 rounded border my-1 dark:border-gray-700 border-gray-200"
            >
              <View className="flex-row items-center gap-2">
                <Image
                  className="w-10 h-10 rounded-sm"
                  source={{
                    uri: item,
                  }}
                />

                <BaseText variant="secondary">
                  {typeof item === "string" ? item?.split("/")?.pop() : `-`}
                </BaseText>
              </View>
              {/* <BaseIcon name="trash" cn="text-red-500 mr-2" /> */}
            </View>
          ))}
      </View>

      <View className="mb-6">
        <BaseButton
          hasLoader={true}
          isLoading={indicator}
          title={`${
            params.edit === "edit" ? t("edit_vehicle") : t("add_your_vehicle")
          }`}
          onPress={handleCreateUpdate}
        />
      </View>
    </ScrollView>
  );
}
