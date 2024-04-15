import axios from "_utils/fetch";

export function getVehicleBrands(params?: any) {
  return axios.get<any>("/brands", params);
}
export function getVehicleModels(id: number) {
  return axios.get<any>(`/models/${id}`);
}
