import { create } from "zustand";
import {
  GetOneProposal,
  GetProposals,
  HandleRejectProposal,
  UpdateStatus,
  UpdateStopStatus,
} from "_api/proposal";

import { Alert } from "react-native";
import { ProposalState } from "_/proposal";
import { t } from "i18next";

export const useProposalStore = create<ProposalState>((set, get) => ({
  isLoad: {
    active: false,
    waiting: false,
    archive: false,
  },
  activeProposals: [],
  waitingProposals: [],
  proposal: {},
  archiveProposals: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      totalCount: 0,
    },
    data: [],
  },
  async getProposals(type, take) {
    set({
      isLoad: { ...get().isLoad, [type]: true },
    });
    return GetProposals(type, take)
      .then(({ data }) => {
        switch (type) {
          case "active":
            set({ activeProposals: data } as any);
            break;
          case "waiting":
            set({ waitingProposals: data } as any);
            break;
          case "archive":
            set({ archiveProposals: data } as any);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({
          isLoad: { ...get().isLoad, [type]: false },
        });
      });
  },

  async getOneProposal(id: number) {
    set({
      isLoad: { ...get().isLoad, active: true },
    });
    return GetOneProposal(id, "active")
      .then(({ data }) => {
        set({ proposal: data } as any);
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({
          isLoad: { ...get().isLoad, active: false },
        });
      });
  },
  updateProposal(payload) {
    const getProposals = get().getProposals;

    return UpdateStatus(payload.id, payload.status)
      .then(({ data }) => {
        getProposals("active");
        Alert.alert(t("successfully_updated"));
        get().getOneProposal(payload.id);
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      });
  },

  updateStopStatus(payload) {
    set({
      isLoad: { ...get().isLoad, active: true },
    });
    return UpdateStopStatus(payload.message, payload.status)
      .then(({ data }) => {
        Alert.alert(t("successfully_updated"));
        get().getProposals("active");
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      });
  },

  handleRejectProposal(payload) {
    set({
      isLoad: { ...get().isLoad, active: true },
    });
    return HandleRejectProposal(payload.id, payload.message)
      .then(({ data }) => {
        Alert.alert(t("successfully_updated"));
        get().getProposals("active");
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      });
  },
}));
