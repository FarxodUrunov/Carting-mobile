import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
export default function ProfileSettingsLanguagesScreen() {
  const { colorScheme } = useColorScheme();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>("en");
  const [languages, setLanguages] = useState([
    {
      id: 1,
      code: "uz",
      name: "Uzbek",
      is_default: false,
    },
    {
      id: 2,
      code: "ru",
      name: "Russian",
      is_default: false,
    },
    {
      id: 3,
      code: "en",
      name: "English",
      is_default: true,
    },
  ]);

  useEffect(() => {
    SecureStore.getItemAsync("language").then((lang) => {
      if (lang) {
        const newLang = languages.map((item) => {
          if (item.code === lang) {
            return { ...item, is_default: true };
          }
          return { ...item, is_default: false };
        });
        setLanguages(newLang);
      }
    });
  }, [language]);
  async function setLang(code: string) {
    await SecureStore.setItemAsync("language", code);
    setLanguage(code);
    i18n.changeLanguage(code);
  }
  return (
    <View className="p-5 mb-0 flex-1 bg-white dark:bg-gray-900">
      <Stack.Screen
        options={{
          headerTitle: t("languages"),
          headerTitleAlign: "center",
          headerBackTitle: t("settings"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
        }}
      />
      {languages.map((item) => (
        <Pressable
          onPress={() => setLang(item.code)}
          key={item.id}
          className="py-3 border-b border-gray-200 dark:border-gray-800 flex-row"
        >
          {item.is_default ? <BaseIcon name="check" color="#4CA30D" /> : null}

          <Text className="text-gray-900 dark:text-white text-base font-medium capitalize ml-2">
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
