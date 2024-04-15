import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import BaseIcon from "~/icon/BaseIcon";
import * as Device from "expo-device";
import { FormatDate } from "~/FormatDate";
import { useSettings } from "-/settings.store";
import colors from "_constants/colors";
import { useColorScheme } from "nativewind";
import { BaseText } from "~/text/BaseText";
import { useTranslation } from "react-i18next";

// interface DeviceType {
//   device_id: string | null;
//   device_name: string;
//   id: number;
//   login_at: string;
// }

export default function ProfileSettingsDevicesScreen() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  // const [device, setDevice] = useState<DeviceType | undefined>();
  // const [otherDevices, setOtherDevices] = useState<DeviceType[]>([]);
  const { isLoading, devices, getDevices, deleteDevice } = useSettings();

  const handleDeleteOne = (id: string | number) => {
    deleteDevice(id);
    getDevices();
  };
  // const handleDeleteDevices = () => {
  //   deleteDevices(device!.id);
  //   getDevices();
  // };

  useEffect(() => {
    getDevices();
  }, []);

  // useEffect(() => {
  //   if (devices.length > 0) {
  //     setDevice(devices?.find((item) => item?.device_id === Device?.osBuildId));
  //     setOtherDevices(
  //       devices.filter((item) => item.device_id !== Device.osBuildId)
  //     );
  //   }
  // }, [devices]);
  return (
    <View className="p-5 mb-0 flex-1 bg-white dark:bg-gray-900">
      <Stack.Screen
        options={{
          headerTitle: t("devices"),
          headerTitleAlign: "center",
          headerBackTitle: t("settings"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors[colorScheme].colors.card,
          },
          headerTintColor: colors[colorScheme].colors.text,
        }}
      />
      <View className="mt-4">
        <BaseText className="text-sm mb-2 text-gray-500 dark:text-gray-300">
          {t("active_device")}
        </BaseText>
        <View className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
          <View className="flex-row  items-center">
            <View className="w-12 h-12 rounded-lg justify-center items-center dark:bg-gray-900 bg-white">
              <BaseIcon name="deviceMobile" />
            </View>
            <View className="ml-2">
              <BaseText className="text-base font-bold capitalize">
                {Device.deviceName}
              </BaseText>
              {/* <View className="flex-row mt-1">
                <BaseText className="text-sm text-gray-500 dark:text-gray-300">
                  {t("signed_in")}:{" "}
                </BaseText>
                {device?.login_at ? (
                  <BaseText className="text-lime-600 text-sm">
                    {FormatDate(device?.login_at, "primary")}
                  </BaseText>
                ) : null}
              </View> */}
            </View>
          </View>
          {/* {devices?.length > 1 && (
            <TouchableOpacity onPress={handleDeleteDevices}>
              <BaseText className="text-center dark:text-red-400 text-red-600">
                {t("terminate_sessions")}
              </BaseText>
            </TouchableOpacity>
          )} */}
        </View>
      </View>
      <View className="flex-1 mt-4">
        <BaseText className="text-sm mb-2 text-gray-500 dark:text-gray-300">
          {t("other_devices")}
        </BaseText>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={devices}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View className="p-4 rounded-2xl flex-row justify-between items-center mb-2 bg-gray-100 dark:bg-gray-800">
                <View className="flex-row">
                  <View className="w-12 h-12 rounded-lg justify-center items-center dark:bg-gray-900 bg-white">
                    <BaseIcon name="deviceMobile" />
                  </View>
                  <View className="ml-2">
                    <BaseText className="text-base font-bold">
                      {item?.device_name}
                    </BaseText>
                    <View className="flex-row mt-1">
                      <BaseText className="text-sm text-gray-500 dark:text-gray-300">
                        {t("signed_in")}:
                      </BaseText>
                      <BaseText className="text-lime-600 text-sm ml-1">
                        {FormatDate(item?.login_at, "primary")}
                      </BaseText>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleDeleteOne(item.id)}>
                  <BaseIcon name="xMark" cn="dark:text-red-400 text-red-600" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
