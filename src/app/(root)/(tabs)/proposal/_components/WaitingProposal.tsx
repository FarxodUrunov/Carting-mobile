import {
  View,
  Text,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import EmptyScreen from "~/secondary/EmptyScreen";
import ProposalOrderCard from "~/secondary/ProposalOrderCard";
import SkeletonProposals from "~/secondary/skeletons/SkeletonProposals";
import { useProposalStore } from "-/proposals.store";
import { useTranslation } from "react-i18next";

export default function WaitingProposal() {
  const { t } = useTranslation();
  const { getProposals, waitingProposals, isLoad } = useProposalStore();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getProposals("waiting");
    setRefreshing(false);
  }, []);
  useEffect(() => {
    getProposals("waiting");
  }, []);

  if (isLoad.waiting) return <SkeletonProposals status="waiting" />;

  if (waitingProposals.length === 0)
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <EmptyScreen title={t("waiting_for")} />
      </ScrollView>
    );

  return (
    <ScrollView
      className="px-5 py-4"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        {waitingProposals.map((item: any) => (
          <View
            key={item.id}
            className={`my-2 mb-6 dark:bg-gray-800 bg-gray-100 rounded-md py-4 px-3 border-l-4 border-gray-500`}
          >
            <ProposalOrderCard item={item} />
            <View className="flex-row">
              <View className="py-1 rounded px-2 dark:bg-gray-600 bg-gray-200">
                <Text className="dark:text-gray-300 text-gray-600 text-xs font-medium">
                  {item.capacity} {t("kg")}
                </Text>
              </View>
              <View className="py-1 px-2 mx-2 rounded dark:bg-gray-600 bg-gray-200">
                <Text className="dark:text-gray-300 text-gray-600 text-xs font-medium">
                  {item.body_width}x{item.body_length}x{item.body_height}{" "}
                  {t("load_volume_details")}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: `/(root)/chat/[id]`,
                  params: {
                    id: item.chat_id,
                    proposal_vacancy_id: item.id,
                    item: JSON.stringify({
                      proposal_vacancy_id: item.id,
                      type: "proposal",
                      sender: {
                        name: item.owner?.name,
                      },
                    }),
                  },
                })
              }
              className="flex-row justify-center items-center h-9 px-4 py-2 rounded-md border border-lime-500 mt-4"
            >
              <BaseIcon name="chat" />
              <Text className="dark:text-gray-200 text-gray-900 text-sm font-semibold ml-2">
                {t("go_chat")}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
