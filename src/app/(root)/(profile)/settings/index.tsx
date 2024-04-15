import { View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import icons from "~/icon/icons";
import BaseIcon from "~/icon/BaseIcon";
import { useColorScheme } from "nativewind";
import colors from "_constants/colors";
import { useTranslation } from "react-i18next";

export default function ProfileSettingsScreen() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  type pageType = {
    icon: keyof typeof icons;
    label: string;
    path: any;
  };
  const pages: pageType[] = [
    {
      icon: "lockClosed",
      label: t("change_password"),
      path: "settings/password",
    },
    {
      icon: "globe",
      label: t("language"),
      path: "settings/languages",
    },
    {
      icon: "moon",
      label: t("themes"),
      path: "settings/themes",
    },
    {
      icon: "deviceSession",
      label: t("devices"),
      path: "settings/devices",
    },
  ];

  return (
    <View className="px-5 flex-1 bg-white dark:bg-gray-900 py-6">
      <Stack.Screen
        options={{
          headerTitle: t("settings"),
          headerTitleAlign: "center",
          headerBackTitle: t("profile"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
        }}
      />
      {pages.map((item) => (
        <View
          key={item.icon}
          className="flex-row items-center py-4 border-b border-transparent dark:border-slate-700"
        >
          <BaseIcon
            name={item.icon}
            cn={"w-6 h-6 text-gray-900 dark:text-gray-50"}
          />
          <Link
            href={item.path}
            className="font-medium py-4 ml-2 w-full border-slate-700 dark:border-gray-50 text-gray-900 dark:text-gray-50"
          >
            {item.label}
          </Link>
        </View>
      ))}
    </View>
  );
}
