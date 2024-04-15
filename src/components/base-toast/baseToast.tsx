import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { View, Text, TouchableOpacity } from "react-native";

import { useEffect, useState } from "react";

export function useToast() {
  const [message, setMessage] = useState("");
  const [placement, setPlacement] = useState("top");
  const [duration, setDuration] = useState(3000);

  return {
    message,
    setMessage,
    placement,
    setPlacement,
    duration,
    setDuration,
  };
}

export default function BaseToast() {
  const { message, placement, duration, setMessage } = useToast();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (message.length > 0) {
      const timer = setTimeout(() => {
        setIsShow(true);
      }, duration);

      return () => {
        setMessage("");
        clearTimeout(timer);
      };
    }
  }, [message, duration]);

  const hide = () => {
    setIsShow(false);
  };

  return isShow ? (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      className={`absolute ${
        placement === "top" ? "top-10" : "bottom-10"
      }  w-full bg-transparent rounded-md flex-row justify-center items-center`}
    >
      <View className="bg-[#101828] w-[90%] rounded-md p-3 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-gray-300 text-base font-normal">4</Text>
            <Text className="text-white text-base font-normal ml-2">
              {message}
            </Text>
          </View>
          <TouchableOpacity onPress={hide} activeOpacity={1}>
            <Text className="text-lime-600 text-base font-medium">Undo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  ) : null;
}
