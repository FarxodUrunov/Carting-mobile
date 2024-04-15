import {
  LoadDetailTypeMobile,
  LoadFindManyTypeMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";

import axios from "_utils/fetch";
import { LoadSearchFilterRequest } from "_/search";

export function GetLoads(params: LoadSearchFilterRequest) {
  return axios.get<LoadFindManyTypeMobile>("/loads", {
    params,
  });
}

export function GetLoad(id: number) {
  return axios.get<LoadDetailTypeMobile & { is_accepted: false }>(
    `loads/${id}`
  );
}
export function GetLoadDetail(id: number) {
  return axios.get<LoadDetailTypeMobile>(`loads/${id}`);
}
