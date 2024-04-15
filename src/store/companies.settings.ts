import { CompaniesState } from "_/companies";
import { GetCompanies } from "_api/companies";
import { Alert } from "react-native";
import { create } from "zustand";

export const useCompanies = create<CompaniesState>((set, get) => ({
  isLoading: false,
  driverCompanies: [],
  async getDriverCompanies() {
    set({ isLoading: true });
    return await GetCompanies()
      .then(({ data }) => {
        set({ driverCompanies: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
