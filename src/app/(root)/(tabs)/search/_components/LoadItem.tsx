import React from "react";
import { View } from "react-native";
import { LoadMobile } from "@anysoftuz/carting-shared/dist/types/mobile";

import SearchActionsNav from "./SearchActionsNav";
import LoadCard from "./LoadCard";

import colors from "_constants/colors";

export default function LoadItem({
  item,
  isLoad,
  theme,
  handleConnect,
  handleRespond,
  handleCancel,
  t,
}: {
  item: LoadMobile;
  isLoad: boolean;
  theme: "light" | "dark" | null | undefined;
  handleConnect: (item: LoadMobile) => void;
  handleRespond: (id: number) => void;
  handleCancel: (id: number) => void;
  t: any;
}) {
  return (
    <View
      className="my-2 rounded-md py-4 px-3"
      style={{
        backgroundColor: colors[theme ?? "light"].colors.cardSecondary,
      }}
    >
      {item && (
        <>
          <LoadCard
            item={item}
            status={`${t("starts_in")} ${
              new Date(item.pickup_time_from).getUTCDate() -
              new Date().getUTCDate()
            } ${t("days")}`}
          />
          <SearchActionsNav
            item={item}
            isLoad={isLoad}
            handleConnect={handleConnect}
            handleRespond={handleRespond}
            handleCancel={handleCancel}
          />
        </>
      )}
    </View>
  );
}
