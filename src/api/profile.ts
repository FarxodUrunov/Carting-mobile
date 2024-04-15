import {
  MyCareerType,
  MyCareerWithTruck,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import {
  CareersType,
  EditProfileType,
  LanguagesRes,
  MyVehiclesPayload,
} from "_/profile";
import {
  ChangePasswordRes,
  EditProfileStatusPayload,
  EditProfileT,
} from "_/user";
import axios from "_utils/fetch";

export function GetProfile() {
  return axios.get<any>("/auth/me");
}

export function EditProfile(payload: EditProfileT) {
  return axios.patch<EditProfileType>("/drivers", payload);
}

export function GetCareers() {
  return axios.get<CareersType>("/cv");
}

export function CreateCareerWithoutTruck(payload: any) {
  return axios.post<MyCareerType>("/cv", payload);
}

export function CreateCareerWithTruck(payload: any) {
  return axios.post<MyCareerWithTruck>("/cv-truck", payload);
}

export function GetCareer(id: number, type: string) {
  return axios.get<MyCareerType | MyCareerWithTruck>(`${type}/${id}`);
}

export function GetUserTrucks() {
  return axios.get<MyVehiclesPayload>("/my-transports");
}

export function ChangePassword(payload: any) {
  return axios.patch<ChangePasswordRes>("/password", payload);
}

export function Logout() {
  return axios.get<any>("/auth/logout");
}

export function UpdateSearchWorkStatus(payload: EditProfileStatusPayload) {
  return axios.patch<any>("/search_work", payload);
}

export function GetLanguages() {
  return axios.get<LanguagesRes>("/languages");
}

export function updateCareer(type: string, id: number, payload: any) {
  return axios.patch<any>(`/${type}/${id}`, payload);
}

export function DeleteCv(id: any) {
  return axios.delete(`/cv/${id}`);
}
