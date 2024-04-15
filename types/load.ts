import {
  ConfirmLoadTypeMobile,
  LoadFindManyTypeMobile,
  LoadMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import { LoadSearchFilterRequest } from "./search";

export type GetLoadsPayload = {};
export type GetLoads = LoadMobile[];
export type DriverProposalPayload = {
  load_id: number;
  vehicle_id: number;
};

export type LoadStore = {
  isLoading: boolean;
  appliedLoads: any;
  loads: LoadFindManyTypeMobile;
  getAppliedLoads: () => Promise<any>;
  patchConfirmLoad: (payload: ConfirmLoadPayload) => Promise<any>;
  createDriverProposal: (payload: DriverProposalPayload) => Promise<any>;
  cancelDriverProposal: (payload: any) => Promise<any>;
  getLoads: (params: LoadSearchFilterRequest) => void;
};

export type CreateProposalResponse = {
  company_id: number;
  dispatcher_id: number;
  driver_id: number;
  id: number;
  load_id: number;
  point: any;
  status: string;
  vehicle_id: number;
  who_applied_first: string;
  error: string;
  message: string;
};
export type AppliedLoads = ConfirmLoadTypeMobile[];
export type ConfirmLoadPayload = {
  id: number;
  itemId: number;
};

export type ConfirmLoadResponse = {
  id: number;
  itemId: number;
};

export type FilterData = {
  keywords: string;
  whereFrom: string;
  whereTo: string;
  machineType: string;
  weightFrom: string;
  weightTo: string;
  volumeFrom: string;
  volumeTo: string;
  cargoType: string;
  currencyId: string;
  cargoLength: string;
  cargoHeight: string;
  cargoWidth: string;
  dateFrom: string;
  dateTo: string;
  search: string;
};
export type MyTruck = {
  id: number;
  photo: string;
  model: string;
  auto_number: string;
};
export type Region = {
  id: number;
  name: string;
};

export type CancelDriverProposalPayload = {
  id: number;
  message: string;
};
