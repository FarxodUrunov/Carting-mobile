import { Text, ScrollView, Pressable, Alert } from "react-native";
import React from "react";
import BottomModal from "~/modals/BottomModal";
import { useSearchStore } from "-/search.store";
import Skeleton from "~/skeleton";
import { BaseText } from "~/text/BaseText";
import { useLoadStore } from "-/load.store";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";

export default function RespondModal({
  respondModal,
  setRespondModal,
  loadId,
  setLoadId,
}: {
  respondModal: boolean;
  setRespondModal: any;
  loadId?: any;
  setLoadId?: any;
}) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { myTrucks, isLoad, filterLoadValue, searchValue } = useSearchStore();
  const { createDriverProposal, getLoads } = useLoadStore();

  const handlePress = async (id: number) => {
    const res = await createDriverProposal({
      load_id: loadId,
      vehicle_id: id,
    });
    if (res.status === 201) {
      Alert.alert(t("successfully_changed"));
      getLoads({
        filter: { loads: filterLoadValue, search: { value: searchValue } },
      });
    }
    setRespondModal(false);
    setLoadId(false);
  };

  return (
    <BottomModal
      height={180}
      visible={respondModal}
      onClose={() => setRespondModal(!respondModal)}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isLoad.trucks ? (
          myTrucks.length === 0 && myTrucks ? (
            <BaseText className="text-md font-bold text-center">
              No vehicles found
            </BaseText>
          ) : (
            myTrucks?.map((item: any) => (
              <Pressable
                key={item.id}
                onPress={() => handlePress(item?.id)}
                className={`w-full px-4 py-3 rounded-md items-center my-2 ${
                  colorScheme === "dark" ? "bg-slate-700" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`
              text-gray-900 text-sm font-semibold
              ${colorScheme === "dark" ? "text-white" : "text-gray-900"}
              `}
                >
                  {item.model} - {item.auto_number}
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
  );
}
