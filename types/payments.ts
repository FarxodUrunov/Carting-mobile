import { BaseResponseType } from "@anysoftuz/carting-shared";
import { CardPayload } from "@anysoftuz/carting-shared/dist/types/mobile";
export type paymentCards = {
  id: number;
  card_number: string;
  expire_date: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
};

export type inOutComeType = {
  outgoing: {
    balance: null | number;
    currency: "uzs";
  };
  income: {
    balance: null | number;
    currency: "uzs";
  };
};

export type transactionsType = {
  id: number;
  payment_method: string;
  price: number;
  status: "success" | "pending" | "failed";
  created_at: string;
  payer: {
    name: string;
    photo: string;
  };
};

export interface PaymentState {
  isLoading: boolean;
  isLoad: {
    paymentsLoading: boolean;
    paymentsOutcome: boolean;
    paymentsTransactions: boolean;
  };
  payments: paymentCards[] | [];
  getPayments: () => void;
  inOutCome: inOutComeType;
  getInOutCome: () => void;
  transactions: transactionsType[] | [];
  getTransactions: () => void;
  createCard: (payload: CardPayload) => Promise<boolean | void>;
}

export type CreateCardMobile = BaseResponseType & {
  data: { id: number };
};
