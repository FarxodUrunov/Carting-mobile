import {
  CancelDriverProposalPayload,
  DriverProposalPayload,
  LoadStore,
} from "_/load";
import { create } from "zustand";
import {
  CancelDriverProposal,
  CreateDriverProposal,
  GetAppliedLoads,
  PatchConfirmLoad,
  RejectDriverProposal,
} from "_api/proposal";
import { Alert } from "react-native";
import { GetLoads, GetLoad } from "_api/load";

export const useLoadStore = create<LoadStore>((set, get) => ({
  isLoading: false,
  appliedLoads: [],
  loads: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      totalCount: 0,
    },
    data: [],
  },
  getLoads: (params) => {
    set({ isLoading: true });
    return GetLoads(params)
      .then(({ data }) => {
        set({ loads: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  getAppliedLoads: async () => {
    set({ isLoading: true });
    const res = await GetAppliedLoads();
    set({ appliedLoads: res, isLoading: false });
  },
  patchConfirmLoad: async (payload) => {
    set({ isLoading: true });
    const res = await PatchConfirmLoad(payload);
    set({ isLoading: false });
  },
  createDriverProposal: (payload: DriverProposalPayload) => {
    set({ isLoading: true });
    return CreateDriverProposal(payload)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  cancelDriverProposal: (payload) => {
    set({ isLoading: true });

    return CancelDriverProposal(payload)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
