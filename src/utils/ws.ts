import { Socket, io } from "socket.io-client";
import * as SecureStore from "expo-secure-store";

const wsUrl = process.env.EXPO_PUBLIC_WS_URL || ""; // Ensure wsUrl is defined
const socket: Socket = io(wsUrl, {
  auth: async (cb) => {
    const token = await SecureStore.getItemAsync("access_token");
    cb({
      token,
    });
  },
});

export default socket;
