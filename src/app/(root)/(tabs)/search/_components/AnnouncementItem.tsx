import { View } from "react-native";
import { AnnouncementMobile } from "@anysoftuz/carting-shared/dist/types/mobile";

import AnnouncementCard from "./AnnouncementCard";

import colors from "_constants/colors";
import { BaseButton } from "~/button/BaseButton";

export default function AnnouncementItem({
  item,
  isLoad,
  theme,
  handleConnect,
  handleRespond,
  handleCancel,
  t,
}: {
  item: AnnouncementMobile;
  isLoad: boolean;
  theme: "light" | "dark" | null | undefined;
  handleConnect: (item: AnnouncementMobile) => void;
  handleRespond: (id: number) => void;
  setCancelModal: (value: boolean) => void;
  handleCancel: (id: number) => void;
  t: any;
}) {
  return (
    <View
      className="my-2 rounded-md pt-4 px-3 pb-1"
      style={{
        backgroundColor: colors[theme ?? "light"].colors.cardSecondary,
      }}
    >
      <AnnouncementCard
        item={item}
        status={t("viewed_by", { number: item.total_views })}
      />
      <View className="justify-between flex-row gap-2">
        {item.is_applied ? (
          <BaseButton
            onPress={() => handleConnect(item)}
            title={t("message")}
            variant="secondary"
            group
          />
        ) : null}

        {!item.is_applied ? (
          <BaseButton
            onPress={() => handleRespond(item.id)}
            title={t("apply")}
            hasLoader
            isLoading={isLoad}
            group
          />
        ) : (
          <BaseButton
            onPress={() => handleCancel(item.id)}
            title={t("cancel")}
            variant="warning"
            group
          />
        )}
      </View>
    </View>
  );
}
