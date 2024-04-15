import axios from "_utils/fetch";

export function GetCountries() {
  return axios.get<any>("/utility-api?filter[type]=country");
}

export function GetRegions(country_id: number = 1) {
  return axios.get<any>(
    `/utility-api?filter[type]=region&filter[location_id]=${country_id}`
  );
}
