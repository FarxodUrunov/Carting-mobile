import React, { useCallback, useEffect, useState } from "react";
import { View, Pressable, FlatList } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import { router } from "expo-router";

import SkeletonSearch from "~/secondary/skeletons/SkeletonSearch";
import CancelModal from "~/secondary/modals/CancelModal";
import ConnectionModal from "~/secondary/modals/ConnectionModal";
import RespondModal from "~/secondary/modals/RespondModal";
import ActivityBar from "~/secondary/ActivityBar";
import EmptyScreen from "~/secondary/EmptyScreen";
import OrderModal from "~/secondary/modals/OrderModal";
import LoadItem from "./LoadItem";

import { useSearchStore } from "-/search.store";
import { useLoadStore } from "-/load.store";
import { useTranslation } from "react-i18next";
import { ActivitiesStore } from "-/activities.store";
import { useColorScheme } from "nativewind";

export default function LoadsComponent() {
  const { t } = useTranslation();

  const [respondModal, setRespondModal] = useState<boolean>(false);
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [connectionModal, setConnectionModal] = useState<boolean>(false);
  const [loadId, setLoadId] = useState<string | number>();
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const [connectionDetails, setConnectionDetails] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { isLoad, getMyTrucks, handleTabName, filterLoadValue, searchValue } =
    useSearchStore();
  const { loads, isLoading, getLoads } = useLoadStore();

  const { colorScheme } = useColorScheme();
  const { activities } = ActivitiesStore();
  const state = useNavigationState((state) => state);
  useEffect(() => {
    if (state.routes[state.index].name === t("loads")) {
      handleTabName(t("loads"));
    }
  }, [state]);

  const handleConnect = (item: any) => {
    setConnectionModal(true);
    setConnectionDetails(item);
  };
  const cancelModalText = [
    t("price_not_correct"),
    t("delivery_address_not_correct"),
    t("transport_not_correct"),
  ];

  const handleRespond = (id: number) => {
    getMyTrucks();
    setLoadId(id);
    setRespondModal(true);
  };

  const handleCancel = (id: number) => {
    setCancelModal(true);
    setLoadId(id);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getLoads({
      filter: {
        loads: filterLoadValue,
        search: { value: searchValue },
      },
    });
    setRefreshing(false);
  }, [filterLoadValue, searchValue]);

  return isLoading ? (
    <SkeletonSearch />
  ) : (
    <View className="px-4">
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => <EmptyScreen title="Loads" />}
        showsVerticalScrollIndicator={false}
        data={loads.data}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) =>
          LoadItem({
            item,
            isLoad: isLoad.trucks,
            theme: colorScheme,
            handleConnect,
            handleRespond,
            handleCancel,
            t,
          })
        }
        keyExtractor={(item, index) => String(item.id) + index}
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

      <OrderModal orderModal={orderModal} setOrderModal={setOrderModal} />
      <RespondModal
        respondModal={respondModal}
        setRespondModal={setRespondModal}
        loadId={loadId}
        setLoadId={setLoadId}
      />
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
      />
    </View>
  );
}
