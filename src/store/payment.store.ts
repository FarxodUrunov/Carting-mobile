import { create } from "zustand";
import {
  GetTransactions,
  GetInOutComeData,
  GetPaymentCards,
  CreateCard,
} from "_api/payments";
import { Alert } from "react-native";
import { PaymentState } from "_/payments";
import { t } from "i18next";

export const usePayment = create<PaymentState>((set, get) => ({
  isLoading: false,
  isLoad: {
    paymentsLoading: false,
    paymentsOutcome: false,
    paymentsTransactions: false,
  },
  payments: [],
  inOutCome: {
    income: {
      balance: 0,
      currency: "uzs",
    },
    outgoing: {
      balance: 0,
      currency: "uzs",
    },
  },
  transactions: [],

  createCard(payload) {
    set({ isLoading: true });
    return CreateCard(payload)
      .then(() => {
        Alert.alert(t("successfully_created"));
        return true;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  async getPayments() {
    set({ isLoad: { ...get().isLoad, paymentsLoading: true } });
    return await GetPaymentCards()
      .then(({ data }) => {
        set({ payments: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, paymentsLoading: false } });
      });
  },

  async getInOutCome() {
    set({ isLoad: { ...get().isLoad, paymentsOutcome: true } });

    return await GetInOutComeData()
      .then(({ data }) => {
        set({ inOutCome: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, paymentsOutcome: false } });
      });
  },
  async getTransactions() {
    set({ isLoad: { ...get().isLoad, paymentsTransactions: true } });

    return await GetTransactions()
      .then(({ data }) => {
        set({ transactions: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, paymentsTransactions: false } });
      });
  },
}));
