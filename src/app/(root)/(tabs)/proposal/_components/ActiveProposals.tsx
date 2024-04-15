import {
  View,
  Text,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useProposalStore } from "-/proposals.store";
import { router } from "expo-router";
import { FormatDate } from "~/FormatDate";
import EmptyScreen from "~/secondary/EmptyScreen";
import SkeletonProposals from "~/secondary/skeletons/SkeletonProposals";
import { BaseText } from "~/text/BaseText";
import { useTranslation } from "react-i18next";
import CancelModal from "~/secondary/modals/CancelModal";
import BaseIcon from "~/icon/BaseIcon";

export default function ActiveProposals() {
  const {
    getProposals,
    activeProposals,
    isLoad,
    getOneProposal,
    updateStopStatus,
  } = useProposalStore();
  const { t } = useTranslation();
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [proposalId, setProposalId] = useState<number>();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getProposals("active");
    setCancelModal(false);
    setRefreshing(false);
  }, []);
  useEffect(() => {
    getProposals("active");
    setCancelModal(false);
  }, []);

  if (isLoad.active) return <SkeletonProposals status="active" />;

  const stopText = [t("eating"), t("car_broke"), t("wc")];

  if (activeProposals.length === 0)
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <EmptyScreen title={t("active")} />
      </ScrollView>
    );

  const handlePress = (announcementId: number) => {
    getOneProposal(announcementId);
    router.push(`../proposal/${announcementId}`);
  };

  const handleShowStopModal = () => {
    setCancelModal(true);
  };

  const handleRunProposal = () => {
    setCancelModal(false);
    updateStopStatus({ message: "", status: "moving" });
  };

  return (
    <ScrollView
      className="px-5 py-4"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {activeProposals.length ? (
        <View className="relative my-4 py-4 px-3  rounded-md dark:bg-gray-800 bg-gray-100">
          <View className="flex-row gap-2 items-center">
            <View className="px-2 py-1 rounded mb-4 dark:bg-gray-600 bg-gray-200 flex-1">
              <Text className="text-base font-normal capitalize  text-green-600 ">
                {t("moving")}
              </Text>
            </View>
            {activeProposals[0].vehicle_condition === "stopped" ? (
              <Pressable
                onPress={handleRunProposal}
                className="px-2 py-1 rounded mb-4 dark:bg-gray-600 bg-gray-200 flex-row items-center gap-1"
              >
                <Text className="text-sm font-normal capitalize  text-red-600">
                  {t("stopped")}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleShowStopModal}
                className="px-2 py-[2px] rounded mb-4 dark:bg-gray-600 bg-gray-200 flex-row items-center gap-1"
              >
                <BaseIcon name="infoCircle" />
                <Text className="text-sm font-normal capitalize  text-gray-600 dark:text-white">
                  {t("stop")}
                </Text>
              </Pressable>
            )}
          </View>
          {activeProposals.map((item: any, index: number, arr) =>
            item.status !== "in_proposal_state" ? (
              <Pressable
                key={`${item.id}-${index}`}
                className={`flex-row justify-between items-center pb-4 mb-4 ${
                  index !== arr.length - 1 ? "border-b border-[#E4E7EC]" : null
                }`}
                onPress={() => handlePress(item.id)}
              >
                <View className="flex-row items-center">
                  <View className="w-6 h-6 border-[5px] rounded-full border-blue-500" />
                  <View className="ml-2">
                    <BaseText className="font-bold ">{item.title}</BaseText>
                    <BaseText className="font-medium ">
                      {item.pickup_address.substring(0, 30)}...
                    </BaseText>
                    <BaseText className="font-medium ">
                      {item.delivery_address.substring(0, 30)}
                    </BaseText>
                    <BaseText variant="tertiary" className="text-sm">
                      {FormatDate(item.delivery_time)}
                    </BaseText>
                  </View>
                </View>

                <BaseIcon name="chevronRight" color="#667085" />
              </Pressable>
            ) : null
          )}
        </View>
      ) : null}
      {activeProposals.some(
        (el: any) => el?.status === "in_proposal_state"
      ) && (
        <>
          <BaseText>{t("pending_orders")}</BaseText>
          <View className="relative my-4 py-4 px-3  rounded-md dark:bg-gray-800 bg-gray-100">
            {activeProposals.map((item: any, index: number, arr) =>
              item.status === "in_proposal_state" ? (
                <Pressable
                  key={`${item.id}-${index}`}
                  className={`pb-4 mb-4 ${
                    index !== arr.length - 1
                      ? "border-b border-[#E4E7EC]"
                      : null
                  }`}
                  onPress={() => handlePress(item.id)}
                >
                  <BaseText className="font-bold mb-2">{item.title}</BaseText>
                  <View className="flex-row items-center mb-4">
                    <View className="w-6 h-6 border-[5px] rounded-full border-blue-500" />
                    <View className="ml-2">
                      <BaseText className="font-medium ">
                        {item.pickup_address.substring(0, 20)}
                      </BaseText>
                      <BaseText variant="tertiary" className="text-sm">
                        {FormatDate(item.delivery_time)}
                      </BaseText>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-6 h-6 border-[5px] rounded-full border-green-500" />
                    <View className="ml-2">
                      <BaseText className="font-medium ">
                        {item.delivery_address.substring(0, 20)}
                      </BaseText>
                      <BaseText variant="tertiary" className="text-sm">
                        {FormatDate(item.delivery_time)}
                      </BaseText>
                    </View>
                  </View>
                </Pressable>
              ) : null
            )}
          </View>
        </>
      )}

      <CancelModal
        cancelModal={cancelModal}
        setCancelModal={setCancelModal}
        loadId={proposalId}
        cancelModalText={stopText}
        isProposal
      />
    </ScrollView>
  );
}
