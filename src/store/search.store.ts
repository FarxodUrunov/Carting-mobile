import { create } from "zustand";
import { Alert } from "react-native";

import { SearchStoreType } from "_/search";
import { GetLoad, GetLoadDetail } from "_api/load";
import { GetVacancy } from "_api/vacancy";
import { GetUserTrucks } from "_api/profile";
import { GetRegions } from "_api/utils";
import { Currency } from "@anysoftuz/carting-shared";

export const useSearchStore = create<SearchStoreType>((set, get) => ({
  isLoad: {
    loads: false,
    announcements: false,
    regions: false,
    trucks: false,
    detail: false,
  },
  load: {},
  orderDetail: {
    is_assign: false,
    id: 0,
    photos: [],
    title: "",
    capacity: 0,
    pickup_address: "",
    pickup_time_to: "",
    pickup_time_from: "",
    delivery_address: "",
    delivery_time: "",
    pickup_longitude: 0,
    pickup_latitude: 0,
    delivery_longitude: 0,
    delivery_latitude: 0,
    price: 0,
    currency: Currency.UZS,
    body_width: 0,
    body_height: 0,
    body_length: 0,
    description: "",
    owner: {
      id: 0,
      name: "",
      phone: "",
      email: "",
    },
    load_type: [],
    payment_methods: [],
    created_at: "",
  },
  announcement: {},
  loads: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      totalCount: 0,
    },
    data: [],
  },
  myTrucks: [],
  regions: [],
  filterLoadValue: {},
  filterAnnouncementValue: {},
  tabValue: "",
  searchValue: "",

  handleSearch: (searchValue) => {
    set({ searchValue });
  },
  handleTabName: (tabValue) => {
    set({ tabValue });
  },
  handleFilterValue: (filterLoadValue) => {
    set({ filterLoadValue });
  },
  handleFilterAnnouncementValue: (filterAnnouncementValue) => {
    set({ filterAnnouncementValue });
  },
  clear: (value) => {
    set({ filterLoadValue: value });
  },
  clearAnnouncement: (filterAnnouncementValue) => {
    set({ filterAnnouncementValue });
  },
  async getOrderDetails(orderId: number) {
    set({ isLoad: { ...get().isLoad, detail: true } });
    const result: any = await GetLoadDetail(orderId);
    set({ orderDetail: result.data });
    set({ isLoad: { ...get().isLoad, detail: false } });
    return result;
  },
  getLoad: (id) => {
    set({ isLoad: { ...get().isLoad, loads: true } });
    return GetLoad(id)
      .then(({ data }) => {
        set({ load: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, loads: false } });
      });
  },

  getMyTrucks: () => {
    set({ isLoad: { ...get().isLoad, trucks: true } });
    return GetUserTrucks()
      .then(({ data }) => {
        set({ myTrucks: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, trucks: false } });
      });
  },
  getRegions: () => {
    set({ isLoad: { ...get().isLoad, regions: true } });
    return GetRegions()
      .then(({ data }) => {
        set({ regions: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, regions: false } });
      });
  },
}));
