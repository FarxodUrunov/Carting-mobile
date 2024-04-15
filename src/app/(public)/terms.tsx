import { Stack, router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import BaseCheckbox from "~/base-checkbox/BaseCheckbox";
import BaseIcon from "~/icon/BaseIcon";
import { BaseText } from "~/text/BaseText";

const TermsAndConditionsScreen = () => {
  const { t, i18n } = useTranslation();
  return (
    <View className="dark:bg-gray-900 flex-1 justify-center items-center">
      <Stack.Screen
        options={{
          headerTitle: t("terms_conditions"),
          headerShown: true,
          headerBackTitle: t("register"),
          headerBackVisible: true,
        }}
      />
      <View className="p-5">
        <BaseText
          className="text-justify text-base font-normal leading-normal"
          variant="tertiary"
        >
          {t("terms_description")}
        </BaseText>
        <View className="flex flex-row items-center  my-2">
          <BaseCheckbox isChecked={true} />
          {i18n.language === "uz" ? (
            <BaseText variant="tertiary" className="text-base font-normal ml-2">
              {t("auth_agree_offer_public")}
              &nbsp;{t("auth_agree_offer")}
            </BaseText>
          ) : (
            <BaseText variant="tertiary" className="text-base font-normal ml-2">
              {t("auth_agree_offer")}
              &nbsp;{t("auth_agree_offer_public")}
            </BaseText>
          )}
        </View>
        <Pressable
          className="my-4 flex-row gap-2 items-center"
          onPress={() => router.back()}
        >
          <BaseIcon name="chevronLeft" cn="text-blue-500" />
          <BaseText className="text-lg !text-blue-500 underline">
            {t("back")}
          </BaseText>
        </Pressable>
      </View>
    </View>
  );
};

export default TermsAndConditionsScreen;
