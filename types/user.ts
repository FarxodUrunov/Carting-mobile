import { Company } from "./company";

export type User = {
  id: number;
  father_name?: string;
  first_name?: string;
  last_name?: string;
  photo?: string;
  type: "client" | "driver";
  address?: any;
  country?: any;
  driver_license_category?: any;
  email?: string;
  experience?: string;
  identify_number: any;
  region: any;
  phone: string;
  birth_date: any;
  company?: string;
};

export type GetProfileType = Promise<(User & { company: Company }) | any>;

export type EditProfileStatusPayload = { search_work: boolean };

export type EditProfileT = {
  address?: string;
  birth_date?: string;
  driver_license_category?: string[];
  email?: string;
  experience?: string;
  father_name?: string;
  first_name?: string;
  identify_number?: string;
  last_name?: string;
  phone?: string;
  photo?: string | null;
  region_id?: number;
};

export type ChangePasswordRes = {
  message: string;
};
