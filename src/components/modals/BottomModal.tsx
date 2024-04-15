import React, { ReactNode, FC, useState } from "react";
import { Modal, TouchableOpacity, View, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  State,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import GrabberJumpAnimation from "~/animations/Bounce";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
  height?: number;
  children?: ReactNode;
}

const BottomModal: FC<BottomModalProps> = ({
  visible,
  onClose,
  height = 400,
  children,
}: BottomModalProps) => {
  const [dragY, setDragY] = useState<number>(0);
  const { colorScheme } = useColorScheme();

  const onGestureEvent = ({ nativeEvent }: PanGestureHandlerGestureEvent) => {
    setDragY(nativeEvent.translationY);
  };

  const onHandlerStateChange = ({
    nativeEvent,
  }: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      setDragY(0);
      // Close modal if dragged down by at least 30%
      if (nativeEvent.translationY > 0.3 * height) {
        onClose();
      }
    }
  };

  const translateY = Math.max(0, dragY);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View
            style={[
              styles.modal,
              {
                transform: [{ translateY }],
                height,
                backgroundColor:
                  colors[colorScheme ?? "light"].colors.background,
              },
            ]}
          >
            <GrabberJumpAnimation />
            {children}
          </View>
        </PanGestureHandler>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    width: "100%",
    backgroundColor: "#F2F4F7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default BottomModal;
