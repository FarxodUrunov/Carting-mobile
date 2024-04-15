import "../../global.css";

import { Slot } from "expo-router";
import { SessionProvider } from "_contexts/session.context";
import { I18nextProvider } from "react-i18next";
import i18nNext from "_locales/i18n";
import { useStorageState } from "_hooks/storage.hook";
import { useEffect } from "react";
import { ThemeProvider } from "@react-navigation/native";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";

export default function Root() {
  const [[isLoadingLanguage, language]]: any = useStorageState("language");
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    if (!isLoadingLanguage && language) {
      i18nNext.changeLanguage(language);
    }
  }, [language, isLoadingLanguage]);

  return (
    <SessionProvider>
      <I18nextProvider i18n={i18nNext} defaultNS={"translation"}>
        <ThemeProvider
          value={{
            dark: colorScheme === "dark",
            colors: colors[colorScheme].colors,
          }}
        >
          <Slot />
        </ThemeProvider>
      </I18nextProvider>
    </SessionProvider>
  );
}
