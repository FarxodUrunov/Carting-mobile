import { ActivitiesSate } from "_/activites";
import { GetStats } from "_api/activites";
import { Alert } from "react-native";
import { create } from "zustand";

export const ActivitiesStore = create<ActivitiesSate>((set, get) => ({
  isLoading: true,
  counts: null,
  orders: null,
  stats: [],
  activities: null,
  async getStats() {
    set({ isLoading: true });
    return await GetStats()
      .then(({ data }) => {
        set({ counts: data.counts });
        set({ orders: data.orders });
        set({ stats: data.stats });
        set({ activities: data.activities });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
