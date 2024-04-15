import { View, Text } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import ControllerInputMask from "~/controller-inputmask/ControllerInputMask";
import { ControlledInput } from "~/ControlledInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePayment } from "-/payment.store";
import { Stack, router } from "expo-router";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import { BaseButton } from "~/button/BaseButton";
import { useTranslation } from "react-i18next";

export default function ProfileAddNewCardScreens() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { createCard, isLoading, getPayments } = usePayment();
  const profileSchema = z.object({
    name: z.string().min(4, t("validate_card_name")),
    expire_date: z.string().min(5, t("validate_expire_date")),
    card_number: z.string().min(19, t("validate_card_number")),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      card_number: "",
      expire_date: "",
    },
  });
  const onSubmit = async (data: any) => {
    const trimmedData = {
      ...data,
      card_number: data.card_number.replace(/ /g, ""),
      expire_date: data.expire_date.replace(/ /g, ""),
    };

    const result = await createCard(trimmedData);
    if (result) {
      router.back();
      getPayments();
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Stack.Screen
        options={{
          headerTitle: t("add_new_card"),
          headerBackTitle: t("payments"),
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
        }}
      />
      <View className="p-5">
        <View
          className={`w-full px-6 mb-8 pt-8 pb-4 rounded-xl bg-gray-900 justify-between ${
            colorScheme === "dark" ? "border border-gray-700" : ""
          }`}
        >
          <View>
            <Text className="text-white text-sm font-medium">
              {t("card_number")}
            </Text>
            <ControllerInputMask
              control={control}
              mask="9999 9999 9999 9999"
              name="card_number"
              placeholder={t("card_number_placeholder")}
              keyboardType={"numeric"}
              errors={errors}
            />
          </View>
          <View className="flex-row mt-4">
            <View className="mr-2 flex-1">
              <Text className="text-white text-sm font-medium">
                {t("month")}/{t("year")}
              </Text>
              <ControllerInputMask
                mask="99/99"
                control={control}
                name={"expire_date"}
                placeholder={`${t("month")}/${t("year")}`}
                keyboardType={"numeric"}
                errors={errors}
              />
            </View>
            <View className="ml-2 flex-1">
              <ControlledInput
                control={control}
                name="name"
                errors={errors}
                label={t("card_name")}
                placeholder={t("card_name")}
                style={{
                  color: "white",
                }}
              />
            </View>
          </View>
        </View>
        <BaseButton
          onPress={handleSubmit(onSubmit)}
          title={t("add_card")}
          isLoading={isLoading}
          hasLoader
        />
      </View>
    </View>
  );
}
