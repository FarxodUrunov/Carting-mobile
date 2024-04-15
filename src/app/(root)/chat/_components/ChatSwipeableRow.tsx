import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Text, View, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import BaseIcon from "~/icon/BaseIcon";

export default function ChatSwipeableRow({
  children,
  onSwipeDelete,
  isOwner,
}: any) {
  const swipeableRow: any = useRef(null);
  const { t } = useTranslation();
  const renderRightActions = (progress: any, _dragAnimatedValue: any) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [32, 0],
    });

    return (
      <View
        style={{
          width: 95,
          flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
        }}
      >
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
              backgroundColor: "#dd2c00",
            }}
            onPress={close}
          >
            <BaseIcon name="trash" color="#fff" />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                backgroundColor: "transparent",
                paddingHorizontal: 8,
              }}
            >
              {t("delete")}
            </Text>
          </RectButton>
        </Animated.View>
      </View>
    );
  };

  const updateRef = (ref: any) => {
    swipeableRow.current = ref;
  };

  const close = () => {
    swipeableRow.current?.close();
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableOpen={(direction) => {
        if (direction === "right" && isOwner) {
          onSwipeDelete();
        }
      }}
    >
      {children}
    </Swipeable>
  );
}
