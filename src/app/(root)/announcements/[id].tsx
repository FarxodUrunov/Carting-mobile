import { useSetTitle } from "_hooks/useSetTitle";
import { Stack, router } from "expo-router";

import { Pressable, ScrollView, Text, View } from "react-native";
import BaseIcon from "~/icon/BaseIcon";
import { FormatDate } from "~/FormatDate";
import SkeletonannouncementDetail from "~/secondary/skeletons/SkeletonAnnouncementDetail";
import CancelModal from "~/secondary/modals/CancelModal";
import { useState } from "react";
import { useSearchStore } from "-/search.store";
import { onShare } from "_utils/share";
import { useAnnouncementStore } from "-/announcement.store";
import BottomModal from "~/modals/BottomModal";
import Skeleton from "~/skeleton";
import { BaseText } from "~/text/BaseText";
import { useTranslation } from "react-i18next";
import { FormatExperience } from "~/FormatExperience";
export default function AnnouncementDetailScreen() {
  const { t } = useTranslation();
  const { getMyTrucks } = useSearchStore();
  const { announcement, isLoad, resumes, isLoadCv, handleApplyVacancy } =
    useAnnouncementStore();
  useSetTitle("");
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [announcementId, setAnnouncementId] = useState<number>();
  const [respondModal, setRespondModal] = useState<boolean>(false);

  const cancelModalText = [
    t("salary_not_correct"),
    t("conditions_not_good"),
    t("another_company"),
  ];

  const handleRespond = (id: number) => {
    getMyTrucks();
    setAnnouncementId(id);
    setRespondModal(true);
  };

  const handlePress = async (vacancy_id: number | undefined, cv_id: number) => {
    if (!vacancy_id) return;
    await handleApplyVacancy({
      vacancy_id,
      cv_id,
    });
    setRespondModal(false);
  };

  return (
    <>
      {!isLoad ? (
        <View className="flex-1 items-center justify-center">
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerRight: () => (
                <View className="flex-row">
                  <Pressable
                    className="m2-3"
                    onPress={() =>
                      onShare(
                        `https://carting.anysoft.uz/vacancies/${announcement.id}`
                      )
                    }
                  >
                    <BaseIcon name="share" />
                  </Pressable>
                </View>
              ),
              headerBackButtonMenuEnabled: true,
              headerBackTitle: t("back"),
            }}
          />
          <View className="w-full flex-1 px-5 justify-between">
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              <View>
                <Text
                  className={`text-2xl font-bold my-3 dark:text-gray-50 text-gray-900`}
                >
                  {announcement.title}
                </Text>
                <Text
                  className={`text-xl font-semibold dark:text-gray-50 text-gray-900`}
                >
                  {announcement.company_name}
                </Text>
                <View
                  className={`flex flex-row rounded justify-between py-1 px-2 mt-4 bg-gray-100 dark:bg-gray-600`}
                >
                  <Text
                    className={`text-sm font-normal dark:text-gray-50 text-gray-900`}
                  >
                    {t("viewed_by", { number: announcement.total_views })}
                  </Text>
                  <Text className="text-sm font-normal dark:text-amber-400 text-amber-600 ">
                    №{announcement.id}
                  </Text>
                </View>

                <Text
                  className={`text-lg font-semibold my-4 dark:text-gray-50 text-gray-900`}
                >
                  {t("additional_info")}
                </Text>
                <View>
                  <Text
                    className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                  >
                    {t("monthly")}
                  </Text>
                  <Text
                    className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                  >
                    {announcement.salary} {announcement.currency}
                  </Text>
                </View>
                <View className="my-6">
                  <Text
                    className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                  >
                    {t("experience")}
                  </Text>
                  <Text
                    className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                  >
                    {FormatExperience(announcement.experience)}
                  </Text>
                </View>
                <View className="mb-6">
                  <Text
                    className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                  >
                    {t("category")}
                  </Text>
                  <Text
                    className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                  >
                    {announcement.driver_license_category}
                  </Text>
                </View>
                <View>
                  <Text
                    className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                  >
                    {t("description")}
                  </Text>
                  <Text
                    className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                  >
                    {announcement.description}
                  </Text>
                </View>
                <View className="my-6">
                  <Text
                    className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                  >
                    {t("responsibilities")}
                  </Text>
                  <Text
                    className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                  >
                    {announcement.responsibility}
                  </Text>
                </View>
                <View>
                  <Text
                    className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                  >
                    {t("terms_conditions")}
                  </Text>
                  <Text
                    className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                  >
                    {announcement.condition}
                  </Text>
                </View>
              </View>

              {announcement.vehicle ? (
                <View>
                  <Text
                    className={`text-lg font-semibold my-4 dark:text-gray-50 text-gray-900`}
                  >
                    {t("transport_info")}
                  </Text>
                  <View className="mb-6">
                    <Text
                      className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                    >
                      {t("trip_type")}
                    </Text>
                    <Text
                      className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                    >
                      {announcement.vehicle.trip_type}
                    </Text>
                  </View>
                  <View className="mb-6">
                    <Text
                      className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                    >
                      {t("year_of_manufacture")}
                    </Text>
                    <Text
                      className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                    >
                      {announcement.vehicle.made_year}
                    </Text>
                  </View>
                  <View className="mb-6">
                    <Text
                      className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                    >
                      {t("type")}
                    </Text>
                    <Text
                      className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                    >
                      {t(announcement.vehicle.vehicle_type)}
                    </Text>
                  </View>
                  <View className="mb-6">
                    <Text
                      className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                    >
                      {t("certificate_number")}
                    </Text>
                    <Text
                      className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                    >
                      {announcement.vehicle.certificate_number}
                    </Text>
                  </View>
                  <View className="mb-6">
                    <Text
                      className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                    >
                      {t("truck_status")}
                    </Text>
                    <Text
                      className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                    >
                      {announcement.vehicle.vehicle_condition}
                    </Text>
                  </View>
                  <View className="mb-6">
                    <Text
                      className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                    >
                      {t("transmission_box")}
                    </Text>
                    <Text
                      className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                    >
                      {announcement.vehicle.gearbox}
                    </Text>
                  </View>
                  <View className="mb-6">
                    <Text
                      className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                    >
                      {t("capacity")}
                    </Text>
                    <Text
                      className={`text-base font-medium dark:text-gray-50 text-gray-900`}
                    >
                      {announcement.vehicle.capacity} kg
                    </Text>
                  </View>
                  <View className="mb-6">
                    <Text
                      className={`text-xs font-medium uppercase text-gray-500 dark:text-gray-400`}
                    >
                      {t("fuel")}
                    </Text>
                    <Text className="text-base font-medium dark:text-gray-50 text-gray-900">
                      {announcement.vehicle.fuel_type}
                    </Text>
                  </View>
                  <View className="mb-6">
                    <Text className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      {t("power")}
                    </Text>
                    <Text className="text-base font-medium dark:text-gray-50 text-gray-900">
                      {announcement.vehicle.power} {t("hp")}
                    </Text>
                  </View>
                </View>
              ) : null}

              <Text className="text-sm font-normal my-4 text-gray-300 dark:text-gray-600 capitalize">
                {t("created")} {FormatDate(announcement.created_at, "primary")}{" "}
                {announcement.address}
              </Text>
            </ScrollView>
            <View style={{ gap: 16 }} className="flex flex-row py-3 mb-4">
              {announcement.is_applied ? (
                <Pressable
                  className={`flex-1 px-4 py-3 rounded-md border justify-center items-center dark:border-lime-500 border-lime-600`}
                  onPress={() =>
                    router.push({
                      pathname: "/(root)/chat/[id]",
                      params: {
                        id: announcement.chat_id,
                        proposal_vacancy_id: announcement.id,
                        item: JSON.stringify({
                          proposal_vacancy_id: announcement.id,
                          type: "load",
                          sender: {
                            name: announcement.owner.name,
                          },
                        }),
                      },
                    })
                  }
                >
                  <Text className="text-sm font-semibold dark:text-gray-50 text-gray-900 capitalize">
                    {t("message")}
                  </Text>
                </Pressable>
              ) : null}
              {!announcement.is_applied ? (
                <Pressable
                  onPress={() => handleRespond(announcement.id)}
                  className="flex-1 px-4 py-3 rounded-md justify-center items-center dark:bg-lime-500 bg-lime-600"
                >
                  <Text className="text-white text-sm font-semibold capitalize">
                    {t("apply")}
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => setCancelModal(true)}
                  className="flex-1 px-4 py-3 border rounded-md justify-center items-center dark:border-red-500 border-red-500"
                >
                  <Text className="text-sm font-semibold text-red-500 capitalize">
                    {t("cancel")}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
          <BottomModal
            height={180}
            visible={respondModal}
            onClose={() => setRespondModal(!respondModal)}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {!isLoadCv ? (
                resumes?.length === 0 && resumes ? (
                  <BaseText className="text-md font-bold text-center">
                    No resumes found
                  </BaseText>
                ) : (
                  resumes?.map((item: any, index: number) => (
                    <Pressable
                      key={item.id}
                      onPress={() => handlePress(announcementId, item.id)}
                      className={`w-full px-4 py-3 rounded-md items-center my-2 dark:bg-slate-700 bg-gray-200`}
                    >
                      <Text className="text-sm font-semibold dark:text-white text-gray-900">
                        {item.account?.name
                          ? item.account?.name
                          : `Resume ${index + 1}`}
                        {item.account?.phone ? " - " : ""} {item.account?.phone}
                      </Text>
                    </Pressable>
                  ))
                )
              ) : (
                <>
                  <Skeleton variant="card" propClasses="w-full h-11 my-2" />
                  <Skeleton variant="card" propClasses="w-full h-11 my-2" />
                </>
              )}
            </ScrollView>
          </BottomModal>
          <CancelModal
            cancelModal={cancelModal}
            setCancelModal={setCancelModal}
            cancelModalText={cancelModalText}
            loadId={announcementId}
            isVacancy
          />
        </View>
      ) : (
        <SkeletonannouncementDetail />
      )}
    </>
  );
}
