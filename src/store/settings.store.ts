import { create } from "zustand";
import { router } from "expo-router";

import { ChangePassword } from "_api/profile";
import { Alert } from "react-native";
import { DeleteDevice, DeleteDevices, GetDevices } from "_api/devices";
import { t } from "i18next";

interface SettingsState {
  isLoading: boolean;
  changePassword: (data: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) => void;
  devices: {
    device_id: string | null;
    device_name: string;
    id: number;
    login_at: string;
  }[];
  getDevices: () => void;
  deleteDevice: (id: string | number) => void;
  deleteDevices: (id: number) => void;
}

export const useSettings = create<SettingsState>((set, get) => ({
  isLoading: false,
  devices: [],

  async changePassword(data) {
    set({ isLoading: true });
    return await ChangePassword(data)
      .then(() => {
        Alert.alert(t("successfully_applied"));
        router.back();
      })
      .catch((err) => {
        if (err.response.data.status === 422) {
          Alert.alert(t("current_password_wrong"));
          return;
        }
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  async getDevices() {
    set({ isLoading: true });
    return await GetDevices()
      .then(({ data }) => {
        set({ devices: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  async deleteDevice(id: string | number) {
    set({ isLoading: true });
    return DeleteDevice(id)
      .then(() => {
        Alert.alert(t("successfully_deleted"));
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  async deleteDevices(id: number) {
    set({ isLoading: true });
    return await DeleteDevices(id)
      .then(() => {
        Alert.alert(t("successfully_deleted_devices"));
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
