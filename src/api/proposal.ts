import {
  DriverProposalArchiveWaitingFindManyTypeMobile,
  DriverProposalMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";
import {
  CancelDriverProposalPayload,
  ConfirmLoadPayload,
  DriverProposalPayload,
} from "_/load";
import axios from "_utils/fetch";

type ProposalType = "waiting" | "active" | "archive";

type ProposalResponseType<T extends ProposalType> = T extends "waiting"
  ? DriverProposalArchiveWaitingFindManyTypeMobile
  : T extends "active"
  ? DriverProposalMobile[]
  : DriverProposalArchiveWaitingFindManyTypeMobile;

export function GetProposals(type: ProposalType, take?: number) {
  return axios.get<ProposalResponseType<typeof type>>("/proposals-driver", {
    params: {
      take: take ?? 100,
      filter: {
        type,
      },
    },
  });
}

export function GetOneProposal(id: number, type: ProposalType, take?: number) {
  return axios.get<DriverProposalMobile>(`/proposals-driver`, {
    params: {
      filter: {
        proposals: {
          id,
        },
        type,
      },
    },
  });
}

export function UpdateProposalDriver(
  id: number,
  status:
    | "going_to_pickup_location"
    | "pickup_load"
    | "start_delivery"
    | "arrived"
    | "unload"
) {
  return axios.patch<any>(`/proposals-driver/${id}`, {
    status,
  });
}

export function CreateDriverProposal(payload: DriverProposalPayload) {
  return axios.post<any>("/proposals-driver", payload);
}

export function GetAppliedLoads() {
  return axios.get<any>("/proposal-loads");
}

export function PatchConfirmLoad(payload: ConfirmLoadPayload) {
  return axios.patch<any>(`/proposals-load/${payload.id}/${payload.itemId}`);
}

export function CancelDriverProposal(payload: CancelDriverProposalPayload) {
  return axios.patch<any>(`/proposals-driver/${payload.id}/cancel`);
}
export function RejectDriverProposal(payload: CancelDriverProposalPayload) {
  return axios.patch<any>(`/proposals-driver/${payload.id}/reject`, payload);
}

export function UpdateStatus(id: number, status: string) {
  return axios.patch<any>(`proposals-driver/${id}/load`, { status: status });
}

export function UpdateStopStatus(
  message?: string,
  status?: "stopped" | "moving"
) {
  return axios.patch<any>(`/transports/condition`, {
    message,
    vehicle_condition: status,
  });
}

export function HandleRejectProposal(id: number, message: string) {
  return axios.patch<any>(`/proposals-driver/${id}/reject`, { message });
}
