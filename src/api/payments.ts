import {
  CardPayload,
  InOutComeFindManyTypeMobile,
  PaymentCardFindManyTypeMobile,
  TransactionsFindManyTypeMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import { CreateCardMobile } from "_/payments";
import axios from "_utils/fetch";

export function GetPaymentCards() {
  return axios.get<PaymentCardFindManyTypeMobile>("/payment-cards");
}

export function GetInOutComeData() {
  return axios.get<InOutComeFindManyTypeMobile>("/payment-cards/in-out-come");
}

export function GetTransactions() {
  return axios.get<TransactionsFindManyTypeMobile>(
    "/payment-cards/transactions"
  );
}

export function CreateCard(payload: CardPayload) {
  return axios.post<CreateCardMobile>("/payment-cards", payload);
}
