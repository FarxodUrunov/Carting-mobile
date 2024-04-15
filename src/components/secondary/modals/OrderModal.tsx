import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import BottomModal from "~/modals/BottomModal";
import BaseIcon from "~/icon/BaseIcon";
import { useRouter } from "expo-router";
import { useLoadStore } from "-/load.store";
import { ConfirmLoadTypeMobile } from "@anysoftuz/carting-shared/dist/types/mobile";
import BaseAvatar from "~/base-avatar/BaseAvatar";
import { FormatLoadType } from "~/Format";
import { BaseText } from "~/text/BaseText";

export default function RespondModal({
  orderModal,
  setOrderModal,
}: {
  orderModal: boolean;
  setOrderModal: any;
}) {
  const [data, setData] = useState<ConfirmLoadTypeMobile | null>(null);
  const router = useRouter();
  const { getAppliedLoads, appliedLoads } = useLoadStore();

  const handleLoadType = () => {
    const loadType = data?.load_type.map((item, index) => FormatLoadType(item));

    return loadType?.join(", ");
  };

  // useEffect(() => {
  //   getAppliedLoads();
  //   setData(appliedLoads[0]);
  // }, [appliedLoads]);
  return (
    <BottomModal
      height={280}
      visible={orderModal}
      onClose={() => setOrderModal(!orderModal)}
    >
      <View>
        <View className="flex-row space-x-4">
          <BaseAvatar
            source={{ uri: data?.photos[0] }}
            variant="square"
            size="lg"
          />
          <View>
            <BaseText className="text-lg font-semibold">{data?.model}</BaseText>
            <BaseText variant="tertiary" className="text-sm">
              {data?.auto_number}
            </BaseText>
          </View>
        </View>
        <View className="my-4 space-y-2">
          <BaseText className="font-semibold">{handleLoadType()}</BaseText>
          <View className="flex-row space-x-1">
            <BaseText variant="secondary" className="text-sm">
              Marshrut:
            </BaseText>
            <BaseText className="text-sm">{data?.routes?.join(", ")}</BaseText>
          </View>
        </View>
        <Pressable onPress={() => router.push("/(root)/(search)/Orders")}>
          <View className="dark:bg-slate-600 bg-gray-200 flex-row items-center justify-between p-2  rounded-md">
            <View className="flex-row">
              {data?.customers.slice(0, 4).map((item, index) => (
                <View
                  key={index}
                  className={`w-10 h-10 rounded-full border border-white p-0.5 bg-gray-300 ${
                    index !== 0 ? "-ml-2" : ""
                  }`}
                >
                  <Image
                    source={{ uri: item.photo }}
                    className="w-full h-full rounded-full border-2 border-red-500"
                  />
                </View>
              ))}
              {data?.customers.length && data?.customers.length > 4 ? (
                <View className="w-10 h-10 rounded-full border border-white p-0.5 bg-lime-500 -ml-2 items-center justify-center">
                  <View className="w-9 h-9 rounded-full bg-lime-50 items-center justify-center">
                    <BaseText
                      variant="secondary"
                      className="text-base font-semibold"
                    >
                      +
                      {data.customers.length - 4 > 8
                        ? "9"
                        : data.customers.length - 4}
                    </BaseText>
                  </View>
                </View>
              ) : null}
            </View>
            <BaseIcon name="arrowRight" />
          </View>
        </Pressable>
      </View>
    </BottomModal>
  );
}
