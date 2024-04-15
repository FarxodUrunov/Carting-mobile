import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import BaseInput from "~/input/BaseInput";

import { useSearchStore } from "-/search.store";
import { useLoadStore } from "-/load.store";
import { useAnnouncementStore } from "-/announcement.store";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";
import SafeAreaView from "~/safe-area/SafeAreaView";

export default function MainHeader() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [timeoutToClear, setTimeoutToClear] = useState<any>();

  const {
    handleSearch,
    tabValue,
    searchValue,
    filterLoadValue,
    filterAnnouncementValue,
  } = useSearchStore();
  const { getLoads } = useLoadStore();
  const { getAnnouncements } = useAnnouncementStore();

  useEffect(() => {
    if (tabValue === t("loads")) {
      getLoads({
        filter: {
          loads: filterLoadValue,
        },
      });
    }

    if (tabValue === t("announcements")) {
      getAnnouncements({
        filter: {
          vacancies: filterAnnouncementValue,
        },
      });
    }
    handleSearch("");
    setSearch("");
  }, [tabValue]);

  useEffect(() => {
    if (tabValue === t("loads")) {
      getLoads({
        filter: {
          loads: filterLoadValue,
          search: { value: searchValue },
        },
      });
    }

    if (tabValue === t("announcements")) {
      getAnnouncements({
        filter: {
          vacancies: filterAnnouncementValue,
          search: { value: searchValue },
        },
      });
    }
  }, [searchValue]);

  const fakeDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    return () => {
      clearTimeout(timeoutToClear);
    };
  }, []);

  const debounce = (callback: Function, alwaysCall: Function, ms: number) => {
    return (...args: any) => {
      alwaysCall(...args);
      clearTimeout(timeoutToClear);
      setTimeoutToClear(
        setTimeout(() => {
          callback(...args);
        }, ms)
      );
    };
  };

  const setSearchTextAlways = (text: string) => {
    setSearch(text);
  };

  const searchFruits = async (text: string) => {
    setSearch(text);
    await fakeDelay(100);
    handleSearch(text);
  };

  const debouncedSearchFruits = debounce(
    searchFruits,
    setSearchTextAlways,
    300
  );

  return (
    <SafeAreaView>
      <View className="w-full flex-row px-5 my-2">
        <Pressable className="flex-1 mr-2">
          <BaseInput
            icon={{ left: "search" }}
            keyboardType="web-search"
            placeholder={t("search")}
            value={search}
            onChangeText={debouncedSearchFruits}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push("/filter")}
          className="border rounded-md items-center p-2 border-gray-300 dark:border-slate-700"
        >
          <BaseIcon
            name="adjustments"
            cn="text-slate-700 dark:text-slate-300"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
