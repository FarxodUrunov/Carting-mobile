import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { BaseButton } from "~/button/BaseButton";

export default function SearchActionsNav({
  handleRespond,
  handleConnect,
  handleCancel,
  item,
}: {
  item: any;
  isLoad: boolean;
  handleConnect: (item: any) => void;
  handleRespond: (id: number) => void;
  handleCancel: (id: number) => void;
}) {
  const { t } = useTranslation();
  return (
    <View className="justify-between flex-row">
      {item.is_assign ? (
        <View className="flex-1 pr-1">
          <BaseButton
            onPress={() => handleConnect(item)}
            title={t("connection")}
            variant="secondary"
            group
          />
        </View>
      ) : null}
      <View className="flex-1 pl-1">
        {!item.is_assign ? (
          <BaseButton
            onPress={() => handleRespond(item.id)}
            title={t("apply")}
            variant="primary"
            group
          />
        ) : (
          <BaseButton
            onPress={() => handleCancel(item.proposal_id)}
            title={t("cancel")}
            variant="warning"
            group
          />
        )}
      </View>
    </View>
  );
}
