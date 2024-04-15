export type DevicesRes = {
  id: number;
  device_id: string | null;
  login_at: string;
  device_name: string;
}[];

export type DeleteDeviceRes = {
  id: number;
  device_id: null | number;
  device_name: string;
  device_token: null | string;
  device_mac_address: null | string;
  device_type: string;
  account_id: number;
  status: string;
  meta: {
    os: string;
    version: string;
    build_id: string;
    cpu_arch: string;
    os_version: string;
  };
  login_at: string;
  created_at: string;
}[];

export type DeleteDeviceAllRes = {
  id: number;
  device_id: null | number;
  device_name: string;
  device_token: null | string;
  device_mac_address: null | string;
  device_type: string;
  account_id: number;
  status: string;
  meta: {
    os: string;
    version: string;
    build_id: string;
    cpu_arch: string;
    os_version: string;
  };
  login_at: string;
  created_at: string;
}[];
