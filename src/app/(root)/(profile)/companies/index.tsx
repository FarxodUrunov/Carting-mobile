import {
  View,
  Pressable,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import MapView, { Marker } from "react-native-maps";
import EmptyScreen from "~/secondary/EmptyScreen";
import { BaseText } from "~/text/BaseText";
import { useCompanies } from "-/companies.settings";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";

export default function ProfileCompaniesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getDriverCompanies();
    setRefreshing(false);
  }, []);
  const { t } = useTranslation();
  const { getDriverCompanies, driverCompanies, isLoading } = useCompanies();
  useEffect(() => {
    getDriverCompanies();
  }, []);
  const [showCompanyDetail, setShowCompanyDetail] = useState<number>(0);
  const { colorScheme } = useColorScheme();

  return isLoading ? (
    <>{/* Skeleton */}</>
  ) : (
    <ScrollView
      className="flex-1 px-4 py-3 bg-white dark:bg-gray-900"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Stack.Screen
        options={{
          headerTitle: t("my_companies"),
          headerBackTitle: t("profile"),
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
        }}
      />
      {driverCompanies.length === 0 ? (
        <EmptyScreen title={"companies_not_found"} />
      ) : (
        driverCompanies.map((company) => (
          <View
            key={company.company_id}
            className="flex flex-col px-3 py-4 rounded-md mt-4 bg-slate-100 dark:bg-slate-800"
          >
            <View style={{ gap: 16 }} className="flex flex-row items-center">
              <Image
                source={{ uri: company.photo }}
                style={{ width: 64, height: 64 }}
                className="rounded"
              />
              <View className="flex-1">
                <BaseText className="text-lg font-semibold ">
                  {company.name}
                </BaseText>
                <BaseText className="text-sm font-normal ">
                  {company.address}
                </BaseText>
              </View>
              <Pressable
                onPress={() =>
                  company.company_id !== showCompanyDetail
                    ? setShowCompanyDetail(company.company_id)
                    : setShowCompanyDetail(0)
                }
                className="w-max"
              >
                <BaseIcon
                  name={
                    showCompanyDetail === company.company_id
                      ? "chevronDown"
                      : "chevronUp"
                  }
                />
              </Pressable>
            </View>
            {showCompanyDetail === company.company_id && (
              <View className="w-full p-2 rounded-md mt-4 bg-slate-100 dark:bg-slate-800">
                <View style={{ height: 200 }} className="w-full">
                  <MapView
                    style={{
                      borderRadius: 5,
                      borderWidth: 0,
                      height: 200,
                    }}
                    className="flex-1"
                    initialRegion={{
                      latitude: company.latitude,
                      longitude: company.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: company.latitude,
                        longitude: company.longitude,
                      }}
                      title={t("test")}
                      description={t("test")}
                    />
                  </MapView>
                </View>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
