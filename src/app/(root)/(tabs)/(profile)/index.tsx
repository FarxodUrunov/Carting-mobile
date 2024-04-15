import { useAuth } from "-/auth.store";
import { useProfile } from "-/profile.store";
import { useSession } from "_hooks/session.hook";
import { Link, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Pressable,
  ScrollView,
  Image,
  Platform,
  Alert,
  RefreshControl,
} from "react-native";
import { FormatPhone } from "~/FormatPhone";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";
import BaseIcon from "~/icon/BaseIcon";
import SafeAreaView from "~/safe-area/SafeAreaView";
import Skeleton from "~/skeleton";
import BaseSwitch from "~/switch/BaseSwitch";
import { BaseText } from "~/text/BaseText";

export default function ProfileTabScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getProfile();
    setRefreshing(false);
  }, []);
  const { t } = useTranslation();
  const { logout, getProfile, user, isLoading, editStatus } = useAuth();
  const { getCountries, getRegions, countries, regions } = useProfile();
  const { signOut } = useSession();
  const [isEnabled, setEnabled] = useState(user?.search_work);

  useEffect(() => {
    if (!user) {
      getProfile();
    }
    if (countries.length === 0) {
      getCountries();
    }
    if (regions.length === 0) {
      getRegions(1);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setEnabled(user.search_work);
    }
  }, [user]);
  const toggleSwitch = (status: boolean) => {
    editStatus(status);
  };

  async function handleLogout() {
    await Promise.all([logout(), signOut()]);
    router.push("/login");
  }

  const LogOutAlert = () =>
    Alert.alert(t("exit"), t("exit_description"), [
      {
        text: t("no"),
        onPress: () => {},
        style: "cancel",
      },
      { text: t("yes"), onPress: () => handleLogout() },
    ]);
  return (
    <SafeAreaView
      className={`flex-1 h-screen ${Platform.OS === "android" ? "pt-7" : ""}`}
    >
      <ScrollView
        className="px-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!isLoading ? (
          <View className="flex-row items-center py-4">
            <View className="w-12 h-12 rounded-full items-center justify-center overflow-hidden">
              <Image
                source={
                  user?.photo
                    ? { uri: user.photo }
                    : require("@/images/avatar.png")
                }
                className={user?.photo ? "w-full h-full" : "w-[80%] h-[80%]"}
              />
            </View>
            <View className="flex-col flex-1 ml-2">
              <BaseText className="font-semibold dark:text-gray-50 text-gray-900">
                {user?.first_name} {user?.last_name}
              </BaseText>

              <BaseText
                className="text-sm dark:text-gray-300 text-gray-600"
                variant="secondary"
              >
                {FormatPhone(user?.phone)}
              </BaseText>
            </View>
            <Pressable onPress={() => router.push("/edit")}>
              <BaseIcon name="pencilAlt" />
            </Pressable>
          </View>
        ) : (
          <View className="py-4 flex-row">
            <Skeleton variant="circle" propClasses="w-10 h-10" />
            <View className="ml-2">
              <Skeleton variant="card" propClasses="w-40 h-6" />
              <Skeleton variant="card" propClasses="w-44 h-6 mt-1" />
            </View>
          </View>
        )}
        <View className="dark:bg-gray-800 bg-gray-100 rounded-md flex-row items-center mt-4 p-4 justify-between">
          <View className="w-5/6 gap-2">
            <BaseText className="font-medium dark:text-gray-50 text-gray-900">
              {t("looking_for_job")}
            </BaseText>
            <BaseText
              className="text-xs dark:text-gray-300 text-gray-600"
              variant="secondary"
            >
              {t("notify_employees")}
            </BaseText>
          </View>
          <View>
            <BaseSwitch
              value={isEnabled}
              setValue={setEnabled}
              onToggle={(e) => toggleSwitch(e)}
            />
          </View>
        </View>
        <View className="mt-4 mb-16">
          <Link
            className="py-7 font-semibold dark:text-gray-50 text-gray-900"
            href="/careers"
          >
            {t("my_career")}
          </Link>
          <Link
            className="py-7 font-semibold dark:text-gray-50 text-gray-900"
            href="/vehicles"
          >
            {t("my_vehicles")}
          </Link>
          <Link
            className="py-7 font-semibold dark:text-gray-50 text-gray-900"
            href="/companies"
          >
            {t("my_companies")}
          </Link>
          <Link
            className="py-7 font-semibold dark:text-gray-50 text-gray-900"
            href="/payments"
          >
            {t("my_payments")}
          </Link>
          <Link
            className="py-7 font-semibold dark:text-gray-50 text-gray-900"
            href="/settings"
          >
            {t("settings")}
          </Link>
        </View>

        <Pressable
          className="flex-row items-center justify-center gap-1"
          onPress={LogOutAlert}
        >
          <BaseIcon name="logOut" cn="dark:!text-red-400 !text-red-600" />
          <BaseText className="dark:text-red-400 text-red-600 text-sm font-semibold">
            {t("log_out")}
          </BaseText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
