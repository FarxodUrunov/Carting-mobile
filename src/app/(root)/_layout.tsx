import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack } from "expo-router";
export { ErrorBoundary } from "expo-router";
import { memo, useEffect } from "react";
import { useSession } from "_hooks/session.hook";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  initialRouteName: "(root)/(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default memo(function RootLayout() {
  const { session, isLoading } = useSession();
  const [loaded, error] = useFonts({
    SpaceMono: require("@/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading, error]);

  if (!loaded) {
    return null;
  }
  if (!session) {
    return <Redirect href="/login" />;
  }

  return <RootLayoutNav />;
});

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
