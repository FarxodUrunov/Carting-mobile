import {
  Pressable,
  ScrollView,
  View,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import ProfileEmpty from "~/secondary/ProfileEmpty";
import BottomModal from "~/modals/BottomModal";
import { BaseText } from "~/text/BaseText";
import SkeletonProfileCareer from "~/secondary/skeletons/SkeletonProfileCareer";
import { useProfile } from "-/profile.store";
import CvCard from "~/secondary/CvCard";
import { useTranslation } from "react-i18next";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

function CareerList({ items, t }: any) {
  return items?.data?.map((item: any, i: number) => (
    <CvCard
      t={t}
      data={item}
      key={`${item.id}-${i}`}
      path={`/careers/${item.id}`}
    />
  ));
}
export default function ProfileCareersScreen() {
  const params = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getCareers();
    setRefreshing(false);
  }, []);
  const { t } = useTranslation();
  const [isVisible, setVisible] = useState(false);
  const { getCareers, careers, isLoad } = useProfile();
  useEffect(() => {
    getCareers();
  }, []);

  const hasAccount =
    careers?.data.filter(
      (el: any) => el.account !== null && typeof el.account !== "undefined"
    ).length !== 0;

  const handleCreateWithout = () => {
    if (hasAccount) {
      Alert.alert(t("unable_create_cv"));
    } else {
      router.push("/careers/add/without_truck");
      setVisible(false);
    }
  };
  const handleCreateWith = () => {
    router.push("/careers/add/with_truck");
    setVisible(false);
  };

  return (
    <CustomSafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          headerTitle: t("careers"),
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerBackTitle: t("profile"),
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
          headerRight() {
            return (
              <Pressable onPress={() => setVisible(true)}>
                <BaseText
                  variant="secondary"
                  className="text-lg font-medium capitalize"
                >
                  {t("create")}
                </BaseText>
              </Pressable>
            );
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-5 py-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!isLoad.careers ? (
          careers?.data?.length === 0 ? (
            <ProfileEmpty
              title={t("career_not_found")}
              subtitle={t("career_add_description")}
            />
          ) : (
            <View className="pb-16">
              <CareerList t={t} items={careers} />
            </View>
          )
        ) : (
          <SkeletonProfileCareer />
        )}
      </ScrollView>

      <BottomModal
        height={220}
        visible={isVisible}
        onClose={() => setVisible(false)}
      >
        <View className="flex-row justify-between items-center">
          <BaseText className="text-lg font-semibold">
            {t("select_cv_type")}
          </BaseText>
        </View>
        <View>
          <View className="mt-6" style={{ gap: 16 }}>
            <Pressable
              className="py-3.5 rounded-md dark:bg-gray-500 bg-gray-200"
              onPress={handleCreateWithout}
            >
              <BaseText className="text-sm font-semibold text-center">
                {t("cv_without_truck")}
              </BaseText>
            </Pressable>
            <Pressable
              className="py-3.5 rounded-md dark:bg-gray-500 bg-gray-200"
              onPress={handleCreateWith}
            >
              <BaseText className="text-sm font-semibold text-center">
                {t("cv_with_truck")}
              </BaseText>
            </Pressable>
          </View>
        </View>
      </BottomModal>
    </CustomSafeAreaView>
  );
}
