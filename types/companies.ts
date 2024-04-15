export type driverCompany = {
  company_id: number;
  name: string;
  photo: string;
  longitude: number;
  latitude: number;
  address: string;
};
export interface CompaniesState {
  isLoading: boolean;
  driverCompanies: driverCompany[];
  getDriverCompanies: () => void;
}
