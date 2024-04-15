import {
  DriversMobile,
  VehicleDetailTypeMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import { MyVehiclesType, TransportParams } from "_/profile";
import axios from "_utils/fetch";

export function getTransports(params?: TransportParams) {
  return axios.get<MyVehiclesType>("/transports", {
    params,
  });
}

export function getTransport(transport_id: number) {
  return axios.get<VehicleDetailTypeMobile>(`/transports/${transport_id}`);
}

export function createTransport(payload: any) {
  return axios.post<VehicleDetailTypeMobile>("/transports", payload);
}

export function updateTransport(transport_id: number, payload: any) {
  return axios.patch<any>(`transports/${transport_id}`, payload);
}

export function deleteTransport(transport_id: number) {
  return axios.delete<any>(`/transports/${transport_id}`);
}
