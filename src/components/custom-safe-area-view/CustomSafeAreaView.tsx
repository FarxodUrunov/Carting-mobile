import { SafeAreaView } from "react-native-safe-area-context";

export const CustomSafeAreaView = (props: any) => (
  <SafeAreaView {...props} edges={["bottom", "left", "right"]}>
    {props.children}
  </SafeAreaView>
);
