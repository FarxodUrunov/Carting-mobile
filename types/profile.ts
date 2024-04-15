import { BaseResponseType } from "@anysoftuz/carting-shared";
import {
  DriversMobile,
  VehicleDetailTypeMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import { PlateStateObject } from "_constants/index";

export type CountryListPayload = { id: number; name: string };
export type RegionListPayload = { id: number; name: string };
export type MyVehiclesPayload = {
  id: number;
  photos: string[];
  model: string;
  auto_number: string;
  vehicle_type: string;
  load_type: string[];
  capacity: number;
  body_width: number;
  body_height: number;
  body_length: number;
  from_region: string;
  to_region: string;
  auto_number_type: string;
}[];

export type FileType = {
  extension: string;
  filename: string;
  original_name: string;
  size: number;
  url: string;
};
export type VehiclesDetailPayload = {
  id: number;
  model: string;
  auto_number: string;
  auto_number_type: string;
  body_height: number;
  body_length: number;
  body_width: number;
  capacity: number;
  from_region: string;
  to_region: string;
  vehicle_type: string;
  certificate_code: string;
  certificate_number: string;
  created_at: string;
  description: string;
  driver: {
    driver_license_category: string[];
    experience: string;
    name: string;
    phone: string;
  };
  fuel_type: string;
  gearbox: string;
  payment_methods: string[];
  photos: string[];
  power: number;
  trip_type: string;

  files: FileType[];
  made_year: number;
  status: string;
  vehicle_condition: string;
  vin: string;
  way_walked: number;
};
export type Payments = {}[];
export type Transactions = {}[];
export type LanguagesRes = {
  id: number;
  name: string;
  flag: string;
  code: "ru" | "uz" | "en";
  is_default: boolean;
  created_at: string;
}[];

export type TransportParams = {
  take: number;
};
export type CountryUpdatedType = {
  id: string;
  value: string;
};
export type MyVehiclesType = {
  data: DriversMobile[] | [];
  pageInfo: {
    endCursor: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: number;
    totalCount: number;
  };
};
export type CareersType = {
  data: any;
  pageInfo: {
    endCursor: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: number;
  };
  totalCount: number;
};
export type brandModelType = {
  id: number;
  value: string;
};
export interface ProfileState {
  isLoading: boolean;
  isLoad: {
    careers: boolean;
    vehicles: boolean;
    careersDetail: boolean;
    vehiclesDetail: boolean;
    getVehicles: boolean;
    cv: boolean;
    deleteVehicle: boolean;
  };
  careers: CareersType;
  cvDetail: any;
  trucks: MyVehiclesPayload;
  confirmData: any | object;
  myVehicles: MyVehiclesType;
  vehicleDetail: VehicleDetailTypeMobile | object | any;
  countries: CountryListPayload[] | [];
  regions: RegionListPayload[] | [];
  countryOptions: CountryUpdatedType[] | [];
  getCareers: () => void;
  createWithoutTruck: (credentials: any) => Promise<number>;
  getCareerDetail: (id: number, type: any) => void;
  getUserTrucks: () => void;
  rememberDetails: (data: any) => void;
  createWithTruck: () => Promise<number>;
  getMyVehicles: (params?: TransportParams) => void;
  createNewTruck: () => Promise<number>;
  getVehicleDetail: (id: number) => void;
  getCountries: () => void;
  getRegions: (id: number) => void;
  brands: brandModelType[] | [];
  models: brandModelType[] | [];
  autoNumberType: string;
  autoPlaceholder: string;
  plateState: {
    format: string;
    example: string;
    regex: RegExp;
  };
  changeAutoNumberType: (id: keyof typeof PlateStateObject) => void;
  getBrands: () => void;
  getModels: (id: number) => void;
  clearValues: () => void;
  setEditValues: () => void;
  setEditCvValues: () => void;
  updateVehicle: (id: number, payload: any) => void;
  updateCv: (type: string, id: number, payload: any) => void;
  uploadPhotos: (payload: any) => void;
  uploadFiles: (payload: any) => void;
  deleteProfilePhoto: (id: string) => void;
  deleteCv: (id: any) => Promise<any>;
  deleteVehicle: (id: number) => Promise<number>;
}

export type EditProfileType = BaseResponseType & { id: number };

export type DeleteMediaFileType = BaseResponseType & {
  filename: string;
};
