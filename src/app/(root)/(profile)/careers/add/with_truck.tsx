import { View, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import BaseProgressbar from "~/base-progressbar/BaseProgressbar";
import BaseInput from "~/input/BaseInput";
import { BaseButton } from "~/button/BaseButton";
import { FormatPhone } from "~/FormatPhone";
import { FormatAge } from "~/Format";
import { useAuth } from "-/auth.store";
import { useProfile } from "-/profile.store";
import { FormatExperience } from "~/FormatExperience";
import BaseIcon from "~/icon/BaseIcon";
import { BaseText } from "~/text/BaseText";
import SkeletonWithTruck from "~/secondary/skeletons/SkeletonWithTruck";
import { useTranslation } from "react-i18next";

const InvalidProfile = ({ t }: any) => (
  <View className="h-full justify-center items-center">
    <Link href="/edit" className="underline dark:text-gray-50 text-blue-500">
      {t("invalid_data")}
    </Link>
  </View>
);
const InvalidTrucks = ({ t }: any) => (
  <View className="h-full justify-center items-center">
    <Link
      href="/vehicles/add"
      className="underline dark:text-gray-50  text-blue-500"
    >
      {t("invalid_vehicles")}
    </Link>
  </View>
);

export default function ProfileCareersCreateWithTruckScreen() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { getUserTrucks, trucks, isLoad, clearValues } = useProfile();
  const params = useLocalSearchParams();
  useEffect(() => {
    getUserTrucks();
  }, []);

  const handleBackToMyCareers = () => {
    router.navigate("/(root)/(profile)/careers");
    clearValues();
  };
  const handleNext = () => {
    if (params && params.edit === "edit") {
      router.push({
        pathname: "/careers/add/additional",
        params: { edit: "edit" },
      });
    } else {
      router.push("/careers/add/additional");
    }
  };
  const StackScreenComponent = () => (
    <Stack.Screen
      options={{
        headerTitle:
          params.edit === "edit" ? t("edit_career") : t("add_new_career"),
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerLeft() {
          return (
            <Pressable
              onPress={handleBackToMyCareers}
              className="flex-row items-center"
            >
              <BaseIcon name="chevronLeft" cn="text-lime-600" />
              <BaseText className="text-lg text-lime-600 font-semibold capitalize">
                {t("careers")}
              </BaseText>
            </Pressable>
          );
        },
      }}
    />
  );
  if (trucks?.length === 0) {
    return (
      <View>
        <StackScreenComponent />
        <InvalidTrucks t={t} />
      </View>
    );
  }
  if (!user?.identify_number) {
    return (
      <View>
        <StackScreenComponent />
        <InvalidProfile t={t} />
      </View>
    );
  }

  return (
    <View className="px-5 py-4">
      <StackScreenComponent />
      {isLoad.getVehicles ? (
        <SkeletonWithTruck />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="justify-center items-center w-full py-8 px-0">
            <BaseProgressbar progress={1} />
          </View>
          <View className="py-2" style={{ gap: 16 }}>
            <View>
              <BaseInput
                label={t("first_name")}
                value={user.first_name}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("last_name")}
                value={user.last_name}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("father_name")}
                value={user.father_name}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("age")}
                value={FormatAge(user.birth_date)}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("phone_number")}
                value={FormatPhone(user.phone)}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("email")}
                value={user.email}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("country")}
                value="Country"
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("region")}
                value={user?.region?.name}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("home_address")}
                value={user.address}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("driver_licence_category")}
                value={user.driver_license_category.join(", ")}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseInput
                label={t("experience")}
                value={FormatExperience(user.experience)}
                readOnly
                disabled={true}
              />
            </View>
            <View>
              <BaseButton onPress={handleNext} title={t("continue")} />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
