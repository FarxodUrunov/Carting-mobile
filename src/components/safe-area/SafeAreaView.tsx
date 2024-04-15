import { Platform, ViewProps } from "react-native";
import { SafeAreaView as AndroidSafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView as IOSafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function SafeAreaView(props: ViewProps) {
  if (Platform.OS === "android") {
    return (
      <AndroidSafeAreaView {...props}>
        {props.children}
        <StatusBar style="auto" />
      </AndroidSafeAreaView>
    );
  }
  if (Platform.OS === "ios") {
    return (
      <IOSafeAreaView {...props}>
        {props.children}
        <StatusBar style="auto" />
      </IOSafeAreaView>
    );
  }
}
