import { ActivitesType } from "@anysoftuz/carting-shared/dist/types/mobile";

export type ActivitiesSate = ActivitesType & {
  isLoading: boolean;
  getStats: () => void;
};
