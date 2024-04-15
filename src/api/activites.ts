import { StatsType } from "@anysoftuz/carting-shared/dist/types/mobile";
import axios from "_utils/fetch";

export function GetStats() {
  return axios.get<StatsType>("/drivers/statistics");
}
