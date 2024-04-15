import { CompaniesFindManyTypeMobile } from "@anysoftuz/carting-shared/dist/types/mobile";
import axios from "_utils/fetch";

export function GetCompanies() {
  return axios.get<CompaniesFindManyTypeMobile>("/companies");
}
