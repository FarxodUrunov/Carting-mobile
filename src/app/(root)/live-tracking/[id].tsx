import { useProposalStore } from "-/proposals.store";
import { useLocalSearchParams, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import { FormatDate } from "~/FormatDate";
import BaseProgressBar from "~/progress/BaseProgressBar";
import MapScreen from "~/secondary/MapScreen";

export default function LiveTracking() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const { activeProposals } = useProposalStore();
  const findItem = activeProposals.find((el) => el.id === +params.id);
  const mapDetails = {
    delivery_latitude: findItem?.delivery_latitude,
    delivery_longitude: findItem?.delivery_longitude,
    pickup_latitude: findItem?.pickup_latitude,
    pickup_longitude: findItem?.pickup_longitude,
  };

  return (
    <View className="flex-1 items-center justify-center relative">
      <Stack.Screen
        options={{
          headerTitle: t("live_tracking"),
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerBackTitle: t("back"),
        }}
      />
      <View className="flex-1 w-full">
        <MapScreen mapDetails={mapDetails} />
      </View>
      <View className="absolute bottom-6 left-4 right-4 w-max">
        <View
          className="p-4 rounded-lg items-center"
          style={{ backgroundColor: "rgba(16, 24, 40, 0.84)" }}
        >
          <View className="mb-4 w-full">
            <BaseProgressBar
              current={0}
              total={100}
              placement="top-right"
              placementColor="text-gray-300"
            >
              <Text className="text-gray-300 text-sm font-medium">
                {t("delivery_process")}
              </Text>
            </BaseProgressBar>
          </View>
          <Text className="text-lime-600 text-center mb-1 text-sm uppercase font-semibold">
            {findItem?.load_type.map((type: string) => t(type))}{" "}
          </Text>
          <Text className="text-gray-200 text-xs font-medium">
            {findItem?.delivery_address}
          </Text>
          <Text className="text-gray-400 text-xs font-medium">
            {FormatDate(findItem?.delivery_time)}
          </Text>
        </View>
      </View>
    </View>
  );
}
