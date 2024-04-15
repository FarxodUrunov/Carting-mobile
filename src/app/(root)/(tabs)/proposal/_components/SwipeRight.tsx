import { View, Dimensions, StyleSheet, Text } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { useProposalStore } from "-/proposals.store";
import { GestureDetector } from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import BaseIcon from "~/icon/BaseIcon";
import { useTranslation } from "react-i18next";
type Proposalstatus =
  | "in_proposal_state"
  | "going_to_pickup_location"
  | "pickup_load"
  | "start_delivery"
  | "arrived"
  | "unload";
export default function SwipeRight({ item }: any) {
  const { updateProposal } = useProposalStore();
  const windowWidth = Dimensions.get("window").width;
  const END_POSITION = windowWidth - 94;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  const { t } = useTranslation();

  const formatStatus = (status: string) => {
    switch (status) {
      case "in_proposal_state":
        return "going_to_pickup_location";
      case "going_to_pickup_location":
        return "pickup_load";
      case "pickup_load":
        return "start_delivery";
      case "start_delivery":
        return "arrived";
      case "arrived":
        return "unload";

      default:
        return "in_proposal_state";
    }
  };
  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((e) => {
      if (onLeft.value) {
        if (e.translationX >= 0 && e.translationX <= END_POSITION) {
          position.value = e.translationX;
        }
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / 1.1) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onLeft.value = false;
        const updatedStatus: Proposalstatus = formatStatus(item.status);

        updateProposal({
          id: item.id,
          status: updatedStatus,
        });
      } else {
        position.value = withTiming(0, { duration: 100 });
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View
      style={{ height: 50 }}
      className="rounded-lg my-4 flex-row justify-center items-center  relative border dark:bg-gray-700 bg-white dark:border-gray-700 border-gray-300"
    >
      {item.status !== "unload" && (
        <View className="w-full absolute top-0.5 left-0.5 z-50">
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.box, animatedStyle]}>
              <BaseIcon name="arrowRight" cn="text-white" />
            </Animated.View>
          </GestureDetector>
        </View>
      )}
      <Text className="text-sm font-semibold capitalize dark:text-gray-50 text-gray-900">
        {t(item.status).replace(/_/g, " ")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 44,
    width: 56,
    backgroundColor: "#4CA30D",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
