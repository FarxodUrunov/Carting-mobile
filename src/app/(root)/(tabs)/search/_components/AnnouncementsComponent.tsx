import React, { Fragment, useCallback, useEffect, useState } from "react";
import { View, Pressable, FlatList, ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { useNavigationState } from "@react-navigation/native";

import SkeletonSearch from "~/secondary/skeletons/SkeletonSearch";
import CancelModal from "~/secondary/modals/CancelModal";
import ConnectionModal from "~/secondary/modals/ConnectionModal";
import ActivityBar from "~/secondary/ActivityBar";
import EmptyScreen from "~/secondary/EmptyScreen";
import AnnouncementItem from "./AnnouncementItem";

import { useSearchStore } from "-/search.store";
import { useAnnouncementStore } from "-/announcement.store";
import BottomModal from "~/modals/BottomModal";
import { BaseText } from "~/text/BaseText";
import Skeleton from "~/skeleton";
import { useTranslation } from "react-i18next";
import { ActivitiesStore } from "-/activities.store";
import { useColorScheme } from "nativewind";

export default function AnnouncementsComponent() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const [respondModal, setRespondModal] = useState<boolean>(false);
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [connectionModal, setConnectionModal] = useState<boolean>(false);
  const [loadId, setLoadId] = useState<number>();
  const [connectionDetails, setConnectionDetails] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { handleTabName, filterAnnouncementValue, searchValue } =
    useSearchStore();
  const {
    isLoading,
    isLoad,
    announcements,
    resumes,
    isLoadCv,
    getMyAllCv,
    handleApplyVacancy,
    getAnnouncements,
  } = useAnnouncementStore();

  const state = useNavigationState((state) => state);

  const { activities } = ActivitiesStore();

  useEffect(() => {
    if (state.routes[state.index].name === t("announcements")) {
      handleTabName(t("announcements"));
    }
  }, [state]);

  const handleConnect = (item: any) => {
    setConnectionModal(true);
    setConnectionDetails(item);
  };

  const cancelModalText = [
    t("salary_not_correct"),
    t("conditions_not_good"),
    t("another_company"),
  ];

  const handleRespond = (id: number) => {
    setLoadId(id);
    setRespondModal(true);
    getMyAllCv();
  };

  const handlePress = async (vacancy_id: number | undefined, cv_id: number) => {
    if (!vacancy_id) return;
    await handleApplyVacancy({
      vacancy_id,
      cv_id,
    });
    setRespondModal(false);
  };

  const handleCancel = (id: number) => {
    setCancelModal(true);
    setLoadId(id);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAnnouncements({
      filter: {
        vacancies: filterAnnouncementValue,
        search: { value: searchValue },
      },
    });
    setRefreshing(false);
  }, [filterAnnouncementValue, searchValue]);

  return (
    <View>
      {isLoading ? (
        <SkeletonSearch />
      ) : (
        <View className="px-4">
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={() => (
              <EmptyScreen title={t("announcements")} />
            )}
            showsVerticalScrollIndicator={false}
            data={announcements.data}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({ item }) =>
              AnnouncementItem({
                item,
                isLoad: isLoad,
                theme: colorScheme,
                handleConnect,
                handleRespond,
                setCancelModal,
                handleCancel,
                t: t,
              })
            }
            ListHeaderComponent={() => (
              <View className="py-3">
                <Pressable
                  onPress={() => router.push("/(root)/(profile)/activities")}
                >
                  <ActivityBar
                    current={activities?.activities ?? 0}
                    total={100}
                    title={t("your_activity")}
                  />
                </Pressable>
              </View>
            )}
          />

          {/* Modals */}
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
                      onPress={() => handlePress(loadId, item.id)}
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
          <ConnectionModal
            connectionModal={connectionModal}
            setConnectionModal={setConnectionModal}
            item={connectionDetails}
          />
          <CancelModal
            cancelModal={cancelModal}
            setCancelModal={setCancelModal}
            loadId={loadId}
            cancelModalText={cancelModalText}
            isVacancy
          />
        </View>
      )}
    </View>
  );
}
