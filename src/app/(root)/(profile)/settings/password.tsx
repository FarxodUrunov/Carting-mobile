import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ControlledInput } from "~/ControlledInput";
import { BaseButton } from "~/button/BaseButton";
import { useSettings } from "-/settings.store";
import { useColorScheme } from "nativewind";
import colors from "_constants/colors";
import { useTranslation } from "react-i18next";

export default function ProfileSettingsPasswordScreen() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { isLoading, changePassword } = useSettings();

  const schema = z
    .object({
      current_password: z.string().min(6),
      new_password: z.string().min(6),
      confirm_password: z.string().min(6),
    })
    .refine((obj) => obj.new_password === obj.confirm_password, {
      message: t("passwords_not_match"),
      path: ["confirm_password"],
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSave = (val: any) => {
    changePassword(val);
  };

  return (
    <KeyboardAvoidingView
      className="p-5 flex-1 justify-between bg-white dark:bg-gray-900"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <Stack.Screen
        options={{
          headerTitle: t("change_password"),
          headerTitleAlign: "center",
          headerBackTitle: t("settings"),
          headerShadowVisible: false,
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View className="justify-around">
            <View className="py-2">
              <ControlledInput
                control={control}
                name="current_password"
                label={t("current_password")}
                placeholder={t("current_password")}
                secureTextEntry
                errors={errors}
              />
            </View>
            <View className="py-2">
              <ControlledInput
                control={control}
                name="new_password"
                label={t("new_password")}
                placeholder={t("new_password")}
                secureTextEntry
                errors={errors}
              />
            </View>
            <View className="py-2">
              <ControlledInput
                control={control}
                name="confirm_password"
                label={t("auth_confirm_password")}
                placeholder={t("auth_confirm_password")}
                secureTextEntry
                errors={errors}
              />
            </View>
          </View>
          <BaseButton
            title={t("save")}
            isLoading={isLoading}
            onPress={handleSubmit(handleSave)}
            hasLoader
          />
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
