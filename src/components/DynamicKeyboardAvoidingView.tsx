import { useEffect, useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";

export default function DynamicKeyboardAvoidingView(
  props: KeyboardAvoidingViewProps & {
    contentContainerStyle?: StyleProp<ViewStyle> | undefined;
    children: React.ReactNode;
    handleKeyboardChange?: (isKeyboardOpen: boolean) => void;
    scrollAble?: boolean;
  }
) {
  let scrollView = useRef<ScrollView>(null);

  const isScrollAble = props.scrollAble;
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      scrollView.current?.scrollToEnd({ animated: true });
      props.handleKeyboardChange && props.handleKeyboardChange(true);
    });

    Keyboard.addListener("keyboardDidHide", () => {
      scrollView.current?.scrollTo({ y: 0, animated: true });
      props.handleKeyboardChange && props.handleKeyboardChange(false);
    });

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={props.behavior ? props.behavior : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 1 : 0}
    >
      {isScrollAble || true ? (
        <ScrollView
          ref={scrollView}
          contentContainerStyle={props.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          className="bg-white dark:bg-gray-900"
        >
          {props.children}
        </ScrollView>
      ) : (
        props.children
      )}
    </KeyboardAvoidingView>
  );
}
