import { View, Text, Pressable, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ProposalOrderCard from "~/secondary/ProposalOrderCard";
import MapView from "react-native-maps";
import BaseProgressBar from "~/progress/BaseProgressBar";
import { FormatDate } from "~/FormatDate";
import { BaseText } from "~/text/BaseText";
import { FormatLoadType } from "~/Format";
import { Stack, useRouter } from "expo-router";
import { useProposalStore } from "-/proposals.store";
import { useTranslation } from "react-i18next";
import SwipeRight from "../(tabs)/proposal/_components/SwipeRight";
import { ScrollView } from "react-native-gesture-handler";
import CancelModal from "~/secondary/modals/CancelModal";
import SkeletonProposals from "~/secondary/skeletons/SkeletonProposals";

export default function Proposal() {
  const router = useRouter();
  const { proposal, getOneProposal, isLoad } = useProposalStore();
  const [refreshing, setRefreshing] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const { t } = useTranslation();
  const [process, setProcess] = useState(0);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setCancelModal(false);
    setRefreshing(false);
    getOneProposal(proposal.id);
  }, []);

  const rejectTexts = [
    t("cargo_price"),
    t("address_not_correct"),
    t("transport_broke"),
  ];
  useEffect(() => {
    if (proposal.status === "going_to_pickup_location") {
      setProcess(20);
    } else if (proposal.status === "pickup_load") {
      setProcess(40);
    } else if (proposal.status === "start_delivery") {
      setProcess(60);
    } else if (proposal.status === "arrived") {
      setProcess(80);
    } else if (proposal.status === "unload") {
      setProcess(100);
    } else {
      setProcess(0);
    }
  }, [proposal]);

  return isLoad.active ? (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerTitle: t("back"),
          headerRight: () => (
            <Pressable onPress={() => setCancelModal(true)}>
              <BaseText className="text-red-600">{t("reject")}</BaseText>
            </Pressable>
          ),
          headerBackTitle: "Back",
        }}
      />
      <SkeletonProposals status="active" />
    </View>
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Stack.Screen
        options={{
          headerTitle: t("back"),
          headerRight: () => (
            <Pressable onPress={() => setCancelModal(true)}>
              <BaseText className="text-red-600">{t("reject")}</BaseText>
            </Pressable>
          ),
          headerBackTitle: "Back",
        }}
      />
      <View className="mb-6 px-4 my-4">
        <View className="py-4 px-3 mb-2 rounded-md dark:bg-gray-800 bg-gray-100">
          <ProposalOrderCard item={proposal} />
          <View className="my-4 h-36 w-full rounded-md justify-center items-center relative dark:bg-gray-600 bg-gray-200">
            <Pressable
              className="w-full h-full rounded-md bg-transparent absolute top-0 left-0 z-50"
              onPress={() => router.push(`/live-tracking/${proposal?.id}`)}
            />
            <View className="w-full h-full">
              {proposal?.delivery_latitude && proposal?.delivery_longitude ? (
                <MapView
                  style={{
                    borderRadius: 5,
                    borderWidth: 0,
                    height: 144,
                  }}
                  initialRegion={{
                    latitude: proposal?.delivery_latitude,
                    longitude: proposal?.delivery_longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                />
              ) : (
                <>{/* Skeleton */}</>
              )}
            </View>
          </View>
        </View>
        <View
          className="p-4 rounded-lg items-center"
          style={{ backgroundColor: "rgba(16, 24, 40, 0.84)" }}
        >
          <View className="mb-4 w-full">
            <BaseProgressBar
              current={process}
              total={100}
              placement="top-right"
            >
              <Text className="text-sm font-medium  text-gray-50">
                {t("delivery_process")}
              </Text>
            </BaseProgressBar>
          </View>
          <Text className="text-sm font-semibold text-center dark:text-lime-500 text-lime-600">
            {proposal?.load_type?.map((type: string) => FormatLoadType(type))}
          </Text>
          <Text className="text-gray-200 text-xs font-medium">
            {proposal?.delivery_address}
          </Text>
          <Text className="text-gray-400 text-xs font-medium">
            {FormatDate(proposal?.delivery_time)}
          </Text>
        </View>
        {proposal?.status !== "unload" ? (
          <SwipeRight item={proposal} />
        ) : (
          <View className="p-1 rounded-md my-4 items-center justify-center dark:text-lime-500 text-lime-600 ">
            <BaseText className="text-bold text-xl text-white">
              {t("waiting_for_clients_confirmation")}
            </BaseText>
          </View>
        )}
      </View>

      <CancelModal
        cancelModal={cancelModal}
        setCancelModal={setCancelModal}
        loadId={proposal?.id}
        cancelModalText={rejectTexts}
        isReject
      />
    </ScrollView>
  );
}
