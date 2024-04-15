import React from "react";
import { View } from "react-native";
import BaseAvatar from "~/base-avatar/BaseAvatar";
import { router } from "expo-router";
import { useProfile } from "-/profile.store";
import { BaseText } from "~/text/BaseText";
import BaseBadge from "~/badge/BaseBadge";
import { BaseButton } from "~/button/BaseButton";
import { useTranslation } from "react-i18next";

export default function VehicleCard({ data, path }: { data: any; path?: any }) {
  const { t } = useTranslation();
  const { getVehicleDetail } = useProfile();

  const handlePress = (id: number) => {
    getVehicleDetail(id);

    router.push(path);
  };

  return (
    <View className="px-3 py-4 rounded-md mb-8 dark:bg-gray-800 bg-gray-100">
      <View className="flex-row">
        {data.photos && (
          <BaseAvatar
            source={{ uri: data.photos[0] }}
            variant="square"
            size="lg"
          />
        )}

        <View className="px-4">
          <BaseText className="text-lg font-semibold">{data.model}</BaseText>
          <BaseText className="text-sm">{data.auto_number}</BaseText>
        </View>
      </View>

      {/* <View className="mt-4">
          <BaseText className="font-semibold">{data.title}</BaseText>
        </View> */}

      <View className="mt-4">
        <View className="flex-row items-center">
          <BaseText variant="tertiary" className="text-sm">
            {t("route")}:{" "}
          </BaseText>
          {data.from_region && data.to_region ? (
            <View className="flex-row items-center">
              <BaseText className="text-sm">{data.from_region} - </BaseText>
              <BaseText className="text-sm">{data.to_region}</BaseText>
            </View>
          ) : (
            <BaseText className="text-sm">-</BaseText>
          )}
        </View>
      </View>
      <View style={{ gap: 8 }} className="flex-row flex-wrap mt-2 mb-4">
        <BaseBadge variant="secondary" text={data.capacity + t("kg")} />

        <BaseBadge
          variant="secondary"
          text={`${data.body_width} X ${data.body_length} X ${
            data.body_height
          } (${t("load_volume_details")})`}
        />

        <BaseBadge
          variant="secondary"
          cnText="capitalize"
          text={t(data.vehicle_type)}
        />
      </View>

      <BaseButton
        title={t("view_details")}
        variant="secondary"
        onPress={() => handlePress(data?.id)}
      />
    </View>
  );
}
