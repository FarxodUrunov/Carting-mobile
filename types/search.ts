import {
  AnnouncementDetailTypeMobile,
  AnnouncementFindManyTypeMobile,
  LoadDetailTypeMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";
// import { AnnouncementSearchFilterRequest } from "./announcements";
export type MyTruck = {
  id: number;
  photos: string[];
  model: string;
  auto_number: string;
};
export type Item = {
  id: number;
  name: string;
};
export type LoadSearchFilterRequest = {
  filter: {
    loads?: {
      load_type?: string[];
      body_height?: number;
      body_width?: number;
      body_length?: number;
      price?: {
        max?: number;
        min?: number;
      };
      currency?: string[];
      pickup_region_id?: number[];
      delivery_region_id?: number[];
      vehicle_type?: string[];
      capacity?: {
        min?: number;
        max?: number;
      };
      created_at?: {
        min?: string;
        max?: string;
      };
    };
    search?: {
      value: string;
    };
  };
};
export type AnnouncementSearchFilterRequest = {
  filter: {
    vacancies?: {
      salary?: {
        min?: number;
        max?: number;
      };
      experience?: number[];
      created_at?: {
        min?: string;
        max?: string;
      };
    };
    search?: {
      value: string;
    };
  };
};
export interface SearchStoreType {
  isLoad: {
    loads: boolean;
    announcements: boolean;
    regions: boolean;
    trucks: boolean;
    detail: boolean;
  };
  orderDetail: LoadDetailTypeMobile;
  load: LoadDetailTypeMobile | object;
  myTrucks: MyTruck[] | [];
  regions: Item[] | [];
  filterLoadValue: LoadSearchFilterRequest["filter"]["loads"];
  filterAnnouncementValue: AnnouncementSearchFilterRequest["filter"]["vacancies"];
  tabValue: string;
  searchValue: string;
  handleSearch: (value: string) => void;
  handleTabName: (value: string) => void;
  handleFilterValue: (
    value: LoadSearchFilterRequest["filter"]["loads"]
  ) => void;
  handleFilterAnnouncementValue: (
    value: AnnouncementSearchFilterRequest["filter"]["vacancies"]
  ) => void;
  getLoad: (id: number) => void;
  getMyTrucks: () => void;
  getRegions: () => void;
  clear: (value: LoadSearchFilterRequest["filter"]["loads"]) => void;
  clearAnnouncement: (
    value: AnnouncementSearchFilterRequest["filter"]["vacancies"]
  ) => void;
  getOrderDetails: (orderId: number) => void;
}
