import { View, Image, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import BaseProgressbar from "~/base-progressbar/BaseProgressbar";
import BaseIcon from "~/icon/BaseIcon";
import { BaseButton } from "~/button/BaseButton";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { FormatPhone } from "~/FormatPhone";
import { FormatAge } from "~/Format";
import { BaseText } from "~/text/BaseText";
import { FormatExperience } from "~/FormatExperience";
import { useAuth } from "-/auth.store";
import { useProfile } from "-/profile.store";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

export default function ProfileCareersCreateConfirmScreen() {
  const { user } = useAuth();
  const [indicator, setIndicator] = useState(false);
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  const { confirmData, trucks, createWithTruck, clearValues, updateCv } =
    useProfile();
  const truckDetails = trucks?.find(
    (el: any) => el.id === confirmData.vehicle_id
  );

  const handleCreateUpdate = async () => {
    setIndicator(true);
    if (params && params.edit === "edit") {
      const result: any = await updateCv(
        "cv-truck",
        confirmData.id,
        confirmData
      );
      if (result) {
        router.push(`/careers/${result.id}`);
        clearValues();
      }
    } else {
      const result = await createWithTruck();
      if (result) {
        router.push({
          pathname: "/careers",
          params: { create: "create" },
        });
        clearValues();
      }
    }

    setIndicator(false);
  };

  const handleBackToAdditional = () => {
    if (params && params.edit === "edit") {
      router.push({
        pathname: "/careers/add/additional",
        params: { edit: "edit" },
      });
    } else {
      router.push("/careers/add/additional");
    }
  };
  return (
    <CustomSafeAreaView>
      <Stack.Screen
        options={{
          headerTitle:
            params.edit === "edit" ? t("edit_career") : t("add_new_career"),
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
      <ScrollView showsVerticalScrollIndicator={false} className=" px-5 py-4">
        <View className="justify-center items-center pt-2 pb-8 px-14">
          <BaseProgressbar progress={3} />
        </View>
        <View className="pb-6 gap-4">
          <View className="py-6 border-y dark:border-gray-700 border-gray-200">
            <View className="flex-row justify-between items-center">
              <BaseText className="text-lg font-semibold">
                {t("basic_info")}
              </BaseText>
            </View>
            <View className="mt-4 gap-6">
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium uppercase"
                >
                  {t("first_name")}
                </BaseText>
                <BaseText className="font-medium">{user.first_name}</BaseText>
              </View>
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium uppercase"
                >
                  {t("last_name")}
                </BaseText>
                <BaseText className="font-medium">{user.last_name}</BaseText>
              </View>
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium uppercase"
                >
                  {t("father_name")}
                </BaseText>
                <BaseText className="font-medium">{user.father_name}</BaseText>
              </View>
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium uppercase"
                >
                  {t("age")}
                </BaseText>
                <BaseText className="font-medium">
                  {FormatAge(user.birth_date)}
                </BaseText>
              </View>
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium uppercase"
                >
                  {t("phone_number")}
                </BaseText>
                <BaseText className="font-medium">
                  {FormatPhone(user.phone)}
                </BaseText>
              </View>
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium uppercase"
                >
                  {t("email")}
                </BaseText>
                <BaseText className="font-medium">{user.email}</BaseText>
              </View>
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium uppercase"
                >
                  {t("address")}
                </BaseText>
                <BaseText className="font-medium">{user.address}</BaseText>
              </View>
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium uppercase"
                >
                  {t("driver_licence_category")}
                </BaseText>
                <BaseText className="font-medium">
                  {user.driver_license_category?.join(", ")}
                </BaseText>
              </View>
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium uppercase"
                >
                  {t("experience")}
                </BaseText>
                <BaseText className="font-medium">
                  {FormatExperience(user.experience)}
                </BaseText>
              </View>
            </View>
          </View>
          <View className="mt-4 gap-6">
            <View className="flex-row justify-between items-center pt-2">
              <BaseText className="text-lg font-semibold">
                {t("additional_info")}
              </BaseText>
              <Pressable onPress={handleBackToAdditional}>
                <BaseIcon name="pencil" color="#4CA30D" />
              </Pressable>
            </View>

            <View>
              <BaseText variant="tertiary" className="text-xs font-medium">
                {t("title")}
              </BaseText>
              <BaseText className="font-medium">{confirmData.title}</BaseText>
            </View>

            {truckDetails && truckDetails?.photos.length > 0 && (
              <View>
                <BaseText
                  variant="tertiary"
                  className="text-xs font-medium capitalize"
                >
                  {t("vehicle")}
                </BaseText>
                <View className="mt-1.5 p-2 rounded border border-gray-300">
                  <View className="flex-row gap-4">
                    <Image
                      source={{ uri: truckDetails.photos[0] }}
                      className="w-16 h-16"
                    />
                    <View>
                      <BaseText className="text-lg font-semibold">
                        {truckDetails.model}
                      </BaseText>
                      <BaseText className="text-sm font-normal">
                        {truckDetails.auto_number}
                      </BaseText>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View>
              <BaseText
                variant="tertiary"
                className="text-xs font-medium capitalize"
              >
                {t("salary")}
              </BaseText>
              <BaseText className="font-medium">
                {confirmData.salary} {confirmData.currency}
              </BaseText>
            </View>
            <View>
              <BaseText variant="tertiary" className="text-xs font-medium">
                {t("payment_method")}
              </BaseText>
              <BaseText className="font-medium capitalize">
                {confirmData.payment_methods?.join(", ")}
              </BaseText>
            </View>
            <View>
              <BaseText
                variant="tertiary"
                className="text-xs font-medium uppercase"
              >
                {t("about_me")}
              </BaseText>
              <BaseText className="font-medium capitalize">
                {confirmData.description}
              </BaseText>
            </View>

            <View>
              <BaseText
                variant="tertiary"
                className="text-xs font-medium uppercase"
              >
                {t("documents")}
              </BaseText>
              {confirmData.files_mobile?.length > 0 &&
                confirmData.files_mobile.map((item: any, i: number) => (
                  <View
                    key={`${item}-${i}`}
                    className="p-1 rounded border flex-row justify-between items-center my-2 dark:border-gray-700 border-gray-200"
                  >
                    <View className="flex-row items-center gap-2">
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
                    {/* <BaseIcon name="trash" color="#F04438" /> */}
                  </View>
                ))}
            </View>
          </View>
          <View>
            <BaseButton
              hasLoader={true}
              isLoading={indicator}
              title={`${
                params.edit === "edit" ? t("edit_career") : t("create")
              }`}
              onPress={handleCreateUpdate}
            />
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
