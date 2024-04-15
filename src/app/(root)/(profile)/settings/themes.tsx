import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";
export default function ProfileSettingsThemesScreen() {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useColorScheme();
  type ThemeType = {
    id: "light" | "dark";
    label: string;
  };
  const themes: ThemeType[] = [
    {
      id: "light",
      label: t("light_mode"),
    },
    {
      id: "dark",
      label: t("dark_mode"),
    },
  ];

  function setTheme(theme: "light" | "dark") {
    setColorScheme(theme);
  }

  return (
    <View
      className="p-5 flex-1"
      style={{
        backgroundColor: colors[colorScheme].colors.background,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: t("themes"),
          headerTitleAlign: "center",
          headerBackTitle: t("settings"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
        }}
      />
      {themes.map((item) => (
        <Pressable
          onPress={() => setTheme(item.id)}
          key={item.id}
          className="py-3 border-b flex-row border-gray-200 dark:border-gray-800"
        >
          {colorScheme === item.id ? (
            <BaseIcon name="check" color="#4CA30D" />
          ) : null}

          <Text className="text-gray-900 dark:text-white text-base font-medium ml-2">
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
