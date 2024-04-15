import { DeleteDeviceAllRes, DeleteDeviceRes, DevicesRes } from "_/devices";
import axios from "_utils/fetch";

export function GetDevices() {
  return axios.get<DevicesRes>("/devices");
}

export function DeleteDevice(id: string | number) {
  return axios.delete<DeleteDeviceRes>(`/devices/${id}`);
}

export function DeleteDevices(id: number) {
  return axios.delete<DeleteDeviceAllRes>(`/devices/terminate-all${id}`);
}
