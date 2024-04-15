import { ScrollView, Pressable, View, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import VehicleCard from "~/secondary/VehicleCard";
import ProfileEmpty from "~/secondary/ProfileEmpty";
import SkeletonMyVehicles from "~/secondary/skeletons/SkeletonMyVehicles";
import { BaseText } from "~/text/BaseText";
import { useProfile } from "-/profile.store";
import { BaseButton } from "~/button/BaseButton";
import { useTranslation } from "react-i18next";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import { CustomSafeAreaView } from "~/custom-safe-area-view/CustomSafeAreaView";

function VehicleList({ items }: any) {
  return items?.data?.map((item: any, i: number) => (
    <VehicleCard
      data={item}
      key={`${item.id}-${i}`}
      path={`/vehicles/${item.id}`}
    />
  ));
}
export default function ProfileCarsScreen() {
  const params = useLocalSearchParams();

  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getBrands();
    await getMyVehicles();
    setRefreshing(false);
  }, []);

  const { t } = useTranslation();
  const { getMyVehicles, myVehicles, isLoad, getBrands } = useProfile();

  useEffect(() => {
    getMyVehicles();
    getBrands();
  }, []);
  const handleNext = () => {
    getMyVehicles({
      take: myVehicles.pageInfo.endCursor,
    });
  };

  return (
    <CustomSafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          headerTitle: t("vehicles"),
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerBackTitle: t("profile"),
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
          headerRight() {
            return (
              <Pressable onPress={() => router.push("/vehicles/add")}>
                <BaseText variant="secondary" className="text-lg font-medium">
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
        {!isLoad.vehicles ? (
          myVehicles?.data?.length === 0 ? (
            <ProfileEmpty
              title={t("no_vehicles")}
              subtitle={t("prompt_add_car")}
            />
          ) : (
            <>
              <VehicleList items={myVehicles} />
              {myVehicles?.pageInfo?.hasNextPage && (
                <View className="pb-10">
                  <BaseButton onPress={handleNext} title={t("load_more")} />
                </View>
              )}
            </>
          )
        ) : (
          <SkeletonMyVehicles />
        )}
      </ScrollView>
    </CustomSafeAreaView>
  );
}
