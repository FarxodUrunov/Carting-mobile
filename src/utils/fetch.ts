import * as SecureStore from "expo-secure-store";
import baseAxios from "axios";
import * as Device from "expo-device";
import { router } from "expo-router";

const axios = baseAxios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ||
    "https://api-carting.anysoft.uz/v1/mobile",
  headers: {
    Accept: "application/json",
    "X-USER-TYPE": "driver",
    "X-DEVICE-CPU-ARCH": Device.supportedCpuArchitectures,
    "X-DEVICE-TYPE": Device.manufacturer,
    "X-DEVICE-VERSION": Device.osVersion,
    "X-DEVICE-NAME": Device.deviceName,
    "X-DEVICE-OS": Device.osName,
    "X-DEVICE-OS-VERSION": Device.osVersion,
    "X-DEVICE-BUILD-ID": Device.osInternalBuildId,
  },
});

/**
 * Creates an instance of axios with the specified configuration options.
 * The axios instance is customized to include headers and transform request logic.
 * @returns {AxiosInstance} The customized axios instance.
 */
axios.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      router.push("/login");
    }
    return Promise.reject(error);
  }
);
export default axios;
