import React from "react";
import { View } from "react-native";
import BaseAvatar from "~/base-avatar/BaseAvatar";
import { router } from "expo-router";
import { FormatPhone } from "~/FormatPhone";
import { useProfile } from "-/profile.store";
import { BaseText } from "~/text/BaseText";
import BaseBadge from "~/badge/BaseBadge";
import { FormatExperience } from "~/FormatExperience";
import { BaseButton } from "~/button/BaseButton";

export default function CvCard({
  data,
  path,
  t,
}: {
  data: any;
  path?: any;
  t: any;
}) {
  const { getCareerDetail } = useProfile();

  const handlePress = (id: number) => {
    if (data.vehicle) {
      getCareerDetail(id, "cv-truck");
    } else {
      getCareerDetail(id, "cv");
    }

    router.push(path);
  };

  return (
    <View className="px-3 py-4 rounded-md mb-8 dark:bg-gray-800 bg-gray-100">
      <View className="flex-row">
        {data.vehicle
          ? data.vehicle?.photos?.length && (
              <BaseAvatar
                source={{ uri: data.vehicle?.photos[0] }}
                variant="square"
                size="lg"
              />
            )
          : data.account?.photo && (
              <BaseAvatar
                source={{ uri: data.account?.photo }}
                variant="circle"
                size="lg"
              />
            )}
        <View className="px-4">
          <BaseText className="text-lg font-semibold">
            {data.vehicle ? data.vehicle?.model : data.account?.name}
          </BaseText>
          <BaseText className="text-sm">
            {data.vehicle
              ? data.vehicle?.auto_number
              : FormatPhone(data.account?.phone)}
          </BaseText>
        </View>
      </View>
      <View className="mt-4">
        <BaseText className="text-lg font-semibold">
          {data.vehicle ? data.vehicle?.title : data.account?.title}
        </BaseText>
      </View>
      <View className="mt-2">
        <View className="flex-row items-center">
          <BaseText variant="tertiary" className="text-sm">
            {t("route")}:{" "}
          </BaseText>
          <View>
            {data.vehicle ? (
              <View className="flex-row items-center">
                <BaseText className="text-sm">
                  {data.vehicle?.from_region} -{" "}
                </BaseText>
                <BaseText className="text-sm">
                  {data.vehicle?.to_region}
                </BaseText>
              </View>
            ) : (
              <View className="flex-row items-center">
                <BaseText className="text-sm">
                  {data.account?.from_region} -{" "}
                </BaseText>
                <BaseText className="text-sm">
                  {data.account?.to_region}
                </BaseText>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={{ gap: 8 }} className="flex-row flex-wrap mt-2 mb-4">
        <BaseBadge
          variant="secondary"
          text={
            data.vehicle
              ? data.vehicle.capacity + ` ${t("kg")}`
              : data.account?.birth_date + ` ${"years_old"}`
          }
        />
        {data.vehicle ? (
          <BaseBadge
            variant="secondary"
            text={`${data.vehicle?.body_width} X ${
              data.vehicle?.body_length
            } X ${data.vehicle?.body_height} ( ${t("width").slice(0, 1)}x${t(
              "length"
            ).slice(0, 1)}x${t("height").slice(0, 1)}, ${t("meter")} )`}
          />
        ) : (
          <BaseBadge
            variant="secondary"
            text={`${t("work_experience")} ${FormatExperience(
              data.account?.experience
            )}`}
          />
        )}
        {data.account && (
          <BaseBadge
            variant="secondary"
            cnText="capitalize"
            text={data.account?.driver_license_category?.join(", ")}
          />
        )}
      </View>

      <BaseButton
        title={t("view_details")}
        variant="secondary"
        onPress={() => handlePress(data?.id)}
      />
    </View>
  );
}
